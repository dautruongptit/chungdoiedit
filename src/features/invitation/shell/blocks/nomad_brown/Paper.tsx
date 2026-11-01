import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={{ backgroundImage: "url(\"/images/themes/nomad-brown/paper-texture.webp\")", backgroundRepeat: "repeat", backgroundPosition: "left top", backgroundSize: "calc(1.00288 * var(--st-w)) calc(1.78195 * var(--st-w))", opacity: "0.7" }}></div>
    </>
  );
}
