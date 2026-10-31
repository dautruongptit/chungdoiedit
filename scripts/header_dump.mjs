import fs from "node:fs";
// In số đo thanh trên cùng (nav + thanh công cụ editor) của bản local ở khổ <W>x<H>
import { ChromeController } from "./cdp_helper.mjs";
const [W, H] = [Number(process.argv[2]), Number(process.argv[3])];
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: W, height: H });
await c.navigate(`http://localhost:5173/edit/hd-${Date.now()}?template=minimalism_darkred`, 5500);
await c.eval(`[...document.querySelectorAll('button')].find(b=>/Xem trước/.test(b.innerText)).click()`);
await new Promise(r => setTimeout(r, 3000));
const js = fs.readFileSync(new URL("./header_dump.js", import.meta.url), "utf8");
console.log(await c.eval(js));
process.exit(0);
