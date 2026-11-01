import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const vars = getSongHyTheme(ctx);
  const d = (ctx.d || {}) as any;

  const venueTitle = vars.isGreen
    ? "Tiệc cưới sẽ tổ chức\u00A0tại"
    : "Tiệc cưới sẽ tổ chức\u00A0tại";

  const venueAddress = vars.isGreen
    ? "Gala Center, 415 Hoàng Văn Thụ, Phường 2, Tân Bình, Hồ Chí Minh"
    : "Sun Palace, 170 Kinh Dương Vương, Phường 13, Quận 6, Hồ Chí Minh ";

  const mapIframeSrc = vars.isGreen
    ? "https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=place_id:ChIJK_GoUy8vdTER7o7W3nSgZiE&zoom=16&center=10.7799574,106.682232"
    : "https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=place_id:ChIJg5qJqWovdTERsYyv11yX_Ww&zoom=16&center=10.7490059,106.6346764";

  const dirLink = vars.isGreen
    ? "https://www.google.com/maps/dir/?api=1&destination=Gala%20Center%2C%20415%20Ho%C3%A0ng%20V%C4%83n%20Th%E1%BB%A5%2C%20Ph%C6%B0%E1%BB%9Dng%202%2C%20T%C3%A2n%20B%C3%ACnh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh"
    : "https://www.google.com/maps/dir/?api=1&destination=Sun%20Palace%2C%20170%20Kinh%20D%C6%B0%C6%A1ng%20V%C6%B0%C6%A1ng%2C%20Ph%C6%B0%E1%BB%9Dng%2013%2C%20Qu%E1%BA%ADn%206%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: vars.paperColor }}
    >
      <section
        className="relative z-10 flex flex-col items-center w-full pb-8"
        data-landing-screenshot-id="invite-map"
      >
        <div className="w-full py-3 md:py-4" style={{ backgroundColor: vars.primaryColor }}>
          <h3
            className="text-[20px] md:text-[24px] font-bold uppercase tracking-wide text-center px-2 flex flex-col items-center"
            style={{
              color: vars.accentColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">{venueTitle}</span>
          </h3>
        </div>

        <div
          className="whitespace-pre-line w-[92%] max-w-3xl mt-6 p-4 text-center text-sm md:text-base font-medium rounded-lg break-words whitespace-pre-line flex flex-col items-center"
          style={{
            backgroundColor: vars.paperColor,
            color: vars.grayColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">{venueAddress}</span>
        </div>

        <div
          className="relative flex flex-col items-center gap-4 md:gap-5 w-full"
          data-showcase-keep=""
        >
          <iframe
            className="w-[92%] max-w-3xl mt-4 rounded-xl h-[350px] md:h-[450px]"
            src={mapIframeSrc}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={dirLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: vars.paperColor,
              color: vars.grayColor,
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
