// Gom 88 mẫu thành "họ bố cục" từ chữ ký đo ở trang thật (iframe 390px).
// Đầu vào: docs/survey/body-sig-88.json  { <id>: { slug, seq, hs, si, nSec, docH, tid, imgs } }
//          docs/survey/catalog-88.json   (cấu hình bìa: loại hạt…)
// Đầu ra:  docs/survey/families-render-88.md
// Dùng:    node scripts/survey/cluster_families.mjs [ngưỡng chênh chiều cao, mặc định 0.12]
import fs from "node:fs";

const TOL = Number(process.argv[2] || 0.12);
const sig = JSON.parse(fs.readFileSync("docs/survey/body-sig-88.json", "utf8"));
const cat = JSON.parse(fs.readFileSync("docs/survey/catalog-88.json", "utf8"));
const pt = Object.fromEntries(cat.map((c) => [c.id, c.cfg.theme.particleType]));
const order = [...fs.readFileSync("src/features/templates/data/templates.ts", "utf8").matchAll(/"slug": "[^"]+", "id": "([a-z0-9_]+)"/g)].map((m) => m[1]);
const DONE = new Set(["minimalism_brown", "riviera_blue", "dragon_phoenix_v4_red"]);

// Nhóm tên (bỏ hậu tố màu) để đối chiếu với nhóm đo được
const COLORS = new Set(["red", "green", "blue", "pink", "yellow", "brown", "white", "gold", "black", "purple", "orange", "darkred", "darkgreen", "darkblue", "darkbrown", "light"]);
const nameGroup = (id) => { const p = id.split("_"); while (p.length > 1 && COLORS.has(p[p.length - 1])) p.pop(); return p.join("_"); };

// Vector "nhịp khối": thứ tự khối + chiều cao mỗi khối = khoảng cách giữa hai tiêu đề liên tiếp (px, ở 390px).
// Khối bị ẩn (tiêu đề y = 0) bị bỏ. Mẫu thiếu `hp` (đo trước khi vá bộ đo) dùng chiều cao section `hs`.
const rhythm = (s) => {
  if (s.hp && s.hp.length > 1) {
    const v = s.hp.filter((x) => x[1] > 0);
    const order = v.map((x) => x[0]).join(">");
    const gaps = v.map((x, i) => (i + 1 < v.length ? v[i + 1][1] : s.H) - x[1]);
    return { order, gaps };
  }
  return { order: "sec" + s.nSec, gaps: s.hs };
};
// Hai mẫu cùng họ khi cùng thứ tự khối và chiều cao từng khối lệch trung bình ≤ TOL
const same = (a, b) => {
  if (!a || !b || a.err || b.err) return false;
  const ra = rhythm(a), rb = rhythm(b);
  if (ra.order !== rb.order || !ra.gaps.length) return false;
  let d = 0, s = 0;
  for (let i = 0; i < ra.gaps.length; i++) { d += Math.abs(ra.gaps[i] - rb.gaps[i]); s += Math.max(ra.gaps[i], rb.gaps[i], 1); }
  return d / s <= TOL;
};

const ids = order.filter((id) => sig[id] && !sig[id].err);
const fam = [];
for (const id of ids) {
  const f = fam.find((g) => same(sig[g[0]], sig[id]));
  if (f) f.push(id); else fam.push([id]);
}
fam.sort((a, b) => b.length - a.length);

const missing = order.filter((id) => !sig[id] || sig[id].err);
const lines = [];
lines.push(`# Họ bố cục thân thiệp — 88 mẫu (đo trang thật, iframe 390px)`, "");
lines.push(`> **Tạm thời, KHÔNG dùng để chia việc.** Gom theo nhịp chiều cao khối ở 390px không đủ sắc: ở ngưỡng 15%, họ H01 gom chung Nâu và Long Phụng V4 (đã biết là hai thiết kế khác hẳn), trong khi nhiều bản khác màu lại bị tách. Số họ đổi từ 46 xuống 12 khi nới ngưỡng 6% → 20%. Kết luận đáng tin rút từ lần đo này: (1) cả 88 mẫu dùng **chung một bộ mã** (không có chunk JS riêng theo mẫu); (2) mã từng mẫu nằm trong một chunk lớn có 88 module có \`data-testid\` riêng; (3) thứ tự khối có 6 kiểu (bảng dưới, cột "Thứ tự khối"). Chia họ chính xác phải làm bằng **so sánh mã của 88 module** (xem \`docs/clone-plan-88.md\`).`, "");
lines.push(`Tiêu chí cùng họ: cùng thứ tự khối và chiều cao từng khối (khoảng cách giữa hai tiêu đề) lệch trung bình ≤ ${Math.round(TOL * 100)}%. Đây là gom theo **cấu trúc hiển thị ở 390px**, cần xác nhận lại ở 768/1440 khi dựng.`, "");
lines.push(`- Đo được: ${ids.length}/88 mẫu${missing.length ? `; thiếu/lỗi: ${missing.join(", ")}` : ""}`);
lines.push(`- Số họ: **${fam.length}** (họ ≥2 mẫu: ${fam.filter((f) => f.length > 1).length}; mẫu lẻ: ${fam.filter((f) => f.length === 1).length})`);
lines.push(`- Họ đã có mẫu clone (✅): ${fam.filter((f) => f.some((x) => DONE.has(x))).length}`, "");
lines.push(`| Họ | Số mẫu | Thứ tự khối | Chiều cao khối (px, 390) | Mẫu (loại hạt) | Nhóm tên khớp? |`, `|---|---|---|---|---|---|`);
fam.forEach((f, i) => {
  const s = sig[f[0]];
  const groups = new Set(f.map(nameGroup));
  const members = f.map((x) => `${DONE.has(x) ? "✅" : ""}\`${x}\` (${pt[x] || "?"})`).join(", ");
  const rr = rhythm(s);
  lines.push(`| H${String(i + 1).padStart(2, "0")} | ${f.length} | ${rr.order} | ${rr.gaps.join("/")} | ${members} | ${groups.size === 1 ? "cùng nhóm tên" : groups.size + " nhóm tên"} |`);
});
lines.push("", "## Nhóm tên bị tách ra nhiều họ (bản khác màu nhưng bố cục đo được khác)", "");
const byName = {};
ids.forEach((id) => { (byName[nameGroup(id)] = byName[nameGroup(id)] || []).push(id); });
const famOf = (id) => fam.findIndex((f) => f.includes(id));
let split = 0;
for (const [g, members] of Object.entries(byName)) {
  const fs_ = new Set(members.map(famOf));
  if (members.length > 1 && fs_.size > 1) { split++; lines.push(`- \`${g}\`: ${members.map((m) => `${m}→H${String(famOf(m) + 1).padStart(2, "0")}`).join(", ")}`); }
}
if (!split) lines.push("- (không có)");
fs.writeFileSync("docs/survey/families-render-88.md", lines.join("\n") + "\n");
console.log(`đo ${ids.length}/88, số họ ${fam.length}, họ ≥2: ${fam.filter((f) => f.length > 1).length}, lẻ: ${fam.filter((f) => f.length === 1).length}, nhóm tên bị tách: ${split}`);
