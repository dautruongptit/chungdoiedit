import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Thanks({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    d.thanksOn && (<footer className="relative z-10 flex flex-col items-center px-6 text-center" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] md:text-[15px] mx-auto md:max-w-[560px]" style={{ color: t.ink, fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif", fontWeight: "500" }}><span>{d.thanks}</span></span></footer>)
  );
}
