// Mốc thời gian mở thiệp của bản local: node scripts/survey/local_open_timeline.mjs <templateId>
// Ghi docs/survey/raw/local_<id>_open_timeline.json
import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const id = process.argv[2];
const meta = JSON.parse(fs.readFileSync("docs/survey/_meta75.json", "utf8")).find((m) => m.id === id);
const src = fs.readFileSync(new URL("./open_timeline.js", import.meta.url), "utf8");
const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
await c.setViewport({ width: 390, height: 844 });
await c.navigate(`http://localhost:5173/vi/mau-thiep/${meta.slug}/demo?autoscroll=0`, 4500);
await c.eval(src);
const r = JSON.parse(await c.eval(`window.__openTimeline(window).then(r=>JSON.stringify(r))`));
fs.writeFileSync(`docs/survey/raw/local_${id}_open_timeline.json`, JSON.stringify(r));
console.log(id, "mốc:", (r.log || []).length);
process.exit(0);
