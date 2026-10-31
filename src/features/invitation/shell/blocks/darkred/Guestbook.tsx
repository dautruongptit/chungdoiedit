import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, wishName, setWishName, wishMsg, setWishMsg, handleSendWish } = ctx;
  if (!d.guestOn) return null;

  return (
    <div className="@container relative z-10 overflow-x-clip">
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-15px] md:top-[-30px] lg:top-[-30px] w-[120%] max-w-[650px] -translate-x-1/2 object-contain opacity-95 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
        src={`${t.assets}/papernote-background.webp`}
      />
      <section
        className="relative z-10 px-6 pb-8 pt-[74px] md:pt-[120px] [&_textarea]:h-[56px] md:[&_textarea]:h-[110px] [&_form]:max-w-[280px] md:[&_form]:max-w-[380px] [&>div:last-child]:mt-[max(60px,calc(109.3cqw-333px))] md:[&>div:last-child]:mt-[110px]"
        style={{ color: t.ink, fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}
      >
        <div className="text-center">
          <h2
            className="uppercase font-bold text-[20px] md:text-[24px] relative -translate-y-[-16px]"
            style={{
              color: t.ink,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "0.03em",
            }}
          >
            <span>Sổ lưu bút</span>
          </h2>
        </div>

        <form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]" onSubmit={handleSendWish}>
          <div className="rounded-[8px] p-4" style={{ background: "transparent" }}>
            <div className="mb-4">
              <input
                placeholder="Nhập tên*"
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                maxLength={500}
                required
                type="text"
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                style={{ borderColor: t.ink, color: t.ink, backgroundColor: "transparent" }}
              />
            </div>
            <textarea
              placeholder="Nhập lời chúc*"
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
              rows={4}
              maxLength={10000}
              required
              value={wishMsg}
              onChange={(e) => setWishMsg(e.target.value)}
              style={{ borderColor: t.ink, color: t.ink, backgroundColor: "transparent", resize: "none" }}
            />
            <div className="-mt-[-5px] flex items-center justify-between text-xs">
              <div className="flex items-center text-xs space-x-1">
                <button
                  type="button"
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-110 text-base leading-none"
                  title="Tạo lời chúc bằng AI"
                  style={{ backgroundColor: "rgba(81, 20, 25, 0.1)", color: t.ink }}
                >
                  🪄
                </button>
              </div>
              <button
                type="submit"
                className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: t.ink, color: "rgb(222, 217, 215)" }}
              >
                <span>GỬI LỜI CHÚC</span>
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
          {d.wishes.map((w, wi) => (
            <div
              key={wi}
              className="rounded-[8px] border p-4 text-sm"
              style={{
                borderColor: "rgba(81, 20, 25, 0.333)",
                backgroundColor: "rgba(255, 255, 255, 0.55)",
              }}
            >
              <div className="flex items-start justify-between">
                <span className="font-semibold" style={{ color: t.ink }}>{w.name}</span>
                <span className="text-xs opacity-70">{w.at}</span>
              </div>
              <p className="mt-2 leading-relaxed">{w.msg}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
