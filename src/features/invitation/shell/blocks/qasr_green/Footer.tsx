import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative isolate"><img alt="" aria-hidden="true" className="pointer-events-none absolute h-auto object-contain opacity-10 max-w-none -z-10" src="/images/themes/qasr-green/flower-decoration.webp" style={{ willChange: "transform", left: "-46.4%", top: "-390px", width: "125.6%", transformOrigin: "center center", transform: "translateY(87.72px) rotate(-150deg) scaleY(-1)" }} /><footer className="relative flex flex-col items-center px-6 md:px-10 pb-[132px] md:pb-[240px] text-center z-20"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-sm md:text-lg mx-auto md:max-w-[560px]" style={{ color: "rgb(112, 132, 101)", fontFamily: "Baskerville, \"Libre Baskerville\", &quot;Times New Roman&quot;, ChungDoiIndic, serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><div className="mt-7 md:mt-9 flex items-center justify-center"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(112, 132, 101)" }}>♡ chungdoi.com</a></div></footer></div>
  );
}
