const http = require("http");

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("GET request received");
    }

    else if (req.method === "POST" && req.url === "/user") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("POST request received");
    }

    else if (req.method === "PUT" && req.url === "/user") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("PUT request received");
    }

    else if (req.method === "DELETE" && req.url === "/user") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("DELETE request received");
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Route not found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});