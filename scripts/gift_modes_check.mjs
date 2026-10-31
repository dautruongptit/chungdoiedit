// Thêm một tài khoản, rồi xem bản xem trước ở từng kiểu hiển thị hộp quà (Hộp quà / Phong bì / Hiện QR) và chụp ảnh.
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
await c.navigate(`http://localhost:5173/invitations/create/minimalism-do-dam`, 6500);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
await c.eval(`document.querySelectorAll('[class*=tour]').forEach(e=>e.remove())`);
console.log("kiểu mặc định:", await c.eval(`[...document.querySelectorAll('.seg')].find(x=>/Hộp quà/.test(x.innerText)).querySelector('button.active').innerText.trim()`));
await c.eval(fs.readFileSync(new URL("./gift_add_one.js", import.meta.url), "utf8")); await wait(700);
const run = async (label, file) => {
  await c.eval(`(()=>{ const b=[...document.querySelectorAll('button')].find(x=>x.getBoundingClientRect().width>0&&/Chỉnh sửa/.test(x.innerText)); b&&b.click(); })()`); await wait(1000);
  await c.eval(`(()=>{ [...document.querySelectorAll('.seg button')].find(x=>x.innerText.replace(/\s+/g,' ').trim()===${JSON.stringify(label)}).click(); })()`); await wait(500);
  await c.eval(`[...document.querySelectorAll('button')].find(b=>b.getBoundingClientRect().width>0&&/Xem trước/.test(b.innerText)).click()`); await wait(2500);
  console.log(label.padEnd(18), await c.eval(fs.readFileSync(new URL("./gift_modes.js", import.meta.url), "utf8"))); await wait(600);
  await c.screenshot(`${process.argv[2]}/${file}`);
};
await run("Hộp quà", "gm_box.png"); await run("Phong bì", "gm_env.png"); await run("Hiện QR trực tiếp", "gm_qr.png");
process.exit(0);
