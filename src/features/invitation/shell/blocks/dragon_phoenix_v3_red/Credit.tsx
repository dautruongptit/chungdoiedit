import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative flex items-center justify-center py-3 z-10"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity block mt-4" style={{ color: "rgb(255, 190, 137)" }}>♡ chungdoi.com</a></div>
  );
}
