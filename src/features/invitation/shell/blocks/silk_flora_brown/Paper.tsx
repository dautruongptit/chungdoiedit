import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center"><div className="flex flex-col items-center gap-8 md:gap-10 lg:gap-12"><img alt="" aria-hidden="true" className="h-[1100px] md:h-[1700px] lg:h-[2300px] w-auto max-w-none object-contain opacity-[0.1] translate-y-[649px] md:translate-y-[1000px] lg:translate-y-[1300px]" src="/images/themes/silkflora-brown/middle.webp" style={{ marginTop: "59.04px" }} /><img alt="" aria-hidden="true" className="h-[1100px] md:h-[1700px] lg:h-[2300px] w-auto max-w-none object-contain opacity-[0.1] translate-y-[649px] md:translate-y-[1000px] lg:translate-y-[1300px] scale-x-[-1]" src="/images/themes/silkflora-brown/middle.webp" style={{ marginTop: "59.04px" }} /></div></div>
    </>
  );
}
