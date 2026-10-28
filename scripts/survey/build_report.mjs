// Gộp dữ liệu thô docs/survey/raw/<id>_*.json thành docs/survey/<id>.json + <id>.md
// Dùng: node scripts/survey/build_report.mjs <templateId>
import fs from "node:fs";

const id = process.argv[2];
if (!id) { console.error("Cách dùng: node scripts/survey/build_report.mjs <templateId>"); process.exit(1); }
const R = (n) => { try { return JSON.parse(fs.readFileSync(`docs/survey/raw/${id}_${n}.json`, "utf8")); } catch { return null; } };
const cover = R("cover390"), seq = R("openSeq"), o390 = R("open390"), o768 = R("open768"), o1440 = R("open1440"), gift = R("gift"), ed = R("editor");
const meta = JSON.parse(fs.readFileSync("docs/survey/_meta75.json", "utf8")).find((m) => m.id === id) || {};
if (!o390) { console.error("thiếu dữ liệu open390 cho", id); process.exit(1); }

const keyframes = Object.keys(o390.motion.keyframes);
const GLOBAL = new Set(["shimmer", "selector-shimmer", "chevron-tap", "fadeIn", "float", "envelope-float", "modalSlideUp", "modalScaleIn", "staggerFadeIn", "slideUp", "rating", "dropdown", "radio", "toast", "rotator", "skeleton", "menu", "progress", "spin", "ping", "pulse", "bounce", "driverPulse", "tapBounce", "pointerBounce", "shake", "driverPopoverFadeIn", "fade-in", "spin-cd", "dance", "bounce-gentle", "ping-slow"]);
const own = keyframes.filter((k) => !GLOBAL.has(k) && !/^go\d+$/.test(k) && !k.startsWith("swal2"));
const btns = o390.features.buttons;
const album = btns.some((b) => /^Go to photo/.test(b)) ? "coverflow 3D + chấm điều hướng (Go to photo n)" : "coverflow 3D + bộ đếm n / N";
const giftKind = own.some((k) => k.startsWith("ienv")) ? "phong bì (ienv*)" : own.some((k) => k.startsWith("igb")) ? "hộp 3D (igb*)" : "không rõ";
const flyBox = (seq.anims || []).some((a) => a.name === "dragon-fly-forward");
const particle = (seq.anims || []).map((a) => a.name).find((n) => /^ambient-/.test(n)) || "";
const phases = (seq.anims || []).filter((a) => a.name && !/^(ambient|mbFloat|igb|ienv|bounce-gentle|ping-slow)/.test(a.name)).map((a) => ({ at: a.at, name: a.name, dur: Math.round(a.dur), delay: Math.round(a.delay || 0), ease: a.ease }));
const sections = (o390.layout.kids || []).filter((k) => k.h > 0).map((k) => ({ title: (k.title || "").replace(/\s+/g, " ").trim(), h390: k.h }));
const widths = {};
for (const [w, o] of [[390, o390], [768, o768], [1440, o1440]]) if (o) widths[w] = { rootW: o.layout.rootW, rootH: o.layout.rootH, docH: o.layout.docH, kids: (o.layout.kids || []).filter((k) => k.h > 0).map((k) => k.h) };
const out = {
  id, slug: meta.slug, name: meta.name, tags: meta.tags,
  cover: { components: cover.layout.kids.length, text: cover.text.replace(/\n+/g, " / ").slice(0, 160), seal: meta.seal, particleLocal: meta.particle, ambient: particle, fonts: cover.styles.fonts },
  open: { button: seq.button, tag: seq.tag, href: seq.href, flyBox, phases, domEvents: (seq.dom || []).filter((d) => d.el.length > 3).slice(0, 12), contentAtMs: ((seq.dom || []).find((d) => d.op === "removed" && /jsx-5db/.test(d.el)) || {}).at },
  features: { audio: o390.features.audio.map((a) => a.split("/").pop()), mapEmbed: o390.features.iframes.some((i) => /maps\/embed/.test(i)), countdown: o390.features.countdown, rsvpInline: o390.features.rsvpInline, album, giftKind, giftDialog: gift && gift.dialog ? gift.dialog.text.slice(0, 200) : null, giftAnims: gift ? gift.anims.map((a) => `${a.name}:${Math.round(a.dur)}`).slice(0, 12) : [] },
  motion: { libs: o390.motion.libs, hints: o390.motion.classHints, dataAos: o390.motion.dataAos, ownKeyframes: own, scrollDriven: o390.scrollFx.changed, scrollSample: o390.scrollFx.sample.slice(0, 4) },
  sections, widths,
  styles: { fonts: o390.styles.fonts, headings: o390.styles.headings.slice(0, 6), buttons: o390.styles.buttons.slice(0, 6), images: o390.styles.images.length, bgImages: o390.styles.bgImages },
  editor: ed ? ed.cards.map((c) => ({ title: c.title.replace(/ (Hiện|Ẩn)$/, ""), toggle: c.toggle, on: c.toggleOn, h: c.h, fields: c.nFields, buttons: c.buttons.slice(0, 8) })) : null,
};
fs.writeFileSync(`docs/survey/${id}.json`, JSON.stringify(out, null, 1));

const L = [];
L.push(`# ${out.name} (\`${id}\`)`, "", `Nguồn: chungdoi.com/vi/mau-thiep/${out.slug}/demo · đo bằng probe trong Chrome của người dùng · số liệu thô: \`docs/survey/raw/${id}_*.json\``, "");
L.push("## Màn Xem demo (bìa)", `- Chữ trên bìa: ${out.cover.text}`, `- Hạt nền: \`${out.cover.ambient}\` (mã local đang ghi: ${out.cover.particleLocal}); con dấu local: ${out.cover.seal}`, `- Font bìa: ${[...new Set(out.cover.fonts)].join("; ")}`, "");
L.push("## Hiệu ứng bấm \"Mở thiệp\"", `- Nút: <${out.open.tag}> "${out.open.button}" href=\`${out.open.href}\``, `- Hộp quà bay (dragon-fly-forward): ${out.open.flyBox ? "có" : "không"}`, `- Nội dung hiện sau ≈ ${out.open.contentAtMs ?? "?"} ms (lúc bìa bị gỡ khỏi DOM)`, "", "| t (ms) | animation | thời lượng | delay | easing |", "|---|---|---|---|---|");
for (const p of out.open.phases) L.push(`| ${p.at} | ${p.name} | ${p.dur} | ${p.delay} | ${p.ease} |`);
L.push("", `Khung hình 0/25/50/75/100%: \`docs/survey/frames/${id}/open_{0,25,50,75,100}.png\` (đóng băng animation tại 0/375/750/1125/1500 ms).`, "");
L.push("## Thiệp đã mở", "", "| Khối (390) | Cao 390 | Cao 768 | Cao 1440 |", "|---|---|---|---|");
const ks = out.sections;
ks.forEach((k, i) => L.push(`| ${k.title || "(không tiêu đề)"} | ${k.h390} | ${widths[768] ? widths[768].kids[i] ?? "" : ""} | ${widths[1440] ? widths[1440].kids[i] ?? "" : ""} |`));
L.push("", `Chiều cao trang: ${Object.entries(widths).map(([w, x]) => `${w}px → ${x.docH} (khung nội dung rộng ${x.rootW}px)`).join("; ")}`, "");
L.push("## Tính năng", `- Nhạc: ${out.features.audio.join(", ") || "không có"}`, `- Bản đồ Google Maps embed: ${out.features.mapEmbed ? "có" : "không"}`, `- Đếm ngược: ${out.features.countdown ? "có" : "không"}; RSVP inline: ${out.features.rsvpInline ? "có" : "không (nút → hộp thoại)"}`, `- Album: ${out.features.album}`, `- Hộp quà: ${out.features.giftKind}`, `- Hộp thoại quà: ${out.features.giftDialog}`, `- Animation khi mở hộp quà: ${out.features.giftAnims.join(", ")}`, "");
L.push("## Chuyển động", `- Thư viện JS: ${JSON.stringify(out.motion.libs)} (không có AOS/GSAP/Swiper); data-aos: ${out.motion.dataAos}`, `- Keyframes riêng của mẫu/nhóm: ${out.motion.ownKeyframes.join(", ") || "(không)"}`, `- Phần tử đổi style khi cuộn: ${out.motion.scrollDriven}/${o390.scrollFx.total}${out.motion.scrollSample.length ? " — ví dụ: " + out.motion.scrollSample.map((s) => s.el.slice(0, 40)).join("; ") : ""}`, "");
L.push("## Kiểu chữ & nút", `- Font đã nạp: ${out.styles.fonts.join("; ")}`);
for (const h of out.styles.headings.slice(0, 4)) L.push(`- h: "${h.t}" ${h.fontFamily.slice(0, 40)} ${h.fontSize}/${h.fontWeight} ls ${h.letterSpacing} ${h.color}`);
for (const b of out.styles.buttons.slice(0, 4)) L.push(`- nút "${b.t}" ${b.w}×${b.h} nền ${b.backgroundColor} chữ ${b.color} bo ${b.borderRadius} ${b.fontSize}/${b.fontWeight}`);
L.push("", `Ảnh: ${out.styles.images} tệp dùng trong thiệp (\`public/assets/_reference/${id}/\`).`, "");
if (out.editor) { L.push("## Màn Chỉnh sửa (thẻ theo thứ tự)", "", "| # | Thẻ | Công tắc | Cao | Field | Nút chính |", "|---|---|---|---|---|---|"); out.editor.forEach((c, i) => L.push(`| ${i + 1} | ${c.title} | ${c.toggle ? (c.on ? "Hiện" : "Ẩn") : "-"} | ${c.h} | ${c.fields} | ${c.buttons.slice(0, 4).join(", ")} |`)); L.push(""); }
fs.writeFileSync(`docs/survey/${id}.md`, L.join("\n"));
console.log(id, "ok", out.sections.length, "khối;", out.editor ? out.editor.length : 0, "thẻ editor; album:", out.features.album, "; quà:", out.features.giftKind);
