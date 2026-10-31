import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(u,3500);
  await c.eval(`(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`); await new Promise(r=>setTimeout(r,3500));
  console.log("=====",n); console.log((await c.eval(`(() => { const r=[]; let e=document.querySelector('header'); while(e&&e!==document.documentElement){ const cs=getComputedStyle(e); const b=e.getBoundingClientRect(); r.push(e.tagName+'.'+String(e.className).slice(0,34)+' | '+Math.round(b.x)+' '+Math.round(b.width)+'x'+Math.round(b.height)+' | bd='+cs.borderLeftWidth+' '+cs.borderLeftStyle+' '+cs.borderLeftColor+' | rad='+cs.borderTopLeftRadius+' | sh='+cs.boxShadow.slice(0,60)+' | bg='+cs.backgroundColor+' | of='+cs.overflow); e=e.parentElement;} return r; })()`)).join("\n"));
  console.log(JSON.stringify(await c.eval(`(() => { const i=[...document.querySelectorAll('img')].find(x=>/castle/.test(x.src)); const b=i.getBoundingClientRect(); const cs=getComputedStyle(i); return {x:Math.round(b.x),y:Math.round(b.y+scrollY),w:Math.round(b.width),h:Math.round(b.height),tf:cs.transform,op:cs.opacity,cls:i.className}; })()`)));
}
process.exit(0);
