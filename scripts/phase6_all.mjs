import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const src = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const slugs = [...src.matchAll(/"slug": *"([^"]*)"/g)].map((m) => m[1]);
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 390, height: 844 });
const res = [];
for (const slug of slugs) {
  const r = { slug };
  for (const [k, q] of [["cover", ""], ["open", "?open=1"]]) {
    c.networkLogs.length = 0; c.consoleLogs.length = 0;
    await c.navigate(`http://localhost:5173/vi/mau-thiep/${slug}/demo${q}`, 2800);
    const m = JSON.parse(await c.eval(`JSON.stringify({h:document.documentElement.scrollHeight,ov:document.documentElement.scrollWidth-document.documentElement.clientWidth,len:document.body.innerText.length,broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0&&i.src).length,openDlg:document.querySelectorAll('dialog').length&&[...document.querySelectorAll('dialog')].filter(d=>getComputedStyle(d).visibility==='visible'&&getComputedStyle(d).display!=='none'&&!d.open&&!d.classList.contains('modal-open')).length})`));
    m.net = [...new Set(c.networkLogs.filter((n) => n.response && n.response.status >= 400).map((n) => n.response.status + " " + n.response.url.replace("http://localhost:5173", "")))].slice(0, 5);
    m.err = [...new Set(c.consoleLogs.filter((x) => x.type === "error").map((x) => (x.args || []).map((a) => a.value || a.description || "").join(" ").slice(0, 120)))].slice(0, 3);
    r[k] = m;
  }
  res.push(r);
}
fs.writeFileSync("docs/phase6-all-templates.json", JSON.stringify(res, null, 1));
const bad = res.filter((r) => ["cover", "open"].some((k) => r[k].net.length || r[k].err.length || r[k].ov > 0 || r[k].len < 50 || r[k].broken || r[k].openDlg));
console.log("templates", res.length, "with issues", bad.length);
for (const b of bad) console.log(b.slug, JSON.stringify({ cover: b.cover, open: b.open }).slice(0, 420));
process.exit(0);
