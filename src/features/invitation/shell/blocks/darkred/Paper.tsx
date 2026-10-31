import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <>
      <style>{`@keyframes drFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${t.assets}/paper.webp")`,
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          mixBlendMode: "multiply",
          opacity: 0.5,
        }}
      />
    </>
  );
}
