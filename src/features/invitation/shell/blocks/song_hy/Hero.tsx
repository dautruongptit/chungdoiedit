function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}
import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const vars = getSongHyTheme(ctx);
  const d = (ctx.d || {}) as any;
  const groomBirthOrder = typeof d.groomBirthOrder === "object" ? d.groomBirthOrder?.vi : d.groomBirthOrder || "Trưởng Nam";
  const brideBirthOrder = typeof d.brideBirthOrder === "object" ? d.brideBirthOrder?.vi : d.brideBirthOrder || "Út Nữ";
  const groomName = toStr(d.groomShortName) || (d.groomFullName || d.groomFull)?.replace(/^(Võ|Phan\s+Gia\s+|Phan\s+|Phan Văn\s+)/i, "").trim() || "Hải Nam";
  const brideName = toStr(d.brideShortName) || (d.brideFullName || d.brideFull)?.replace(/^(Huỳnh|Phạm\s+)/i, "").trim() || "Khánh Linh";
  const heroPhoto = d.heroPhoto || "";

  return (
    <header
      className="relative w-full overflow-hidden pb-[100px] md:pb-[130px]"
      style={{ backgroundColor: vars.paperColor }}
    >
      <div
        className="absolute left-1/2 top-0 aspect-square w-[min(671px,130vw)] -translate-x-1/2 -translate-y-1/2 pointer-events-none md:w-[min(872px,100%)]"
        aria-hidden="true"
      >
        <img
          alt=""
          className="w-full h-full"
          src="/images/themes/song-hy-red/sunburst.svg"
          style={vars.sunburstFilter ? { filter: vars.sunburstFilter } : undefined}
        />
      </div>

      <p
        className="relative z-10 whitespace-pre-line px-4 pt-10 text-center text-[11px] uppercase tracking-[0.35em] md:pt-[52px] md:text-[14px]"
        style={{
          color: vars.accentColor,
          fontFamily: '"Cormorant Garamond", "Times New Roman", ChungDoiIndic, serif',
          textShadow: vars.textShadow,
        }}
      >
        WELCOME TO OUR WEDDING
      </p>

      <div className="relative z-10 mx-auto mt-3 flex w-full max-w-[872px] items-center justify-center gap-4 px-4 md:mt-4 md:gap-5 md:px-10">
        <div className="flex-1 min-w-0 text-center">
          <p
            className="mb-1 text-[11px] md:text-[14px]"
            style={{
              color: vars.accentColor,
              fontFamily: '"Avenir Next", ChungDoiIndic, sans-serif',
              textShadow: vars.textShadow,
            }}
          >
            <span dir="auto">{groomBirthOrder}</span>
          </p>
          <p
            className="whitespace-nowrap uppercase text-[18px] md:text-[23px]"
            style={{
              color: vars.accentColor,
              fontFamily: '"Big Caslon", Baskerville, "Times New Roman", ChungDoiIndic, serif',
              textShadow: vars.textShadow,
            }}
          >
            <span dir="auto">{groomName}</span>
          </p>
        </div>

        <div className="flex w-[64px] shrink-0 items-center justify-center md:w-[83px]">
          <img
            alt=""
            className="h-[64px] w-[64px] object-contain md:h-[83px] md:w-[83px]"
            src="/images/themes/song-hy-red/chu-hy.webp"
            style={vars.chuHyFilter ? { filter: vars.chuHyFilter } : undefined}
          />
        </div>

        <div className="flex-1 min-w-0 text-center">
          <p
            className="mb-1 text-[11px] md:text-[14px]"
            style={{
              color: vars.accentColor,
              fontFamily: '"Avenir Next", ChungDoiIndic, sans-serif',
              textShadow: vars.textShadow,
            }}
          >
            <span dir="auto">{brideBirthOrder}</span>
          </p>
          <p
            className="whitespace-nowrap uppercase text-[18px] md:text-[23px]"
            style={{
              color: vars.accentColor,
              fontFamily: '"Big Caslon", Baskerville, "Times New Roman", ChungDoiIndic, serif',
              textShadow: vars.textShadow,
            }}
          >
            <span dir="auto">{brideName}</span>
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-2 flex justify-center px-6 md:mt-3">
        <div className="relative mx-auto w-full max-w-[286px] md:max-w-[372px]">
          <div className="relative w-full translate-y-[50px] md:translate-y-[73px]">
            <div className="relative w-full aspect-[286/481]">
              <div className="absolute inset-0 overflow-hidden rounded-t-full bg-[#d9d9d9]">
                <img
                  alt=""
                  className="h-full w-full object-cover"
                  src={heroPhoto}
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 aspect-[2/1] w-full overflow-visible">
                <div
                  className="pointer-events-none absolute inset-0 size-full -translate-y-5 md:-translate-y-[15px] lg:-translate-y-[20px]"
                  aria-label="LOVE NEVER FAILS"
                >
                  <svg
                    className="h-full w-full overflow-visible"
                    viewBox="0 0 286 143"
                    preserveAspectRatio="xMidYMax meet"
                    aria-hidden="true"
                  >
                    <defs>
                      <path
                        id="_r_1_"
                        d="M -5.319999999999993 143 A 148.32 148.32 0 0 1 291.32 143"
                        fill="none"
                      />
                    </defs>
                    <text
                      fill={vars.accentHex}
                      fontSize="14"
                      fontFamily='"Cormorant Garamond", "Times New Roman", ChungDoiIndic, serif'
                      letterSpacing="0.22em"
                      dominantBaseline="central"
                      style={{ color: "rgb(205, 205, 205)" }}
                    >
                      <textPath
                        href="#_r_1_"
                        startOffset="50%"
                        textAnchor="middle"
                        method="align"
                        spacing="auto"
                      >
                        LOVE NEVER FAILS
                      </textPath>
                    </text>
                    <image
                      href={vars.starUrl}
                      x="40.69049835205078"
                      y="24.198854446411133"
                      width="12"
                      height="12"
                      opacity="0.9"
                    />
                    <image
                      href={vars.starUrl}
                      x="233.3095703125"
                      y="24.198884963989258"
                      width="12"
                      height="12"
                      opacity="0.9"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
