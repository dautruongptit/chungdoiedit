import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const dir=process.argv[2];
await c.setViewport({ width: 1440, height: 900 });
await c.navigate("https://chungdoi.com/edit/000715c8-e1a8-48f1-b988-035bf764f1dc?template=minimalism_darkred",6000);
console.log(await c.eval("location.href"));
console.log(JSON.stringify(await c.eval(`({title:document.title,h:document.documentElement.scrollHeight,text:document.body.innerText.slice(0,1500)})`)));
await c.screenshot(dir+"/live_edit.png");
process.exit(0);
