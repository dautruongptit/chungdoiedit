import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
const W = +process.argv[2];
const open = `(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); if(b) b.click(); })()`;
const js = `(() => { const s=document.querySelector('header'); const top=s.getBoundingClientRect().top; const out=[]; s.querySelectorAll('*').forEach(e=>{ if(e.tagName==='IMG'||e.tagName==='SPAN'&&!e.innerText) return; const r=e.getBoundingClientRect(); if(!r.height) return; const cs=getComputedStyle(e); out.push([e.tagName,(e.innerText||'').slice(0,16).split(String.fromCharCode(10)).join('|'),Math.round(r.x),Math.round(r.y-top),Math.round(r.width),Math.round(r.height),cs.fontSize,cs.fontFamily.slice(0,12)].join(';')); }); return out; })()`;
const res={};
for (const [name,url] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.setViewport({ width: W, height: 900, mobile: W<500 });
  await c.navigate(url, 3000);
  await c.eval(open); await new Promise(r=>setTimeout(r,4000));
  res[name]=await c.eval(js);
}
const sc=new Set(res.clone), sr=new Set(res.real);
res.real.forEach(l=>{ if(!sc.has(l)) console.log("R",l)}); res.clone.forEach(l=>{ if(!sr.has(l)) console.log("C",l)});
process.exit(0);
