import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 mix-blend-darken" style={{ backgroundImage: "url(\"/images/themes/mahal-gold/paper.webp\")", backgroundSize: "100% auto", backgroundRepeat: "repeat-y", opacity: "0.4" }}></div>
    </>
  );
}
