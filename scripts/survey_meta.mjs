// Bảng meta 75 mẫu (cover component, hộp quà, hạt, con dấu, tag) để chọn mẫu khảo sát. Đọc mã nguồn, không sửa.
import fs from "node:fs";
const root = "src/features/invitation";
const tpl = fs.readFileSync("src/features/templates/data/templates.ts", "utf8");
const items = [...tpl.matchAll(/\{"slug": *"([^"]*)", *"id": *"([^"]*)", *"name": *"([^"]*)"[^}]*?"tags": *\[([^\]]*)\]/g)].map((m) => ({ slug: m[1], id: m[2], name: m[3], tags: m[4].replace(/"/g, "") }));
const idx = fs.readFileSync(`${root}/components/covers/index.ts`, "utf8");
const cov = Object.fromEntries([...idx.matchAll(/"([a-z0-9_]+)": *([A-Za-z0-9]+),/g)].map((m) => [m[1], m[2]]));
const cc = fs.readFileSync(`${root}/components/covers/coverConfigs.ts`, "utf8");
const gb = fs.readFileSync(`${root}/config/giftboxConfigs.ts`, "utf8");
const pick = (src, id, key) => { const i = src.indexOf(`"${id}": {`) >= 0 ? src.indexOf(`"${id}": {`) : src.indexOf(`${id}: {`); if (i < 0) return ""; const seg = src.slice(i, i + 2500); const m = seg.match(new RegExp(key + ': *"?([^",\n]*)')); return m ? m[1] : ""; };
const rows = items.map((t) => ({ ...t, cover: cov[t.id] || "", particle: pick(cc, t.id, "particleType"), seal: pick(cc, t.id, "sealType"), gift: pick(gb, t.id, "giftboxType") }));
fs.mkdirSync("docs/survey", { recursive: true });
fs.writeFileSync("docs/survey/_meta75.json", JSON.stringify(rows, null, 1));
const g = (k) => Object.entries(rows.reduce((a, r) => ((a[r[k]] = (a[r[k]] || 0) + 1), a), {})).map(([a, b]) => `${a || "-"}:${b}`).join(" ");
console.log(rows.length, "\ncover", g("cover"), "\nparticle", g("particle"), "\nseal", g("seal"), "\ngift", g("gift"));
