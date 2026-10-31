import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

const DEFAULT_WISHES = [
  { name: "Ngọc Hồ", time: "22:35:37 31/1/2026", msg: "Chúc mừng anh chị luôn tràn ngập hạnh phúc và lúc nào cũng đong đầy yêu thương nhau trên quãng đường còn lại nhé! HAPPY WEDDING" },
  { name: "HOÀNG VĂN LỢI", time: "4:55:12 28/1/2026", msg: "Chúc hai  anh chị luôn tràn ngập yêu thương và hạnh phúc trong suốt quãng đời còn lại." },
  { name: "Ttt", time: "10:56:14 27/1/2026", msg: "Chúc vợ chồng mới cưới luôn gặp may mắn, sức khỏe và thành công." },
  { name: "Nguyễn vĂn sáng", time: "18:14:53 25/1/2026", msg: "Chúc hai bạn trặm năm hạnh phúc" },
  { name: "Thư Linh", time: "1:59:58 19/12/2025", msg: "Chúc hai bạn cưới nhau rồi là hạnh phúc gấp đôi, cười nhiều hơn mỗi ngày nha" },
  { name: "Bà Ngoại Linh", time: "1:59:21 19/12/2025", msg: "Chúc hai cháu trăm năm hạnh phúc, đầu bạc răng long" },
  { name: "Bác Hoàng", time: "1:58:44 19/12/2025", msg: "Mong hai con yêu thương, nhường nhịn nhau, xây dựng gia đình êm ấm" },
  { name: "Chú Kính", time: "1:58:31 19/12/2025", msg: "Chúc hai cháu nên duyên vợ chồng, sống với nhau hòa thuận, hạnh phúc lâu dài." },
  { name: "Lan Hương Gara", time: "1:58:17 19/12/2025", msg: "Chúc hai em trăm năm hạnh phúc, vợ chồng đồng lòng" },
  { name: "MIU MIU", time: "1:57:51 19/12/2025", msg: "Mong hai em luôn giữ được yêu thương như ngày đầu về chung một nhà." },
  { name: "Hg", time: "2:06:10 18/12/2025", msg: "🤔 Chúc hai bạn luôn tràn ngập yêu thương và hạnh phúc trong suốt quãng đời còn lại." },
  { name: "Cô Đào", time: "1:47:56 12/12/2025", msg: "Chúc hai đứa hạnh phúc trăm năm, con cháu đầy đàn" },
  { name: "Thành 12A1", time: "1:47:14 12/12/2025", msg: "Chúc hai bạn mãi mãi yêu nhau như ngày đầu tiên" },
  { name: "Anh hai", time: "1:46:39 12/12/2025", msg: "Mãi là cô dâu xinh đẹp và hạnh phúc nhé" },
  { name: "Em Đạt", time: "16:23:13 6/12/2025", msg: "Hy vọng rằng mỗi ngày của hai bạn đều là một ngày đáng nhớ và hạnh phúc." },
];

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const ink = t.ink || "rgb(233, 206, 158)";
  const cardBg = t.cardBg || "rgb(104, 14, 14)";
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState(DEFAULT_WISHES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    setWishes([{ name: name.trim(), time: timeStr, msg: message.trim() }, ...wishes]);
    setName("");
    setMessage("");
  };

  return (
    <section
      className="relative px-6 md:px-10 pt-10 md:pt-12 pb-8 md:pb-10 z-10"
      style={{
        backgroundColor: cardBg,
        color: ink,
        fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
      }}
    >
      <div className="text-center">
        <h2
          className="uppercase font-normal text-[20px] md:text-[26px]"
          style={{
            color: ink,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
            letterSpacing: "0.05em",
          }}
        >
          <span>Sổ lưu bút / 賓客留言</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">
        <div
          className="rounded-2xl border p-6 shadow-lg backdrop-blur-sm"
          style={{
            borderColor: "rgba(233, 206, 158, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="mb-4">
            <input
              placeholder="Nhập tên của bạn* / 請輸入您的姓名*"
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
              maxLength={500}
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                borderColor: ink,
                color: ink,
                backgroundColor: "rgba(233, 206, 158, 0.1)",
              }}
            />
          </div>
          <textarea
            placeholder="Nhập lời chúc của bạn* / 請輸入您的祝福*"
            className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
            rows={4}
            maxLength={10000}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              borderColor: ink,
              color: ink,
              backgroundColor: "rgba(233, 206, 158, 0.1)",
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
                  backgroundColor: "rgba(233, 206, 158, 0.1)",
                  color: ink,
                }}
              >
                🪄
              </button>
            </div>
            <button
              type="submit"
              className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: ink,
                color: "rgb(85, 63, 24)",
                fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              }}
            >
              <span>GỬI LỜI CHÚC / 送出祝福</span>
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
        {wishes.map((w, idx) => (
          <div
            key={idx}
            className="rounded-xl border p-4 text-sm shadow"
            style={{
              borderColor: "rgba(233, 206, 158, 0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.11)",
            }}
          >
            <div className="flex items-start justify-between">
              <span className="font-semibold" style={{ color: ink }}>
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
