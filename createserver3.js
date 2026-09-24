// const http = require('http');

// const server = http.createServer((req, res) => {

//     res.statusCode = 200;

//     res.setHeader('Content-Type', 'text/plain');

//     res.end('Hello World');
// });

// server.listen(3000, () => {
//     console.log('Server running on port 3000');
// });
// Advanced (but simple) HTTP server using http.createServer()
// Builds on the basic "Hello World" server by adding:
//   - custom headers (multiple, including a custom one)
//   - meaningful status codes per route
//   - basic routing by path + method
//   - reading a POST body (streams)
//   - graceful JSON responses

const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  console.log(`${req.method} ${path}`);
  if (path === '/' && req.method === 'GET') {
    res.statusCode = 200;                             
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('X-Powered-By', 'plain-node-http');   
    res.end('Hello World\n');
  }
  else if (path === '/greet' && req.method === 'GET') {
    const name = query.name || 'Guest';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello, ${name}!\n`);
  }
  else if (path === '/json' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello World', status: 'ok' }));
  } 
  else if (path === '/data' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      res.statusCode = 201;                             
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ received: body }));
    });
  }
  else if (path === '/error') {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Simulated server error (500)\n');
  }

  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 - Not Found\n');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Try: /  /greet?name=Rahul  /json  /error  (or POST to /data)');
});