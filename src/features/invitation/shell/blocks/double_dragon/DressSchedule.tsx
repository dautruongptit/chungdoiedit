import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function DressSchedule({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);
  const assets = ctx.t?.assets || "";
  const tplId = ctx.d?.templateId || "";
  const isGreen = assets.includes("green") || tplId.includes("green");
  const isBlue = assets.includes("blue") || tplId.includes("blue");

  const swatches = isGreen
    ? ["rgb(67, 43, 20)", "rgb(107, 83, 60)", "rgb(227, 203, 180)"]
    : isBlue
    ? ["rgb(58, 51, 44)", "rgb(185, 164, 138)", "rgb(246, 241, 232)"]
    : ["rgb(101, 18, 18)", "rgb(141, 58, 58)", "rgb(255, 178, 178)"];

  const scheduleItems = [
    { time: "17:30", label: "Đón khách", ko: "하객 맞이", lineClass: "top-1/2 -bottom-8 md:-bottom-10" },
    { time: "18:30", label: "Khai tiệc", ko: "피로연", lineClass: "-top-8 md:-top-10 -bottom-8 md:-bottom-10" },
    { time: "18:45", label: "Rót rượu, cắt bánh", ko: "건배 및 케이크 컷팅", lineClass: "-top-8 md:-top-10 -bottom-8 md:-bottom-10" },
    { time: "19:00", label: "Phục vụ món chính", ko: "메인 요리", lineClass: "-top-8 md:-top-10 -bottom-8 md:-bottom-10" },
    { time: "21:00", label: "Kết thúc tiệc", ko: "환송", lineClass: "-top-8 md:-top-10 bottom-1/2" },
  ];

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
          backgroundPositionY: "75%",
          mixBlendMode: "color-dodge",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 ">
        <div className="flex flex-col items-center gap-1">
          <h2
            className="font-bold text-[20px] md:text-[24px] text-center uppercase tracking-wide flex flex-col items-center"
            style={{
              color: `rgb(var(${theme.primaryVar}))`,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            {theme.isGreen ? (
              <span className="flex flex-col items-center">
                <span dir="auto" lang="vi">DRESS CODE</span>
                <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">드레스 코드</span>
              </span>
            ) : (
              <span dir="auto">DRESS CODE</span>
            )}
          </h2>
          <p
            className="whitespace-pre-line text-sm md:text-base text-center opacity-70"
            style={{
              color: `rgb(var(${theme.primaryVar}))`,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            {theme.isGreen ? (
              <span className="flex flex-col items-center">
                <span dir="auto" lang="vi">Trang phục dự tiệc</span>
                <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">파티 복장</span>
              </span>
            ) : (
              <span dir="auto">Trang phục dự tiệc</span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
            style={{
              backgroundColor: swatches[0],
              borderWidth: "medium",
              borderStyle: "none",
              borderColor: "currentcolor",
              borderImage: "none",
            }}
          />
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
            style={{
              backgroundColor: swatches[1],
              borderWidth: "medium",
              borderStyle: "none",
              borderColor: "currentcolor",
              borderImage: "none",
            }}
          />
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
            style={{
              backgroundColor: swatches[2],
              border: `1.5px solid rgb(var(${theme.primaryVar}))30`,
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 md:gap-8 px-4 mt-10 md:mt-12 mb-10 md:mb-12">
        <h2
          className="font-bold text-[20px] md:text-[24px] text-center uppercase tracking-wide flex flex-col items-center"
          style={{
            color: `rgb(var(${theme.primaryVar}))`,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {theme.isGreen ? (
            <span className="flex flex-col items-center">
              <span dir="auto" lang="vi">LỊCH TRÌNH NGÀY&nbsp;CƯỚI</span>
              <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">웨딩 당일&nbsp;일정</span>
            </span>
          ) : (
            <span dir="auto">LỊCH TRÌNH NGÀY&nbsp;CƯỚI</span>
          )}
        </h2>
        <ol
          className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
          style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
        >
          {scheduleItems.map((item, idx) => (
            <li key={idx} className="contents">
              <span
                className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
                style={{
                  color: `rgb(var(${theme.primaryVar}))`,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {item.time}
              </span>
              <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                <span
                  className={`absolute left-1/2 -translate-x-1/2 w-px ${item.lineClass}`}
                  style={{
                    backgroundColor: `color-mix(in srgb, rgb(var(${theme.primaryVar})) 40%, transparent)`,
                  }}
                />
                <span
                  className="relative block h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: `rgb(var(${theme.primaryVar}))`,
                    boxShadow: `0 0 0 2px color-mix(in srgb, rgb(var(${theme.primaryVar})) 13%, transparent)`,
                  }}
                />
              </span>
              <span
                className="pt-0.5 text-start text-[17px] md:text-[19px] font-medium leading-snug"
                style={{
                  color: `rgb(var(${theme.grayVar}))`,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {theme.isGreen ? (
                  <span className="flex flex-col items-start">
                    <span dir="auto" lang="vi">{item.label}</span>
                    <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">{item.ko}</span>
                  </span>
                ) : (
                  <span dir="auto">{item.label}</span>
                )}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
