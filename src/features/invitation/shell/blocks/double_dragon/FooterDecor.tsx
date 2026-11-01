import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function FooterDecor({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);

  return (
    <div
      className="relative h-12 sm:h-16"
      style={{ backgroundColor: `rgb(var(${theme.primaryVar}))` }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("${theme.patternUrl}")`,
          backgroundSize: "clamp(300px, 50vw, 500px) auto",
          backgroundPositionY: "75%",
        }}
      />
    </div>
  );
}
