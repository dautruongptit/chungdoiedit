import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  const bgImg = `${t.assets || "/images/themes/red-v1"}/bg-main.webp`;
  return (
    <>
      <div
        className="absolute left-1/2 pointer-events-none z-[1]"
        style={{
          top: "500px",
          width: "clamp(800px, 150vw, 1600px)",
          height: "clamp(1200px, 300vw, 2400px)",
          backgroundImage: `url("${bgImg}")`,
          backgroundSize: "contain",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
          willChange: "transform",
          transform: "translate(-50%, 83.1px)",
        }}
      />
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: "1500px",
          left: "65%",
          width: "clamp(800px, 150vw, 1600px)",
          height: "clamp(1200px, 300vw, 2400px)",
          backgroundImage: `url("${bgImg}")`,
          backgroundSize: "contain",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
          willChange: "transform",
          transform: "translate(-50%, 41.5px) scaleY(-1)",
        }}
      />
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: "-450px",
          left: "35%",
          width: "clamp(800px, 150vw, 1600px)",
          height: "clamp(1200px, 300vw, 2400px)",
          backgroundImage: `url("${bgImg}")`,
          backgroundSize: "contain",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
          willChange: "transform",
          transform: "translate(-50%, -41.6px) rotate(180deg)",
        }}
      />
    </>
  );
}
