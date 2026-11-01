import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative isolate z-10"><footer className="relative z-20 flex flex-col items-center px-[9%] pb-[62%] text-center md:px-[14%] md:pb-[44%]"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] md:text-[14px] mx-auto md:max-w-[560px]" style={{ color: "rgb(100, 14, 27)", fontFamily: "Roboto, system-ui, ChungDoiIndic, sans-serif", fontWeight: "500" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><div className="mt-6 flex items-center justify-center md:mt-8"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(100, 14, 27)" }}>♡ chungdoi.com</a></div></footer><img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-15%] left-[-40.6%] z-0 h-auto w-[176.6%] max-w-none object-contain md:left-[-18%] md:w-[136%]" src="/images/themes/mahal-gold/castle.webp" /></div>
  );
}
