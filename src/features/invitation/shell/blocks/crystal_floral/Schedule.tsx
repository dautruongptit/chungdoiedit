import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");

  const titleRaw = (typeof d?.timelineTitle === "string" ? d.timelineTitle : d?.timelineTitle?.vi) || (vars.templateId === "crystal_floral_blue" ? "LỊCH TRÌNH NGÀY CƯỚI" : "LỊCH TRÌNH TIỆC BÁO HỶ");
  const title = titleRaw.replace(/\s+(\S+)$/, "\u00A0$1");

  const defaultEvents = [
    { time: "17:30", label: "Đón khách" },
    { time: "18:30", label: "Khai tiệc" },
    { time: "18:45", label: "Rót rượu, cắt bánh" },
    { time: "19:00", label: "Phục vụ món chính" },
    { time: "21:00", label: "Kết thúc tiệc" },
  ];

  const events = d?.timelineEvents && d.timelineEvents.length > 0 ? d.timelineEvents : defaultEvents;

  return (
    <div className="relative">
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 h-full w-auto max-w-none object-contain z-0 opacity-90"
        loading="lazy"
        decoding="async"
        src={vars.flower4}
      />
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 translate-x-1/2 h-full w-auto max-w-none object-contain z-0 opacity-90 scale-x-[-1]"
        loading="lazy"
        decoding="async"
        src={vars.flower4}
      />

      {vars.scheduleIcons.map((icon, idx) => (
        <img
          key={idx}
          alt=""
          aria-hidden="true"
          className={icon.cls}
          loading="lazy"
          decoding="async"
          src={icon.src}
        />
      ))}

      <div className="relative z-10 flex flex-col gap-6 md:gap-8 px-4 mt-10 md:mt-12 mb-10 md:mb-12">
        <h2
          className="uppercase font-bold text-[20px] md:text-[24px] text-center"
          style={{
            color: vars.primaryColor,
            fontFamily: '"Times New Roman", Times, ChungDoiIndic, serif',
            fontWeight: 700,
            letterSpacing: vars.headingLetterSpacing,
          }}
        >
          <span dir="auto">{title}</span>
        </h2>

        <ol
          className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
          style={{
            fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          {events.map((ev: any, i: number) => {
            const isFirst = i === 0;
            const isLast = i === events.length - 1;
            const lineClass = isFirst
              ? "top-1/2 -bottom-8 md:-bottom-10"
              : isLast
              ? "-top-8 md:-top-10 bottom-1/2"
              : "-top-8 md:-top-10 -bottom-8 md:-bottom-10";

            const evLabel = typeof ev.label === "string" ? ev.label : (ev.label?.vi || ev.title?.vi || ev.title || "");
            const evTime = typeof ev.time === "string" ? ev.time : (ev.time?.vi || "");

            return (
              <li key={i} className="contents">
                <span
                  className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
                  style={{
                    color: vars.primaryColor,
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  {evTime}
                </span>
                <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 w-px ${lineClass}`}
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
                    color: vars.textColor,
                    fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  <span dir="auto">{evLabel}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
