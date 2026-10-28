import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <>
    <style>{`.st-card{--st-w:min(100vw,480px);}.st-card h1,.st-card h2,.st-card h3{font-weight:400;}@media (min-width:768px){.st-card{--st-w:min(100vw,900px);}}`}</style>
    <img alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover" loading="eager" decoding="async" src={`${t.assets}/paper-background.webp`} />
    </>
  );
}
