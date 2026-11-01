import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme, str } from "./themeVars";

export function ThankYou({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);
  const d = ctx.d as any;
  const note = str(d.thankYouNote, "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!");

  return (
    <span
      className="whitespace-pre-line flex flex-col items-center gap-1 px-6 text-center text-[11px] md:text-[13px] mx-auto md:max-w-[560px]"
      style={{
        color: theme.goldColor,
        fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
      }}
    >
      <span dir="auto">{note}</span>
    </span>
  );
}
