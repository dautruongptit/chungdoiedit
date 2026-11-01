import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");
  
  const venueTitleRaw = vars.venueTitle || (vars.templateId === "crystal_floral_blue" ? "Tiệc cưới sẽ tổ chức tại" : "Tiệc báo hỷ sẽ tổ chức tại");
  const venueTitle = venueTitleRaw.replace(/\s+(\S+)$/, "\u00A0$1");

  const venueAddress = d?.venue?.address || vars.venueAddress;

  const venueBorderClass = vars.templateId === "crystal_floral_blue"
    ? "border-[#21558920]"
    : vars.templateId === "crystal_floral_green"
    ? "border-[#1f6b4a20]"
    : "border-[#9c1f2c20]";

  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=${encodeURIComponent(venueAddress)}`;
  const mapDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`;

  return (
    <div className="relative pt-10 md:pt-12">
      <img
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute left-[-12px] md:left-[-24px] ${vars.venueFlowerTop || "top-0"} w-auto max-w-none object-contain z-0`}
        loading="lazy"
        decoding="async"
        src={vars.flower2}
        style={{
          height: "calc(0.35504 * min(100vw, 898px))",
          willChange: "transform",
          transform: `translate(-25%, calc(-50% - ${vars.flowerOffsets.f2Venue.replace(/^-/, "")})) rotate(20deg)`,
        }}
      />
      <section className="relative flex flex-col gap-6 md:gap-8 px-6 md:px-10 pb-12 md:pb-16" data-landing-screenshot-id="invite-map">
        <div className="relative text-center">
          <h3
            className="uppercase font-bold text-[20px] md:text-[24px] text-center"
            style={{
              color: vars.primaryColor,
              fontFamily: '"Times New Roman", Times, ChungDoiIndic, serif',
              fontWeight: 700,
              letterSpacing: vars.headingLetterSpacing,
            }}
          >
            <span dir="auto">{venueTitle}</span>
          </h3>
          <div
            className={`whitespace-pre-line mx-auto mt-3 max-w-sm md:max-w-[500px] text-center text-sm md:text-base tracking-wide whitespace-pre-line flex flex-col items-center pb-3 border-b ${venueBorderClass}`}
            style={{
              backgroundColor: "transparent",
              color: vars.textColor,
              fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span dir="auto">{venueAddress}</span>
          </div>
        </div>
        <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full" data-showcase-keep="">
          <iframe
            className="relative z-10 h-[280px] md:h-[380px] w-full max-w-[340px] md:max-w-[560px] rounded-2xl overflow-hidden"
            src={mapEmbedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ borderColor: vars.primaryColor }}
          />
          <a
            href={mapDirUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: "transparent",
              color: vars.textColor,
              fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
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
