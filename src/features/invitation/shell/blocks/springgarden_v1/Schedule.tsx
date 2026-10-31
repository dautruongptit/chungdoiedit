import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const ink = t.ink || "rgb(210, 95, 101)";
  const muted = t.muted || "rgb(181, 75, 81)";
  const fontFam = t.fontFamily || "Baskerville, \"Times New Roman\", ChungDoiIndic, serif";

  const schedule: Array<{ time: string; title: string }> = (anyD.timelineEvents && anyD.timelineEvents.length > 0)
    ? anyD.timelineEvents.map((e: any) => ({ time: e.time, title: e.title || e.desc || "" }))
    : [
        { time: "17:30", title: "Đón khách" },
        { time: "18:30", title: "Khai tiệc" },
        { time: "18:45", title: "Rót rượu, cắt bánh" },
        { time: "19:00", title: "Phục vụ món chính" },
        { time: "21:00", title: "Kết thúc tiệc" },
      ];

  return (
    <div className="relative z-10 flex flex-col gap-6 md:gap-8 px-4 mt-10 md:mt-12 mb-10 md:mb-12">
      <h2
        className="uppercase font-normal text-[20px] md:text-[26px] text-center"
        style={{
          color: ink,
          fontFamily: fontFam,
          fontSize: "20px",
          letterSpacing: "0.05em",
        }}
      >
        <span>LỊCH TRÌNH NGÀY&nbsp;CƯỚI</span>
      </h2>

      <ol
        className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
        style={{ fontFamily: fontFam }}
      >
        {schedule.map((item, idx: number) => {
          const isFirst = idx === 0;
          const isLast = idx === schedule.length - 1;
          const text = item.title || "";

          return (
            <li key={idx} className="contents">
              <span
                className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
                style={{ color: ink, fontFamily: fontFam }}
              >
                {item.time}
              </span>
              <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                <span
                  className={`absolute left-1/2 -translate-x-1/2 w-px ${
                    isFirst
                      ? "top-1/2 -bottom-8 md:-bottom-10"
                      : isLast
                      ? "-top-8 md:-top-10 bottom-1/2"
                      : "-top-8 md:-top-10 -bottom-8 md:-bottom-10"
                  }`}
                  style={{ backgroundColor: `color-mix(in srgb, ${ink} 40%, transparent 60%)` }}
                />
                <span
                  className="relative block h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: ink,
                    boxShadow: `color-mix(in srgb, ${ink} 13%, transparent 87%) 0px 0px 0px 2px`,
                  }}
                />
              </span>
              <span
                className="pt-0.5 text-start text-[17px] md:text-[19px] font-medium leading-snug"
                style={{ color: muted, fontFamily: fontFam }}
              >
                <span>{text}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
