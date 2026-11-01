import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: "url(\"/images/themes/porcelain-blue/floral-tile.webp\")", backgroundSize: "441px 441px", backgroundRepeat: "repeat", backgroundPosition: "left top", mixBlendMode: "multiply" }}></div>
    </>
  );
}
