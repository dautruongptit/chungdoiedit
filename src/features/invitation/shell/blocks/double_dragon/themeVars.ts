import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export interface DoubleDragonThemeVars {
  isGreen: boolean;
  isBlue: boolean;
  primaryVar: string;
  primaryRgb: string;
  paperVar: string;
  paperRgb: string;
  grayVar: string;
  grayRgb: string;
  accentBorder: string;
  boxImage: string;
  patternUrl: string;
  chuHyUrl: string;
  chuHyFilter?: string;
  heartColor: string;
  hintColor: string;
  fullNameFontSize: string;
  miniDecor: string[];
}

export function getDoubleDragonTheme(ctx: InvitationCtx): DoubleDragonThemeVars {
  const assets = ctx.t?.assets || "";
  const tplId = ctx.d?.templateId || "";
  const isGreen = assets.includes("green") || tplId.includes("green");
  const isBlue = assets.includes("blue") || tplId.includes("blue");

  if (isGreen) {
    return {
      isGreen: true,
      isBlue: false,
      primaryVar: "--color-z-green",
      primaryRgb: "rgb(31, 58, 37)",
      paperVar: "--color-z-linen2",
      paperRgb: "rgb(236, 232, 214)",
      grayVar: "--color-z-gray",
      grayRgb: "rgb(70, 70, 70)",
      accentBorder: "#2d5a2722",
      boxImage: "/images/giftbox/double_dragon_green.webp",
      patternUrl: "/images/double-dragon.webp",
      chuHyUrl: "/images/chu-hy.webp",
      chuHyFilter: "hue-rotate(90deg) saturate(0.6) brightness(1.1)",
      heartColor: "rgb(var(--color-z-green))",
      hintColor: "rgb(44, 36, 22)",
      fullNameFontSize: "29px",
      miniDecor: [
        "/images/giftbox/mini/boho_floral_green.webp",
        "/images/giftbox/mini/double_phoenix_green.webp",
        "/images/giftbox/mini/glass_garden_pink.webp",
        "/images/giftbox/mini/marble_yellow.webp",
        "/images/giftbox/mini/royal.webp",
        "/images/giftbox/mini/silk_ribbon_darkred.webp",
        "/images/giftbox/mini/spring_garden_red.webp",
      ],
    };
  }

  if (isBlue) {
    return {
      isGreen: false,
      isBlue: true,
      primaryVar: "--color-z-blue",
      primaryRgb: "rgb(37, 63, 120)",
      paperVar: "--color-z-white3",
      paperRgb: "rgb(232, 236, 214)",
      grayVar: "--color-z-gray",
      grayRgb: "rgb(70, 70, 70)",
      accentBorder: "#1e3a5f22",
      boxImage: "/images/giftbox/double_dragon_blue.webp",
      patternUrl: "/images/double-dragon.webp",
      chuHyUrl: "/images/chu-hy.webp",
      heartColor: "rgb(var(--color-z-blue))",
      hintColor: "rgb(74, 51, 51)",
      fullNameFontSize: "38px",
      miniDecor: [
        "/images/giftbox/mini/san_miguel_yellow.webp",
        "/images/giftbox/mini/royal_red.webp",
        "/images/giftbox/mini/applique_lace_white.webp",
        "/images/giftbox/mini/double_phoenix_green.webp",
        "/images/giftbox/mini/glass_garden_light_green.webp",
        "/images/giftbox/mini/hoa_dai_pink.webp",
        "/images/giftbox/mini/brocade_flower_red.webp",
      ],
    };
  }

  return {
    isGreen: false,
    isBlue: false,
    primaryVar: "--color-z-red",
    primaryRgb: "rgb(136, 41, 37)",
    paperVar: "--color-z-linen",
    paperRgb: "rgb(236, 223, 214)",
    grayVar: "--color-z-gray",
    grayRgb: "rgb(70, 70, 70)",
    accentBorder: "#a31d1622",
    boxImage: "/images/giftbox/double_dragon_red.webp",
    patternUrl: "/images/double-dragon.webp",
    chuHyUrl: "/images/chu-hy.webp",
    heartColor: "rgb(var(--color-z-red))",
    hintColor: "rgb(70, 70, 70)",
    fullNameFontSize: "35px",
    miniDecor: [
      "/images/giftbox/mini/royal_v2_purple.webp",
      "/images/giftbox/mini/chateau_green.webp",
      "/images/giftbox/mini/hoa_kho_v2_blue.webp",
      "/images/giftbox/mini/minimalism_darkblue.webp",
      "/images/giftbox/mini/riviera_blue.webp",
      "/images/giftbox/mini/hoa_tinh_red.webp",
      "/images/giftbox/mini/porcelain_v2_green.webp",
    ],
  };
}
