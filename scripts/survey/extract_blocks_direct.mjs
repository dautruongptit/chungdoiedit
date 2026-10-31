import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const [idArg, slugArg] = process.argv.slice(2);
const id = idArg || "porcelain_v2_green";
const slug = slugArg || "bach-su-v2-xanh";

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  const url = `https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1&autoscroll=0`;
  console.log("Navigating to", url);
  await c.navigate(url, 8000);
  await new Promise((r) => setTimeout(r, 2000));

  const infoStr = await c.eval(`
    (() => {
      const templateRoot = document.querySelector("[data-testid]");
      if (!templateRoot) return JSON.stringify({ error: "No data-testid found" });

      const innerWrapper = templateRoot.firstElementChild;
      const bgDecor = innerWrapper.children[0];
      const mainContent = innerWrapper.children[1];
      const modalDialog = innerWrapper.children[2];

      const sections = Array.from(mainContent.children).map((s, i) => ({
        idx: i,
        tag: s.tagName,
        cls: s.className,
        id: s.id,
        testId: s.getAttribute("data-testid"),
        html: s.outerHTML,
        textPreview: (s.textContent || "").trim().slice(0, 80)
      }));

      return JSON.stringify({
        templateTestId: templateRoot.getAttribute("data-testid"),
        templateCls: templateRoot.className,
        innerWrapperCls: innerWrapper.className,
        bgDecorHtml: bgDecor ? bgDecor.outerHTML : null,
        mainContentCls: mainContent.className,
        modalHtml: modalDialog ? modalDialog.outerHTML : null,
        sections
      });
    })()
  `);

  const info = JSON.parse(infoStr);
  console.log("Template Root:", info.templateTestId);
  console.log("Inner wrapper cls:", info.innerWrapperCls);
  console.log("Main content cls:", info.mainContentCls);
  console.log("Sections count:", info.sections.length);

  const dir = `docs/survey/blocks/${id}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(`web/${dir}`, { recursive: true });

  // Save bg decor
  if (info.bgDecorHtml) {
    fs.writeFileSync(`${dir}/bg_decor.html`, info.bgDecorHtml);
    fs.writeFileSync(`web/${dir}/bg_decor.html`, info.bgDecorHtml);
  }

  // Save modal
  if (info.modalHtml) {
    fs.writeFileSync(`${dir}/modal.html`, info.modalHtml);
    fs.writeFileSync(`web/${dir}/modal.html`, info.modalHtml);
  }

  // Save sections
  info.sections.forEach((s) => {
    const fn = String(s.idx).padStart(2, "0") + ".html";
    fs.writeFileSync(`${dir}/${fn}`, s.html);
    fs.writeFileSync(`web/${dir}/${fn}`, s.html);
    console.log(`[Section ${s.idx}] <${s.tag}> class="${s.cls.slice(0, 50)}" text="${s.textPreview.slice(0, 40)}" (${s.html.length} bytes)`);
  });

} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
