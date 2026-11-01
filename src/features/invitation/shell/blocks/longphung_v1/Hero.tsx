import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const groom = d.groomNick || "Hoài Nam";
  const bride = d.brideNick || "Ngọc Linh";
  const first = d.order === "bride" ? bride : groom;
  const second = d.order === "bride" ? groom : bride;
  const assets = t.assets || "/images/themes/red-v1";
  const ink = t.ink || "rgb(233, 206, 158)";

  return (
    <header className="relative flex h-[472px] md:h-[650px] flex-col items-center justify-center text-center z-10" style={{ color: ink }}>
      <div className="absolute top-12 md:top-16 flex w-full justify-center gap-8 opacity-[0.15]">
        <img alt="Rồng" className="h-[354px] md:h-[572px] w-auto" src={`${assets}/rong.webp`} />
        <img alt="Phượng" className="h-[354px] md:h-[572px] w-auto" src={`${assets}/phuong.webp`} />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center gap-6 px-6 md:px-10">
        <div className="font-pinyon w-full" style={{ color: ink, fontFamily: '"Pinyon Script", "Great Vibes", ChungDoiIndic, cursive' }}>
          <div className="flex w-full justify-center">
            <span
              className="whitespace-nowrap text-[50px] md:text-[70px] leading-[75px] md:leading-[105px]"
              style={{ fontFamily: '"Pinyon Script", "Great Vibes", ChungDoiIndic, cursive' }}
            >
              {first}
            </span>
          </div>
          <div className="font-ampersand mt-1 text-[37px] md:text-[50px] leading-[56px] md:leading-[75px]" style={{ color: ink }}>&amp;</div>
          <div className="flex w-full justify-center">
            <span
              className="whitespace-nowrap text-[50px] md:text-[70px] leading-[75px] md:leading-[105px]"
              style={{ fontFamily: '"Pinyon Script", "Great Vibes", ChungDoiIndic, cursive' }}
            >
              {second}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
