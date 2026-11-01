import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function VenueDecor({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);

  if (theme.isPink) {
    return (
      <div
        className="absolute bottom-[100px] -right-[340px] w-[510px] md:w-[660px] -z-10 opacity-[0.18] pointer-events-none"
        style={{ willChange: "transform", transform: "rotate(159deg) translateY(24.75px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_2.webp" />
      </div>
    );
  }

  if (theme.isBrown) {
    return (
      <div
        className="absolute bottom-[100px] -right-[400px] w-[600px] md:w-[780px] -z-10 opacity-[0.2] pointer-events-none"
        style={{ willChange: "transform", transform: "rotate(139deg) translateY(23.67px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/flower_bottom.webp" />
      </div>
    );
  }

  // Green
  return (
    <div
      className="absolute bottom-[100px] -right-[400px] w-[600px] md:w-[780px] -z-10 opacity-[0.2] pointer-events-none"
      style={{ willChange: "transform", transform: "rotate(139deg) translateY(23.22px)" }}
    >
      <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
    </div>
  );
}
