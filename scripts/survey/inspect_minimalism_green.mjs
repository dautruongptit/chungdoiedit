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

  const info = await c.eval(`(()=>{
    const root = document.querySelector('[data-testid*="-template"]') || document.querySelector('[data-testid]');
    if (!root) return { error: "no root", title: document.title, html: document.body.innerText.slice(0, 200) };

    const sections = Array.from(root.querySelectorAll('section, header, footer')).map((el, i) => ({
      i,
      tag: el.tagName,
      testId: el.getAttribute('data-testid'),
      cls: el.className,
      text: el.innerText.trim().slice(0, 60),
      h: el.offsetHeight
    }));

    const imgs = Array.from(root.querySelectorAll('img')).map(img => ({
      src: img.src,
      w: img.naturalWidth,
      h: img.naturalHeight,
      cls: img.className
    }));

    return {
      testId: root.getAttribute('data-testid'),
      w: root.offsetWidth,
      h: root.offsetHeight,
      sections,
      imgs: imgs.slice(0, 15)
    };
  })()`);

  console.log("Template info:", JSON.stringify(info, null, 2));

} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
