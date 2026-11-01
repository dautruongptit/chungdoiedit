import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  const url = "http://localhost:5173/vi/mau-thiep/minimalism-xanh/demo?open=1&autoscroll=0";
  await c.navigate(url, 5000);
  await new Promise(r => setTimeout(r, 2000));

  const errText = await c.eval(`(()=>{
    const overlay = document.querySelector('vite-error-overlay');
    if (!overlay) return "no overlay";
    return overlay.shadowRoot ? overlay.shadowRoot.innerText : overlay.innerText;
  })()`);

  console.log("Vite error:", errText);
} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
