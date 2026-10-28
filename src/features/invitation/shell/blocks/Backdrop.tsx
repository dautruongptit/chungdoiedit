import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Backdrop({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  return (
    <><style>{`@keyframes mbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style><div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{"backgroundImage":`url("${t.assets}/paper.webp")`,"backgroundSize":"100% auto","backgroundPosition":"center top","mixBlendMode":"multiply","opacity":"0.4"}}></div></>
  );
}
