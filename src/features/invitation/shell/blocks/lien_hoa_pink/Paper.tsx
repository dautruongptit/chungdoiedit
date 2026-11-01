import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={{ backgroundImage: "url(\"/images/themes/lien-hoa-pink/hoa-sen-bg.webp\")", backgroundRepeat: "repeat", backgroundSize: "300px auto", opacity: "0.07" }}></div>
    </>
  );
}
