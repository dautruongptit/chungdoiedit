import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const id = "lien_hoa_v2_green";
const slug = "lien-hoa-v2-xanh";
const width = 390;
const state = "open";
const dumpSrc = fs.readFileSync(new URL("./dump.js", import.meta.url), "utf8");

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width, height: 844 });

  const url = `http://localhost:5173/vi/mau-thiep/${slug}/demo?open=1&autoscroll=0`;
  console.log("Navigating to", url);
  await c.navigate(url, 5000);

  // Chờ trang render ổn định
  await new Promise((r) => setTimeout(r, 2000));

  await c.eval(dumpSrc);
  await new Promise((r) => setTimeout(r, 500));

  console.log("Scrolling page to trigger lazy loading...");
  const preScroll = `(async()=>{
    const highestId = window.setInterval(() => {}, 1000);
    for (let i = 0; i <= highestId; i++) {
      window.clearInterval(i);
    }
    const sl = (ms) => new Promise(r => setTimeout(r, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await sl(100);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await sl(1000);
    window.scrollTo(0, 0);
    await sl(800);
  })()`;
  await c.eval(preScroll);

  const opts = { rootSel: "[data-testid*='-template']" };
  const resStr = await c.eval(`JSON.stringify(window.__dump(${JSON.stringify(opts)}))`);
  const res = JSON.parse(resStr);

  console.log("Result:", {
    vw: res.vw,
    docH: res.docH,
    rootW: res.rootW,
    rootH: res.rootH,
    n: res.n,
    err: res.err,
  });

  if (res.n && !res.err) {
    const outRel = `docs/survey/raw/local_${id}_dump_${state}_${width}.json`;
    const dirs = ["docs/survey/raw", "web/docs/survey/raw"];
    for (const d of dirs) {
      fs.mkdirSync(d, { recursive: true });
      fs.writeFileSync(`${d}/local_${id}_dump_${state}_${width}.json`, JSON.stringify(res, null, 2));
    }
    console.log("Wrote", outRel, "and web/" + outRel);
  } else {
    console.error("Dump failed:", res);
  }
} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
