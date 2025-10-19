const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    return res.end(JSON.stringify({ message: "Hello From API" }));

  } else if (req.url === "/about" && req.method === "GET") {
    res.statusCode = 200;
    return res.end(JSON.stringify({ message: "About End Point" }));

  } else if (req.url === "/greet" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        res.statusCode = 413;
        res.end(JSON.stringify({ error: "Payload too large" }));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body || "{}");
        const name = data.name;

        if (!name) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: "Missing 'name' in request body" }));
        }

        res.statusCode = 200;
        return res.end(JSON.stringify({ message: `Hello, ${name}!` }));
      } catch {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });

  } else {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Route not Found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
