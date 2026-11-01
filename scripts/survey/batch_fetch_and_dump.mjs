import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";
import { downloadMissingAssetsViaChrome } from "./cdp_asset_downloader.mjs";

export async function fetchAndDumpTemplates(templates, { headless = false } = {}) {
  const dumpSrc = fs.readFileSync(new URL("./dump.js", import.meta.url), "utf8");
  const c = new ChromeController();

  try {
    await c.start({ headless });
    await c.newPage();
    await c.setViewport({ width: 390, height: 844 });

    for (const t of templates) {
      console.log(`\n========================================`);
      console.log(`FETCH & DUMP: ${t.id} (${t.slug})`);
      console.log(`========================================`);

      const url = `https://chungdoi.com/vi/mau-thiep/${t.slug}/demo?open=1&autoscroll=0`;
      console.log("Navigating to:", url);
      await c.navigate(url, 10000);

      // Check Cloudflare
      for (let i = 0; i < 15; i++) {
        const title = await c.eval("document.title");
        if (!title.includes("Just a moment")) break;
        console.log("Waiting for Cloudflare challenge...", title);
        await new Promise((r) => setTimeout(r, 1000));
      }

      await new Promise((r) => setTimeout(r, 2000));

      // Scroll to trigger lazy loading of album, gifts, etc.
      console.log("Pre-scrolling page to trigger lazy loading...");
      const preScroll = `(async()=>{
        const highestId = window.setInterval(() => {}, 1000);
        for (let i = 0; i <= highestId; i++) {
          window.clearInterval(i);
        }
        const sl = (ms) => new Promise(r => setTimeout(r, ms));
        for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await sl(150);
        }
        window.scrollTo(0, document.documentElement.scrollHeight);
        await sl(1500);
        window.scrollTo(0, 0);
        await sl(1000);
      })()`;
      await c.eval(preScroll);

      // 1. Get outer HTML
      const rootHtml = await c.eval(`(()=>{
        const root = document.querySelector('[data-testid*="-template"]') ||
                     document.querySelector('[data-testid]') ||
                     document.querySelector('.st-card') ||
                     document.querySelector('.flex.w-full.justify-center');
        return root ? root.outerHTML : document.body.outerHTML;
      })()`);

      fs.mkdirSync("docs/survey/raw", { recursive: true });
      fs.writeFileSync(`docs/survey/raw/${t.id}_demo_outer.html`, rootHtml);
      console.log(`Saved docs/survey/raw/${t.id}_demo_outer.html (len: ${rootHtml.length})`);

      // Automatically download any missing theme/envelope assets
      await downloadMissingAssetsViaChrome(c, rootHtml);

      // 2. Dump CDP nodes
      await c.eval(dumpSrc);
      await new Promise((r) => setTimeout(r, 500));

      const opts = { rootSel: "[data-testid*='-template'], .st-card, [data-showcase-root]" };
      const resStr = await c.eval(`JSON.stringify(window.__dump(${JSON.stringify(opts)}))`);
      const res = JSON.parse(resStr);

      console.log("Dump result:", {
        vw: res.vw,
        rootW: res.rootW,
        rootH: res.rootH,
        n: res.n,
        err: res.err,
      });

      if (res.n && !res.err) {
        fs.writeFileSync(`docs/survey/raw/${t.id}_dump_open_390.json`, JSON.stringify(res, null, 2));
        console.log(`Saved docs/survey/raw/${t.id}_dump_open_390.json`);
      } else {
        console.warn(`Warning: dump had err or empty: ${res.err}`);
      }
    }
  } catch (err) {
    console.error("fetchAndDump error:", err);
  } finally {
    await c.close();
  }
}

if (process.argv[1] && process.argv[1].endsWith("batch_fetch_and_dump.mjs")) {
  const id = process.argv[2];
  const slug = process.argv[3];
  if (id && slug) {
    fetchAndDumpTemplates([{ id, slug }]);
  }
}
