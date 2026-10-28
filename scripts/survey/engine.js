// Thu thập "engine" bìa/mở thiệp của trang gốc: CSS styled-jsx, @keyframes đầy đủ, HTML bìa ở các thời điểm sau khi bấm.
// Dùng: await __P.engineDump(slug, id)  (cần probe.js + run.js đã nạp, collector đang chạy)
(() => {
  const P = window.__P;
  P.engineDump = async (slug, id) => {
    const f = await P.frame(`/vi/mau-thiep/${slug}/demo?autoscroll=0`, 390, 844);
    await P.sleep(4200);
    const w = f.contentWindow, d = w.document;
    const kf = {}, jsx = {}, other = [];
    const walk = (rs, ctx) => {
      for (const r of rs) {
        if (r.type === 7) { kf[r.name] = r.cssText; continue; }
        if (r.selectorText !== undefined) { const t = r.cssText || ""; const m = t.match(/jsx-([0-9a-f]{8,})/); if (m) (jsx[m[1]] = jsx[m[1]] || []).push((ctx ? "@" + ctx + " " : "") + t); continue; }
        if (r.cssRules) walk(r.cssRules, (ctx ? ctx + " | " : "") + (r.conditionText || r.cssText.slice(0, 40)));
      }
    };
    for (const s of d.styleSheets) { try { walk(s.cssRules, ""); } catch (e) { other.push(s.href); } }
    await P.send(`${id}_engine_css`, { keyframes: kf, jsx, cssVars: [...d.documentElement.style].length });
    const html = {};
    html.idle = d.body.innerHTML;
    const btn = [...d.querySelectorAll("a,button")].find((e) => /mở thiệp/i.test(e.textContent.trim()) && e.getBoundingClientRect().height > 0);
    const t0 = performance.now();
    btn.click();
    for (const ms of [40, 120, 300, 560, 700, 900, 1200, 1500]) {
      await P.sleep(Math.max(0, ms - (performance.now() - t0)));
      html["t" + ms] = d.body.innerHTML;
    }
    await P.send(`${id}_engine_html`, html);
    return { keyframes: Object.keys(kf).length, jsxHashes: Object.keys(jsx).map((h) => h + ":" + jsx[h].length), idleLen: html.idle.length };
  };
  return "engine ready";
})();
