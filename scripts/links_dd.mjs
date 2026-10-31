import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1280, height: 800 });
for (const u of ["https://chungdoi.com/vi/mau-thiep","http://localhost:5173/vi/mau-thiep"]) { await c.navigate(u,3500);
 console.log(u, JSON.stringify(await c.eval(`[...document.querySelectorAll('a,button')].filter(a=>/do-dam|Đỏ Đậm/i.test((a.href||'')+a.innerText)).slice(0,6).map(a=>a.tagName+' '+a.innerText.trim().slice(0,30)+' -> '+(a.href||''))`))); }
process.exit(0);
