import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 opacity-30" style={{ backgroundImage: "url(\"/images/themes/dried-flower-v2-green/paper.webp\")", backgroundSize: "200.4% auto", backgroundPosition: "left top", backgroundRepeat: "repeat" }}></div>
    </>
  );
}
