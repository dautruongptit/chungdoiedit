import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function TopDecor({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");
  return (
    <div
      className={vars.topDecor.containerCls}
      aria-hidden="true"
      style={{ aspectRatio: vars.topDecor.aspectRatio }}
    >
      <img
        alt=""
        aria-hidden="true"
        className={vars.topDecor.imgCls}
        loading="eager"
        decoding="async"
        src={vars.flower1}
      />
    </div>
  );
}
