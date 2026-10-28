// Sinh khối Riviera từ HTML gốc (đã chuyển JSX trong scratchpad/riv/NN.jsx). Chạy: node scripts/_riv_gen.cjs <thư mục riv>
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { J } = require("./jsxkit.cjs");

const RIV = process.argv[2] || "docs/survey/blocks/riviera_blue";
const OUT = "src/features/invitation/shell/blocks/riviera";
fs.mkdirSync(OUT, { recursive: true });
const raw = (i) => fs.readFileSync(path.join(RIV, String(i).padStart(2, "0") + ".jsx"), "utf8");

// ---- token chủ đề ----
const TOKENS = [
  [/\/images\/themes\/riviera-blue/g, "t.assets"],
  [/rgb\(0, 88, 133\)/g, "t.ink"],
  [/#005885/g, "t.ink"],
  [/rgb\(0, 0, 0\)/g, "t.text"],
  [/rgb\(253, 251, 245\)/g, "t.paper"],
  [/(?<![\w(])0, 88, 133/g, "t.inkRgb"],
];
const hasToken = (s) => TOKENS.some(([re]) => { re.lastIndex = 0; return re.test(s); });
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
const toExpr = (value) => {
  const marks = [];
  for (const [re, expr] of TOKENS) { re.lastIndex = 0; let m; while ((m = re.exec(value))) marks.push({ s: m.index, e: m.index + m[0].length, expr }); }
  marks.sort((a, b) => a.s - b.s || b.e - a.e);
  const kept = []; let end = -1;
  for (const m of marks) if (m.s >= end) { kept.push(m); end = m.e; }
  if (kept.length === 1 && kept[0].s === 0 && kept[0].e === value.length) return kept[0].expr;
  let out = "`", pos = 0;
  for (const m of kept) { out += esc(value.slice(pos, m.s)) + "${" + m.expr + "}"; pos = m.e; }
  return out + esc(value.slice(pos)) + "`";
};
const rawReplace = (r) => { let x = r; for (const [re, e] of TOKENS) x = x.replace(re, "${" + e + "}"); return x; };
function applyTokens(jsx) {
  const text = "const X = (\n" + jsx + "\n);";
  const off = 12;
  const sf = ts.createSourceFile("x.tsx", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits = [];
  const visit = (n) => {
    if (ts.isStringLiteral(n)) {
      const p = n.parent;
      if (p && ts.isPropertyAssignment(p) && p.name === n) return;
      if (hasToken(n.text)) edits.push({ s: n.getStart(), e: n.getEnd(), t: p && ts.isJsxAttribute(p) ? "{" + toExpr(n.text) + "}" : toExpr(n.text) });
      return;
    }
    if (ts.isNoSubstitutionTemplateLiteral(n)) { const r = n.getText().slice(1, -1); if (hasToken(r)) edits.push({ s: n.getStart(), e: n.getEnd(), t: "`" + rawReplace(r) + "`" }); return; }
    if (ts.isTemplateHead(n) || ts.isTemplateMiddle(n) || ts.isTemplateTail(n)) {
      const full = n.getText();
      const inner = ts.isTemplateTail(n) ? full.slice(1, -1) : full.slice(1, -2);
      if (hasToken(inner)) edits.push({ s: n.getStart(), e: n.getEnd(), t: (ts.isTemplateHead(n) ? "`" : "}") + rawReplace(inner) + (ts.isTemplateTail(n) ? "`" : "${") });
      return;
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  let out = text;
  edits.sort((a, b) => b.s - a.s).forEach((e) => { out = out.slice(0, e.s) + e.t + out.slice(e.e); });
  return out.slice(off, out.length - 3);
}

const smallest = (j, tag, pred) => { const c = j.all((n) => j.tag(n) === tag).filter((h) => pred(j.src.slice(h.s, h.e))); c.sort((a, b) => (a.e - a.s) - (b.e - b.s)); if (!c.length) throw new Error("smallest: không thấy"); return c[0]; };
const CTX_KEYS = ["d", "set", "t", "isMd", "mix", "gName", "bName", "brideFirst", "n1", "n2", "r1", "r2", "full1", "full2", "famOf", "fams", "intro", "g", "albumPhotos", "heroSrc", "dt", "isPlayingMusic", "setIsPlayingMusic", "giftModalOpen", "setGiftModalOpen", "lightboxOpen", "setLightboxOpen", "activePhotoIdx", "setActivePhotoIdx", "rsvpOpen", "setRsvpOpen", "wishName", "setWishName", "wishMsg", "setWishMsg", "giftTitle", "saveQr", "copiedBank", "setCopiedBank", "copyToClipboard", "handleSendWish", "audioRef", "toggleMusic", "addToCalendar"];
const UTILS = {
  WEEKDAYS_FULL: ["date", "WEEKDAYS_FULL"], formatTime: ["date", "formatTime"], parseDate: ["date", "parseDate"],
  lunarLabel: ["lunar", "lunarLabel"], googleCalendarUrl: ["calendar", "googleCalendarUrl"], nb: ["format", "nb"],
};

// sửa thuộc tính HTML viết thường & style chứa biến CSS (--x) để qua được TypeScript
function fixJsx(s) {
  s = s.replace(/allowfullscreen=""/g, "allowFullScreen").replace(/referrerpolicy=/g, "referrerPolicy=");
  let out = "", i = 0;
  while (true) {
    const k = s.indexOf('style={{ "--', i);
    if (k < 0) { out += s.slice(i); break; }
    out += s.slice(i, k);
    // tìm }} đóng tương ứng
    let depth = 0, j = k + 6;
    for (; j < s.length; j++) { if (s[j] === "{") depth++; else if (s[j] === "}") { depth--; if (depth === 0) break; } }
    out += s.slice(k, j - 1) + " } as React.CSSProperties}";
    i = j + 1;
  }
  return out;
}
const EAGER = new Set(["paper-background", "line-decoration-3", "line-decoration-2", "cloud-3", "cloud-2", "lake", "mountain", "village", "flower-hero"]);
function addLoading(s) {
  return s.replace(/<img ([^>]*?)src="(\/images\/(?:themes\/riviera-blue|envelope)\/([^"]+?)(?:\.webp)?)"/g, (m, pre, src, name) => {
    const eager = EAGER.has(name);
    return "<img " + pre + (eager ? 'loading="eager" decoding="async" ' : 'loading="lazy" decoding="async" ') + 'src="' + src + '"';
  });
}
function emit(name, jsxBody, { cond, pre = "", extra = "" } = {}) {
  const body = fixJsx(applyTokens(addLoading(jsxBody)));
  const all = body + pre + (cond || "");
  const used = CTX_KEYS.filter((k) => new RegExp("(?<![\\w.])" + k + "(?![\\w])").test(all));
  const byFile = {};
  for (const [k, [f, n]] of Object.entries(UTILS)) if (new RegExp("\\b" + k + "\\b").test(all)) (byFile[f] = byFile[f] || []).push(n);
  const imps = Object.entries(byFile).map(([f, ns]) => `import { ${ns.join(", ")} } from "@/utils/${f}";\n`).join("");
  const file = `import React from "react";\n${imps}${extra}import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";\n\n` +
    `export function ${name}({ ctx }: { ctx: InvitationCtx }) {\n  const { ${used.join(", ")} } = ctx;\n${pre}  return (\n    ${cond ? cond + " && (" : ""}${body.replace(/\n/g, "\n    ")}${cond ? ")" : ""}\n  );\n}\n`;
  fs.writeFileSync(path.join(OUT, name + ".tsx"), file);
  console.log("ok", name, used.length);
}

// ---- 00 Paper (+ biến --st-w) ----
{
  const j = new J(raw(0));
  emit("Paper", `<>\n<style>{\`.st-card{--st-w:min(100vw,480px);}.st-card h1,.st-card h2,.st-card h3{font-weight:400;}@media (min-width:768px){.st-card{--st-w:min(100vw,900px);}}\`}</style>\n${j.src}\n</>`);
}
// ---- 01 Hero ----
{
  const j = new J(raw(1));
  j.text("WELCOME TO OUR WEDDING", "intro").text("Thanh Tùng", "n1").text("Ngọc Hân", "n2");
  j.rep('fontSize: "30px"', 'fontSize: isMd ? "55px" : "30px"', 2);
  j.rep('fontSize: "22px"', 'fontSize: isMd ? "40px" : "22px"');
  const ty = (from, mobile, md) => j.rep('"' + from.replace("%V%", mobile + "px") + '"', "`" + from.replace("%V%", "${isMd ? " + md + " : " + mobile + "}px") + "`");
  ty("rotate(123.024deg) translateY(%V%) rotate(-123.024deg)", 15, 7.5);
  ty("rotate(-120.964deg) translateY(%V%) rotate(120.964deg)", 16, 8);
  ty("rotate(126.87deg) translateY(%V%) rotate(-126.87deg)", 20, 10);
  ty("translateY(%V%)", -0.277275, "mix(20.9, 27.0853)");
  ty("translateY(%V%)", 3.06532, "mix(-4, -5.80478)");
  ty("translateY(%V%)", -2.21889, "mix(11.5, 15.3103)");
  ty("translateY(%V%)", 4.51133, "mix(59.6, 70)");
  emit("Hero", j.src);
}
// ---- 04 LineDecoration, 06 RsvpBridge, 14 Stone, 12 Thanks ----
emit("LineDecoration", raw(4));
{
  const j = new J(raw(12));
  j.text("Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!", "d.thanks");
  emit("Thanks", j.src, { cond: "d.thanksOn" });
}
emit("Stone", raw(14));
{
  const j = new J(raw(6));
  j.rep('<button type="button"', '<button type="button" onClick={() => setRsvpOpen(true)}');
  emit("RsvpBridge", j.src, { cond: "d.rsvpOn" });
}
// ---- 02 Family ----
{
  const j = new J(raw(2));
  j.text("THÔNG TIN LỄ&nbsp;CƯỚI", 'd.ceremonyTitle || "THÔNG TIN LỄ\\u00a0CƯỚI"');
  j.textEach("Ông Bà", ["fams[0].title", "fams[1].title"]);
  j.textEach("Đỗ Hoàng Phúc", ["fams[0].f"]).textEach("Đỗ Lan Anh", ["fams[0].m"]);
  j.textEach("Hoàng Anh Tuấn", ["fams[1].f"]).textEach("Hoàng Hà Vy", ["fams[1].m"]);
  j.textEach("Số 27 Phố Bạch Đằng, phường Minh Khai, thành phố Hưng Yên", ["fams[0].addr"]);
  j.textEach("Thôn Đại Từ, xã Đại Đồng, huyện Văn Lâm, tỉnh Hưng Yên", ["fams[1].addr"]);
  j.text("Chúng tôi sắp về chung một nhà, và rất mong có bạn ở đó", `[d.announcementLine1, d.announcementLine2].filter(Boolean).join("\\n")`);
  j.text("Đỗ Thanh Tùng", "full1").text("Hoàng Ngọc Hân", "full2");
  j.rep('fontSize: "12px"', 'fontSize: isMd ? "18px" : "12px"', 4);
  j.rep('fontSize: "35px"', 'fontSize: isMd ? "62px" : "35px"', 2);
  j.rep('"translateY(-44.9693px) rotate(-44.52deg)"', "`translateY(${isMd ? -80 : -44.9693}px) rotate(-44.52deg)`");
  // hàng "lễ": lặp theo d.ceremonies (mẫu = hàng đầu)
  {
    const box = j.all((n) => j.cls(n) === "relative flex w-full flex-col")[0];
    const rows = j.childrenOf(box);
    const tpl = new J(rows[0].text);
    tpl.text("LỄ THÀNH HÔN\nNhà hàng Queen&nbsp;Palace", 'c.title + (c.place && !c.title.includes(c.place) ? "\\n" + c.place : "")');
    tpl.text("VÀO LÚC 19:00", '"VÀO LÚC " + formatTime(c.time, d.clock)');
    tpl.text("THỨ SÁU", "WEEKDAYS_FULL[cd.getDay()].toUpperCase()");
    tpl.text("24", 'String(cd.getDate()).padStart(2, "0")');
    tpl.text("THÁNG 12", '"THÁNG " + String(cd.getMonth() + 1)');
    tpl.text("2027", "cd.getFullYear()");
    tpl.rep(">(Tức ngày 27 tháng 11 năm Đinh&nbsp;Mùi)<", ">{c.lunar ? <>(<>{c.lunar}</>)</> : \"\"}<");
    j.setChildren(box, `{d.ceremonies.map((c, ci) => { const cd = parseDate(c.date); return (<React.Fragment key={ci}>${tpl.src}</React.Fragment>); })}`);
  }
  // vai trò (rỗng ở bản demo): r1, r2
  { const ps = j.src.split("><span></span></div>"); if (ps.length !== 3) throw new Error("vai trò"); j.src = ps[0] + "><span>{r1}</span></div>" + ps[1] + "><span>{r2}</span></div>" + ps[2]; }
  // bật/tắt theo cờ dữ liệu
  {
    const fam = j.all((n) => j.cls(n).startsWith("grid w-full grid-cols-[1fr_auto_1fr]"))[0];
    j.splice(fam.s, fam.e, "{d.familyOn && (" + j.slice(fam) + ")}");
    const ann = j.all((n) => j.cls(n).startsWith("relative flex flex-col text-center text-[15px] uppercase"))[0];
    const nb2 = j.all((n) => j.cls(n) === "relative w-full").find((h) => j.src.slice(h.s, h.e).includes("{full1}"));
    j.splice(ann.s, nb2.e, "{d.announceOn && (<>" + j.src.slice(ann.s, nb2.e) + "</>)}");
  }
  emit("Family", j.src, { cond: "(d.familyOn || d.announceOn || d.ceremonies.length > 0)" });

}

// ---- 03 Album (coverflow 3D, chỉ báo chấm) ----
{
  const j = new J(raw(3));
  j.rep('aria-label="Previous photo"', 'aria-label="Previous photo" onClick={() => setActivePhotoIdx((activePhotoIdx - 1 + albumPhotos.length) % albumPhotos.length)}');
  j.rep('aria-label="Next photo"', 'aria-label="Next photo" onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % albumPhotos.length)}');
  const box = j.all((n) => j.cls(n) === "relative w-full h-full flex items-center justify-center")[0];
  j.setChildren(box, `{albumPhotos.map((src, i) => { const nA = albumPhotos.length; let o = (((i - activePhotoIdx) % nA) + nA) % nA; if (o > nA / 2) o -= nA; const a = Math.abs(o); const sg = o < 0 ? -1 : 1; const st = a === 0 ? { transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 100 } : { transform: \`translateX(\${sg * 60 * a}%) translateZ(\${-150 * a}px) rotateY(\${sg * 45 * a}deg) scale(\${a === 1 ? 0.85 : 0.7})\`, opacity: a === 1 ? 0.75 : a === 2 ? 0.5 : 0.3, zIndex: 100 - a }; return (<div key={i} onClick={() => setActivePhotoIdx(i)} className={"absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out " + (a === 0 ? "ring-2 ring-white/30" : "")} style={{ aspectRatio: "1.2 / 1", transitionDuration: "1100ms", ...st }}><img alt={"Wedding photo " + (i + 1)} className="h-full w-full object-cover" src={src} style={{ objectPosition: "50% 50%" }} /></div>); })}`);
  const dots = j.all((n) => j.cls(n) === "flex justify-center gap-1.5 mt-3")[0];
  j.setChildren(dots, `{albumPhotos.map((_, i) => (<button key={i} type="button" aria-label={"Go to photo " + (i + 1)} onClick={() => setActivePhotoIdx(i)} className={"rounded-full transition-all duration-300 " + (i === activePhotoIdx ? "w-6 h-2 bg-current opacity-70" : "w-2 h-2 bg-current opacity-25 hover:opacity-40")}></button>))}`);
  emit("Album", j.src, { cond: "d.albumOn" });
}
// ---- 05 Banquet ----
{
  const j = new J(raw(5));
  j.text("THÔNG TIN TIỆC&nbsp;CƯỚI", 'd.banquetTitle.trim() || "THÔNG TIN TIỆC\\u00a0CƯỚI"');
  j.text("19:00", "formatTime(d.time, d.clock)");
  j.text("THỨ SÁU", "WEEKDAYS_FULL[dt.getDay()].toUpperCase()");
  j.textFirst("24", 'String(dt.getDate()).padStart(2, "0")');
  j.text("THÁNG 12", '"THÁNG " + String(dt.getMonth() + 1)');
  j.text("2027", "dt.getFullYear()");
  j.rep(">(Tức ngày 27 tháng 11 năm Đinh&nbsp;Mùi)<", ">({nb(lunarLabel(dt))})<");
  j.text("18:00", "formatTime(d.welcomeTime, d.clock)");
  j.text("20:30", "formatTime(d.startTime || d.time, d.clock)");
  j.text("422 ngày 19 giờ 43 phút 12 giây", "cdText");
  j.text("Tháng 12 / 2027", '"Tháng " + (g.m + 1) + " / " + g.y');
  // lưới ngày: mẫu ô trống / ô thường / ô được chọn lấy từ HTML gốc
  {
    const grid = j.all((n) => j.cls(n).includes("grid-cols-7")).find((h) => />1<\/span>/.test(j.src.slice(h.s, h.e)));
    const kids = j.childrenOf(grid);
    const empty = kids[0].text;
    const normal = new J(kids[2].text).text("1", "n");
    const selKid = kids.find((k) => k.text.includes("<svg"));
    const selected = new J(selKid.text).text("24", "n");
    j.setChildren(grid, `{g.cells.map((n, i) => n === null ? React.cloneElement(${empty}, { key: i }) : n === g.selected ? React.cloneElement(${selected.src}, { key: i }) : React.cloneElement(${normal.src}, { key: i }))}`);
  }
  // link thêm vào lịch
  {
    const a = j.all((n) => j.tag(n) === "a" && /google\.com\/calendar/.test(j.attr(n, "href") || ""))[0];
    const href = j.attr(a.node, "href");
    j.rep("href=" + href, "href={googleCalendarUrl(d)}");
  }
  // giờ đón khách / khai tiệc: ẩn theo cờ
  {
    const wrap = smallest(j, "div", (s) => s.includes("Đón khách") && s.includes("Khai tiệc") && !s.includes("Cùng"));
    j.splice(wrap.s, wrap.e, "{!d.hideWelcomeTimes && (" + j.slice(wrap) + ")}");
  }
  // đếm ngược: ẩn theo cờ
  {
    const cdw = smallest(j, "div", (s) => s.includes("Cùng đếm"));
    j.splice(cdw.s, cdw.e, "{d.countdown && (" + j.slice(cdw) + ")}");
  }
  const pre = `  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const left = Math.max(0, Math.floor((new Date(d.date + "T" + (d.time || "00:00")).getTime() - now) / 1000));
  const cdText = Math.floor(left / 86400) + " ngày " + Math.floor((left % 86400) / 3600) + " giờ " + Math.floor((left % 3600) / 60) + " phút " + (left % 60) + " giây";
`;
  emit("Banquet", j.src, { cond: "d.partyOn", pre });
}


// ---- 07 Venue ----
{
  const j = new J(raw(7));
  j.text("Tiệc cưới sẽ tổ chức&nbsp;tại", 'd.locTitle || "Tiệc cưới sẽ tổ chức\\u00a0tại"');
  j.text("Nhà hàng Queen Palace\nHưng Yên", "d.address");
  const ifr = j.all((n) => j.tag(n) === "iframe")[0];
  j.rep("src=" + j.attr(ifr.node, "src"), 'src={"https://maps.google.com/maps?q=" + encodeURIComponent(d.address) + "&t=&z=15&ie=UTF8&iwloc=&output=embed"}');
  const dir = j.all((n) => j.tag(n) === "a" && /maps\/dir/.test(j.attr(n, "href") || ""))[0];
  j.rep("href=" + j.attr(dir.node, "href"), 'href={d.mapUrl || "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(d.address)}');
  const mapBox = smallest(j, "div", (s) => s.includes("<iframe"));
  j.splice(mapBox.s, mapBox.e, "{d.showMap && (" + j.slice(mapBox) + ")}");
  emit("Venue", j.src, { cond: "d.partyOn" });
}
// ---- 08 Dress ----
{
  const j = new J(raw(8));
  j.text("DRESS CODE", 'd.dressTitle || "DRESS CODE"');
  j.text("Trang phục dự tiệc", "d.dressText");
  const sw = j.all((n) => j.cls(n) === "flex flex-wrap justify-center gap-4 md:gap-6")[0];
  j.setChildren(sw, '{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(0, 88, 133, 0.19)` } : {}) }}></div>))}');
  emit("Dress", j.src, { cond: "d.dressOn", extra: 'import { isLightColor } from "@/features/invitation/shell/useInvitationCtx";\n' });
}
// ---- 09 Schedule ----
{
  const j = new J(raw(9));
  j.text("LỊCH TRÌNH NGÀY&nbsp;CƯỚI", 'd.schedTitle || "LỊCH TRÌNH NGÀY\\u00a0CƯỚI"');
  const ol = j.all((n) => j.tag(n) === "ol")[0];
  const lis = j.childrenOf(ol);
  const tpl = new J(lis[1].text);
  tpl.text("16:30", 'icon ? (<span className="relative inline-block"><span aria-hidden="true" className="absolute top-1/2 flex w-max items-center justify-center -translate-y-1/2 right-full" style={{ marginRight: "55px" }}><img alt="" aria-hidden="true" className="block h-10 w-10 shrink-0 object-contain md:h-14 md:w-14" src={`${t.assets}/${icon}.webp`} /></span>{ev.time}</span>) : ev.time');
  tpl.text("Đón dâu", "ev.text");
  tpl.rep('className="absolute left-1/2 -translate-x-1/2 w-px -top-8 md:-top-10 -bottom-8 md:-bottom-10"', 'className={"absolute left-1/2 -translate-x-1/2 w-px " + lineCls}');
  j.setChildren(ol, `{d.sched.map((ev, i) => { const n = d.sched.length; const st = Math.floor((n - 3) / 2); const icon = n >= 3 && i >= st && i < st + 3 ? t.scheduleIcons.split(",")[i - st] : null; const lineCls = n === 1 ? "hidden" : i === 0 ? "top-1/2 -bottom-8 md:-bottom-10" : i === n - 1 ? "-top-8 md:-top-10 bottom-1/2" : "-top-8 md:-top-10 -bottom-8 md:-bottom-10"; return (${tpl.src.replace('<li className="contents">', '<li key={i} className="contents">')}); })}`);
  emit("Schedule", j.src, { cond: "d.schedOn" });
}
// ---- 10 Guestbook ----
{
  const j = new J(raw(10));
  j.rep('<form className="mt-4 mx-auto w-[85%] min-h-[var(--st-gb-form)]">', '<form className="mt-4 mx-auto w-[85%] min-h-[var(--st-gb-form)]" onSubmit={handleSendWish}>');
  j.rep('defaultValue=""', "value={wishName} onChange={(e) => setWishName(e.target.value)}");
  j.rep('rows="2"', "rows={2} value={wishMsg} onChange={(e) => setWishMsg(e.target.value)}");
  j.rep('maxLength="500"', "maxLength={500}");
  j.rep('maxLength="10000"', "maxLength={10000}");
  const list = j.all((n) => j.cls(n).startsWith("mt-8 w-full max-h-[500px]"))[0];
  const items = j.childrenOf(list);
  const tpl = new J(items[0].text);
  tpl.text("Nhóm phượt Tây Bắc", "w.name").text("16:00:00 27/6/2027", "w.at").text("Chúc hai bạn mỗi năm lại thương nhau hơn một chút.", "w.msg");
  j.setChildren(list, `{d.wishes.map((w, wi) => (<React.Fragment key={wi}>${tpl.src}</React.Fragment>))}`);
  emit("Guestbook", j.src, { cond: "d.guestOn" });
}
// ---- 11 Gifts ----
{
  const j = new J(raw(11));
  j.textFirst("Hộp Quà&nbsp;Mừng", 'd.giftTitle || "Hộp Quà\\u00a0Mừng"');
  j.textFirst("Hộp Quà Mừng", 'd.giftTitle || "Hộp Quà Mừng"');
  j.rep('aria-label="Mở hộp mừng cưới"', 'aria-label="Mở hộp mừng cưới" onClick={() => setGiftModalOpen(true)}');
  j.rep('<dialog className="modal modal-bottom sm:modal-middle">', '<dialog className={`modal modal-bottom sm:modal-middle ${giftModalOpen ? "modal-open" : ""}`} open={giftModalOpen}>');
  j.rep('<button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3', '<button type="button" onClick={() => setGiftModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3');
  j.rep('<form method="dialog" className="modal-backdrop"><button type="submit">close</button></form>', '<div className="modal-backdrop" onClick={() => setGiftModalOpen(false)}><button type="button">close</button></div>');
  const cards = j.all((n) => j.cls(n).startsWith("flex flex-col items-center gap-4 sm:flex-row"))[0];
  const kid = j.childrenOf(cards)[0];
  const tpl = new J(kid.text);
  tpl.text("Chú Rể - THIEP CUOI DEMO", 'giftTitle(g) + " - " + g.accountName');
  tpl.text("Vietcombank", "g.bankName").text("0000000000", "g.accountNumber").text("THIEP CUOI DEMO", "g.accountName");
  const im = tpl.all((n) => tpl.tag(n) === "img")[0];
  tpl.rep("alt=" + tpl.attr(im.node, "alt"), "alt={`QR - ${giftTitle(g)} - ${g.accountName}`}");
  tpl.rep("src=" + tpl.attr(im.node, "src"), "src={g.qrUrl}");
  tpl.rep('<button type="button" className="mt-2 text-xs', '<button type="button" onClick={() => saveQr(g)} className="mt-2 text-xs');
  j.setChildren(cards, `{d.gifts.map((g) => (<React.Fragment key={g.id}>${tpl.src}</React.Fragment>))}`);
  // CSS của widget phong bì (styled-jsx của gốc): giữ nguyên rule/keyframes thật, đổi tên keyframes để không đụng CSS cũ
  {
    const eng = JSON.parse(fs.readFileSync("docs/survey/raw/riviera_blue_engine_css.json", "utf8"));
    const ren = (s) => s.replace(/\b(ienv(?:FloatMain|Float|ShadowPulse|SparkleAnim|HintPulse|Grow|BackWave|Wave))\b/g, "rv-$1");
    const kf = Object.keys(eng.keyframes).filter((k) => /^ienv/.test(k)).map((k) => ren(eng.keyframes[k]).replace(/\s+/g, " ")).join("\n");
    const rules = Object.values(eng.jsx)[0].map((r) => ren(r)).join("\n");
    const css = (kf + "\n" + rules).replace(/\\/g, "\\\\").replace(/`/g, "\\`");
    const sec = j.all((n) => j.tag(n) === "section")[0];
    const e = j.src.indexOf(">", sec.s) + 1;
    j.splice(e, e, "<style>{`" + css + "`}</style>");
  }
  emit("Gifts", j.src, { cond: "d.giftOn && d.gifts.length > 0" });
}
// ---- 15 Lightbox ----
{
  const j = new J(raw(15));
  j.rep('<dialog className="modal">', '<dialog className={`modal ${lightboxOpen ? "modal-open" : ""}`} open={lightboxOpen}>');
  j.rep('<form method="dialog" className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10"><button ', '<div className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10"><button onClick={() => setLightboxOpen(false)} ');
  j.rep("✕</button></form>", "✕</button></div>");
  j.rep('<form method="dialog" className="modal-backdrop bg-black/85"><button>close</button></form>', '<div className="modal-backdrop bg-black/85" onClick={() => setLightboxOpen(false)}><button type="button">close</button></div>');
  j.text("1 / 5", '(activePhotoIdx + 1) + " / " + albumPhotos.length');
  j.rep('aria-label="Previous image"', 'aria-label="Previous image" onClick={() => setActivePhotoIdx((activePhotoIdx - 1 + albumPhotos.length) % albumPhotos.length)}');
  j.rep('aria-label="Next image"', 'aria-label="Next image" onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % albumPhotos.length)}');
  const main = j.all((n) => j.tag(n) === "img" && j.attr(n, "alt") === '"Ảnh cưới 1"')[0];
  j.splice(main.s, main.e, j.slice(main).replace('alt="Ảnh cưới 1"', 'alt={"Ảnh cưới " + (activePhotoIdx + 1)}').replace(/src="[^"]*"/, "src={albumPhotos[activePhotoIdx]}"));
  const strip = j.all((n) => j.cls(n).startsWith("flex-shrink-0 flex gap-2 sm:gap-3 overflow-x-auto"))[0];
  const thumbs = j.childrenOf(strip);
  const act = thumbs[0].text, inact = thumbs[1].text;
  const stripPre = (s) => s.replace(/aria-label="View image \d+"/, 'aria-label={"View image " + (i + 1)}').replace(/alt="Thumbnail \d+"/, 'alt={"Thumbnail " + (i + 1)}').replace(/src="[^"]*"/, "src={src}");
  const cls = (s) => /className="([^"]*)"/.exec(s)[1];
  const actCls = cls(act), inactCls = cls(inact);
  const outline = /style=\{\{([^}]*)\}\}/.exec(act)[1];
  j.setChildren(strip, `{albumPhotos.map((src, i) => (<button key={i} type="button" onClick={() => setActivePhotoIdx(i)} className={i === activePhotoIdx ? "${actCls}" : "${inactCls}"} aria-label={"View image " + (i + 1)} {...(i === activePhotoIdx ? { "aria-current": true, style: { outline: "rgb(0, 88, 133) solid 2px", outlineOffset: "2px" } } : {})}><img className="h-full w-full object-cover" alt={"Thumbnail " + (i + 1)} draggable="false" src={src} /></button>))}`);
  emit("Lightbox", j.src);
}
// ---- 13 Credit ----
emit("Credit", raw(13));
