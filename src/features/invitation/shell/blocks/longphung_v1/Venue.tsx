import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Venue({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const ink = t.ink || "rgb(233, 206, 158)";
  const muted = t.muted || "rgb(217, 188, 134)";
  const locTitle = d.locTitle || "Tiệc cưới Trống Đồng Cảnh Hồ, 173 Trường Chinh, Quận Thanh Xuân, Hà Nội";

  return (
    <div className="pt-10 md:pt-12">
      <section className="relative flex flex-col gap-6 md:gap-8 px-6 md:px-10 pb-12 md:pb-16">
        <div className="relative text-center">
          <h3
            className="font-normal uppercase text-[20px] md:text-[26px] flex flex-col items-center"
            style={{
              color: ink,
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              letterSpacing: "0.05em",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">Tiệc cưới sẽ tổ chức&nbsp;tại</span>
              <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                婚宴地點
              </span>
            </span>
          </h3>
          <div
            className="whitespace-pre-line mx-auto mt-3 max-w-sm md:max-w-[500px] text-center text-sm md:text-base tracking-wide flex flex-col items-center pb-3 border-b border-white/10"
            style={{
              backgroundColor: "transparent",
              color: ink,
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">{locTitle}</span>
              <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                台北君悅酒店，台北市信義區松壽路2號
              </span>
            </span>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-4 md:gap-5 w-full">
          <iframe
            className="h-[280px] md:h-[380px] w-full max-w-[340px] md:max-w-[560px] rounded-2xl overflow-hidden"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=10.755341,106.70811&zoom=17"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ borderColor: muted }}
          />
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=10.755341%2C106.70811"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: "transparent",
              color: ink,
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
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
