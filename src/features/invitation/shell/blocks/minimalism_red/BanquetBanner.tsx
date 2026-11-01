import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function BanquetBanner({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="w-full pt-10 md:pt-14 z-10" style={{ backgroundColor: "rgb(255, 250, 247)" }}><h2 className="uppercase font-bold text-[20px] md:text-[24px] text-center tracking-wide" style={{ color: "rgb(124, 21, 26)", fontFamily: "&quot;Times New Roman&quot;, Times, ChungDoiIndic, serif" }}><span>THÔNG TIN TIỆC&nbsp;CƯỚI</span></h2></div>
  );
}
