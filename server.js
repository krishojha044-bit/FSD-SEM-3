const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("Home Page");
    }

    else if (req.url === "/about") {
        res.end("About Page");
    }

    else if (req.url === "/student") {
        res.end("Student Page");
    }

    else {
        res.end("404 Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server started at http://localhost:3/000");
});