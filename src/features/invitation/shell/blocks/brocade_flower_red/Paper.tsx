import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={{ backgroundImage: "url(\"/images/themes/brocade-flower-red/tile-background.webp\")", backgroundRepeat: "repeat", backgroundSize: "140% auto", backgroundPosition: "center top", opacity: "0.12", mixBlendMode: "multiply" }}></div>
    </>
  );
}
