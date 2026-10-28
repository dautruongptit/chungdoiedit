// Máy chủ nhận dữ liệu đo từ trang gốc (chạy trên localhost):
//   POST /<tên>   -> docs/survey/raw/<tên>.json
//   GET  /js/<tệp> -> trả tệp trong scripts/survey (để nạp probe vào trang gốc)
import http from "node:http";
import fs from "node:fs";

const PORT = 5199;
const safe = (s) => s.replace(/[^A-Za-z0-9._-]/g, "_");

http
  .createServer((req, res) => {
    const h = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Private-Network": "true",
    };
    try {
      if (req.method === "OPTIONS") { res.writeHead(204, h); return res.end(); }
      if (req.method === "GET" && req.url.startsWith("/js/")) {
        const f = "scripts/survey/" + safe(decodeURIComponent(req.url.slice(4)));
        res.writeHead(200, { ...h, "Content-Type": "text/javascript; charset=utf-8" });
        return res.end(fs.readFileSync(f));
      }
      const name = safe(decodeURIComponent(req.url.slice(1))) || "x";
      const chunks = [];
      req.on("data", (c) => chunks.push(c));
      req.on("end", () => {
        fs.mkdirSync("docs/survey/raw", { recursive: true });
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(`docs/survey/raw/${name}.json`, buf);
        res.writeHead(200, h);
        res.end("ok");
        console.log("saved", name, buf.length);
      });
    } catch (e) {
      res.writeHead(500, h);
      res.end(String(e.message));
    }
  })
  .listen(PORT, "127.0.0.1", () => console.log("collector on", PORT));
