// Nhập ngày + giờ vào editor local rồi xem bản xem trước: kiểm tra dòng ngày âm và đếm ngược.
import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
await c.navigate(`http://localhost:5173/edit/cd-${Date.now()}?template=minimalism_darkred`, 5000);
const setVal = (sel, v) => `(() => { const el=[...document.querySelectorAll('${sel}')].pop(); const s=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; s.call(el,'${v}'); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); return el.value; })()`;
console.log(await c.eval(setVal("input[type=date]", "2026-12-12")));
console.log(await c.eval(setVal("input[type=time]", "18:00")));
await c.eval(`[...document.querySelectorAll('button')].find(b=>/Xem trước/.test(b.innerText)).click()`);
await new Promise(r => setTimeout(r, 3000));
const t = await c.eval("document.querySelector('main').innerText");
const i = t.indexOf("TIỆC CƯỚI SẼ");
console.log(t.slice(i, i + 200).replace(/\n+/g, " | "));
process.exit(0);
