function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}
import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

const DEFAULT_WISHES = [
  { name: "HOÀNG VĂN LỢI", time: "4:50:34 28/1/2026", msg: "CHÚC 2 ANH CHỊ TRĂM NĂM HẠNH PHÚC" },
  { name: "Thanh", time: "21:22:07 24/1/2026", msg: "Chúc Hoàng Nam và Thanh Tú trọn đời bên nhau, cùng sẻ chia những niềm vui và nỗi buồn, vượt qua mọi chông gai." },
  { name: "An Thư Pháp", time: "1:53:19 19/12/2025", msg: "Mừng ngày trọng đại! Chúc hai bạn cười nhiều hơn cãi, yêu nhiều hơn giận" },
  { name: "Hoàng Thương M.U.A", time: "1:52:54 19/12/2025", msg: "Từ nay có người để thương để lo rồi nhé, chúc cuộc sống hôn nhân lúc nào cũng ngọt ngào" },
  { name: "Anh Thắng FPT", time: "1:52:00 19/12/2025", msg: "Chúc hai đứa về chung một nhà thật hạnh phúc, yêu nhau hoài không chán nha" },
  { name: "Toàn Honda", time: "1:51:32 19/12/2025", msg: "Chúc vợ chồng son mãi yêu thương, sớm có tin vui" },
  { name: "Minh Lý CV", time: "1:51:04 19/12/2025", msg: "Mừng ngày vu quy, chúc đôi uyên ương hạnh phúc bền lâu" },
  { name: "Thanh Khuê", time: "1:50:44 19/12/2025", msg: "Chúc hai bạn trăm năm hạnh phúc, viên mãn yêu thương." },
  { name: "Ngọc My", time: "1:50:27 19/12/2025", msg: "Chúc hai bạn đi cùng nhau thật xa, thật lâu, và luôn vui như hôm nay." },
  { name: "Vũ nè", time: "1:23:56 12/12/2025", msg: "Vậy là bạn thân mình có vợ ròi, chúc 2 bạn trăm năm hạnh phúc, bạc đầu nghĩa phu thê" },
  { name: "My", time: "1:22:23 12/12/2025", msg: "Dì chúc hai con trăm năm hạnh phúc." },
  { name: "Nghĩa", time: "1:05:52 12/12/2025", msg: "Trăm năm hạnh phúc nha bạn tôi ơi" },
  { name: "Thanh Trúc", time: "1:05:15 12/12/2025", msg: "chúc hai bạn trăm năm hạnh phúc nhá🥰" },
];

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const theme = getSongHyTheme(ctx);
  const d = ctx.d as any;
  const [name, setName] = useState("Anh Tuấn");
  const [message, setMessage] = useState("");

  const placeholderName = toStr(d.guestNamePlaceholder, "Nhập tên của bạn*");
  const placeholderWish = toStr(d.guestWishPlaceholder, "Nhập lời chúc của bạn*");
  const submitText = toStr(d.submitWishText, "GỬI LỜI CHÚC");

  const wishes = d.wishes && d.wishes.length > 0 ? d.wishes : DEFAULT_WISHES;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: theme.paperColor }}
    >
      
      <section
        className="relative z-10 flex flex-col items-center justify-center w-full py-8 px-2 sm:px-4"
        data-landing-screenshot-id="invite-guestbook"
        data-showcase-keep=""
        style={{ color: theme.grayColor }}
      >
        <div className="text-center">
          <h2 className="hidden">
            <span dir="auto">Sổ lưu bút</span>
          </h2>
        </div>
        <form
          className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div className="mb-4">
              <input
                placeholder={placeholderName}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none font-body-sans"
                maxLength={500}
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <textarea
              placeholder={placeholderWish}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none font-body-sans"
              rows={4}
              maxLength={10000}
              required
              style={{ resize: "none" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="mt-4 flex items-center justify-between text-xs">
              <div className="flex items-center text-xs space-x-1">
                <button
                  type="button"
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-110 text-base leading-none"
                  title="Tạo lời chúc bằng AI"
                  style={{
                    backgroundColor: theme.isGreen
                      ? "rgba(31, 58, 37, 0.1)"
                      : "rgba(128, 0, 0, 0.1)",
                    color: theme.primaryColor,
                  }}
                >
                  🪄
                </button>
              </div>
              <button
                type="submit"
                className="px-4 sm:px-8 py-2 sm:py-3 rounded-full text-white font-body-sans font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{
                  backgroundColor: theme.primaryColor,
                  fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
                }}
              >
                <span dir="auto">{submitText}</span>
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
          {wishes.map((w: any, idx: number) => (
            <div key={idx} className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
              <div className="flex items-start justify-between">
                <span
                  className="text-lg"
                  style={{
                    color: theme.primaryColor,
                    fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  {w.name}
                </span>
                <span className="text-xs opacity-70">{w.time}</span>
              </div>
              <p className="mt-2 leading-relaxed">{w.msg}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
