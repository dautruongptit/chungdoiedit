import { ChromeController } from "./cdp_helper.mjs";
// Thử bấm thật (chuột) vào các nút của mục Hộp quà: kiểm tra có bị phần tử khác che không.
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
await c.navigate(`http://localhost:5173/edit/gift-${Date.now()}?template=minimalism_darkred`, 6000);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
console.log("tour present:", await c.eval(`!!document.querySelector('.tour-backdrop')`));
await c.eval(`document.querySelectorAll('[class*=tour]').forEach(e=>e.remove())`);
import fs from "node:fs";
console.log(await c.eval(fs.readFileSync(new URL("./gift_hit.js", import.meta.url), "utf8")));
process.exit(0);
