import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative z-10 flex flex-col items-center px-6 pt-4 text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[12px] md:text-[14px] mx-auto md:max-w-[560px]" style={{ color: "rgb(229, 228, 208)", fontFamily: "Baskerville, &quot;Times New Roman&quot;, ChungDoiIndic, serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><div className="mt-4 flex items-center justify-center"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity block mt-4" style={{ color: "rgb(229, 228, 208)" }}>♡ chungdoi.com</a></div><img alt="" aria-hidden="true" className="pointer-events-none mt-2 translate-y-[55px] w-[170%] md:w-[80%] max-w-none object-contain" src="/images/themes/royal-v2-green/flower4-bottom.webp" /></footer>
  );
}
