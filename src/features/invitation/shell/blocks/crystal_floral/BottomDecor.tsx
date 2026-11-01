import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function BottomDecor({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");

  return (
    <div className="relative flex justify-center pointer-events-none">
      <div
        className="relative w-[115%] shrink-0 overflow-hidden"
        style={{ aspectRatio: vars.bottomDecor.aspectRatio }}
      >
        <img
          alt=""
          aria-hidden="true"
          className={vars.bottomDecor.imgCls}
          loading="lazy"
          decoding="async"
          src={vars.flower5}
        />
      </div>
    </div>
  );
}
