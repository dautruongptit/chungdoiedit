import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      <style>{`@keyframes mgFloatG{0%,100%{transform:translate(-50%,0) rotate(9.59deg)}50%{transform:translate(-50%,-8px) rotate(9.59deg)}}@keyframes mgFloatB{0%,100%{transform:translate(-50%,0) rotate(-12.55deg)}50%{transform:translate(-50%,-8px) rotate(-12.55deg)}}`}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: "url(\"/images/themes/minimalism-green/paper.webp\")", backgroundSize: "100% auto", backgroundPosition: "left top", mixBlendMode: "multiply", opacity: "0.5" }}></div>
    </>
  );
}
