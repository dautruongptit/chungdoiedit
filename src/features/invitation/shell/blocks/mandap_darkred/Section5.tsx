import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section5({ ctx }: { ctx: InvitationCtx }) {
  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingInline: "8.503%" }}><div className="relative z-10 flex w-full flex-col items-center justify-center"><button type="button" className="inline-flex items-center justify-center rounded-full px-7 py-[5px] text-[13px] uppercase tracking-[0.04em] transition-transform hover:scale-[1.03] md:text-[15px]" style={{ backgroundColor: "rgb(242, 192, 110)", color: "rgb(118, 76, 77)", fontFamily: "Roboto, \"Helvetica Neue\", Arial, ChungDoiIndic, sans-serif" }}><span className="relative z-10 flex min-h-0 items-center justify-center gap-2"><span>XÁC NHẬN THAM DỰ</span></span></button></div></section>
  );
}
