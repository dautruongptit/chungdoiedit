import fs from "fs";
import { html2jsx } from "./html2jsx.mjs";

const html = fs.readFileSync("docs/survey/raw/minimalism_green_demo_outer.html", "utf8");

const dir = "web/src/features/invitation/shell/blocks/minimalism_green";

// 1. Paper.tsx
fs.writeFileSync(`${dir}/Paper.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return null;
}
`);

// 2. Hero.tsx (Header snippet)
const headerMatch = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/);
let headerInner = headerMatch ? headerMatch[0] : "";
let heroJsx = html2jsx(headerInner)
  .replace(/>Đăng Khoa</g, '>{ctx.n1}<')
  .replace(/>Mỹ Duyên</g, '>{ctx.n2}<')
  .replace(/src="https:\/\/assets\.chungdoi\.com\/photo-library\/design\/868ddb966956a9be3daceb4c5069c63402923a0db8fa90efda87fa0ddc8d417c\.webp"/g, 'src={ctx.d.groomPhoto || ctx.heroSrc}')
  .replace(/src="https:\/\/assets\.chungdoi\.com\/photo-library\/design\/f4d501ac194bc87673a0260b53672083714f26a6807acdd15a0819cc80df2c3f\.webp"/g, 'src={ctx.d.bridePhoto || ctx.heroSrc}')
  .replace(/style=\{\{\s*left:\s*"-335.5px",\s*top:\s*"-52px",\s*width:\s*"784px",\s*height:\s*"845px",\s*willChange:\s*"transform",\s*transform:\s*"translateY\([0-9.]+px\)"\s*\}\}/g, 'style={{ left: "-335.5px", top: "-52px", width: "784px", height: "845px", willChange: "transform", transform: "translateY(27.84px)" }}');

fs.writeFileSync(`${dir}/Hero.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${heroJsx}
  );
}
`);

// Sections matches
const sections = [...html.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)].map(m => m[0]);

// 3. Ceremony.tsx (Section [0])
let ceremonyJsx = html2jsx(sections[0] || "");
fs.writeFileSync(`${dir}/Ceremony.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Ceremony({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${ceremonyJsx}
  );
}
`);

// 4. Banquet.tsx (Section [1])
let banquetJsx = html2jsx(sections[1] || "");
fs.writeFileSync(`${dir}/Banquet.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Banquet({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${banquetJsx}
  );
}
`);

// 5. Venue.tsx (Section [2])
let venueJsx = html2jsx(sections[2] || "");
fs.writeFileSync(`${dir}/Venue.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${venueJsx}
  );
}
`);

// 6. Schedule.tsx (Section [3])
let scheduleJsx = html2jsx(sections[3] || "");
fs.writeFileSync(`${dir}/Schedule.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${scheduleJsx}
  );
}
`);

// 7. Guestbook.tsx (Section [4])
let guestbookJsx = html2jsx(sections[4] || "");
fs.writeFileSync(`${dir}/Guestbook.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${guestbookJsx}
  );
}
`);

// 8. Footer.tsx (Footer snippet)
const footerMatch = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/);
let footerJsx = html2jsx(footerMatch ? footerMatch[0] : "");
fs.writeFileSync(`${dir}/Footer.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${footerJsx}
  );
}
`);

// 9. Credit.tsx
fs.writeFileSync(`${dir}/Credit.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center pb-12 text-center text-xs opacity-60">
      <a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
        Tạo thiệp cưới online miễn phí tại chungdoi.com
      </a>
    </div>
  );
}
`);

// 10. Lightbox.tsx
fs.writeFileSync(`${dir}/Lightbox.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Lightbox({ ctx }: { ctx: InvitationCtx }) {
  if (!ctx.lightboxOpen) return null;
  return null;
}
`);

// 11. index.ts
fs.writeFileSync(`${dir}/index.ts`, `export { Paper } from "./Paper";
export { Hero } from "./Hero";
export { Ceremony } from "./Ceremony";
export { Banquet } from "./Banquet";
export { Venue } from "./Venue";
export { Schedule } from "./Schedule";
export { Guestbook } from "./Guestbook";
export { Footer } from "./Footer";
export { Credit } from "./Credit";
export { Lightbox } from "./Lightbox";
`);

console.log("Generated all blocks in", dir);
