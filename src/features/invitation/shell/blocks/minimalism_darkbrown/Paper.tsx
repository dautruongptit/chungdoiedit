import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      <style>{`@keyframes dbrFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(var(--dbr-float,-8px))}}`}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: "url(\"/images/themes/minimalism-dark-brown/paper.webp\")", backgroundSize: "666px 1000px", backgroundRepeat: "repeat", backgroundPosition: "left top", mixBlendMode: "multiply", opacity: "0.5" }}></div>
    </>
  );
}
