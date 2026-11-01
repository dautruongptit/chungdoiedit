import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><img alt="" aria-hidden="true" className="pointer-events-none absolute start-[46.712%] z-0 aspect-[300/225] w-[68.027%] max-w-none object-contain will-change-transform" src="/images/themes/hoa-dai-pink/flower5-decoration.webp" style={{ bottom: "calc(-0.18821 * var(--st-w))", transform: "translateY(-24px)" }} /><img alt="" aria-hidden="true" className="pointer-events-none absolute start-[-9.977%] z-0 aspect-[265/199] w-[60.091%] max-w-none object-contain will-change-transform" src="/images/themes/hoa-dai-pink/flower5-decoration.webp" style={{ bottom: "calc(-0.13152 * var(--st-w))", transform: "translateY(-24px) scaleX(-1)" }} /><div className="relative z-20 flex items-center justify-center" style={{ paddingTop: "calc(0.03175 * var(--st-w))", paddingBottom: "calc(0.39683 * var(--st-w))" }}><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(183, 88, 115)" }}>♡ chungdoi.com</a></div></div>
  );
}
