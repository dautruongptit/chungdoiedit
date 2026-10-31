import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const open = `(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); if(b) b.click(); })()`;
const js = `(() => { const out=[document.documentElement.scrollHeight+' total']; const root=document.querySelector('header').parentElement.parentElement; const base=root.getBoundingClientRect().top+scrollY; [...root.parentElement.children].forEach(k=>{const r=k.getBoundingClientRect(); out.push(k.tagName+'|'+String(k.className).slice(0,34)+'|y'+Math.round(r.top+scrollY-base)+'|h'+Math.round(r.height)+'|'+(k.innerText||'').slice(0,24).split(String.fromCharCode(10)).join('/'));}); return out; })()`;
const W=+process.argv[2];
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.setViewport({ width: W, height: 900, mobile: W<500 }); await c.navigate(u,3000); await c.eval(open); await new Promise(r=>setTimeout(r,4000));
  console.log("==",n); console.log((await c.eval(js)).join("\n")); }
process.exit(0);
