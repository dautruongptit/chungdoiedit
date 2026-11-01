import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function TopDecor({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);

  if (theme.isPink) {
    return (
      <>
        <div className="absolute -z-10 pointer-events-none rotate-[20deg] scale-x-[-1] scale-y-[-1] boho-pink-fixed-flower">
          <img alt="" className="w-full h-auto opacity-70" src="/images/themes/boho-floral-pink/asset_1.webp" />
        </div>
        <div
          className="absolute top-[1160px] md:top-[770px] lg:top-[920px] left-[calc(50%-310px)] md:left-[calc(30%-410px)] lg:left-[calc(30%-495px)] w-[620px] md:w-[820px] lg:w-[990px] -z-10 opacity-[0.15] pointer-events-none"
          style={{ willChange: "transform", transform: "rotate(162deg) translateY(22px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_2.webp" />
        </div>
        <div
          className="absolute top-[1945px] md:top-[2163px] lg:top-[2590px] left-[calc(50%-320px)] md:left-[calc(50%-420px)] lg:left-[calc(50%-505px)] w-[640px] md:w-[840px] lg:w-[1010px] -z-10 opacity-[0.15] pointer-events-none"
          style={{ willChange: "transform", transform: "rotate(142deg) translateY(30.25px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_2.webp" />
        </div>
      </>
    );
  }

  if (theme.isBrown) {
    return (
      <>
        <div
          className="absolute top-[786px] -left-[100px] w-[700px] md:w-[910px] -z-10 opacity-10 pointer-events-none"
          style={{ willChange: "transform", transform: "rotate(139deg) translateY(26.3px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/flower_bottom.webp" />
        </div>
        <div
          className="absolute top-[2000px] -left-[320px] w-[700px] md:w-[910px] -z-10 opacity-10 pointer-events-none"
          style={{ willChange: "transform", transform: "rotate(-30deg) translateY(36.82px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/flower_bottom.webp" />
        </div>
      </>
    );
  }

  // Green
  return (
    <>
      <div className="absolute -z-10 pointer-events-none rotate-[-60.58deg] boho-green-fixed-flower">
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
      <div
        className="absolute top-[302px] md:top-[360px] lg:top-[410px] -right-[220px] md:-right-[300px] lg:-right-[360px] w-[610px] md:w-[800px] lg:w-[960px] -z-10 opacity-[0.15] pointer-events-none"
        style={{ willChange: "transform", transform: "rotate(152deg) translateY(20.64px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
      <div
        className="absolute top-[1054px] md:top-[1190px] lg:top-[1300px] -left-[110px] md:-left-[140px] lg:-left-[170px] w-[750px] md:w-[990px] lg:w-[1185px] -z-10 opacity-[0.15] pointer-events-none"
        style={{ willChange: "transform", transform: "rotate(132deg) translateY(28.38px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
    </>
  );
}
