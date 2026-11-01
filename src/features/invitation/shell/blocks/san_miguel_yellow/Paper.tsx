import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 opacity-50" style={{ backgroundImage: "url(\"/images/themes/san-miguel-yellow/paper-background.webp\")", backgroundSize: "100% auto", backgroundRepeat: "repeat-y", backgroundPosition: "left top" }}></div>
    </>
  );
}
