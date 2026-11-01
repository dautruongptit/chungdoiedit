import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative w-full"><div className="relative z-10 flex w-full flex-col items-center text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] md:text-[15px] mx-auto md:max-w-[560px]" style={{ color: "rgb(242, 192, 110)", fontFamily: "Roboto, \"Helvetica Neue\", Arial, ChungDoiIndic, sans-serif", marginTop: "calc(0.05215 * var(--st-w))" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><div style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity block mt-4" style={{ color: "rgb(242, 192, 110)" }}>♡ chungdoi.com</a></div></div><div className="relative -z-10 w-full" style={{ height: "calc(0.59864 * var(--st-w))" }}><img alt="" aria-hidden="true" className="pointer-events-none absolute left-[-4.195%] bottom-[-8%] h-auto w-[108.390%] max-w-none object-contain" src="/images/themes/mandap-darkred/temple-decoration.webp" /></div></footer>
  );
}
