import React from "react";
import { isLightColor } from "@/features/invitation/shell/useInvitationCtx";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    d.dressOn && (<section className="relative isolate w-full" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 relative z-10 flex flex-col items-center gap-1"><div className="flex flex-col items-center gap-1"><h2 className="uppercase font-bold text-[20px] md:text-[26px] text-center" style={{ color: t.ink, fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif", fontWeight: "700", letterSpacing: "0.04em" }}><span>{d.dressTitle || "DRESS CODE"}</span></h2><p className="whitespace-pre-line text-[13px] md:text-[17px] text-center" style={{ color: t.text, fontFamily: "\"Times New Roman\", Times, ChungDoiIndic, serif" }}><span>{d.dressText}</span></p></div><div className="flex flex-wrap justify-center gap-4 md:gap-6">{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(0, 88, 133, 0.19)` } : {}) }}></div>))}</div></div></section>)
  );
}
