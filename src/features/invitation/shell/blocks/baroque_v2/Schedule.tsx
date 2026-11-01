import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme } from "./themeVars";

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);
  const d = ctx.d as any;

  // Timeline items
  let items = [
    { time: "17:00", title: "Đón khách", icon: null },
    { time: "18:00", title: "Khai tiệc", icon: theme.schedule.icons.step1 },
    { time: "18:20", title: "Rót rượu, cắt bánh", icon: theme.schedule.icons.step2 },
    { time: "18:45", title: "Phục vụ món chính", icon: theme.schedule.icons.step3 },
    { time: "20:30", title: "Kết thúc tiệc", icon: null },
  ];

  if (theme.variant === "darkblue") {
    items = [
      { time: "17:00", title: "Đón khách", icon: null },
      { time: "18:00", title: "Khai tiệc", icon: theme.schedule.icons.step1 },
      { time: "18:45", title: "Rót rượu, cắt bánh", icon: theme.schedule.icons.step2 },
      { time: "19:30", title: "Phục vụ món chính", icon: theme.schedule.icons.step3 },
      { time: "21:30", title: "Kết thúc tiệc", icon: null },
    ];
  }

  const dotColor = theme.goldColor;
  const lineColor = "rgba(255, 223, 175, 0.533)";

  return (
    <section className="relative isolate flex w-full flex-col items-center">
      <div className="relative z-10 flex w-full flex-col gap-[13px] px-6 py-2">
        <h2
          className="uppercase text-center relative z-10 text-[20px] md:text-[24px]"
          style={{
            color: theme.goldColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
          }}
        >
          <span dir="auto">{"LỊCH TRÌNH NGÀY\u00A0CƯỚI"}</span>
        </h2>

        <ol
          className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
          style={{ fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}
        >
          {items.map((item, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === items.length - 1;

            return (
              <li key={idx} className="contents">
                <span
                  className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
                  style={{
                    color: theme.goldColor,
                    fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  {item.icon ? (
                    <span className="relative inline-block">
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 flex w-max items-center justify-center -translate-y-1/2 right-full"
                        style={{ marginRight: "30px" }}
                      >
                        <img
                          alt=""
                          aria-hidden="true"
                          className={item.icon.className}
                          src={item.icon.src}
                          style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}
                        />
                      </span>
                      {item.time}
                    </span>
                  ) : (
                    item.time
                  )}
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
                    style={{ backgroundColor: lineColor }}
                  />
                  <span
                    className="relative block h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: dotColor,
                      boxShadow: "color-mix(in srgb, rgb(255, 223, 175) 13%, transparent 87%) 0px 0px 0px 2px",
                    }}
                  />
                </span>

                <span
                  className="pt-0.5 text-[13px] md:text-[15px] leading-snug text-start"
                  style={{
                    color: theme.goldColor,
                    fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  <span dir="auto">{item.title}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <img
        alt=""
        aria-hidden="true"
        className={`pointer-events-none mx-auto block h-auto ${theme.schedule.bottomLineClass} object-contain`}
        loading="lazy"
        decoding="async"
        src={theme.goldenLine}
        style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.25) 4px 4px 2px)" }}
      />
    </section>
  );
}
