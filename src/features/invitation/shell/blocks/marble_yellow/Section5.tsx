import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section5({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative isolate z-10 w-full" style={{ marginTop: "calc(0.05215 * var(--iv-w))" }}><div className="relative z-10 flex w-full flex-col items-center justify-center"><button type="button" className="text-[13px] md:text-[17px] inline-flex items-center justify-center rounded-full px-7 py-1 transition-transform hover:scale-[1.03]" style={{ backgroundColor: "rgb(167, 133, 85)", color: "rgb(255, 255, 255)", fontFamily: "Ubuntu, Roboto, system-ui, ChungDoiIndic, sans-serif" }}><span className="relative z-10 flex min-h-0 items-center justify-center gap-2"><span>XÁC NHẬN THAM DỰ</span></span></button></div></div>
  );
}
