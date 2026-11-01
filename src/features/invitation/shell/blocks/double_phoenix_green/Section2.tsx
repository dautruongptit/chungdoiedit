import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Section2({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="absolute left-[50%] top-[2000px] md:top-[2050px] lg:top-[2100px] opacity-10 pointer-events-none z-[5]" style={{ willChange: "transform", backfaceVisibility: "hidden", overflow: "hidden", transform: "translateY(179px) scaleX(-1)" }}><img alt="Phoenix Line Decoration Symmetric" className="object-contain h-[850px] md:h-[1594px] lg:h-[1594px] w-auto" src="/images/themes/songphung-green/Phuong line.webp" style={{ objectPosition: "left top", maxWidth: "none", minWidth: "auto" }} /></div>
  );
}
