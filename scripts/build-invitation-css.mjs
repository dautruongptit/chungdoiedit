// Biên dịch CSS riêng bằng Tailwind v4 + daisyUI v5 rồi cô lập trong một vùng (scope), giống trang gốc chungdoi.com.
//   - gỡ @layer (CSS app không nằm trong layer sẽ luôn thắng CSS trong layer),
//   - gắn tiền tố scope cho mọi selector, :root/html/body -> scope,
//   - với vùng có CSS cũ (editor): luật preflight dùng :where(scope) để độ ưu tiên 0, CSS cũ không bị đè.
// Dùng: node scripts/build-invitation-css.mjs [invitation|editor|all]   (npm run css:inv)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";
import prefixer from "postcss-prefix-selector";

const TARGETS = {
  invitation: { src: "src/features/invitation/styles/invitation.src.css", out: "src/features/invitation/styles/invitation.generated.css", scope: ".inv-root", legacyBase: true },
};

// Tailwind v4 nằm ở node_modules lồng nhau (dự án chính dùng v3); vị trí phụ thuộc cách npm gom gói nên dò theo phiên bản.
function findTailwind4() {
  const cands = [
    "node_modules/@tailwindcss/cli/node_modules/tailwindcss",
    "node_modules/@tailwindcss/node/node_modules/tailwindcss",
    "node_modules/@tailwindcss/postcss/node_modules/tailwindcss",
    "node_modules/tailwindcss",
  ];
  for (const c of cands) {
    try {
      const v = JSON.parse(fs.readFileSync(path.join(c, "package.json"), "utf8")).version;
      if (/^4\./.test(v) && fs.existsSync(path.join(c, "index.css"))) return c;
    } catch { /* thử vị trí tiếp theo */ }
  }
  throw new Error("Không thấy Tailwind v4 trong node_modules. Chạy: npm install");
}

const arg = process.argv[2] || "all";
const names = arg === "all" ? Object.keys(TARGETS) : [arg];

for (const name of names) {
  const t = TARGETS[name];
  if (!t || !fs.existsSync(t.src)) { if (arg !== "all") throw new Error("không có nguồn cho " + name); continue; }
  const tmp = `node_modules/.cache/${name}.tmp.css`;
  fs.mkdirSync(path.dirname(tmp), { recursive: true });
  // bản tạm của nguồn (cùng thư mục để @plugin / @source tương đối vẫn đúng) với đường dẫn Tailwind v4 đã dò
  const srcTmp = t.src.replace(/\.src\.css$/, ".resolved.tmp.css");
  const tw4 = path.relative(path.dirname(t.src), path.join(findTailwind4(), "index.css")).split(path.sep).join("/");
  fs.writeFileSync(srcTmp, fs.readFileSync(t.src, "utf8").replace('@import "tw4-index";', '@import "' + tw4 + '";'));
  try {
    execFileSync(process.execPath, ["node_modules/@tailwindcss/cli/dist/index.mjs", "-i", srcTmp, "-o", tmp], { stdio: "inherit" });
  } finally {
    fs.rmSync(srcTmp, { force: true });
  }

  // Đánh dấu luật thuộc @layer base (preflight) trước khi gỡ layer
  const unlayer = () => ({
    postcssPlugin: "unlayer",
    Once(root) {
      // gỡ lớp lồng nhau (daisyui.l1.l2 nằm trong @layer components...) cho tới khi hết
      for (let guard = 0; guard < 12; guard++) {
        let found = false;
        root.walkAtRules("layer", (at) => {
          found = true;
          if (at.nodes) {
            if (t.legacyBase && at.params.trim() === "base") at.walkRules((r) => { if (!r.parent || r.parent.type !== "atrule" || !/keyframes$/.test(r.parent.name)) r.__base = true; });
            at.replaceWith(at.nodes);
          } else at.remove();
        });
        if (!found) break;
      }
    },
  });
  unlayer.postcss = true;

  const scope = t.scope;
  const baseWrap = () => ({
    postcssPlugin: "base-where",
    Once(root) {
      if (!t.legacyBase) return;
      root.walkRules((r) => {
        if (!r.__base) return;
        r.selectors = r.selectors.map((s) => {
          const x = s.trim();
          if (x === ":where(:root)") return `:where(${scope})`;
          if (/^(:root|html|:host|body)(\b|$)/.test(x)) return `:where(${scope})` + x.replace(/^(:root|html|:host|body)/, "");
          if (x === "*" ) return `:where(${scope}), :where(${scope}) *`;
          if (/^(::before|::after|::backdrop|::file-selector-button)$/.test(x)) return `:where(${scope}) ${x}, :where(${scope}) *${x}`;
          return `:where(${scope}) ${x}`;
        });
      });
    },
  });
  baseWrap.postcss = true;

  const css = fs.readFileSync(tmp, "utf8");
  const out = await postcss([
    unlayer(),
    baseWrap(),
    prefixer({
      prefix: scope,
      transform(prefix, selector, prefixed) {
        const s = selector.trim();
        if (s.startsWith(scope) || s.startsWith(`:where(${scope})`)) return selector;
        if (/^(:root|html|:host|body)(\b|$)/.test(s)) return s.replace(/^(:root|html|:host|body)/, scope);
        if (s === ":where(:root)") return scope;
        if (s === "*") return `${scope}, ${scope} *`;
        if (s === "::before" || s === "::after" || s === "::backdrop" || s === "::file-selector-button") return `${scope} ${s}, ${scope} *${s}`;
        return prefixed;
      },
    }),
  ]).process(css, { from: undefined });

  fs.writeFileSync(t.out, "/* Tệp sinh tự động bởi scripts/build-invitation-css.mjs — không sửa tay */\n" + out.css);
  console.log("ok", t.out, (out.css.length / 1024).toFixed(1) + "KB");
}
