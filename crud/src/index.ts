import http, { IncomingMessage, ServerResponse } from "http";

import { Url } from "url";

// types

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface CreateUserDTO {
  name?: string;
  email?: string;
}

interface UpdateUserDTO {
  name?: string;
  email?: string;
}

// in memory Db

let nextId = 1;
const users: User[] = [];

// utilities

function sendJSON(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("content-Type", "application/json");
  res.end(JSON.stringify(data));
}
function sendNoContent(res: ServerResponse) {
  res.statusCode = 204;
  res.end();
}

function methodNotAllowed(res: ServerResponse) {
  sendJSON(res, 500, { error: "Not Allowed" });
}

function notFound(res: ServerResponse) {
  sendJSON(res, 404, { error: "Not Found" });
}

async function readTextBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(Buffer.from(c)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}
