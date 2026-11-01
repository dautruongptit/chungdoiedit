import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return <style>{`@keyframes hkFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}@media(prefers-reduced-motion:reduce){.hk-float{animation:none!important}}`}</style>;
}
