import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export interface SongHyThemeVars {
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
  sunburstFilter?: string;
  starUrl: string;
  heartColor: string;
  hintColor: string;
  fullNameFontSize: string;
  miniDecor: string[];
  sparkleColor: string;
  confettiC2: string;
  confettiC7: string;
  modalPaperBg: string;
  thankYouNote: string;
  primaryColor: string;
  primaryHex: string;
  accentColor: string;
  accentHex: string;
  paperColor: string;
  paperHex: string;
  grayColor: string;
  borderSubtle: string;
  textShadow?: string;
  photoAspectRatios: string[];
}

export function getSongHyTheme(ctx: InvitationCtx): SongHyThemeVars {
  const assets = ctx.t?.assets || "";
  const tplId = ctx.d?.templateId || "";
  const isGreen = assets.includes("green") || tplId.includes("green");

  if (isGreen) {
    return {
      isGreen: true,
      isBlue: false,
      primaryVar: "--color-z-green",
      primaryRgb: "rgb(31, 58, 37)",
      paperVar: "--color-z-paper",
      paperRgb: "rgb(255, 247, 235)",
      grayVar: "--color-z-gray",
      grayRgb: "rgb(102, 102, 102)",
      accentBorder: "#1F3A2522",
      boxImage: "/images/giftbox/boxes/song_hy_green.webp",
      patternUrl: "",
      chuHyUrl: "/images/themes/song-hy-red/chu-hy.webp",
      chuHyFilter: "hue-rotate(100deg) saturate(0.7)",
      sunburstFilter: "hue-rotate(100deg) saturate(0.6) brightness(0.7)",
      starUrl: "/images/themes/song-hy-green/star.webp",
      heartColor: "rgb(31, 58, 37)",
      hintColor: "rgb(70, 70, 70)",
      fullNameFontSize: "33px",
      miniDecor: [
        "/images/giftbox/mini/qasr_gold.webp",
        "/images/giftbox/mini/minimalism_brown.webp",
        "/images/giftbox/mini/chateau_green.webp",
        "/images/giftbox/mini/hoa_tinh_red.webp",
        "/images/giftbox/mini/porcelain_v2_green.webp",
        "/images/giftbox/mini/dragon_phoenix_v4_red.webp",
        "/images/giftbox/mini/spring_garden_red.webp",
      ],
      sparkleColor: "rgb(124, 184, 130)",
      confettiC2: "rgb(124, 184, 130)",
      confettiC7: "rgb(31, 58, 37)",
      modalPaperBg: "rgb(220, 235, 222)",
      thankYouNote: "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
      primaryColor: "rgb(31, 58, 37)",
      primaryHex: "#1F3A25",
      accentColor: "rgb(232, 240, 228)",
      accentHex: "#e8f0e4",
      paperColor: "rgb(255, 247, 235)",
      paperHex: "#FFF7EB",
      grayColor: "rgb(102, 102, 102)",
      borderSubtle: "rgba(31, 58, 37, 0.1)",
      textShadow: "rgb(31, 58, 37) 0px 1px 4px",
      photoAspectRatios: [
        "0.664062 / 1",
        "0.664062 / 1",
        "0.664062 / 1",
        "0.664062 / 1",
        "0.664062 / 1",
        "0.664062 / 1",
      ],
    };
  }

  return {
    isGreen: false,
    isBlue: false,
    primaryVar: "--color-z-red",
    primaryRgb: "rgb(128, 0, 0)",
    paperVar: "--color-z-paper",
    paperRgb: "rgb(255, 247, 235)",
    grayVar: "--color-z-gray",
    grayRgb: "rgb(102, 102, 102)",
    accentBorder: "#80000022",
    boxImage: "/images/giftbox/boxes/song_hy_red.webp",
    patternUrl: "",
    chuHyUrl: "/images/themes/song-hy-red/chu-hy.webp",
    chuHyFilter: undefined,
    sunburstFilter: undefined,
    starUrl: "/images/themes/song-hy-red/star.webp",
    heartColor: "rgb(128, 0, 0)",
    hintColor: "rgb(70, 70, 70)",
    fullNameFontSize: "36px",
    miniDecor: [
      "/images/giftbox/mini/folk_floral_blue.webp",
      "/images/giftbox/mini/glass_garden_green.webp",
      "/images/giftbox/mini/double_phoenix_red.webp",
      "/images/giftbox/mini/cherry_blossom_pink.webp",
      "/images/giftbox/mini/crystal_floral_red.webp",
      "/images/giftbox/mini/hoa_kho_v2_blue.webp",
      "/images/giftbox/mini/jasmine_white.webp",
    ],
    sparkleColor: "rgb(251, 191, 36)",
    confettiC2: "rgb(251, 191, 36)",
    confettiC7: "rgb(128, 0, 0)",
    modalPaperBg: "rgb(236, 223, 214)",
    thankYouNote: "Gia đình xin chân thành cảm ơn quý khách đã đến chung vui.",
    primaryColor: "rgb(128, 0, 0)",
    primaryHex: "#800000",
    accentColor: "rgb(255, 238, 210)",
    accentHex: "#ffeed2",
    paperColor: "rgb(255, 247, 235)",
    paperHex: "#FFF7EB",
    grayColor: "rgb(102, 102, 102)",
    borderSubtle: "rgba(128, 0, 0, 0.1)",
    textShadow: undefined,
    photoAspectRatios: [
      "0.666992 / 1",
      "0.666992 / 1",
      "1 / 1",
      "0.666992 / 1",
      "0.666992 / 1",
      "0.666992 / 1",
      "0.666992 / 1",
    ],
  };
}
