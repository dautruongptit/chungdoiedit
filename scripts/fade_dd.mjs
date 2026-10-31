import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1280, height: 720 });
const inst = `(() => { window.__s=[]; const t0=performance.now(); let done=false; const tick=()=>{ const h=document.querySelector('header'); const cover=document.querySelector('h1'); if(h&&!cover){ let e=h; const ops=[]; while(e&&e!==document.body){ const cs=getComputedStyle(e); if(cs.opacity!=='1'||cs.transform!=='none') ops.push(e.tagName+':'+cs.opacity+':'+cs.transform.slice(0,30)+':'+cs.animationName); e=e.parentElement;} window.__s.push([Math.round(performance.now()-t0),ops.join(' | ')]); if(window.__s.length>40) return; } requestAnimationFrame(tick); }; tick(); const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`;
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(u,3500); await c.eval(inst); await new Promise(r=>setTimeout(r,3000));
  console.log("=====",n); const s=await c.eval(`window.__s`); s.filter((x,i)=>i%6===0||i<4).forEach(x=>console.log(x[0],x[1].slice(0,200)));
}
process.exit(0);
