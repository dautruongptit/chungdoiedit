import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Family({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const assets = t.assets || "/images/themes/porcelain-v2-green";
  const isRed = assets.includes("red");
  const isPink = assets.includes("pink");

  const textColor = t.ink || (isRed ? "rgb(143, 38, 45)" : isPink ? "rgb(220, 133, 153)" : "rgb(70, 79, 30)");
  const accentColor = t.accent || (isRed ? "rgb(101, 78, 47)" : isPink ? "rgb(119, 110, 56)" : "rgb(188, 155, 99)");
  const cardBg = "rgb(254, 250, 240)";

  const groomFull = anyD.groomFull || "Nguyễn Duy Khang";
  const brideFull = anyD.brideFull || "Trần Thảo Vy";
  const groomOrder = anyD.groomOrder || "Trưởng Nam";
  const brideOrder = anyD.brideOrder || "Út Nữ";

  const groomFamTitle = anyD.groomFamTitle || "Ông Bà";
  const brideFamTitle = anyD.brideFamTitle || "Ông Bà";
  const groomFather = anyD.groomFather || "Nguyễn Đình Trọng";
  const groomMother = anyD.groomMother || "Phan Thị Kim Loan";
  const groomAddress = anyD.groomAddress || "Tổ 4, phường Lộc Sơn,\nthành phố Bảo Lộc, tỉnh Lâm Đồng";

  const brideFather = anyD.brideFather || "Trần Hữu Nghĩa";
  const brideMother = anyD.brideMother || "Đỗ Thị Mai Trâm";
  const brideAddress = anyD.brideAddress || "Thôn Đambri, xã Đambri,\nthành phố Bảo Lộc, tỉnh Lâm Đồng";

  const ceremonyTime = anyD.ceremonyTime || "09:30";
  const ceremonyDayOfWeek = anyD.ceremonyDayOfWeek || "THỨ BẢY";
  const ceremonyDay = anyD.ceremonyDay || 14;
  const ceremonyMonth = anyD.ceremonyMonth || 11;
  const ceremonyYear = anyD.ceremonyYear || 2026;
  const ceremonyLunar = anyD.ceremonyLunar || "( Tức ngày 6 tháng 10 năm Bính Ngọ)";

  // Flower styling for Family section
  let flower1Style: React.CSSProperties = {
    left: "-22.3%",
    top: "28.7%",
    width: "33.9%",
    aspectRatio: "124.245 / 256",
  };
  let flower2Style: React.CSSProperties = {
    left: "89.8%",
    top: "59.8%",
    width: "33.9%",
    aspectRatio: "124.245 / 256",
    transform: "scaleX(-1)",
  };

  if (isRed) {
    flower1Style = {
      left: "-101.4px",
      top: "25.4%",
      width: "146.9px",
      height: "195.8px",
      transform: "scaleX(-1)",
    };
    flower2Style = {
      left: "83.0%",
      top: "69.5%",
      width: "146.9px",
      height: "195.8px",
    };
  } else if (isPink) {
    flower1Style = {
      left: "-91.2px",
      top: "183.1px",
      width: "145.3px",
      height: "279.7px",
    };
    flower2Style = {
      left: "254.6px",
      top: "428.9px",
      width: "145.3px",
      height: "279.7px",
      transform: "scaleX(-1)",
    };
  }

  const coupleFontSize = isRed ? "40px" : isPink ? "35px" : "30px";
  const ampersandFont = isRed || isPink ? "Ms Madi, ChungDoiIndic, cursive" : 'Parisienne, "The Nautigal", ChungDoiIndic, cursive';

  return (
    <section
      className="relative isolate mx-auto w-[83%] max-w-[420px] border-[1.5px] md:max-w-[560px] "
      style={{
        backgroundColor: cardBg,
        borderColor: isPink ? accentColor : textColor,
        borderRadius: "13px",
        boxShadow: "rgba(0, 0, 0, 0.25) 4px 4px 2px",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-6 px-5 py-8 md:gap-8 md:px-8 md:py-10">
        <h2
          className="uppercase text-center relative z-10"
          style={{
            color: textColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: "700",
          }}
        >
          <span className="text-[20px] md:text-[24px]">
            <span>THÔNG TIN LỄ&nbsp;CƯỚI</span>
          </span>
        </h2>

        <div
          className="relative grid grid-cols-[1fr_auto_1fr] w-full justify-center gap-x-[14px] text-center grid-rows-[repeat(4,auto)] gap-y-[3px]"
          style={{
            color: textColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <div className="row-span-4 grid grid-rows-subgrid min-w-0 justify-items-center">
            <span className="text-[12px]" style={{ color: accentColor }}>
              <span>{groomFamTitle}</span>
            </span>
            <span
              className="text-[12px] font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: textColor, fontSize: "12px" }}
            >
              <span>{groomFather}</span>
            </span>
            <span
              className="text-[12px] font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: textColor, fontSize: "12px" }}
            >
              <span>{groomMother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 flex w-full flex-col whitespace-pre-line text-[9px] leading-tight md:text-[11px]"
              style={{
                color: accentColor,
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
              }}
            >
              <span>{groomAddress}</span>
            </div>
          </div>

          <div
            className="row-span-4 self-center h-[50px] w-[1px] shrink-0"
            style={{ backgroundColor: isPink ? accentColor : textColor }}
          />

          <div className="row-span-4 grid grid-rows-subgrid min-w-0 justify-items-center">
            <span className="text-[12px]" style={{ color: accentColor }}>
              <span>{brideFamTitle}</span>
            </span>
            <span
              className="text-[12px] font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: textColor, fontSize: "12px" }}
            >
              <span>{brideFather}</span>
            </span>
            <span
              className="text-[12px] font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: textColor, fontSize: "12px" }}
            >
              <span>{brideMother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 flex w-full flex-col whitespace-pre-line text-[9px] leading-tight md:text-[11px]"
              style={{
                color: accentColor,
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
              }}
            >
              <span>{brideAddress}</span>
            </div>
          </div>
        </div>

        <div
          className="relative flex flex-col gap-[3px] text-center text-[16px] md:text-[20px] mx-auto md:max-w-[560px]"
          style={{
            whiteSpace: "pre-line",
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            color: textColor,
          }}
        >
          <span>TRÂN TRỌNG BÁO TIN{"\n"}LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</span>
        </div>

        <div className="w-full min-w-0 relative flex w-full min-w-0 flex-col items-center text-center gap-3 md:gap-4">
          <h3
            className="w-[80%] min-h-[80px] flex items-center justify-center leading-[50px] md:leading-[58px] whitespace-nowrap"
            style={{
              fontSize: coupleFontSize,
              fontFamily: 'Carattere, "The Nautigal", ChungDoiIndic, cursive',
              color: textColor,
              fontWeight: 400,
            }}
          >
            {groomFull}
          </h3>
          <div
            className="text-[10px] uppercase"
            style={{
              color: accentColor,
              fontFamily: "Uchen, Baskerville, ChungDoiIndic, serif",
              letterSpacing: "0.14em",
            }}
          >
            <span>{groomOrder}</span>
          </div>
          <div
            className="text-[35px] leading-none"
            style={{
              color: textColor,
              fontFamily: ampersandFont,
            }}
          >
            &amp;
          </div>
          <h3
            className="w-[80%] min-h-[80px] flex items-center justify-center leading-[50px] md:leading-[58px] whitespace-nowrap"
            style={{
              fontSize: coupleFontSize,
              fontFamily: 'Carattere, "The Nautigal", ChungDoiIndic, cursive',
              color: textColor,
              fontWeight: 400,
            }}
          >
            {brideFull}
          </h3>
          <div
            className="text-[10px] uppercase"
            style={{
              color: accentColor,
              fontFamily: "Uchen, Baskerville, ChungDoiIndic, serif",
              letterSpacing: "0.14em",
            }}
          >
            <span>{brideOrder}</span>
          </div>
        </div>

        <div
          className="relative flex flex-col items-center gap-[6px] text-center"
          style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
        >
          <div style={{ color: accentColor }}>
            {isRed ? (
              <span className="whitespace-pre-line mx-auto block max-w-[min(53vw,264px)] md:max-w-[370px] uppercase font-normal text-[16px] md:text-[20px] text-center">
                LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI{"\n"}TƯ&nbsp;GIA
              </span>
            ) : (
              <span className="whitespace-pre-line font-normal text-[16px] md:text-[20px] whitespace-pre-line text-center uppercase">
                LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI{"\n"}TƯ&nbsp;GIA
              </span>
            )}
          </div>
          <div
            className="flex items-center justify-center gap-[15px] text-[12px] md:text-[14px] uppercase whitespace-nowrap min-w-max"
            style={{
              color: accentColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span>VÀO LÚC {ceremonyTime}</span>
            <span>
              <span>{ceremonyDayOfWeek}</span>
            </span>
          </div>
          <div
            className="flex items-center justify-center gap-[9px]"
            style={{ color: textColor }}
          >
            <span
              className="text-[52px] md:text-[57px] leading-none"
              style={{
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                color: textColor,
              }}
            >
              {ceremonyDay}
            </span>
            <div className="h-[46px] w-px" style={{ backgroundColor: textColor }} />
            <div className="flex flex-col items-start justify-center gap-1 text-left">
              <span
                className="text-[16px] md:text-[17px] uppercase"
                style={{
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  color: textColor,
                }}
              >
                <span>THÁNG {ceremonyMonth}</span>
              </span>
              <span
                className="text-[16px] md:text-[17px] uppercase"
                style={{
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  color: textColor,
                }}
              >
                {ceremonyYear}
              </span>
            </div>
          </div>
          <div
            className={isRed ? "mx-auto max-w-[76%] text-xs md:text-sm uppercase tracking-[0.12em]" : "text-xs md:text-sm uppercase tracking-[0.12em]"}
            style={{
              color: accentColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            {ceremonyLunar}
          </div>
        </div>
      </div>

      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute h-auto max-w-none z-[2]"
        src={`${assets}/flower.webp`}
        style={flower1Style}
      />
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute h-auto max-w-none z-[2]"
        src={`${assets}/flower.webp`}
        style={flower2Style}
      />
    </section>
  );
}
