import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 390, height: 900, mobile: true });
await c.navigate("https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo",3500);
await c.eval(`(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`); await new Promise(r=>setTimeout(r,3500));
await c.eval(`document.querySelector('[aria-label="Go to photo 1"]').scrollIntoView()`);
for (let i=0;i<6;i++){ console.log(await c.eval(`[...document.querySelectorAll('[aria-label^="Go to photo"]')].map(b=>b.className.includes('w-6')?'■':'□').join('')`)); await new Promise(r=>setTimeout(r,1500)); }
process.exit(0);
