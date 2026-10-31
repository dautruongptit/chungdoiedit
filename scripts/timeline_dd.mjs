import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1280, height: 720 });
const inst = `(() => { window.__log=[]; const t0=()=>Math.round(performance.now()-window.__t0); const d=e=>e&&e.tagName?e.tagName.toLowerCase()+'.'+String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).split(' ').slice(0,3).join('.'):'';
 document.addEventListener('animationstart',e=>{ if(/ambient|seal-pulse|shine|ping|particle-burst/.test(e.animationName)&&!window.__pb){ if(/particle-burst/.test(e.animationName)){window.__pb=1;window.__log.push([t0(),'START particle-burst(first)'])} return;} window.__log.push([t0(),'START '+e.animationName+' '+d(e.target)]) },true);
 document.addEventListener('animationend',e=>{ if(/ambient|seal-pulse|shine|ping|particle|drFloat|ienv/.test(e.animationName)) return; window.__log.push([t0(),'END '+e.animationName+' '+d(e.target)]) },true);
 new MutationObserver(ms=>{ for(const m of ms){ m.removedNodes.forEach(n=>{ if(n.nodeType===1 && n.querySelector && (n.querySelector('h1')||/envelope|darkred/.test(String(n.className)))) window.__log.push([t0(),'REMOVED '+d(n)]) }); m.addedNodes.forEach(n=>{ if(n.nodeType===1 && /songphung|demo-page|header|flex w-full justify-center/.test(String(n.className)+n.tagName)) window.__log.push([t0(),'ADDED '+d(n)]) }); } }).observe(document.body,{childList:true,subtree:true});
 window.__t0=performance.now(); const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`;
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(u,3500); await c.eval(inst); await new Promise(r=>setTimeout(r,4500));
  console.log("=====",n); (await c.eval(`window.__log`)).forEach(l=>console.log(String(l[0]).padStart(5),l[1]));
}
process.exit(0);
