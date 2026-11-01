import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function BottomDecor({ ctx }: { ctx: InvitationCtx }) {
  return (
    <img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[56.2%] z-10 w-[135%] max-w-none object-contain" src="/images/themes/minimalism-purple/flowerbottom-decoration.webp" style={{ transform: "translate(-50%, 33.5%) rotate(180deg)" }} />
  );
}
