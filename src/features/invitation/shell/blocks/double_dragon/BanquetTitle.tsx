import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function BanquetTitle({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);
  const title = theme.isGreen
    ? "THÔNG TIN TIỆC CƯỚI / 피로연\u00A0안내"
    : ((ctx.d as any).receptionInfoTitle || "THÔNG TIN TIỆC\u00A0CƯỚI");

  return (
    <div
      className="w-full py-3 md:py-4"
      style={{ backgroundColor: `rgb(var(${theme.primaryVar}))` }}
    >
      <h2
        className="font-bold text-[20px] md:text-[24px] text-center uppercase tracking-wide"
        style={{
          color: `rgb(var(${theme.paperVar}))`,
          fontFamily: '"Times New Roman", ChungDoiIndic, serif',
        }}
      >
        <span dir="auto">{title}</span>
      </h2>
    </div>
  );
}
