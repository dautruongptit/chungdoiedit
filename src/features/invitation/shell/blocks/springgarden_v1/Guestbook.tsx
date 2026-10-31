import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const ink = t.ink || "rgb(210, 95, 101)";
  const edge = t.edge || "rgb(245, 196, 200)";
  const fontFam = t.fontFamily || "Baskerville, \"Times New Roman\", ChungDoiIndic, serif";

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [wishes, setWishes] = useState<Array<{ author: string; content: string; time: string }>>(
    (anyD.guestbookEntries && anyD.guestbookEntries.length > 0)
      ? anyD.guestbookEntries.map((e: any) => ({
          author: e.name,
          content: e.message,
          time: e.createdAt || "Vừa xong",
        }))
      : [
          { author: "Anh Phước", time: "1:45:14 19/12/2025", content: "Chúc hai em trăm năm hạnh phúc" },
          { author: "Cậu Khanh", time: "1:44:49 19/12/2025", content: "Chúc hai cháu nên duyên vợ chồng, sống với nhau hòa thuận, hạnh phúc lâu dài" },
          { author: "Chị Mai", time: "1:44:12 19/12/2025", content: "Mừng ngày trọng đại, chúc hai đứa mãi mãi hạnh phúc bên nhau" },
          { author: "Bà Nội cô Dâu", time: "1:43:29 19/12/2025", content: "Chúc hai con sống bên nhau thuận hòa, hạnh phúc lâu dài, gia đình sum vầy" },
          { author: "Dì Minh", time: "1:42:59 19/12/2025", content: "Mong hai cháu luôn yêu thương, tôn trọng nhau, xây dựng gia đình hạnh phúc" },
          { author: "Dì Tâm", time: "1:42:47 19/12/2025", content: "Chúc hai cháu trăm năm hạnh phúc, vợ chồng hòa thuận, gia đình yên ấm" },
          { author: "Bé Diệu", time: "1:42:28 19/12/2025", content: "Chúc hai anh chị hạnh phúc viên mãn, gia đình êm ấm, vạn sự như ý" },
          { author: "Đình Trọng k22", time: "1:42:02 19/12/2025", content: "Chúc hai bạn trăm năm hạnh phúc, yêu thương nhau thật nhiều và sớm có tin vui" },
          { author: "Thương Thương", time: "1:41:39 19/12/2025", content: "Chúc vợ chồng son luôn vui vẻ, thuận hòa, cùng nhau xây dựng tổ ấm hạnh phúc" },
          { author: "Linh A4", time: "1:41:18 19/12/2025", content: "Chúc hai bạn trăm năm hạnh phúc, yêu thương nhau mãi mãi." },
        ]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newWish = {
      author: author.trim(),
      content: content.trim(),
      time: "Vừa xong",
    };

    setWishes([newWish, ...wishes]);
    setAuthor("");
    setContent("");
  };

  return (
    <section
      className="relative z-10 px-6 md:px-10 pt-10 md:pt-12 pb-8 md:pb-10 rounded-2xl mx-auto"
      style={{
        backgroundColor: "rgba(213, 95, 101, 0.15)",
        color: ink,
        fontFamily: fontFam,
        maxWidth: "600px",
      }}
    >
      <div className="text-center">
        <h2
          className="uppercase font-normal text-[20px] md:text-[26px]"
          style={{
            color: ink,
            fontFamily: fontFam,
            fontSize: "20px",
            letterSpacing: "0.05em",
          }}
        >
          <span>Sổ lưu bút</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">
        <div
          className="rounded-2xl border bg-white/50 p-6 shadow-lg backdrop-blur-sm"
          style={{ borderColor: edge }}
        >
          <div className="mb-4">
            <input
              placeholder="Nhập tên của bạn*"
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
              maxLength={500}
              required
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{
                borderColor: edge,
                color: ink,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </div>
          <textarea
            placeholder="Nhập lời chúc của bạn*"
            className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
            rows={4}
            maxLength={10000}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              borderColor: edge,
              color: ink,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
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
                  backgroundColor: `color-mix(in srgb, ${ink} 10%, transparent 90%)`,
                  color: ink,
                }}
              >
                🪄
              </button>
            </div>
            <button
              type="submit"
              className="rounded-full px-6 py-2 text-sm font-semibold transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: ink,
                color: "#ffffff",
                fontFamily: fontFam,
              }}
            >
              <span>GỬI LỜI CHÚC</span>
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
        {wishes.map((w, idx: number) => (
          <div
            key={idx}
            className="rounded-xl border bg-white/30 p-4 text-sm shadow"
            style={{ borderColor: edge }}
          >
            <div className="flex items-start justify-between">
              <span className="font-semibold" style={{ color: ink }}>
                {w.author}
              </span>
              <span className="text-xs opacity-70">{w.time}</span>
            </div>
            <p className="mt-2 leading-relaxed">{w.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
