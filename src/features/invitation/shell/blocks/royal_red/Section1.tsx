import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section1({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="absolute pointer-events-none z-[1] top-0" style={{ left: "50%", transform: "translateX(-50%) translateY(-50%)", width: "90%" }}><img alt="" aria-hidden="true" className="w-full h-auto block" src="/images/themes/royal-red/flower.webp" /></div>
  );
}
