import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: "url(\"/images/themes/royal-v2-purple/background.webp\")", backgroundRepeat: "repeat", backgroundSize: "685px 685px", backgroundPosition: "left top", opacity: "0.4" }}></div>
    </>
  );
}
