// Audit một mẫu trên bản local: đo khối ở 390/768/1440, console/network, tràn ngang; so với số đo gốc nếu đã có.
// Dùng: node scripts/audit.mjs <templateId> [slug]    -> docs/survey/audit-<templateId>.md
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";

const id = process.argv[2];
if (!id) { console.error("Cách dùng: node scripts/audit.mjs <templateId> [slug]"); process.exit(1); }
const meta = JSON.parse(fs.readFileSync("docs/survey/_meta75.json", "utf8"));
const slug = process.argv[3] || meta.find((m) => m.id === id)?.slug;
if (!slug) { console.error("không tìm thấy slug cho", id); process.exit(1); }

// cùng thuật toán với scripts/survey/probe.js (P.findRoot + P.layout) để so được với số đo gốc
const LAYOUT = `(() => {
  const d = document, H = d.documentElement.scrollHeight; let best = null, bd = -1;
  d.body.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (e.children.length >= 5 && r.height >= H * 0.85 && r.height <= H + 5) { let dep = 0, p = e; while (p) { dep++; p = p.parentElement; } if (dep > bd) { best = e; bd = dep; } } });
  if (!best) return JSON.stringify({ docH: H, err: 'no root' });
  const rr = best.getBoundingClientRect();
  const broken = [...d.images].filter((i) => i.complete && i.naturalWidth === 0 && i.src).map((i) => i.src.replace(location.origin, ''));
  return JSON.stringify({ docH: H, rootH: Math.round(rr.height), kids: [...best.children].map((e) => Math.round(e.getBoundingClientRect().height)), overflow: d.documentElement.scrollWidth - d.documentElement.clientWidth, broken: [...new Set(broken)] });
})()`;

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
const out = [];
let issues = 0;
for (const w of [390, 768, 1440]) {
  await c.setViewport({ width: w, height: w === 390 ? 844 : 900 });
  c.networkLogs.length = 0; c.consoleLogs.length = 0;
  await c.navigate(`http://localhost:5173/vi/mau-thiep/${slug}/demo?open=1&autoscroll=0`, 6500);
  const L = JSON.parse(await c.eval(LAYOUT));
  const net = [...new Set(c.networkLogs.filter((n) => n.response && n.response.status >= 400).map((n) => `${n.response.status} ${n.response.url.replace("http://localhost:5173", "")}`))];
  const cons = [...new Set(c.consoleLogs.filter((m) => m.type === "error").map((m) => (m.args || []).map((a) => a.value || a.description || "").join(" ").slice(0, 100)))];
  let real = null;
  try { real = JSON.parse(fs.readFileSync(`docs/survey/raw/${id}_open${w}.json`, "utf8")).layout; } catch { /* chưa đo gốc */ }
  const rk = real && real.kids ? real.kids.map((k) => k.h).filter((h) => h > 0) : null;
  const lk = (L.kids || []).filter((h) => h > 0);
  const rows = [];
  if (rk && lk.length === rk.length) lk.forEach((h, i) => { if (Math.abs(h - rk[i]) > 2) rows.push(`khối ${i + 1}: local ${h} / gốc ${rk[i]} (${h - rk[i] > 0 ? "+" : ""}${h - rk[i]})`); });
  const totalDelta = real && real.rootH ? L.rootH - real.rootH : null;
  const sameStructure = rk ? lk.length === rk.length : null;
  if (net.length || cons.length || L.overflow > 0 || (L.broken || []).length) issues++;
  if (totalDelta !== null && Math.abs(totalDelta) > 2) issues++;
  out.push({ w, L, net, cons, rows, totalDelta, sameStructure, nLocal: lk.length, nReal: rk ? rk.length : null });
}
const md = [`# Audit — ${id} (${slug})`, "", `${new Date().toISOString().slice(0, 10)} · local`, "", "| Khổ | Tổng local | Tổng gốc | Lệch | Số khối local/gốc | Tràn ngang | Ảnh vỡ | Network lỗi | Console lỗi |", "|---|---|---|---|---|---|---|---|---|"];
for (const o of out) md.push(`| ${o.w} | ${o.L.rootH ?? o.L.docH} | ${o.totalDelta === null ? "-" : (o.L.rootH ?? 0) - o.totalDelta} | ${o.totalDelta === null ? "-" : o.totalDelta} | ${o.nLocal}/${o.nReal ?? "-"} | ${o.L.overflow} | ${(o.L.broken || []).length} | ${o.net.length} | ${o.cons.length} |`);
for (const o of out) { if (o.rows.length) md.push("", `**${o.w}px — khối lệch > 2px:** ` + o.rows.join("; ")); if (o.sameStructure === false) md.push("", `**${o.w}px:** số khối khác nhau (local ${o.nLocal} / gốc ${o.nReal}) — chưa so được từng khối.`); if (o.net.length) md.push("", `Network ${o.w}: ${o.net.join("; ")}`); if (o.cons.length) md.push("", `Console ${o.w}: ${o.cons.join("; ")}`); }
fs.writeFileSync(`docs/survey/audit-${id}.md`, md.join("\n") + "\n");
console.log(id, out.map((o) => `${o.w}:${o.L.rootH ?? o.L.docH}${o.totalDelta === null ? "" : "(Δ" + o.totalDelta + ")"} khối ${o.nLocal}/${o.nReal ?? "-"} lệch ${o.rows.length}`).join(" | "), issues ? "CÓ VẤN ĐỀ" : "sạch");
process.exit(0);
