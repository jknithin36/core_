import http, { IncomingMessage, ServerResponse } from "http";

// createServer takes a callback that runs for every request
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  // set response headers
  res.setHeader("Content-Type", "application/json");

  // basic routing
  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Hello from TypeScript API!" }));
  } else if (req.url === "/about" && req.method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "About endpoint" }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
