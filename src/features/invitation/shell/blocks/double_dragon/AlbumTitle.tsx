import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function AlbumTitle({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);
  const title = theme.isGreen
    ? "Album Ảnh / 사진\u00A0갤러리"
    : ((ctx.d as any).weddingAlbum || "Album Ảnh");

  return (
    <div
      className="w-full py-3 md:py-4"
      style={{ backgroundColor: `rgb(var(${theme.primaryVar}))` }}
    >
      <h2
        className="font-bold text-[20px] md:text-[24px] text-center uppercase tracking-wide flex flex-col items-center"
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
