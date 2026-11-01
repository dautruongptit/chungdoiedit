import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function Banquet({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);
  const d = ctx.d as any;

  const banquetTime = d.banquetTime || d.time || "10:30";
  const partyStart = d.partyStart || d.banquetTime || "10:30";
  const guestReceptionTime = d.guestReceptionTime;
  const addToCalendar = theme.isGreen
    ? "Thêm vào lịch / 캘린더에 추가"
    : (d.addToCalendar || "Thêm vào lịch");
  const rsvpButton = theme.isGreen
    ? "XÁC NHẬN / 참석 확인"
    : (d.rsvpButton || "XÁC NHẬN THAM DỰ");

  // Parse ngày tiệc cưới
  const banquetDateStr = d.date || "2026-02-01";
  const bDate = new Date(banquetDateStr);
  const banquetYear = bDate.getFullYear();
  const banquetMonth = bDate.getMonth() + 1;
  const banquetDay = bDate.getDate();

  const emptyDays = (new Date(banquetYear, banquetMonth - 1, 1).getDay() + 6) % 7;
  const totalDays = new Date(banquetYear, banquetMonth, 0).getDate();

  const dayName = d.banquetDayName || (bDate.getDay() === 0 ? "CHỦ NHẬT" : `THỨ ${bDate.getDay() + 1}`);
  const dayStr = String(banquetDay).padStart(2, "0");
  const monthStr = String(banquetMonth).padStart(2, "0");

  const lunarRaw = d.banquetLunar || "Tức ngày 14 tháng 12 năm Ất\u00A0Tỵ";
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
          backgroundPositionY: "60%",
          mixBlendMode: "color-dodge",
        }}
      />
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full px-2 sm:px-4 pt-6 pb-8 -mt-[1px]"
        data-landing-screenshot-id="invite-reception"
      >
        <h3
          className="text-[16px] md:text-[20px] text-center uppercase flex flex-col items-center"
          style={{
            color: `rgb(var(${theme.primaryVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            fontWeight: 400,
          }}
        >
          {theme.isGreen ? (
            <span className="flex flex-col items-center">
              <span dir="auto" lang="vi">Tiệc cưới sẽ diễn ra vào&nbsp;lúc:</span>
              <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">피로연 시간:</span>
            </span>
          ) : (
            <span dir="auto">Tiệc cưới sẽ diễn ra vào&nbsp;lúc:</span>
          )}
        </h3>
        <div
          className="text-[20px] md:text-[24px] font-semibold mt-2 text-center"
          style={{
            color: `rgb(var(${theme.primaryVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {banquetTime}
        </div>
        <div
          className="flex items-center justify-center mt-5"
          style={{
            color: `rgb(var(${theme.grayVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
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
              <span dir="auto">{dayName}</span>
            )}
          </span>
          <span
            className="w-[1px] h-[25px] self-center opacity-50 mx-3 md:mx-4"
            style={{ backgroundColor: `rgb(var(${theme.grayVar}))` }}
          />
          <span
            className="text-[32px] md:text-[38px]"
            style={{
              color: `rgb(var(${theme.primaryVar}))`,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            {dayStr}
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
              <span dir="auto">THÁNG {monthStr}</span>
            )}
          </span>
        </div>
        <div
          className="text-[20px] md:text-[22px] mt-2 text-center"
          style={{
            color: `rgb(var(${theme.grayVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {banquetYear}
        </div>
        <div
          className="text-[13px] md:text-[14px] text-center mt-2"
          style={{
            color: `rgb(var(${theme.grayVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {theme.isGreen ? (
            <>{"("}{"Tức ngày 2 tháng 3 năm Bính Ngọ / 음력 3월\u00A02일)"}</>
          ) : (
            <>{"("}{lunarClean}{")"}</>
          )}
        </div>
        <div className="flex items-center justify-center gap-8 mt-4">
          {guestReceptionTime && (
            <div className="flex flex-col items-center">
              <span
                className="text-[11px] uppercase"
                style={{
                  color: `rgb(var(${theme.grayVar}))`,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {theme.isGreen ? (
                  <span className="flex flex-col items-center">
                    <span dir="auto" lang="vi">Đón khách</span>
                    <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">하객 맞이</span>
                  </span>
                ) : (
                  <span dir="auto">Đón khách</span>
                )}
              </span>
              <span
                className="text-[20px] font-semibold mt-1"
                style={{
                  color: `rgb(var(${theme.primaryVar}))`,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {guestReceptionTime}
              </span>
            </div>
          )}
          <div className="flex flex-col items-center">
            <span
              className="text-[11px] uppercase"
              style={{
                color: `rgb(var(${theme.grayVar}))`,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              {theme.isGreen ? (
                <span className="flex flex-col items-center">
                  <span dir="auto" lang="vi">Khai tiệc</span>
                  <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">피로연</span>
                </span>
              ) : (
                <span dir="auto">Khai tiệc</span>
              )}
            </span>
            <span
              className="text-[20px] font-semibold mt-1"
              style={{
                color: `rgb(var(${theme.primaryVar}))`,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              {partyStart}
            </span>
          </div>
        </div>
        <div className="mt-2 w-[296px] md:w-[352px] max-w-full mx-auto">
          <div
            data-showcase-keep=""
            className="w-full max-w-[280px] md:max-w-[310px] mx-auto rounded-lg overflow-hidden border !max-w-none w-full"
            style={{
              borderColor: `color-mix(in srgb, rgb(var(${theme.primaryVar})) 27%, transparent)`,
              color: `rgb(var(${theme.primaryVar}))`,
            }}
          >
            <div
              className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold tracking-wide border-b "
              style={{
                borderColor: `color-mix(in srgb, rgb(var(${theme.primaryVar})) 27%, transparent)`,
              }}
            >
              Tháng {banquetMonth} / {banquetYear}
            </div>
            <div
              className="grid grid-cols-7 border-b-2"
              style={{ borderColor: `rgb(var(${theme.primaryVar}))` }}
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
              {Array.from({ length: emptyDays }).map((_, i) => (
                <div key={`empty-${i}`} className="flex items-center justify-center h-[30px] md:h-[34px]" />
              ))}
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((dayNum) => {
                const isCurrent = dayNum === banquetDay;
                return (
                  <div key={dayNum} className="flex items-center justify-center h-[30px] md:h-[34px]">
                    {isCurrent ? (
                      <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                        <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill={`rgb(var(${theme.primaryVar}))`}>
                          <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                        </svg>
                        <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: "rgb(255, 255, 255)" }}>
                          {dayNum}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[12px] md:text-[13px]">{dayNum}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <a
          href="https://www.google.com/calendar/render?action=TEMPLATE&text=%C4%90%C3%A1m%20c%C6%B0%E1%BB%9Bi%20Tr%E1%BA%A7n%20Ho%C3%A0ng%20Nam%20%26%20L%C3%AA%20Thanh%20T%C3%BA&dates=20260201T033000Z/20260201T053000Z&ctz=Asia/Ho_Chi_Minh&details=Ti%E1%BB%87c%20c%C6%B0%E1%BB%9Bi%20c%E1%BB%A7a%20Tr%E1%BA%A7n%20Ho%C3%A0ng%20Nam%20%26%20L%C3%AA%20Thanh%20T%C3%BA%20t%E1%BA%A1i%20Queen%20Plaza%20K%E1%BB%B3%20H%C3%B2a%2C%2016A%20L%C3%AA%20H%E1%BB%93ng%20Phong%2C%20Ph%C6%B0%E1%BB%9Dng%2012%2C%20Qu%E1%BA%ADn%2010%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh&location=Queen%20Plaza%20K%E1%BB%B3%20H%C3%B2a%2C%2016A%20L%C3%AA%20H%E1%BB%93ng%20Phong%2C%20Ph%C6%B0%E1%BB%9Dng%2012%2C%20Qu%E1%BA%ADn%2010%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center text-sm tracking-wider underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
          data-showcase-join-prev=""
          style={{ color: `rgb(var(${theme.primaryVar}))`, background: "none" }}
        >
          <span dir="auto">{addToCalendar}</span>
        </a>
      </div>
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full pt-2 pb-8 md:pt-2 md:pb-10"
        data-landing-screenshot-id="invite-rsvp"
      >
        <button
          type="button"
          onClick={() => ctx.setRsvpOpen && ctx.setRsvpOpen(true)}
          className="text-sm md:text-base tracking-wider inline-flex items-center justify-center rounded-[10px] px-4 py-2 font-semibold transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: `rgb(var(${theme.primaryVar}))`,
            color: `rgb(var(${theme.paperVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">
            <span dir="auto">{rsvpButton}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
