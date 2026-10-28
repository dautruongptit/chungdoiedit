// So dump gốc và local theo từng phần tử. Dùng: node scripts/survey/diff_dump.mjs <templateId> <state> <width>
// Ghi docs/survey/diff-<id>-<state>-<width>.md và in tóm tắt.
// Dung sai hình học 1px; kiểu chữ/màu/bo góc so chuỗi chính xác.
import fs from "node:fs";

const [id, state, w] = process.argv.slice(2);
if (!id || !state || !w) { console.error("Cách dùng: node scripts/survey/diff_dump.mjs <templateId> <state> <width>"); process.exit(1); }
const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const real = read(`docs/survey/raw/${id}_dump_${state}_${w}.json`);
const EXP = process.argv.includes("--exp");
const loc = read(`docs/survey/raw/local_${id}_dump_${state}_${w}${EXP ? "_exp" : ""}.json`);
const TOL = Number(process.env.TOL || 1);
const GEOM = ["x", "y", "w", "h"];
const norm = (v) => String(v ?? "").replace(/rgba\(0, ?0, ?0, ?0\) 0px 0px 0px 0px( inset)?,? ?/g, "").replace(/3\.35544e\+07px/g, "9999px").replace(/,\s*ChungDoiIndic\w*/g, ",serif").replace(/,\s*(serif|cursive)$/g, ",serif");
const STYLE = ["fs", "fw", "ff", "lh", "ls", "c", "tt", "ta", "fst", "bg", "br", "bd", "op", "sh"];
const lm = new Map(loc.recs.map((r) => [r.k, r]));
const rm = new Map(real.recs.map((r) => [r.k, r]));
const rows = [];
let matched = 0, geomBad = 0, styleBad = 0;
const byProp = {};
const sectionOf = (y) => Math.floor(y / 100) * 100;
for (const r of real.recs) {
  const l = lm.get(r.k);
  if (!l) continue;
  matched++;
  const d = [];
  for (const p of GEOM) if (Math.abs((l[p] ?? 0) - (r[p] ?? 0)) > TOL) { d.push(`${p}: ${l[p]}→${r[p]}`); byProp[p] = (byProp[p] || 0) + 1; }
  const g = d.length;
  for (const p of STYLE) if (r[p] !== undefined || l[p] !== undefined) if (norm(r[p]) !== norm(l[p])) { d.push(`${p}: ${l[p] ?? "∅"}→${r[p] ?? "∅"}`); byProp[p] = (byProp[p] || 0) + 1; }
  if (g) geomBad++;
  if (d.length > g) styleBad++;
  if (d.length) rows.push({ k: r.k, y: r.y, d, cls: l.cls || "" });
}
const onlyReal = real.recs.filter((r) => !lm.has(r.k)).map((r) => r.k);
const onlyLocal = loc.recs.filter((r) => !rm.has(r.k)).map((r) => r.k);
const md = [`# Diff phần tử — ${id} / ${state} / ${w}px`, "", "Ký hiệu: `thuộc tính: local→gốc`. Dung sai hình học " + TOL + "px.", "",
  `- Root: local ${loc.rootW}×${loc.rootH} · gốc ${real.rootW}×${real.rootH}`,
  `- Phần tử: gốc ${real.recs.length}, local ${loc.recs.length}, ghép được ${matched}`,
  `- Lệch hình học: ${geomBad}; lệch kiểu: ${styleBad}; chỉ có ở gốc: ${onlyReal.length}; chỉ có ở local: ${onlyLocal.length}`,
  `- Theo thuộc tính: ${Object.entries(byProp).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}=${v}`).join(", ") || "không có"}`, "",
  "## Chỉ có ở gốc", ...onlyReal.slice(0, 60).map((k) => "- " + k), "", "## Chỉ có ở local", ...onlyLocal.slice(0, 60).map((k) => "- " + k), "",
  "## Lệch (theo vị trí dọc)", ...rows.sort((a, b) => a.y - b.y).slice(0, 400).map((r) => `- y${r.y} \`${r.k}\` [${r.cls}] ${r.d.join("; ")}`), ""].join("\n");
fs.writeFileSync(`docs/survey/diff-${id}-${state}-${w}${EXP ? "-exp" : ""}.md`, md);
console.log(`${id} ${state} ${w}: ghép ${matched}/${real.recs.length} · lệch hình học ${geomBad} · lệch kiểu ${styleBad} · chỉ gốc ${onlyReal.length} · chỉ local ${onlyLocal.length} | ${Object.entries(byProp).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k}=${v}`).join(" ")}`);
