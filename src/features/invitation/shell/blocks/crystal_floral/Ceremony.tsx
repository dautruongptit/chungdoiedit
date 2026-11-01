import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

function parseDateParts(dateStr: string, timeStr?: string) {
  const [yStr, mStr, dStr] = (dateStr || "2026-09-19").split("-");
  const year = parseInt(yStr, 10) || 2026;
  const month = parseInt(mStr, 10) || 9;
  const day = parseInt(dStr, 10) || 19;
  const dt = new Date(year, month - 1, day);
  const WEEKDAYS = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"];
  const dayOfWeek = WEEKDAYS[dt.getDay()];
  const monthFormatted = `THÁNG ${String(month).padStart(2, "0")}`;
  return {
    time: timeStr || "09:00",
    dayOfWeek,
    day: String(day),
    month: monthFormatted,
    year: String(year),
    monthNum: month,
    yearNum: year,
    dayNum: day,
  };
}

export function Ceremony({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");
  const [activePhotoIdx, setActivePhotoIdx] = useState(vars.albumInitialSlide ?? 0);

  const groomName = d?.groomFullName || "Phạm Bảo Lâm";
  const brideName = d?.brideFullName || "Nguyễn Thanh Trúc";
  const groomOrder = (typeof d?.groomBirthOrder === "string" ? d.groomBirthOrder : d?.groomBirthOrder?.vi) || "Út Nam";
  const brideOrder = (typeof d?.brideBirthOrder === "string" ? d.brideBirthOrder : d?.brideBirthOrder?.vi) || "Thứ Nữ";

  const ceremonyTitleRaw = (typeof d?.ceremonyInfoTitle === "string" ? d.ceremonyInfoTitle : d?.ceremonyInfoTitle?.vi) || (vars.templateId === "crystal_floral_blue" ? "THÔNG TIN LỄ CƯỚI" : "THÔNG TIN BUỔI LỄ");
  const ceremonyTitle = ceremonyTitleRaw.replace(/\s+(\S+)$/, "\u00A0$1");

  const receptionTitleRaw = (typeof d?.receptionInfoTitle === "string" ? d.receptionInfoTitle : d?.receptionInfoTitle?.vi) || (vars.templateId === "crystal_floral_blue" ? "THÔNG TIN TIỆC CƯỚI" : "THÔNG TIN TIỆC BÁO HỶ");
  const receptionTitle = receptionTitleRaw.replace(/\s+(\S+)$/, "\u00A0$1");

  const announcementRaw = (typeof d?.customAnnouncementText === "string" ? d.customAnnouncementText : d?.customAnnouncementText?.vi) || "TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI";

  const groomParents = (d?.groomParents && d.groomParents.father) ? d.groomParents : vars.groomParents;
  const brideParents = (d?.brideParents && d.brideParents.father) ? d.brideParents : vars.brideParents;

  const cItem = d?.ceremonies?.[0];
  const cDateStr = cItem?.date || (typeof d?.ceremonyDate === "string" ? d.ceremonyDate : undefined) || (vars.templateId === "crystal_floral_green" ? "2026-11-22" : vars.templateId === "crystal_floral_red" ? "2026-12-19" : "2026-09-19");
  const cTimeStr = cItem?.time || (vars.templateId === "crystal_floral_green" ? "10:00" : "09:00");
  const cDate = parseDateParts(cDateStr, cTimeStr);

  const rDateStr = d?.date || d?.banquetDate || (vars.templateId === "crystal_floral_green" ? "2026-11-22" : vars.templateId === "crystal_floral_red" ? "2026-12-19" : "2026-09-19");
  const rTimeStr = d?.time || d?.banquetTime || (vars.templateId === "crystal_floral_green" ? "18:00" : vars.templateId === "crystal_floral_red" ? "18:30" : "11:30");
  const rDate = parseDateParts(rDateStr, rTimeStr);
  const rWelcomeTime = d?.guestReceptionTime || (vars.templateId === "crystal_floral_blue" ? "10:30" : "17:30");
  const rBanquetTime = rDate.time;

  const cHeader = typeof cItem?.header === "string" ? cItem.header : (cItem?.header?.vi || vars.ceremonyHeader);
  const rHeading = (typeof d?.receptionHeading === "string" ? d.receptionHeading : (d?.receptionHeading?.vi || vars.receptionHeading)).replace(/\s+(\S+)$/, "\u00A0$1");

  const photos = (d?.album && d.album.length > 0) ? d.album : vars.defaultPhotos;

  const nextPhoto = () => setActivePhotoIdx((p) => (p + 1) % photos.length);
  const prevPhoto = () => setActivePhotoIdx((p) => (p - 1 + photos.length) % photos.length);

  const cLunarCore = vars.lunarCore;
  const rLunarCore = vars.lunarCore;

  return (
    <section className="relative isolate px-[12px] md:px-[24px] pt-[8px] md:pt-[24px] pb-[40px] md:pb-[64px] z-10">
      <div className="relative z-10 flex flex-col gap-6 md:gap-8">
        {/* Tiêu đề Lễ Cưới */}
        <h2
          className="uppercase font-bold text-[20px] md:text-[24px] text-center"
          style={{
            color: vars.primaryColor,
            fontFamily: '"Times New Roman", Times, ChungDoiIndic, serif',
            fontWeight: 700,
            letterSpacing: vars.headingLetterSpacing,
          }}
        >
          <span dir="auto">{ceremonyTitle}</span>
        </h2>

        {/* Phụ mẫu hai bên */}
        <div
          className="w-full grid grid-cols-[1fr_auto_1fr] justify-center gap-x-3 md:gap-x-8 grid-rows-[repeat(4,auto)] gap-y-1"
          style={{
            color: vars.primaryColor,
            fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {/* Nhà trai */}
          <div className="row-span-4 grid grid-rows-subgrid justify-items-center justify-self-stretch md:justify-self-center w-full min-w-0 text-center max-w-[180px] md:max-w-[300px]">
            <span className="text-[13px] md:text-[15px] mb-1" style={{ color: vars.textColor }}>
              <span dir="auto">Ông Bà</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                color: vars.primaryColor,
                fontSize: "13px",
              }}
            >
              <span dir="auto">{groomParents.father}</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                color: vars.primaryColor,
                fontSize: "13px",
              }}
            >
              <span dir="auto">{groomParents.mother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] text-[12px] md:text-[13px] mt-2 whitespace-pre-line leading-snug flex flex-col"
              style={{ color: vars.textColor }}
            >
              <span dir="auto">{groomParents.address}</span>
            </div>
          </div>

          {/* Vạch kẻ đứng */}
          <div
            className="row-span-4 w-[1px] h-[60px] md:h-[80px] self-center"
            style={{ backgroundColor: vars.primaryColor, opacity: 0.5 }}
          />

          {/* Nhà gái */}
          <div className="row-span-4 grid grid-rows-subgrid justify-items-center justify-self-stretch md:justify-self-center w-full min-w-0 text-center max-w-[180px] md:max-w-[300px]">
            <span className="text-[13px] md:text-[15px] mb-1" style={{ color: vars.textColor }}>
              <span dir="auto">Ông Bà</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                color: vars.primaryColor,
                fontSize: "13px",
              }}
            >
              <span dir="auto">{brideParents.father}</span>
            </span>
            <span
              className="font-semibold [overflow-wrap:anywhere] [overflow-wrap:anywhere]"
              style={{
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                color: vars.primaryColor,
                fontSize: "13px",
              }}
            >
              <span dir="auto">{brideParents.mother}</span>
            </span>
            <div
              className="whitespace-pre-line [overflow-wrap:anywhere] text-[12px] md:text-[13px] mt-2 whitespace-pre-line leading-snug flex flex-col"
              style={{ color: vars.textColor }}
            >
              <span dir="auto">{brideParents.address}</span>
            </div>
          </div>
        </div>

        {/* Báo tin */}
        <div
          className="relative text-center text-[16px] md:text-[20px] flex flex-col gap-2 uppercase tracking-[0.04em] mx-auto md:max-w-[560px]"
          style={{
            whiteSpace: "pre-line",
            fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
            color: vars.primaryColor,
          }}
        >
          <span dir="auto">{announcementRaw}</span>
        </div>

        {/* Tên Cô Dâu Chú Rể + Decor Hoa phải */}
        <div className="relative">
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-[-12px] md:right-[-24px] w-auto max-w-none object-contain z-0"
            loading="lazy"
            decoding="async"
            src={vars.flower2}
            style={{
              height: "calc(0.35504 * min(100vw, 898px))",
              willChange: "transform",
              transform: `translate(25%, calc(-50% + ${vars.flowerOffsets.f2Ceremony})) rotate(-20deg)`,
            }}
          />
          <div className="relative z-10">
            <div
              data-showcase-keep=""
              className="w-full min-w-0 relative flex w-full min-w-0 flex-col items-center text-center gap-3 md:gap-4"
            >
              <h3
                className="w-[80%] min-h-[80px] flex items-center justify-center leading-[42px] md:leading-[60px] whitespace-nowrap font-normal"
                style={{
                  fontSize: vars.cdcrFontSize || "34px",
                  fontFamily: '"EB Garamond", ChungDoiIndic, serif',
                  color: vars.primaryColor,
                  fontWeight: 400,
                }}
              >
                {groomName}
              </h3>
              <div
                className="uppercase tracking-[0.18em]"
                style={{
                  color: vars.textColor,
                  fontFamily: '"Cormorant Garamond", "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span dir="auto">{groomOrder}</span>
              </div>
              <div
                className="text-[30px] md:text-[40px]"
                style={{
                  color: vars.primaryColor,
                  fontFamily: '"EB Garamond", ChungDoiIndic, serif',
                }}
              >
                &amp;
              </div>
              <h3
                className="w-[80%] min-h-[80px] flex items-center justify-center leading-[42px] md:leading-[60px] whitespace-nowrap font-normal"
                style={{
                  fontSize: vars.cdcrFontSize || "34px",
                  fontFamily: '"EB Garamond", ChungDoiIndic, serif',
                  color: vars.primaryColor,
                  fontWeight: 400,
                }}
              >
                {brideName}
              </h3>
              <div
                className="uppercase tracking-[0.18em]"
                style={{
                  color: vars.textColor,
                  fontFamily: '"Cormorant Garamond", "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span dir="auto">{brideOrder}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thời gian cử hành hôn lễ + Decor Hoa trái */}
        <div className="relative w-full">
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-[-12px] md:left-[-24px] w-auto max-w-none object-contain z-0"
            loading="lazy"
            decoding="async"
            src={vars.flower3}
            style={{
              height: "calc(0.35504 * min(100vw, 898px))",
              willChange: "transform",
              transform: `translate(-25%, calc(-50% - ${vars.flowerOffsets.f3Ceremony.replace(/^-/, "")})) rotate(20deg)`,
            }}
          />
          <div className="relative z-10">
            <div
              className="relative flex flex-col items-center gap-4 md:gap-5 text-center"
              style={{
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <div className="flex flex-col items-center gap-2" style={{ color: vars.textColor }}>
                <span dir="auto" className="whitespace-pre-line font-normal text-[16px] md:text-[20px] text-center">
                  {cHeader}
                </span>
                <p className="font-normal text-[16px] md:text-[18px] mb-2 uppercase" style={{ color: vars.textColor }}>
                  VÀO LÚC
                </p>
              </div>
              <div
                className="text-[20px] md:text-[30px]"
                style={{
                  color: vars.primaryColor,
                  fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {cDate.time}
              </div>
              <div className="flex items-center gap-6" style={{ color: vars.primaryColor }}>
                <span
                  className="text-[12px] md:text-[16px]"
                  style={{
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                    textAlign: "right",
                  }}
                >
                  <span dir="auto">{cDate.dayOfWeek}</span>
                </span>
                <span
                  className="text-[20px] md:text-[28px] flex items-center justify-center leading-none"
                  style={{
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                    color: vars.textColor,
                    opacity: 0.4,
                  }}
                >
                  |
                </span>
                <span className="text-[30px] md:text-[40px]">{cDate.day}</span>
                <span
                  className="text-[20px] md:text-[28px] flex items-center justify-center leading-none"
                  style={{
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                    color: vars.textColor,
                    opacity: 0.4,
                  }}
                >
                  |
                </span>
                <span
                  className="text-[12px] md:text-[16px]"
                  style={{
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                    textAlign: "left",
                  }}
                >
                  <span dir="auto">{cDate.month}</span>
                </span>
              </div>
              <div
                className="text-[18px] md:text-[24px]"
                style={{
                  color: vars.primaryColor,
                  fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {cDate.year}
              </div>
              <div
                className={`text-xs md:text-sm uppercase ${vars.lunarTracking}`}
                style={{
                  color: vars.textColor,
                  fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {"("}{cLunarCore}{")"}
              </div>
            </div>
          </div>
        </div>

        {/* Filigree 1 */}
        <div className="relative flex justify-center">
          <img
            alt=""
            aria-hidden="true"
            className="h-auto w-[250px] md:w-[360px] object-contain"
            loading="lazy"
            decoding="async"
            src={vars.filigree}
          />
        </div>

        {/* Album Ảnh */}
        <div className="relative flex flex-col items-center z-10 pt-[8px] md:pt-[16px]">
          <h2
            className="uppercase font-bold text-[20px] md:text-[24px] text-center mb-6"
            style={{
              color: vars.primaryColor,
              fontFamily: '"Times New Roman", Times, ChungDoiIndic, serif',
              fontWeight: 700,
              letterSpacing: vars.headingLetterSpacing,
            }}
          >
            <span dir="auto">Album Ảnh</span>
          </h2>

          <div className="mt-6 w-full max-w-[432px] md:max-w-[600px]">
            <div className="relative h-[340px] md:h-[520px] touch-pan-y">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={prevPhoto}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-[200] w-8 h-8 items-center justify-center rounded-full bg-base-200/60 hover:bg-base-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={nextPhoto}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-[200] w-8 h-8 items-center justify-center rounded-full bg-base-200/60 hover:bg-base-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
                {photos.map((src: string, i: number) => {
                  const N = photos.length;
                  let diff = (i - activePhotoIdx) % N;
                  if (diff > N / 2) diff -= N;
                  if (diff < -N / 2) diff += N;

                  const isCenter = diff === 0;
                  const absDiff = Math.abs(diff);

                  let transform = `translateX(${diff * 60}%) translateZ(-${absDiff * 150}px) rotateY(${diff * 45}deg) scale(${isCenter ? 1 : Math.max(0.7, 0.85 - (absDiff - 1) * 0.15)})`;
                  let opacity = isCenter ? 1 : Math.max(0.3, 0.75 - (absDiff - 1) * 0.25);
                  let zIndex = 100 - absDiff;

                  const aspectRatio = vars.photoAspectRatios?.[i] || "0.664062 / 1";

                  return (
                    <div
                      key={i}
                      onClick={() => setActivePhotoIdx(i)}
                      className={`absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out ${isCenter ? "ring-2 ring-white/30" : ""}`}
                      style={{
                        aspectRatio,
                        transitionDuration: "1100ms",
                        transform,
                        opacity,
                        zIndex,
                      }}
                    >
                      <img
                        alt={`Wedding photo ${i + 1}`}
                        className="h-full w-full object-cover"
                        src={src}
                        style={{ objectPosition: "50% 50%" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {vars.albumIndicator === "dots" ? (
              <div className="flex justify-center gap-1.5 mt-3">
                {photos.map((_: any, i: number) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to photo ${i + 1}`}
                    onClick={() => setActivePhotoIdx(i)}
                    className={`rounded-full transition-all duration-300 ${
                      activePhotoIdx === i
                        ? "w-6 h-2 bg-current opacity-70"
                        : "w-2 h-2 bg-current opacity-25 hover:opacity-40"
                    }`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center mt-3">
                <span className="text-sm tabular-nums opacity-60">
                  {activePhotoIdx + 1} / {photos.length}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Filigree 2 */}
        <div className="relative flex justify-center">
          <img
            alt=""
            aria-hidden="true"
            className="h-auto w-[250px] md:w-[360px] object-contain"
            loading="lazy"
            decoding="async"
            src={vars.filigree}
          />
        </div>

        {/* THÔNG TIN TIỆC CƯỚI */}
        <div className="relative w-full flex flex-col items-center">
          <h2
            className="uppercase font-bold text-[20px] md:text-[24px] text-center"
            style={{
              color: vars.primaryColor,
              fontFamily: '"Times New Roman", Times, ChungDoiIndic, serif',
              fontWeight: 700,
              letterSpacing: vars.headingLetterSpacing,
            }}
          >
            <span dir="auto">{receptionTitle}</span>
          </h2>

          <div className="relative w-full">
            {/* Decor hoa phải tiệc cưới */}
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[-12px] md:right-[-24px] top-[calc(100%_-_130px)] md:top-[calc(100%_-_180px)] lg:top-[calc(100%_-_230px)] w-auto max-w-none object-contain z-0"
              loading="lazy"
              decoding="async"
              src={vars.flower3}
              style={{
                height: "calc(0.35504 * min(100vw, 898px))",
                willChange: "transform",
                transform: `translate(25%, calc(-50% + ${vars.flowerOffsets.f3Reception})) rotate(-20deg)`,
              }}
            />

            <div className="relative z-10">
              <div
                className="flex flex-col items-center gap-4 md:gap-5 text-center"
                data-landing-screenshot-id="invite-reception"
                style={{
                  fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                  color: vars.textColor,
                }}
              >
                <h3
                  className="text-[16px] md:text-[20px] uppercase flex flex-col items-center"
                  style={{
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                    color: vars.primaryColor,
                    fontWeight: 600,
                    letterSpacing: vars.headingLetterSpacing,
                  }}
                >
                  <span dir="auto">{rHeading}</span>
                </h3>
                <div
                  className="text-[20px] md:text-[30px]"
                  style={{
                    color: vars.textColor,
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  {rDate.time}
                </div>
                <div
                  className="flex items-center gap-6"
                  style={{
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  <span
                    className="text-[12px] md:text-[16px] uppercase"
                    style={{
                      fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                      textAlign: "right",
                    }}
                  >
                    <span dir="auto">{rDate.dayOfWeek}</span>
                  </span>
                  <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: vars.textColor }} />
                  <span
                    className="text-[30px] md:text-[40px]"
                    style={{
                      fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                      color: vars.primaryColor,
                    }}
                  >
                    {rDate.day}
                  </span>
                  <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: vars.textColor }} />
                  <span
                    className="text-[12px] md:text-[16px] uppercase"
                    style={{
                      fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                      textAlign: "left",
                    }}
                  >
                    <span dir="auto">{rDate.month}</span>
                  </span>
                </div>
                <div
                  className="text-[18px] md:text-[24px]"
                  style={{
                    color: vars.textColor,
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  {rDate.year}
                </div>
                <div
                  className={`text-xs md:text-sm uppercase ${vars.lunarTracking}`}
                  style={{
                    color: vars.textColor,
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  {"("}{rLunarCore}{")"}
                </div>

                <div className="flex items-center justify-center gap-8 mt-4">
                  <div className="flex flex-col items-center">
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{
                        color: vars.textColor,
                        fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                      }}
                    >
                      <span dir="auto">Đón khách</span>
                    </span>
                    <span
                      className="text-lg md:text-xl font-medium mt-1"
                      style={{
                        color: vars.primaryColor,
                        fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                      }}
                    >
                      {rWelcomeTime}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{
                        color: vars.textColor,
                        fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                      }}
                    >
                      <span dir="auto">Khai tiệc</span>
                    </span>
                    <span
                      className="text-lg md:text-xl font-medium mt-1"
                      style={{
                        color: vars.primaryColor,
                        fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                      }}
                    >
                      {rBanquetTime}
                    </span>
                  </div>
                </div>

                {vars.hasCountdown && (
                  <div className="flex items-center justify-center flex-col mt-4">
                    <h2
                      className="text-[16px] md:text-[18px] uppercase flex flex-col items-center tracking-[0.02em]"
                      style={{
                        fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                        color: vars.primaryColor,
                        fontWeight: 600,
                      }}
                    >
                      <span dir="auto">{"Cùng đếm\u00A0ngược"}</span>
                    </h2>
                    <div
                      className="text-center mt-2 text-sm md:text-lg"
                      style={{
                        color: vars.textColor,
                      }}
                    >
                      <p>{vars.countdownText}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lịch tháng */}
          <div className={`relative mx-auto mt-8 md:mt-10 w-full max-w-[360px] md:max-w-[440px] ${vars.calendarFrameAspect === "1370 / 1132" ? "aspect-[1370/1132]" : "aspect-[358/304]"}`}>
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-fill z-10"
              loading="lazy"
              decoding="async"
              src={vars.calendarFrame}
            />
            <div className="relative h-full w-full px-8 md:px-11 py-7 md:py-9 flex items-center justify-center z-20">
              <div
                data-showcase-keep=""
                className="w-full max-w-[280px] md:max-w-[310px] mx-auto rounded-lg overflow-hidden border !border-0 !rounded-none !max-w-none"
                style={{
                  borderColor: `color-mix(in srgb, ${vars.primaryColor} 27%, transparent 73%)`,
                  color: vars.primaryColor,
                }}
              >
                <div
                  className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold tracking-wide border-b "
                  style={{ borderColor: `color-mix(in srgb, ${vars.primaryColor} 27%, transparent 73%)` }}
                >
                  Tháng {rDate.monthNum} / {rDate.yearNum}
                </div>
                <div className="grid grid-cols-7 border-b-2" style={{ borderColor: vars.primaryColor }}>
                  <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T2</div>
                  <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T3</div>
                  <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T4</div>
                  <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T5</div>
                  <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T6</div>
                  <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T7</div>
                  <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">CN</div>
                </div>
                <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
                  {Array.from({ length: ((new Date(rDate.yearNum, rDate.monthNum - 1, 1).getDay() + 6) % 7) }).map((_, i) => (
                    <div key={`empty-${i}`} className="flex items-center justify-center h-[30px] md:h-[34px]" />
                  ))}
                  {Array.from({ length: new Date(rDate.yearNum, rDate.monthNum, 0).getDate() }).map((_, i) => {
                    const dayNum = i + 1;
                    const isWeddingDay = dayNum === rDate.dayNum;
                    if (isWeddingDay) {
                      return (
                        <div key={dayNum} className="flex items-center justify-center h-[30px] md:h-[34px]">
                          <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                            <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill={vars.primaryColor === "rgb(33, 85, 137)" ? "#215589" : vars.primaryColor === "rgb(45, 90, 19)" ? "#2D5A13" : "#9C1F2C"}>
                              <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                            </svg>
                            <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: "rgb(255, 255, 255)" }}>
                              {dayNum}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={dayNum} className="flex items-center justify-center h-[30px] md:h-[34px]">
                        <span className="text-[12px] md:text-[13px]">{dayNum}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Thêm vào lịch */}
          <div className="mt-3 flex justify-center">
            <a
              href="https://www.google.com/calendar/render"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-sm tracking-wider underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
              style={{
                color: vars.textColor,
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <span dir="auto">Thêm vào lịch</span>
            </a>
          </div>

          {/* Nút RSVP */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full mt-6 md:mt-8" data-landing-screenshot-id="invite-rsvp">
            <button
              type="button"
              onClick={(ctx as any).onRsvp}
              className="text-sm md:text-base tracking-wider inline-flex items-center justify-center rounded-full px-6 py-2 font-semibold transition-transform hover:scale-[1.03]"
              style={{
                backgroundColor: vars.primaryColor,
                color: "rgb(255, 255, 255)",
                fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">
                <span dir="auto">XÁC NHẬN THAM DỰ</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
