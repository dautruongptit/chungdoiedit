import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: "url(\"/images/themes/porcelain-brown/floral-tile.webp\")", backgroundSize: "627px 627px", backgroundRepeat: "repeat", backgroundPosition: "left top" }}></div>
    </>
  );
}
