import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getCrystalFloralThemeVars } from "./themeVars";

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d as any;
  const vars = getCrystalFloralThemeVars(d?.templateId || "crystal_floral_blue");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const primaryRgba02 = vars.primaryColor.replace("rgb", "rgba").replace(")", ", 0.2)");
  const textRgba04 = (() => {
    const m = vars.textColor.match(/\d+/g);
    return m ? `rgba(${m[0]}, ${m[1]}, ${m[2]}, 0.4)` : "rgba(47, 58, 69, 0.4)";
  })();
  const primaryRgba01 = vars.primaryColor.replace("rgb", "rgba").replace(")", ", 0.1)");

  const wishes = (d?.wishes && d.wishes.length > 0 && !d.wishes.some((w: any) => w.name === "An")) ? d.wishes : vars.defaultWishes;

  return (
    <section
      className="relative z-10 px-6 md:px-10 pt-10 md:pt-12 pb-8 md:pb-10 flex flex-col items-center"
      data-landing-screenshot-id="invite-guestbook"
      data-showcase-keep=""
      style={{
        backgroundColor: "transparent",
        color: vars.textColor,
        fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", ChungDoiIndic, serif',
      }}
    >
      <div className="text-center">
        <h2
          className="uppercase font-bold text-[20px] md:text-[24px] text-center mb-6"
          style={{
            color: vars.primaryColor,
            fontFamily: '"Times New Roman", Times, ChungDoiIndic, serif',
            fontWeight: 700,
            letterSpacing: vars.headingLetterSpacing,
          }}
        >
          <span dir="auto">Sổ lưu bút</span>
        </h2>
      </div>

      <form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]" onSubmit={(e) => e.preventDefault()}>
        <div
          className="rounded-2xl border p-6"
          style={{
            borderColor: primaryRgba02,
            backgroundColor: "transparent",
          }}
        >
          <div className="mb-4">
            <input
              placeholder="Nhập tên của bạn*"
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
              maxLength={500}
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                borderColor: textRgba04,
                color: vars.textColor,
                backgroundColor: "transparent",
              }}
            />
          </div>
          <textarea
            placeholder="Nhập lời chúc của bạn*"
            className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
            rows={4}
            maxLength={10000}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              borderColor: textRgba04,
              color: vars.textColor,
              backgroundColor: "transparent",
              resize: "none",
            }}
          />
          <div className="mt-4 flex items-center justify-between text-xs">
            <div className="flex items-center text-xs space-x-1">
              <button
                type="button"
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110 text-base leading-none"
                title="Tạo lời chúc bằng AI"
                style={{
                  backgroundColor: primaryRgba01,
                  color: vars.primaryColor,
                }}
              >
                🪄
              </button>
            </div>
            <button
              type="submit"
              className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: vars.primaryColor }}
            >
              <span dir="auto">GỬI LỜI CHÚC</span>
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
        {wishes.map((w: any, idx: number) => (
          <div
            key={idx}
            className="rounded-xl border p-4 text-sm"
            style={{
              borderColor: primaryRgba02,
              backgroundColor: "transparent",
            }}
          >
            <div className="flex items-start justify-between">
              <span className="font-semibold" style={{ color: vars.primaryColor }}>
                {w.name}
              </span>
              <span className="text-xs opacity-70">{w.time}</span>
            </div>
            <p className="mt-2 leading-relaxed">{w.msg}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
