import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1280, height: 720 });
const go = `(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`;
const snap = `(() => { const as=document.getAnimations(); const by={}; as.forEach(a=>{const n=a.animationName; if(!n) return; (by[n]=by[n]||[]).push(a)}); const o={}; for(const n of ['seal-break','seal-ring','particle-burst','envelope-away','dragon-fly-forward','seal-flower-bloom']){ const l=by[n]||[]; o[n]={count:l.length, sample:l.slice(0,2).map(a=>{const e=a.effect.target; const t=a.effect.getTiming(); const cs=getComputedStyle(e); return {dur:t.duration,delay:t.delay,ease:t.easing,fill:t.fill,el:e.tagName+'.'+String(e.className.baseVal??e.className).slice(0,40),style:(e.getAttribute('style')||'').slice(0,260),w:Math.round(e.getBoundingClientRect().width),h:Math.round(e.getBoundingClientRect().height)}})} } return o; })()`;
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(u,3500); await c.eval(go); await new Promise(r=>setTimeout(r,640));
  console.log("=====",n); console.log(JSON.stringify(await c.eval(snap),null,1));
}
process.exit(0);
