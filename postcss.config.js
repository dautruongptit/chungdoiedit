// Tailwind v3 (tiện ích cho phần còn lại của app) + autoprefixer.
// Vùng `.inv-root` dùng CSS riêng Tailwind v4 + daisyUI v5 (scripts/build-invitation-css.mjs, giống trang gốc). Trong vùng này:
//  1) tiện ích Tailwind v3 KHÔNG được áp dụng (biến --tw-* của v3 sẽ đè v4, ví dụ vòng sáng `ring-2` mất);
//  2) các luật CSS cũ của app có tên lớp trùng với daisyUI (.btn, .input, .toggle, .card, .modal…) cũng không áp dụng.
// Cách làm: thêm `:not(:where(.inv-root *))` (độ ưu tiên 0) vào cuối selector, nên không đổi thứ tự thắng thua ngoài vùng.
import fs from "node:fs";

const EXCLUDE = ":not(:where(.inv-root *))";

// Tập tên lớp daisyUI/Tailwind v4 mà vùng .inv-root định nghĩa (đọc từ CSS đã sinh); rỗng nếu chưa build.
let daisy = null;
const daisyClasses = () => {
  if (daisy) return daisy;
  daisy = new Set();
  try {
    const css = fs.readFileSync("src/features/invitation/styles/invitation.generated.css", "utf8");
    for (const m of css.matchAll(/\.inv-root\s+\.([A-Za-z][\w-]*)/g)) daisy.add(m[1]);
  } catch { /* chưa có CSS sinh */ }
  return daisy;
};

const isV3 = (file) => /[\\/]tw\.css$/.test(file);
const isLegacy = (file) => /[\\/]src[\\/]styles[\\/](styles|pages)\.css$/.test(file);

const exclude = (s) => {
  if (s.includes(EXCLUDE)) return s;
  const i = s.indexOf("::");
  return i >= 0 ? s.slice(0, i) + EXCLUDE + s.slice(i) : s + EXCLUDE;
};

const excludeInvitation = () => ({
  postcssPlugin: "exclude-invitation-zone",
  Rule(rule) {
    const file = rule.source?.input?.file || "";
    const v3 = isV3(file), legacy = isLegacy(file);
    if (!v3 && !legacy) return;
    if (rule.__inv) return;
    if (rule.parent && rule.parent.type === "atrule" && /keyframes$/.test(rule.parent.name)) return;
    rule.__inv = true;
    if (v3) { rule.selectors = rule.selectors.map(exclude); return; }
    const set = daisyClasses();
    rule.selectors = rule.selectors.map((s) => {
      for (const m of s.matchAll(/\.([A-Za-z][\w-]*)/g)) if (set.has(m[1])) return exclude(s);
      return s;
    });
  },
});
excludeInvitation.postcss = true;

export default {
  plugins: [(await import("tailwindcss")).default({}), excludeInvitation(), (await import("autoprefixer")).default({})],
};
