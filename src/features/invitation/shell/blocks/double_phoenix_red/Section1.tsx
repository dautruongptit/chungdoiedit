import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section1({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="absolute right-[50%] top-[800px] md:top-[1150px] lg:top-[1200px] opacity-10 pointer-events-none z-[5]" style={{ willChange: "transform", backfaceVisibility: "hidden", overflow: "hidden", transform: "translateY(179px)" }}><img alt="Phoenix Line Decoration" className="object-contain h-[850px] md:h-[1594px] lg:h-[1594px] w-auto" src="/images/themes/songphung-red/Phuong line.webp" style={{ objectPosition: "right top", maxWidth: "none", minWidth: "auto" }} /></div>
  );
}
