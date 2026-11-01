import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

export function CeremonyTitle({ ctx }: { ctx: InvitationCtx }) {
  const vars = getSongHyTheme(ctx);
  return (
    <div className="w-full py-3 md:py-4" style={{ backgroundColor: vars.primaryColor }}>
      <h2
        className="font-bold text-[20px] md:text-[24px] text-center uppercase tracking-wide"
        style={{
          color: vars.accentColor,
          fontFamily: '"Times New Roman", ChungDoiIndic, serif',
        }}
      >
        <span dir="auto">THÔNG TIN LỄ&nbsp;CƯỚI</span>
      </h2>
    </div>
  );
};
