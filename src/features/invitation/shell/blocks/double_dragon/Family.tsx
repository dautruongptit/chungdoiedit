import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}

export function Family({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);
  const d = ctx.d as any;

  const groomFather = toStr(d.groomFather, "Trần Văn Tuấn");
  const groomMother = toStr(d.groomMother, "Trần Thị Mai");
  const groomAddress = toStr(
    d.groomAddress,
    "23 Đường Nguyễn Trãi, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh"
  );
  const brideFather = toStr(d.brideFather, "Lê Văn Hùng");
  const brideMother = toStr(d.brideMother, "Hồ Thị Lan");
  const brideAddress = toStr(
    d.brideAddress,
    "68 Đường Sư Vạn Hạnh, Phường 12, Quận 10, Thành phố Hồ Chí Minh"
  );

  const announcementText = toStr(
    d.customAnnouncementText,
    "TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"
  );

  const groomFullName = toStr(d.groomFullName || d.groomFull, "Trần Hoàng Nam");
  const brideFullName = toStr(d.brideFullName || d.brideFull, "Lê Thanh Tú");
  const groomBirthOrder = toStr(d.groomBirthOrder || d.groomOrder, "Trưởng Nam");
  const brideBirthOrder = toStr(d.brideBirthOrder || d.brideOrder, "Út Nữ");

  const ceremonyHeader = toStr(
    d.ceremonyHeader,
    "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ\u00A0GIA"
  );
  const ceremonyTime = toStr(d.ceremonyTime, "09:00");
  const ceremonyDate = toStr(d.ceremonyDate, "2026-02-01");

  // Parse date
  const dateObj = new Date(ceremonyDate);
  const day = String(dateObj.getDate() || 1).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1 || 2).padStart(2, "0");
  const year = String(dateObj.getFullYear() || 2026);
  const dayOfWeek = d.ceremonyDayName || (dateObj.getDay() === 0 ? "CHỦ NHẬT" : `THỨ ${dateObj.getDay() + 1}`);

  const lunarRaw = d.ceremonyLunar || "Tức ngày 14 tháng 12 năm Ất\u00A0Tỵ";
  const lunarClean = lunarRaw.replace(/^\(\s*/, "").replace(/\)$/, "");

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: `rgb(var(${theme.paperVar}))` }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url("${theme.patternUrl}")`,
          backgroundSize: "clamp(300px, 50vw, 500px) auto",
          backgroundPositionY: "10%",
          mixBlendMode: "color-dodge",
        }}
      />
      <div className="relative z-10">
        <div
          className="w-full grid grid-cols-[1fr_auto_1fr] justify-center gap-x-3 md:gap-x-8 mt-6 px-2 sm:px-4 grid-rows-[repeat(4,auto)] gap-y-1"
          style={{
            color: `rgb(var(${theme.primaryVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {/* Groom family */}
          <div className="row-span-4 grid grid-rows-subgrid justify-items-center justify-self-center min-w-0 text-center max-w-[160px] md:max-w-[280px]">
            <span
              className="text-[14px] md:text-[15px]"
              style={{ color: `rgb(var(${theme.grayVar}))` }}
            >
              <span dir="auto">{theme.isGreen ? "Ông bà / 부모님" : "Ông bà"}</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: `rgb(var(${theme.primaryVar}))`, fontSize: "14px" }}
            >
              {theme.isGreen ? (
                <span className="flex flex-col items-center"><span dir="auto" lang="vi">{groomFather}</span></span>
              ) : (
                <span dir="auto">{groomFather}</span>
              )}
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: `rgb(var(${theme.primaryVar}))`, fontSize: "14px" }}
            >
              {theme.isGreen ? (
                <span className="flex flex-col items-center"><span dir="auto" lang="vi">{groomMother}</span></span>
              ) : (
                <span dir="auto">{groomMother}</span>
              )}
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] text-[12px] md:text-[13px] mt-1 whitespace-pre-line leading-tight flex flex-col"
              style={{ color: `rgb(var(${theme.grayVar}))` }}
            >
              {theme.isGreen ? (
                <span className="flex flex-col items-center"><span dir="auto" lang="vi">{groomAddress}</span></span>
              ) : (
                <span dir="auto">{groomAddress}</span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div
            className="row-span-4 w-[1px] h-[60px] self-center"
            style={{ backgroundColor: `rgb(var(${theme.primaryVar}))` }}
          />

          {/* Bride family */}
          <div className="row-span-4 grid grid-rows-subgrid justify-items-center justify-self-center min-w-0 text-center max-w-[160px] md:max-w-[280px]">
            <span
              className="text-[14px] md:text-[15px]"
              style={{ color: `rgb(var(${theme.grayVar}))` }}
            >
              <span dir="auto">{theme.isGreen ? "Ông bà / 부모님" : "Ông bà"}</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: `rgb(var(${theme.primaryVar}))`, fontSize: "14px" }}
            >
              {theme.isGreen ? (
                <span className="flex flex-col items-center"><span dir="auto" lang="vi">{brideFather}</span></span>
              ) : (
                <span dir="auto">{brideFather}</span>
              )}
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: `rgb(var(${theme.primaryVar}))`, fontSize: "14px" }}
            >
              {theme.isGreen ? (
                <span className="flex flex-col items-center"><span dir="auto" lang="vi">{brideMother}</span></span>
              ) : (
                <span dir="auto">{brideMother}</span>
              )}
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] text-[12px] md:text-[13px] mt-1 whitespace-pre-line leading-tight flex flex-col"
              style={{ color: `rgb(var(${theme.grayVar}))` }}
            >
              {theme.isGreen ? (
                <span className="flex flex-col items-center"><span dir="auto" lang="vi">{brideAddress}</span></span>
              ) : (
                <span dir="auto">{brideAddress}</span>
              )}
            </div>
          </div>
        </div>

        {/* Announcement */}
        <div
          className="text-center text-[16px] md:text-[20px] uppercase tracking-wider mt-8 px-4 flex flex-col gap-2 mx-auto md:max-w-[560px]"
          style={{
            whiteSpace: "pre-line",
            color: `rgb(var(${theme.primaryVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {theme.isGreen ? (
            <span className="flex flex-col items-center">
              <span dir="auto" lang="vi">{"TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}</span>
              <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">{"저희 자녀의 결혼을\n알려드립니다"}</span>
            </span>
          ) : (
            <span dir="auto">{announcementText}</span>
          )}
        </div>

        {/* Couple names full */}
        <div
          data-showcase-keep=""
          className="w-full min-w-0 relative flex flex-col items-center text-center gap-3 md:gap-4 mt-4 mb-6"
        >
          <h3
            className="font-eb-garamond w-[80%] flex items-center justify-center text-[32px] md:text-[42px] leading-[50px] md:leading-[100px] whitespace-nowrap"
            style={{ fontSize: d.fullNameFontSize || theme.fullNameFontSize || "35px", color: `rgb(var(${theme.primaryVar}))`, fontWeight: 400 }}
          >
            {groomFullName}
          </h3>
          <div
            className="text-[12px] md:text-[13px] uppercase tracking-[0.2em]"
            style={{
              color: `rgb(var(${theme.grayVar}))`,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">{theme.isGreen ? "Trưởng Nam / 신랑" : groomBirthOrder}</span>
          </div>
          <div
            className="font-eb-garamond text-[30px] md:text-[35px]"
            style={{ color: `rgb(var(${theme.grayVar}))`, fontWeight: 300 }}
          >
            &amp;
          </div>
          <h3
            className="font-eb-garamond w-[80%] flex items-center justify-center text-[32px] md:text-[42px] leading-[50px] md:leading-[100px] whitespace-nowrap"
            style={{ fontSize: d.fullNameFontSize || theme.fullNameFontSize || "35px", color: `rgb(var(${theme.primaryVar}))`, fontWeight: 400 }}
          >
            {brideFullName}
          </h3>
          <div
            className="text-[12px] md:text-[13px] uppercase tracking-[0.2em]"
            style={{
              color: `rgb(var(${theme.grayVar}))`,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">{theme.isGreen ? "Thứ Nữ / 신부" : brideBirthOrder}</span>
          </div>
        </div>

        {/* Ceremony details */}
        <div
          className="flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8"
          style={{
            color: `rgb(var(${theme.grayVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <div style={{ color: `rgb(var(${theme.primaryVar}))` }}>
            {theme.isGreen ? (
              <span className="flex flex-col items-center">
                <span dir="auto" lang="vi" className="whitespace-pre-line text-[16px] md:text-[20px] text-center whitespace-pre-line flex flex-col items-center leading-relaxed">
                  {"LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ\u00A0GIA"}
                </span>
                <span dir="auto" lang="ko" className="whitespace-pre-line text-[16px] md:text-[20px] text-center whitespace-pre-line flex flex-col items-center leading-relaxed text-[0.85em] opacity-70">
                  {"결혼식 장소\n자택"}
                </span>
              </span>
            ) : (
              <span
                dir="auto"
                className="whitespace-pre-line text-[16px] md:text-[20px] text-center whitespace-pre-line flex flex-col items-center leading-relaxed"
              >
                {ceremonyHeader}
              </span>
            )}
          </div>
          <p
            className="text-[14px] md:text-[15px] mt-2 text-center uppercase"
            style={{ color: `rgb(var(${theme.grayVar}))` }}
          >
            {theme.isGreen ? "VÀO LÚC / 시간 09:00" : `VÀO LÚC ${ceremonyTime}`}
          </p>
          <div
            className="flex items-center justify-center mt-5"
            style={{ color: `rgb(var(${theme.primaryVar}))` }}
          >
            <span
              className="text-[14px] md:text-[15px] w-[70px] md:w-[85px] uppercase whitespace-nowrap"
              style={{
                color: `rgb(var(${theme.grayVar}))`,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                textAlign: "right",
              }}
            >
              {theme.isGreen ? (
                <span className="flex flex-col items-center">
                  <span dir="auto" lang="vi">THỨ BẢY</span>
                  <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">토요일</span>
                </span>
              ) : (
                <span dir="auto">{dayOfWeek}</span>
              )}
            </span>
            <span
              className="w-[1px] h-[25px] self-center opacity-50 mx-3 md:mx-4"
              style={{ backgroundColor: `rgb(var(${theme.grayVar}))` }}
            />
            <span
              className="text-[32px] md:text-[38px]"
              style={{ color: `rgb(var(${theme.primaryVar}))` }}
            >
              {day}
            </span>
            <span
              className="w-[1px] h-[25px] self-center opacity-50 mx-3 md:mx-4"
              style={{ backgroundColor: `rgb(var(${theme.grayVar}))` }}
            />
            <span
              className="text-[14px] md:text-[15px] w-[70px] md:w-[85px] uppercase whitespace-nowrap"
              style={{
                color: `rgb(var(${theme.grayVar}))`,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                textAlign: "left",
              }}
            >
              {theme.isGreen ? (
                <span className="flex flex-col items-center">
                  <span dir="auto" lang="vi">THÁNG 04</span>
                  <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">4월</span>
                </span>
              ) : (
                <span dir="auto">THÁNG {month}</span>
              )}
            </span>
          </div>
          <div
            className="text-[20px] md:text-[22px] mt-2 text-center"
            style={{ color: `rgb(var(${theme.grayVar}))` }}
          >
            {year}
          </div>
          <div
            className="text-[13px] md:text-[14px] text-center mt-2 uppercase tracking-wide"
            style={{ color: `rgb(var(${theme.grayVar}))` }}
          >
            {theme.isGreen ? (
              <>{"("}{"Tức ngày 2 tháng 3 năm Bính Ngọ / 음력 3월\u00A02일)"}</>
            ) : (
              <>{"("}{lunarClean}{")"}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
