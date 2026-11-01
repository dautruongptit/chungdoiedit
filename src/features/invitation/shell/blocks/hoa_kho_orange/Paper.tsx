import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: "url(\"/images/themes/hoa-kho-orange/paper.webp\")", backgroundSize: "752px 752px", backgroundRepeat: "repeat", backgroundPosition: "left top", opacity: "0.35" }}></div>
    </>
  );
}
