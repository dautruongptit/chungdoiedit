import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const dir=process.argv[2]; await c.setViewport({ width: 1440, height: 900 });
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(u,3500); await c.screenshot(`${dir}/${n}_cover1440.png`);
  console.log(n, JSON.stringify(await c.eval(`(() => { const r=[]; let e=document.querySelector('h1'); while(e&&e!==document.documentElement){ const cs=getComputedStyle(e); const b=e.getBoundingClientRect(); r.push(e.tagName+'.'+String(e.className).slice(0,25)+' '+Math.round(b.x)+','+Math.round(b.y)+' '+Math.round(b.width)+'x'+Math.round(b.height)+' bd='+cs.borderTopWidth+' '+cs.borderTopColor+' bs='+cs.boxShadow.slice(0,40)+' out='+cs.outlineWidth); e=e.parentElement;} return r; })()`),null,1));
  await c.eval(`(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`); await new Promise(r=>setTimeout(r,4000)); await c.screenshot(`${dir}/${n}_open1440.png`);
}
process.exit(0);
