// Các bước đo cho một mẫu (mỗi bước < 40 giây vì giới hạn của công cụ). Cần probe.js nạp trước.
(() => {
  const P = window.__P;
  const sleep = P.sleep;
  P.stepCover = async (slug, id) => {
    const base = `/vi/mau-thiep/${slug}/demo`;
    const f = await P.frame(base + "?autoscroll=0", 390, 844);
    await sleep(4500);
    const w = f.contentWindow;
    const cover = { slug, id, url: base, layout: P.layout(w), styles: P.styles(w), motion: P.motion(w), features: P.features(w), text: w.document.body.innerText.slice(0, 300) };
    await P.send(`${id}_cover390`, cover);
    const seq = await P.openSeq(w);
    await P.send(`${id}_openSeq`, seq);
    return { coverKids: (cover.layout.kids || []).length, openBtn: seq.button, anims: (seq.anims || []).length, dom: (seq.dom || []).length, afterH: seq.after && seq.after.h };
  };
  // sau khi mở (trong cùng iframe) hoặc tải ?open=1 ở chiều rộng w
  P.stepOpened = async (slug, id, width, reload = true) => {
    const base = `/vi/mau-thiep/${slug}/demo`;
    let f = document.getElementById("__f");
    if (reload || !f) { f = await P.frame(base + "?open=1&autoscroll=0", width, width === 390 ? 844 : 900); await sleep(5500); }
    const w = f.contentWindow;
    const out = { width, layout: P.layout(w) };
    if (width === 390) { out.styles = P.styles(w); out.motion = P.motion(w); out.features = P.features(w); out.scrollFx = await P.scrollFx(w); }
    await P.send(`${id}_open${width}`, out);
    return { width, docH: out.layout.docH, rootH: out.layout.rootH, kids: (out.layout.kids || []).map((k) => k.h).join(",") };
  };
  // hộp quà: bấm nút, ghi nội dung + animation, rồi đóng
  P.stepGift = async (id) => {
    const f = document.getElementById("__f"), w = f.contentWindow, d = w.document;
    const btn = [...d.querySelectorAll("button,a,[role=button]")].find((e) => /quà|mừng cưới|nhấn để mở/i.test((e.getAttribute("aria-label") || "") + e.textContent) && e.getBoundingClientRect().height > 0);
    if (!btn) return { err: "no gift button" };
    btn.scrollIntoView({ block: "center" }); await sleep(600);
    const before = d.getAnimations().length;
    btn.click();
    const ev = []; const seen = new Set();
    for (let i = 0; i < 40; i++) { d.getAnimations().forEach((a) => { const e = a.effect, t = e && e.getTiming ? e.getTiming() : {}; const k = (a.animationName || a.transitionProperty || "") + P.sel(e && e.target).slice(0, 40); if (!seen.has(k)) { seen.add(k); ev.push({ at: i * 50, name: a.animationName || a.transitionProperty || "", target: P.sel(e && e.target).slice(0, 60), dur: t.duration, ease: String(t.easing).slice(0, 30) }); } }); await sleep(50); }
    const dlg = d.querySelector("dialog[open],dialog.modal-open,[role=dialog]");
    const out = { btn: (btn.getAttribute("aria-label") || btn.textContent).trim().slice(0, 40), animsBefore: before, anims: ev.slice(0, 30), dialog: dlg ? { sel: P.sel(dlg), text: dlg.innerText.replace(/\n+/g, " / ").slice(0, 400), rect: (() => { const r = dlg.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; })(), imgs: [...dlg.querySelectorAll("img")].map((i) => (i.currentSrc || i.src).replace(w.location.origin, "").slice(0, 100)).slice(0, 12) } : null };
    await P.send(`${id}_gift`, out);
    return { btn: out.btn, dialog: !!dlg, anims: ev.length, text: out.dialog && out.dialog.text.slice(0, 120) };
  };
  return "run ready";
})();

// Đóng băng animation tại thời điểm T ms sau khi bấm "Mở thiệp" (T<0: chụp bìa trước khi bấm) để chụp khung hình.
(() => {
  const P = window.__P;
  P.freezeAt = async (slug, T) => {
    const f = await P.frame(`/vi/mau-thiep/${slug}/demo?autoscroll=0`, 390, 690);
    await P.sleep(3800);
    const w = f.contentWindow, d = w.document;
    const btn = [...d.querySelectorAll("a,button")].find((e) => /mở thiệp/i.test(e.textContent.trim()) && e.getBoundingClientRect().height > 0);
    if (!btn) return { err: "no btn" };
    if (T < 0) return { T, state: "cover" };
    setTimeout(() => d.getAnimations().forEach((a) => a.pause()), T);
    btn.click();
    await P.sleep(T + 200);
    const all = d.getAnimations();
    return { T, anims: all.length, paused: all.filter((a) => a.playState === "paused").length };
  };
  return "freeze ready";
})();

// Dump phần tử (hình học + kiểu) của trang gốc: P.dumpReal(slug, id, width, state) với state = cover | open | gift | rsvp
(() => {
  const P = window.__P;
  P.dumpReal = async (slug, id, width, state) => {
    const src = await (await fetch("http://localhost:5199/js/dump.js")).text();
    const base = `/vi/mau-thiep/${slug}/demo`;
    const f = await P.frame(base + (state === "cover" ? "?autoscroll=0" : "?open=1&autoscroll=0"), width, width === 390 ? 844 : 900);
    await P.sleep(state === "cover" ? 4000 : 5500);
    const w = f.contentWindow, d = w.document;
    const s = d.createElement("script"); s.textContent = src; d.head.appendChild(s);
    let opts = {};
    if (state === "openfull") { for (let y = 0; y < d.documentElement.scrollHeight; y += 500) { w.scrollTo(0, y); await P.sleep(200); } w.scrollTo(0, d.documentElement.scrollHeight); await P.sleep(2500); w.scrollTo(0, 0); await P.sleep(1500); }
    if (state === "cover") opts = { rootSel: "body" };
    if (state === "gift") { const b = d.querySelector('button[aria-label="Mở hộp mừng cưới"]'); b.scrollIntoView({ block: "center" }); await P.sleep(500); b.click(); await P.sleep(900); opts = { rootSel: "dialog[open] .modal-box, dialog.modal-open .modal-box, dialog[open]" }; }
    if (state === "rsvp") { const b = [...d.querySelectorAll("button")].find((x) => /XÁC NHẬN THAM DỰ/i.test(x.textContent)); b.scrollIntoView({ block: "center" }); await P.sleep(500); b.click(); await P.sleep(900); opts = { rootSel: "[role=dialog],dialog[open],.modal-open .modal-box,.fixed.inset-0" }; }
    const out = w.__dump(opts);
    await P.send(`${id}_dump_${state}_${width}`, out);
    return { state, width, n: out.n, rootW: out.rootW, rootH: out.rootH, err: out.err };
  };
  return "dumpReal ready";
})();

// Dump editor của trang gốc trong iframe: P.dumpEditorReal(draftId, templateId, id, width)
(() => {
  const P = window.__P;
  P.dumpEditorReal = async (draft, tpl, id, width) => {
    const src = await (await fetch("http://localhost:5199/js/dump.js")).text();
    const f = await P.frame(`/edit/${draft}?template=${tpl}`, width, width === 390 ? 844 : 900);
    await P.sleep(6500);
    const w = f.contentWindow, d = w.document;
    const s = d.createElement("script"); s.textContent = src; d.head.appendChild(s);
    // đóng hướng dẫn nếu có
    const out = w.__dump({ rootSel: "body" });
    out.cards = d.querySelectorAll("div.bg-base-100.border.border-base-300.rounded-lg").length;
    await P.send(`${id}_dump_editor_${width}`, out);
    return { width, n: out.n, docH: out.docH, cards: out.cards };
  };
  return "dumpEditorReal ready";
})();
