import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme } from "./themeVars";

export function BottomDecor({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);

  return (
    <div className="pointer-events-none relative bottom-[-45px] z-[1] flex w-full justify-center">
      <img
        alt=""
        aria-hidden="true"
        className={`block h-auto ${theme.bottomDecorWidth} max-w-none shrink-0 object-contain`}
        loading="lazy"
        decoding="async"
        src={theme.goldenLine}
        style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}
      />
    </div>
  );
}
