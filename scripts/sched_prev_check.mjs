// Bật lịch trình trong editor local → Xem trước → in số đo khối "Lịch trình ngày cưới" + chụp ảnh.
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const w = Number(process.argv[3] || 1707), h = Number(process.argv[4] || 898);
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: w, height: h });
await c.navigate(`http://localhost:5173/edit/sp-${Date.now()}?template=minimalism_darkred`, 6000);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
await c.eval(`document.querySelectorAll('[class*=tour]').forEach(e=>e.remove())`);
await c.eval(`(()=>{ const s=[...document.querySelectorAll('section.card')].find(x=>/Lịch trình ngày cưới/.test(x.innerText)); s.querySelector('.toggle').click(); })()`);
await wait(600);
await c.eval(`[...document.querySelectorAll('button')].find(b=>/Xem trước/.test(b.innerText)).click()`);
await wait(3000);
console.log(await c.eval(fs.readFileSync(new URL("./sched_prev_dump.js", import.meta.url), "utf8")));
await wait(500);
await c.screenshot(`${process.argv[2]}/sched_prev_clone.png`);
process.exit(0);
