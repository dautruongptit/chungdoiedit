import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative z-10 flex flex-col items-center px-6 pb-12 text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[12px] md:text-[13px] mx-auto md:max-w-[560px]" style={{ color: "rgb(107, 123, 79)", fontFamily: "&quot;Times New Roman&quot;, ChungDoiIndic, serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span></footer>
  );
}
