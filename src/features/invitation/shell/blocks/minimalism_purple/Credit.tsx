import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative z-20 mt-3 flex items-center justify-center pb-[132px] md:pb-[165px]"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(120, 105, 160)" }}>♡ chungdoi.com</a></div>
  );
}
