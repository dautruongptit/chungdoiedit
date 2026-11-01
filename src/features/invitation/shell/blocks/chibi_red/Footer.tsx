import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="pb-10 md:pb-12 text-center"><span className="whitespace-pre-line flex flex-col items-center gap-1 text-[16px] md:text-[20px] lg:text-[24px] max-w-[320px] lg:max-w-[460px] mx-auto md:max-w-[560px]" style={{ fontFamily: "&quot;Playfair Display&quot;, Georgia, ChungDoiIndic, serif" }}><span className="flex flex-col items-center"><span lang="vi">Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!</span><span lang="zh-Hant" className=" text-[0.85em] opacity-70">您的蒞臨是我們最大的榮幸！</span></span></span></div>
  );
}
