import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function LineDecoration({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <img alt="" aria-hidden="true" className="pointer-events-none relative z-10 mx-auto block h-auto w-[37.19%] max-w-none object-contain" loading="lazy" decoding="async" src={`${t.assets}/line-decoration.webp`} style={{ marginTop: "calc(0.02721 * var(--st-w))" }} />
  );
}
