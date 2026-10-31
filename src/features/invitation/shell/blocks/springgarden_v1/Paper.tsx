import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  const assets = t.assets || "/images/themes/vuon%20xuan%20red";
  const decorStyle = assets.includes("blue")
    ? "blue"
    : assets.includes("nature")
    ? "green"
    : "red";

  return (
    <>
      {decorStyle === "red" && (
        <>
          <div
            className="absolute pointer-events-none z-[1]"
            style={{
              top: "0px",
              right: "auto",
              left: "-9px",
              width: "685px",
              height: "326px",
              backgroundImage: 'url("/images/themes/vuon%20xuan%20red/top%20right.webp")',
              backgroundSize: "contain",
              backgroundPosition: "left top",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute pointer-events-none z-[1]"
            style={{
              left: "-354px",
              top: "-5%",
              width: "684.71px",
              height: "807.52px",
              backgroundImage: 'url("/images/themes/vuon%20xuan%20red/1%20left.webp")',
              backgroundSize: "contain",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
              willChange: "transform",
              transform: "translateY(190px)",
            }}
          />
          <div
            className="absolute pointer-events-none z-[1]"
            style={{
              right: "auto",
              left: "121px",
              top: "15%",
              width: "646.93px",
              height: "762.96px",
              backgroundImage: 'url("/images/themes/vuon%20xuan%20red/2%20right.webp")',
              backgroundSize: "contain",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
              willChange: "transform",
              transform: "translateY(266px)",
            }}
          />
          <div
            className="absolute pointer-events-none z-[1]"
            style={{
              left: "-380px",
              top: "20%",
              width: "646.93px",
              height: "762.96px",
              backgroundImage: 'url("/images/themes/vuon%20xuan%20red/3%20left.webp")',
              backgroundSize: "contain",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
              willChange: "transform",
              transform: "translateY(152px)",
            }}
          />
          <div
            className="absolute pointer-events-none z-[1]"
            style={{
              right: "auto",
              left: "130px",
              top: "35%",
              width: "646.93px",
              height: "762.96px",
              backgroundImage: 'url("/images/themes/vuon%20xuan%20red/4%20right.webp")',
              backgroundSize: "contain",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
              willChange: "transform",
              transform: "translateY(-76px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 pointer-events-none z-[1]"
            style={{
              width: "647px",
              height: "333px",
              backgroundImage: 'url("/images/themes/vuon%20xuan%20red/button%20left.webp")',
              backgroundSize: "contain",
              backgroundPosition: "left bottom",
              backgroundRepeat: "no-repeat",
            }}
          />
        </>
      )}

      {decorStyle === "blue" && (
        <>
          <div
            className="absolute pointer-events-none z-[1]"
            style={{
              left: "-318px",
              top: "0px",
              width: "1072px",
              height: "1040px",
              transform: "none",
              backgroundImage: 'url("/images/themes/vuon%20xuan%20blue/top.webp")',
              backgroundSize: "contain",
              backgroundPosition: "left top",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute pointer-events-none z-[1]"
            style={{
              left: "50%",
              top: "10%",
              width: "1025.54px",
              height: "1306.91px",
              backgroundImage: 'url("/images/themes/vuon%20xuan%20blue/mid.webp")',
              backgroundSize: "contain",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              willChange: "transform",
              transform: "translateX(-50%) translateY(185px)",
            }}
          />
          <div
            className="absolute bottom-0 pointer-events-none z-[1]"
            style={{
              left: "-283px",
              width: "1126.05px",
              height: "1435px",
              transform: "none",
              backgroundImage: 'url("/images/themes/vuon%20xuan%20blue/button.webp")',
              backgroundSize: "contain",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </>
      )}

      {decorStyle === "green" && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-70 z-[1]"
            style={{
              width: "clamp(1600px, 240vw, 3000px)",
              height: "clamp(1500px, 560vw, 2800px)",
              backgroundImage: 'url("/images/themes/nature/flower_top.webp")',
              backgroundSize: "contain",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              top: "-50px",
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 rotate-180 pointer-events-none opacity-70 z-[1]"
            style={{
              bottom: "0px",
              top: "auto",
              width: "clamp(1600px, 240vw, 3000px)",
              height: "clamp(1500px, 560vw, 2800px)",
              backgroundImage: 'url("/images/themes/nature/flower_top.webp")',
              backgroundSize: "contain",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute left-1/2 pointer-events-none opacity-20 z-[2]"
            style={{
              top: "10%",
              width: "clamp(1600px, 200vw, 3000px)",
              height: "clamp(750px, 280vw, 1400px)",
              backgroundImage: 'url("/images/themes/nature/flower_paralax.webp")',
              backgroundSize: "contain",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "darken",
              willChange: "transform",
              transform: "translate(-30%, 186.5px) rotate(221deg)",
            }}
          />
        </>
      )}
    </>
  );
}
