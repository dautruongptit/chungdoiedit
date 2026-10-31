import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1531, height: 1023 });
await c.navigate("http://localhost:5173/invitations/create/minimalism-do-dam",5000);
console.log(JSON.stringify(await c.eval(`(() => { const b=document.querySelector('.tpl-btn'); const i=b.querySelector('img'); const r=b.getBoundingClientRect(); const cs=getComputedStyle(b.querySelector('.tpl-btn-text-col')); return {btn:[r.x,r.y,r.width,r.height].map(Math.round), src:i.src, nat:[i.naturalWidth,i.naturalHeight], complete:i.complete, text:b.innerText, colDisplay:cs.display, colColor:cs.color, op:cs.opacity, imgStyle:getComputedStyle(i).objectFit+' '+getComputedStyle(i).filter}; })()`),null,1));
process.exit(0);
