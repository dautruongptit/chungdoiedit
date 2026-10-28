// Probe màn Chỉnh sửa của trang gốc: liệt kê các thẻ, công tắc, field, nút. Gửi về collector.
(() => {
  const E = (window.__E = {});
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
  E.cards = () => [...document.querySelectorAll("div.bg-base-100.border.border-base-300.rounded-lg")].filter((c) => c.parentElement && c.getBoundingClientRect().height > 20);
  E.describe = (c) => {
    const head = c.firstElementChild;
    const title = clean(head ? head.innerText : c.innerText).slice(0, 40);
    const toggle = c.querySelector("input[type=checkbox].toggle, input[type=checkbox][role=switch], input.toggle");
    const fields = [];
    c.querySelectorAll("fieldset").forEach((f) => {
      const legend = clean(f.querySelector("legend")?.textContent);
      const ctrls = [...f.querySelectorAll("input,textarea,select")].map((i) => ({ k: i.tagName.toLowerCase() + (i.type && i.tagName === "INPUT" ? ":" + i.type : ""), ph: (i.placeholder || "").slice(0, 40), v: (i.type === "checkbox" || i.type === "radio" ? String(i.checked) : (i.value || "").slice(0, 40)), opts: i.tagName === "SELECT" ? [...i.options].map((o) => o.textContent.trim()).slice(0, 8) : undefined }));
      fields.push({ legend, ctrls });
    });
    const btns = [...new Set([...c.querySelectorAll("button,[role=button],label.btn,a")].map((b) => clean(b.getAttribute("aria-label") || b.textContent)).filter((t) => t && t.length < 50))];
    const radios = [...c.querySelectorAll("[role=radio],[role=tab],input[type=radio]")].map((r) => clean(r.getAttribute("aria-label") || r.parentElement?.textContent || r.value)).filter(Boolean).slice(0, 10);
    return { title, toggle: !!toggle, toggleOn: toggle ? toggle.checked : null, h: Math.round(c.getBoundingClientRect().height), nFields: fields.length, fields: fields.slice(0, 40), buttons: btns.slice(0, 30), radios, imgs: c.querySelectorAll("img").length };
  };
  // mở mọi thẻ đang gập (bấm tiêu đề) để các field render đủ
  E.expandAll = async () => {
    for (const c of E.cards()) { const body = c.querySelector(".grid.transition-all"); if (body && body.getBoundingClientRect().height < 5) { c.firstElementChild.click(); await sleep(250); } }
  };
  E.dump = async (id) => {
    await sleep(500);
    await E.expandAll(); await sleep(500);
    const out = { id, url: location.pathname, cards: E.cards().map(E.describe), topButtons: [...document.querySelectorAll("header button, nav button, [class*=toolbar] button")].map((b) => clean(b.textContent)).filter(Boolean).slice(0, 20), dialogs: [...document.querySelectorAll("dialog,[role=dialog]")].map((d) => clean(d.innerText).slice(0, 120)) };
    await fetch("http://localhost:5199/" + encodeURIComponent(id + "_editor"), { method: "POST", body: JSON.stringify(out) });
    return out.cards.map((c) => c.title + (c.toggle ? "[T:" + c.toggleOn + "]" : "") + "(" + c.nFields + "f," + c.h + ")").join(" ; ");
  };
  return "editor probe ready";
})()
