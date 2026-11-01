import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");
  const groomName = d?.groomShortName || ctx.gName || "Bảo Lâm";
  const brideName = d?.brideShortName || ctx.bName || "Thanh Trúc";

  return (
    <section className="relative isolate w-full mt-[30px] md:mt-[105px]">
      <header className={`relative z-20 flex w-full flex-col items-center px-4 sm:px-5 pt-[72px] md:pt-[100px] ${vars.hero.headerPadding}`}>
        <div className="relative w-[90%] max-w-[340px] md:max-w-[520px] lg:max-w-[580px]">
          <img
            alt=""
            aria-hidden="true"
            className="relative block w-full h-auto object-contain z-10"
            loading="eager"
            decoding="async"
            src={vars.flowerFrame}
          />
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center leading-none"
            style={{
              fontFamily: '"Viaoda Libre", "EB Garamond", ChungDoiIndic, cursive',
              color: vars.primaryColor,
              textTransform: "uppercase",
            }}
          >
            <div className="flex w-[48%] justify-center">
              <span
                className="whitespace-nowrap"
                style={{
                  fontSize: vars.hero.nameFontSize,
                  lineHeight: 1.25,
                  paddingTop: "0.16em",
                }}
              >
                {groomName}
              </span>
            </div>
            <span
              className="my-4 md:my-8 lg:my-10"
              style={{
                fontFamily: '"Alex Brush", "The Nautigal", ChungDoiIndic, cursive',
                fontSize: vars.hero.ampFontSize,
                textTransform: "none",
                lineHeight: 1,
                opacity: 0.95,
              }}
            >
              &amp;
            </span>
            <div className="flex w-[48%] justify-center">
              <span
                className="whitespace-nowrap"
                style={{
                  fontSize: vars.hero.nameFontSize,
                  lineHeight: 1.25,
                  paddingTop: "0.16em",
                }}
              >
                {brideName}
              </span>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}
