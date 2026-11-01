import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const isRed = (t.assets || "").includes("red");
  const isPink = (t.assets || "").includes("pink");

  const textColor = t.ink || (isRed ? "rgb(143, 38, 45)" : isPink ? "rgb(220, 133, 153)" : "rgb(70, 79, 30)");
  const accentColor = t.accent || (isRed ? "rgb(101, 78, 47)" : isPink ? "rgb(119, 110, 56)" : "rgb(188, 155, 99)");
  const cardBg = isRed ? "rgb(254, 250, 240)" : "rgb(253, 249, 240)";

  const swatch1 = isPink ? "rgb(26, 26, 26)" : textColor;
  const swatch2 = isRed ? "rgb(141, 133, 103)" : accentColor;
  const swatch3 = isRed ? "rgb(217, 185, 163)" : cardBg;
  const swatch3Border = isRed ? "none" : `1.5px solid ${accentColor.replace("rgb", "rgba").replace(")", ", 0.19)")}`;

  const locAddress = anyD.locAddress || anyD.locTitle || "Nhà hàng Vườn Thông, 145 Trần Phú, phường 2, thành phố Bảo Lộc, tỉnh Lâm Đồng";
  const mapIframe = anyD.mapIframe || `https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=${encodeURIComponent(locAddress)}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locAddress)}`;

  return (
    <section
      className="relative isolate w-full border-y-[1.5px] "
      style={{
        backgroundColor: cardBg,
        borderColor: isPink ? accentColor : textColor,
        borderRadius: "0px",
        boxShadow: "rgba(0, 0, 0, 0.25) 4px 4px 2px",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-[23px] py-9 md:gap-8 md:py-11">
        <section className="relative z-10 flex w-full flex-col items-center px-6">
          <div className="relative text-center">
            <h3
              className="uppercase text-center"
              style={{
                color: textColor,
                fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                fontWeight: "700",
                fontSize: isRed ? "18px" : "16px",
                lineHeight: isRed ? "27px" : "24px",
              }}
            >
              <span>Tiệc cưới sẽ tổ chức&nbsp;tại</span>
            </h3>
            <div
              className={`whitespace-pre-line mx-auto mt-3 ${isRed ? "max-w-[245px]" : "max-w-[250px]"} text-center text-[12px] leading-relaxed md:max-w-[440px] md:text-[14px]`}
              style={{
                backgroundColor: "transparent",
                color: accentColor,
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
              }}
            >
              <span>{locAddress}</span>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full">
            <iframe
              className="mt-3 h-[268px] w-full max-w-[338px] overflow-hidden rounded-[15px] md:h-[380px] md:max-w-[560px]"
              src={mapIframe}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              style={{ borderColor: accentColor }}
            />
            <a
              href={dirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
              style={{
                backgroundColor: "transparent",
                color: accentColor,
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
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

        <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 ">
          <div className="flex flex-col items-center gap-1">
            <h2
              className="uppercase font-normal text-[20px] text-center"
              style={{
                color: accentColor,
                fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                fontWeight: "700",
              }}
            >
              <span>DRESS CODE</span>
            </h2>
            <p
              className="whitespace-pre-line text-sm md:text-base text-center"
              style={{
                color: textColor,
                fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <span>Trang phục dự tiệc</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
              style={{
                backgroundColor: swatch1,
                borderWidth: "medium",
                borderStyle: "none",
                borderColor: "currentcolor",
                borderImage: "none",
              }}
            />
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
              style={{
                backgroundColor: swatch2,
                borderWidth: "medium",
                borderStyle: "none",
                borderColor: "currentcolor",
                borderImage: "none",
              }}
            />
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
              style={{
                backgroundColor: swatch3,
                border: swatch3Border,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
