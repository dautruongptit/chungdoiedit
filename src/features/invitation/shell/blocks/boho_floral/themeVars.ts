import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export interface BohoFloralThemeVars {
  isGreen: boolean;
  isPink: boolean;
  isBrown: boolean;
  primaryColor: string;
  primaryHex: string;
  primaryRgb: string;
  paperColor: string;
  paperHex: string;
  subColor: string;
  accentBorder: string;
  boxImage: string;
  heroBorderColorGroom: string;
  heroBorderColorBride: string;
  dresscodeColors: string[];
  dresscodeBorder: string;
  miniDecor: string[];
  sparkleColor: string;
  confettiC2: string;
  confettiC7: string;
  modalPaperBg: string;
  photoAspectRatios: string[];
  objectPositions: string[];
  googleMapsUrl: string;
  directionsUrl: string;
  calendarHeartFill: string;
  isDotsAlbum: boolean;
}

export function getBohoFloralTheme(ctx: InvitationCtx): BohoFloralThemeVars {
  const assets = ctx.t?.assets || "";
  const tplId = ctx.d?.templateId || "";
  const isPink = assets.includes("pink") || tplId.includes("pink");
  const isBrown = assets.includes("brown") || tplId.includes("brown");
  const isGreen = !isPink && !isBrown;

  if (isPink) {
    return {
      isGreen: false,
      isPink: true,
      isBrown: false,
      primaryColor: "rgb(157, 109, 99)",
      primaryHex: "#9D6D63",
      primaryRgb: "rgb(157, 109, 99)",
      paperColor: "rgb(255, 250, 247)",
      paperHex: "#FFFAF7",
      subColor: "rgb(70, 70, 70)",
      accentBorder: "rgba(157, 109, 99, 0.25)",
      boxImage: "/images/giftbox/boho_floral_pink.webp",
      heroBorderColorGroom: "rgb(245, 198, 201)",
      heroBorderColorBride: "rgb(186, 180, 199)",
      dresscodeColors: ["rgb(101, 18, 18)", "rgb(141, 58, 58)", "rgb(255, 178, 178)"],
      dresscodeBorder: "1.5px solid rgba(157, 109, 99, 0.2)",
      miniDecor: [
        "/images/giftbox/mini/baroque_blue.webp",
        "/images/giftbox/mini/crystal_floral_green.webp",
        "/images/giftbox/mini/mahal_gold.webp",
        "/images/giftbox/mini/hoa_kho_v2_blue.webp",
        "/images/giftbox/mini/riviera_blue.webp",
        "/images/giftbox/mini/hoa_tinh_red.webp",
        "/images/giftbox/mini/dragon_phoenix_v4_red.webp",
      ],
      sparkleColor: "rgb(157, 109, 99)",
      confettiC2: "rgb(157, 109, 99)",
      confettiC7: "rgb(157, 109, 99)",
      modalPaperBg: "rgb(255, 250, 247)",
      photoAspectRatios: ["1.2 / 1", "1.2 / 1", "0.667028 / 1"],
      objectPositions: ["50% 50%", "50% 50%", "50% 50%"],
      googleMapsUrl:
        "https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=Queen%20Plaza%20K%E1%BB%B3%20H%C3%B2a%2C%2016A%20L%C3%AA%20H%E1%BB%93ng%20Phong%2C%20Ph%C6%B0%E1%BB%9Dng%2012%2C%20Qu%E1%BA%ADn%2010%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Queen%20Plaza%20K%E1%BB%B3%20H%C3%B2a%2C%2016A%20L%C3%AA%20H%E1%BB%93ng%20Phong%2C%20Ph%C6%B0%E1%BB%9Dng%2012%2C%20Qu%E1%BA%ADn%2010%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh",
      calendarHeartFill: "#9D6D63",
      isDotsAlbum: true,
    };
  }

  if (isBrown) {
    return {
      isGreen: false,
      isPink: false,
      isBrown: true,
      primaryColor: "rgb(74, 40, 22)",
      primaryHex: "#4A2816",
      primaryRgb: "rgb(74, 40, 22)",
      paperColor: "rgb(255, 250, 247)",
      paperHex: "#FFFAF7",
      subColor: "rgb(70, 70, 70)",
      accentBorder: "rgba(74, 40, 22, 0.25)",
      boxImage: "/images/giftbox/boho_floral_brown.webp",
      heroBorderColorGroom: "rgb(132, 103, 88)",
      heroBorderColorBride: "rgb(132, 103, 88)",
      dresscodeColors: ["rgb(67, 43, 20)", "rgb(107, 83, 60)", "rgb(227, 203, 180)"],
      dresscodeBorder: "1.5px solid rgba(74, 40, 22, 0.2)",
      miniDecor: [
        "/images/giftbox/mini/marble_yellow.webp",
        "/images/giftbox/mini/spring_garden_red.webp",
        "/images/giftbox/mini/glass_garden_blue.webp",
        "/images/giftbox/mini/baroque_v2_darkblue.webp",
        "/images/giftbox/mini/crystal_floral_red.webp",
        "/images/giftbox/mini/qasr_blue.webp",
        "/images/giftbox/mini/royal_red.webp",
      ],
      sparkleColor: "rgb(74, 40, 22)",
      confettiC2: "rgb(74, 40, 22)",
      confettiC7: "rgb(74, 40, 22)",
      modalPaperBg: "rgb(255, 250, 247)",
      photoAspectRatios: [
        "0.616343 / 1",
        "0.624654 / 1",
        "0.65928 / 1",
        "0.667083 / 1",
        "0.666667 / 1",
        "0.669437 / 1",
        "0.64375 / 1",
        "0.63125 / 1",
      ],
      objectPositions: [
        "50% 50%",
        "50% 50%",
        "50% 29.4038%",
        "50% 50%",
        "50% 67.1745%",
        "50% 9.77654%",
        "50% 0%",
        "50% 0%",
      ],
      googleMapsUrl:
        "https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=White%20Palace%20Convention%20Center%2C%20194%20Ho%C3%A0ng%20V%C4%83n%20Th%E1%BB%A5%2C%20Ph%C3%BA%20Nhu%E1%BA%ADn%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=White%20Palace%20Convention%20Center%2C%20194%20Ho%C3%A0ng%20V%C4%83n%20Th%E1%BB%A5%2C%20Ph%C3%BA%20Nhu%E1%BA%ADn%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh",
      calendarHeartFill: "#4A2816",
      isDotsAlbum: false,
    };
  }

  // Green
  return {
    isGreen: true,
    isPink: false,
    isBrown: false,
    primaryColor: "rgb(48, 83, 15)",
    primaryHex: "#30530F",
    primaryRgb: "rgb(48, 83, 15)",
    paperColor: "rgb(255, 250, 247)",
    paperHex: "#FFFAF7",
    subColor: "rgb(70, 70, 70)",
    accentBorder: "rgba(48, 83, 15, 0.25)",
    boxImage: "/images/giftbox/boho_floral_green.webp",
    heroBorderColorGroom: "rgb(178, 142, 114)",
    heroBorderColorBride: "rgb(178, 142, 114)",
    dresscodeColors: ["rgb(34, 67, 39)", "rgb(74, 107, 79)", "rgb(194, 227, 199)"],
    dresscodeBorder: "1.5px solid rgba(48, 83, 15, 0.19)",
    miniDecor: [
      "/images/giftbox/mini/cherry_blossom_pink.webp",
      "/images/giftbox/mini/double_dragon_blue.webp",
      "/images/giftbox/mini/nhat_binh_red.webp",
      "/images/giftbox/mini/double_phoenix_green.webp",
      "/images/giftbox/mini/royal_red.webp",
      "/images/giftbox/mini/song_hy_red.webp",
      "/images/giftbox/mini/san_miguel_yellow.webp",
    ],
    sparkleColor: "rgb(48, 83, 15)",
    confettiC2: "rgb(48, 83, 15)",
    confettiC7: "rgb(48, 83, 15)",
    modalPaperBg: "rgb(255, 250, 247)",
    photoAspectRatios: [
      "1.2 / 1",
      "0.666118 / 1",
      "0.666118 / 1",
      "0.666118 / 1",
      "0.666118 / 1",
      "0.666118 / 1",
      "0.666118 / 1",
      "0.666118 / 1",
    ],
    objectPositions: [
      "50% 50%",
      "50% 21.1823%",
      "50% 50%",
      "50% 50%",
      "50% 100%",
      "50% 50.7389%",
      "50% 50%",
      "50% 0%",
    ],
    googleMapsUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=Ti%E1%BB%87c%20C%C6%B0%E1%BB%9Bi%20Ho%C3%A0ng%20Gia%2C%20Ng%C3%B5%2074%20P.%20Nguy%E1%BB%85n%20Th%E1%BB%8B%20%C4%90%E1%BB%8Bnh%2C%20Nh%C3%A2n%20Ch%C3%ADnh%2C%20Thanh%20Xu%C3%A2n%2C%20H%C3%A0%20N%E1%BB%99i",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Ti%E1%BB%87c%20C%C6%B0%E1%BB%9Bi%20Ho%C3%A0ng%20Gia%2C%20Ng%C3%B5%2074%20P.%20Nguy%E1%BB%85n%20Th%E1%BB%8B%20%C4%90%E1%BB%8Bnh%2C%20Nh%C3%A2n%20Ch%C3%ADnh%2C%20Thanh%20Xu%C3%A2n%2C%20H%C3%A0%20N%E1%BB%99i",
    calendarHeartFill: "#30530F",
    isDotsAlbum: false,
  };
}
