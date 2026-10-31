// Chụp bản clone local (không đụng trang thật) → <dir>/ed_clone.png + ed_clone_tops.txt (top mỗi thẻ trong ảnh)
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
await c.navigate("http://localhost:5173/edit/pos-test?template=minimalism_darkred", 6000);
const h = await c.eval("document.documentElement.scrollHeight");
await c.setViewport({ width: 1440, height: Math.min(h, 8000) });
await new Promise(r => setTimeout(r, 800));
await c.screenshot(`${process.argv[2]}/ed_clone.png`);
const tops = await c.eval(`[...document.querySelectorAll('main .body > section.card')].map(e=>Math.round(e.getBoundingClientRect().top+scrollY)).join(' ')`);
fs.writeFileSync(`${process.argv[2]}/ed_clone_tops.txt`, tops);
fs.writeFileSync(`${process.argv[2]}/ed_clone.txt`, await c.eval("document.body.innerText"));
console.log("height", h, "tops", tops);
process.exit(0);
