// Đo cấu trúc các section của mẫu Nâu trên bản clone local ở khổ <W>.
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const W = Number(process.argv[2] || 390);
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: W, height: 844 });
await c.navigate("http://localhost:5173/vi/mau-thiep/minimalism-nau/demo?open=1&autoscroll=0", 6000);
console.log(await c.eval(fs.readFileSync(new URL("./brown_rows.js", import.meta.url), "utf8")));
await c.screenshot(`${process.argv[3] || "."}/brown_local_${W}_top.png`);
process.exit(0);
