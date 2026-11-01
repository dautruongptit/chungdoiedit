import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d || {};
  const theme = getBohoFloralTheme(ctx);

  const address = toStr(
    d.address,
    theme.isGreen
      ? "Tiệc Cưới Hoàng Gia, Ngõ 74 P. Nguyễn Thị Định, Nhân Chính, Thanh Xuân, Hà Nội"
      : theme.isPink
      ? "Queen Plaza Kỳ Hòa, 16A Lê Hồng Phong, Phường 12, Quận 10, TP. Hồ Chí Minh"
      : "White Palace Convention Center, 194 Hoàng Văn Thụ, Phú Nhuận, TP. Hồ Chí Minh"
  );

  return (
    <div className="pt-10 md:pt-12">
      <section
        className="relative flex flex-col gap-6 md:gap-8 px-6 md:px-10 pb-12 md:pb-16"
        data-landing-screenshot-id="invite-map"
      >
        <div className="relative text-center">
          <h3
            className="font-normal uppercase text-[20px] md:text-[26px] flex flex-col items-center"
            style={{
              color: theme.primaryColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            <span dir="auto">Tiệc cưới sẽ tổ chức&nbsp;tại</span>
          </h3>
          <div
            className="whitespace-pre-line mx-auto mt-3 max-w-sm md:max-w-[500px] text-center text-sm md:text-base tracking-wide whitespace-pre-line flex flex-col items-center pb-3"
            style={{
              backgroundColor: "transparent",
              color: theme.primaryColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">{address}</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full" data-showcase-keep="">
          <iframe
            className="h-[267px] md:h-[380px] w-full max-w-[338px] md:max-w-[560px] rounded-[15px] overflow-hidden"
            src={theme.googleMapsUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ borderColor: theme.primaryColor }}
          />
          <a
            href={theme.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: "transparent",
              color: theme.primaryColor,
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <svg
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            <span>Chỉ đường</span>
          </a>
        </div>
      </section>
    </div>
  );
}
