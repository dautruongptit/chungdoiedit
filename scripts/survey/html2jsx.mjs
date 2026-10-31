// Chuyển HTML (serialize từ trang gốc) sang JSX tĩnh để dựng lại component bằng đúng lớp Tailwind/daisyUI của gốc.
// Dùng: node scripts/survey/html2jsx.mjs <tệp.json> <khóa> [chỉ-số] > ra.jsx
//   <tệp.json> trong docs/survey/raw, <khóa> là trường chứa HTML (chuỗi hoặc mảng; kèm chỉ-số nếu là mảng).
import fs from "node:fs";

const VOID = new Set(["img", "input", "br", "hr", "meta", "link", "source"]);
const RENAME = { class: "className", for: "htmlFor", tabindex: "tabIndex", maxlength: "maxLength", srcset: "srcSet", colspan: "colSpan", rowspan: "rowSpan", autocomplete: "autoComplete", readonly: "readOnly", contenteditable: "contentEditable", crossorigin: "crossOrigin", enctype: "encType", frameborder: "frameBorder", novalidate: "noValidate", autofocus: "autoFocus", spellcheck: "spellCheck" };
const BOOL = new Set(["disabled", "required", "checked", "hidden", "readonly", "selected", "multiple", "autofocus", "open"]);
const DROP = (n) => /^data-(showcase|landing|bot|state|headlessui|nimg)/.test(n) || n === "dir" || n === "decoding" || n === "loading" || n === "xmlns" || n === "aria-hidden" && false;

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const styleObj = (v) => {
  const o = [];
  for (const part of v.split(";")) {
    const i = part.indexOf(":");
    if (i < 0) continue;
    const k = part.slice(0, i).trim(), val = part.slice(i + 1).trim();
    if (!k) continue;
    const key = k.startsWith("--") ? JSON.stringify(k) : camel(k);
    o.push(`${key}: ${JSON.stringify(val)}`);
  }
  return `{{ ${o.join(", ")} }}`;
};
const esc = (t) => t.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
const decode = (t) => t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");

export function html2jsx(html) {
  let out = "";
  const re = /<!--[\s\S]*?-->|<\/?([A-Za-z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|([^<]+)/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith("<!--")) continue;
    if (m[3] !== undefined) { const t = m[3]; out += /^\s+$/.test(t) ? "" : esc(t).replace(/&amp;/g, "&amp;"); continue; }
    const tag = m[1];
    if (m[0].startsWith("</")) { if (!VOID.has(tag)) out += `</${tag}>`; continue; }
    let attrs = "";
    const ar = /([^\s=/>]+)(?:=("[^"]*"|'[^']*'))?/g;
    let a;
    while ((a = ar.exec(m[2]))) {
      let n = a[1];
      let v = a[2] !== undefined ? decode(a[2].slice(1, -1)) : "";
      if (n === "/") continue;
      if (DROP(n)) continue;
      if (n === "style") { attrs += ` style=${styleObj(v)}`; continue; }
      if (BOOL.has(n)) { attrs += n === "checked" ? " defaultChecked" : ` ${RENAME[n] || n}`; continue; }
      if (n === "value") { attrs += ` defaultValue=${JSON.stringify(v)}`; continue; }
      const jn = RENAME[n] || (n.startsWith("data-") || n.startsWith("aria-") ? n : camel(n));
      attrs += v === "" && !(n === "alt" || n === "placeholder" || n === "title") ? ` ${jn}=""` : ` ${jn}=${JSON.stringify(v)}`;
    }
    const selfClose = m[0].endsWith("/>") || VOID.has(tag);
    out += `<${tag}${attrs}${selfClose ? " />" : ">"}`;
  }
  return out;
}

if (process.argv[1] && (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1:")}` || process.argv[1].endsWith("html2jsx.mjs"))) {
  const [file, key, idx] = process.argv.slice(2);
  if (file && key) {
    const o = JSON.parse(fs.readFileSync(`docs/survey/raw/${file}`, "utf8"));
    let h = o[key];
    if (Array.isArray(h)) h = h[Number(idx || 0)];
    process.stdout.write(html2jsx(h) + "\n");
  }
}
