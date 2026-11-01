import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative isolate"><img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] w-[125%] md:w-[100%] max-w-none h-auto object-contain z-0" src="/images/themes/saraya-gold/flower-bottom.webp" /><footer className="relative flex flex-col items-center px-6 md:px-10 pb-[120px] md:pb-[200px] text-center z-20"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-sm md:text-lg mx-auto md:max-w-[560px]" style={{ color: "rgb(158, 117, 60)", fontFamily: "Baskerville, \"Libre Baskerville\", &quot;Times New Roman&quot;, ChungDoiIndic, serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><div className="mt-6 md:mt-8 flex items-center justify-center"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(158, 117, 60)" }}>♡ chungdoi.com</a></div></footer></div>
  );
}
