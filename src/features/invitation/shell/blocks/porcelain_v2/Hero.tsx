import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const assets = t.assets || "/images/themes/porcelain-v2-green";
  const isRed = assets.includes("red");
  const isPink = assets.includes("pink");

  const textColor = t.ink || (isRed ? "rgb(143, 38, 45)" : isPink ? "rgb(220, 133, 153)" : "rgb(70, 79, 30)");
  const accentColor = t.accent || (isRed ? "rgb(101, 78, 47)" : isPink ? "rgb(119, 110, 56)" : "rgb(188, 155, 99)");

  const groomNick = anyD.groomNick || anyD.groom || (isRed ? "Gia Bảo" : isPink ? "Văn Hoàng" : "Duy Khang");
  const brideNick = anyD.brideNick || anyD.bride || (isRed ? "Khánh Vy" : isPink ? "Mỹ Ngọc" : "Thảo Vy");

  let headerPadding = "pb-[125px] pt-[69px] md:pb-[145px] md:pt-[80px]";
  let frameWidthClass = "w-[80%]";
  let frameInnerClass = "relative z-10 flex aspect-[354/531] flex-col items-center px-[13%] pt-[36.7%] text-center";
  let stdFontSize = "13px";
  let stdLetterSpacing = "0.14em";
  let coupleFontSize = "35px";
  let mtGroom = "mt-[10.9%]";
  let mtAmpersand = "mt-[10.2%]";
  let mtBride = "mt-[10.2%]";

  if (isRed) {
    headerPadding = "pt-[93px] pb-[93px] md:pt-[110px] md:pb-[110px]";
    frameWidthClass = "w-[71.9%]";
    frameInnerClass = "relative z-10 flex aspect-[900/1530] flex-col items-center px-[10%] pt-[39.4%] text-center";
    stdFontSize = "15px";
    coupleFontSize = "35px";
    mtGroom = "mt-[17.8%]";
    mtAmpersand = "mt-[12.4%]";
    mtBride = "mt-[12.4%]";
  } else if (isPink) {
    headerPadding = "pt-[94px] pb-[94px] md:pt-[110px] md:pb-[110px]";
    frameWidthClass = "w-[68%]";
    frameInnerClass = "relative z-10 flex aspect-[831/1491] flex-col items-center px-[10%] pt-[35%] text-center";
    stdFontSize = "13px";
    coupleFontSize = "31px";
    mtGroom = "mt-[12.1%]";
    mtAmpersand = "mt-[11.4%]";
    mtBride = "mt-[11.4%]";
  }

  return (
    <header className={`relative flex w-full flex-col items-center ${headerPadding}`}>
      <div className={`relative ${frameWidthClass} max-w-[354px] md:max-w-[440px]`}>
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-fill"
          src={`${assets}/hero-frame.webp`}
        />
        <div
          className={frameInnerClass}
          style={isPink ? { aspectRatio: "831 / 1487.4" } : undefined}
        >
          <p
            className={`whitespace-pre-line text-[${stdFontSize}] uppercase md:text-[17px]`}
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", ChungDoiIndic, serif',
              fontWeight: "600",
              color: accentColor,
              letterSpacing: stdLetterSpacing,
              fontSize: stdFontSize,
            }}
          >
            Save The Date
          </p>
          <div className={`${mtGroom} flex w-full justify-center`}>
            <span
              className="whitespace-nowrap italic uppercase leading-none"
              style={{
                fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                color: textColor,
                fontSize: coupleFontSize,
              }}
            >
              {groomNick}
            </span>
          </div>
          <span
            aria-hidden="true"
            className={`${mtAmpersand} text-[50px] leading-none md:text-[56px]`}
            style={{
              fontFamily: 'Whisper, "The Nautigal", ChungDoiIndic, cursive',
              color: accentColor,
            }}
          >
            &amp;
          </span>
          <div className={`${mtBride} flex w-full justify-center`}>
            <span
              className="whitespace-nowrap italic uppercase leading-none"
              style={{
                fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                color: textColor,
                fontSize: coupleFontSize,
              }}
            >
              {brideNick}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
