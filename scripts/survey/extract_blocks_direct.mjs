import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const [idArg, slugArg] = process.argv.slice(2);
const id = idArg || "double_dragon_red";
const slug = slugArg || "song-long-do";

const c = new ChromeController();
try {
  await c.start({ headless: false });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  const url = `https://chungdoi.com/vi/mau-thiep/${slug}/demo` + "?open=1&autoscroll=0";
  console.log("Navigating to", url);
  await c.navigate(url, 10000);

  for (let i = 0; i < 10; i++) {
    const title = await c.eval("document.title");
    console.log(`[${i * 1}s] Page title:`, title);
    if (!title.includes("Just a moment")) break;
    await new Promise((r) => setTimeout(r, 1000));
  }

  await new Promise((r) => setTimeout(r, 2000));

  const infoStr = await c.eval(`
    (() => {
      const templateRoot = document.querySelector("[data-testid*='-template']") || document.querySelector("[data-testid]");
      if (!templateRoot) return JSON.stringify({ error: "No data-testid found" });

      const innerWrapper = templateRoot.firstElementChild;
      let container = innerWrapper;
      if (innerWrapper && innerWrapper.children.length <= 4 && innerWrapper.children[1] && innerWrapper.children[1].children.length > 3) {
        container = innerWrapper.children[1];
      }

      const sections = container ? Array.from(container.children).map((s, i) => ({
        idx: i,
        tag: s.tagName,
        cls: s.className,
        id: s.id,
        testId: s.getAttribute("data-testid"),
        html: s.outerHTML,
        textPreview: (s.textContent || "").trim().slice(0, 80)
      })) : [];

      // Extract full state / props / demo from DOM or window
      let demoData = null;
      const nextData = document.getElementById('__NEXT_DATA__');
      if (nextData) {
        try {
          const parsed = JSON.parse(nextData.textContent);
          demoData = parsed.props?.pageProps?.initialInvitation || parsed.props?.pageProps?.invitation || parsed.props?.pageProps?.demo;
        } catch (e) {}
      }

      // If nextData didn't have demoData, let's search React fiber or window
      if (!demoData) {
        try {
          const key = Object.keys(templateRoot).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
          if (key) {
            let fiber = templateRoot[key];
            while (fiber) {
              if (fiber.memoizedProps?.invitation || fiber.memoizedProps?.initialInvitation || fiber.memoizedProps?.data) {
                demoData = fiber.memoizedProps.invitation || fiber.memoizedProps.initialInvitation || fiber.memoizedProps.data;
                break;
              }
              fiber = fiber.return;
            }
          }
        } catch (e) {}
      }

      return JSON.stringify({
        templateTestId: templateRoot.getAttribute("data-testid"),
        templateCls: templateRoot.className,
        innerWrapperCls: innerWrapper ? innerWrapper.className : "",
        containerCls: container ? container.className : "",
        sections,
        demoData
      });
    })()
  `);

  const info = JSON.parse(infoStr);
  console.log("Template Root:", info.templateTestId);
  console.log("Container cls:", info.containerCls);
  console.log("Sections count:", info.sections.length);
  console.log("Demo data found:", !!info.demoData);

  const dir = `docs/survey/blocks/${id}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(`web/${dir}`, { recursive: true });

  info.sections.forEach((s) => {
    const fn = String(s.idx).padStart(2, "0") + ".html";
    fs.writeFileSync(`${dir}/${fn}`, s.html);
    fs.writeFileSync(`web/${dir}/${fn}`, s.html);
    console.log(`[Section ${s.idx}] <${s.tag}> class="${s.cls.slice(0, 50)}" text="${s.textPreview.slice(0, 40)}" (${s.html.length} bytes)`);
  });

  if (info.demoData) {
    const rawDirs = [`docs/survey/raw`, `web/docs/survey/raw`];
    for (const d of rawDirs) {
      fs.mkdirSync(d, { recursive: true });
      fs.writeFileSync(`${d}/${id}_demo_extracted.json`, JSON.stringify(info.demoData, null, 2));
    }
    console.log("Saved demo data to _demo_extracted.json!");
  }

} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
