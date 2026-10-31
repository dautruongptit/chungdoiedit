import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 390, height: 900, mobile: true });
for (const url of ["https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo","http://localhost:5173/demo?template=minimalism-do-dam"]) {
  await c.navigate(url, 3000);
  await c.eval(`(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); if(b) b.click(); })()`);
  await new Promise(r=>setTimeout(r,3500));
  console.log(JSON.stringify(await c.eval(`(() => { const i=[...document.querySelectorAll('img')].find(x=>x.className.includes('object-cover')&&x.closest('header')); const d=i.parentElement; const w=d.parentElement; const cs=getComputedStyle(d), ws=getComputedStyle(w); return {boxSizing:cs.boxSizing,bw:cs.borderTopWidth,bs:cs.borderTopStyle,ar:cs.aspectRatio,w:cs.width,h:cs.height,transform:cs.transform,wcls:w.className,ww:ws.width,wh:ws.height,img:getComputedStyle(i).height}; })()`)));
}
process.exit(0);
