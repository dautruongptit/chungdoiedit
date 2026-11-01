import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0" style={{ opacity: "0.06" }}><img alt="" className="w-full" src="/images/themes/longphung-v2-red/rong-phuong.webp" /></div>
    </>
  );
}
