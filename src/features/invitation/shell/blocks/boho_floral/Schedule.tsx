import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);

  const items = [
    { time: "17:30", text: "Đón khách", lineClass: "top-1/2 -bottom-8 md:-bottom-10" },
    { time: "18:30", text: "Khai tiệc", lineClass: "-top-8 md:-top-10 -bottom-8 md:-bottom-10" },
    { time: "18:45", text: "Rót rượu, cắt bánh", lineClass: "-top-8 md:-top-10 -bottom-8 md:-bottom-10" },
    { time: "19:00", text: "Phục vụ món chính", lineClass: "-top-8 md:-top-10 -bottom-8 md:-bottom-10" },
    { time: "21:00", text: "Kết thúc tiệc", lineClass: "-top-8 md:-top-10 bottom-1/2" },
  ];

  return (
    <div className="relative z-10 flex flex-col gap-6 md:gap-8 px-2 md:px-4 mt-10 md:mt-12 mb-10 md:mb-12">
      <h2
        className="uppercase font-bold text-center px-2 md:px-4"
        style={{
          color: theme.primaryColor,
          fontFamily: '"Times New Roman", ChungDoiIndic, serif',
          fontSize: "24px",
          fontWeight: 700,
          letterSpacing: "1px",
        }}
      >
        <span dir="auto">LỊCH TRÌNH NGÀY&nbsp;CƯỚI</span>
      </h2>
      <ol
        className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
        style={{ fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
      >
        {items.map((item, idx) => (
          <li key={idx} className="contents">
            <span
              className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
              style={{
                color: theme.primaryColor,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              {item.time}
            </span>
            <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
              <span
                className={`absolute left-1/2 -translate-x-1/2 w-px ${item.lineClass}`}
                style={{ backgroundColor: `color-mix(in srgb, ${theme.primaryColor} 40%, transparent 60%)` }}
              />
              <span
                className="relative block h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: theme.primaryColor,
                  boxShadow: `color-mix(in srgb, ${theme.primaryColor} 13%, transparent 87%) 0px 0px 0px 2px`,
                }}
              />
            </span>
            <span
              className="pt-0.5 text-start text-[17px] md:text-[19px] font-medium leading-snug"
              style={{
                color: theme.primaryColor,
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <span dir="auto">{item.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
