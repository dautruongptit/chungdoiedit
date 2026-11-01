import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function WatermarkStyle({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");
  return <style dangerouslySetInnerHTML={{ __html: vars.wmStyle }} />;
}

export function Watermark({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");
  return (
    <div
      className={`${vars.wmPrefix}-wm pointer-events-none absolute inset-0 z-0 overflow-hidden`}
      aria-hidden="true"
    >
      {vars.wmItems.map((item, idx) => {
        const topMatch = item.style.match(/top:\s*([^;]+)/);
        const topVal = topMatch ? topMatch[1] : undefined;
        return (
          <img
            key={idx}
            alt=""
            aria-hidden="true"
            className={item.cls}
            loading="lazy"
            decoding="async"
            src={item.src}
            style={topVal ? { top: topVal } : undefined}
          />
        );
      })}
    </div>
  );
}
