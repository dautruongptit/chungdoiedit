import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section1({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center md:hidden"><img alt="" aria-hidden="true" className="w-[563px] h-auto max-w-none object-contain opacity-[0.1] translate-y-[30%]" src="/images/themes/silkflora-brown/bottom.webp" /></div>
  );
}
