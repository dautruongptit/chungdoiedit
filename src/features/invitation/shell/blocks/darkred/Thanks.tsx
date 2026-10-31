import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Thanks({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  if (!d.thanksOn) return null;

  return (
    <footer className="relative z-10 flex flex-col items-center px-6 pb-10 text-center">
      <span
        className="whitespace-pre-line flex flex-col items-center gap-1 text-[12px] md:text-[13px] mx-auto md:max-w-[560px]"
        style={{
          color: t.ink,
          fontFamily: '"Times New Roman", ChungDoiIndic, serif',
        }}
      >
        <span dir="auto">{d.thanks}</span>
      </span>
    </footer>
  );
}
