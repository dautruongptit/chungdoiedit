import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const anyD = ctx.d as any;
  const groomPhoto = anyD.groomPhoto || ctx.d.photos?.[0] || ctx.heroSrc;
  const bridePhoto = anyD.bridePhoto || ctx.d.photos?.[1] || ctx.heroSrc;

  return (
    <header className="relative w-full flex justify-center pt-16 pb-8 md:pt-24 md:pb-12"><div className="relative w-[70%] ml-[2vw] md:ml-[1vw]"><img alt="" aria-hidden="true" className="w-full h-auto block" src="/images/themes/moclan-white/khung-hoa.webp" /><div className="absolute left-0 right-0 flex flex-col items-center text-center w-full -translate-x-[2vw] md:-translate-x-[1vw]" style={{ color: "rgb(64, 74, 29)", top: "12%" }}><div className="flex flex-col items-center gap-0 -translate-y-[35px] md:-translate-y-[40px] whitespace-pre-line text-center" style={{ fontFamily: "Baskerville, &quot;Times New Roman&quot;, ChungDoiIndic, serif", fontSize: "clamp(9px, 2.4vw, 15px)", letterSpacing: "0.25em", lineHeight: "1.6", opacity: "0.75" }}>THE
WEDDING
OF</div><div className="mt-[4%] w-full flex flex-col items-center text-center -translate-y-[35px] md:-translate-y-[40px]" style={{ fontFamily: "&quot;The Nautigal&quot;, ChungDoiIndic, cursive" }}><div className="flex w-[80%] justify-center"><span className="whitespace-nowrap" style={{ fontSize: "58px", lineHeight: "1.45" }}>Văn Long</span></div><div style={{ fontSize: "42px", lineHeight: "1.3" }}>&amp;</div><div className="flex w-[80%] justify-center"><span className="whitespace-nowrap" style={{ fontSize: "58px", lineHeight: "1.45" }}>Thu Hà</span></div></div></div></div></header>
  );
}
