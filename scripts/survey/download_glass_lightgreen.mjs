import fs from "fs";
import { ChromeController } from "../cdp_helper.mjs";
import { downloadMissingAssetsViaChrome } from "./cdp_asset_downloader.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: false });
  await c.newPage();
  await c.navigate("https://chungdoi.com/vi/mau-thiep/vuonkinh-xanh-nhat/demo?open=1&autoscroll=0", 5000);
  await new Promise(r => setTimeout(r, 2000));

  const html = fs.readFileSync("docs/survey/raw/glass_garden_light_green_demo_outer.html", "utf8");
  const count = await downloadMissingAssetsViaChrome(c, html);
  console.log(`Finished downloading ${count} missing assets for glass_garden_light_green`);
} finally {
  await c.close();
}
