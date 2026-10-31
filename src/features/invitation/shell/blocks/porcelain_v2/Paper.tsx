import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  const assets = t.assets || "/images/themes/porcelain-v2-green";
  const bgSize = assets.includes("red")
    ? "518px 920px"
    : assets.includes("pink")
    ? "560px"
    : "567px 1008px";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `url("${assets}/floral-tile.webp")`,
        backgroundSize: bgSize,
        backgroundRepeat: "repeat",
        backgroundPosition: "left top",
      }}
    />
  );
}
