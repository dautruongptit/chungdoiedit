import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section5({ ctx }: { ctx: InvitationCtx }) {
  return (
    <section className="relative isolate z-10 w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><div className="relative z-10 flex w-full flex-col items-center justify-center"><button type="button" className="inline-flex items-center justify-center rounded-full px-6 py-1.5 text-[13px] md:text-[17px]" style={{ backgroundColor: "rgb(48, 77, 137)", color: "rgb(255, 250, 240)", fontFamily: "Ubuntu, ChungDoiIndic, sans-serif" }}><span className="relative z-10 flex min-h-0 items-center justify-center gap-2"><span>XÁC NHẬN THAM DỰ</span></span></button></div></section>
  );
}
