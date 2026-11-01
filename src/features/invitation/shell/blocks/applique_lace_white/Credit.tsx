import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative z-10 flex w-full items-center justify-center" style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingBottom: "calc(0.09070 * var(--st-w))" }}><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(255, 255, 255)" }}>♡ chungdoi.com</a></div>
  );
}
