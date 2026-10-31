import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const dir=process.argv[2];
await c.setViewport({ width: 1280, height: 800 });
for (const [n,u] of [["real_list","https://chungdoi.com/vi/mau-thiep"],["clone_list","http://localhost:5173/vi/mau-thiep"]]) { await c.navigate(u,3500); await c.screenshot(`${dir}/${n}.png`);
 console.log(n, JSON.stringify(await c.eval(`[...document.querySelectorAll('a')].filter(a=>/demo/i.test(a.href+a.innerText)).slice(0,4).map(a=>a.innerText.trim().slice(0,20)+' -> '+a.href)`))); }
process.exit(0);
