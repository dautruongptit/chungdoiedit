import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <footer className="relative z-10 flex flex-col items-center px-6 text-center" style={{ marginTop: "calc(0.05215 * var(--st-w))" }}><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[11px] md:text-[15px] mx-auto md:max-w-[560px]" style={{ color: "rgb(156, 115, 85)", fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, ChungDoiIndic, sans-serif", fontWeight: "500" }}><span>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span></span></footer>
  );
}
