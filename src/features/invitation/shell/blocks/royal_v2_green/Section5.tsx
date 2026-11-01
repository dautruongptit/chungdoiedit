import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section5({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative z-10 mt-8 flex w-full flex-col items-center justify-center md:mt-10"><button type="button" className="inline-flex items-center justify-center rounded-full px-6 py-2 text-[13px] uppercase tracking-wide transition-transform hover:scale-[1.03]" style={{ background: "transparent", border: "1px solid rgb(255, 255, 255)", color: "rgb(255, 255, 255)", fontFamily: "&quot;Times New Roman&quot;, Times, ChungDoiIndic, serif" }}><span className="relative z-10 flex min-h-0 items-center justify-center gap-2"><span>XÁC NHẬN THAM DỰ</span></span></button></div>
  );
}
