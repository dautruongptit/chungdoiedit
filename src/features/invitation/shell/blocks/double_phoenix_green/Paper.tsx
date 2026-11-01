import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "url(\"/images/themes/songphung-green/NENGIAY.jpg\")", backgroundSize: "100% auto", backgroundRepeat: "repeat-y", backgroundPosition: "center top", opacity: "0.3" }}></div>
    </>
  );
}
