// Sinh khối họ "traditional" (Long Phụng V4 - Đỏ...) từ HTML gốc đã tách (docs/survey/blocks/<id>/NN.jsx).
// Chạy: node scripts/clone/gen_traditional.cjs [thư mục khối]
const fs = require("fs");
const path = require("path");
const { J } = require("./jsxkit.cjs");

const ID = "dragon_phoenix_v4_red";
const RIV = process.argv[2] || "docs/survey/blocks/" + ID;
const OUT = "src/features/invitation/shell/blocks/traditional";
const raw = (i) => fs.readFileSync(path.join(RIV, String(i).padStart(2, "0") + ".jsx"), "utf8");

const kit = require("./genkit.cjs").make({
  OUT,
  TOKENS: [
    [/\/images\/themes\/longphung-v4-red/g, "t.assets"],
    [/rgb\(255, 211, 144\)/g, "t.ink"],
    [/rgb\(255, 232, 196\)/g, "t.cream"],
    [/rgb\(254, 251, 244\)/g, "t.light"],
    [/rgb\(140, 0, 0\)/g, "t.paper"],
    [/rgb\(90, 0, 0\)/g, "t.dialog"],
    [/(?<![\w(])255, 211, 144/g, "t.inkRgb"],
  ],
  EAGER: new Set(["songhy-background", "frame-avatar", "double-happiness", "cloud1", "phoenix", "dragon"]),
  imgRe: /<img ([^>]*?)src="(\/images\/(?:themes\/longphung-v4-red|envelope)\/([^"]+?)(?:\.webp|\.svg)?)"/g,
});
const { smallest } = kit;
// Giá trị inline của gốc đổi theo breakpoint md (đo bằng cách so HTML 390 với 1440)
const tweak = (s) => s.split('transform: "translateY(11.6px)"').join("transform: `translateY(${isMd ? mix(14.6, 15.4) : 19.4}px)`");
const emit = (name, jsx, o) => kit.emit(name, tweak(jsx), o);

// ---- 00 Paper: nền họa tiết ----
emit("Paper", `<>\n<style>{\`.tp-card h1,.tp-card h2,.tp-card h3{font-weight:400;}\`}</style>\n${raw(0)}\n</>`);

// ---- 01 Hero: ảnh đôi + tên ----
{
  const j = new J(raw(1));
  const im = j.all((n) => j.tag(n) === "img" && /assets\.chungdoi\.com/.test(j.attr(n, "src") || ""))[0];
  j.rep("src=" + j.attr(im.node, "src"), "src={heroSrc} style={{ objectPosition: `${d.heroX}% ${d.heroY}%`, transform: `scale(${d.heroZoom})`, transformOrigin: `${d.heroX}% ${d.heroY}%` }}");
  j.text("Quốc Bảo", "n1").text("Khánh Vy", "n2");
  j.rep('fontSize: "25px"', 'fontSize: isMd ? "34px" : "25px"', 2);
  emit("Hero", j.src);
}
// ---- 02 Family ----
{
  const j = new J(raw(2));
  j.text("THÔNG TIN LỄ&nbsp;CƯỚI", 'd.ceremonyTitle || "THÔNG TIN LỄ\\u00a0CƯỚI"');
  j.textEach("Ông Bà", ["fams[0].title", "fams[1].title"]);
  j.text("Đặng Hữu Thịnh", "fams[0].f").text("Bùi Thị Ngọc Diệp", "fams[0].m");
  j.text("Lưu Văn Cường", "fams[1].f").text("Trần Thị Mỹ Hạnh", "fams[1].m");
  j.text("Số 42 đường Lê Lợi, phường Vĩnh Ninh,\nthành phố Huế", "fams[0].addr");
  j.text("Thôn An Truyền, xã Phú An,\nhuyện Phú Vang, thành phố Huế", "fams[1].addr");
  j.text("TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI", '(d.announcementLine1 || "TRÂN TRỌNG BÁO TIN") + "\\n" + (d.announcementLine2 || "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI")');
  j.rep('fontSize: "14px"', 'fontSize: isMd ? "15px" : "14px"', 4);
  j.rep('fontSize: "40px"', 'fontSize: isMd ? "64px" : "40px"', 2);
  j.text("Đặng Quốc Bảo", "full1").text("Lưu Khánh Vy", "full2").text("út nam", "r1").text("thứ nữ", "r2");
  // hàng "lễ": lặp theo d.ceremonies
  {
    const row = smallest(j, "div", (s) => s.includes("LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH") && s.includes("Tức ngày"));
    const tpl = new J(j.slice(row));
    tpl.text("LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ&nbsp;GIA", 'c.title + (c.place && !c.title.includes(c.place) ? "\\n" + c.place : "")');
    tpl.text("VÀO LÚC 11:00", '"VÀO LÚC " + formatTime(c.time, d.clock)');
    tpl.text("THỨ BẢY", "WEEKDAYS_FULL[cd.getDay()].toUpperCase()");
    tpl.text("13", 'String(cd.getDate())');
    tpl.text("THÁNG 03", '"THÁNG " + String(cd.getMonth() + 1).padStart(2, "0")');
    tpl.text("2027", "cd.getFullYear()");
    tpl.rep(">(Tức ngày 6 tháng 2 năm Đinh&nbsp;Mùi)<", ">{c.lunar ? <>(<>{c.lunar}</>)</> : \"\"}<");
    j.splice(row.s, row.e, `{d.ceremonies.map((c, ci) => { const cd = parseDate(c.date); return (<React.Fragment key={ci}>${tpl.src}</React.Fragment>); })}`);
  }
  // bật/tắt theo cờ dữ liệu
  {
    const fam = smallest(j, "div", (s) => s.includes("{fams[0].title}") && s.includes("{fams[1].title}"));
    j.splice(fam.s, fam.e, "{d.familyOn && (" + j.slice(fam) + ")}");
    const ann = smallest(j, "div", (s) => s.includes("TRÂN TRỌNG BÁO TIN"));
    const nm = smallest(j, "div", (s) => s.includes("{full1}") && s.includes("{full2}"));
    j.splice(ann.s, nm.e, "{d.announceOn && (<>" + j.src.slice(ann.s, nm.e) + "</>)}");
  }
  emit("Family", j.src, { cond: "(d.familyOn || d.announceOn || d.ceremonies.length > 0)" });
}
// ---- 03 Album ----
{
  const j = new J(raw(3));
  j.rep('aria-label="Previous photo"', 'aria-label="Previous photo" onClick={() => setActivePhotoIdx((activePhotoIdx - 1 + albumPhotos.length) % albumPhotos.length)}');
  j.rep('aria-label="Next photo"', 'aria-label="Next photo" onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % albumPhotos.length)}');
  const box = j.all((n) => j.cls(n) === "relative w-full h-full flex items-center justify-center")[0];
  j.setChildren(box, `{albumPhotos.map((src, i) => { const nA = albumPhotos.length; let o = (((i - activePhotoIdx) % nA) + nA) % nA; if (o > nA / 2) o -= nA; const a = Math.abs(o); const sg = o < 0 ? -1 : 1; const st = a === 0 ? { transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 100 } : { transform: \`translateX(\${sg * 60 * a}%) translateZ(\${-150 * a}px) rotateY(\${sg * 45 * a}deg) scale(\${a === 1 ? 0.85 : 0.7})\`, opacity: a === 1 ? 0.75 : a === 2 ? 0.5 : 0.3, zIndex: 100 - a }; return (<div key={i} onClick={() => setActivePhotoIdx(i)} className={"absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out " + (a === 0 ? "ring-2 ring-white/30" : "")} style={{ aspectRatio: Math.min(1.2, Math.max(0.5, ratios[i] ?? 2 / 3)), transitionDuration: "1100ms", ...st }}><img alt={"Wedding photo " + (i + 1)} className="h-full w-full object-cover" src={src} style={(() => { const c = d.photoCrops?.[src]; return c ? { objectPosition: c.x + "% " + c.y + "%", transform: "scale(" + c.z + ")", transformOrigin: c.x + "% " + c.y + "%" } : { objectPosition: "50% 50%" }; })()} onLoad={(e) => { const m = e.currentTarget; const q = m.naturalWidth / m.naturalHeight; setRatios((r) => ({ ...r, [i]: q })); }} /></div>); })}`);
  const dots = j.all((n) => j.cls(n) === "flex justify-center gap-1.5 mt-3")[0];
  j.setChildren(dots, `{albumPhotos.map((_, i) => (<button key={i} type="button" aria-label={"Go to photo " + (i + 1)} onClick={() => setActivePhotoIdx(i)} className={"rounded-full transition-all duration-300 " + (i === activePhotoIdx ? "w-6 h-2 bg-current opacity-70" : "w-2 h-2 bg-current opacity-25 hover:opacity-40")}></button>))}`);
  emit("Album", j.src, { cond: "d.albumOn && d.photos.length > 0", pre: "  const [ratios, setRatios] = React.useState<Record<number, number>>({});" });
}
// ---- 04 Banquet ----
{
  const j = new J(raw(4));
  j.text("THÔNG TIN TIỆC&nbsp;CƯỚI", 'd.banquetTitle.trim() || "THÔNG TIN TIỆC\\u00a0CƯỚI"');
  j.textEach("18:00", ["formatTime(d.startTime || d.time, d.clock)", "formatTime(d.startTime || d.time, d.clock)"]);
  j.text("17:30", "formatTime(d.welcomeTime, d.clock)");
  j.text("THỨ BẢY", "WEEKDAYS_FULL[dt.getDay()].toUpperCase()");
  j.textFirst("13", 'String(dt.getDate())');
  j.text("THÁNG 03", '"THÁNG " + String(dt.getMonth() + 1).padStart(2, "0")');
  j.text("2027", "dt.getFullYear()");
  j.rep(">(Tức ngày 6 tháng 2 năm Đinh&nbsp;Mùi)<", ">({nb(lunarLabel(dt))})<");
  j.text("133 ngày 21 giờ 18 phút 45 giây", "cdText");
  j.text("Tháng 3 / 2027", '"Tháng " + (g.m + 1) + " / " + g.y');
  {
    const grid = j.all((n) => j.cls(n).includes("grid-cols-7")).find((h) => />1<\/span>/.test(j.src.slice(h.s, h.e)));
    const kids = j.childrenOf(grid);
    const normal = new J(kids[0].text).text("1", "n");
    const selKid = kids.find((k) => k.text.includes("heart.svg"));
    const selected = new J(selKid.text).text("13", "n");
    const emptyCls = /className="([^"]*)"/.exec(kids[0].text)[1];
    j.setChildren(grid, `{g.cells.map((n, i) => n === null ? <div key={i} className="${emptyCls}"></div> : n === g.selected ? React.cloneElement(${selected.src}, { key: i }) : React.cloneElement(${normal.src}, { key: i }))}`);
  }
  {
    const a = j.all((n) => j.tag(n) === "a" && /google\.com\/calendar/.test(j.attr(n, "href") || ""))[0];
    j.rep("href=" + j.attr(a.node, "href"), "href={googleCalendarUrl(d)}");
  }
  {
    const wrap = smallest(j, "div", (s) => s.includes("Đón khách") && s.includes("Khai tiệc") && !s.includes("Cùng"));
    j.splice(wrap.s, wrap.e, "{!d.hideWelcomeTimes && (" + j.slice(wrap) + ")}");
    const cdw = smallest(j, "div", (s) => s.includes("Cùng đếm"));
    j.splice(cdw.s, cdw.e, "{d.countdown && (" + j.slice(cdw) + ")}");
    const rs = smallest(j, "div", (s) => s.includes("XÁC NHẬN THAM DỰ"));
    j.splice(rs.s, rs.e, "{d.rsvpOn && (" + j.slice(rs) + ")}");
    j.rep('<button type="button"', '<button type="button" onClick={() => setRsvpOpen(true)}');
  }
  const pre = `  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const left = Math.max(0, Math.floor((new Date(d.date + "T" + (d.time || "00:00")).getTime() - now) / 1000));
  const cdText = Math.floor(left / 86400) + " ngày " + Math.floor((left % 86400) / 3600) + " giờ " + Math.floor((left % 3600) / 60) + " phút " + (left % 60) + " giây";
`;
  emit("Banquet", j.src, { cond: "d.partyOn", pre });
}
// ---- 05 Venue ----
{
  const j = new J(raw(5));
  j.text("Tiệc cưới sẽ tổ chức&nbsp;tại", 'd.locTitle || "Tiệc cưới sẽ tổ chức\\u00a0tại"');
  j.text("Trung tâm Hội nghị Tiệc cưới Hoàng Cung,\n108 Hùng Vương, phường Phú Nhuận, thành phố Huế", "d.address");
  const ifr = j.all((n) => j.tag(n) === "iframe")[0];
  j.rep("src=" + j.attr(ifr.node, "src"), 'src={"https://maps.google.com/maps?q=" + encodeURIComponent(d.address) + "&t=&z=15&ie=UTF8&iwloc=&output=embed"}');
  const dir = j.all((n) => j.tag(n) === "a" && /maps\/dir/.test(j.attr(n, "href") || ""))[0];
  j.rep("href=" + j.attr(dir.node, "href"), 'href={d.mapUrl || "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(d.address)}');
  const mapBox = smallest(j, "div", (s) => s.includes("<iframe"));
  j.splice(mapBox.s, mapBox.e, "{d.showMap && (" + j.slice(mapBox) + ")}");
  emit("Venue", j.src, { cond: "d.partyOn" });
}
// ---- 06 Dress ----
{
  const j = new J(raw(6));
  j.text("DRESS CODE", 'd.dressTitle || "DRESS CODE"');
  j.text("Trang phục dự tiệc", "d.dressText");
  const sw = j.all((n) => j.cls(n) === "flex flex-wrap justify-center gap-4 md:gap-6")[0];
  j.setChildren(sw, '{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(255, 211, 144, 0.19)` } : {}) }}></div>))}');
  emit("Dress", j.src, { cond: "d.dressOn", extra: 'import { isLightColor } from "@/features/invitation/shell/useInvitationCtx";\n' });
}
// ---- 07 Schedule ----
{
  const j = new J(raw(7));
  j.text("LỊCH TRÌNH NGÀY&nbsp;CƯỚI", 'd.schedTitle || "LỊCH TRÌNH NGÀY\\u00a0CƯỚI"');
  const ol = j.all((n) => j.tag(n) === "ol")[0];
  const lis = j.childrenOf(ol);
  const tpl = new J(lis[0].text);
  tpl.text("17:30", 'icon ? (<span className="relative inline-block"><span aria-hidden="true" className="absolute top-1/2 flex w-max items-center justify-center -translate-y-1/2 right-full" style={{ marginRight: "33px" }}><img alt="" aria-hidden="true" className="h-[37px] w-[37px] max-w-none object-contain md:h-[50px] md:w-[50px]" src={`${t.assets}/${icon}.webp`} /></span>{ev.time}</span>) : ev.time');
  tpl.text("Đón khách", "ev.text");
  tpl.rep('className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10"', 'className={"absolute left-1/2 -translate-x-1/2 w-px " + lineCls}');
  j.setChildren(ol, `{d.sched.map((ev, i) => { const n = d.sched.length; const st = Math.floor((n - 3) / 2); const icon = n >= 3 && i >= st && i < st + 3 ? t.scheduleIcons.split(",")[i - st] : null; const lineCls = n === 1 ? "hidden" : i === 0 ? "top-1/2 -bottom-8 md:-bottom-10" : i === n - 1 ? "-top-8 md:-top-10 bottom-1/2" : "-top-8 md:-top-10 -bottom-8 md:-bottom-10"; return (${tpl.src.replace('<li className="contents">', '<li key={i} className="contents">')}); })}`);
  emit("Schedule", j.src, { cond: "d.schedOn" });
}
// ---- 08 Guestbook ----
{
  const j = new J(raw(8));
  j.rep('<form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">', '<form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]" onSubmit={handleSendWish}>');
  j.rep('defaultValue=""', "value={wishName} onChange={(e) => setWishName(e.target.value)}");
  j.rep('rows="4"', "rows={4} value={wishMsg} onChange={(e) => setWishMsg(e.target.value)}");
  j.rep('maxLength="500"', "maxLength={500}");
  j.rep('maxLength="10000"', "maxLength={10000}");
  const list = j.all((n) => j.cls(n).startsWith("mt-8 w-full max-h-[500px]"))[0];
  const items = j.childrenOf(list);
  const tpl = new J(items[0].text);
  const nameM = />([^<]*)<\/span><span className="text-xs opacity-70">/.exec(items[0].text);
  tpl.text(nameM[1], "w.name").text("20:21:50 21/9/2026", "w.at");
  const msgM = /<p className="mt-2 leading-relaxed">([^<]*)<\/p>/.exec(items[0].text);
  tpl.text(msgM[1], "w.msg");
  j.setChildren(list, `{d.wishes.map((w, wi) => (<React.Fragment key={wi}>${tpl.src}</React.Fragment>))}`);
  emit("Guestbook", j.src, { cond: "d.guestOn" });
}
// ---- 09 Gifts ----
{
  const j = new J(raw(9));
  j.textFirst("Hộp Quà&nbsp;Mừng", 'd.giftTitle || "Hộp Quà\\u00a0Mừng"');
  j.textFirst("Hộp Quà Mừng", 'd.giftTitle || "Hộp Quà Mừng"');
  j.rep('aria-label="Mở hộp mừng cưới"', 'aria-label="Mở hộp mừng cưới" onClick={() => setGiftModalOpen(true)}');
  j.rep('<dialog className="modal modal-bottom sm:modal-middle">', '<dialog className={`modal modal-bottom sm:modal-middle ${giftModalOpen ? "modal-open" : ""}`} open={giftModalOpen}>');
  j.rep('<button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3', '<button type="button" onClick={() => setGiftModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3');
  j.rep('<form method="dialog" className="modal-backdrop"><button type="submit">close</button></form>', '<div className="modal-backdrop" onClick={() => setGiftModalOpen(false)}><button type="button">close</button></div>');
  const cards = j.all((n) => j.cls(n).startsWith("flex flex-col items-center gap-4 sm:flex-row"))[0];
  const kid = j.childrenOf(cards)[0];
  const tpl = new J(kid.text);
  tpl.text("Chú Rể - DANG QUOC BAO", 'giftTitle(g) + " - " + g.accountName');
  tpl.text("Vietcombank", "g.bankName").text("0071000812345", "g.accountNumber").text("DANG QUOC BAO", "g.accountName");
  const im = tpl.all((n) => tpl.tag(n) === "img")[0];
  tpl.rep("alt=" + tpl.attr(im.node, "alt"), "alt={`QR - ${giftTitle(g)} - ${g.accountName}`}");
  tpl.rep("src=" + tpl.attr(im.node, "src"), "src={g.qrUrl}");
  tpl.rep('<button type="button" className="mt-', '<button type="button" onClick={() => saveQr(g)} className="mt-');
  j.setChildren(cards, `{d.gifts.map((g) => (<React.Fragment key={g.id}>${tpl.src}</React.Fragment>))}`);
  // CSS styled-jsx của widget phong bì: giữ rule/keyframes thật, đổi tên keyframes để không đụng CSS cũ
  {
    const eng = JSON.parse(fs.readFileSync("docs/survey/raw/" + ID + "_engine_css.json", "utf8"));
    const ren = (s) => s.replace(/\b(ienv(?:FloatMain|Float|ShadowPulse|SparkleAnim|HintPulse|Grow|BackWave|Wave))\b/g, "rv-$1");
    const kf = Object.keys(eng.keyframes).filter((k) => /^ienv/.test(k)).map((k) => ren(eng.keyframes[k]).replace(/\s+/g, " ")).join("\n");
    const rules = Object.values(eng.jsx)[0].map((r) => ren(r)).join("\n");
    const css = (kf + "\n" + rules).replace(/\\/g, "\\\\").replace(/`/g, "\\`");
    const sec = j.all((n) => j.tag(n) === "section")[0];
    const e = j.src.indexOf(">", sec.s) + 1;
    j.splice(e, e, "<style>{`" + css + "`}</style>");
  }
  {
    // chọn widget theo "Kiểu hiển thị" của editor; kiểu mặc định của mẫu giữ markup đã đo, kiểu khác dùng AltGiftWidget
    const bt = j.all((n) => j.tag(n) === "button" && j.attr(n, "aria-label") === '"Mở hộp mừng cưới"')[0];
    j.splice(bt.s, bt.e, '{(d.giftDisplayMode || "envelope") === "envelope" ? (' + j.slice(bt) + ') : <AltGiftWidget ctx={ctx} mode={d.giftDisplayMode} />}');
  }
  emit("Gifts", j.src, { cond: "d.giftOn && d.gifts.length > 0", extra: "import { AltGiftWidget } from \"@/features/invitation/shell/blocks/shared/GiftWidgets\";\n" });
}
// ---- 10 Footer: lời cảm ơn + credit + mây dưới ----
{
  const j = new J(raw(10));
  j.text("Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!", "d.thanks");
  const th = smallest(j, "span", (s) => s.includes("{d.thanks}") && s.startsWith("<span") && s.split("<span").length === 3);
  j.splice(th.s, th.e, "{d.thanksOn && (" + j.slice(th) + ")}");
  emit("Footer", j.src);
}
