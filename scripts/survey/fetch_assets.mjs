// Tải ảnh tham chiếu của một mẫu (đọc từ docs/survey/raw/<id>_open390.json) vào public/assets/_reference/<id>/
// Dùng: node scripts/survey/fetch_assets.mjs <templateId>   (chỉ dùng localhost, không public/thương mại)
import fs from "node:fs";
import path from "node:path";

const id = process.argv[2];
if (!id) { console.error("thiếu <templateId>"); process.exit(1); }
const raw = JSON.parse(fs.readFileSync(`docs/survey/raw/${id}_open390.json`, "utf8"));
const urls = new Set();
for (const im of raw.styles.images) if (im.src.startsWith("/")) urls.add(im.src.split("?")[0]);
for (const b of raw.styles.bgImages) { const m = b.match(/url\("?([^")]+)"?\)/); if (m && m[1].startsWith("/")) urls.add(m[1].split("?")[0]); }
const out = `public/assets/_reference/${id}`;
let ok = 0, fail = [];
for (const u of urls) {
  const dest = path.join(out, u.replace(/^\//, ""));
  if (fs.existsSync(dest)) { ok++; continue; }
  try {
    const r = await fetch("https://chungdoi.com" + u, { headers: { "User-Agent": "Mozilla/5.0", Referer: "https://chungdoi.com/" } });
    if (!r.ok) { fail.push(`${r.status} ${u}`); continue; }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    ok++;
  } catch (e) { fail.push(`ERR ${u}`); }
  await new Promise((r) => setTimeout(r, 150));
}
console.log(id, "tải", ok, "/", urls.size, fail.length ? "lỗi: " + fail.slice(0, 5).join(" ; ") : "");
