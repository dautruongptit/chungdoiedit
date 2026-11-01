import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme, str } from "./themeVars";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);
  const d = ctx.d as any;

  const address = str(
    d.address,
    "Trung tâm Tiệc cưới Bảo Ngọc Palace, 168 Nguyễn Tất Thành, thành phố Buôn Ma Thuột, tỉnh Đắk Lắk"
  );
  const mapUrl =
    d.mapUrl ||
    `https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=${encodeURIComponent(
      address
    )}`;
  const directUrl = d.directUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section className="relative z-10 flex w-full flex-col items-center px-6" data-landing-screenshot-id="invite-map">
      <div className="relative text-center">
        <h3
          className="uppercase text-center"
          style={{
            color: theme.goldColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
          }}
        >
          <span dir="auto">{"Tiệc cưới sẽ tổ chức\u00A0tại"}</span>
        </h3>
        <div
          className="whitespace-pre-line mx-auto mt-3 max-w-[250px] text-center text-[12px] leading-relaxed md:max-w-[440px] md:text-[14px]"
          style={{
            backgroundColor: "transparent",
            color: theme.textColor,
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
          }}
        >
          <span dir="auto">{address}</span>
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full" data-showcase-keep="">
        <iframe
          className="mt-3 h-[268px] w-full max-w-[338px] overflow-hidden rounded-[15px] md:h-[380px] md:max-w-[560px]"
          src={mapUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          style={{ borderColor: theme.goldColor }}
        />
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: "transparent",
            color: theme.textColor,
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
          }}
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          <span>Chỉ đường</span>
        </a>
      </div>
    </section>
  );
}
