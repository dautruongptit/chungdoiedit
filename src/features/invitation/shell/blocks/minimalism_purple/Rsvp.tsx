import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Rsvp({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative z-10 mt-5 flex w-full flex-col items-center justify-center"><button type="button" className="inline-flex items-center justify-center rounded-full px-6 py-[6px] text-[13px] tracking-wide transition-transform hover:scale-[1.03]" style={{ backgroundColor: "rgb(120, 105, 160)", color: "rgb(255, 255, 255)", fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif" }}><span className="relative z-10 flex min-h-0 items-center justify-center gap-2"><span>XÁC NHẬN THAM DỰ</span></span></button></div>
  );
}
