import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
const dir = process.argv[2];
for (const [w,h] of [[1280,720],[390,844]]) for (const [name,url] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.setViewport({ width: w, height: h, mobile: w<500 });
  await c.navigate(url, 3000);
  await c.screenshot(`${dir}/${name}_${w}.png`);
}
process.exit(0);
