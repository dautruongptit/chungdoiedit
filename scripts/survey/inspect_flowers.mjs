import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });
  await c.navigate("https://chungdoi.com/vi/mau-thiep/bach-su-v2-do/demo?open=1&autoscroll=0", 8000);
  await new Promise((r) => setTimeout(r, 2000));

  const imgsStr = await c.eval(`
    (() => {
      return JSON.stringify(Array.from(document.querySelectorAll("img")).map(img => ({
        src: img.src,
        cls: img.className,
        style: img.getAttribute("style")
      })));
    })()
  `);

  console.log(JSON.parse(imgsStr));
} catch (e) {
  console.error(e);
} finally {
  await c.close();
}
