import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
for (const t of ["minimalism_red", "double_phoenix_red", "porcelain_red", "minimalism_brown"]) {
  await c.navigate(`https://chungdoi.com/edit/${crypto.randomUUID()}?template=${t}`, 9000);
  const txt = await c.eval("document.body.innerText");
  console.log(JSON.stringify(txt.slice(0,120)));
  const pick = (a, b) => { const i = txt.indexOf(a); return i < 0 ? "(none)" : txt.slice(i, i + b).replace(/\n+/g, " | "); };
  console.log(t, "\n  ", pick("Dress Code", 60), "\n  ", pick("Lịch trình ngày cưới", 60), "\n  ", pick("Giờ Đón khách", 140), "\n  ", pick("Hộp Quà Mừng", 90));
}
process.exit(0);
