// So dump local hiện tại với bản mốc đã lưu: node scripts/cmp_dumps.mjs <thư mục mốc> <templateId> <state:width>...
// Dùng để chứng minh refactor không đổi số đo (mọi thuộc tính của mọi phần tử).
import fs from "node:fs";
const [, , base, id, ...specs] = process.argv;
let bad = 0;
for (const sw of specs) {
  const [s, w] = sw.split(":");
  const f = `local_${id}_dump_${s}_${w}.json`;
  const a = JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
  const b = JSON.parse(fs.readFileSync(`docs/survey/raw/${f}`, "utf8"));
  const ka = new Map(a.recs.map((r) => [r.k, r]));
  let diff = 0, added = 0;
  const shown = [];
  for (const r of b.recs) {
    const o = ka.get(r.k);
    if (!o) { added++; continue; }
    for (const k of Object.keys(r)) if (String(r[k]) !== String(o[k])) { diff++; if (shown.length < 4) shown.push(`${r.k.slice(0, 40)} ${k}: ${o[k]} -> ${r[k]}`); }
  }
  const removed = a.recs.length - (b.recs.length - added);
  const ok = diff === 0 && added === 0 && removed === 0 && a.rootH === b.rootH;
  if (!ok) bad++;
  console.log(`${ok ? "GIỐNG" : "KHÁC "} ${s} ${w}: ${a.recs.length}→${b.recs.length} phần tử, khác thuộc tính ${diff}, mới ${added}, mất ${removed}, rootH ${a.rootH}→${b.rootH}`);
  shown.forEach((x) => console.log("   ", x));
}
process.exit(bad ? 1 : 0);
