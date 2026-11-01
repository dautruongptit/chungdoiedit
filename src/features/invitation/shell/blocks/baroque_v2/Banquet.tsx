import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme } from "./themeVars";

export function Banquet({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);
  const d = ctx.d as any;

  const bTime = d.banquetTime || d.time || "18:00";
  const bDateStr = d.date || "2026-12-19";
  let bDay = "19";
  let bMonth = "12";
  let bYear = "2026";
  let dayOfWeek = "THỨ BẢY";
  try {
    const parts = bDateStr.split("-");
    if (parts.length === 3) {
      bYear = parts[0];
      bMonth = parts[1];
      bDay = parts[2];
      const dt = new Date(Number(bYear), Number(bMonth) - 1, Number(bDay));
      const days = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];
      dayOfWeek = days[dt.getDay()];
    }
  } catch (e) {}

  const monthStr = `THÁNG ${bMonth.padStart(2, "0")}`;

  let lunarCore = "Tức ngày 11 tháng 11 năm Bính Ngọ";
  let countdownText = "48 ngày 10 giờ 4 phút 52 giây";
  if (theme.variant === "darkgreen") {
    lunarCore = "Tức ngày 9 tháng 12 năm Bính Ngọ";
    countdownText = "76 ngày 10 giờ 4 phút 32 giây";
  } else if (theme.variant === "darkblue") {
    lunarCore = "Tức ngày 7 tháng 2 năm Đinh Mùi";
    countdownText = "133 ngày 10 giờ 4 phút 18 giây";
  }

  if (d.countdownText) {
    countdownText = d.countdownText;
  }

  const receptionTime = d.guestReceptionTime || "17:00";
  const partyTime = d.banquetTime || d.time || "18:00";

  // Calendar calculations
  const yearInt = parseInt(bYear, 10);
  const monthInt = parseInt(bMonth, 10);
  const selectedDay = parseInt(bDay, 10);

  // First day of month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDay = new Date(yearInt, monthInt - 1, 1).getDay();
  // Monday-first index: Monday = 0, Sunday = 6
  const blankCount = (firstDay + 6) % 7;
  const daysInMonth = new Date(yearInt, monthInt, 0).getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < blankCount; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const calMonthHeader = `Tháng ${monthInt} / ${yearInt}`;

  const calUrl =
    d.calendarUrl ||
    `https://www.google.com/calendar/render?action=TEMPLATE&text=%C4%90%C3%A1m%20c%C6%B0%E1%BB%9Bi%20${encodeURIComponent(
      d.groomFullName || "Lý Gia Bảo"
    )}%20%26%20${encodeURIComponent(d.brideFullName || "Phan Ngọc Diệp")}`;

  return (
    <section className="relative isolate flex w-full flex-col items-center">
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none"
        loading="lazy"
        decoding="async"
        src={theme.flower3}
        style={theme.banquet.flower3LeftStyle}
      />
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none"
        loading="lazy"
        decoding="async"
        src={theme.flower3}
        style={theme.banquet.flower3RightStyle}
      />
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none"
        loading="lazy"
        decoding="async"
        src={theme.flower4}
        style={theme.banquet.flower4LeftStyle}
      />
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none"
        loading="lazy"
        decoding="async"
        src={theme.flower4}
        style={theme.banquet.flower4RightStyle}
      />

      <div className="relative z-10 flex w-full max-w-[400px] flex-col items-center gap-[10px] px-5 pb-10 pt-[76px] md:max-w-[560px] md:px-8 md:pt-[92px]">
        <h2
          className="uppercase text-center relative z-10 text-[20px] md:text-[24px]"
          style={{
            color: theme.goldColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
          }}
        >
          <span dir="auto">{"THÔNG TIN TIỆC\u00A0CƯỚI"}</span>
        </h2>

        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none mb-3 block h-auto w-[143px] max-w-none object-contain md:w-[180px]"
          loading="lazy"
          decoding="async"
          src={theme.line2}
          style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}
        />

        <div
          className="flex w-full flex-col items-center gap-[10px] text-center"
          data-landing-screenshot-id="invite-reception"
          style={{
            fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
            color: theme.goldColor,
          }}
        >
          <h3
            className="font-semibold uppercase text-[16px] md:text-[20px] flex flex-col items-center"
            style={{
              color: theme.goldColor,
              fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">{"Tiệc cưới sẽ diễn ra vào\u00A0lúc:"}</span>
          </h3>

          <div
            className="flex items-center justify-center gap-[25px] text-[14px] md:text-[15px] uppercase font-semibold whitespace-nowrap min-w-max"
            style={{
              color: theme.textColor,
              fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span>{bTime}</span>
            <span><span dir="auto">{dayOfWeek}</span></span>
          </div>

          <div
            className="flex items-center justify-center gap-[9px]"
            style={{
              color: theme.goldColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none block h-[84px] w-auto max-w-none shrink-0 object-contain md:h-[91px]"
              loading="lazy"
              decoding="async"
              src={theme.line4}
              style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}
            />
            <span
              className="text-[52px] md:text-[57px] leading-none"
              style={{
                color: theme.goldColor,
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              {bDay}
            </span>
            <div className="h-[46px] w-px" style={{ backgroundColor: theme.goldColor }} />
            <div className="flex flex-col items-start justify-center gap-1 text-left">
              <span
                className="text-[16px] md:text-[17px] uppercase"
                style={{
                  color: theme.goldColor,
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span dir="auto">{monthStr}</span>
              </span>
              <span
                className="text-[16px] md:text-[17px] uppercase"
                style={{
                  color: theme.goldColor,
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {bYear}
              </span>
            </div>
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none block h-[84px] w-auto max-w-none shrink-0 object-contain md:h-[91px]"
              loading="lazy"
              decoding="async"
              src={theme.line4}
              style={{
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)",
                transform: "scaleX(-1)",
              }}
            />
          </div>

          <div
            className="text-xs md:text-sm uppercase tracking-[0.12em] font-semibold"
            style={{
              color: theme.textColor,
              fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            {"("}{lunarCore}{")"}
          </div>

          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex flex-col items-center">
              <span
                className="text-[11px] md:text-[13px] uppercase"
                style={{
                  color: theme.textColor,
                  fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span dir="auto">Đón khách</span>
              </span>
              <span
                className="text-[20px] font-semibold mt-1"
                style={{
                  color: theme.goldColor,
                  fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {receptionTime}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span
                className="text-[11px] md:text-[13px] uppercase"
                style={{
                  color: theme.textColor,
                  fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span dir="auto">Khai tiệc</span>
              </span>
              <span
                className="text-[20px] font-semibold mt-1"
                style={{
                  color: theme.goldColor,
                  fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {partyTime}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center flex-col mt-4">
            <h2
              className="text-[18px] md:text-[20px] uppercase font-normal"
              style={{
                color: theme.textColor,
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                fontWeight: 400,
              }}
            >
              <span dir="auto">{"Cùng đếm\u00A0ngược"}</span>
            </h2>
            <div
              className="text-center mt-2 text-[18px] md:text-[20px] font-semibold"
              style={{
                color: theme.textColor,
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <p>{countdownText}</p>
            </div>
          </div>

          <div className="mt-4 w-full max-w-[300px] px-2 md:max-w-[360px]">
            <div
              data-showcase-keep=""
              className="w-full max-w-[280px] md:max-w-[310px] mx-auto rounded-lg overflow-hidden !max-w-none !w-full mx-auto"
              style={{ color: theme.goldColor }}
            >
              <div
                className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold tracking-wide border-b text-[18px] md:text-[20px]"
                style={{
                  borderColor: "color-mix(in srgb, rgb(255, 223, 175) 27%, transparent 73%)",
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  color: theme.goldColor,
                }}
              >
                {calMonthHeader}
              </div>
              <div className="grid grid-cols-7 border-b-2" style={{ borderColor: theme.goldColor }}>
                <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T2</div>
                <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T3</div>
                <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T4</div>
                <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T5</div>
                <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T6</div>
                <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T7</div>
                <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">CN</div>
              </div>
              <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
                {calendarDays.map((num, i) => {
                  if (num === null) {
                    return <div key={i} className="flex items-center justify-center h-[30px] md:h-[34px]" />;
                  }
                  if (num === selectedDay) {
                    return (
                      <div key={i} className="flex items-center justify-center h-[30px] md:h-[34px]">
                        <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                          <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill="#ffdfaf">
                            <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                          </svg>
                          <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: "rgb(51, 51, 51)" }}>
                            {num}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="flex items-center justify-center h-[30px] md:h-[34px]">
                      <span className="text-[12px] md:text-[13px]">{num}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center text-[14px] underline underline-offset-4"
            data-showcase-join-prev=""
            style={{
              color: theme.goldColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              background: "none",
            }}
          >
            <span dir="auto">Thêm vào lịch</span>
          </a>
        </div>
      </div>
    </section>
  );
}
