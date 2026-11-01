import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { t } = ctx;
  const ink = t.ink || "rgb(210, 95, 101)";
  const fontFam = t.fontFamily || "Baskerville, \"Times New Roman\", ChungDoiIndic, serif";

  const title = "DRESS CODE";
  const subtitle = "Trang phục dự tiệc";
  const colors = ["rgb(101, 18, 18)", "rgb(141, 58, 58)", "rgb(255, 178, 178)"];

  return (
    <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12">
      <div className="flex flex-col items-center gap-1">
        <h2
          className="uppercase font-normal text-[20px] text-center"
          style={{
            color: ink,
            fontFamily: fontFam,
            letterSpacing: "0.05em",
          }}
        >
          <span>{title}</span>
        </h2>
        <p
          className="whitespace-pre-line text-sm md:text-base text-center opacity-70"
          style={{
            color: ink,
            fontFamily: fontFam,
          }}
        >
          <span>{subtitle}</span>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {colors.map((color, idx) => (
          <div
            key={idx}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
            style={{
              backgroundColor: color,
              border: idx === colors.length - 1 ? `1.5px solid ${t.edge || "rgba(210, 95, 101, 0.19)"}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
