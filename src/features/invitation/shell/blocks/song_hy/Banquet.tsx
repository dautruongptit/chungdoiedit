import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

export function Banquet({ ctx }: { ctx: InvitationCtx }) {
  const vars = getSongHyTheme(ctx);
  const d = (ctx.d || {}) as any;

  const banquetTime = d.banquetTime || d.time || "18:00";
  const banquetDateStr = d.date || "2026-07-30";
  const dateParts = String(banquetDateStr).split(/[-/]/);
  const banquetYear = Number(dateParts[0]) || 2026;
  const banquetMonth = Number(dateParts[1]) || 7;
  const banquetDay = Number(dateParts[2]) || 30;
  const bDate = new Date(banquetYear, banquetMonth - 1, banquetDay);

  const WEEKDAYS = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];
  const dayOfWeekStr = WEEKDAYS[bDate.getDay()] || "THỨ NĂM";

  const dayStr = String(banquetDay).padStart(2, "0");
  const monthStr = String(banquetMonth).padStart(2, "0");

  const lunarRaw = d.banquetLunar || "Tức ngày 17 tháng 6 năm Bính\u00A0Ngọ";
  const lunarClean = lunarRaw.replace(/^\(\s*/, "").replace(/\)$/, "");

  // Calendar days calculation
  // Monday is first column (T2) -> Sunday is last column (CN)
  const emptyDays = (new Date(banquetYear, banquetMonth - 1, 1).getDay() + 6) % 7;
  const totalDays = new Date(banquetYear, banquetMonth, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < emptyDays; i++) {
    calendarDays.push({ day: 0, isCurrent: false });
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push({ day: i, isCurrent: i === banquetDay });
  }

  const calendarLink = d.calendarUrl || "https://www.google.com/calendar/render?action=TEMPLATE&text=%C4%90%C3%A1m%20c%C6%B0%E1%BB%9Bi%20V%C3%B5%20H%E1%BA%A3i%20Nam%20%26%20Hu%E1%BB%B3nh%20Kh%C3%A1nh%20Linh&dates=20260730T110000Z/20260730T130000Z&ctz=Asia/Ho_Chi_Minh&details=Ti%E1%BB%87c%20c%C6%B0%E1%BB%9Bi%20c%E1%BB%A7a%20V%C3%B5%20H%E1%BA%A3i%20Nam%20%26%20Hu%E1%BB%B3nh%20Kh%C3%A1nh%20Linh%20t%E1%BA%A1i%20Gala%20Center%2C%20415%20Ho%C3%A0ng%20V%C4%83n%20Th%E1%BB%A5%2C%20Ph%C6%B0%E1%BB%9Dng%202%2C%20T%C3%A2n%20B%C3%ACnh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&location=Gala%20Center%2C%20415%20Ho%C3%A0ng%20V%C4%83n%20Th%E1%BB%A5%2C%20Ph%C6%B0%E1%BB%9Dng%202%2C%20T%C3%A2n%20B%C3%ACnh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: vars.paperColor }}
    >
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full px-2 sm:px-4 pt-6 pb-8 -mt-[1px]"
        data-landing-screenshot-id="invite-reception"
      >
        <h3
          className="text-[16px] md:text-[20px] text-center uppercase flex flex-col items-center"
          style={{
            color: vars.primaryColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            fontWeight: 400,
          }}
        >
          <span dir="auto">Tiệc cưới sẽ diễn ra vào&nbsp;lúc:</span>
        </h3>
        <div
          className="text-[20px] md:text-[24px] font-semibold mt-2 text-center"
          style={{
            color: vars.primaryColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            fontWeight: 600,
          }}
        >
          {banquetTime}
        </div>
        <div
          className="flex items-center justify-center mt-5"
          style={{
            color: vars.grayColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span
            className="text-[14px] md:text-[15px] w-[70px] md:w-[85px] uppercase whitespace-nowrap"
            style={{
              color: vars.grayColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              textAlign: "right",
            }}
          >
            <span dir="auto">{dayOfWeekStr}</span>
          </span>
          <span
            className="w-[1px] h-[25px] self-center opacity-50 mx-3 md:mx-4"
            style={{ backgroundColor: vars.grayColor }}
          />
          <span
            className="text-[32px] md:text-[38px]"
            style={{
              color: vars.primaryColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            {dayStr}
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
            <span dir="auto">THÁNG {monthStr}</span>
          </span>
        </div>
        <div
          className="text-[20px] md:text-[22px] mt-2 text-center"
          style={{
            color: vars.grayColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {banquetYear}
        </div>
        <div
          className="text-[13px] md:text-[14px] text-center mt-2"
          style={{
            color: vars.grayColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          ({lunarClean})
        </div>
        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="flex flex-col items-center">
            <span
              className="text-[11px] uppercase"
              style={{
                color: vars.grayColor,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <span dir="auto">Khai tiệc</span>
            </span>
            <span
              className="text-[20px] font-semibold mt-1"
              style={{
                color: vars.primaryColor,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              {banquetTime}
            </span>
          </div>
        </div>
        <div className="mt-2 w-[296px] md:w-[352px] max-w-full mx-auto">
          <div
            data-showcase-keep=""
            className="w-full max-w-[280px] md:max-w-[310px] mx-auto rounded-lg overflow-hidden border !max-w-none w-full"
            style={{
              borderColor: `color-mix(in srgb, ${vars.primaryColor} 27%, transparent 73%)`,
              color: vars.primaryColor,
            }}
          >
            <div
              className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold tracking-wide border-b "
              style={{
                borderColor: `color-mix(in srgb, ${vars.primaryColor} 27%, transparent 73%)`,
              }}
            >
              Tháng {banquetMonth} / {banquetYear}
            </div>
            <div
              className="grid grid-cols-7 border-b-2"
              style={{ borderColor: vars.primaryColor }}
            >
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T2</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T3</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T4</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T5</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T6</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T7</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">CN</div>
            </div>
            <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
              {calendarDays.map((item, idx) => (
                <div key={idx} className="flex items-center justify-center h-[30px] md:h-[34px]">
                  {item.day > 0 && (
                    item.isCurrent ? (
                      <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 22"
                          className="absolute inset-0 w-full h-full drop-shadow-sm"
                          fill={vars.primaryHex}
                        >
                          <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                        </svg>
                        <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: "rgb(255, 255, 255)" }}>
                          {item.day}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[12px] md:text-[13px]">{item.day}</span>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <a
          href={calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center text-sm tracking-wider underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
          data-showcase-join-prev=""
          style={{ color: vars.primaryColor, background: "none" }}
        >
          <span dir="auto">Thêm vào lịch</span>
        </a>
      </div>
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full pt-2 pb-8 md:pt-2 md:pb-10"
        data-landing-screenshot-id="invite-rsvp"
      >
        <button
          type="button"
          className="text-sm md:text-base tracking-wider inline-flex items-center justify-center rounded-[10px] px-4 py-2 font-semibold transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: vars.primaryColor,
            color: vars.accentColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">
            <span dir="auto">XÁC NHẬN THAM DỰ</span>
          </span>
        </button>
      </div>
    </div>
  );
}
