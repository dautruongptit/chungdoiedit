import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}

export function Family({ ctx }: { ctx: InvitationCtx }) {
  const vars = getSongHyTheme(ctx);
  const d = (ctx.d || {}) as any;

  const groomFather = toStr(d.groomFather, "Võ Nhật Minh");
  const groomMother = toStr(d.groomMother, "Trần Thu Thảo");
  const groomAddress = toStr(d.groomAddress, "63 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh");

  const brideFather = toStr(d.brideFather, "Huỳnh Thanh Nam");
  const brideMother = toStr(d.brideMother, "Nguyễn Thị Kim Oanh");
  const brideAddress = toStr(d.brideAddress, "456 Lê Lợi, Quận 3, TP. Hồ Chí Minh");

  const announcementText = toStr(
    d.customAnnouncementText,
    "TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"
  );

  const groomFullName = toStr(d.groomFullName || d.groomFull, "Võ Hải Nam");
  const brideFullName = toStr(d.brideFullName || d.brideFull, "Huỳnh Khánh Linh");
  const groomBirthOrder = toStr(d.groomBirthOrder || d.groomOrder, "Trưởng Nam");
  const brideBirthOrder = toStr(d.brideBirthOrder || d.brideOrder, "Út Nữ");

  const ceremonyHeader = toStr(
    d.ceremonyHeader,
    "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ\u00A0GIA"
  );
  const ceremonyTime = toStr(d.ceremonyTime, "09:00");
  const ceremonyDate = toStr(d.ceremonyDate, "2026-07-30");

  const cParts = String(ceremonyDate).split(/[-/]/);
  const cYear = Number(cParts[0]) || 2026;
  const cMonth = Number(cParts[1]) || 7;
  const cDay = Number(cParts[2]) || 30;
  const dateObj = new Date(cYear, cMonth - 1, cDay);

  const day = String(cDay).padStart(2, "0");
  const month = String(cMonth).padStart(2, "0");
  const year = String(cYear);
  const WEEKDAYS = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];
  const dayOfWeek = WEEKDAYS[dateObj.getDay()] || "THỨ NĂM";

  const lunarRaw = d.ceremonyLunar || "Tức ngày 17 tháng 6 năm Bính\u00A0Ngọ";
  const lunarClean = lunarRaw.replace(/^\(\s*/, "").replace(/\)$/, "");

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: vars.paperColor }}
    >
      <div className="relative z-10">
        <div
          className="w-full grid grid-cols-[1fr_auto_1fr] justify-center gap-x-3 md:gap-x-8 mt-6 px-2 sm:px-4 grid-rows-[repeat(4,auto)] gap-y-1"
          style={{
            color: vars.primaryColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <div className="row-span-4 grid grid-rows-subgrid justify-items-center justify-self-center min-w-0 text-center max-w-[160px] md:max-w-[280px]">
            <span className="text-[14px] md:text-[15px]" style={{ color: vars.grayColor }}>
              <span dir="auto">Ông Bà</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere] text-[14px] md:text-[15px]"
              style={{ color: vars.primaryColor }}
            >
              <span dir="auto">{groomFather}</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere] text-[14px] md:text-[15px]"
              style={{ color: vars.primaryColor }}
            >
              <span dir="auto">{groomMother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] text-[12px] md:text-[13px] mt-1 whitespace-pre-line leading-tight flex flex-col"
              style={{ color: vars.grayColor }}
            >
              <span dir="auto">{groomAddress}</span>
            </div>
          </div>

          <div
            className="row-span-4 w-[1px] h-[60px] self-center"
            style={{ backgroundColor: vars.primaryColor }}
          />

          <div className="row-span-4 grid grid-rows-subgrid justify-items-center justify-self-center min-w-0 text-center max-w-[160px] md:max-w-[280px]">
            <span className="text-[14px] md:text-[15px]" style={{ color: vars.grayColor }}>
              <span dir="auto">Ông Bà</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere] text-[14px] md:text-[15px]"
              style={{ color: vars.primaryColor }}
            >
              <span dir="auto">{brideFather}</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere] text-[14px] md:text-[15px]"
              style={{ color: vars.primaryColor }}
            >
              <span dir="auto">{brideMother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] text-[12px] md:text-[13px] mt-1 whitespace-pre-line leading-tight flex flex-col"
              style={{ color: vars.grayColor }}
            >
              <span dir="auto">{brideAddress}</span>
            </div>
          </div>
        </div>

        <div
          className="text-center text-[16px] md:text-[20px] uppercase tracking-wider mt-8 px-4 flex flex-col gap-2 mx-auto md:max-w-[560px]"
          style={{
            whiteSpace: "pre-line",
            color: vars.primaryColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">{announcementText}</span>
        </div>

        <div
          data-showcase-keep=""
          className="w-full min-w-0 relative flex flex-col items-center text-center gap-3 md:gap-4 mt-4 mb-6"
        >
          <h3
            className={`font-eb-garamond w-[80%] flex items-center justify-center leading-[50px] md:leading-[100px] whitespace-nowrap ${vars.fullNameFontSizeClass || ""}`}
            style={{
              fontSize: vars.fullNameFontSizeClass ? undefined : vars.fullNameFontSize,
              color: vars.primaryColor,
              fontFamily: '"EB Garamond", serif',
              fontWeight: 400,
            }}
          >
            {groomFullName}
          </h3>
          <div
            className="text-[12px] md:text-[13px] uppercase tracking-[0.2em]"
            style={{
              color: vars.grayColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">{groomBirthOrder}</span>
          </div>
          <div
            className="font-eb-garamond text-[30px] md:text-[35px]"
            style={{
              color: vars.grayColor,
              fontFamily: '"EB Garamond", serif',
              fontWeight: 300,
            }}
          >
            &amp;
          </div>
          <h3
            className={`font-eb-garamond w-[80%] flex items-center justify-center leading-[50px] md:leading-[100px] whitespace-nowrap ${vars.fullNameFontSizeClass || ""}`}
            style={{
              fontSize: vars.fullNameFontSizeClass ? undefined : vars.fullNameFontSize,
              color: vars.primaryColor,
              fontFamily: '"EB Garamond", serif',
              fontWeight: 400,
            }}
          >
            {brideFullName}
          </h3>
          <div
            className="text-[12px] md:text-[13px] uppercase tracking-[0.2em]"
            style={{
              color: vars.grayColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">{brideBirthOrder}</span>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8"
          style={{
            color: vars.grayColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <div style={{ color: vars.primaryColor }}>
            <span
              dir="auto"
              className="whitespace-pre-line text-[16px] md:text-[20px] text-center whitespace-pre-line flex flex-col items-center leading-relaxed"
            >
              {ceremonyHeader}
            </span>
          </div>
          <p
            className="text-[14px] md:text-[15px] mt-2 text-center uppercase"
            style={{ color: vars.grayColor }}
          >
            VÀO LÚC {ceremonyTime}
          </p>
          <div
            className="flex items-center justify-center mt-5"
            style={{ color: vars.primaryColor }}
          >
            <span
              className="text-[14px] md:text-[15px] w-[70px] md:w-[85px] uppercase whitespace-nowrap"
              style={{
                color: vars.grayColor,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                textAlign: "right",
              }}
            >
              <span dir="auto">{dayOfWeek}</span>
            </span>
            <span
              className="w-[1px] h-[25px] self-center opacity-50 mx-3 md:mx-4"
              style={{ backgroundColor: vars.grayColor }}
            />
            <span
              className="text-[32px] md:text-[38px]"
              style={{ color: vars.primaryColor }}
            >
              {day}
            </span>
            <span
              className="w-[1px] h-[25px] self-center opacity-50 mx-3 md:mx-4"
              style={{ backgroundColor: vars.grayColor }}
            />
            <span
              className="text-[14px] md:text-[15px] w-[70px] md:w-[85px] uppercase whitespace-nowrap"
              style={{
                color: vars.grayColor,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                textAlign: "left",
              }}
            >
              <span dir="auto">THÁNG {month}</span>
            </span>
          </div>
          <div
            className="text-[20px] md:text-[22px] mt-2 text-center"
            style={{ color: vars.grayColor }}
          >
            {year}
          </div>
          <div
            className="text-[13px] md:text-[14px] text-center mt-2 uppercase tracking-wide"
            style={{ color: vars.grayColor }}
          >
            ({lunarClean})
          </div>
        </div>
      </div>
    </div>
  );
}
