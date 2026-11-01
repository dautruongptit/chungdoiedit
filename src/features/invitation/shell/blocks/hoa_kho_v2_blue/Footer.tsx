import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative isolate z-10 pt-2"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[620px] pb-[46%]"><div className="relative z-20 flex items-center justify-center pb-2"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(85, 97, 131)" }}>♡ chungdoi.com</a></div><span className="whitespace-pre-line flex flex-col items-center gap-1 relative z-20 px-6 text-center text-[11px] md:text-[13px] mx-auto md:max-w-[560px]" style={{ color: "rgb(85, 97, 131)", fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif", fontWeight: "500" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-10%] left-1/2 z-10 w-[121.09%] md:w-[161.09%] max-w-none -translate-x-1/2" src="/images/themes/hoa-kho-v2-blue/flower7.webp" /></div></footer>
  );
}
