import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <>
    <style>{`.tp-card h1,.tp-card h2,.tp-card h3{font-weight:400;}`}</style>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={{ backgroundImage: `url("${t.assets}/bg-texture.webp")`, backgroundSize: "154.8% auto", backgroundRepeat: "repeat", mixBlendMode: "multiply", opacity: "0.4" }}></div>
    </>
  );
}
