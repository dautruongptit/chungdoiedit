import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  if (!d.partyOn || !d.address) return null;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(d.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const dirHref = d.mapUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.address)}`;

  return (
    <div className="relative z-10 overflow-x-clip">
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[-1%] w-[158%] -translate-x-1/2"
        src={`${t.assets}/castle-background.webp`}
      />
      <section className="relative z-10 flex w-full flex-col items-center px-6 pb-8 pt-8">
        <div className="relative text-center">
          <h3
            className="uppercase text-center"
            style={{
              color: t.ink,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            <span>{d.locTitle || "Tiệc cưới sẽ tổ chức\u00a0tại"}</span>
          </h3>
          <div
            className="whitespace-pre-line mx-auto mt-2 max-w-[260px] text-center text-[12px] leading-relaxed md:max-w-[440px] md:text-[14px]"
            style={{
              backgroundColor: "transparent",
              color: "rgba(81, 20, 25, 0.8)",
              fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
            }}
          >
            <span>{d.address}</span>
          </div>
        </div>

        {d.showMap && (
          <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full">
            <iframe
              className="mt-3 h-[268px] w-full max-w-[338px] overflow-hidden rounded-[15px] md:h-[380px] md:max-w-[560px]"
              src={mapSrc}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              style={{ borderColor: t.ink }}
            />
            <a
              href={dirHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
              style={{
                backgroundColor: "transparent",
                color: "rgba(81, 20, 25, 0.8)",
                fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              <span>Chỉ đường</span>
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
