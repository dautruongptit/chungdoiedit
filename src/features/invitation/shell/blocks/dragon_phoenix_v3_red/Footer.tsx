import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative w-full flex flex-col items-center justify-center px-4 py-8 text-center z-10"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[13px] md:text-[15px] mx-auto md:max-w-[560px]" style={{ fontFamily: "Baskerville, &quot;Times New Roman&quot;, ChungDoiIndic, serif", color: "rgb(255, 190, 137)" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span></footer>
  );
}
