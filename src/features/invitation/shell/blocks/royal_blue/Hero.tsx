import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const anyD = ctx.d as any;
  const groomPhoto = anyD.groomPhoto || ctx.d.photos?.[0] || ctx.heroSrc;
  const bridePhoto = anyD.bridePhoto || ctx.d.photos?.[1] || ctx.heroSrc;

  return (
    <header className="relative z-10 flex flex-col items-center text-center pb-[83px] md:pb-[146px]" style={{ paddingTop: "clamp(208px, 43vw, 358px)", color: "rgb(225, 188, 124)" }}><div className="whitespace-pre-line" style={{ fontFamily: "Baskerville, &quot;Times New Roman&quot;, ChungDoiIndic, serif", fontSize: "clamp(13px, 2.2vw, 18px)", letterSpacing: "0.25em", opacity: "0.85" }}>THE WEDDING OF</div><div className="mt-[4%] w-full" style={{ fontFamily: "&quot;The Nautigal&quot;, ChungDoiIndic, cursive" }}><div style={{ fontSize: "clamp(57px, 11.8vw, 107px)", lineHeight: "1.45" }}>Thế Bảo</div><div style={{ fontFamily: "Baskerville, &quot;Times New Roman&quot;, ChungDoiIndic, serif", fontSize: "clamp(29px, 6vw, 53px)", lineHeight: "1.3" }}>&amp;</div><div style={{ fontSize: "clamp(57px, 11.8vw, 107px)", lineHeight: "1.45" }}>Ngọc Ánh</div></div></header>
  );
}
