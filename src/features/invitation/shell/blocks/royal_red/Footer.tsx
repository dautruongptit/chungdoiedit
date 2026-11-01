import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative z-10 flex flex-col items-center px-6 md:px-10 pb-16 md:pb-20 text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-sm md:text-lg mx-auto md:max-w-[560px]" style={{ color: "rgb(225, 188, 124)", fontFamily: "Baskerville, &quot;Times New Roman&quot;, ChungDoiIndic, serif" }}><span>Gia đình xin chân thành cảm ơn quý khách đã đến chung vui.</span></span></footer>
  );
}
