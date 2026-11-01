import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative z-10 flex flex-col items-center px-6 pb-2 pt-6 text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] md:text-[15px] mx-auto md:max-w-[560px]" style={{ color: "rgb(94, 129, 60)", fontFamily: "\"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span></footer>
  );
}
