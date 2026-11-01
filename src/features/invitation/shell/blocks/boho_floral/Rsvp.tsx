import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Rsvp({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);

  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center w-full my-8 md:my-10"
      data-landing-screenshot-id="invite-rsvp"
    >
      <button
        type="button"
        onClick={() => ctx.setRsvpOpen(true)}
        className="inline-flex items-center justify-center rounded-[10px] px-6 py-2 font-semibold transition-transform hover:scale-[1.03]"
        style={{
          backgroundColor: theme.primaryColor,
          color: "rgb(255, 250, 247)",
          fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
        }}
      >
        <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">
          <span dir="auto">XÁC NHẬN THAM DỰ</span>
        </span>
      </button>
    </div>
  );
}
