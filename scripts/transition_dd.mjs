import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const dir = process.argv[2];
await c.setViewport({ width: 1280, height: 720 });
const snap = `(() => { const d=(e)=>e?e.tagName+'.'+String(e.className).slice(0,30):'?'; const anims=document.getAnimations().map(a=>{const e=a.effect; const t=e&&e.target; const ct=e&&e.getComputedTiming?e.getComputedTiming():{}; return (a.animationName||a.transitionProperty||'?')+'@'+d(t)+' dur='+Math.round(ct.duration)+' prog='+(ct.progress==null?'':ct.progress.toFixed(2))+' '+(ct.easing||'')}).filter(s=>!/ambient|seal-pulse|shine/.test(s)); const card=document.querySelector('h1')&&document.querySelector('h1').closest('.relative.rounded-lg'); const wrap=card&&card.parentElement; const cs=wrap&&getComputedStyle(wrap); return {t:Math.round(performance.now()), hasCover:!!document.querySelector('.darkred-env-screen,[data-landing-screenshot-id=\"invite-envelope\"]'), wrap: cs?{tf:cs.transform,op:cs.opacity,anim:cs.animationName}:null, bodyChildren:document.body.innerText.slice(0,40).split(String.fromCharCode(10)).join('|'), anims}; })()`;
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(u,3500);
  await c.eval(`window.__t0=performance.now(); (() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`);
  console.log("=====",n);
  for (let i=0;i<14;i++){ const s=await c.eval(snap); console.log(JSON.stringify(s)); if(i%2===0) await c.screenshot(`${dir}/tr_${n}_${i}.png`); await new Promise(r=>setTimeout(r,200)); }
}
process.exit(0);
