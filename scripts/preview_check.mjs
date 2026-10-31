// Mở editor local, bấm "Xem trước", in văn bản phần thân + chụp ảnh. Không đụng trang thật.
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
await c.navigate(`http://localhost:5173/edit/prev-${Date.now()}?template=minimalism_darkred`, 6000);
await c.eval(`[...document.querySelectorAll('button')].find(b=>/Xem trước/.test(b.innerText)).click()`);
await new Promise(r => setTimeout(r, 3500));
await c.screenshot(`${process.argv[2]}/prev_clone_top.png`);
const txt = await c.eval("document.querySelector('main').innerText");
fs.writeFileSync(`${process.argv[2]}/prev_clone.txt`, txt);
console.log(txt.replace(/\n+/g, " | ").slice(0, 1400));
process.exit(0);
