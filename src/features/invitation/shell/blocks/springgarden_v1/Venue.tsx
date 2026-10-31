import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const ink = t.ink || "rgb(210, 95, 101)";
  const muted = t.muted || "rgb(181, 75, 81)";
  const edge = t.edge || "rgb(245, 196, 200)";
  const fontFam = t.fontFamily || "Baskerville, \"Times New Roman\", ChungDoiIndic, serif";

  const venueTitle = "Tiệc cưới sẽ tổ chức tại";
  const venueName = anyD.locAddress || anyD.address || anyD.locTitle || "Summer Vinh Convention Center, 343 Lê Duẩn, Trường Thi, Thành phố Vinh, Nghệ An";
  const mapIframe =
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=" +
    encodeURIComponent(venueName);
  const mapDirect =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(venueName);

  return (
    <div className="pt-10 md:pt-12">
      <section className="relative flex flex-col gap-6 md:gap-8 px-6 md:px-10 pb-12 md:pb-16">
        <div className="relative text-center">
          <h3
            className="font-normal uppercase text-[20px] md:text-[26px] flex flex-col items-center"
            style={{
              color: ink,
              fontFamily: fontFam,
              letterSpacing: "0.05em",
            }}
          >
            <span>{venueTitle}</span>
          </h3>
          <div
            className="whitespace-pre-line mx-auto mt-3 max-w-sm md:max-w-[500px] text-center text-sm md:text-base tracking-wide flex flex-col items-center pb-3 border-b border-black/10"
            style={{
              backgroundColor: "transparent",
              color: muted,
              fontFamily: fontFam,
            }}
          >
            <span>{venueName}</span>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full">
          <iframe
            className="h-[280px] md:h-[380px] w-full max-w-[340px] md:max-w-[560px] rounded-2xl overflow-hidden"
            src={mapIframe}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ borderColor: edge }}
          />
          <a
            href={mapDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: "transparent",
              color: muted,
              fontFamily: fontFam,
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
