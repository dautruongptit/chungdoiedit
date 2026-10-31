// Dùng: node editor_rects.mjs <chỉ số thẻ real> <chỉ số thẻ clone>
// In ra các phần tử (text / input / button / svg / img) trong một thẻ mục: top tương đối, left, w, h, font-size.
import { ChromeController } from "./cdp_helper.mjs";
const [ri, ci] = [Number(process.argv[2]), Number(process.argv[3] ?? process.argv[2])];
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
const js = (sel, idx) => `(() => { const card=[...document.querySelectorAll(${JSON.stringify(sel)})][${idx}]; const top0=card.getBoundingClientRect().top; const left0=card.getBoundingClientRect().left; const out=[];
card.querySelectorAll('*').forEach(e=>{ const cs=getComputedStyle(e); if(cs.display==='none'||cs.visibility==='hidden') return; const r=e.getBoundingClientRect(); if(!r.width||!r.height) return;
 const own=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ').slice(0,28);
 const tag=e.tagName.toLowerCase(); if(!own && !['input','button','textarea','img','svg','select'].includes(tag)) return;
 out.push([tag, own, Math.round(r.top-top0), Math.round(r.left-left0), Math.round(r.width), Math.round(r.height), cs.fontSize, cs.fontWeight].join('\\t')); });
return JSON.stringify(out); })()`;
for (const [n, u, sel, idx] of [
  ["real", "https://chungdoi.com/edit/9efe57f2-2a60-47b4-9bb3-fe53d1681d04?template=minimalism_darkred", "main .max-w-2xl > div.rounded-lg", ri],
  ["clone", "http://localhost:5173/edit/pos-test?template=minimalism_darkred", "main .body > section.card", ci],
]) {
  await c.navigate(u, 6500);
  console.log("==", n);
  for (const row of JSON.parse(await c.eval(js(sel, idx)))) console.log(row);
}
process.exit(0);
