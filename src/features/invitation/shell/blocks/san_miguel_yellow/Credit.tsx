import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative w-full" style={{ marginTop: "calc(-0.02948 * var(--st-w))" }}><img alt="" aria-hidden="true" className="pointer-events-none absolute start-[-23.923%] top-0 z-0 w-[168.481%] aspect-[743/248] max-w-none object-contain" src="/images/themes/san-miguel-yellow/scene2-decoration.webp" /><div className="relative z-20 flex items-center justify-center" style={{ paddingTop: "calc(0.08163 * var(--st-w))", paddingBottom: "calc(0.30385 * var(--st-w))" }}><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(66, 111, 56)" }}>♡ chungdoi.com</a></div></div>
  );
}
