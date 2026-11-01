import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 mix-blend-overlay" style={{ backgroundImage: "url(\"/images/themes/mandap-darkred/background-texture.webp\")", backgroundRepeat: "repeat", backgroundPosition: "left top", backgroundSize: "calc(1.00000 * var(--st-w)) calc(1.44019 * var(--st-w))", opacity: "0.5" }}></div>
    </>
  );
}
