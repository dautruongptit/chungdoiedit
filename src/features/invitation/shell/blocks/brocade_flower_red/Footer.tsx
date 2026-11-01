import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative flex flex-col items-center px-6 md:px-10 pb-0 text-center z-10"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-sm md:text-lg mx-auto md:max-w-[560px]" style={{ color: "rgb(60, 77, 32)", fontFamily: "Baskerville, \"Libre Baskerville\", &quot;Times New Roman&quot;, ChungDoiIndic, serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span></footer>
  );
}
