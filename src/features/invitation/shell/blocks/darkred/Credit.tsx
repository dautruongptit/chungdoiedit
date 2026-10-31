import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <div className="relative z-20 flex items-center justify-center pb-3">
      <a
        href="https://chungdoi.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs opacity-50 hover:opacity-70 transition-opacity"
        style={{ color: t.ink }}
      >
        ♡ chungdoi.com
      </a>
    </div>
  );
}
