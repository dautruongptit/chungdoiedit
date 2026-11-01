import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { str } from "./themeVars";

export function RsvpAction({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const rawLabel = str(d.rsvpButton, "XÁC NHẬN THAM DỰ");
  const label = rawLabel === "XÁC NHẬN" ? "XÁC NHẬN THAM DỰ" : rawLabel;

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center" data-landing-screenshot-id="invite-rsvp">
      <button
        type="button"
        onClick={() => ctx.setRsvpOpen(true)}
        className="inline-flex items-center justify-center rounded-full px-8 py-1.5 text-[13px] transition-transform hover:scale-[1.03]"
        style={{
          backgroundColor: "rgb(255, 223, 175)",
          color: "rgb(81, 20, 25)",
          fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
        }}
      >
        <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">
          <span dir="auto">{label}</span>
        </span>
      </button>
    </div>
  );
}
