import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      <style>{`@keyframes sfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}`}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: "url(\"/images/themes/sunflower/paper.webp\")", backgroundSize: "811px 811px", backgroundRepeat: "repeat", backgroundPosition: "left top", opacity: "0.2" }}></div>
    </>
  );
}
