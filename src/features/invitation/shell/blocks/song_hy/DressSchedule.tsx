import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

export function DressSchedule({ ctx }: { ctx: InvitationCtx }) {
  const vars = getSongHyTheme(ctx);
  const d = (ctx.d || {}) as any;

  const dresscodeColors = vars.isGreen
    ? [
        { bg: "rgb(139, 154, 107)", border: "medium none currentcolor" },
        { bg: "rgb(232, 232, 232)", border: "1.5px solid rgba(31, 58, 37, 0.19)" },
        { bg: "rgb(232, 220, 200)", border: "1.5px solid rgba(31, 58, 37, 0.19)" },
      ]
    : [
        { bg: "rgb(101, 18, 18)", border: "medium none currentcolor" },
        { bg: "rgb(141, 58, 58)", border: "medium none currentcolor" },
        { bg: "rgb(255, 178, 178)", border: "1.5px solid rgba(128, 0, 0, 0.19)" },
      ];

  const timelineItems = [
    { time: "17:30", label: "Đón khách", lineClass: "top-1/2 -bottom-8 md:-bottom-10" },
    { time: "18:30", label: "Khai tiệc", lineClass: "-top-8 md:-top-10 -bottom-8 md:-bottom-10" },
    { time: "18:45", label: "Rót rượu, cắt bánh", lineClass: "-top-8 md:-top-10 -bottom-8 md:-bottom-10" },
    { time: "19:00", label: "Phục vụ món chính", lineClass: "-top-8 md:-top-10 -bottom-8 md:-bottom-10" },
    { time: "21:00", label: "Kết thúc tiệc", lineClass: "-top-8 md:-top-10 bottom-1/2" },
  ];

  return (
    <>
      {/* Block 08: Dress code */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 ">
        <div className="flex flex-col items-center gap-1">
          <h2
            className="font-bold text-[20px] md:text-[24px] text-center uppercase tracking-wide flex flex-col items-center"
            style={{
              color: vars.primaryColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">DRESS CODE</span>
          </h2>
          <p
            className="whitespace-pre-line text-sm md:text-base text-center opacity-70"
            style={{
              color: vars.primaryColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">Trang phục dự tiệc</span>
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {dresscodeColors.map((color, idx) => (
            <div
              key={idx}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
              style={{
                backgroundColor: color.bg,
                border: color.border,
              }}
            />
          ))}
        </div>
      </div>

      {/* Block 09: Schedule */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-8 px-4 mt-10 md:mt-12 mb-10 md:mb-12">
        <h2
          className="font-bold text-[20px] md:text-[24px] text-center uppercase tracking-wide flex flex-col items-center"
          style={{
            color: vars.primaryColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">LỊCH TRÌNH NGÀY&nbsp;CƯỚI</span>
        </h2>
        <ol
          className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
          style={{
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {timelineItems.map((item, idx) => (
            <li key={idx} className="contents">
              <span
                className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
                style={{
                  color: vars.primaryColor,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                {item.time}
              </span>
              <span
                aria-hidden="true"
                className="relative flex items-center justify-center self-stretch"
              >
                <span
                  className={`absolute left-1/2 -translate-x-1/2 w-px ${item.lineClass}`}
                  style={{
                    backgroundColor: `color-mix(in srgb, ${vars.primaryColor} 40%, transparent 60%)`,
                  }}
                />
                <span
                  className="relative block h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: vars.primaryColor,
                    boxShadow: `color-mix(in srgb, ${vars.primaryColor} 13%, transparent 87%) 0px 0px 0px 2px`,
                  }}
                />
              </span>
              <span
                className="pt-0.5 text-start text-[17px] md:text-[19px] font-medium leading-snug"
                style={{
                  color: vars.grayColor,
                  fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                }}
              >
                <span dir="auto">{item.label}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
