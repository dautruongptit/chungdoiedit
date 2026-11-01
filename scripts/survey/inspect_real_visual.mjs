import fs from "fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  console.log("Navigating to real live site...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/lien-hoa-v2-xanh/demo?open=1&autoscroll=0", 12000);
  
  // Chờ Cloudflare bypass
  for (let i = 0; i < 10; i++) {
    const title = await c.eval("document.title");
    if (!title.includes("Just a moment")) break;
    await new Promise((r) => setTimeout(r, 1000));
  }
  await new Promise((r) => setTimeout(r, 2000));

  // Cuộn hết trang để load toàn bộ ảnh
  await c.eval(`(async()=>{
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 100));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise(r => setTimeout(r, 1000));
    window.scrollTo(0, 0);
  })()`);
  await new Promise((r) => setTimeout(r, 1500));

  // Kiểm tra thông tin phần đáy trang trên live site
  const bottomInfo = await c.eval(`(()=>{
    const root = document.querySelector("[data-testid*='-template']");
    if (!root) return "No template root";
    const inner = root.firstElementChild;
    const lastChild = inner ? inner.lastElementChild : null;
    const imgs = root.querySelectorAll('img');
    const imgList = Array.from(imgs).map(im => ({
      src: im.src.split('/').pop().split('?')[0],
      display: window.getComputedStyle(im).display,
      visible: window.getComputedStyle(im).visibility,
      opacity: window.getComputedStyle(im).opacity,
      w: im.getBoundingClientRect().width,
      h: im.getBoundingClientRect().height,
      complete: im.complete,
      naturalWidth: im.naturalWidth,
      naturalHeight: im.naturalHeight
    }));
    return {
      totalImgs: imgList.length,
      imgs: imgList,
      lastChildTag: lastChild ? lastChild.tagName : null,
      lastChildHTML: lastChild ? lastChild.outerHTML.slice(0, 200) : null
    };
  })()`);
  console.log("Real live site bottom and images info:", JSON.stringify(bottomInfo, null, 2));

} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
