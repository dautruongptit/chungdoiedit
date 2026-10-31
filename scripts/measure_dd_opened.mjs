import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
const open = `(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); if(b) b.click(); return !!b; })()`;
const js = `(() => { const out=[]; const seen=new Set(); document.querySelectorAll('body *').forEach(e=>{ const r=e.getBoundingClientRect(); if(r.width<200||r.height<60) return; if(r.width>innerWidth+5) return; const s=getComputedStyle(e); if(s.position==='fixed') return; out.push([e.tagName,(e.className&&e.className.toString().slice(0,40))||'',Math.round(r.x),Math.round(r.width),Math.round(r.height)].join('|')); }); return out.slice(0,30); })()`;
for (const [w,h] of [[1280,800],[390,844]]) for (const [name,url] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.setViewport({ width: w, height: h, mobile: w<500 });
  await c.navigate(url, 3000);
  await c.eval(open); await new Promise(r=>setTimeout(r,4000));
  console.log("==",name,w); console.log((await c.eval(js)).join("\n"));
}
process.exit(0);
