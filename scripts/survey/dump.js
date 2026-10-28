// Dump hình học + kiểu chữ của mọi phần tử "lá" (chữ, ảnh, hộp có nền/viền) so với root thiệp.
// Dùng chung cho trang gốc (trong iframe) và bản local: window.__dump(opts) -> mảng bản ghi.
// opts.rootSel (tuỳ chọn): bộ chọn root; mặc định tự tìm (phần tử sâu nhất cao ≥85% trang, ≥5 con).
(() => {
  window.__dump = (opts = {}) => {
    const d = document, W = window;
    if (opts.freeze !== false) { const st = d.createElement("style"); st.textContent = "*,*::before,*::after{transition:none !important}"; d.head.appendChild(st); void d.body.offsetHeight; d.getAnimations().forEach((a) => { try { if (typeof W.CSSTransition !== "undefined" && a instanceof W.CSSTransition) a.finish(); else { a.pause(); a.currentTime = 0; } } catch (e) {} }); void d.body.offsetHeight; }
    const H = d.documentElement.scrollHeight;
    let root = opts.rootSel ? d.querySelector(opts.rootSel) : null;
    if (!root) {
      let bd = -1;
      d.body.querySelectorAll("*").forEach((e) => {
        const r = e.getBoundingClientRect();
        if (e.children.length >= 5 && r.height >= H * 0.85 && r.height <= H + 5) { let dep = 0, p = e; while (p) { dep++; p = p.parentElement; } if (dep > bd) { root = e; bd = dep; } }
      });
    }
    if (!root) return { err: "no root" };
    const rr = root.getBoundingClientRect();
    const sy = W.scrollY, sx = W.scrollX;
    const cv = d.createElement("canvas"); cv.width = cv.height = 1; const cx = cv.getContext("2d", { willReadFrequently: true });
    const rgb = (c) => { if (!c || c === "transparent" || c === "rgba(0, 0, 0, 0)") return ""; try { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const p = cx.getImageData(0, 0, 1, 1).data; return p[3] === 255 ? `rgb(${p[0]},${p[1]},${p[2]})` : `rgba(${p[0]},${p[1]},${p[2]},${Math.round((p[3] / 255) * 100) / 100})`; } catch (e) { return c; } };
    const norm = (s) => (s || "").normalize("NFC").replace(/\s+/g, " ").trim();
    const rnd = (n) => Math.round(n * 10) / 10;
    const out = [], cnt = {};
    const key = (k) => { cnt[k] = (cnt[k] || 0) + 1; return k + "#" + cnt[k]; };
    const alpha = (c) => { const m = rgb(c).match(/rgba?\(([^)]+)\)/); if (!m) return 0; const p = m[1].split(","); return p.length > 3 ? parseFloat(p[3]) : 1; };
    root.querySelectorAll("*").forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      const cs = W.getComputedStyle(e);
      if (cs.visibility === "hidden" || cs.display === "none" || cs.opacity === "0") return;
      const own = [...e.childNodes].filter((n) => n.nodeType === 3 && norm(n.textContent)).map((n) => norm(n.textContent)).join(" ");
      let kind = "", k = "";
      if (e.tagName === "IMG") { kind = "img"; k = key("img:" + (e.currentSrc || e.src).split("/").pop().split("?")[0].slice(0, 40)); }
      else if (own) { kind = "text"; k = key("t:" + own.slice(0, 32)); }
      else if (e.tagName === "svg" || e.tagName === "SVG") { kind = "svg"; k = key("svg:" + rnd(r.width) + "x" + rnd(r.height)); }
      else if (alpha(cs.backgroundColor) > 0.02 || (cs.backgroundImage && cs.backgroundImage !== "none") || (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== "none") || (cs.boxShadow && cs.boxShadow !== "none")) { kind = "box"; k = key("b:" + e.tagName.toLowerCase() + ":" + cs.backgroundColor + ":" + cs.borderRadius.replace("3.35544e+07px", "9999px")); }
      else return;
      const rec = { k, kind, cls: (typeof e.className === "string" ? e.className : "").slice(0, 70), x: rnd(r.left + sx - (rr.left + sx)), y: rnd(r.top + sy - (rr.top + sy)), w: rnd(r.width), h: rnd(r.height), op: cs.opacity };
      if (kind === "text") Object.assign(rec, { fs: cs.fontSize, fw: cs.fontWeight, ff: cs.fontFamily.split(",").slice(0, 2).join(",").replace(/"/g, ""), lh: cs.lineHeight, ls: cs.letterSpacing, c: rgb(cs.color), tt: cs.textTransform, ta: cs.textAlign, fst: cs.fontStyle });
      if (kind === "box" || kind === "text") Object.assign(rec, { bg: rgb(cs.backgroundColor), br: cs.borderRadius.replace("3.35544e+07px", "9999px"), bd: parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== "none" ? cs.borderTopWidth + " " + rgb(cs.borderTopColor) : "", sh: cs.boxShadow === "none" ? "" : cs.boxShadow.replace(/(rgba?|oklch|oklab|color)\([^)]*\)/g, (m) => rgb(m)).slice(0, 90) });
      if (kind === "box" && cs.backgroundImage !== "none") rec.bgi = cs.backgroundImage.replace(location.origin, "").slice(0, 80);
      if (cs.transform !== "none") rec.tf = cs.transform;
      if (kind === "img") { rec.of = cs.objectFit; rec.nat = e.naturalWidth + "x" + e.naturalHeight; }
      out.push(rec);
    });
    return { vw: W.innerWidth, docH: H, rootW: rnd(rr.width), rootH: rnd(rr.height), n: out.length, recs: out.slice(0, 2500) };
  };
  return "dump ready";
})();
