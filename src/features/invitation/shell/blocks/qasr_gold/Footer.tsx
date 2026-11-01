import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative isolate"><footer className="relative flex flex-col items-center px-6 md:px-10 pb-[150px] md:pb-[230px] text-center z-20"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-sm md:text-lg mx-auto md:max-w-[560px]" style={{ color: "rgb(84, 78, 39)", fontFamily: "Baskerville, \"Libre Baskerville\", &quot;Times New Roman&quot;, ChungDoiIndic, serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span><div className="mt-7 md:mt-9 flex items-center justify-center"><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity " style={{ color: "rgb(84, 78, 39)" }}>♡ chungdoi.com</a></div></footer></div>
  );
}
