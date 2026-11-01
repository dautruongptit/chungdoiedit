import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative isolate z-10 flex flex-col items-center overflow-x-clip px-7 pb-4 text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 relative z-10 text-center text-[11px] md:text-[13px] mx-auto md:max-w-[560px]" style={{ color: "rgb(76, 97, 27)", fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span></footer>
  );
}
