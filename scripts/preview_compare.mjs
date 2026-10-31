// So bản xem trước local với số đo trang thật (file dòng "tag|tên|x|y|w|h|cỡ chữ|đậm").
// node preview_compare.mjs <real.txt> <width> <height> [mobile]
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";
const [realFile, W, H] = [process.argv[2], Number(process.argv[3]), Number(process.argv[4])];
const mobile = false; // giữ thanh cuộn 15px như khung đo của trang thật
const realMainW = Number(process.argv[5] || 896);
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: W, height: H, mobile, deviceScaleFactor: mobile ? 2 : 1 });
await c.navigate(`http://localhost:5173/edit/cmp-${Date.now()}?template=minimalism_darkred`, 5500);
const setVal = (sel, v) => `(() => { const el=[...document.querySelectorAll('${sel}')].pop(); const s=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; s.call(el,'${v}'); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); })()`;
await c.eval(setVal("input[type=date]", "2026-12-12"));
await c.eval(setVal("input[type=time]", "18:00"));
await c.eval(`[...document.querySelectorAll('button')].find(b=>/Xem trước/.test(b.innerText)).click()`);
await new Promise(r => setTimeout(r, 3500));
const js = fs.readFileSync(new URL("./rect_dump.js", import.meta.url), "utf8");
const raw = await c.eval(js);
const res = JSON.parse(raw);
fs.writeFileSync(`${process.argv[2]}.clone.txt`, res.lines.join("\n"));
const real = fs.readFileSync(realFile, "utf8").split("\n").filter(Boolean);
console.log(`viewport ${W}x${H}${mobile ? " mobile" : ""}  clone mainW=${res.mainW}  real lines=${real.length} clone lines=${res.lines.length}`);
// ghép theo tên (bỏ qua thẻ và khoảng trắng), theo thứ tự; x tính từ tâm khung main
const key = (p) => p[1].replace(/s+/g, "");
const cl = res.lines.map((l) => l.split("|"));
const used = new Set(); let j = 0;
for (const r of real) {
  const [tag, name, x, y, w, h, fs_, fw] = r.split("|");
  let k = -1;
  for (let i = j; i < cl.length; i++) if (key(cl[i]) === name.replace(/s+/g, "")) { k = i; break; }
  if (k < 0) { console.log("MISSING  " + tag + "|" + name + " real@(" + x + "," + y + ") " + w + "x" + h); continue; }
  j = k + 1; used.add(k);
  const [ctag, , cx, cy, cw, ch, cfs, cfw] = cl[k];
  const d = [(cx - res.mainW / 2) - (x - realMainW / 2), cy - y, cw - w, ch - h].map((v) => Math.round(v));
  const diff = d.some((v) => Math.abs(v) > 1) || cfs !== fs_ || cfw !== fw;
  console.log((diff ? "DIFF " : "ok   ") + " " + tag + "|" + name + (ctag !== tag ? "(" + ctag + ")" : "") + "  dx=" + d[0] + " dy=" + d[1] + " dw=" + d[2] + " dh=" + d[3] + (cfs !== fs_ ? " font " + fs_ + "→" + cfs : "") + (cfw !== fw ? " wt " + fw + "→" + cfw : ""));
}
cl.forEach((p, i) => { if (!used.has(i)) console.log("EXTRA    " + p.join("|")); });
process.exit(0);
