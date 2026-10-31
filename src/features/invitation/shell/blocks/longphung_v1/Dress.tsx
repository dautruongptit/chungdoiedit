import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const ink = t.ink || "rgb(233, 206, 158)";
  const colors = d.dressColors && d.dressColors.length > 0 ? d.dressColors : ["rgb(101, 18, 18)", "rgb(141, 58, 58)", "rgb(255, 178, 178)"];

  return (
    <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 ">
      <div className="flex flex-col items-center gap-1">
        <h2
          className="uppercase font-normal text-[20px] md:text-[26px] text-center"
          style={{
            color: ink,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
            fontSize: "20px",
            letterSpacing: "0.05em",
          }}
        >
          <span className="flex flex-col items-center">
            <span lang="vi">DRESS CODE</span>
            <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
              服裝規範
            </span>
          </span>
        </h2>
        <p
          className="whitespace-pre-line text-sm md:text-base text-center opacity-70"
          style={{
            color: ink,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          }}
        >
          <span className="flex flex-col items-center">
            <span lang="vi">{d.dressText || "Trang phục dự tiệc"}</span>
            <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
              宴會服裝
            </span>
          </span>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {colors.map((c, i) => {
          const isLight = c.includes("255") || c.includes("#ff") || i === 2;
          return (
            <div
              key={i}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
              style={{
                backgroundColor: c,
                ...(isLight
                  ? { border: "1.5px solid rgba(233, 206, 158, 0.19)" }
                  : { borderWidth: "medium", borderStyle: "none", borderColor: "currentcolor", borderImage: "none" }),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
