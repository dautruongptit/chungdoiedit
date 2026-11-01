import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section3({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="absolute left-[50%] top-[1050px] md:top-[1200px] lg:top-[1250px] opacity-10 pointer-events-none z-[5]" style={{ willChange: "transform", backfaceVisibility: "hidden", overflow: "hidden", transform: "translateY(250.6px) scaleX(-1)" }}><img alt="Flower Decoration" className="object-contain h-[390px] md:h-[731px] lg:h-[731px] w-auto" src="/images/themes/songphung-green/HOA.webp" style={{ objectPosition: "left top", maxWidth: "none", minWidth: "auto" }} /></div>
  );
}
