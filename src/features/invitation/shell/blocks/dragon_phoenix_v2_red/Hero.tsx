import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const anyD = ctx.d as any;
  const groomPhoto = anyD.groomPhoto || ctx.d.photos?.[0] || ctx.heroSrc;
  const bridePhoto = anyD.bridePhoto || ctx.d.photos?.[1] || ctx.heroSrc;

  return (
    <header className="relative flex flex-col items-center justify-center text-center z-10 pt-16 pb-8"><div className="w-full flex items-center justify-center py-3 md:py-4 mb-8" style={{ backgroundColor: "rgb(255, 227, 177)" }}><img alt="Chữ Hỷ" className="w-[32px] md:w-[48px] h-[32px] md:h-[48px] object-contain" src="/images/themes/longphung-v2-red/chu-hy.webp" /></div><div className="flex flex-col items-center gap-0" style={{ color: "rgb(255, 227, 177)", fontFamily: "&quot;The Nautigal&quot;, ChungDoiIndic, cursive" }}><div className="text-[50px] md:text-[60px] leading-[1.2]">Trung Hiếu</div><div className="text-[38px] md:text-[45px] leading-[1.2]">&amp;</div><div className="text-[50px] md:text-[60px] leading-[1.2]">Minh Nguyệt</div></div><div className="relative flex items-start justify-center gap-2 md:gap-4 mt-8 w-full max-w-[420px] md:max-w-[520px]"><div className="w-[160px] md:w-[220px] h-[240px] md:h-[330px]" style={{ willChange: "transform", transform: "translateY(-43.32px)" }}><img alt="Phượng" className="w-full h-full object-contain" src="/images/themes/longphung-v2-red/phuong.webp" /></div><div className="w-[170px] md:w-[230px] h-[240px] md:h-[330px] mt-8 md:mt-12" style={{ willChange: "transform", transform: "translateY(21.66px)" }}><img alt="Rồng" className="w-full h-full object-contain" src="/images/themes/longphung-v2-red/rong.webp" /></div></div></header>
  );
}
