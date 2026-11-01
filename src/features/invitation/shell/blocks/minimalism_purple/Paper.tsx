import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      <style>{`@keyframes mpFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/themes/minimalism-purple/paper.webp")',
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          mixBlendMode: "multiply",
          opacity: 0.5,
        }}
      />
    </>
  );
}
