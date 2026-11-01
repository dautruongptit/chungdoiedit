import fs from "fs";
import { html2jsx } from "./html2jsx.mjs";

const html = fs.readFileSync("docs/survey/raw/minimalism_green_full_scrolled.html", "utf8");

// Extract direct children of container
const containerMatch = html.match(/<div[^>]*data-testid="minimalism-green-template"[^>]*>[\s\r\n]*<div[^>]*>/);
const containerStart = containerMatch.index + containerMatch[0].length;
let depth = 1;
let cursor = containerStart;
const children = [];
let childStart = cursor;
let tagMatch;
const tagRe = /<\/?([a-zA-Z0-9-]+)(\s+[^>]*)?>/g;
tagRe.lastIndex = cursor;

while ((tagMatch = tagRe.exec(html)) !== null) {
  const fullTag = tagMatch[0];
  const tagName = tagMatch[1].toLowerCase();
  const isClosing = fullTag.startsWith("</");
  const isSelfClosing = fullTag.endsWith("/>") || ["img", "input", "br", "hr"].includes(tagName);

  if (depth === 1 && !isClosing) childStart = tagMatch.index;

  if (!isClosing && !isSelfClosing) depth++;
  else if (isClosing) {
    depth--;
    if (depth === 1) {
      children.push(html.slice(childStart, tagMatch.index + fullTag.length));
    } else if (depth === 0) break;
  }
}

console.log("Extracted raw children count:", children.length);

const dir = "web/src/features/invitation/shell/blocks/minimalism_green";

// [0] Style
const styleContent = children[0].replace(/<style[^>]*>|<\/style>/g, "");

// [1] Paper
const paperJsx = html2jsx(children[1]);
fs.writeFileSync(`${dir}/Paper.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      <style>{\`${styleContent}\`}</style>
      ${paperJsx}
    </>
  );
}
`);

// [2] Hero
const heroJsx = html2jsx(children[2])
  .replace(/>Đăng Khoa</g, '>{ctx.n1}<')
  .replace(/>Mỹ Duyên</g, '>{ctx.n2}<')
  .replace(/src="https:\/\/assets\.chungdoi\.com\/photo-library\/design\/868ddb966956a9be3daceb4c5069c63402923a0db8fa90efda87fa0ddc8d417c\.webp"/g, 'src={ctx.d.groomPhoto || ctx.heroSrc}')
  .replace(/src="https:\/\/assets\.chungdoi\.com\/photo-library\/design\/f4d501ac194bc87673a0260b53672083714f26a6807acdd15a0819cc80df2c3f\.webp"/g, 'src={ctx.d.bridePhoto || ctx.heroSrc}');

fs.writeFileSync(`${dir}/Hero.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${heroJsx}
  );
}
`);

// [3] Ceremony
const ceremonyJsx = html2jsx(children[3]);
fs.writeFileSync(`${dir}/Ceremony.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Ceremony({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${ceremonyJsx}
  );
}
`);

// [4] Album
const albumJsx = html2jsx(children[4]);
fs.writeFileSync(`${dir}/Album.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Album({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${albumJsx}
  );
}
`);

// [5] Banquet
const banquetJsx = html2jsx(children[5]);
fs.writeFileSync(`${dir}/Banquet.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Banquet({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${banquetJsx}
  );
}
`);

// [6] Venue
const venueJsx = html2jsx(children[6]);
fs.writeFileSync(`${dir}/Venue.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${venueJsx}
  );
}
`);

// [7] Dress
const dressJsx = html2jsx(children[7]);
fs.writeFileSync(`${dir}/Dress.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${dressJsx}
  );
}
`);

// [8] Schedule
const scheduleJsx = html2jsx(children[8]);
fs.writeFileSync(`${dir}/Schedule.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${scheduleJsx}
  );
}
`);

// [9] Guestbook
const guestbookJsx = html2jsx(children[9]);
fs.writeFileSync(`${dir}/Guestbook.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${guestbookJsx}
  );
}
`);

// [10] Gifts
const giftsJsx = html2jsx(children[10]);
fs.writeFileSync(`${dir}/Gifts.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${giftsJsx}
  );
}
`);

// [11] Footer
const footerJsx = html2jsx(children[11]);
fs.writeFileSync(`${dir}/Footer.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${footerJsx}
  );
}
`);

// [12] Credit
const creditJsx = html2jsx(children[12]);
fs.writeFileSync(`${dir}/Credit.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${creditJsx}
  );
}
`);

// [13] Lightbox
const lightboxJsx = html2jsx(children[13] || "");
fs.writeFileSync(`${dir}/Lightbox.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Lightbox({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${lightboxJsx}
  );
}
`);

// index.ts
fs.writeFileSync(`${dir}/index.ts`, `export { Paper } from "./Paper";
export { Hero } from "./Hero";
export { Ceremony } from "./Ceremony";
export { Album } from "./Album";
export { Banquet } from "./Banquet";
export { Venue } from "./Venue";
export { Dress } from "./Dress";
export { Schedule } from "./Schedule";
export { Guestbook } from "./Guestbook";
export { Gifts } from "./Gifts";
export { Footer } from "./Footer";
export { Credit } from "./Credit";
export { Lightbox } from "./Lightbox";
`);

// Update capabilities.json
const caps = JSON.parse(fs.readFileSync("web/src/features/invitation/shell/specs/minimalism_green/capabilities.json", "utf8"));
caps.blocks = [
  "Paper",
  "Hero",
  "Ceremony",
  "Album",
  "Banquet",
  "Venue",
  "Dress",
  "Schedule",
  "Guestbook",
  "Gifts",
  "Footer",
  "Credit",
  "Lightbox"
];
fs.writeFileSync("web/src/features/invitation/shell/specs/minimalism_green/capabilities.json", JSON.stringify(caps, null, 2));

console.log("Successfully generated all 14 blocks for minimalism_green!");
