import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  if (!d.dressOn) return null;

  const colors = d.dressColors && d.dressColors.length > 0
    ? d.dressColors
    : ["#511419", "#8c3a3f", "#c9a24a", "#ece4d8"];

  return (
    <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12">
      <div className="flex flex-col items-center gap-1">
        <h2
          className="uppercase font-normal text-[20px] md:text-[26px] text-center"
          style={{
            color: t.ink,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
            fontSize: "20px",
            letterSpacing: "0.03em",
          }}
        >
          <span>{d.dressTitle || "DRESS CODE"}</span>
        </h2>
        <p
          className="whitespace-pre-line text-sm md:text-base text-center"
          style={{ color: "rgba(81, 20, 25, 0.8)", fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}
        >
          <span>{d.dressText || "Trang phục dự tiệc"}</span>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {colors.map((c, i) => (
          <div
            key={i}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
            style={{
              backgroundColor: c,
              border: c.toLowerCase() === "#ffffff" || c.toLowerCase() === "#ece4d8" ? "1.5px solid rgba(81, 20, 25, 0.19)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
