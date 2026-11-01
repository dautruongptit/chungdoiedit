import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme } from "./themeVars";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);

  return (
    <div className="flex items-center justify-center">
      <a
        href="https://chungdoi.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs opacity-50 hover:opacity-70 transition-opacity"
        style={{ color: theme.textColor }}
      >
        ♡ chungdoi.com
      </a>
    </div>
  );
}
