// Probe đo trang demo gốc. Dán vào tab chungdoi.com (javascript_tool) -> window.__P.
// Dùng iframe cùng nguồn để đo ở nhiều chiều rộng. Gửi kết quả về collector (localhost:5199) -> docs/survey/raw/<tên>.json
(() => {
  const P = (window.__P = {});
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  P.sleep = sleep;
  P.send = async (name, obj) => {
    const r = await fetch("http://localhost:5199/" + encodeURIComponent(name), { method: "POST", body: JSON.stringify(obj) });
    return r.status;
  };
  P.frame = async (url, w, h = 900) => {
    document.getElementById("__f")?.remove();
    const f = document.createElement("iframe");
    f.id = "__f";
    f.style.cssText = `position:fixed;left:0;top:0;width:${w}px;height:${h}px;z-index:99999;border:0;background:#fff`;
    f.src = url;
    document.body.appendChild(f);
    await new Promise((r) => (f.onload = r));
    return f;
  };
  const sel = (e) => {
    if (!e || !e.tagName) return "";
    let s = e.tagName.toLowerCase();
    if (e.id) s += "#" + e.id;
    const c = typeof e.className === "string" ? e.className.trim().split(/\s+/).slice(0, 4).join(".") : "";
    return c ? s + "." + c : s;
  };
  P.sel = sel;
  const css = (w, e, keys) => { const cs = w.getComputedStyle(e); const o = {}; keys.forEach((k) => (o[k] = cs[k])); return o; };
  P.findRoot = (w) => {
    const d = w.document;
    const H = d.documentElement.scrollHeight;
    let best = null, bestDepth = -1;
    d.body.querySelectorAll("*").forEach((e) => {
      const r = e.getBoundingClientRect();
      if (e.children.length >= 5 && r.height >= H * 0.85 && r.height <= H + 5) {
        let dep = 0, p = e; while (p) { dep++; p = p.parentElement; }
        if (dep > bestDepth) { best = e; bestDepth = dep; }
      }
    });
    return best;
  };
  // ---- cấu trúc + kích thước từng khối
  P.layout = (w) => {
    const d = w.document, root = P.findRoot(w);
    if (!root) return { err: "no root", h: d.documentElement.scrollHeight, text: d.body.innerText.slice(0, 120) };
    const rr = root.getBoundingClientRect();
    const keys = ["backgroundColor", "backgroundImage", "color", "fontFamily", "fontSize", "opacity", "position", "overflow"];
    return {
      vw: w.innerWidth, docH: d.documentElement.scrollHeight, root: sel(root), rootW: Math.round(rr.width), rootH: Math.round(rr.height), rootCss: css(w, root, keys),
      kids: [...root.children].map((e, i) => {
        const r = e.getBoundingClientRect();
        const cs = w.getComputedStyle(e);
        const h = e.querySelector("h1,h2,h3");
        return { i, sel: sel(e), h: Math.round(r.height), top: Math.round(r.top - rr.top), w: Math.round(r.width), title: (h?.textContent || e.innerText || "").trim().slice(0, 30), bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 90), op: cs.opacity, tf: cs.transform === "none" ? "" : cs.transform.slice(0, 40), pos: cs.position, aos: e.getAttribute("data-aos") || "", imgs: e.querySelectorAll("img").length, svgs: e.querySelectorAll("svg").length };
      }),
    };
  };
  // ---- kiểu chữ / màu / nút của từng khối
  P.styles = (w) => {
    const d = w.document, root = P.findRoot(w);
    if (!root) return {};
    const out = { headings: [], buttons: [], texts: [], images: [], fonts: [...d.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, "") + " " + f.weight + " " + f.style) };
    const hk = ["fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "textTransform", "color", "textAlign"];
    root.querySelectorAll("h1,h2,h3").forEach((e) => out.headings.push({ t: e.textContent.trim().slice(0, 28), ...css(w, e, hk) }));
    root.querySelectorAll("button,a").forEach((e) => { const r = e.getBoundingClientRect(); if (r.height > 0 && e.textContent.trim()) out.buttons.push({ t: e.textContent.trim().slice(0, 24), w: Math.round(r.width), h: Math.round(r.height), ...css(w, e, ["backgroundColor", "color", "borderRadius", "fontSize", "fontWeight", "fontFamily", "border", "padding", "boxShadow"]) }); });
    const seen = new Set();
    root.querySelectorAll("p,span,div").forEach((e) => { if (e.children.length) return; const t = e.textContent.trim(); if (!t) return; const cs = w.getComputedStyle(e); const k = cs.fontFamily + cs.fontSize + cs.color + cs.fontWeight; if (seen.has(k)) return; seen.add(k); out.texts.push({ t: t.slice(0, 22), ff: cs.fontFamily.slice(0, 40), fs: cs.fontSize, fw: cs.fontWeight, ls: cs.letterSpacing, c: cs.color, tt: cs.textTransform }); });
    const im = new Map();
    d.querySelectorAll("img").forEach((e) => { const r = e.getBoundingClientRect(); const s = e.currentSrc || e.src; if (!s) return; const o = im.get(s) || { src: s.replace(w.location.origin, ""), n: 0, nat: e.naturalWidth + "x" + e.naturalHeight, disp: Math.round(r.width) + "x" + Math.round(r.height), op: w.getComputedStyle(e).opacity, cls: sel(e).slice(0, 60) }; o.n++; im.set(s, o); });
    out.images = [...im.values()];
    const bgs = new Set(); d.querySelectorAll("*").forEach((e) => { const b = w.getComputedStyle(e).backgroundImage; if (b && b !== "none" && b.includes("url(")) bgs.add(b.slice(0, 160).replace(w.location.origin, "")); }); out.bgImages = [...bgs];
    return out;
  };
  // ---- hiệu ứng: keyframes, animation/transition đang gắn, thư viện
  P.motion = (w) => {
    const d = w.document, out = { keyframes: {}, animated: [], transitions: [], libs: {}, scripts: [], dataAos: 0 };
    for (const s of d.styleSheets) { try { for (const r of s.cssRules) { if (r.type === 7) out.keyframes[r.name] = r.cssText.replace(/\s+/g, " ").slice(0, 260); } } catch (e) {} }
    const seen = new Set();
    d.querySelectorAll("*").forEach((e) => {
      const cs = w.getComputedStyle(e);
      if (cs.animationName && cs.animationName !== "none") { const k = sel(e) + cs.animationName; if (!seen.has(k)) { seen.add(k); out.animated.push({ el: sel(e).slice(0, 60), name: cs.animationName, dur: cs.animationDuration, delay: cs.animationDelay, ease: cs.animationTimingFunction.slice(0, 40), iter: cs.animationIterationCount, fill: cs.animationFillMode, dir: cs.animationDirection }); } }
      if (cs.transitionDuration && cs.transitionDuration !== "0s" && !/^0s(, 0s)*$/.test(cs.transitionDuration)) { const k = "t" + sel(e) + cs.transitionProperty; if (!seen.has(k)) { seen.add(k); out.transitions.push({ el: sel(e).slice(0, 60), prop: cs.transitionProperty.slice(0, 50), dur: cs.transitionDuration, ease: cs.transitionTimingFunction.slice(0, 30) }); } }
      if (e.hasAttribute("data-aos")) out.dataAos++;
    });
    out.animated = out.animated.slice(0, 60); out.transitions = out.transitions.slice(0, 60);
    ["AOS", "gsap", "ScrollTrigger", "Swiper", "lottie", "anime", "Lenis", "Splide", "Flickity", "THREE", "particlesJS", "tsParticles", "confetti", "framerMotion", "__NEXT_DATA__", "jQuery", "Howl"].forEach((k) => { if (w[k] !== undefined) out.libs[k] = typeof w[k]; });
    out.scripts = [...d.scripts].map((s) => s.src.replace(w.location.origin, "")).filter(Boolean).slice(0, 25);
    out.classHints = ["swiper", "aos-init", "splide", "embla", "slick", "lottie", "motion"].filter((k) => d.querySelector(`[class*="${k}"]`));
    out.waapi = w.document.getAnimations().length;
    return out;
  };
  // ---- thành phần chức năng: album, bản đồ, nhạc, RSVP, hộp quà
  P.features = (w) => {
    const d = w.document;
    const out = { audio: [...d.querySelectorAll("audio")].map((a) => (a.currentSrc || a.src || a.querySelector("source")?.src || "").replace(w.location.origin, "")), iframes: [...d.querySelectorAll("iframe")].map((i) => i.src.slice(0, 120)), buttons: [], sectionsText: [] };
    d.querySelectorAll("button,a,[role=button]").forEach((e) => { const t = (e.getAttribute("aria-label") || e.textContent || "").trim(); if (t && t.length < 40) out.buttons.push(t); });
    out.buttons = [...new Set(out.buttons)].slice(0, 60);
    out.dialogs = [...d.querySelectorAll("dialog,[role=dialog]")].map((e) => sel(e).slice(0, 60));
    out.forms = [...d.querySelectorAll("form")].map((f) => ({ sel: sel(f).slice(0, 50), fields: [...f.querySelectorAll("input,textarea,select")].map((i) => (i.placeholder || i.name || i.type)).slice(0, 8) }));
    out.countdown = /đếm ngược|ngày.*giờ.*phút|còn \d+ ngày/i.test(d.body.innerText);
    out.rsvpInline = !![...d.querySelectorAll("form")].find((f) => /tham dự|rsvp/i.test(f.innerText));
    out.headings = [...d.querySelectorAll("h1,h2,h3")].map((e) => e.textContent.trim().slice(0, 40)).filter(Boolean);
    return out;
  };
  // ---- thay đổi khi cuộn: phần tử đổi opacity/transform => hiệu ứng theo cuộn
  P.scrollFx = async (w) => {
    const d = w.document, root = P.findRoot(w) || d.body;
    const list = [...root.querySelectorAll("*")].filter((e) => { const r = e.getBoundingClientRect(); return r.height > 8 && r.width > 8; }).slice(0, 700);
    const snap = () => list.map((e) => { const cs = w.getComputedStyle(e); return cs.opacity + "|" + cs.transform + "|" + cs.visibility; });
    w.scrollTo(0, 0); await sleep(500);
    const a = snap();
    const H = d.documentElement.scrollHeight;
    for (let y = 0; y < H; y += 300) { w.scrollTo(0, y); await sleep(120); }
    w.scrollTo(0, H); await sleep(900);
    const b = snap();
    const ch = [];
    list.forEach((e, i) => { if (a[i] !== b[i]) ch.push({ el: sel(e).slice(0, 55), from: a[i].slice(0, 50), to: b[i].slice(0, 50) }); });
    w.scrollTo(0, 0);
    return { total: list.length, changed: ch.length, sample: ch.slice(0, 25) };
  };
  // ---- bấm "Mở thiệp": ghi lại chuỗi animation (WAAPI/CSS) theo thời gian
  P.openSeq = async (w) => {
    const d = w.document;
    const btn = [...d.querySelectorAll("a,button")].find((e) => /mở thiệp|mở|open/i.test(e.textContent.trim()) && e.getBoundingClientRect().height > 0);
    if (!btn) return { err: "no open button", text: d.body.innerText.slice(0, 100) };
    const seen = new Map(); const events = []; const t0 = performance.now();
    const rec = () => d.getAnimations().forEach((a) => { const e = a.effect, tgt = e && e.target; const t = e && e.getTiming ? e.getTiming() : {}; const k = (a.animationName || a.transitionProperty || "waapi") + "@" + sel(tgt).slice(0, 50) + (a.animationName ? "" : ":" + (e && e.getKeyframes ? JSON.stringify(e.getKeyframes()).slice(0, 10) : "")); if (!seen.has(k)) { seen.set(k, 1); events.push({ at: Math.round(performance.now() - t0), kind: a.constructor.name, name: a.animationName || a.transitionProperty || "", target: sel(tgt).slice(0, 70), dur: t.duration, delay: t.delay, ease: String(t.easing).slice(0, 40), iter: t.iterations, fill: t.fill, kf: e && e.getKeyframes ? JSON.stringify(e.getKeyframes().slice(0, 4)).slice(0, 230) : "" }); } });
    const dom = []; const mo = new w.MutationObserver((ms) => ms.forEach((m) => { if (m.type === "childList") { m.removedNodes.forEach((n) => n.nodeType === 1 && dom.push({ at: Math.round(performance.now() - t0), op: "removed", el: sel(n).slice(0, 50) })); m.addedNodes.forEach((n) => n.nodeType === 1 && dom.push({ at: Math.round(performance.now() - t0), op: "added", el: sel(n).slice(0, 50) })); } })); mo.observe(d.body, { childList: true, subtree: true });
    const before = { h: d.documentElement.scrollHeight, url: w.location.href };
    btn.click();
    for (let i = 0; i < 120; i++) { rec(); await sleep(40); }
    mo.disconnect();
    return { button: btn.textContent.trim().slice(0, 20), tag: btn.tagName, href: btn.getAttribute("href"), before, after: { h: d.documentElement.scrollHeight, url: w.location.href }, anims: events.slice(0, 70), dom: dom.slice(0, 40) };
  };
  return "probe ready";
})()
