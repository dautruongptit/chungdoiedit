import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function MidDecor({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);

  if (theme.isPink) {
    return (
      <>
        <div
          className="absolute top-[1180px] md:top-[1320px] lg:top-[1460px] -right-[180px] md:-right-[160px] lg:-right-[200px] w-[260px] md:w-[350px] lg:w-[420px] -z-10 pointer-events-none scale-x-[-1]"
          style={{ willChange: "transform", transform: "rotate(-26deg) translateY(-11px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_3.webp" />
        </div>
        <div
          className="absolute top-[1830px] md:top-[2010px] lg:top-[2190px] left-[-70px] md:left-[-130px] lg:left-[-160px] w-[170px] md:w-[320px] lg:w-[420px] rotate-180 -z-10 pointer-events-none"
          style={{ willChange: "transform", transform: "translateY(13.75px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_3.webp" />
        </div>
        <div
          className="absolute top-[3570px] md:top-[7384px] lg:top-[8580px] left-0 right-0 mx-auto w-[640px] md:w-[855px] lg:w-[1035px] -z-10 opacity-[0.15] pointer-events-none"
          style={{ willChange: "transform", transform: "translateY(16.5px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_2.webp" />
        </div>
        <div
          className="absolute top-[2211px] md:top-[2430px] lg:top-[2650px] -right-[140px] md:-right-[260px] lg:-right-[350px] w-[195px] md:w-[365px] lg:w-[490px] -z-10 pointer-events-none scale-x-[-1] rotate-180"
          style={{ willChange: "transform", transform: "rotate(-28deg) translateY(-11px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_3.webp" />
        </div>
        <div
          className="absolute top-[4060px] md:top-[3880px] lg:top-[4080px] left-[-20%] w-[260px] md:w-[350px] lg:w-[420px] -z-10 pointer-events-none"
          style={{ willChange: "transform", transform: "rotate(176deg) translateY(8.25px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_3.webp" />
        </div>
      </>
    );
  }

  if (theme.isBrown) {
    return (
      <>
        <div
          className="absolute top-[2850px] -left-[60px] w-[260px] md:w-[338px] -z-10 pointer-events-none"
          style={{ willChange: "transform", transform: "rotate(-154deg) scaleY(-1) translateY(18.41px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/flower_mid.webp" />
        </div>
        <div
          className="absolute bottom-[10px] -left-[300px] w-[500px] md:w-[650px] -z-10 opacity-10 pointer-events-none"
          style={{ willChange: "transform", transform: "rotate(-113deg) translateY(13.15px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/flower_mid.webp" />
        </div>
        <div
          className="absolute top-[1450px] -left-[40px] w-[140px] md:w-[182px] -z-10 pointer-events-none"
          style={{ willChange: "transform", transform: "translateY(10.52px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/fixed_flower_2.webp" />
        </div>
        <div
          className="absolute top-[2800px] right-[-20px] w-[140px] md:w-[182px] -z-10 opacity-70 pointer-events-none"
          style={{ willChange: "transform", transform: "translateY(15.78px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/fixed_flower_2.webp" />
        </div>
      </>
    );
  }

  // Green
  return (
    <>
      <div
        className="absolute top-[2350px] md:top-[2550px] lg:top-[2750px] left-[-388.5px] md:left-[-420px] lg:left-[-500px] w-[558.77px] md:w-[720px] lg:w-[860px] -z-10 pointer-events-none"
        style={{ willChange: "transform", transform: "translateY(12.9px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
      <div
        className="absolute top-[1848px] md:top-[2020px] lg:top-[2180px] -right-[340px] md:-right-[520px] lg:-right-[550px] w-[750px] md:w-[1005px] lg:w-[1215px] -z-10 opacity-[0.15] pointer-events-none"
        style={{ willChange: "transform", transform: "rotate(122deg) translateY(15.48px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
      <div
        className="absolute top-[1180px] md:top-[1320px] lg:top-[1460px] -right-[142px] md:-right-[190px] lg:-right-[230px] w-[290px] md:w-[390px] lg:w-[460px] -z-10 pointer-events-none scale-x-[-1]"
        style={{ willChange: "transform", transform: "rotate(-36deg) translateY(-10.32px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
      <div
        className="absolute top-[2545px] md:top-[2720px] lg:top-[2900px] -left-[290px] md:-left-[390px] lg:-left-[470px] w-[1062px] md:w-[1425px] lg:w-[1725px] -z-10 opacity-[0.15] pointer-events-none"
        style={{ willChange: "transform", transform: "rotate(128deg) translateY(18.06px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
      <div
        className="absolute top-[4060px] md:top-[3880px] lg:top-[4080px] left-[-35%] w-[297px] md:w-[400px] lg:w-[480px] -z-10 pointer-events-none"
        style={{ willChange: "transform", transform: "rotate(176deg) translateY(7.74px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
      <div
        className="absolute top-[2960px] md:top-[3150px] lg:top-[3340px] -right-[142px] md:-right-[190px] lg:-right-[230px] w-[290px] md:w-[390px] lg:w-[460px] -z-10 pointer-events-none scale-x-[-1]"
        style={{ willChange: "transform", transform: "rotate(-36deg) translateY(-10.32px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
    </>
  );
}
