// Phần dùng chung của các bộ sinh block (gen_<họ>.cjs): thay token chủ đề, sửa JSX cho TypeScript, khôi phục loading ảnh, ghi file khối.
// Dùng: const kit = require("./genkit.cjs").make({ OUT, TOKENS, EAGER, imgRe });  kit.emit("Hero", jsx, { cond, pre, extra });
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const CTX_KEYS = ["d", "set", "t", "isMd", "mix", "gName", "bName", "brideFirst", "n1", "n2", "r1", "r2", "full1", "full2", "famOf", "fams", "intro", "g", "albumPhotos", "heroSrc", "dt", "isPlayingMusic", "setIsPlayingMusic", "giftModalOpen", "setGiftModalOpen", "lightboxOpen", "setLightboxOpen", "activePhotoIdx", "setActivePhotoIdx", "rsvpOpen", "setRsvpOpen", "wishName", "setWishName", "wishMsg", "setWishMsg", "giftTitle", "saveQr", "copiedBank", "setCopiedBank", "copyToClipboard", "handleSendWish", "audioRef", "toggleMusic", "addToCalendar"];
const UTILS = {
  WEEKDAYS_FULL: ["date", "WEEKDAYS_FULL"], formatTime: ["date", "formatTime"], parseDate: ["date", "parseDate"],
  lunarLabel: ["lunar", "lunarLabel"], googleCalendarUrl: ["calendar", "googleCalendarUrl"], nb: ["format", "nb"],
};

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

function make({ OUT, TOKENS, EAGER = new Set(), imgRe }) {
  fs.mkdirSync(OUT, { recursive: true });
  const hasToken = (s) => TOKENS.some(([re]) => { re.lastIndex = 0; return re.test(s); });
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

  // html2jsx bỏ loading/decoding: khôi phục (ảnh trong EAGER là eager, còn lại lazy)
  const addLoading = (s) => (imgRe ? s.replace(imgRe, (m, pre, src, name) => "<img " + pre + (EAGER.has(name) ? 'loading="eager" decoding="async" ' : 'loading="lazy" decoding="async" ') + 'src="' + src + '"') : s);

  function fixJsx(s) {
    s = s.replace(/allowfullscreen=""/g, "allowFullScreen").replace(/referrerpolicy=/g, "referrerPolicy=");
    let out = "", i = 0;
    while (true) {
      const k = s.indexOf('style={{ "--', i);
      if (k < 0) { out += s.slice(i); break; }
      out += s.slice(i, k);
      let depth = 0, j = k + 6;
      for (; j < s.length; j++) { if (s[j] === "{") depth++; else if (s[j] === "}") { depth--; if (depth === 0) break; } }
      out += s.slice(k, j - 1) + " } as React.CSSProperties}";
      i = j + 1;
    }
    return out;
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

  // phần tử nhỏ nhất (theo độ dài) thuộc thẻ `tag` thỏa điều kiện trên nguồn
  const smallest = (j, tag, pred) => {
    const c = j.all((n) => j.tag(n) === tag).filter((h) => pred(j.src.slice(h.s, h.e)));
    c.sort((a, b) => (a.e - a.s) - (b.e - b.s));
    if (!c.length) throw new Error("smallest: không thấy " + tag);
    return c[0];
  };

  return { emit, applyTokens, smallest };
}

module.exports = { make };
