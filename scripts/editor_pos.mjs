import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
// Mỗi thẻ mục: tiêu đề, top, left, width, height, khoảng cách tới thẻ kế
const js = (sel) => `(() => { const cards=[...document.querySelectorAll(${JSON.stringify(sel)})]; return JSON.stringify(cards.map((e,i)=>{ const b=e.getBoundingClientRect(); const n=cards[i+1]; const t=(e.innerText||'').split('\\n')[0].trim().slice(0,22); return [t, Math.round(b.top+scrollY), Math.round(b.left), Math.round(b.width), Math.round(b.height), n? Math.round(n.getBoundingClientRect().top - b.bottom):'-'].join('\\t'); })); })()`;
for (const [n, u, sel] of ([
  ["real", "https://chungdoi.com/edit/9efe57f2-2a60-47b4-9bb3-fe53d1681d04?template=minimalism_darkred", "main .max-w-2xl > div.rounded-lg"],
  ["clone", "http://localhost:5173/edit/pos-test?template=minimalism_darkred", "main .body > section.card"],
]).filter(x => x[0] !== "real")) {
  await c.navigate(u, 6500);
  console.log(n);
  for (const row of JSON.parse(await c.eval(js(sel)))) console.log(row);
}
process.exit(0);
