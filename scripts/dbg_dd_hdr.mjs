import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 390, height: 900, mobile: true });
for (const url of ["https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo","http://localhost:5173/demo?template=minimalism-do-dam"]) {
  await c.navigate(url, 3000);
  await c.eval(`(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); if(b) b.click(); })()`);
  await new Promise(r=>setTimeout(r,3500));
  console.log(JSON.stringify(await c.eval(`(() => { const h=document.querySelector('header'); const cs=getComputedStyle(h); const last=h.lastElementChild.getBoundingClientRect(); const hr=h.getBoundingClientRect(); const kids=[...h.children].map(k=>[k.tagName,Math.round(k.getBoundingClientRect().top-hr.top),Math.round(k.getBoundingClientRect().height)]); return {pt:cs.paddingTop,pb:cs.paddingBottom,h:hr.height,kids}; })()`)));
}
process.exit(0);
