import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" style={{ opacity: "0.18", backgroundImage: "url(\"/images/themes/nhat-binh-red/paper.webp\")", backgroundRepeat: "repeat-y", backgroundPosition: "center top", backgroundSize: "100% auto" }}></div>
    </>
  );
}
