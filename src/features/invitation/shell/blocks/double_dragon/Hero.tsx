import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);
  const d = ctx.d as any;

  const groomName = d.groomNick || d.groomShortName || d.groomName || "Hoàng Nam";
  const brideName = d.brideNick || d.brideShortName || d.brideName || "Thanh Tú";
  const groomBirthOrder = theme.isGreen
    ? "Trưởng Nam / 신랑"
    : (d.groomBirthOrder || "Trưởng Nam");
  const brideBirthOrder = theme.isGreen
    ? "Thứ Nữ / 신부"
    : (d.brideBirthOrder || "Út Nữ");
  const groomAvatar =
    d.groomAvatar ||
    "https://assets.chungdoi.com/photo-library/design/1c007ef450670061d3966b1170d56e01184172e198536c7ae796532bde3ea5ca.webp";
  const brideAvatar =
    d.brideAvatar ||
    "https://assets.chungdoi.com/photo-library/design/86a1d64f9b6609c7184ea139acbd21c109ddd103d8d1d647480b7b68ac716e58.webp";

  return (
    <div
      className="relative w-full py-6 sm:py-8 md:py-10 px-2 overflow-hidden"
      style={{ backgroundColor: `rgb(var(${theme.paperVar}))` }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url("${theme.patternUrl}")`,
          backgroundSize: "clamp(300px, 50vw, 500px) auto",
          backgroundPositionY: "50%",
          mixBlendMode: "color-dodge",
        }}
      />
      <div
        className="absolute left-0 right-0 h-[40px] sm:h-[50px] md:h-[70px] top-[66px] sm:top-[88px] md:top-[125px] z-10"
        style={{ backgroundColor: `rgb(var(${theme.primaryVar}))` }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("${theme.patternUrl}")`,
            backgroundSize: "clamp(300px, 50vw, 500px) auto",
            backgroundPositionY: "30%",
          }}
        />
        <img
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] sm:w-[70px] sm:h-[70px] md:w-[96px] md:h-[96px]"
          src={theme.chuHyUrl}
          style={theme.chuHyFilter ? { filter: theme.chuHyFilter } : undefined}
        />
      </div>
      <div className="relative z-20 flex items-start justify-center gap-2 sm:gap-4 pointer-events-none">
        <div className="flex flex-col items-center flex-1 min-w-0 pointer-events-auto" data-avatar-column="true">
          <img
            className="rounded-full w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[240px] md:h-[240px] object-cover"
            alt={groomName}
            src={groomAvatar}
          />
          <div
            className="font-light font-body-sans text-xs sm:text-sm md:text-base mt-2 sm:mt-3 md:mt-4"
            style={{ color: `rgb(var(${theme.grayVar}))` }}
          >
            <span dir="auto">{groomBirthOrder}</span>
          </div>
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-playfair whitespace-nowrap"
            style={{ color: `rgb(var(${theme.primaryVar}))`, fontSize: "24px" }}
          >
            {groomName}
          </div>
        </div>
        <div className="w-[52px] sm:w-[70px] md:w-[96px] shrink-0" />
        <div className="flex flex-col items-center flex-1 min-w-0 pointer-events-auto" data-avatar-column="true">
          <img
            className="rounded-full w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[240px] md:h-[240px] object-cover"
            alt={brideName}
            src={brideAvatar}
          />
          <div
            className="font-light font-body-sans text-xs sm:text-sm md:text-base mt-2 sm:mt-3 md:mt-4"
            style={{ color: `rgb(var(${theme.grayVar}))` }}
          >
            <span dir="auto">{brideBirthOrder}</span>
          </div>
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-playfair whitespace-nowrap"
            style={{ color: `rgb(var(${theme.primaryVar}))`, fontSize: "24px" }}
          >
            {brideName}
          </div>
        </div>
      </div>
    </div>
  );
}
