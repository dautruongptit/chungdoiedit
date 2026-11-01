import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}

export function Banquet({ ctx }: { ctx: InvitationCtx }) {
  const d = (ctx.d || {}) as any;
  const theme = getBohoFloralTheme(ctx);

  const banquetTime = toStr(d.banquetTime || d.time, theme.isGreen ? "18:00" : "10:30");
  const guestReception = toStr(d.guestReception, "17:30");
  const partyStart = toStr(d.partyStart, banquetTime);

  const banquetDate = toStr(d.date, theme.isGreen ? "2026-05-24" : theme.isPink ? "2026-02-01" : "2026-05-10");
  const parts = String(banquetDate).split(/[-/]/);
  const yearNum = Number(parts[0]) || 2026;
  const monthNum = Number(parts[1]) || (theme.isPink ? 2 : 5);
  const dayNum = Number(parts[2]) || (theme.isGreen ? 24 : theme.isPink ? 1 : 10);

  const dateObj = new Date(yearNum, monthNum - 1, dayNum);
  const WEEKDAYS = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];
  const dayOfWeek = WEEKDAYS[dateObj.getDay()] || "CHỦ NHẬT";

  const dayStr = String(dayNum).padStart(2, "0");
  const monthStr = String(monthNum).padStart(2, "0");
  const yearStr = String(yearNum);

  const lunarText = theme.isPink
    ? "( Tức ngày 14 tháng 12 năm Ất\u00A0Tỵ)"
    : theme.isBrown
    ? "( Tức ngày 24 tháng 3 năm Bính\u00A0Ngọ)"
    : "( Tức ngày 8 tháng 4 năm Bính\u00A0Ngọ)";

  // Calendar calculation
  // Days in month
  const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
  // First day weekday index (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayWeekday = new Date(yearNum, monthNum - 1, 1).getDay();
  // We want Monday = 0, Tuesday = 1, ..., Sunday = 6
  const emptyBefore = (firstDayWeekday + 6) % 7;

  const calendarDays = [];
  for (let i = 0; i < emptyBefore; i++) {
    calendarDays.push({ empty: true, num: 0 });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ empty: false, num: i });
  }

  // Google Calendar URL
  const groomName = toStr(d.groomFullName || d.groomShortName, "Trần Minh Quân");
  const brideName = toStr(d.brideFullName || d.brideShortName, "Nguyễn Thu Hà");
  const eventTitle = encodeURIComponent(`Đám cưới ${groomName} & ${brideName}`);
  const eventAddress = encodeURIComponent(toStr(d.address, ""));
  const eventDesc = encodeURIComponent(`Tiệc cưới của ${groomName} & ${brideName} tại ${toStr(d.address, "")}`);
  const pad = (n: number) => String(n).padStart(2, "0");
  const calStartStr = `${yearNum}${pad(monthNum)}${pad(dayNum)}T110000Z`;
  const calEndStr = `${yearNum}${pad(monthNum)}${pad(dayNum)}T130000Z`;
  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${calStartStr}/${calEndStr}&ctz=Asia/Saigon&details=${eventDesc}&location=${eventAddress}`;

  return (
    <div
      className="flex flex-col items-center gap-4 md:gap-5 text-center"
      data-landing-screenshot-id="invite-reception"
      style={{
        fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
        color: theme.primaryColor,
      }}
    >
      <h3
        className="font-normal uppercase text-[16px] md:text-[20px] flex flex-col items-center"
        style={{ color: theme.primaryColor }}
      >
        <span dir="auto">Tiệc cưới sẽ diễn ra vào&nbsp;lúc:</span>
      </h3>
      <div
        className="text-[20px] md:text-[30px]"
        style={{ color: theme.primaryColor, fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
      >
        {banquetTime}
      </div>
      <div
        className="flex items-center gap-6"
        style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif', fontWeight: 600 }}
      >
        <span
          className="text-[12px] md:text-[16px] uppercase"
          style={{
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          <span dir="auto">{dayOfWeek}</span>
        </span>
        <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: theme.primaryColor }} />
        <span
          className="text-[30px] md:text-[40px]"
          style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif', fontWeight: 600 }}
        >
          {dayStr}
        </span>
        <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: theme.primaryColor }} />
        <span
          className="text-[12px] md:text-[16px] uppercase"
          style={{
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          <span dir="auto">THÁNG {monthStr}</span>
        </span>
      </div>
      <div
        className="text-[18px] md:text-[24px]"
        style={{ color: theme.primaryColor, fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
      >
        {yearStr}
      </div>
      <div
        className="text-xs md:text-sm uppercase tracking-[0.25em]"
        style={{ color: theme.primaryColor, fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
      >
        {lunarText}
      </div>

      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex flex-col items-center">
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: theme.primaryColor, fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
          >
            <span dir="auto">Đón khách</span>
          </span>
          <span
            className="text-lg md:text-xl font-medium mt-1"
            style={{
              color: theme.primaryColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              fontWeight: 600,
            }}
          >
            {guestReception}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: theme.primaryColor, fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
          >
            <span dir="auto">Khai tiệc</span>
          </span>
          <span
            className="text-lg md:text-xl font-medium mt-1"
            style={{
              color: theme.primaryColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              fontWeight: 600,
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
            borderColor: `color-mix(in srgb, ${theme.primaryColor} 27%, transparent 73%)`,
            color: theme.primaryColor,
          }}
        >
          <div
            className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold tracking-wide border-b "
            style={{ borderColor: `color-mix(in srgb, ${theme.primaryColor} 27%, transparent 73%)` }}
          >
            Tháng {monthNum} / {yearNum}
          </div>
          <div className="grid grid-cols-7 border-b-2" style={{ borderColor: theme.primaryColor }}>
            <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T2</div>
            <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T3</div>
            <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T4</div>
            <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T5</div>
            <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T6</div>
            <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T7</div>
            <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">CN</div>
          </div>
          <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
            {calendarDays.map((cd, idx) => {
              if (cd.empty) {
                return <div key={idx} className="flex items-center justify-center h-[30px] md:h-[34px]" />;
              }
              const isWeddingDay = cd.num === dayNum;
              if (isWeddingDay) {
                return (
                  <div key={idx} className="flex items-center justify-center h-[30px] md:h-[34px]">
                    <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                      <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill={theme.primaryHex}>
                        <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                      </svg>
                      <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: "rgb(255, 255, 255)" }}>
                        {cd.num}
                      </span>
                    </div>
                  </div>
                );
              }
              return (
                <div key={idx} className="flex items-center justify-center h-[30px] md:h-[34px]">
                  <span className="text-[12px] md:text-[13px]">{cd.num}</span>
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
        className="mt-4 inline-flex items-center justify-center text-sm tracking-wider underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
        data-showcase-join-prev=""
        style={{ color: theme.primaryColor, background: "none" }}
      >
        <span dir="auto">Thêm vào lịch</span>
      </a>
    </div>
  );
}
