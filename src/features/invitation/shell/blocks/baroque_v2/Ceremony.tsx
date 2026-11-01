import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme, str } from "./themeVars";

export function Ceremony({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);
  const d = ctx.d as any;

  const groomFather = str(d.groomFather, "Lý Đình Khang");
  const groomMother = str(d.groomMother, "Trương Thị Bích Vân");
  const groomAddress = str(d.groomAddress, "Số 27 Lê Lợi, phường Thắng Lợi,\nthành phố Buôn Ma Thuột, tỉnh Đắk Lắk");

  const brideFather = str(d.brideFather, "Phan Hữu Nghĩa");
  const brideMother = str(d.brideMother, "Đoàn Thị Kim Yến");
  const brideAddress = str(d.brideAddress, "Thôn Tân Lập, xã Ea Kmút,\nhuyện Ea Kar, tỉnh Đắk Lắk");

  const groomFullName = str(d.groomFullName, "Lý Gia Bảo");
  const brideFullName = str(d.brideFullName, "Phan Ngọc Diệp");

  const groomOrder = str(d.groomBirthOrder, "Trưởng Nam");
  const brideOrder = str(d.brideBirthOrder, "Út Nữ");

  // Ngày giờ hôn lễ
  const cTime = d.ceremonyTime || "09:00";
  // Parse ceremonyDate hoặc date
  const cDateStr = d.ceremonyDate || d.date || "2026-12-19";
  let cDay = "19";
  let cMonth = "12";
  let cYear = "2026";
  let dayOfWeek = "THỨ BẢY";
  try {
    const parts = cDateStr.split("-");
    if (parts.length === 3) {
      cYear = parts[0];
      cMonth = parts[1];
      cDay = parts[2];
      const dt = new Date(Number(cYear), Number(cMonth) - 1, Number(cDay));
      const days = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];
      dayOfWeek = days[dt.getDay()];
    }
  } catch (e) {}

  const monthStr = `THÁNG ${cMonth.padStart(2, "0")}`;

  // Lunar text
  let lunarCore = "Tức ngày 11 tháng 11 năm Bính Ngọ";
  if (theme.variant === "darkgreen") {
    lunarCore = "Tức ngày 9 tháng 12 năm Bính Ngọ";
  } else if (theme.variant === "darkblue") {
    lunarCore = "Tức ngày 7 tháng 2 năm Đinh Mùi";
  }

  return (
    <section className="relative isolate flex w-full flex-col items-center">
      <img
        alt=""
        aria-hidden="true"
        className={`pointer-events-none mx-auto block h-auto ${theme.ceremony.goldenLineWidthClass} object-contain`}
        loading="lazy"
        decoding="async"
        src={theme.goldenLine}
        style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}
      />
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none top-[var(--orn-top)] md:top-[var(--orn-top-md)]"
        loading="lazy"
        decoding="async"
        src={theme.flower5}
        style={theme.ceremony.flower5Style(false)}
      />
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] h-auto max-w-none top-[var(--orn-top)] md:top-[var(--orn-top-md)]"
        loading="lazy"
        decoding="async"
        src={theme.flower5}
        style={theme.ceremony.flower5Style(true)}
      />

      <div className={`relative z-10 flex w-full max-w-[366px] flex-col items-center gap-6 px-5 ${theme.ceremony.ptClass} md:max-w-[520px] md:gap-8 md:px-8`}>
        <h2
          className="uppercase text-center relative z-10 text-[20px] md:text-[24px]"
          style={{
            color: theme.goldColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
          }}
        >
          <span dir="auto">{"THÔNG TIN LỄ\u00A0CƯỚI"}</span>
        </h2>

        <div
          className="relative grid w-full grid-cols-[1fr_auto_1fr] grid-rows-[repeat(4,auto)] justify-center gap-x-[14px] gap-y-[3px] text-center"
          style={{
            color: theme.goldColor,
            fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <div className="row-span-4 grid grid-rows-subgrid min-w-0 justify-items-center">
            <span className="text-[12px] md:text-[14px]" style={{ color: theme.textColor }}>
              <span dir="auto">Ông Bà</span>
            </span>
            <span className="text-[12px] md:text-[14px] font-semibold [overflow-wrap:anywhere]" style={{ color: theme.goldColor }}>
              <span dir="auto">{groomFather}</span>
            </span>
            <span className="text-[12px] md:text-[14px] font-semibold [overflow-wrap:anywhere]" style={{ color: theme.goldColor }}>
              <span dir="auto">{groomMother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 flex w-full flex-col whitespace-pre-line text-[10px] leading-tight md:text-[12px]"
              style={{
                color: theme.textColor,
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
              }}
            >
              <span dir="auto">{groomAddress}</span>
            </div>
          </div>

          <img
            alt=""
            aria-hidden="true"
            className="row-span-4 block h-[84px] w-auto max-w-none shrink-0 self-center object-contain md:h-[104px]"
            loading="lazy"
            decoding="async"
            src={theme.line3}
          />

          <div className="row-span-4 grid grid-rows-subgrid min-w-0 justify-items-center">
            <span className="text-[12px] md:text-[14px]" style={{ color: theme.textColor }}>
              <span dir="auto">Ông Bà</span>
            </span>
            <span className="text-[12px] md:text-[14px] font-semibold [overflow-wrap:anywhere]" style={{ color: theme.goldColor }}>
              <span dir="auto">{brideFather}</span>
            </span>
            <span className="text-[12px] md:text-[14px] font-semibold [overflow-wrap:anywhere]" style={{ color: theme.goldColor }}>
              <span dir="auto">{brideMother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 flex w-full flex-col whitespace-pre-line text-[10px] leading-tight md:text-[12px]"
              style={{
                color: theme.textColor,
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
              }}
            >
              <span dir="auto">{brideAddress}</span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[10px]">
          <div
            className="relative flex flex-col gap-[3px] text-center text-[16px] md:text-[20px] uppercase mx-auto md:max-w-[560px]"
            style={{
              whiteSpace: "pre-line",
              fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
              color: theme.goldColor,
            }}
          >
            <span dir="auto">{"TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}</span>
          </div>
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none block h-auto w-[143px] max-w-none object-contain md:w-[180px]"
            loading="lazy"
            decoding="async"
            src={theme.line2}
            style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}
          />
        </div>

        <div data-showcase-keep="" className="w-full min-w-0 relative flex w-full min-w-0 flex-col items-center text-center gap-3 md:gap-4">
          <h3
            className={`w-[80%] min-h-[80px] flex items-center justify-center leading-[54px] md:leading-[62px] whitespace-nowrap font-normal ${theme.ceremony.namesSizeClass || ""}`}
            style={{
              fontSize: theme.ceremony.namesSizeClass ? undefined : theme.ceremony.namesSize,
              fontFamily: theme.ceremony.namesFont,
              color: theme.goldColor,
              fontWeight: 400,
            }}
          >
            {groomFullName}
          </h3>
          <div
            className="text-[10px] md:text-[12px] uppercase"
            style={{
              color: theme.textColor,
              fontFamily: 'Uchen, Baskerville, ChungDoiIndic, serif',
              letterSpacing: "0.14em",
            }}
          >
            <span dir="auto">{groomOrder}</span>
          </div>
          <div
            className="text-[35px] leading-none"
            style={{
              color: theme.goldColor,
              fontFamily: '"Ms Madi", ChungDoiIndic, cursive',
            }}
          >
            &amp;
          </div>
          <h3
            className={`w-[80%] min-h-[80px] flex items-center justify-center leading-[54px] md:leading-[62px] whitespace-nowrap font-normal ${theme.ceremony.namesSizeClass || ""}`}
            style={{
              fontSize: theme.ceremony.namesSizeClass ? undefined : theme.ceremony.namesSize,
              fontFamily: theme.ceremony.namesFont,
              color: theme.goldColor,
              fontWeight: 400,
            }}
          >
            {brideFullName}
          </h3>
          <div
            className="text-[10px] md:text-[12px] uppercase"
            style={{
              color: theme.textColor,
              fontFamily: 'Uchen, Baskerville, ChungDoiIndic, serif',
              letterSpacing: "0.14em",
            }}
          >
            <span dir="auto">{brideOrder}</span>
          </div>
        </div>

        <div
          className="relative flex flex-col items-center gap-[6px] text-center"
          style={{
            fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <div style={{ color: theme.goldColor }}>
            <span dir="auto" className="whitespace-pre-line font-normal text-[16px] md:text-[20px] whitespace-pre-line text-center uppercase">
              {theme.ceremony.ceremonyHeading}
            </span>
          </div>
          <div
            className="flex items-center justify-center gap-[15px] text-[12px] md:text-[14px] uppercase whitespace-nowrap min-w-max"
            style={{
              color: theme.textColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span>{`VÀO LÚC ${cTime}`}</span>
            <span><span dir="auto">{dayOfWeek}</span></span>
          </div>
          <div className="flex items-center justify-center gap-[9px]" style={{ color: theme.goldColor }}>
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
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                color: theme.goldColor,
              }}
            >
              {cDay}
            </span>
            <div className="h-[46px] w-px" style={{ backgroundColor: theme.goldColor }} />
            <div className="flex flex-col items-start justify-center gap-1 text-left">
              <span
                className="text-[16px] md:text-[17px] uppercase"
                style={{
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  color: theme.goldColor,
                }}
              >
                <span dir="auto">{monthStr}</span>
              </span>
              <span
                className="text-[16px] md:text-[17px] uppercase"
                style={{
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  color: theme.goldColor,
                }}
              >
                {cYear}
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
            className="text-xs md:text-sm uppercase tracking-[0.12em]"
            style={{
              color: theme.textColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            {"("}{lunarCore}{")"}
          </div>
        </div>
      </div>

      <img
        alt=""
        aria-hidden="true"
        className={`pointer-events-none mx-auto block h-auto ${theme.ceremony.goldenLineWidthClass} object-contain mt-6 md:mt-8`}
        loading="lazy"
        decoding="async"
        src={theme.goldenLine}
        style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}
      />
    </section>
  );
}
