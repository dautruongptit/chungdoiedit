import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  const url = "http://localhost:5173/vi/mau-thiep/minimalism-xanh/demo?open=1&autoscroll=0";
  console.log("Navigating to:", url);
  await c.navigate(url, 5000);
  await new Promise(r => setTimeout(r, 2000));

  const info = await c.eval(`(()=>{
    const root = document.querySelector('[data-testid*="-template"]') || document.querySelector('[data-showcase-root]');
    const errors = window.__vite_plugin_react_preamble_installed__ ? [] : [];
    return {
      title: document.title,
      hasRoot: !!root,
      bodyText: document.body.innerText.slice(0, 300),
      html: document.body.innerHTML.slice(0, 500)
    };
  })()`);

  console.log("Page info:", JSON.stringify(info, null, 2));
} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
