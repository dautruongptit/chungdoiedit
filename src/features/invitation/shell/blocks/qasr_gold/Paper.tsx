import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={{ backgroundImage: "url(\"/images/themes/qasr-gold/background.webp\")", backgroundSize: "100% auto", backgroundRepeat: "repeat-y", opacity: "0.4" }}></div>
    </>
  );
}
