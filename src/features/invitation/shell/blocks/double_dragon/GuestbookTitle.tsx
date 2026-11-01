import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function GuestbookTitle({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);
  const title = theme.isGreen
    ? "Sổ lưu bút /\u00A0방명록"
    : ((ctx.d as any).guestbook || "Sổ lưu\u00A0bút");

  return (
    <div
      className="w-full py-3 md:py-4"
      style={{ backgroundColor: `rgb(var(${theme.primaryVar}))` }}
    >
      <h2
        className="text-[20px] md:text-[24px] font-bold uppercase tracking-wide text-center flex flex-col items-center"
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
