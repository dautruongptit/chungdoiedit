import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"><img alt="" aria-hidden="true" className="absolute left-1/2 top-0 block h-full w-full max-w-none -translate-x-1/2 object-cover" src="/images/themes/royal-v2-green/background.webp" style={{ opacity: "0.4" }} /></div>
    </>
  );
}
