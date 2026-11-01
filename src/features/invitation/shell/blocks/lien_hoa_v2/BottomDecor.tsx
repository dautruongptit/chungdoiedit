import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function BottomDecor({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="pointer-events-none relative z-[1] mt-[-24px] flex w-full justify-center overflow-hidden" style={{ aspectRatio: "441 / 300" }}><img alt="" aria-hidden="true" className="block h-auto mt-[10%] w-[120.63%] max-w-none shrink-0 self-start object-contain" src="/images/themes/lien-hoa-v2-green/flower4-bottom.webp" style={{ display: "none", transform: "scaleX(-1)", filter: "drop-shadow(rgba(18, 77, 0, 0.18) 3px 4px 3px)" }} /></div>
  );
}
