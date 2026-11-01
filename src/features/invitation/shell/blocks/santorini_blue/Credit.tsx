import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative z-0 w-full overflow-hidden" style={{ marginTop: "calc(0.04762 * var(--st-w))", height: "calc(0.63265 * var(--st-w))" }}><img alt="" aria-hidden="true" className="pointer-events-none absolute top-0 block h-auto max-w-none object-contain" src="/images/themes/santorini-blue/scene-2.webp" style={{ width: "calc(1.21088 * var(--st-w))", left: "calc(-0.06122 * var(--st-w))" }} /><div className="relative z-20 flex items-start justify-center" style={{ paddingTop: "calc(0.04082 * var(--st-w))" }}><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(45, 88, 140)" }}>♡ chungdoi.com</a></div></div>
  );
}
