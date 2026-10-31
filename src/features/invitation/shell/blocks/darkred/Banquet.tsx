import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { parseDate, WEEKDAYS_FULL, monthGrid, formatTime } from "@/utils/date";
import { googleCalendarUrl } from "@/utils/calendar";

export function Banquet({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, setRsvpOpen } = ctx;
  if (!d.partyOn) return null;

  const dt = parseDate(d.date);
  const weekday = dt ? WEEKDAYS_FULL[dt.getDay()] : "";
  const day = dt ? String(dt.getDate()).padStart(2, "0") : "";
  const month = dt ? String(dt.getMonth() + 1).padStart(2, "0") : "";
  const year = dt ? String(dt.getFullYear()) : "";
  const g = monthGrid(d.date);
  const selectedDay = dt ? dt.getDate() : 0;
  const lunar = d.ceremonies?.[0]?.lunar;

  const calUrl = googleCalendarUrl(d);

  return (
    <section className="relative z-10 mx-auto mb-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute block -left-[18%] top-[10%] z-20 w-[24%]"
        style={{ willChange: "transform", transform: "translateY(40px)" }}
      >
        <span
          className="block"
          style={{ animation: "6s ease-in-out 0.3s infinite normal none running drFloat", willChange: "transform" }}
        >
          <img
            alt=""
            className="block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]"
            src={`${t.assets}/flower2-decoration.webp`}
          />
        </span>
      </span>

      <div className="relative overflow-hidden rounded-[10px] px-5 py-9 text-center shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
        <div aria-hidden="true" className="absolute inset-0 rounded-[10px]" style={{ backgroundColor: "rgb(81, 20, 25)" }} />
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-40 rounded-[10px]"
          src={`${t.assets}/paper.webp`}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2
            className="uppercase text-center relative z-10"
            style={{
              color: "rgb(236, 228, 216)",
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            <span className="text-[20px]">
              <span>{d.banquetTitle || "THÔNG TIN TIỆC\u00a0CƯỚI"}</span>
            </span>
          </h2>

          <div
            className="flex flex-col items-center gap-4 md:gap-5 text-center"
            style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif', color: "rgb(236, 228, 216)" }}
          >
            <h3
              className="font-normal uppercase text-[16px] md:text-[20px] flex flex-col items-center"
              style={{
                color: "rgb(236, 228, 216)",
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                textTransform: "uppercase",
              }}
            >
              <span>Tiệc cưới sẽ diễn ra vào&nbsp;lúc:</span>
            </h3>

            <div
              className="flex w-full max-w-[130px] items-center justify-between px-0 text-[13px] md:text-[15px] uppercase whitespace-nowrap min-w-max gap-x-3"
              style={{
                color: "rgba(236, 228, 216, 0.7)",
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <span>{d.time || "18:00"}</span>
              <span>
                <span>{weekday ? weekday.toUpperCase() : ""}</span>
              </span>
            </div>

            <div
              className="flex items-center justify-center gap-4"
              style={{ color: "rgb(236, 228, 216)", fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}
            >
              <span className="text-[40px] md:text-[46px] leading-none" style={{ color: "rgb(236, 228, 216)", fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}>
                {day}
              </span>
              <div className="h-[46px] w-px" style={{ backgroundColor: "rgba(236, 228, 216, 0.45)" }} />
              <div className="flex flex-col items-start justify-center gap-1 text-left">
                <span className="text-[12px] md:text-[16px] uppercase" style={{ color: "rgb(236, 228, 216)", fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}>
                  <span>THÁNG {month}</span>
                </span>
                <span className="text-[18px] md:text-[24px]" style={{ color: "rgb(236, 228, 216)", fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}>
                  {year}
                </span>
              </div>
            </div>

            {lunar && (
              <div
                className="text-xs md:text-sm uppercase tracking-[0.12em] px-0"
                style={{
                  color: "rgba(236, 228, 216, 0.7)",
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                ({lunar})
              </div>
            )}

            {!d.hideWelcomeTimes && (
              <div className="flex items-center justify-center gap-8 mt-4">
                <div className="flex flex-col items-center">
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "rgba(236, 228, 216, 0.7)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
                  >
                    <span>Đón khách</span>
                  </span>
                  <span
                    className="text-lg md:text-xl font-medium mt-1"
                    style={{ color: "rgb(236, 228, 216)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
                  >
                    {d.welcomeTime || "17:30"}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "rgba(236, 228, 216, 0.7)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
                  >
                    <span>Khai tiệc</span>
                  </span>
                  <span
                    className="text-lg md:text-xl font-medium mt-1"
                    style={{ color: "rgb(236, 228, 216)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
                  >
                    {d.time || "18:00"}
                  </span>
                </div>
              </div>
            )}

            <div
              className="mt-3 mx-auto w-fit max-w-full overflow-hidden rounded-[10px] px-4 pb-4 pt-2"
              style={{ backgroundColor: "rgb(236, 228, 216)" }}
            >
              <div
                className="w-full max-w-[280px] md:max-w-[310px] mx-auto rounded-lg overflow-hidden !max-w-none !w-[280px] md:!w-[330px] mx-auto"
                style={{ color: "rgb(81, 20, 25)" }}
              >
                <div
                  className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold tracking-wide border-b !font-normal"
                  style={{
                    borderColor: "color-mix(in srgb, rgb(81, 20, 25) 27%, transparent 73%)",
                    fontFamily: '"The Nautigal", ChungDoiIndic, cursive',
                    color: "rgb(81, 20, 25)",
                    fontSize: "25px",
                  }}
                >
                  Tháng {dt ? dt.getMonth() + 1 : 1} / {year}
                </div>
                <div className="grid grid-cols-7 border-b-2" style={{ borderColor: "rgb(81, 20, 25)" }}>
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((dayName) => (
                    <div
                      key={dayName}
                      className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60"
                    >
                      {dayName}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
                  {g.cells.map((cell, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-center justify-center h-[30px] md:h-[34px]"
                    >
                      {cell ? (
                        cell === selectedDay ? (
                          <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                            <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill="#511419">
                              <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                            </svg>
                            <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: "rgb(255, 255, 255)" }}>
                              {cell}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[12px] md:text-[13px]">{cell}</span>
                        )
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center text-sm underline underline-offset-4"
              style={{ color: "rgb(236, 228, 216)", fontFamily: '"Times New Roman", ChungDoiIndic, serif', background: "none" }}
            >
              <span>Thêm vào lịch</span>
            </a>
          </div>

          {d.rsvpOn && (
            <div className="relative z-10 mt-1 flex w-full flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => setRsvpOpen(true)}
                className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm tracking-wide transition-transform hover:scale-[1.03]"
                style={{
                  backgroundColor: "rgb(236, 228, 216)",
                  color: "rgb(81, 20, 25)",
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">
                  <span>XÁC NHẬN THAM DỰ</span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
