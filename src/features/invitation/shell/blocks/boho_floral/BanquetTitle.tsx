import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function BanquetTitle({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);

  return (
    <h2
      className="text-center uppercase mt-10 md:mt-12 mb-6 md:mb-8 px-4"
      style={{
        color: theme.primaryColor,
        fontFamily: '"Times New Roman", ChungDoiIndic, serif',
        fontSize: "24px",
        fontWeight: 700,
        letterSpacing: "1px",
      }}
    >
      <span dir="auto">THÔNG TIN TIỆC&nbsp;CƯỚI</span>
    </h2>
  );
}
