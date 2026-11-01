import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

export function GuestbookTitle({ ctx }: { ctx: InvitationCtx }) {
  const vars = getSongHyTheme(ctx);
  return (
    <div className="w-full py-3 md:py-4" style={{ backgroundColor: vars.primaryColor }}>
      <h2
        className="text-[20px] md:text-[24px] font-bold uppercase tracking-wide text-center flex flex-col items-center"
        style={{
          color: vars.accentColor,
          fontFamily: '"Times New Roman", ChungDoiIndic, serif',
        }}
      >
        <span dir="auto">Sổ lưu&nbsp;bút</span>
      </h2>
    </div>
  );
};
