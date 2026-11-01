import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);
  const d = ctx.d as any;

  const venueTitle = d.partyVenueTitle || "Tiệc cưới sẽ tổ chức\u00A0tại";
  const address =
    d.locAddress ||
    d.locTitle ||
    d.address ||
    "Queen Plaza Kỳ Hòa, 16A Lê Hồng Phong, Phường 12, Quận 10, TP. Hồ Chí Minh";
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=${encodeURIComponent(
    address
  )}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    address
  )}`;

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
          backgroundPositionY: "70%",
          mixBlendMode: "color-dodge",
        }}
      />
      <section
        className="relative z-10 flex flex-col items-center w-full pb-8"
        data-landing-screenshot-id="invite-map"
      >
        <div
          className="w-full py-3 md:py-4"
          style={{ backgroundColor: `rgb(var(${theme.primaryVar}))` }}
        >
          <h3
            className="text-[20px] md:text-[24px] font-bold uppercase tracking-wide text-center px-2 flex flex-col items-center"
            style={{
              color: `rgb(var(${theme.paperVar}))`,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            }}
          >
            {theme.isGreen ? (
              <span className="flex flex-col items-center">
                <span dir="auto" lang="vi">{"Tiệc cưới sẽ tổ chức\u00A0tại"}</span>
                <span dir="auto" lang="ko" className=" text-[0.85em] opacity-70">피로연 장소</span>
              </span>
            ) : (
              <span dir="auto">{venueTitle}</span>
            )}
          </h3>
        </div>
        <div
          className="whitespace-pre-line w-[92%] max-w-3xl mt-6 p-4 text-center text-sm md:text-base font-medium rounded-lg break-words whitespace-pre-line flex flex-col items-center"
          style={{
            backgroundColor: `rgb(var(${theme.paperVar}))`,
            color: `rgb(var(${theme.grayVar}))`,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">{address}</span>
        </div>
        <div
          className="relative flex flex-col items-center gap-4 md:gap-5 w-full"
          data-showcase-keep=""
        >
          <iframe
            className="w-[92%] max-w-3xl mt-4 rounded-xl h-[350px] md:h-[450px]"
            src={mapUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={dirUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: `rgb(var(${theme.paperVar}))`,
              color: `rgb(var(${theme.grayVar}))`,
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
