import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const js = `(() => { const h=document.querySelector('h1'); const r=h.closest('.relative.rounded-lg').getBoundingClientRect(); return [Math.round(r.width),Math.round(r.height),innerWidth,devicePixelRatio]; })()`;
for (const dpr of [1, 0.9, 1.25]) {
  await c.send("Emulation.setDeviceMetricsOverride", { width: 1907, height: 913, deviceScaleFactor: dpr, mobile: false });
  for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) { await c.navigate(u,2500); console.log("dpr",dpr,n,JSON.stringify(await c.eval(js))); }
}
process.exit(0);
