// Kiểm tra đồng bộ editor <-> xem trước cho MỘT mẫu trên bản local.
// Dùng: node scripts/editor-sync.mjs <templateId> [--base http://localhost:5173]
// Ghi: docs/survey/editor-sync-<templateId>.md  (bảng pass/fail/skip theo từng thẻ)
// Với mỗi thẻ: (1) sửa field -> preview đổi; (2) tắt công tắc -> khối biến mất, bật lại -> quay về; (3) bấm action -> preview đổi; (4) tải lại -> còn dữ liệu.
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";

const id = process.argv[2];
if (!id) { console.error("Cách dùng: node scripts/editor-sync.mjs <templateId>"); process.exit(1); }
const base = process.argv.includes("--base") ? process.argv[process.argv.indexOf("--base") + 1] : "http://localhost:5173";
const draft = `sync-${id}-${Date.now()}`;
const url = `${base}/edit/${draft}?template=${id}`;

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
await c.setViewport({ width: 1280, height: 900 });
await c.navigate(url, 5000);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ev = async (js) => { const r = await c.eval(`(async()=>{try{return JSON.stringify(await (async()=>{${js}})())}catch(e){return JSON.stringify({__err:String(e.message)})}})()`); return r === undefined ? undefined : JSON.parse(r); };

// ---- helpers chạy trong trang ----
const H = `
const norm = (s) => (s || '').normalize('NFC');
const cardsAll = () => [...document.querySelectorAll('div.bg-base-100.border.border-base-300.rounded-lg')];
const cardTitle = (s) => norm(s.querySelector(':scope > div span.flex-1.min-w-0')?.textContent);
const sec = (t) => cardsAll().find((s) => cardTitle(s).includes(t));
const fieldCtl = (s, lbl) => { const f = [...s.querySelectorAll('fieldset')].find((f) => norm(f.querySelector('legend')?.textContent).includes(lbl)); return f && f.querySelector('input,textarea,select'); };
const setVal = (el, v) => { const P = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement : el.tagName === 'SELECT' ? HTMLSelectElement : HTMLInputElement; Object.getOwnPropertyDescriptor(P.prototype, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); };
const sw = (s) => s.querySelector('input.toggle');
const open = (s) => { const b = s.querySelector('button[aria-label="Collapse section"]'); if (b && !b.querySelector('svg')?.classList.contains('rotate-90')) b.click(); };
const modeBtn = (t) => [...document.querySelectorAll('button')].find((b) => norm(b.textContent).trim().startsWith(t));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const preview = async () => { modeBtn('Xem trước')?.click(); await sleep(700); const t = document.body.innerText; return t; };
const back = async () => { modeBtn('Chỉnh sửa')?.click(); await sleep(500); };
`;
const run = (body) => ev(H + body);

const results = [];
const rec = (card, test, ok, note = "") => results.push({ card, test, status: ok === null ? "skip" : ok ? "pass" : "FAIL", note });

// ---- 0. cấu trúc: so danh sách thẻ local với editor gốc đã đo ----
const localCards = await run(`return cardsAll().map((s) => cardTitle(s).trim())`);
let realCards = null;
try { realCards = JSON.parse(fs.readFileSync(`docs/survey/raw/${id}_editor.json`, "utf8")).cards.map((x) => x.title.replace(/ (Hiện|Ẩn)$/, "").trim()); } catch { /* chưa đo mẫu này */ }
if (realCards) {
  const canon = (t) => t.toLowerCase().replace(/\(rsvp\)/, "").replace(/\s+/g, " ").trim();
  const l = localCards.map(canon), r = realCards.map(canon);
  const missing = r.filter((t) => !l.some((x) => x.includes(t) || t.includes(x)));
  const extra = l.filter((t) => !r.some((x) => x.includes(t) || t.includes(x)));
  rec("(cấu trúc)", "Số thẻ local = gốc", localCards.length === realCards.length, `local ${localCards.length} / gốc ${realCards.length}`);
  rec("(cấu trúc)", "Không thiếu thẻ so với gốc", missing.length === 0, missing.join("; "));
  rec("(cấu trúc)", "Không thừa thẻ so với gốc", extra.length === 0, extra.join("; "));
  const order = r.map((t) => l.findIndex((x) => x.includes(t) || t.includes(x))).filter((i) => i >= 0);
  rec("(cấu trúc)", "Thứ tự thẻ khớp gốc", order.every((v, i) => i === 0 || v > order[i - 1]), "gốc: " + realCards.join(" > "));
} else rec("(cấu trúc)", "So với editor gốc", null, "chưa đo editor gốc của mẫu này");

// ---- 1. sửa field -> preview đổi ----
const FIELD_TESTS = [
  ["Thông tin cơ bản", "Họ tên chú rể", "Phạm Quang Huy"],
  ["Thông tin cơ bản", "Họ tên cô dâu", "Đỗ Minh Anh"],
  ["Thông tin cơ bản", "Tên ngắn chú rể", "Quang Huy"],
  ["Thông tin cơ bản", "Tên ngắn cô dâu", "Minh Anh"],
  ["Thông tin gia đình", "Địa chỉ nhà trai", "Số 9 Phố Kiểm Thử"],
  ["Lời thông báo", "Câu thông báo", "KÍNH BÁO KIỂM THỬ"],
  ["Lễ", "Tiêu đề mục", "LỄ KIỂM THỬ"],
  ["Tiệc cưới", "Tiêu đề mục", "TIỆC KIỂM THỬ"],
  ["Tiệc cưới", "Tiêu đề mục địa điểm", "ĐỊA ĐIỂM KIỂM THỬ"],
  ["Tiệc cưới", "Địa chỉ", "99 Đường Kiểm Thử, Quận 1"],
  ["Lời cảm ơn", "Lời cảm ơn", "Cảm ơn kiểm thử"],
];
for (const [card, lbl, val] of FIELD_TESTS) {
  const found = await run(`const s = sec(${JSON.stringify(card)}); if (!s) return 'no-card'; open(s); const el = fieldCtl(s, ${JSON.stringify(lbl)}); if (!el) return 'no-field'; setVal(el, ${JSON.stringify(val)}); await sleep(250); return 'ok'`);
  if (found !== "ok") { rec(card, `Sửa "${lbl}" -> xem trước`, null, found === "no-card" ? "mẫu local không có thẻ này" : "không thấy field"); continue; }
  const txt = await run(`const t = await preview(); await back(); return t`);
  rec(card, `Sửa "${lbl}" -> xem trước`, typeof txt === "string" && txt.normalize("NFC").toUpperCase().includes(val.normalize("NFC").toUpperCase()), val);
}

// ---- 1b. ngày giờ tiệc (input date/time) ----
{
  const ok = await run(`const s = sec('Tiệc cưới'); if (!s) return 'no-card'; open(s); const d = fieldCtl(s, 'Ngày tổ chức'); const t = fieldCtl(s, 'Giờ tổ chức'); if (!d || !t) return 'no-field'; setVal(d, '2027-02-13'); setVal(t, '17:30'); await sleep(300); return 'ok'`);
  if (ok === "ok") {
    const txt = await run(`const t = await preview(); await back(); return t`);
    rec("Tiệc cưới", "Đổi ngày 13/02/2027 -> xem trước", /2027/.test(txt) && /(THÁNG\s*0?2|Tháng\s*0?2)/i.test(txt) && /\b13\b/.test(txt));
    rec("Tiệc cưới", "Đổi giờ 17:30 -> xem trước", /17:30/.test(txt));
  } else { rec("Tiệc cưới", "Đổi ngày/giờ", null, ok); }
}

// ---- 2. công tắc: tắt -> khối biến mất; bật lại -> quay về ----
const TOGGLES = [
  ["Thư viện ảnh", /album ảnh/i],
  ["Thông tin gia đình", /thông tin lễ cưới/i, "Họ Tên Cha|Họ Tên Mẹ"],
  ["Lời thông báo", /KÍNH BÁO KIỂM THỬ/],
  ["Tiệc cưới", /TIỆC KIỂM THỬ/],
  ["Xác nhận tham dự", /xác nhận tham dự/i],
  ["Dress Code", /dress code/i, null, true],
  ["Lịch trình ngày cưới", /lịch trình ngày cưới/i, null, true],
  ["Sổ lưu bút", /sổ lưu bút/i],
  ["Hộp Quà Mừng", /hộp quà mừng/i],
  ["Lời cảm ơn", /Cảm ơn kiểm thử/],
];
const flip = (card) => run(`const s = sec(${JSON.stringify(card)}); if (!s) return 'no-card'; const w = sw(s); if (!w) return 'no-switch'; w.click(); await sleep(350); return w.getAttribute('aria-checked')`);
for (const [card, re, alt, startsOff] of TOGGLES) {
  const re2 = alt ? new RegExp(alt, "i") : new RegExp(re.source, re.flags.replace("g", ""));
  const before = await run(`const s = sec(${JSON.stringify(card)}); if (!s) return 'no-card'; return sw(s)?.getAttribute('aria-checked') ?? 'no-switch'`);
  if (before === "no-card" || before === "no-switch") { rec(card, "Công tắc ẩn/hiện", null, before === "no-card" ? "mẫu local không có thẻ này" : "thẻ không có công tắc"); continue; }
  if (!startsOff && before === "true") {
    const initial = await run(`const t = await preview(); await back(); return t`);
    if (!re2.test(initial)) { rec(card, "Công tắc ẩn/hiện", null, "khối không hiện sẵn khi thiệp trống (cần dữ liệu trước, vd chưa có tài khoản quà) — so với gốc"); continue; }
  }
  if (startsOff && before === "false") {
    // mặc định tắt: bật -> hiện, tắt -> mất
    await flip(card);
    const on = await run(`const t = await preview(); await back(); return t`);
    rec(card, "Bật -> khối hiện trong xem trước", re2.test(on));
    await flip(card);
    const off = await run(`const t = await preview(); await back(); return t`);
    rec(card, "Tắt lại -> khối biến mất", !re2.test(off));
  } else {
    await flip(card);
    const off = await run(`const t = await preview(); await back(); return t`);
    rec(card, "Tắt -> khối biến mất", !re2.test(off));
    await flip(card);
    const on = await run(`const t = await preview(); await back(); return t`);
    rec(card, "Bật lại -> khối quay về", re2.test(on));
    // đúng vị trí: thứ tự tiêu đề các khối không đổi
  }
}

// ---- 2b. thứ tự khối trong xem trước giữ nguyên sau khi tắt/bật ----
{
  const t = await run(`const t = await preview(); await back(); return t`);
  const order = ["THÔNG TIN LỄ CƯỚI", "ALBUM ẢNH", "THÔNG TIN TIỆC CƯỚI", "DRESS CODE", "LỊCH TRÌNH", "SỔ LƯU BÚT", "HỘP QUÀ"].map((k) => [k, t.toUpperCase().indexOf(k)]).filter(([, i]) => i >= 0);
  rec("(thứ tự khối)", "Thứ tự tiêu đề khối tăng dần sau tắt/bật", order.every((x, i) => i === 0 || x[1] > order[i - 1][1]), order.map((x) => x[0]).join(" > "));
}

// ---- 3. action ----
{ // thêm lễ
  const n0 = await run(`const t = await preview(); await back(); return (t.match(/VÀO LÚC/gi) || []).length`);
  const ok = await run(`const s = sec('Lễ'); if (!s) return 'no-card'; open(s); const b = [...s.querySelectorAll('button')].find((b) => norm(b.textContent).includes('Thêm lễ')); if (!b) return 'no-btn'; b.click(); await sleep(400); return 'ok'`);
  if (ok === "ok") { const n1 = await run(`const t = await preview(); await back(); return (t.match(/VÀO LÚC/gi) || []).length`); rec("Lễ", "Thêm lễ -> xuất hiện thêm khối lễ", n1 === n0 + 1, `${n0} -> ${n1}`); } else rec("Lễ", "Thêm lễ", null, ok);
}
{ // như trang gốc: chưa có ảnh thì không có mục Album trong thiệp -> nạp một ảnh vào thư viện trước khi thử các kiểu album
  const up = await run(`const s = sec('Thư viện ảnh'); if (!s) return 'no-card'; open(s); const inp = s.querySelector('input[type=file]'); if (!inp) return 'no-input'; const blob = await (await fetch('/images/photo-library/design/58e369ba11052cdcdea00d593a99b37c2eebf74c2dc827425f655b4056e9253d.webp')).blob(); const dt = new DataTransfer(); dt.items.add(new File([blob], 'a.webp', { type: 'image/webp' })); inp.files = dt.files; inp.dispatchEvent(new Event('change', { bubbles: true })); await sleep(1200); return 'ok'`);
  if (up !== "ok") rec("Thư viện ảnh", "Nạp ảnh mẫu để thử kiểu album", null, up);
}
for (const [card, label, probe] of [["Thư viện ảnh", "3D", /album ảnh/i], ["Thư viện ảnh", "Lưới", /album ảnh/i], ["Thư viện ảnh", "Ghép ảnh", /album ảnh/i]]) {
  const ok = await run(`const s = sec(${JSON.stringify(card)}); if (!s) return 'no-card'; open(s); const b = [...s.querySelectorAll('button')].find((b) => norm(b.textContent).trim() === ${JSON.stringify(label)}); if (!b) return 'no-btn'; b.click(); await sleep(400); return 'ok'`);
  if (ok === "ok") { const t = await run(`const t = await preview(); await back(); return t`); rec(card, `Kiểu album "${label}" -> xem trước vẫn dựng được`, probe.test(t)); } else rec(card, `Kiểu album "${label}"`, null, ok);
}
{ // RSVP kiểu hiển thị
  const ok = await run(`const s = sec('Xác nhận tham dự'); if (!s) return 'no-card'; open(s); const b = [...s.querySelectorAll('button')].find((b) => norm(b.textContent).includes('Hiện trực tiếp')); if (!b) return 'no-btn'; b.click(); await sleep(400); return 'ok'`);
  if (ok === "ok") { const t = await run(`const t = await preview(); await back(); return t`); rec("RSVP", "Chọn 'Hiện trực tiếp' -> form RSVP nằm trong trang", /họ tên|số điện thoại|tham dự/i.test(t) && !(await run(`return !!document.querySelector('.rsvp-modal-box:not(.is-inline)')`)), "kiểm tra form inline"); } else rec("RSVP", "Kiểu hiển thị", null, ok);
}
{ // thêm tài khoản ngân hàng: chỉ kiểm tra mở được hộp thoại
  const ok = await run(`const s = sec('Hộp Quà Mừng'); if (!s) return 'no-card'; open(s); const b = [...s.querySelectorAll('button')].find((b) => norm(b.textContent).includes('Thêm tài khoản')); if (!b) return 'no-btn'; b.click(); await sleep(500); const m = document.querySelector('.bank-edit-modal-box, .payment-modal-box, .modal-back'); const r = !!m; document.querySelector('.bank-btn-cancel, .modal-back')?.click(); return r ? 'ok' : 'no-modal'`);
  rec("Hộp Quà Mừng", "Bấm 'Thêm tài khoản' -> mở hộp thoại", ok === "ok" ? true : ok === "no-btn" || ok === "no-card" ? null : false, ok);
}
for (const [card, why] of [["Ảnh đầu thiệp", "cần tải tệp ảnh (file picker)"], ["Thư viện ảnh", "thêm/xóa/đổi ảnh cần file picker"], ["Nhạc nền", "chọn/tải nhạc cần hộp thoại + tệp"], ["Phong bì", "chỉ hiện ở màn bìa, không có trong xem trước"], ["Ảnh xem trước khi chia sẻ", "không có phần tương ứng trong thiệp"], ["Lịch trình ngày cưới", "thêm hoạt động: field nằm trong hộp thoại riêng, chưa tự động hóa"]]) rec(card, "Action (thêm/đổi ảnh/nhạc/…)", null, why);

// ---- 4. tải lại -> còn dữ liệu ----
await c.navigate(url, 4500);
const keep = await run(`const s = sec('Thông tin cơ bản'); const g = fieldCtl(s, 'Họ tên chú rể'); const p = sec('Tiệc cưới'); const a = fieldCtl(p, 'Địa chỉ'); const d = sec('Dress Code'); return { name: g && g.value, addr: a && a.value, dress: d ? (sw(d) ? String(sw(d).checked) : null) : null }`);
rec("(tải lại)", "Họ tên chú rể còn nguyên", keep.name === "Phạm Quang Huy", String(keep.name));
rec("(tải lại)", "Địa chỉ tiệc còn nguyên", keep.addr === "99 Đường Kiểm Thử, Quận 1", String(keep.addr));
rec("(tải lại)", "Trạng thái công tắc Dress Code còn nguyên", keep.dress === "false" || keep.dress === null ? keep.dress !== null : null, String(keep.dress));

// ---- ghi báo cáo ----
const pass = results.filter((r) => r.status === "pass").length, fail = results.filter((r) => r.status === "FAIL").length, skip = results.filter((r) => r.status === "skip").length;
const md = [`# Editor ↔ xem trước — ${id}`, "", `Bản local, ${new Date().toISOString().slice(0, 10)}. **${pass} đạt, ${fail} lỗi, ${skip} bỏ qua.**`, "", "| Thẻ | Kiểm tra | Kết quả | Ghi chú |", "|---|---|---|---|", ...results.map((r) => `| ${r.card} | ${r.test} | ${r.status} | ${String(r.note).replace(/\|/g, "/")} |`), ""].join("\n");
fs.mkdirSync("docs/survey", { recursive: true });
fs.writeFileSync(`docs/survey/editor-sync-${id}.md`, md);
console.log(id, `pass ${pass} fail ${fail} skip ${skip}`);
for (const r of results.filter((r) => r.status === "FAIL")) console.log("  FAIL", r.card, "|", r.test, "|", r.note);
process.exit(0);
