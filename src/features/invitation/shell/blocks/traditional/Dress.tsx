import React from "react";
import { isLightColor } from "@/features/invitation/shell/useInvitationCtx";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    d.dressOn && (<section className="relative isolate overflow-x-clip"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[600px]"><div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 relative z-10 flex flex-col items-center gap-[4px] py-[10px]"><div className="flex flex-col items-center gap-1"><h2 className="uppercase font-bold text-center text-[20px] md:text-[27px]" style={{ color: t.ink, fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.02em" }}><span>{d.dressTitle || "DRESS CODE"}</span></h2><p className="whitespace-pre-line text-center text-[13px] md:text-[18px] text-center opacity-70" style={{ color: t.ink, fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}><span>{d.dressText}</span></p></div><div className="flex flex-wrap justify-center gap-4 md:gap-6">{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(255, 211, 144, 0.19)` } : {}) }}></div>))}</div></div></div></section>)
  );
}
