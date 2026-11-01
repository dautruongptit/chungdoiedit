import fs from "fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: false });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  const url = "https://chungdoi.com/vi/mau-thiep/minimalism-xanh/demo?open=1&autoscroll=0";
  console.log("Navigating to:", url);
  await c.navigate(url, 10000);

  for (let i = 0; i < 10; i++) {
    const title = await c.eval("document.title");
    if (!title.includes("Just a moment")) break;
    await new Promise((r) => setTimeout(r, 1000));
  }
  await new Promise((r) => setTimeout(r, 2000));

  // Scroll to lazy load everything
  await c.eval(`(async()=>{
    const highestId = window.setInterval(() => {}, 1000);
    for (let i = 0; i <= highestId; i++) window.clearInterval(i);
    const sl = (ms) => new Promise(r => setTimeout(r, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await sl(150);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await sl(1500);
    window.scrollTo(0, 0);
    await sl(1000);
  })()`);

  const rootHtml = await c.eval(`(()=>{
    const root = document.querySelector('[data-testid*="-template"]') || document.querySelector('[data-testid]');
    return root ? root.outerHTML : document.body.outerHTML;
  })()`);

  fs.writeFileSync("docs/survey/raw/minimalism_green_full_scrolled.html", rootHtml);
  console.log("Saved minimalism_green_full_scrolled.html, length:", rootHtml.length);

} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
