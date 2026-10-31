// Bật "Lịch trình ngày cưới" trong editor local, chụp ảnh + in số đo các phần tử (so với trang thật).
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1707, height: 898 });
await c.navigate(`http://localhost:5173/edit/sc-${Date.now()}?template=minimalism_darkred`, 6000);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
await c.eval(`document.querySelectorAll('[class*=tour]').forEach(e=>e.remove())`);
await c.eval(`(()=>{ const s=[...document.querySelectorAll('section.card')].find(x=>/Lịch trình ngày cưới/.test(x.innerText)); s.querySelector('.toggle').click(); })()`);
await wait(700);
await c.eval(`(()=>{ const s=[...document.querySelectorAll('section.card')].find(x=>/Thêm hoạt động/.test(x.innerText)); s.scrollIntoView({block:'start'}); window.scrollBy(0,-90); })()`);
await wait(400);
await c.screenshot(`${process.argv[2]}/sched_edit_clone.png`);
console.log(await c.eval(fs.readFileSync(new URL("./sched_edit_dump.js", import.meta.url), "utf8")));
process.exit(0);
