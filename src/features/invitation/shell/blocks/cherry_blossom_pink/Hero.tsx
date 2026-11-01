import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const anyD = ctx.d as any;
  const groomPhoto = anyD.groomPhoto || ctx.d.photos?.[0] || ctx.heroSrc;
  const bridePhoto = anyD.bridePhoto || ctx.d.photos?.[1] || ctx.heroSrc;

  return (
    <header className="relative flex flex-col items-center justify-center text-center z-10 px-6 md:px-10 pb-12 md:pb-16 pt-0 md:-mt-[200px] lg:-mt-[200px]"><div className="absolute -top-[400px] md:-top-[896px] lg:-top-[896px] right-[8.5vw] md:right-[5vw] lg:right-[32px] z-20"><div className="rotate-[11.447deg]"><div className="w-[66vw] md:w-[47vw] lg:w-[340px] h-[88vw] md:h-[62vw] lg:h-[448px] border-[2.8vw] md:border-[2vw] lg:border-[14px] border-white shadow-2xl overflow-hidden bg-white"><img alt="Wedding photo" className="w-full h-full object-cover" src={groomPhoto} /></div></div></div><div className="relative z-10 flex flex-col items-center gap-0" style={{ color: "rgb(186, 74, 89)", fontFamily: "&quot;The Nautigal&quot;, ChungDoiIndic, cursive" }}><div className="text-[65px] md:text-[91px]"><div className="text-[65px] md:text-[91px] leading-[98px] md:leading-[137px]">Trung Hiếu</div><div className="mt-1 text-[48px] md:text-[65px] leading-[72px] md:leading-[98px]">&amp;</div><div className="text-[65px] md:text-[91px] leading-[98px] md:leading-[137px]">Như Ý</div></div></div></header>
  );
}
