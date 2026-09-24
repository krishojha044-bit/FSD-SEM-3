const http = require("http");
const fs = require("fs");
const path = require("path");


// ============================================
// FILE NAME
// ============================================

const HTML_FILE = path.join(__dirname, "file.html");
const DATA_FILE = path.join(__dirname, "data.txt");


// ============================================
// 1. CUSTOM EVENT EMITTER
// ============================================

class MyEventEmitter {

    constructor() {
        this.events = {};
    }

    on(eventName, listener) {

        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(listener);
    }

    emit(eventName, data) {

        if (this.events[eventName]) {

            this.events[eventName].forEach(
                listener => listener(data)
            );

        }
    }
}


// Create EventEmitter object
const emitter = new MyEventEmitter();


// Greet Event
emitter.on("greet", (name) => {
    console.log(`Hello ${name}!`);
});


// Exit Event
emitter.on("exit", () => {
    console.log("Exit event triggered");
});


// ============================================
// 2. EVENT LOOP DEMO
// ============================================

function eventLoopDemo(callback) {

    const order = [];

    order.push("Start");

    process.nextTick(() => {
        order.push("process.nextTick");
    });

    Promise.resolve().then(() => {
        order.push("Promise");
    });

    setTimeout(() => {
        order.push("setTimeout");
    }, 0);

    setImmediate(() => {
        order.push("setImmediate");

        callback(order);
    });

    order.push("End");
}


// ============================================
// HELPER FUNCTION
// ============================================

function sendJSON(res, statusCode, data) {

    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data));
}


// ============================================
// HTTP SERVER
// ============================================

const server = http.createServer((req, res) => {

    const url = new URL(
        req.url,
        `http://${req.headers.host}`
    );


    // ========================================
    // HOME PAGE
    // ========================================

    if (req.method === "GET" && url.pathname === "/") {

        fs.readFile(
            HTML_FILE,
            "utf8",
            (err, content) => {

                if (err) {

                    res.writeHead(500, {
                        "Content-Type": "text/plain"
                    });

                    return res.end(
                        "Error loading file.html"
                    );
                }

                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.end(content);
            }
        );

        return;
    }


    // ========================================
    // GREET EVENT
    // ========================================

    if (
        req.method === "GET" &&
        url.pathname === "/greet"
    ) {

        const name =
            url.searchParams.get("name") || "Guest";

        emitter.emit("greet", name);

        return sendJSON(res, 200, {

            event: "greet",

            message: `Hello ${name}!`

        });
    }


    // ========================================
    // EXIT EVENT
    // ========================================

    if (
        req.method === "GET" &&
        url.pathname === "/exit"
    ) {

        emitter.emit("exit");

        return sendJSON(res, 200, {

            event: "exit",

            message: "Exit event triggered"

        });
    }


    // ========================================
    // EVENT LOOP
    // ========================================

    if (
        req.method === "GET" &&
        url.pathname === "/eventloop"
    ) {

        eventLoopDemo((order) => {

            sendJSON(res, 200, {

                order: order

            });

        });

        return;
    }


    // ========================================
    // CREATE FILE
    // ========================================

    if (
        req.method === "POST" &&
        url.pathname === "/create"
    ) {

        let body = "";

        req.on("data", (chunk) => {

            body += chunk;

        });

        req.on("end", () => {

            try {

                const data = JSON.parse(body);

                fs.writeFile(
                    DATA_FILE,
                    data.text || "",
                    "utf8",
                    (err) => {

                        if (err) {

                            return sendJSON(res, 500, {

                                success: false,

                                message:
                                    "File creation failed"

                            });
                        }

                        sendJSON(res, 200, {

                            success: true,

                            message:
                                "File created successfully"

                        });

                    }
                );

            } catch (error) {

                sendJSON(res, 400, {

                    success: false,

                    message: "Invalid JSON"

                });

            }

        });

        return;
    }


    // ========================================
    // READ FILE
    // ========================================

    if (
        req.method === "GET" &&
        url.pathname === "/read"
    ) {

        fs.readFile(
            DATA_FILE,
            "utf8",
            (err, content) => {

                if (err) {

                    return sendJSON(res, 404, {

                        success: false,

                        message: "File not found"

                    });

                }

                sendJSON(res, 200, {

                    success: true,

                    content: content

                });

            }
        );

        return;
    }


    // ========================================
    // UPDATE FILE
    // ========================================

    if (
        req.method === "PUT" &&
        url.pathname === "/update"
    ) {

        let body = "";

        req.on("data", (chunk) => {

            body += chunk;

        });

        req.on("end", () => {

            try {

                const data = JSON.parse(body);

                fs.writeFile(
                    DATA_FILE,
                    data.text || "",
                    "utf8",
                    (err) => {

                        if (err) {

                            return sendJSON(res, 500, {

                                success: false,

                                message:
                                    "File update failed"

                            });

                        }

                        sendJSON(res, 200, {

                            success: true,

                            message:
                                "File updated successfully"

                        });

                    }
                );

            } catch (error) {

                sendJSON(res, 400, {

                    success: false,

                    message: "Invalid JSON"

                });

            }

        });

        return;
    }


    // ========================================
    // DELETE FILE CONTENT
    // ========================================

    if (
        req.method === "DELETE" &&
        url.pathname === "/delete"
    ) {

        fs.writeFile(
            DATA_FILE,
            "",
            "utf8",
            (err) => {

                if (err) {

                    return sendJSON(res, 500, {

                        success: false,

                        message: "Delete failed"

                    });

                }

                sendJSON(res, 200, {

                    success: true,

                    message:
                        "File content deleted"

                });

            }
        );

        return;
    }


    // ========================================
    // 404 ERROR
    // ========================================

    sendJSON(res, 404, {

        success: false,

        message: "Route not found"

    });

});


// ============================================
// START SERVER
// ============================================

const PORT = 3000;

server.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});