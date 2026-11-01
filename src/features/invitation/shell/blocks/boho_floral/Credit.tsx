import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);

  return (
    <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center z-20">
      <a
        href="https://chungdoi.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs opacity-50 hover:opacity-70 transition-opacity "
        style={{ color: theme.primaryColor }}
      >
        ♡ chungdoi.com
      </a>
    </div>
  );
}
