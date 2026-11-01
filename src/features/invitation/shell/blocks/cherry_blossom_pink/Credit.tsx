import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center z-20"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(174, 76, 81)" }}>♡ chungdoi.com</a></div>
  );
}
