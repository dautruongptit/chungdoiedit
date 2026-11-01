import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme } from "./themeVars";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `url("${theme.bgImage}")`,
        backgroundSize: "100% auto",
        backgroundRepeat: "repeat",
        backgroundPosition: "left top",
        opacity: 0.65,
      }}
    />
  );
}
