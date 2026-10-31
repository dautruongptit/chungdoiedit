// Báo cáo họ mẫu theo độ giống mã (đo từ chunk chứa 88 module mẫu của trang thật).
// Đầu vào: docs/survey/families-code-88.json, docs/survey/catalog-88.json, docs/survey/body-sig-88.json
// Đầu ra:  docs/survey/families-88.md
import fs from "node:fs";

const r = JSON.parse(fs.readFileSync("docs/survey/families-code-88.json", "utf8"));
const cat = JSON.parse(fs.readFileSync("docs/survey/catalog-88.json", "utf8"));
const sig = JSON.parse(fs.readFileSync("docs/survey/body-sig-88.json", "utf8"));
const pt = Object.fromEntries(cat.map((c) => [c.id, c.cfg.theme.particleType]));
const DONE = new Set(["minimalism_brown", "riviera_blue", "dragon_phoenix_v4_red"]);
const order = (id) => {
  const s = sig[id];
  if (!s || !s.hp) return "?";
  return s.hp.filter((x) => x[1] > 0).map((x) => x[0]).join(" > ") || "?";
};
const tag = (id) => `${DONE.has(id) ? "✅ " : ""}\`${id}\``;

const multi = r.families.filter((f) => f.length > 1);
const singles = r.families.filter((f) => f.length === 1).map((f) => f[0]);
const L = [];
L.push("# Họ mẫu thiệp — 88 mẫu (so mã trang thật, 01/11/2026)", "");
L.push("Cách đo: tải **một lần** chunk JS của trang thật chứa 88 module mẫu (mỗi module có `data-testid` riêng); với từng module lấy tập class Tailwind (đã bỏ màu, đường dẫn ảnh) và khung thẻ JSX (bộ ba thẻ liên tiếp); độ giống = trung bình hệ số Jaccard của hai tập đó. Phân bố tách đôi rất rõ: 3.583/3.828 cặp dưới 0,4, chỉ 1 cặp trong khoảng 0,7–0,8, 28 cặp từ 0,8 trở lên → ngưỡng **0,8** (kết quả không đổi trong cả khoảng 0,7–0,8).", "");
L.push("Kiểm chứng với mẫu đã clone: Nâu ↔ Long Phụng V4 giống 0,11; Nâu ↔ Riviera 0,17 (khác họ, đúng); Long Phụng đỏ ↔ lam 0,99; Bạch Sứ đỏ ↔ lam 1,00.", "");
L.push(`## Kết quả: **${r.families.length} họ** cho 88 mẫu`, "");
L.push(`- **${multi.length} họ nhiều mẫu** (bản khác màu cùng mã, ${multi.reduce((s, f) => s + f.length, 0)} mẫu): dựng **một** lần rồi thay theme/ảnh.`);
L.push(`- **${singles.length} mẫu thiết kế riêng**: mỗi mẫu là một bố cục riêng (kể cả khi trùng tên với mẫu khác, ví dụ 7 bản Minimalism chỉ giống nhau ~0,3–0,4).`);
L.push(`- Đã clone: ${[...DONE].map(tag).join(", ")} (cả ba đều là mẫu thiết kế riêng).`);
L.push(`- **Còn phải dựng: ${multi.length + singles.length - DONE.size} bố cục** để phủ 85 mẫu còn lại.`, "");
L.push("Phần **dùng chung** giữa mọi mẫu (không tính vào số bố cục): engine bìa + hạt + mở thiệp (`docs/survey/cover-effects.md`), hộp quà, RSVP, sổ lưu bút, nhạc, lightbox — các module mẫu gọi cùng một bộ module dùng chung (độ trùng danh sách module được gọi 0,7–1,0).", "");
L.push("## Họ nhiều mẫu", "", "| Họ | Số mẫu | Mẫu | Loại hạt | Thứ tự khối (390px) |", "|---|---|---|---|---|");
multi.forEach((f, i) => {
  L.push(`| F${String(i + 1).padStart(2, "0")} | ${f.length} | ${f.map(tag).join(", ")} | ${[...new Set(f.map((x) => pt[x]))].join(", ")} | ${order(f[0])} |`);
});
L.push("", "## Mẫu thiết kế riêng", "", "Cột \"Gần nhất\" là mẫu có mã giống nhất (dùng để chọn mẫu tham khảo khi dựng; dưới 0,5 coi như không dùng lại được).", "", "| # | Mẫu | Loại hạt | Gần nhất (độ giống) | Kích thước module | Thứ tự khối (390px) |", "|---|---|---|---|---|---|");
singles
  .sort((a, b) => (r.nearest[b][1] || 0) - (r.nearest[a][1] || 0))
  .forEach((id, i) => {
    const [nb, v] = r.nearest[id];
    L.push(`| ${i + 1} | ${tag(id)} | ${pt[id]} | \`${nb}\` (${v}) | ${Math.round(r.len[id] / 1000)} KB | ${order(id)} |`);
  });
L.push("", "## Ghi chú", "");
L.push("- Lần gom trước theo chiều cao khối ở 390px (`families-render-88.md`) **bị loại**: nó gom nhầm Nâu với Long Phụng V4. Dữ liệu đo đó vẫn dùng được cho thứ tự khối và bố cục mobile.");
L.push("- `co_ba_red` được gắn với module qua suy luận (trùng `data-testid` với `nhat_binh_red`); hai module này có mã khác nhau nên vẫn là hai mẫu riêng.");
fs.writeFileSync("docs/survey/families-88.md", L.join("\n") + "\n");
console.log(`họ: ${r.families.length}, nhiều mẫu: ${multi.length}, riêng: ${singles.length}, còn phải dựng: ${multi.length + singles.length - DONE.size}`);
