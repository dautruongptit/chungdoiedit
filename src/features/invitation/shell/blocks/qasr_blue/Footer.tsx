import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative isolate"><footer className="relative z-20 flex flex-col items-center px-6 md:px-10 pb-[150px] md:pb-[280px] text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] md:text-[15px] mx-auto md:max-w-[560px]" style={{ color: "rgb(114, 97, 75)", fontFamily: "Baskerville, \"Libre Baskerville\", &quot;Times New Roman&quot;, ChungDoiIndic, serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><div className="mt-6 md:mt-8 flex items-center justify-center"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(114, 97, 75)" }}>♡ chungdoi.com</a></div></footer><img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[-20.18%] w-[140.36%] translate-y-[10%] h-auto max-w-none object-contain z-10" src="/images/themes/qasr-blue/scene-decoration.webp" /></div>
  );
}
