import fs from "fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: false });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  const url = "https://chungdoi.com/vi/mau-thiep/minimalism-nau-dam/demo?open=1&autoscroll=0";
  console.log("Navigating to:", url);
  await c.navigate(url, 10000);

  for (let i = 0; i < 10; i++) {
    const title = await c.eval("document.title");
    if (!title.includes("Just a moment")) break;
    await new Promise((r) => setTimeout(r, 1000));
  }
  await new Promise((r) => setTimeout(r, 2000));

  const rootHtml = await c.eval(`(()=>{
    const root = document.querySelector('[data-testid*="-template"]') || document.querySelector('[data-testid]');
    return root ? root.outerHTML : document.body.outerHTML;
  })()`);

  fs.writeFileSync("docs/survey/raw/minimalism_darkbrown_demo_outer.html", rootHtml);
  console.log("Saved minimalism_darkbrown_demo_outer.html, length:", rootHtml.length);

} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
