import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><img alt="" aria-hidden="true" className="pointer-events-none absolute start-[-11.791%] top-0 z-0 mt-[2.494%] aspect-[534/179] w-[121.088%] max-w-none object-contain" src="/images/themes/florence-brown/scene2-decoration.webp" /><div className="relative z-20 flex items-center justify-center" style={{ paddingBottom: "calc(0.29025 * var(--st-w))" }}><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(156, 115, 85)" }}>♡ chungdoi.com</a></div></div>
  );
}
