import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

interface SchedItem {
  time: string;
  title: string;
  zh: string;
}

const DEFAULT_SCHEDULE: SchedItem[] = [
  { time: "17:30", title: "Đón khách", zh: "賓客迎接" },
  { time: "18:30", title: "Khai tiệc", zh: "開席" },
  { time: "18:45", title: "Rót rượu, cắt bánh", zh: "敬酒、切蛋糕" },
  { time: "19:00", title: "Phục vụ món chính", zh: "上主菜" },
  { time: "21:00", title: "Kết thúc tiệc", zh: "宴會結束" },
];

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const ink = t.ink || "rgb(233, 206, 158)";
  const muted = t.muted || "rgb(217, 188, 134)";

  const items: SchedItem[] =
    d.sched && d.sched.length > 0
      ? d.sched.map((s, i) => ({
          time: s.time,
          title: s.text || (s as any).title || DEFAULT_SCHEDULE[i]?.title || "",
          zh: DEFAULT_SCHEDULE[i]?.zh || "",
        }))
      : DEFAULT_SCHEDULE;

  return (
    <div className="relative z-10 flex flex-col gap-6 md:gap-8 px-4 mt-10 md:mt-12 mb-10 md:mb-12">
      <h2
        className="uppercase font-normal text-[20px] md:text-[26px] text-center"
        style={{
          color: ink,
          fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          letterSpacing: "0.05em",
        }}
      >
        <span className="flex flex-col items-center">
          <span lang="vi">LỊCH TRÌNH NGÀY&nbsp;CƯỚI</span>
          <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
            婚禮當日流程
          </span>
        </span>
      </h2>

      <ol
        className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
        style={{ fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif" }}
      >
        {items.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === items.length - 1;
          const lineCls = isFirst
            ? "absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10"
            : isLast
            ? "absolute left-1/2 -translate-x-1/2 w-px -top-8 md:-top-10 bottom-1/2"
            : "absolute left-1/2 -translate-x-1/2 w-px -top-8 md:-top-10 -bottom-8 md:-bottom-10";

          return (
            <li key={idx} className="contents">
              <span
                className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
                style={{
                  color: ink,
                  fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
                }}
              >
                {item.time}
              </span>

              <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                <span
                  className={lineCls}
                  style={{
                    backgroundColor: "color-mix(in srgb, rgb(233, 206, 158) 40%, transparent 60%)",
                  }}
                />
                <span
                  className="relative block h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: ink,
                    boxShadow: "color-mix(in srgb, rgb(233, 206, 158) 13%, transparent 87%) 0px 0px 0px 2px",
                  }}
                />
              </span>

              <span
                className="pt-0.5 text-start text-[17px] md:text-[19px] font-medium leading-snug"
                style={{
                  color: muted,
                  fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
                }}
              >
                <span className="flex flex-col items-start">
                  <span lang="vi">{item.title}</span>
                  {item.zh && (
                    <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                      {item.zh}
                    </span>
                  )}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
