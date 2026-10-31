import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const dir = process.argv[2];
await c.setViewport({ width: 1440, height: 900 });
// Trang thật: bấm "Tạo thiệp" từ trang mẫu; bản clone: route tạo trực tiếp.
await c.navigate("https://chungdoi.com/edit/9efe57f2-2a60-47b4-9bb3-fe53d1681d04?template=minimalism_darkred", 7000);
const targets = [["real", null], ["clone", "http://localhost:5173/invitations/create/minimalism-do-dam"]];
for (const [n, u] of targets) {
  if (u) await c.navigate(u, 6000);
  console.log(n, await c.eval("location.href"));
  const h = await c.eval("document.documentElement.scrollHeight");
  await c.setViewport({ width: 1440, height: Math.min(h, 8000) });
  await new Promise(r => setTimeout(r, 800));
  await c.screenshot(`${dir}/ed_${n}.png`);
  await c.setViewport({ width: 1440, height: 900 });
  fs.writeFileSync(`${dir}/ed_${n}.txt`, await c.eval("document.body.innerText"));
  fs.writeFileSync(`${dir}/ed_${n}.html`, await c.eval("document.querySelector('main')?.outerHTML||''"));
  console.log(n, "height", h);
}
process.exit(0);
