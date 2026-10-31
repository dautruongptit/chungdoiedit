// Đổi số hoạt động trong lịch trình (local) rồi in vị trí biểu tượng trong bản xem trước. node sched_n_check.mjs <n>
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const n = Number(process.argv[2] || 6);
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: Number(process.argv[3] || 1707), height: Number(process.argv[4] || 898) });
await c.navigate(`http://localhost:5173/edit/sn-${Date.now()}?template=minimalism_darkred`, 6000);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
await c.eval(`document.querySelectorAll('[class*=tour]').forEach(e=>e.remove())`);
await c.eval(`(()=>{ const s=[...document.querySelectorAll('section.card')].find(x=>/Lịch trình ngày cưới/.test(x.innerText)); s.querySelector('.toggle').click(); })()`);
await wait(500);
const have = 5;
for (let i = have; i < n; i++) { await c.eval(`[...document.querySelectorAll('button')].find(b=>/Thêm hoạt động/.test(b.innerText)).click()`); await wait(250); }
for (let i = have; i > n; i--) {
  await c.eval(`(()=>{ const cards=[...document.querySelectorAll('.sched-card')]; cards[cards.length-1].querySelector('.sched-btn-icon.delete').click(); })()`); await wait(250);
  await c.eval(`(()=>{ const b=[...document.querySelectorAll('button')].find(x=>x.innerText.trim()==='Xóa'); if(b) b.click(); })()`); await wait(250);
}
await c.eval(`[...document.querySelectorAll('button')].find(b=>/Xem trước/.test(b.innerText)).click()`); await wait(2500);
console.log(`n=${n}`, await c.eval(fs.readFileSync(new URL("./sched_n.js", import.meta.url), "utf8")));
process.exit(0);
