import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function RsvpBridge({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, setRsvpOpen } = ctx;
  return (
    d.rsvpOn && (<div className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))", paddingBottom: "calc(0.03628 * var(--st-w))" }}><div className="relative z-10 flex w-full flex-col items-center justify-center"><button type="button" onClick={() => setRsvpOpen(true)} className="text-[13px] md:text-[17px] tracking-wider inline-flex items-center justify-center rounded-full px-7 py-1.5 transition-transform hover:scale-[1.03]" style={{ backgroundColor: t.ink, color: "rgb(255, 255, 255)", fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif" }}><span className="relative z-10 flex min-h-0 items-center justify-center gap-2"><span>XÁC NHẬN THAM DỰ</span></span></button></div><img alt="" aria-hidden="true" className="pointer-events-none relative z-0 mx-auto block h-auto w-[45.92%] max-w-none object-contain" loading="lazy" decoding="async" src={`${t.assets}/bridge.webp`} style={{ marginTop: "calc(0.01361 * var(--st-w))", willChange: "transform" }} /></div>)
  );
}
