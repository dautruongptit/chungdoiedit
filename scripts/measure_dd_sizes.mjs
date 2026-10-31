import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
const js = `(() => { const h=document.querySelector('h1'); const card=h.closest('.relative.rounded-lg'); const r=card.getBoundingClientRect(); const wrap=card.parentElement.getBoundingClientRect();
 return {card:[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)], wrap:[Math.round(wrap.width)], htmlFs:getComputedStyle(document.documentElement).fontSize, zoom:getComputedStyle(document.documentElement).zoom, bodyFs:getComputedStyle(document.body).fontSize, h1:getComputedStyle(h).fontSize, dpr:devicePixelRatio, iw:innerWidth}; })()`;
for (const [w,h] of [[1907,913],[1914,913],[1920,913],[1920,1080],[1600,913],[1536,913],[1440,913],[2560,1300]]) {
  for (const [name, url] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
    await c.setViewport({ width: w, height: h, mobile: w<500 });
    await c.navigate(url, 2500);
    console.log(w+"x"+h, name, JSON.stringify(await c.eval(js)));
  }
}
process.exit(0);
