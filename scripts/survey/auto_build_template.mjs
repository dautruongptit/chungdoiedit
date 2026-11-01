import fs from "fs";
import { html2jsx } from "./html2jsx.mjs";

function resolveThemeAssetsFolder(id, slug, html) {
  if (html) {
    const m = html.match(/\/images\/themes\/([^"\/]+)/);
    if (m) return `/images/themes/${m[1]}`;
  }
  const dirs = fs.readdirSync("web/public/images/themes");
  const candidates = [
    slug,
    id.replace(/_/g, "-"),
    id,
    id.replace("cherry_blossom", "anhdao").replace(/_/g, "-"),
    id.replace("dried_flower", "hoa-kho").replace(/_/g, "-"),
    id.replace("dragon_phoenix", "longphung").replace(/_/g, "-"),
    id.replace("double_phoenix", "songphung").replace(/_/g, "-"),
    id.replace("co_ba", "coba").replace(/_/g, "-"),
    id.replace("darkbrown", "dark-brown").replace("darkblue", "dark-blue").replace("darkred", "dark-red").replace("light_green", "light-green")
  ];
  for (const c of candidates) {
    if (dirs.includes(c)) return `/images/themes/${c}`;
  }
  return `/images/themes/${id.replace(/_/g, "-")}`;
}

export function buildTemplate({ id, family, slug, htmlPath, dumpPath }) {
  console.log(`\n========================================`);
  console.log(`Building template: ${id} (${slug})`);
  console.log(`========================================`);

  const html = fs.readFileSync(htmlPath, "utf8");
  const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8"));

  // Find root container and its inner showcase-root div
  const containerMatch = html.match(/<div[^>]*data-testid="[^"]+"[^>]*>[\s\r\n]*<div[^>]*>/) ||
                         html.match(/<div[^>]*class="[^"]*st-card[^"]*"[^>]*>[\s\r\n]*<div[^>]*>/) ||
                         html.match(/<div[^>]*class="[^"]*flex w-full justify-center[^"]*"[^>]*>[\s\r\n]*<div[^>]*>/);

  if (!containerMatch) {
    throw new Error(`Cannot find container root in HTML for ${id}`);
  }

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

  console.log(`Extracted ${children.length} direct children for ${id}`);

  // Create block and spec directories
  const blockDir = `web/src/features/invitation/shell/blocks/${id}`;
  const specDir = `web/src/features/invitation/shell/specs/${id}`;
  fs.mkdirSync(blockDir, { recursive: true });
  fs.mkdirSync(specDir, { recursive: true });

  // Clean JSX helper
  function cleanJsx(str) {
    let jsx = html2jsx(str);
    // Replace unescaped quotes inside classNames
    jsx = jsx
      .replace(/className="([^"]*)\\"([^"]*)\\"([^"]*)"/g, 'className="$1&quot;$2&quot;$3"')
      .replace(/\\"Times New Roman\\"/g, '&quot;Times New Roman&quot;')
      .replace(/\\"The Nautigal\\"/g, '&quot;The Nautigal&quot;')
      .replace(/\\"Cormorant Garamond\\"/g, '&quot;Cormorant Garamond&quot;')
      .replace(/\\"Playfair Display\\"/g, '&quot;Playfair Display&quot;')
      .replace(/\\"Viaoda Libre\\"/g, '&quot;Viaoda Libre&quot;')
      .replace(/\\"Ms Madi\\"/g, '&quot;Ms Madi&quot;')
      .replace(/\\"EB Garamond\\"/g, '&quot;EB Garamond&quot;')
      .replace(/\\"Beau Rivage\\"/g, '&quot;Beau Rivage&quot;')
      .replace(/allowfullscreen=""/g, 'allowFullScreen={true}')
      .replace(/referrerpolicy=/g, 'referrerPolicy=')
      .replace(/maxLength="([0-9]+)"/g, 'maxLength={$1}')
      .replace(/rows="([0-9]+)"/g, 'rows={$1}');
    return jsx;
  }

  // Find style tags
  const styleChildren = children.filter(c => c.startsWith("<style"));
  const nonStyleChildren = children.filter(c => !c.startsWith("<style"));

  let styleSnippet = "";
  if (styleChildren.length > 0) {
    styleSnippet = styleChildren.map(s => s.replace(/<style[^>]*>|<\/style>/g, "")).join("\n");
  }

  // Classify blocks by content/tags
  const blocks = [];
  const blockExports = [];

  // [0] Paper
  if (nonStyleChildren.length > 0 && nonStyleChildren[0].startsWith("<div") && nonStyleChildren[0].length < 1500) {
    const paperJsx = cleanJsx(nonStyleChildren[0]);
    fs.writeFileSync(`${blockDir}/Paper.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      ${styleSnippet ? `<style>{\`${styleSnippet}\`}</style>` : ""}
      ${paperJsx}
    </>
  );
}
`);
    blocks.push("Paper");
    blockExports.push(`export { Paper } from "./Paper";`);
  } else {
    // Empty Paper if none
    fs.writeFileSync(`${blockDir}/Paper.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return ${styleSnippet ? `<style>{\`${styleSnippet}\`}</style>` : "null"};
}
`);
    blocks.push("Paper");
    blockExports.push(`export { Paper } from "./Paper";`);
  }

  // Now process the rest of the non-style children
  let childIdx = nonStyleChildren[0].startsWith("<div") && nonStyleChildren[0].length < 1500 ? 1 : 0;
  let sectionCounter = 1;

  for (; childIdx < nonStyleChildren.length; childIdx++) {
    const rawChild = nonStyleChildren[childIdx];
    const preview = rawChild.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const up = preview.toUpperCase();
    let bName = `Section${sectionCounter++}`;

    if (rawChild.startsWith("<header")) {
      bName = "Hero";
    } else if ((up.includes("THÔNG TIN LỄ") || up.includes("THÔNG TIN HÔN LỄ")) && preview.length < 50) {
      bName = "CeremonyBanner";
    } else if (up.includes("LỄ THÀNH HÔN") || up.includes("LỄ VU QUY") || up.includes("THÔNG TIN LỄ") || up.includes("TRÂN TRỌNG BÁO TIN") || up.includes("HÔN LỄ SẼ ĐƯỢC TỔ CHỨC")) {
      bName = "Ceremony";
    } else if (up.includes("ALBUM") || rawChild.includes("Wedding photo") || (rawChild.includes("photo-library") && up.includes("ALBUM"))) {
      bName = "Album";
    } else if ((up.includes("THÔNG TIN TIỆC") || up.includes("TIỆC CƯỚI")) && preview.length < 50) {
      bName = "BanquetBanner";
    } else if (up.includes("TIỆC CƯỚI SẼ DIỄN RA") || up.includes("THÔNG TIN TIỆC") || (up.includes("KHAI TIỆC") && (up.includes("XÁC NHẬN") || up.includes("THAM DỰ")))) {
      bName = "Banquet";
    } else if (up.includes("TIỆC CƯỚI SẼ TỔ CHỨC") || rawChild.includes("data-landing-screenshot-id=\"invite-map\"") || up.includes("TẠI TRUNG TÂM") || up.includes("TẠI TƯ GIA")) {
      bName = "Venue";
    } else if (up.includes("DRESS CODE") || up.includes("TRANG PHỤC")) {
      bName = "Dress";
    } else if (up.includes("LỊCH TRÌNH") || up.includes("ĐÓN KHÁCH") || up.includes("KHAI TIỆC")) {
      bName = "Schedule";
    } else if (up.includes("SỔ LƯU BÚT") || up.includes("GỬI LỜI CHÚC")) {
      bName = "Guestbook";
    } else if (up.includes("HỘP QUÀ MỪNG") || up.includes("NHẤN ĐỂ MỞ") || rawChild.includes("envelope/")) {
      bName = "Gifts";
    } else if (rawChild.startsWith("<footer") || up.includes("SỰ HIỆN DIỆN CỦA QUÝ KHÁCH") || up.includes("RẤT HÂN HẠNH ĐƯỢC ĐÓN TIẾP")) {
      bName = "Footer";
    } else if (preview.includes("chungdoi.com") && preview.length < 50) {
      bName = "Credit";
    } else if (rawChild.startsWith("<dialog")) {
      bName = "Lightbox";
    }

    // Ensure unique block name
    let finalName = bName;
    let dupCounter = 2;
    while (blocks.includes(finalName)) {
      finalName = `${bName}${dupCounter++}`;
    }

    // Dynamic replacements for Hero
    let childJsx = cleanJsx(rawChild);
    if (finalName === "Hero") {
      // Dynamic photos
      childJsx = childJsx
        .replace(/src="https:\/\/assets\.chungdoi\.com\/photo-library\/design\/[^"]+"/g, () => `src={groomPhoto}`);
      // Replace names if matched
      childJsx = childJsx
        .replace(/>([^<]+)<\/p>[\s\r\n]*<span[^>]*>&amp;<\/span>[\s\r\n]*<p[^>]*>([^<]+)<\/p>/g, (m, g1, g2) => {
          return m.replace(`>${g1}<`, `>{ctx.n1}<`).replace(`>${g2}<`, `>{ctx.n2}<`);
        });

      fs.writeFileSync(`${blockDir}/${finalName}.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function ${finalName}({ ctx }: { ctx: InvitationCtx }) {
  const anyD = ctx.d as any;
  const groomPhoto = anyD.groomPhoto || ctx.d.photos?.[0] || ctx.heroSrc;
  const bridePhoto = anyD.bridePhoto || ctx.d.photos?.[1] || ctx.heroSrc;

  return (
    ${childJsx}
  );
}
`);
    } else {
      fs.writeFileSync(`${blockDir}/${finalName}.tsx`, `import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function ${finalName}({ ctx }: { ctx: InvitationCtx }) {
  return (
    ${childJsx}
  );
}
`);
    }

    blocks.push(finalName);
    blockExports.push(`export { ${finalName} } from "./${finalName}";`);
  }

  // Write index.ts for blocks
  fs.writeFileSync(`${blockDir}/index.ts`, blockExports.join("\n") + "\n");

  // Generate Theme.json
  const tplThemes = {
    minimalism_green: { bg: "#f7f5ee", ink: "#203a2c", rgb: "32, 58, 44" },
    minimalism_darkbrown: { bg: "#f7f5ee", ink: "#593D2C", rgb: "89, 61, 44" },
    minimalism_darkblue: { bg: "#f7f5ee", ink: "#00224c", rgb: "0, 34, 76" },
    minimalism_red: { bg: "#FFFAF7", ink: "#7C151A", rgb: "124, 21, 26" }
  };
  const th = tplThemes[id] || { bg: "#ffffff", ink: "#000000", rgb: "0, 0, 0" };
  const assetPath = resolveThemeAssetsFolder(id, slug, html);

  const themeJson = {
    assets: assetPath,
    colors: {
      ink: `rgb(${th.rgb})`,
      inkRgb: th.rgb,
      sub: `rgba(${th.rgb}, 0.6)`,
      muted: `rgb(${th.rgb})`,
      paper: th.bg,
      line: `rgba(${th.rgb}, 0.2)`,
      accent: th.bg,
      edge: `rgba(${th.rgb}, 0.1)`
    }
  };
  fs.writeFileSync(`${specDir}/theme.json`, JSON.stringify(themeJson, null, 2));

  // Generate Capabilities.json
  const capsJson = {
    id,
    family,
    testId: `${id.replace(/_/g, "-")}-template`,
    blocks,
    cover: {
      seal: "heart",
      ambient: "fall",
      particle: "petal",
      skin: "card"
    },
    gift: { widget: "envelope" },
    hero: { kind: "photo", introLine: true, shape: "portrait" },
    album: { indicator: "counter", defaultLayout: "3d" },
    countdown: false,
    layout: { contentMaxMd: 900, behaviorMd: "padded", parallaxDecor: false },
    editor: {
      albumCardAfter: blocks.includes("Ceremony") ? "ceremony" : "hero",
      cards: { hero: true, coupleHero: false, introLine: true }
    }
  };
  fs.writeFileSync(`${specDir}/capabilities.json`, JSON.stringify(capsJson, null, 2));

  // Generate Demo.json
  const photoMatches = [...html.matchAll(/src="(https:\/\/assets\.chungdoi\.com\/photo-library\/design\/[^"]+)"/g)].map(m => m[1]);
  const photos = [...new Set(photoMatches)];

  const demoData = {
    _note: `Dữ liệu demo của ${id} đo từ chungdoi.com`,
    order: "groom",
    heroOn: true,
    albumOn: true,
    photos: photos.length > 2 ? photos.slice(2) : photos,
    groomPhoto: photos[0] || "",
    bridePhoto: photos[1] || "",
    familyOn: true,
    announceOn: true,
    partyOn: true,
    wishes: [
      {
        name: "Minh Tuấn",
        msg: "Chúc mừng hạnh phúc hai bạn! Trăm năm gắn kết!",
        at: "18:31:14 9/7/2026"
      }
    ],
    gifts: []
  };
  fs.writeFileSync(`${specDir}/demo.json`, JSON.stringify(demoData, null, 2));

  console.log(`Generated all files for ${id}: ${blocks.length} blocks (${blocks.join(", ")})`);
  return { id, family, blocks };
}
