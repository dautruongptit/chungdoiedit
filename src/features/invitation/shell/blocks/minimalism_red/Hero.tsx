import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const anyD = ctx.d as any;
  const groomPhoto = anyD.groomPhoto || ctx.d.photos?.[0] || ctx.heroSrc;
  const bridePhoto = anyD.bridePhoto || ctx.d.photos?.[1] || ctx.heroSrc;

  return (
    <header className="relative flex flex-col z-10 pt-0 pb-8 md:pb-12"><div className="w-full flex justify-center mt-24 md:mt-32 mb-[114px] md:mb-[146px]"><img alt="Header decoration" className="w-[310px] md:w-[580px] lg:w-[620px] h-auto" src="/images/themes/minimalism-red/header-top-01.png" /></div><div className="relative z-10 flex flex-col items-start gap-0 mb-0 pl-[20%] md:pl-[25%] lg:pl-[28%] mt-[15px] md:mt-[85px]" style={{ color: "rgb(0, 0, 0)", fontFamily: "&quot;The Nautigal&quot;, ChungDoiIndic, cursive" }}><div className="flex flex-col items-center gap-0"><div className="text-[65px] md:text-[91px] leading-[72px] md:leading-[100px]">Đức Anh</div><div className="text-[48px] md:text-[65px] leading-[56px] md:leading-[72px]">&amp;</div><div className="text-[65px] md:text-[91px] leading-[72px] md:leading-[100px]">Thanh Mai</div></div></div><div className="w-full flex justify-center pb-[50px] md:pb-[75px] md:-mt-[70px]"><img alt="Header bottom decoration" className="w-[310px] md:w-[580px] lg:w-[620px] h-auto" src="/images/themes/minimalism-red/header-bottom-01.png" style={{ transform: "scaleX(-1)" }} /></div></header>
  );
}
