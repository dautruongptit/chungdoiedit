import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div className="absolute top-0 pointer-events-none z-0 overflow-hidden w-[260px] md:w-[520px] lg:w-[585px]" style={{ right: "50%", willChange: "transform", transform: "translateY(55.68px)" }}><img alt="" aria-hidden="true" className="w-full h-auto block" src="/images/themes/moclan-white/hoa.webp" style={{ opacity: "0.3", transform: "scaleX(-1) scaleY(-1)" }} /></div>
    </>
  );
}
