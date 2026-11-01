import fs from "fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: false });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  console.log("Navigating to real live site...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/lien-hoa-v2-xanh/demo?open=1&autoscroll=0", 12000);
  
  // Chờ Cloudflare bypass
  for (let i = 0; i < 15; i++) {
    const title = await c.eval("document.title");
    console.log(`[${i}s] title: ${title}`);
    if (!title.includes("Just a moment") && title.length > 0) break;
    await new Promise((r) => setTimeout(r, 1000));
  }
  await new Promise((r) => setTimeout(r, 3000));

  // Cuộn hết trang xuống đáy
  await c.eval(`(async()=>{
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise(r => setTimeout(r, 1500));
    window.scrollTo(0, 0);
  })()`);
  await new Promise((r) => setTimeout(r, 1500));

  // Khảo sát các ảnh và phần tử thực tế
  const info = await c.eval(`(()=>{
    const root = document.querySelector("[data-testid*='-template']");
    if (!root) return { error: "No root found", bodyHTML: document.body.innerHTML.slice(0, 300) };

    const imgs = Array.from(root.querySelectorAll('img')).map(im => ({
      src: im.src,
      alt: im.alt,
      complete: im.complete,
      naturalWidth: im.naturalWidth,
      naturalHeight: im.naturalHeight,
      w: im.getBoundingClientRect().width,
      h: im.getBoundingClientRect().height,
      display: window.getComputedStyle(im).display
    }));

    // Khảo sát children của inner wrapper
    const inner = root.firstElementChild;
    const children = inner ? Array.from(inner.children).map((ch, i) => ({
      i,
      tag: ch.tagName,
      cls: (typeof ch.className === 'string' ? ch.className : '').slice(0, 60),
      html: ch.outerHTML.slice(0, 150)
    })) : [];

    return {
      title: document.title,
      imgsCount: imgs.length,
      imgs,
      childrenCount: children.length,
      children
    };
  })()`);

  console.log("Accurate Live Info:", JSON.stringify(info, null, 2));
  fs.writeFileSync("docs/survey/raw/lien_hoa_v2_green_accurate_live.json", JSON.stringify(info, null, 2));

} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
