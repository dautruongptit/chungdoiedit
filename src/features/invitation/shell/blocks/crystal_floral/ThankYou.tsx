import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function ThankYou({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");
  const thankYouText = (typeof d?.thankYouText === "string" ? d.thankYouText : d?.thankYouText?.vi) || "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!";

  return (
    <footer className="relative flex flex-col items-center px-6 md:px-10 pt-2 pb-4 text-center z-10">
      <span
        className="whitespace-pre-line flex flex-col items-center gap-1 text-sm md:text-lg mx-auto md:max-w-[560px]"
        style={{
          color: vars.primaryColor,
          fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
        }}
      >
        <span dir="auto">{thankYouText}</span>
      </span>
    </footer>
  );
}
