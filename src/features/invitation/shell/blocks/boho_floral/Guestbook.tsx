import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);
  const d = (ctx.d || {}) as any;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const wishes = (d.wishes && d.wishes.length > 0 ? d.wishes : (ctx as any).wishes || []).slice(0, 6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    if ((ctx as any).onAddWish) {
      (ctx as any).onAddWish({ name: name.trim(), message: message.trim() });
    }
    setName("");
    setMessage("");
  };

  const bgBorder = theme.isPink
    ? "rgba(157, 109, 99, 0.25)"
    : theme.isBrown
    ? "rgba(74, 40, 22, 0.25)"
    : "rgba(48, 83, 15, 0.25)";

  const bgForm = theme.isPink
    ? "rgba(157, 109, 99, 0.03)"
    : theme.isBrown
    ? "rgba(74, 40, 22, 0.03)"
    : "rgba(48, 83, 15, 0.03)";

  const bgCard = theme.isPink
    ? "rgba(157, 109, 99, 0.02)"
    : theme.isBrown
    ? "rgba(74, 40, 22, 0.02)"
    : "rgba(48, 83, 15, 0.02)";

  const bgInput = theme.isPink
    ? "rgba(157, 109, 99, 0.04)"
    : theme.isBrown
    ? "rgba(74, 40, 22, 0.04)"
    : "rgba(48, 83, 15, 0.04)";

  const bgAiBtn = theme.isPink
    ? "rgba(157, 109, 99, 0.1)"
    : theme.isBrown
    ? "rgba(74, 40, 22, 0.1)"
    : "rgba(48, 83, 15, 0.1)";

  return (
    <section
      className="relative px-6 md:px-10 pt-10 md:pt-12 pb-8 md:pb-10 z-10"
      data-landing-screenshot-id="invite-guestbook"
      data-showcase-keep=""
      style={{
        color: theme.primaryColor,
        fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
      }}
    >
      <div className="text-center">
        <h2
          className="uppercase font-normal text-[20px] md:text-[24px]"
          style={{
            color: theme.primaryColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          <span dir="auto">Sổ lưu bút</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">
        <div
          className="rounded-lg border p-6 shadow-sm"
          style={{
            borderColor: bgBorder,
            backgroundColor: bgForm,
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
                borderColor: theme.primaryColor,
                color: theme.primaryColor,
                backgroundColor: bgInput,
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
              borderColor: theme.primaryColor,
              color: theme.primaryColor,
              backgroundColor: bgInput,
              resize: "none",
            }}
          />
          <div className="mt-4 flex items-center justify-between text-xs">
            <div className="flex items-center text-xs space-x-1">
              <button
                type="button"
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110 text-base leading-none"
                title="Tạo lời chúc bằng AI"
                style={{ backgroundColor: bgAiBtn, color: theme.primaryColor }}
              >
                🪄
              </button>
            </div>
            <button
              type="submit"
              className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: theme.primaryColor, borderRadius: "10px" }}
            >
              <span dir="auto">GỬI LỜI CHÚC</span>
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
        {wishes.map((w: any, idx: number) => {
          const wName = w.name || w.guestName || "Khách mời";
          const wTime = w.time || w.createdAt || w.at || "12:00:00 01/01/2026";
          const wContent = w.msg || w.message || w.content || "";
          return (
            <div
              key={idx}
              className="rounded-lg border p-4 text-sm shadow-sm"
              style={{ borderColor: bgBorder, backgroundColor: bgCard }}
            >
              <div className="flex items-start justify-between">
                <span className="font-semibold" style={{ color: theme.primaryColor }}>
                  {wName}
                </span>
                <span className="text-xs opacity-70">{wTime}</span>
              </div>
              <p className="mt-2 leading-relaxed">{wContent}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
