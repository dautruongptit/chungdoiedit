import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div className="w-full h-[70px] sm:h-[90px] md:h-[120px]" style={{ backgroundColor: "rgb(124, 21, 26)" }}></div>
    </>
  );
}
