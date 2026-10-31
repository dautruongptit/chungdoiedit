// Chụp và đo mục "Kiểu hiển thị" của Hộp quà (local) sau khi thêm một tài khoản.
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
await c.navigate(`http://localhost:5173/edit/gs-${Date.now()}?template=minimalism_darkred`, 6000);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
await c.eval(`document.querySelectorAll('[class*=tour]').forEach(e=>e.remove())`);
await c.eval(fs.readFileSync(new URL("./gift_add_one.js", import.meta.url), "utf8"));
await wait(700);
await c.eval(`document.querySelectorAll('.field').forEach(x=>{ if(/Kiểu hiển thị/.test(x.innerText)) x.scrollIntoView({block:'center'}); })`);
await wait(400);
await c.screenshot(`${process.argv[2]}/gift_seg.png`);
console.log("mặc định:", await c.eval(fs.readFileSync(new URL("./_act.js", import.meta.url), "utf8")));
console.log(await c.eval(fs.readFileSync(new URL("./_seg.js", import.meta.url), "utf8")));
console.log(await c.eval(fs.readFileSync(new URL("./_click_seg.js", import.meta.url), "utf8")));
process.exit(0);
