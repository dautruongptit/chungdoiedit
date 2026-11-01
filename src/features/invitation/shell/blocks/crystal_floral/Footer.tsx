import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");

  return (
    <div className="relative flex items-center justify-center pb-2 z-20">
      <a
        href="https://chungdoi.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs opacity-50 hover:opacity-70 transition-opacity "
        style={{ color: vars.textColor }}
      >
        ♡ chungdoi.com
      </a>
    </div>
  );
}
