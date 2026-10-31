import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  for (const item of [
    { id: "porcelain_v2_red", slug: "bach-su-v2-do", testId: "porcelain-v2-red-template" },
    { id: "porcelain_v2_pink", slug: "bach-su-v2-hong", testId: "porcelain-v2-pink-template" }
  ]) {
    console.log("Navigating to", item.slug);
    await c.navigate(`https://chungdoi.com/vi/mau-thiep/${item.slug}/demo?open=1&autoscroll=0`, 8000);
    // Wait up to 5 seconds for testId to appear
    for (let i = 0; i < 10; i++) {
      const found = await c.eval(`!!document.querySelector("[data-testid='${item.testId}']")`);
      if (found) {
        console.log(`Found testId ${item.testId} after ${i * 500}ms`);
        break;
      }
      await new Promise((r) => setTimeout(r, 500));
    }

    const html = await c.eval(`
      (() => {
        const root = document.querySelector("[data-testid='${item.testId}']");
        if (!root) return JSON.stringify({ error: "no root", bodyHtml: document.body.innerHTML.slice(0, 300) });
        const inner = root.firstElementChild;
        const main = inner.children[1];
        return JSON.stringify({
          rootCls: root.className,
          innerCls: inner.className,
          mainCls: main.className,
          sections: Array.from(main.children).map((s, idx) => ({
            idx,
            tag: s.tagName,
            cls: s.className,
            style: s.getAttribute("style"),
            html: s.outerHTML
          }))
        });
      })()
    `);

    const parsed = JSON.parse(html);
    if (parsed.sections) {
      const dir = `web/docs/survey/blocks/${item.id}`;
      fs.mkdirSync(dir, { recursive: true });
      parsed.sections.forEach((s) => {
        const fn = `${dir}/${String(s.idx).padStart(2, "0")}.html`;
        fs.writeFileSync(fn, s.html);
      });
      console.log(`Saved ${parsed.sections.length} blocks for ${item.id}`);
    } else {
      console.log("Error:", parsed);
    }
  }
} catch (e) {
  console.error(e);
} finally {
  await c.close();
}
