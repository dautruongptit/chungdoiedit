import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const W=+process.argv[2]; await c.setViewport({ width: W, height: 900, mobile: W<500 });
const js = `(() => { const col=document.querySelector('header').parentElement; const base=col.getBoundingClientRect().top+scrollY; const out=[]; const walk=(el,depth)=>{ [...el.children].forEach(k=>{ const r=k.getBoundingClientRect(); if(r.height<40||k.tagName==='IMG'||k.tagName==='STYLE') return; const t=(k.innerText||'').trim().slice(0,28).split(String.fromCharCode(10)).join('/'); out.push('  '.repeat(depth)+k.tagName+'|y'+Math.round(r.top+scrollY-base)+'|h'+Math.round(r.height)+'|w'+Math.round(r.width)+'|'+t); }); }; let top=col; if(col.children.length<3) top=col.parentElement; walk(top,0); return out; })()`;
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(u,3500); await c.eval(`(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`); await new Promise(r=>setTimeout(r,3500));
  console.log("=====",n); console.log((await c.eval(js)).join("\n"));
}
process.exit(0);
