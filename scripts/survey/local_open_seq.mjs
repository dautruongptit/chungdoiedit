// So chuỗi animation khi bấm "Mở thiệp" của bản local với số đo gốc. Dùng: node scripts/survey/local_open_seq.mjs <templateId>
// Ghi docs/survey/open-seq-compare-<id>.md
import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const id = process.argv[2];
if (!id) { console.error("thiếu <templateId>"); process.exit(1); }
const meta = JSON.parse(fs.readFileSync("docs/survey/_meta75.json", "utf8")).find((m) => m.id === id);
const real = JSON.parse(fs.readFileSync(`docs/survey/raw/${id}_openSeq.json`, "utf8"));

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
await c.setViewport({ width: 390, height: 844 });
await c.navigate(`http://localhost:5173/vi/mau-thiep/${meta.slug}/demo?autoscroll=0`, 4500);
const js = `(async () => {
  const d = document; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const btn = [...d.querySelectorAll('a,button')].find((e) => /mở thiệp/i.test(e.textContent.trim()) && e.getBoundingClientRect().height > 0);
  if (!btn) return JSON.stringify({ err: 'no button' });
  const seen = new Set(), ev = [], t0 = performance.now();
  const rec = () => d.getAnimations().forEach((a) => { const e = a.effect, t = e && e.getTiming ? e.getTiming() : {}; const k = (a.animationName || a.transitionProperty || '') + (e && e.target ? e.target.className : ''); if (!seen.has(k)) { seen.add(k); ev.push({ at: Math.round(performance.now() - t0), name: a.animationName || a.transitionProperty || '', dur: Math.round(t.duration || 0), delay: Math.round(t.delay || 0) }); } });
  let removedAt = null; const mo = new MutationObserver((ms) => ms.forEach((m) => m.removedNodes.forEach((n) => { if (n.nodeType === 1 && removedAt === null && /Mở thiệp/.test(n.textContent || '')) removedAt = Math.round(performance.now() - t0); }))); mo.observe(d.body, { childList: true, subtree: true });
  btn.click();
  for (let i = 0; i < 80; i++) { rec(); await sleep(40); }
  mo.disconnect();
  return JSON.stringify({ ev, removedAt, h: d.documentElement.scrollHeight });
})()`;
const r = JSON.parse(await c.eval(js));
const names = (arr) => arr.filter((a) => a.name && !/^(ping$|ambient|mbFloat|igb|ienv|bounce-gentle|ping-slow|background|opacity|translate|border|box-shadow|set-page)/.test(a.name));
const realP = names(real.anims || []).map((a) => ({ name: a.name, at: a.at, dur: Math.round(a.dur) }));
const locP = names(r.ev || []);
const rows = [];
const allNames = [...new Set([...realP.map((x) => x.name), ...locP.map((x) => x.name)])];
for (const n of allNames) { const a = realP.find((x) => x.name === n), b = locP.find((x) => x.name === n); rows.push(`| ${n} | ${a ? `${a.at} / ${a.dur}` : "—"} | ${b ? `${b.at} / ${b.dur}` : "—"} | ${a && b ? (Math.abs(a.dur - b.dur) <= 50 ? "khớp" : "lệch thời lượng") : a ? "THIẾU ở local" : "thừa ở local"} |`); }
const md = [`# So hiệu ứng mở thiệp — ${id}`, "", "t = ms từ lúc bấm / thời lượng animation (ms). Số đo gốc từ `docs/survey/raw/" + id + "_openSeq.json`.", "", "| animation | gốc (t / dur) | local (t / dur) | kết quả |", "|---|---|---|---|", ...rows, "", `Bìa bị gỡ: gốc ≈ ${(real.dom.find((d) => d.op === "removed" && /jsx-5db/.test(d.el)) || {}).at ?? "?"} ms; local ≈ ${r.removedAt ?? "?"} ms. Chiều cao sau khi mở: gốc ${real.after.h}, local ${r.h}.`, ""].join("\n");
fs.writeFileSync(`docs/survey/open-seq-compare-${id}.md`, md);
const miss = rows.filter((x) => /THIẾU|lệch|thừa/.test(x)).length;
console.log(id, `animation: gốc ${realP.length}, local ${locP.length}, khác biệt ${miss}`);
process.exit(0);
