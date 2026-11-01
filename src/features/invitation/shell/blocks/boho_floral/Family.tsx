import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}

export function Family({ ctx }: { ctx: InvitationCtx }) {
  const d = (ctx.d || {}) as any;
  const theme = getBohoFloralTheme(ctx);

  const groomParentTitle = toStr(d.groomParentTitle, theme.isGreen ? "Ông Bà" : "Ông bà");
  const brideParentTitle = toStr(d.brideParentTitle, theme.isGreen ? "Ông Bà" : "Ông bà");

  const groomFather = toStr(d.groomFather, theme.isGreen ? "Trần Văn Hùng " : theme.isPink ? "Trần Văn Tuấn " : "Phạm Văn Toàn ");
  const groomMother = toStr(d.groomMother, theme.isGreen ? "Hạm Thị Lan" : theme.isPink ? "Trần Thị Mai" : "Nguyễn Thị Thu");
  const groomAddress = toStr(
    d.groomAddress,
    theme.isGreen
      ? "25 Ngõ 12 Đặng Văn Ngữ, Đống Đa, Hà Nội"
      : theme.isPink
      ? "23 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM"
      : "45 Đường Số 8, Phường Hiệp Bình Chánh, Thủ Đức, TP.HCM"
  );

  const brideFather = toStr(d.brideFather, theme.isGreen ? "Nguyễn Văn Bình " : theme.isPink ? "Lê Văn Nam " : "Lê Văn Phúc ");
  const brideMother = toStr(d.brideMother, theme.isGreen ? "Phan Thị Hương" : theme.isPink ? "Nguyễn Thị Hoa" : "Võ Thị Kim Oanh");
  const brideAddress = toStr(
    d.brideAddress,
    theme.isGreen
      ? "18 Ngõ 86 Chùa Hà, Cầu Giấy, Hà Nội\n"
      : theme.isPink
      ? "45 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM\n"
      : "120 Đinh Tiên Hoàng, Phường 3, Bình Thạnh, TP.HCM\n"
  );

  const announcementText = toStr(d.customAnnouncementText, "TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI");

  const groomFullName = toStr(d.groomFullName, theme.isGreen ? "Trần Minh Quân" : theme.isPink ? "Trần Thanh Vũ" : "Phạm Thanh Tùng");
  const brideFullName = toStr(d.brideFullName, theme.isGreen ? "Nguyễn Thu Hà" : theme.isPink ? "Lê Phương Nhã" : "Lê Thị Mỹ Duyên");
  const groomBirthOrder = toStr(d.groomBirthOrder, theme.isBrown ? "Út Nam" : "Trưởng Nam");
  const brideBirthOrder = toStr(d.brideBirthOrder, theme.isBrown ? "Thứ Nữ" : "Út Nữ");

  const ceremonyHeader = toStr(d.ceremonyHeader, "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA");
  const ceremonyTime = toStr(d.ceremonyTime, "09:00");
  const ceremonyDate = toStr(d.ceremonyDate, theme.isGreen ? "2026-05-24" : theme.isPink ? "2026-02-01" : "2026-05-10");

  const cParts = String(ceremonyDate).split(/[-/]/);
  const cYear = Number(cParts[0]) || 2026;
  const cMonth = Number(cParts[1]) || (theme.isPink ? 2 : 5);
  const cDay = Number(cParts[2]) || (theme.isGreen ? 24 : theme.isPink ? 1 : 10);
  const dateObj = new Date(cYear, cMonth - 1, cDay);

  const day = String(cDay).padStart(2, "0");
  const month = String(cMonth).padStart(2, "0");
  const year = String(cYear);
  const WEEKDAYS = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];
  const dayOfWeek = WEEKDAYS[dateObj.getDay()] || "CHỦ NHẬT";

  const lunarText = theme.isPink
    ? "( Tức ngày 14 tháng 12 năm Ất\u00A0Tỵ)"
    : theme.isBrown
    ? "( Tức ngày 24 tháng 3 năm Bính\u00A0Ngọ)"
    : "( Tức ngày 8 tháng 4 năm Bính\u00A0Ngọ)";

  return (
    <>
      <div className="mb-6 md:mb-8">
        <div
          className="relative grid grid-cols-2 gap-2 md:gap-3 text-center"
          style={{ color: theme.primaryColor, fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
        >
          <div className="flex flex-col gap-1.5">
            <span style={{ color: theme.primaryColor }}>
              <span dir="auto">{groomParentTitle}</span>
            </span>
            <span
              className="text-[13px] md:text-[23px] [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: theme.primaryColor, fontWeight: 600 }}
            >
              <span dir="auto">{groomFather}</span>
            </span>
            <span
              className="text-[13px] md:text-[23px] [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: theme.primaryColor, fontWeight: 600 }}
            >
              <span dir="auto">{groomMother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 text-[11px] md:text-[10px] tracking-normal w-[90%] md:w-[80%] mx-auto flex flex-col"
              style={{ color: theme.primaryColor }}
            >
              <span dir="auto">{groomAddress}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span style={{ color: theme.primaryColor }}>
              <span dir="auto">{brideParentTitle}</span>
            </span>
            <span
              className="text-[13px] md:text-[23px] [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: theme.primaryColor, fontWeight: 600 }}
            >
              <span dir="auto">{brideFather}</span>
            </span>
            <span
              className="text-[13px] md:text-[23px] [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{ color: theme.primaryColor, fontWeight: 600 }}
            >
              <span dir="auto">{brideMother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 text-[11px] md:text-[10px] tracking-normal w-[90%] md:w-[80%] mx-auto flex flex-col"
              style={{ color: theme.primaryColor }}
            >
              <span dir="auto">{brideAddress}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-center text-[16px] md:text-[20px] flex flex-col gap-1 mb-6 md:mb-8 mx-auto md:max-w-[560px]"
        style={{
          whiteSpace: "pre-line",
          fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          color: theme.primaryColor,
        }}
      >
        <span dir="auto">{announcementText}</span>
      </div>

      <div
        data-showcase-keep=""
        className="w-full min-w-0 relative flex w-full min-w-0 flex-col items-center text-center gap-3 md:gap-4"
      >
        <h3
          className="font-eb-garamond w-full flex items-center justify-center text-[40px] md:text-[64px] leading-[55px] md:leading-[80px] whitespace-nowrap"
          style={{ fontFamily: '"EB Garamond", ChungDoiIndic, serif', color: theme.primaryColor, fontWeight: 400 }}
        >
          {groomFullName}
        </h3>
        <div
          className="text-xs uppercase tracking-[0.2em]"
          style={{
            color: theme.primaryColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            fontSize: "10px",
            letterSpacing: "0.1em",
          }}
        >
          <span dir="auto">{groomBirthOrder}</span>
        </div>
        <div
          className="text-[35px] md:text-[42px]"
          style={{ color: theme.primaryColor, fontFamily: '"Ms Madi", ChungDoiIndic, cursive' }}
        >
          &amp;
        </div>
        <h3
          className="font-eb-garamond w-full flex items-center justify-center text-[40px] md:text-[64px] leading-[55px] md:leading-[80px] whitespace-nowrap"
          style={{ fontFamily: '"EB Garamond", ChungDoiIndic, serif', color: theme.primaryColor, fontWeight: 400 }}
        >
          {brideFullName}
        </h3>
        <div
          className="text-xs uppercase tracking-[0.2em]"
          style={{
            color: theme.primaryColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            fontSize: "10px",
            letterSpacing: "0.1em",
          }}
        >
          <span dir="auto">{brideBirthOrder}</span>
        </div>
      </div>

      <div className="mt-6 md:mt-8">
        <div
          className="relative flex flex-col items-center gap-4 md:gap-5 text-center"
          style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
        >
          <div className="flex flex-col items-center gap-2" style={{ color: theme.primaryColor }}>
            <span dir="auto" className="whitespace-pre-line font-normal text-[16px] md:text-[20px] text-center">
              {ceremonyHeader}
            </span>
            <p className="font-normal text-[16px] md:text-[18px] mb-2 uppercase" style={{ color: theme.primaryColor }}>
              VÀO LÚC
            </p>
          </div>
          <div
            className="text-[20px] md:text-[30px]"
            style={{ color: theme.primaryColor, fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
          >
            {ceremonyTime}
          </div>
          <div className="flex items-center gap-6" style={{ color: theme.primaryColor }}>
            <span
              className="text-[12px] md:text-[16px]"
              style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif', textAlign: "right" }}
            >
              <span dir="auto">{dayOfWeek}</span>
            </span>
            <span
              className="text-[20px] md:text-[28px] flex items-center justify-center leading-none"
              style={{
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                color: theme.primaryColor,
                opacity: 0.5,
              }}
            >
              |
            </span>
            <span
              className="text-[30px] md:text-[40px]"
              style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
            >
              {day}
            </span>
            <span
              className="text-[20px] md:text-[28px] flex items-center justify-center leading-none"
              style={{
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                color: theme.primaryColor,
                opacity: 0.5,
              }}
            >
              |
            </span>
            <span
              className="text-[12px] md:text-[16px]"
              style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif', textAlign: "left" }}
            >
              <span dir="auto">THÁNG {month}</span>
            </span>
          </div>
          <div
            className="text-[18px] md:text-[24px]"
            style={{ color: theme.primaryColor, fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
          >
            {year}
          </div>
          <div
            className="text-xs md:text-sm uppercase tracking-[0.25em]"
            style={{ color: theme.primaryColor, fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
          >
            {lunarText}
          </div>
        </div>
      </div>
    </>
  );
}
