import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export interface BaroqueV2ThemeConfig {
  variant: "darkred" | "darkgreen" | "darkblue";
  bg: string;
  textColor: string;
  goldColor: string;
  borderColor: string;
  bgImage: string;
  frameImage: string;
  goldenLine: string;
  flower5: string;
  line2: string;
  line3: string;
  line4: string;
  flower3: string;
  flower4: string;
  envelope: string;
  envelopeBtnSize: { w: number; h: number };
  envelopeInnerSize: { w: number; h: number };
  envelopeShadow: { w: number; ml: number };
  envelopeSparkles: [number, number, number, number];
  modalBg: string;
  bottomDecorWidth: string;
  hero: {
    paddingClass: string;
    frameWrapperClass: string;
    frameAspect: string;
    photoStyle: React.CSSProperties;
    namesMarginClass: string;
    namesFont: string;
    namesSize: string;
  };
  ceremony: {
    goldenLineWidthClass: string;
    flower5Style: (isRight?: boolean) => React.CSSProperties;
    ptClass: string;
    namesFont: string;
    namesSize: string;
    ceremonyHeading: string;
  };
  banquet: {
    flower3LeftStyle: React.CSSProperties;
    flower3RightStyle: React.CSSProperties;
    flower4LeftStyle: React.CSSProperties;
    flower4RightStyle: React.CSSProperties;
  };
  schedule: {
    icons: {
      step1: { src: string; className: string };
      step2: { src: string; className: string };
      step3: { src: string; className: string };
    };
    bottomLineClass: string;
  };
}

export const THEME_DARKRED: BaroqueV2ThemeConfig = {
  variant: "darkred",
  bg: "rgb(43, 3, 3)",
  textColor: "rgb(255, 239, 214)",
  goldColor: "rgb(255, 223, 175)",
  borderColor: "#ffdfaf33",
  bgImage: "/images/themes/baroque-v2-dark-red/bg.webp",
  frameImage: "/images/themes/baroque-v2-dark-red/frame.webp",
  goldenLine: "/images/themes/baroque-v2-dark-red/golden-line-decoration.webp",
  flower5: "/images/themes/baroque-v2-dark-red/flower5-decoration.webp",
  line2: "/images/themes/baroque-v2-dark-red/line2-decoration.webp",
  line3: "/images/themes/baroque-v2-dark-red/line3-decoration.webp",
  line4: "/images/themes/baroque-v2-dark-red/line4-decoration.webp",
  flower3: "/images/themes/baroque-v2-dark-red/flower3-decoration.webp",
  flower4: "/images/themes/baroque-v2-dark-red/flower4-decoration.webp",
  envelope: "/images/envelope/baroque_v2_darkred.webp",
  envelopeBtnSize: { w: 210, h: 287 },
  envelopeInnerSize: { w: 150, h: 205 },
  envelopeShadow: { w: 99, ml: -49.5 },
  envelopeSparkles: [16.5, 12, 10.5, 10.5],
  modalBg: "rgb(43, 3, 3)",
  bottomDecorWidth: "w-[156.9%]",
  hero: {
    paddingClass: "pt-[47px] pb-[27px] md:pt-[58px] md:pb-[34px]",
    frameWrapperClass: "mt-[30px] w-[126.5%] max-w-none md:mt-[38px] md:w-[112%]",
    frameAspect: "1237 / 1254",
    photoStyle: {
      left: "25.8%",
      top: "11%",
      width: "47.6%",
      height: "76.5%",
      boxShadow: "rgba(0, 0, 0, 0.25) 2px 2px 4px",
    },
    namesMarginClass: "mt-[42px] md:mt-[52px]",
    namesFont: '"Viaoda Libre", "EB Garamond", ChungDoiIndic, serif',
    namesSize: "45px",
  },
  ceremony: {
    goldenLineWidthClass: "w-[74.5%] max-w-[309px] md:max-w-[420px]",
    flower5Style: (isRight) => ({
      left: isRight ? undefined : "-19%",
      right: isRight ? "-19%" : undefined,
      width: "32%",
      aspectRatio: "133 / 382",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
      transform: isRight ? "scaleX(-1)" : undefined,
      ["--orn-top" as string]: "30%",
      ["--orn-top-md" as string]: "7%",
    }),
    ptClass: "pt-[46px] md:pt-[56px]",
    namesFont: '"Cormorant Garamond", "EB Garamond", "Times New Roman", ChungDoiIndic, serif',
    namesSize: "39px",
    ceremonyHeading: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ\u00A0GIA",
  },
  banquet: {
    flower3LeftStyle: {
      left: "-13%",
      top: "-13px",
      width: "46.3%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
      transform: "scaleX(-1)",
    },
    flower3RightStyle: {
      right: "-13%",
      top: "-13px",
      width: "46.3%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
    },
    flower4LeftStyle: {
      left: "-9.5%",
      bottom: "9px",
      width: "40.7%",
      aspectRatio: "169 / 170",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
    },
    flower4RightStyle: {
      right: "-9.5%",
      bottom: "9px",
      width: "40.7%",
      aspectRatio: "169 / 170",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
      transform: "scaleX(-1)",
    },
  },
  schedule: {
    icons: {
      step1: {
        src: "/images/themes/baroque-v2-dark-red/camera.webp",
        className: "block h-[40px] w-[38px] shrink-0 object-contain",
      },
      step2: {
        src: "/images/themes/baroque-v2-dark-red/cake.webp",
        className: "block h-[44px] w-[31px] shrink-0 object-contain",
      },
      step3: {
        src: "/images/themes/baroque-v2-dark-red/cook.webp",
        className: "block h-[44px] w-[38px] shrink-0 object-contain",
      },
    },
    bottomLineClass: "w-[74.5%] max-w-[309px] md:max-w-[420px] mt-8 md:mt-10",
  },
};

export const THEME_DARKGREEN: BaroqueV2ThemeConfig = {
  variant: "darkgreen",
  bg: "rgb(10, 26, 11)",
  textColor: "rgb(255, 239, 214)",
  goldColor: "rgb(255, 223, 175)",
  borderColor: "#ffdfaf33",
  bgImage: "/images/themes/baroque-v2-dark-green/bg.webp",
  frameImage: "/images/themes/baroque-v2-dark-green/frame.webp",
  goldenLine: "/images/themes/baroque-v2-dark-green/golden-line-decoration.webp",
  flower5: "/images/themes/baroque-v2-dark-green/flower5-decoration.webp",
  line2: "/images/themes/baroque-v2-dark-green/line2-decoration.webp",
  line3: "/images/themes/baroque-v2-dark-green/line3-decoration.webp",
  line4: "/images/themes/baroque-v2-dark-green/line4-decoration.webp",
  flower3: "/images/themes/baroque-v2-dark-green/flower3-decoration.webp",
  flower4: "/images/themes/baroque-v2-dark-green/flower4-decoration.webp",
  envelope: "/images/envelope/baroque_v2_darkgreen.webp",
  envelopeBtnSize: { w: 250, h: 357 },
  envelopeInnerSize: { w: 190, h: 275 },
  envelopeShadow: { w: 125.4, ml: -62.7 },
  envelopeSparkles: [20.9, 15.2, 13.3, 13.3],
  modalBg: "rgb(10, 26, 11)",
  bottomDecorWidth: "w-[154.5%]",
  hero: {
    paddingClass: "pt-[47px] pb-[23px] md:pt-[58px] md:pb-[28px]",
    frameWrapperClass: "mt-[5px] w-[119.8%] max-w-none md:mt-[8px] md:w-[108%]",
    frameAspect: "497 / 626",
    photoStyle: {
      left: "24.54%",
      top: "13.26%",
      width: "50.91%",
      height: "72.04%",
      boxShadow: "rgba(0, 0, 0, 0.25) 2px 2px 4px",
    },
    namesMarginClass: "mt-[11px] md:mt-[16px]",
    namesFont: '"Viaoda Libre", "EB Garamond", ChungDoiIndic, serif',
    namesSize: "45px",
  },
  ceremony: {
    goldenLineWidthClass: "w-[76.1%] max-w-[360px] md:max-w-[430px]",
    flower5Style: (isRight) => ({
      left: isRight ? undefined : "-18.8%",
      right: isRight ? "-18.8%" : undefined,
      width: "30.4%",
      aspectRatio: "126 / 379",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
      transform: isRight ? "scaleX(-1)" : undefined,
      ["--orn-top" as string]: "25%",
      ["--orn-top-md" as string]: "7%",
    }),
    ptClass: "pt-[42px] md:pt-[52px]",
    namesFont: '"EB Garamond", "Times New Roman", ChungDoiIndic, serif',
    namesSize: "32px",
    ceremonyHeading: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ\u00A0GIA",
  },
  banquet: {
    flower3LeftStyle: {
      left: "-12.3%",
      top: "-12px",
      width: "46.3%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
      transform: "scaleX(-1)",
    },
    flower3RightStyle: {
      right: "-12.3%",
      top: "-12px",
      width: "46.3%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
    },
    flower4LeftStyle: {
      left: "-9.6%",
      bottom: "9px",
      width: "41.2%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
    },
    flower4RightStyle: {
      right: "-9.4%",
      bottom: "9px",
      width: "41.2%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
      transform: "scaleX(-1)",
    },
  },
  schedule: {
    icons: {
      step1: {
        src: "/images/themes/baroque-v2-dark-green/bride-broom.webp",
        className: "block h-[45px] w-[43px] shrink-0 object-contain",
      },
      step2: {
        src: "/images/themes/baroque-v2-dark-green/cake.webp",
        className: "block h-[46px] w-[46px] shrink-0 object-contain",
      },
      step3: {
        src: "/images/themes/baroque-v2-dark-green/alcohol.webp",
        className: "block h-[39px] w-[58px] shrink-0 object-contain",
      },
    },
    bottomLineClass: "w-[76.1%] max-w-[360px] md:max-w-[430px] mt-[10px] md:mt-4",
  },
};

export const THEME_DARKBLUE: BaroqueV2ThemeConfig = {
  variant: "darkblue",
  bg: "rgb(0, 26, 58)",
  textColor: "rgb(255, 239, 214)",
  goldColor: "rgb(255, 223, 175)",
  borderColor: "#ffdfaf33",
  bgImage: "/images/themes/baroque-v2-dark-blue/bg.webp",
  frameImage: "/images/themes/baroque-v2-dark-blue/frame.webp",
  goldenLine: "/images/themes/baroque-v2-dark-blue/golden-line-decoration.webp",
  flower5: "/images/themes/baroque-v2-dark-blue/flower5-decoration.webp",
  line2: "/images/themes/baroque-v2-dark-blue/line2-decoration.webp",
  line3: "/images/themes/baroque-v2-dark-blue/line3-decoration.webp",
  line4: "/images/themes/baroque-v2-dark-blue/line4-decoration.webp",
  flower3: "/images/themes/baroque-v2-dark-blue/flower3-decoration.webp",
  flower4: "/images/themes/baroque-v2-dark-blue/flower4-decoration.webp",
  envelope: "/images/envelope/baroque_v2_darkblue.webp",
  envelopeBtnSize: { w: 210, h: 287 },
  envelopeInnerSize: { w: 150, h: 205 },
  envelopeShadow: { w: 99, ml: -49.5 },
  envelopeSparkles: [16.5, 12, 10.5, 10.5],
  modalBg: "rgb(0, 26, 58)",
  bottomDecorWidth: "w-[167%]",
  hero: {
    paddingClass: "pt-[47px] pb-[45px] md:pt-[58px] md:pb-[54px]",
    frameWrapperClass: "mt-[20px] w-[130.8%] max-w-none md:mt-[24px] md:w-[118%]",
    frameAspect: "1 / 1",
    photoStyle: {
      left: "26.7%",
      top: "13.44%",
      width: "46.55%",
      height: "71.64%",
      borderRadius: "50% / 32.25%",
      boxShadow: "rgba(0, 0, 0, 0.25) 2px 2px 4px",
    },
    namesMarginClass: "mt-[39px] md:mt-[46px]",
    namesFont: '"Viaoda Libre", "EB Garamond", ChungDoiIndic, serif',
    namesSize: "45px",
  },
  ceremony: {
    goldenLineWidthClass: "w-[70.4%] max-w-[333px] md:max-w-[398px]",
    flower5Style: (isRight) => ({
      left: isRight ? undefined : "-18.2%",
      right: isRight ? "-18.2%" : undefined,
      width: "31.9%",
      aspectRatio: "132.44 / 339.52",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
      transform: isRight ? "scaleX(-1)" : undefined,
      ["--orn-top" as string]: "30.4%",
      ["--orn-top-md" as string]: "12%",
    }),
    ptClass: "pt-[42px] md:pt-[52px]",
    namesFont: '"EB Garamond", "Times New Roman", ChungDoiIndic, serif',
    namesSize: "29px",
    ceremonyHeading: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA NHÀ\u00A0TRAI",
  },
  banquet: {
    flower3LeftStyle: {
      left: "-13.5%",
      top: "-14px",
      width: "46.3%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
      transform: "scaleX(-1)",
    },
    flower3RightStyle: {
      right: "-12.3%",
      top: "-14px",
      width: "46.3%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
    },
    flower4LeftStyle: {
      left: "-10.4%",
      bottom: "12px",
      width: "41.2%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
    },
    flower4RightStyle: {
      right: "-10.4%",
      bottom: "12px",
      width: "41.2%",
      aspectRatio: "1 / 1",
      filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
      transform: "scaleX(-1)",
    },
  },
  schedule: {
    icons: {
      step1: {
        src: "/images/themes/baroque-v2-dark-blue/bird.webp",
        className: "block h-[46px] w-[49px] shrink-0 object-contain",
      },
      step2: {
        src: "/images/themes/baroque-v2-dark-blue/cake.webp",
        className: "block h-[47px] w-[50px] shrink-0 object-contain",
      },
      step3: {
        src: "/images/themes/baroque-v2-dark-blue/letter.webp",
        className: "block h-[44px] w-[40px] shrink-0 object-contain",
      },
    },
    bottomLineClass: "w-[70.4%] max-w-[333px] md:max-w-[398px] mt-[10px] md:mt-4",
  },
};

export function getBaroqueV2Theme(ctx: InvitationCtx): BaroqueV2ThemeConfig {
  const tid = ctx.d.templateId || "";
  if (tid.includes("green") || tid.includes("xanh")) return THEME_DARKGREEN;
  if (tid.includes("blue") || tid.includes("lam")) return THEME_DARKBLUE;
  return THEME_DARKRED;
}

export const str = (v: any, fallback = ""): string => {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && typeof v.vi === "string") return v.vi;
  return fallback;
};

