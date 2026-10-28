import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Stone({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <div className="pointer-events-none relative z-0 overflow-hidden" style={{ marginTop: "calc(0.00454 * var(--st-w))", height: "calc(0.48299 * var(--st-w))" }}><img alt="" aria-hidden="true" className="absolute top-0 block h-auto max-w-none object-contain" loading="lazy" decoding="async" src={`${t.assets}/stone.webp`} style={{ width: "calc(1.12018 * var(--st-w))", left: "calc(-0.05896 * var(--st-w))" }} /></div>
  );
}
