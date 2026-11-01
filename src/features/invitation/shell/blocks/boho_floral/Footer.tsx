import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);
  const d = (ctx.d || {}) as any;

  const thankYou =
    d.thankYouNote || "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!";

  return (
    <footer className="relative flex flex-col items-center px-6 md:px-10 pb-12 md:pb-14 text-center z-10">
      <span
        className="whitespace-pre-line flex flex-col items-center gap-1 text-base md:text-lg mx-auto md:max-w-[560px]"
        style={{
          color: theme.primaryColor,
          fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
        }}
      >
        <span dir="auto">{thankYou}</span>
      </span>
    </footer>
  );
}
