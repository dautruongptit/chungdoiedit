import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
const js = `(() => { const R=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}};
 const imgs=[...document.querySelectorAll('img')].filter(i=>/flower/.test(i.src)).map(i=>({cls:i.className,r:R(i),op:getComputedStyle(i).opacity,tf:getComputedStyle(i).transform}));
 const h1=document.querySelector('h1'); const card=h1&&h1.closest('.relative.rounded-lg');
 return {imgs,card:card&&R(card),h1:h1&&{r:R(h1),fs:getComputedStyle(h1).fontSize}}; })()`;
for (const [name, url] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  for (const w of [1280, 390]) {
    await c.setViewport({ width: w, height: 900, mobile: w<500 });
    await c.navigate(url, 3500);
    const o=await c.eval(js); console.log(name, w, JSON.stringify(o.imgs.filter(i=>i.r.w>0).map(i=>i.r)), JSON.stringify(o.card));
  }
}
await c.close?.();
process.exit(0);
