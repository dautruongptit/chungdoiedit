import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section5({ ctx }: { ctx: InvitationCtx }) {
  return (
    <section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><img alt="" aria-hidden="true" className="pointer-events-none absolute -z-10 h-auto max-w-none object-contain" src="/images/themes/nomad-brown/scene2-decoration.webp" style={{ left: "-34.694%", top: "calc(-0.04308 * var(--st-w))", width: "169.388%" }} /><div className="relative z-10 flex w-full flex-col items-center" style={{ paddingInline: "8.503%" }}><div className="relative z-10 flex w-full flex-col items-center justify-center"><button type="button" className="inline-flex items-center justify-center rounded-full px-7 py-[5px] text-[13px] uppercase tracking-[0.04em] transition-transform hover:scale-[1.03] md:text-[15px]" style={{ backgroundColor: "rgb(125, 88, 62)", color: "rgb(255, 255, 255)", fontFamily: "Roboto, \"Helvetica Neue\", Arial, ChungDoiIndic, sans-serif" }}><span className="relative z-10 flex min-h-0 items-center justify-center gap-2"><span>XÁC NHẬN THAM DỰ</span></span></button></div></div><div aria-hidden="true" style={{ height: "calc(0.34014 * var(--st-w))" }}></div></section>
  );
}
