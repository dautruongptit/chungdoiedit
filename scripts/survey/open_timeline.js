// Đo mốc thời gian khi bấm "Mở thiệp": khung thiệp xuất hiện, bìa biến mất, thanh cuộn... Dùng chung cho trang gốc (trong iframe) và local.
// window.__openTimeline(win) -> mảng sự kiện { t, ... } ghi khi trạng thái đổi (lấy mẫu mỗi ~16ms trong 3.2 giây).
(() => {
  window.__openTimeline = async (w) => {
    const d = w.document, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const btn = [...d.querySelectorAll("a,button")].find((e) => /mở thiệp/i.test(e.textContent.trim()) && e.getBoundingClientRect().height > 0);
    if (!btn) return { err: "no button" };
    const state = () => {
      const cover = d.querySelector('[data-landing-screenshot-id="invite-envelope"]');
      const root = d.querySelector("[data-showcase-root]");
      const env = [...d.querySelectorAll("div")].find((e) => /\brelative\b/.test(e.className) && /w-\[310px\]/.test(e.className));
      const cs = (e) => (e ? w.getComputedStyle(e) : null);
      const op = (e) => (e ? Math.round(parseFloat(cs(e).opacity) * 100) / 100 : null);
      const ty = (e) => { if (!e) return null; const m = /matrix\(([^)]+)\)/.exec(cs(e).transform); return m ? Math.round(parseFloat(m[1].split(",")[5])) : 0; };
      return {
        cover: !!cover, root: !!root, rootOp: op(root), env: !!env, envOp: op(env), envTy: ty(env),
        docH: d.documentElement.scrollHeight, scrollY: Math.round(w.scrollY),
      };
    };
    const t0 = performance.now();
    btn.click();
    const log = [];
    let prev = "";
    for (let i = 0; i < 200; i++) {
      const s = state();
      const key = [s.cover, s.root, s.rootOp, s.env, s.envOp, s.envTy, s.scrollY].join("|");
      if (key !== prev) { log.push({ t: Math.round(performance.now() - t0), ...s }); prev = key; }
      await sleep(16);
    }
    return { log };
  };
})();
