import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={{ backgroundImage: "url(\"/images/themes/song-hac-red/bg-texture.webp\")", backgroundSize: "441px auto", backgroundRepeat: "repeat", mixBlendMode: "multiply", opacity: "0.6" }}></div>
    </>
  );
}
