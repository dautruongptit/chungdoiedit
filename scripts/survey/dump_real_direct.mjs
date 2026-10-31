import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const [id, slug, widthArg, stateArg] = process.argv.slice(2);
if (!id || !slug) {
  console.error("Usage: node scripts/survey/dump_real_direct.mjs <id> <slug> [width=390] [state=open]");
  process.exit(1);
}

const width = Number(widthArg || 390);
const state = stateArg || "open";
const dumpSrc = fs.readFileSync(new URL("./dump.js", import.meta.url), "utf8");

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width, height: width === 390 ? 844 : 900 });

  const url = `https://chungdoi.com/vi/mau-thiep/${slug}/demo` + (state === "cover" ? "?autoscroll=0" : "?open=1&autoscroll=0");
  console.log("Navigating to", url);
  await c.navigate(url, 8000);

  const title = await c.eval("document.title");
  console.log("Page title:", title);

  // Chờ trang render ổn định
  await new Promise((r) => setTimeout(r, 2000));

  await c.eval(dumpSrc);
  await new Promise((r) => setTimeout(r, 1000));

  const opts = state === "cover" ? { rootSel: "body" } : {};
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
    fs.mkdirSync("docs/survey/raw", { recursive: true });
    const outPath = `docs/survey/raw/${id}_dump_${state}_${width}.json`;
    fs.writeFileSync(outPath, JSON.stringify(res, null, 2));
    console.log("Wrote", outPath);
  } else {
    console.error("Dump failed:", res);
  }
} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
