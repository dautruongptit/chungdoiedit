import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function DressCode({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");

  return (
    <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 ">
      <div className="flex flex-col items-center gap-1">
        <h2
          className="uppercase font-bold text-[20px] md:text-[24px] text-center"
          style={{
            color: vars.primaryColor,
            fontFamily: '"Times New Roman", Times, ChungDoiIndic, serif',
            fontWeight: 700,
            letterSpacing: vars.dressCode.letterSpacing,
          }}
        >
          <span dir="auto">DRESS CODE</span>
        </h2>
        <p
          className="whitespace-pre-line text-sm md:text-base text-center opacity-70"
          style={{
            color: vars.primaryColor,
            fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">{vars.dressCode.description}</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {vars.dressCode.colors.map((c, idx) => (
          <div
            key={idx}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
            style={{
              backgroundColor: c.bg,
              border: c.border,
            }}
          />
        ))}
      </div>
    </div>
  );
}
