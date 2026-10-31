import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1280, height: 720 });
const go = `(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`;
const snap = `(() => { const ps=document.getAnimations().filter(a=>a.animationName==='particle-burst').map(a=>a.effect.target); const p=ps[0]; const par=p.parentElement; const colors={}; ps.forEach(e=>{const k=e.style.color; colors[k]=(colors[k]||0)+1}); const ring=document.getAnimations().find(a=>a.animationName==='seal-ring').effect.target; const seal=document.getAnimations().find(a=>a.animationName==='seal-break').effect.target; return {n:ps.length, colors, html:p.outerHTML.slice(0,500), parent:par.outerHTML.slice(0,200).split('>')[0], parentRect:JSON.stringify(par.getBoundingClientRect()), pRect:JSON.stringify(p.getBoundingClientRect()), ringParent:ring.parentElement.className, ringHtml:ring.outerHTML.slice(0,400), sealParent:seal.parentElement.className, sealHtml:seal.outerHTML.slice(0,700), sizes:ps.map(e=>e.style.fontSize.slice(0,4)).join(',')}; })()`;
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(u,3500); await c.eval(go); await new Promise(r=>setTimeout(r,650));
  console.log("=====",n); const o=await c.eval(snap); for (const k in o) console.log(k+':',typeof o[k]==='string'?o[k]:JSON.stringify(o[k]));
}
process.exit(0);
