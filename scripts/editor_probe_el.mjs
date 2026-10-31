// node editor_probe_el.mjs <cardIdx> : liệt kê mọi div trong thẻ (real & clone) kèm kích thước, padding, gap
import { ChromeController } from "./cdp_helper.mjs";
const idx = Number(process.argv[2]);
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
const js = (sel) => `(() => { const card=[...document.querySelectorAll(${JSON.stringify(sel)})][${idx}]; if(!card) return JSON.stringify(["NOCARD"]); const t0=card.getBoundingClientRect().top; const l0=card.getBoundingClientRect().left; const out=[];
const walk=(e,dep)=>{ const cs=getComputedStyle(e); if(cs.display==='none') return; const r=e.getBoundingClientRect(); if(r.width&&r.height){ const cls=(typeof e.className==='string'?e.className:'').replace(/\s+/g,'.').slice(0,40); out.push(' '.repeat(dep)+e.tagName.toLowerCase()+'.'+cls+' | y'+Math.round(r.top-t0)+' x'+Math.round(r.left-l0)+' '+Math.round(r.width)+'x'+Math.round(r.height)+' pad:'+cs.padding+' gap:'+cs.gap+' mt:'+cs.marginTop+' mb:'+cs.marginBottom+' lh:'+cs.lineHeight+' br:'+cs.borderRadius);} if(e.tagName.toLowerCase()!=='svg') [...e.children].forEach(ch=>walk(ch,dep+1)); };
try{walk(card,0);}catch(err){out.push("ERR "+err.message);} return JSON.stringify(out); })()`;
for (const [n, u, sel] of ([
  ["real", "https://chungdoi.com/edit/9efe57f2-2a60-47b4-9bb3-fe53d1681d04?template=minimalism_darkred", "main .max-w-2xl > div[class*=rounded-lg]"],
  ["clone", "http://localhost:5173/edit/pos-test?template=minimalism_darkred", "main .body > section.card"],
]).filter(x => !process.env.SKIP_REAL || x[0] !== "real")) {
  await c.navigate(u, 9000);
  console.log("==", n);
  for (const row of JSON.parse(await c.eval(js(sel)))) console.log(row);
}
process.exit(0);
