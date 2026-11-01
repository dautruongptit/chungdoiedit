import fs from "fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: false });
  await c.newPage();
  await c.navigate("https://chungdoi.com/vi/mau-thiep/vuonkinh-xanh-nhat/demo?open=1&autoscroll=0", 5000);
  await new Promise(r => setTimeout(r, 2000));

  const rel = "/images/themes/glass-garden-light-green/leaf1-background.webp";
  const b64 = await c.eval(`(async () => {
    const r = await fetch("${rel}");
    if (!r.ok) return null;
    const blob = await r.blob();
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    });
  })()`);

  if (b64) {
    const buf = Buffer.from(b64, "base64");
    fs.mkdirSync("web/public/images/themes/glass-garden-light-green", { recursive: true });
    fs.writeFileSync("web/public/images/themes/glass-garden-light-green/leaf1-background.webp", buf);
    console.log("Successfully downloaded leaf1-background.webp via Chrome! Size:", buf.length);
  } else {
    console.log("Fetch failed via Chrome");
  }
} finally {
  await c.close();
}
