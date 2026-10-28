import { BrownRsvpDialog } from "@/features/invitation/components/BrownRsvpDialog";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function RsvpDialogHost({ ctx }: { ctx: InvitationCtx }) {
  const { rsvpOpen, d, set, setRsvpOpen, t } = ctx;
  return (
    rsvpOpen && <BrownRsvpDialog d={d} set={set} onClose={() => setRsvpOpen(false)} btnBg={t.ink} btnText={t.rsvpBtnText ?? t.line ?? "rgb(222, 217, 215)"} />
  );
}
