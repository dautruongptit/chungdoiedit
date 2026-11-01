import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative isolate overflow-x-clip mt-[23px] md:mt-[31px]"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[600px]"><div className="relative z-10 flex flex-col items-center px-[37px] md:px-[50px]"><span className="whitespace-pre-line flex flex-col items-center gap-1 px-2 text-center text-[11px] leading-relaxed md:text-[15px] mx-auto md:max-w-[560px]" style={{ fontFamily: "\"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif", color: "rgb(255, 232, 164)" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><div className="mt-5 flex items-center justify-center"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity block mt-4" style={{ color: "rgb(255, 232, 164)" }}>♡ chungdoi.com</a></div></div><div className="relative w-full" style={{ marginTop: "6px", paddingTop: "27.8%" }}><img alt="" aria-hidden="true" className="pointer-events-none absolute top-0 max-w-none" src="/images/themes/song-hac-red/cloud1-bottom.webp" style={{ left: "-22.07%", width: "176.15%" }} /></div></div></footer>
  );
}
