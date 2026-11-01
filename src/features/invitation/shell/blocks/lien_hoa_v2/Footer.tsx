import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <span className="whitespace-pre-line flex flex-col items-center gap-1 px-6 text-center text-[11px] md:text-[13px] mx-auto md:max-w-[560px]" style={{ color: "rgb(94, 129, 60)", fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span>
  );
}
