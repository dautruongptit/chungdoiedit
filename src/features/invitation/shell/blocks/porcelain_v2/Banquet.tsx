import React, { useState, useEffect } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Banquet({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const assets = t.assets || "/images/themes/porcelain-v2-green";
  const isRed = assets.includes("red");
  const isPink = assets.includes("pink");

  const textColor = t.ink || (isRed ? "rgb(143, 38, 45)" : isPink ? "rgb(220, 133, 153)" : "rgb(70, 79, 30)");
  const accentColor = t.accent || (isRed ? "rgb(101, 78, 47)" : isPink ? "rgb(119, 110, 56)" : "rgb(188, 155, 99)");
  const cardBg = isRed ? "rgb(254, 250, 240)" : "rgb(253, 249, 240)";

  const banquetTime = anyD.banquetTime || "18:00";
  const banquetDayOfWeek = anyD.banquetDayOfWeek || "THỨ BẢY";
  const banquetDay = anyD.banquetDay || 14;
  const banquetMonth = anyD.banquetMonth || 11;
  const banquetYear = anyD.banquetYear || 2026;
  const banquetLunar = anyD.banquetLunar || "( Tức ngày 6 tháng 10 năm Bính Ngọ)";

  const receptionTime = anyD.receptionTime || "17:00";
  const feastTime = anyD.feastTime || "18:00";

  // Countdown target date
  const targetDateStr = `${banquetYear}-${String(banquetMonth).padStart(2, "0")}-${String(banquetDay).padStart(2, "0")}T${banquetTime}:00+07:00`;
  const [countdownText, setCountdownText] = useState(
    anyD.countdownText || "13 ngày 11 giờ 46 phút 19 giây"
  );

  useEffect(() => {
    if (anyD.countdownText) return;
    const calc = () => {
      const target = new Date(targetDateStr).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdownText(`${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr, anyD.countdownText]);

  // Calendar generation for November 2026 (or custom month/year)
  // Day 1 of Nov 2026 is Sunday (index 6 where Monday is index 0)
  const emptyDaysBefore = (new Date(banquetYear, banquetMonth - 1, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(banquetYear, banquetMonth, 0).getDate();

  // Flower styling for Banquet section
  let flower1Style: React.CSSProperties = {
    left: "-28.9%",
    top: "17.8%",
    width: "43.1%",
    aspectRatio: "124.245 / 256",
  };
  let flower2Style: React.CSSProperties = {
    left: "85.8%",
    top: "58.7%",
    width: "40.3%",
    aspectRatio: "124.245 / 256",
    transform: "scaleX(-1)",
  };

  if (isRed) {
    flower1Style = {
      left: "-81.3px",
      top: "19.6%",
      width: "146.6px",
      height: "195.4px",
      transform: "scaleX(-1)",
    };
    flower2Style = {
      left: "83.7%",
      top: "82.1%",
      width: "146.6px",
      height: "195.4px",
    };
  } else if (isPink) {
    flower1Style = {
      left: "-88.4px",
      top: "111.7px",
      width: "145.3px",
      height: "279.7px",
    };
    flower2Style = {
      left: "254.2px",
      top: "443.6px",
      width: "145.3px",
      height: "279.7px",
      transform: "scaleX(-1)",
    };
  }

  const calendarUrl = anyD.calendarUrl || "https://www.google.com/calendar/render?action=TEMPLATE&text=%C4%90%C3%A1m%20c%C6%B0%E1%BB%9Bi%20Nguy%E1%BB%85n%20Duy%20Khang%20%26%20Tr%E1%BA%A7n%20Th%E1%BA%A3o%20Vy&dates=20261114T110000Z/20261114T130000Z&ctz=Asia/Ho_Chi_Minh&details=Ti%E1%BB%87c%20c%C6%B0%E1%BB%9Bi%20c%E1%BB%A7a%20Nguy%E1%BB%85n%20Duy%20Khang%20%26%20Tr%E1%BA%A7n%20Th%E1%BA%A3o%20Vy%20t%E1%BA%A1i%20Nh%C3%A0%20h%C3%A0ng%20V%C6%B0%E1%BB%9Dn%20Th%C3%B4ng%2C%20145%20Tr%E1%BA%A7n%20Ph%C3%BA%2C%20ph%C6%B0%E1%BB%9Dng%202%2C%20th%C3%A0nh%20ph%E1%BB%91%20B%E1%BA%A3o%20L%E1%BB%99c%2C%20t%E1%BB%89nh%20L%C3%A2m%20%C4%90%E1%BB%93ng&location=Nh%C3%A0%20h%C3%A0ng%20V%C6%B0%E1%BB%9Dn%20Th%C3%B4ng%2C%20145%20Tr%E1%BA%A7n%20Ph%C3%BA%2C%20ph%C6%B0%E1%BB%9Dng%202%2C%20th%C3%A0nh%20ph%E1%BB%91%20B%E1%BA%A3o%20L%E1%BB%99c%2C%20t%E1%BB%89nh%20L%C3%A2m%20%C4%90%E1%BB%93ng";

  return (
    <section
      className="relative isolate mx-auto w-[83%] max-w-[420px] border-[1.5px] md:max-w-[560px] "
      style={{
        backgroundColor: cardBg,
        borderColor: isPink ? accentColor : textColor,
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.25) 4px 4px 2px",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-6 px-5 py-9 md:gap-7 md:px-8 md:py-11">
        <h2
          className="uppercase text-center relative z-10"
          style={{
            color: textColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: "700",
          }}
        >
          <span className="text-[20px] md:text-[24px]">
            <span>THÔNG TIN TIỆC&nbsp;CƯỚI</span>
          </span>
        </h2>

        <div
          className="flex w-full flex-col items-center gap-[10px] text-center"
          style={{
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            color: textColor,
          }}
        >
          <h3
            className="font-semibold uppercase text-[16px] md:text-[20px] flex flex-col items-center"
            style={{
              color: textColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span>Tiệc cưới sẽ diễn ra vào&nbsp;lúc:</span>
          </h3>

          <div
            className={`flex items-center justify-center gap-[25px] ${isRed ? "text-[15px]" : "text-[14px] md:text-[15px]"} uppercase font-semibold whitespace-nowrap min-w-max`}
            style={{
              color: accentColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span>{banquetTime}</span>
            <span>
              <span>{banquetDayOfWeek}</span>
            </span>
          </div>

          <div
            className="flex items-center justify-center gap-[9px]"
            style={{
              color: textColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span
              className="text-[52px] md:text-[57px] leading-none"
              style={{
                color: textColor,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              {banquetDay}
            </span>
            <div className="h-[46px] w-px" style={{ backgroundColor: textColor }} />
            <div className="flex flex-col items-start justify-center gap-1 text-left">
              <span
                className="text-[16px] md:text-[17px] uppercase"
                style={{
                  color: textColor,
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span>THÁNG {banquetMonth}</span>
              </span>
              <span
                className="text-[16px] md:text-[17px] uppercase"
                style={{
                  color: textColor,
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {banquetYear}
              </span>
            </div>
          </div>

          <div
            className={isRed ? "mx-auto max-w-[65%] text-xs md:text-sm uppercase tracking-[0.12em] font-semibold" : "text-xs md:text-sm uppercase tracking-[0.12em] font-semibold"}
            style={{
              color: accentColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            {banquetLunar}
          </div>

          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex flex-col items-center">
              <span
                className="text-[11px] uppercase"
                style={{
                  color: accentColor,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span>Đón khách</span>
              </span>
              <span
                className="text-[20px] font-semibold mt-1"
                style={{
                  color: textColor,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {receptionTime}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span
                className="text-[11px] uppercase"
                style={{
                  color: accentColor,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span>Khai tiệc</span>
              </span>
              <span
                className="text-[20px] font-semibold mt-1"
                style={{
                  color: textColor,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {feastTime}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center flex-col mt-4">
            <h2
              className={`${isRed ? "text-[19px]" : "text-[18px]"} md:text-[20px] uppercase font-normal`}
              style={{
                color: accentColor,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                fontWeight: 400,
              }}
            >
              <span>Cùng đếm&nbsp;ngược</span>
            </h2>
            <div
              className={`text-center mt-2 ${isRed ? "text-[19px]" : "text-[18px]"} md:text-[20px] font-semibold`}
              style={{
                color: accentColor,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <p className={isRed ? "max-w-[153.4px] inline-block" : ""}>{countdownText}</p>
            </div>
          </div>

          <div
            className="mt-3 w-full max-w-[308px] overflow-hidden rounded-[10px] px-3 pb-3 pt-1 md:max-w-[360px]"
            style={{ backgroundColor: textColor, color: "rgb(253, 249, 240)" }}
          >
            <div
              className="w-full max-w-[280px] md:max-w-[310px] mx-auto rounded-lg overflow-hidden !max-w-none !w-full mx-auto"
              style={{ color: "rgb(253, 249, 240)" }}
            >
              <div
                className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold tracking-wide border-b !font-bold text-[22px] md:text-[25px]"
                style={{
                  borderColor: "color-mix(in srgb, rgb(253, 249, 240) 27%, transparent 73%)",
                  fontFamily: '"The Nautigal", ChungDoiIndic, cursive',
                  color: "rgb(253, 249, 240)",
                }}
              >
                Tháng {banquetMonth} / {banquetYear}
              </div>
              <div className="grid grid-cols-7 border-b-2" style={{ borderColor: "rgb(253, 249, 240)" }}>
                {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((dayName) => (
                  <div key={dayName} className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">
                    {dayName}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
                {Array.from({ length: emptyDaysBefore }).map((_, i) => (
                  <div key={`empty-${i}`} className="flex items-center justify-center h-[30px] md:h-[34px]" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const isWeddingDay = dayNum === banquetDay;
                  return (
                    <div key={dayNum} className="flex items-center justify-center h-[30px] md:h-[34px]">
                      {isWeddingDay ? (
                        <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                          <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill="rgb(253, 249, 240)">
                            <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                          </svg>
                          <span
                            className="relative z-10 text-[11px] md:text-[12px] font-bold"
                            style={{ color: "rgb(51, 51, 51)" }}
                          >
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
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center text-[14px] underline underline-offset-4"
            style={{
              color: isPink || isRed ? accentColor : textColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              background: "none",
            }}
          >
            <span>Thêm vào lịch</span>
          </a>
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
        className="pointer-events-none absolute h-auto max-w-none z-20"
        src={`${assets}/flower.webp`}
        style={flower2Style}
      />
    </section>
  );
}
