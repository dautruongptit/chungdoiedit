import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const anyD = ctx.d as any;
  const groomPhoto = anyD.groomPhoto || ctx.d.photos?.[0] || ctx.heroSrc;
  const bridePhoto = anyD.bridePhoto || ctx.d.photos?.[1] || ctx.heroSrc;

  return (
    <header className="relative isolate z-10"><div className="relative mx-auto w-full max-w-[441px] md:max-w-[620px]"><div style={{ paddingTop: "68px", paddingBottom: "14.29%" }}><p className="whitespace-pre-line text-center text-[15px] md:text-[17px]" style={{ fontFamily: "&quot;EB Garamond&quot;, &quot;Times New Roman&quot;, ChungDoiIndic, serif", fontWeight: "500", color: "rgb(150, 121, 40)", letterSpacing: "0.04em", marginBottom: "10.7%" }}>THE WEDDING OF</p><div className="relative max-w-none" style={{ width: "96.2%", marginLeft: "1.9%" }}><img alt="" aria-hidden="true" className="block w-full max-w-none" src="/images/themes/dried-flower-v2-green/flower.webp" /><div className="absolute left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center" style={{ top: "47.7%", width: "58.19%" }}><div className="flex w-full flex-col items-center" style={{ gap: "30px" }}><div className="flex w-full min-w-0 justify-center"><span className="whitespace-nowrap text-center uppercase leading-tight tracking-[0.02em]" style={{ fontFamily: "&quot;Viaoda Libre&quot;, &quot;Cormorant Garamond&quot;, ChungDoiIndic, serif", color: "rgb(108, 126, 84)", fontSize: "28px" }}>Gia Khánh</span></div><span aria-hidden="true" className="text-[30px] leading-none md:text-[38px]" style={{ fontFamily: "\"Clicker Script\", ChungDoiIndic, cursive", color: "rgb(108, 126, 84)" }}>&amp;</span><div className="flex w-full min-w-0 justify-center"><span className="whitespace-nowrap text-center uppercase leading-tight tracking-[0.02em]" style={{ fontFamily: "&quot;Viaoda Libre&quot;, &quot;Cormorant Garamond&quot;, ChungDoiIndic, serif", color: "rgb(108, 126, 84)", fontSize: "28px" }}>Ngọc Hân</span></div></div></div></div></div></div></header>
  );
}
