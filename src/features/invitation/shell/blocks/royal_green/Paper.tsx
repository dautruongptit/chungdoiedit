import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden"><img alt="" aria-hidden="true" className="absolute top-0 h-auto block" src="/images/themes/royal-green/background.webp" style={{ opacity: "0.3", left: "50%", transform: "translateX(-50%)", minWidth: "130%", width: "130%" }} /></div>
    </>
  );
}
