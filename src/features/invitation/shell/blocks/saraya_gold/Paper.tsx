import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"><div className="absolute inset-0" style={{ backgroundColor: "rgb(249, 241, 230)" }}></div><div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url(\"/images/themes/saraya-gold/arab-pattern.webp\")", backgroundSize: "441px 441px", backgroundRepeat: "repeat" }}></div><div className="absolute inset-0 opacity-40 mix-blend-darken" style={{ backgroundImage: "url(\"/images/themes/saraya-gold/arab-pattern2.webp\")", backgroundSize: "620px 620px", backgroundRepeat: "repeat" }}></div><img alt="" className="absolute left-1/2 -translate-x-1/2 top-[120px] w-[300%] max-w-none h-auto object-contain opacity-[0.15]" src="/images/themes/saraya-gold/castle-background.webp" /><img alt="" className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[300%] max-w-none h-auto object-contain opacity-[0.15]" src="/images/themes/saraya-gold/castle-background.webp" /></div>
    </>
  );
}
