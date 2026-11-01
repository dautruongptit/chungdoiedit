import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Paper({ ctx }: { ctx: InvitationCtx }) {
  return (
    <>
      
      <div className="relative z-10 flex w-full justify-center px-4 pt-16 md:pt-20"><p className="whitespace-pre-line text-center uppercase leading-none" style={{ fontFamily: "\"Patrick Hand\", \"Baloo Bhaijaan\", ChungDoiIndic, cursive", color: "rgb(215, 12, 27)", fontWeight: "700", fontSize: "clamp(32px, 9vw, 56px)", letterSpacing: "0.02em" }}>OUR WEDDING</p></div>
    </>
  );
}
