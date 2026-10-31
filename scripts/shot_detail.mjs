import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const dir=process.argv[2];
await c.setViewport({ width: 1280, height: 800 });
for (const [n,u] of [["real_detail","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam"],["clone_detail","http://localhost:5173/vi/mau-thiep/minimalism-do-dam"]]) { await c.navigate(u,4000); await c.screenshot(`${dir}/${n}.png`);
 console.log(n, JSON.stringify(await c.eval(`[...document.querySelectorAll('iframe,a,button')].filter(a=>/demo|iframe/i.test((a.href||a.src||'')+a.innerText+a.tagName)).slice(0,6).map(a=>a.tagName+' '+(a.innerText||'').trim().slice(0,30)+' -> '+(a.href||a.src||''))`))); }
process.exit(0);
