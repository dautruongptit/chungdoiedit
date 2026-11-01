import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function CeremonyBanner({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="w-full pt-6 md:pt-8 z-10" style={{ backgroundColor: "rgb(255, 250, 247)" }}><h2 className="uppercase font-bold text-[20px] md:text-[24px] text-center tracking-wide" style={{ color: "rgb(124, 21, 26)", fontFamily: "&quot;Times New Roman&quot;, Times, ChungDoiIndic, serif" }}><span>THÔNG TIN LỄ&nbsp;CƯỚI</span></h2></div>
  );
}
