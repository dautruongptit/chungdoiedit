import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme } from "./themeVars";

interface WishItem {
  name: string;
  time: string;
  content: string;
}

const WISHES_DARKRED: WishItem[] = [
  { name: "Nguyễn Minh Khoa", time: "13:09:05 17/8/2026", content: "Chúc mừng hạnh phúc hai bạn! Chúc Gia Bảo và Ngọc Diệp trăm năm hạnh phúc, đầu bạc răng long." },
  { name: "Trần Thu Hà", time: "13:09:05 17/8/2026", content: "Thiệp đẹp quá trời! Chúc hai bạn một đám cưới thật trọn vẹn và ấm áp nhé." },
  { name: "Lê Quốc Huy", time: "13:09:05 17/8/2026", content: "Chúc anh chị mãi mãi bên nhau, sớm có tin vui. Nhất định em sẽ có mặt đúng giờ!" },
  { name: "Phạm Hoài An", time: "13:09:05 17/8/2026", content: "Chúc mừng cặp đôi! Mong hai bạn xây được một mái ấm tràn đầy tiếng cười." },
  { name: "Đặng Thảo Nguyên", time: "13:09:05 17/8/2026", content: "Chúc hai bạn hạnh phúc viên mãn, mãi yêu thương và thấu hiểu nhau." },
  { name: "Vũ Đình Nam", time: "13:09:05 17/8/2026", content: "Cuối cùng cũng tới ngày này! Chúc mừng Gia Bảo nhé, chúc hai bạn thật nhiều may mắn." },
  { name: "Hoàng Kim Chi", time: "13:09:05 17/8/2026", content: "Chúc Ngọc Diệp làm cô dâu xinh nhất! Chúc hai bạn trăm năm hạnh phúc." },
  { name: "Bùi Tuấn Kiệt", time: "13:09:05 17/8/2026", content: "Chúc hai bạn một chặng đường mới thật nhiều niềm vui và bình an." },
  { name: "Ngô Bảo Trân", time: "13:09:05 17/8/2026", content: "Chúc mừng hai bạn! Mong ngày cưới nắng đẹp và mọi thứ thật suôn sẻ." },
  { name: "Trịnh Gia Hân", time: "13:09:05 17/8/2026", content: "Chúc anh chị hạnh phúc trọn đời, luôn nắm tay nhau đi qua mọi điều." },
];

const WISHES_DARKGREEN: WishItem[] = [
  { name: "Trịnh Văn Hải", time: "10:15:50 5/9/2026", content: "Chúc cô dâu chú rể trăm năm hòa hợp, con cháu đầy nhà. Chúc mừng gia đình hai bên!" },
  { name: "Ngô Thị Lan Anh", time: "10:15:50 5/9/2026", content: "Chúc hai bạn một hành trình dài thật nhiều yêu thương. Mong sớm được gặp ở tiệc cưới!" },
  { name: "Bùi Quang Huy", time: "10:15:50 5/9/2026", content: "Chúc mừng ông bạn thân! Cuối cùng cũng có người chịu đựng được ông rồi, haha." },
  { name: "Đặng Thu Hà", time: "10:15:50 5/9/2026", content: "Chúc anh chị sớm có tin vui, gia đình luôn đầm ấm và ngập tràn tiếng cười." },
  { name: "Hoàng Nam Phong", time: "10:15:50 5/9/2026", content: "Từ Đà Nẵng bay vô Huế dự cưới hai bạn cho bằng được. Chúc mừng hạnh phúc!" },
  { name: "Võ Thị Kim Chi", time: "10:15:50 5/9/2026", content: "Chúc hai bạn luôn giữ được nụ cười như trong tấm ảnh này. Hạnh phúc thật nhiều nhé!" },
  { name: "Phạm Minh Đức", time: "10:15:50 5/9/2026", content: "Anh em chúc chú rể vững tay lái, cả đời chở cô dâu đi khắp thế gian. Chúc mừng nha!" },
  { name: "Trần Bảo Ngọc", time: "10:15:50 5/9/2026", content: "Chúc mừng chị Trâm nhé! Nhìn ảnh cưới mà mừng rơi nước mắt luôn. Yêu chị nhiều." },
  { name: "Lê Anh Tuấn", time: "10:15:50 5/9/2026", content: "Thiệp đẹp quá, mở ra là thấy sang trọng liền. Chúc hai em một đám cưới thật trọn vẹn nhé!" },
  { name: "Nguyễn Thị Hoài Thu", time: "10:15:50 5/9/2026", content: "Chúc mừng hạnh phúc hai bạn! Chúc Duy Khang và Mai Trâm trăm năm hạnh phúc, đầu bạc răng long." },
];

const WISHES_DARKBLUE: WishItem[] = [
  { name: "Lý Phương Mai", time: "10:35:49 10/9/2026", content: "Chúc hai bạn ngày cưới thật trọn vẹn và nhiều niềm vui!" },
  { name: "Ngô Đức Huy", time: "10:35:48 10/9/2026", content: "Mừng ngày vui của hai bạn! Chúc hạnh phúc bền lâu." },
  { name: "Bùi Thanh Trúc", time: "10:35:48 10/9/2026", content: "Chúc anh chị trăm năm hoà hợp, gia đình luôn ấm êm." },
  { name: "Hoàng Gia Bảo", time: "10:35:48 10/9/2026", content: "Chúc mừng hạnh phúc! Mong hai bạn luôn đồng hành và sẻ chia." },
  { name: "Đỗ Khánh Linh", time: "10:35:48 10/9/2026", content: "Chúc cô dâu chú rể luôn giữ được nụ cười như hôm nay nhé." },
  { name: "Vũ Hoài Anh", time: "10:35:48 10/9/2026", content: "Nhìn ảnh cưới mà xúc động ghê. Chúc mừng hai bạn nhiều thật nhiều!" },
  { name: "Trần Bảo Ngọc", time: "10:35:48 10/9/2026", content: "Chúc hai bạn một đám cưới thật viên mãn và một đời thương nhau." },
  { name: "Nguyễn Quốc Đạt", time: "10:35:48 10/9/2026", content: "Chúc mừng Hoàng Nam và Thuỳ Dương! Hẹn gặp cả nhà ở Nam Định." },
  { name: "Phạm Thu Hà", time: "10:35:48 10/9/2026", content: "Thiệp đẹp quá trời! Chúc anh chị mãi bên nhau thật hạnh phúc." },
  { name: "Lê Minh Tuấn", time: "10:35:48 10/9/2026", content: "Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử nhé!" },
];

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [userWishes, setUserWishes] = useState<WishItem[]>([]);

  const defaultWishes =
    theme.variant === "darkgreen"
      ? WISHES_DARKGREEN
      : theme.variant === "darkblue"
      ? WISHES_DARKBLUE
      : WISHES_DARKRED;

  const wishes: WishItem[] = [...userWishes, ...defaultWishes];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    setUserWishes([{ name: name.trim(), time: timeStr, content: content.trim() }, ...userWishes]);
    setName("");
    setContent("");
  };

  return (
    <section
      className="relative z-10 w-full px-6 [&_form]:max-w-[248px] md:[&_form]:max-w-[380px]"
      data-landing-screenshot-id="invite-guestbook"
      data-showcase-keep=""
      style={{
        color: theme.textColor,
        fontFamily: '"Times New Roman", ChungDoiIndic, serif',
      }}
    >
      <div className="text-center">
        <h2
          className="uppercase text-center relative z-10 text-[20px] md:text-[24px] mb-5"
          style={{
            color: theme.goldColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
          }}
        >
          <span dir="auto">Sổ lưu bút</span>
        </h2>
      </div>

      <form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]" onSubmit={handleSubmit}>
        <div className="p-0" style={{ background: "transparent" }}>
          <div className="mb-4">
            <input
              placeholder="Nhập tên*"
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
              maxLength={500}
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                borderColor: theme.goldColor,
                color: theme.textColor,
                backgroundColor: "transparent",
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
                borderRadius: "6px",
              }}
            />
          </div>
          <textarea
            placeholder="Nhập lời chúc*"
            className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
            rows={4}
            maxLength={10000}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              borderColor: theme.goldColor,
              color: theme.textColor,
              backgroundColor: "transparent",
              fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
              borderRadius: "6px",
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
                  backgroundColor: "rgba(255, 223, 175, 0.1)",
                  color: theme.goldColor,
                }}
              >
                🪄
              </button>
            </div>
            <button
              type="submit"
              className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: theme.goldColor,
                color: "rgb(81, 20, 25)",
                fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              }}
            >
              <span dir="auto">GỬI LỜI CHÚC</span>
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
        {wishes.map((w, idx) => (
          <div
            key={idx}
            className="rounded-[6px] border p-4 text-sm"
            style={{
              borderColor: "rgba(255, 223, 175, 0.333333)",
              backgroundColor: "rgba(255, 223, 175, 0.06)",
            }}
          >
            <div className="flex items-start justify-between">
              <span className="font-semibold" style={{ color: theme.goldColor }}>
                {w.name}
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
