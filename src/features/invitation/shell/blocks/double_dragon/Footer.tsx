import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);

  return (
    <footer
      className="w-full flex items-center justify-center py-1.5"
      style={{ backgroundColor: `rgb(var(${theme.paperVar}))` }}
    >
      <a
        href="https://chungdoi.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs opacity-50 hover:opacity-70 transition-opacity "
        style={{ color: `rgb(var(${theme.grayVar}))` }}
      >
        ♡ chungdoi.com
      </a>
    </footer>
  );
}
