// Dump phần tử của bản local cùng định dạng với trang gốc (scripts/survey/dump.js).
// Dùng: node scripts/survey/local_dump.mjs <templateId> <state: cover|open|gift|rsvp> <width> [--slug <slug>]
// Ghi: docs/survey/raw/local_<id>_dump_<state>_<width>.json
import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const [id, state, widthArg] = process.argv.slice(2);
if (!id || !state || !widthArg) { console.error("Cách dùng: node scripts/survey/local_dump.mjs <templateId> <cover|open|gift|rsvp> <width>"); process.exit(1); }
const width = Number(widthArg);
const meta = JSON.parse(fs.readFileSync("docs/survey/_meta75.json", "utf8")).find((m) => m.id === id);
const slug = process.argv.includes("--slug") ? process.argv[process.argv.indexOf("--slug") + 1] : meta.slug;
const src = fs.readFileSync(new URL("./dump.js", import.meta.url), "utf8");

const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
await c.setViewport({ width, height: width === 390 ? 844 : 900 });
const url = state === "editor" ? `http://localhost:5173/edit/dump-${id}-${width}?template=${id}` : `http://localhost:5173/vi/mau-thiep/${slug}/demo` + (state === "cover" ? "?autoscroll=0" : "?open=1&autoscroll=0");
await c.navigate(url, state === "cover" ? 4500 : 6500);
if (process.argv.includes("--css")) { const css = fs.readFileSync(process.argv[process.argv.indexOf("--css") + 1], "utf8"); await c.eval(`(()=>{const s=document.createElement("style");s.textContent=${JSON.stringify(css)};document.head.appendChild(s)})()`); await new Promise((r) => setTimeout(r, 400)); }
await c.eval(src);
const pre = {
  openfull: `(async()=>{const sl=(ms)=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.documentElement.scrollHeight;y+=500){window.scrollTo(0,y);await sl(200)}window.scrollTo(0,document.documentElement.scrollHeight);await sl(2500);window.scrollTo(0,0);await sl(1500)})()`,
  cover: "",
  editor: "",
  open: "",
  gift: `(async()=>{const b=document.querySelector('button[aria-label="Mở hộp mừng cưới"]');b.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,500));b.click();await new Promise(r=>setTimeout(r,900));})()`,
  rsvp: `(async()=>{const b=[...document.querySelectorAll('button')].find((x)=>/XÁC NHẬN THAM DỰ/i.test(x.textContent));b.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,500));b.click();await new Promise(r=>setTimeout(r,900));})()`,
}[state];
if (pre) await c.eval(pre);
await new Promise((r) => setTimeout(r, 900));
const opts = { openfull: {}, editor: { rootSel: "body" }, cover: { rootSel: "body" }, open: { rootSel: "[data-testid*='-template']" }, gift: { rootSel: "dialog[open] .modal-box, dialog.modal-open .modal-box, dialog[open]" }, rsvp: { rootSel: "[role=dialog],dialog[open],.modal-open .modal-box,.fixed.inset-0" } }[state];
const out = JSON.parse(await c.eval(`JSON.stringify(window.__dump(${JSON.stringify(opts)}))`));
fs.mkdirSync("docs/survey/raw", { recursive: true });
fs.writeFileSync(`docs/survey/raw/local_${id}_dump_${state}_${width}${process.argv.includes("--css") ? "_exp" : ""}.json`, JSON.stringify(out));
console.log(id, state, width, "n=", out.n, "root", out.rootW, "x", out.rootH, out.err || "");
process.exit(0);
