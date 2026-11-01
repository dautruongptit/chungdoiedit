import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative z-10 flex w-full flex-col items-center text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] md:text-[15px] mx-auto md:max-w-[560px]" style={{ color: "rgb(94, 126, 155)", fontFamily: "Roboto, \"Helvetica Neue\", Arial, ChungDoiIndic, sans-serif", marginTop: "calc(0.05215 * var(--st-w))" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><div style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity block mt-4" style={{ color: "rgb(94, 126, 155)" }}>♡ chungdoi.com</a></div><div className="relative -z-10 w-full overflow-hidden" style={{ marginTop: "calc(0.05215 * var(--st-w))", height: "calc(0.21769 * var(--st-w))" }}><img alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-auto max-w-none -translate-x-1/2 object-contain" src="/images/themes/baroque-blue/gold6-decoration.webp" style={{ width: "124.49%" }} /></div></footer>
  );
}
