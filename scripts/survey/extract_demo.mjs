import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const [idArg, slugArg] = process.argv.slice(2);
const id = idArg || "porcelain_v2_green";
const slug = slugArg || "bach-su-v2-xanh";

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.navigate(`https://chungdoi.com/vi/mau-thiep/${slug}/demo?open=1&autoscroll=0`, 8000);
  await new Promise((r) => setTimeout(r, 2000));

  const dataStr = await c.eval(`
    (() => {
      const nextDataEl = document.getElementById('__NEXT_DATA__');
      if (nextDataEl) {
        return nextDataEl.textContent;
      }
      return null;
    })()
  `);

  if (dataStr) {
    const parsed = JSON.parse(dataStr);
    const inv = parsed.props?.pageProps?.initialInvitation || parsed.props?.pageProps?.invitation || parsed.props?.pageProps?.demo;
    if (inv) {
      const out = `web/docs/survey/raw/${id}_demo_extracted.json`;
      fs.writeFileSync(out, JSON.stringify(inv, null, 2));
      console.log(`Saved demo for ${id} to ${out}`);
    } else {
      console.log("No invitation in pageProps:", Object.keys(parsed.props?.pageProps || {}));
    }
  } else {
    console.log("No __NEXT_DATA__");
  }
} catch (e) {
  console.error(e);
} finally {
  await c.close();
}
