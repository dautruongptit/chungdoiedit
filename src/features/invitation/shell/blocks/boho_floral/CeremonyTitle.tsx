import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function CeremonyTitle({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);

  const mtClass = theme.isPink
    ? "mt-10 md:mt-[228px]"
    : theme.isGreen
    ? "mt-10 md:mt-[148px]"
    : "mt-10 md:mt-12";

  return (
    <h2
      className={`text-center uppercase ${mtClass} mb-6 md:mb-8 px-4`}
      style={{
        color: theme.primaryColor,
        fontFamily: '"Times New Roman", ChungDoiIndic, serif',
        fontSize: "24px",
        fontWeight: 700,
        letterSpacing: "1px",
      }}
    >
      <span dir="auto">THÔNG TIN LỄ&nbsp;CƯỚI</span>
    </h2>
  );
}
