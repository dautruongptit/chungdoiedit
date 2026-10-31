import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Guestbook({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const assets = t.assets || "/images/themes/porcelain-v2-green";
  const isRed = assets.includes("red");
  const isPink = assets.includes("pink");

  const textColor = t.ink || (isRed ? "rgb(143, 38, 45)" : isPink ? "rgb(220, 133, 153)" : "rgb(70, 79, 30)");
  const accentColor = t.accent || (isRed ? "rgb(101, 78, 47)" : isPink ? "rgb(119, 110, 56)" : "rgb(188, 155, 99)");
  const cardBg = isRed ? "rgb(254, 250, 240)" : "rgb(253, 249, 240)";

  const envelopeImg = isRed
    ? "/images/envelope/porcelain_v2_red.webp"
    : isPink
    ? "/images/envelope/porcelain_v2_pink.webp"
    : "/images/envelope/porcelain_v2_green.webp";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const guestbookEntries: Array<{ name: string; createdAt: string; message: string }> =
    anyD.guestbookEntries || [
      { name: "Lê Minh Tuấn", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng Duy Khang và Thảo Vy! Chúc hai bạn trăm năm hạnh phúc, mãi bên nhau nhé." },
      { name: "Phạm Ngọc Hân", createdAt: "20:27:29 2/9/2026", message: "Nhìn thiệp là thấy dịu dàng rồi. Chúc hai bạn một đám cưới thật đẹp và ấm áp!" },
      { name: "Nguyễn Gia Bảo", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng anh chị! Em nhất định sẽ có mặt để chung vui cùng hai anh chị." },
      { name: "Trần Khánh Linh", createdAt: "20:27:29 2/9/2026", message: "Chúc đôi bạn luôn yêu thương và thấu hiểu nhau, hạnh phúc dài lâu nha!" },
      { name: "Võ Thanh Trúc", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng hai bạn! Mong ngày cưới trời thật đẹp và mọi điều thật suôn sẻ." },
      { name: "Đỗ Hoàng Nam", createdAt: "20:27:29 2/9/2026", message: "Cuối cùng cũng tới ngày này! Chúc hai bạn xây tổ ấm thật vững vàng." },
      { name: "Bùi Thảo Nguyên", createdAt: "20:27:29 2/9/2026", message: "Chúc cô dâu chú rể thật nhiều sức khỏe và luôn giữ được nụ cười như hôm nay." },
      { name: "Hoàng Minh Đức", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng hạnh phúc! Hẹn gặp hai bạn ở Bảo Lộc nhé." },
      { name: "Lý Cẩm Tú", createdAt: "20:27:29 2/9/2026", message: "Chúc hai bạn một hành trình dài thật nhiều tiếng cười và bình yên." },
      { name: "Ngô Quang Huy", createdAt: "20:27:29 2/9/2026", message: "Chúc mừng Khang và Vy! Chúc hai bạn sớm có tin vui, gia đình luôn đầm ấm." },
    ];

  const bankAccounts: Array<{
    role: string;
    bank: string;
    accountNumber: string;
    accountHolder: string;
    qrUrl: string;
  }> = anyD.bankAccounts || [
    {
      role: "Chú Rể - NGUYEN DUY KHANG",
      bank: "BIDV",
      accountNumber: "6210077431",
      accountHolder: "NGUYEN DUY KHANG",
      qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970418011062100774310208QRIBFTTA53037045802VN6304DA15&ec=M",
    },
    {
      role: "Cô Dâu - TRAN THAO VY",
      bank: "MB Bank",
      accountNumber: "0904118826",
      accountHolder: "TRAN THAO VY",
      qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970422011009041188260208QRIBFTTA53037045802VN6304470F&ec=M",
    },
  ];

  const thankText = anyD.thankText || "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!";

  const borderLight = isRed
    ? "rgba(101, 78, 47, 0.333)"
    : isPink
    ? "rgba(119, 110, 56, 0.333)"
    : "rgba(188, 155, 99, 0.333)";

  return (
    <section
      className="relative isolate w-full border-y-[1.5px] "
      style={{
        backgroundColor: cardBg,
        borderColor: isPink || isRed ? accentColor : textColor,
        borderRadius: "0px",
      }}
    >
      <style>{`
        @keyframes ienvFloat{0%,100%{translate:0 0}50%{translate:0 -7px}}
        @keyframes ienvFloatMain{0%,100%{translate:-15% 0}50%{translate:-15% -7px}}
        @keyframes ienvShadowPulse{0%,100%{transform:scalex(1);opacity:.28}50%{transform:scalex(.9);opacity:.16}}
        @keyframes ienvSparkleAnim{0%,100%{opacity:0;transform:scale(.4)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes ienvHintPulse{0%,100%{opacity:.45}50%{opacity:1}}
        .ienv-shadow{animation:ienvShadowPulse 3s ease-in-out infinite}
        .ienv-card{transition:transform .35s ease;transform-origin:50% 92%;animation:ienvFloatMain 3s ease-in-out infinite}
        .ienv-back{transition:rotate .3s ease;animation:ienvFloat 5.2s ease-in-out .5s infinite}
        .ienv-sparkle{animation:ienvSparkleAnim 2.2s ease-in-out infinite}
        .ienv-sparkle-2{animation:ienvSparkleAnim 2.6s ease-in-out .4s infinite}
        .ienv-sparkle-3{animation:ienvSparkleAnim 2.4s ease-in-out .8s infinite}
        .ienv-sparkle-4{animation:ienvSparkleAnim 2.8s ease-in-out 1.2s infinite}
        .ienv-hint{animation:ienvHintPulse 2s ease-in-out infinite}
      `}</style>

      <div className="relative z-10 flex flex-col items-center gap-[23px] py-9 md:py-11">
        {/* Guestbook Part */}
        <section
          className="relative z-10 w-full px-6 [&_form]:max-w-[248px] md:[&_form]:max-w-[380px]"
          style={{
            color: accentColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <div className="text-center">
            <h2
              className="uppercase font-bold text-[20px] md:text-[24px] text-center"
              style={{
                color: isRed ? accentColor : textColor,
                fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              <span>Sổ lưu bút</span>
            </h2>
          </div>

          <form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">
            <div className="p-0" style={{ background: "transparent" }}>
              <div className="mb-4">
                <input
                  placeholder="Nhập tên*"
                  className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                  maxLength={500}
                  required
                  type="text"
                  defaultValue=""
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: "transparent",
                    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
                  }}
                />
              </div>
              <textarea
                placeholder="Nhập lời chúc*"
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                rows={4}
                maxLength={10000}
                required
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                  backgroundColor: "transparent",
                  fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
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
                      backgroundColor: accentColor.replace("rgb", "rgba").replace(")", ", 0.1)"),
                      color: accentColor,
                    }}
                  >
                    🪄
                  </button>
                </div>
                <button
                  type="submit"
                  className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    backgroundColor: accentColor,
                    color: "rgb(222, 217, 215)",
                    fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  <span>GỬI LỜI CHÚC</span>
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
            {guestbookEntries.map((entry, idx) => (
              <div
                key={idx}
                className="rounded-[6px] border p-4 text-sm"
                style={{
                  borderColor: borderLight,
                  backgroundColor: "rgba(255, 255, 255, 0.55)",
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-semibold" style={{ color: textColor }}>
                    {entry.name}
                  </span>
                  <span className="text-xs opacity-70">{entry.createdAt}</span>
                </div>
                <p className="mt-2 leading-relaxed whitespace-pre-line">{entry.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gifts Part */}
        <div
          className="flex flex-col items-center justify-center py-8 relative z-10 flex w-full flex-col items-center"
          style={{ backgroundColor: "transparent" }}
        >
          <h2
            className={'mb-4 uppercase text-[20px] md:text-[24px] "Times New Roman", ChungDoiIndic, serif flex flex-col items-center'}
            style={{
              color: isRed ? accentColor : textColor,
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              fontWeight: "700",
            }}
          >
            <span>Hộp Quà&nbsp;Mừng</span>
          </h2>

          <button
            type="button"
            aria-label="Mở hộp mừng cưới"
            onClick={() => setIsModalOpen(true)}
            className="jsx-1370451c15a89ae2 group relative cursor-pointer outline-none border-none bg-transparent "
            style={{ width: "210px", height: "287px" }}
          >
            <div className="jsx-1370451c15a89ae2 relative w-full h-full flex items-end justify-center pb-[48px]">
              <span
                className="jsx-1370451c15a89ae2 ienv-sparkle absolute pointer-events-none z-20"
                style={{ top: "6%", left: "12%", color: accentColor, fontSize: "16.5px" }}
              >
                ✦
              </span>
              <span
                className="jsx-1370451c15a89ae2 ienv-sparkle-2 absolute pointer-events-none z-20"
                style={{ top: "14%", right: "8%", color: accentColor, fontSize: "12px" }}
              >
                ✦
              </span>
              <span
                className="jsx-1370451c15a89ae2 ienv-sparkle-3 absolute pointer-events-none z-20"
                style={{ top: "34%", left: "3%", color: accentColor, fontSize: "10.5px" }}
              >
                ✦
              </span>
              <span
                className="jsx-1370451c15a89ae2 ienv-sparkle-4 absolute pointer-events-none z-20"
                style={{ top: "24%", right: "3%", color: accentColor, fontSize: "10.5px" }}
              >
                ✦
              </span>

              <div className="jsx-1370451c15a89ae2 relative" style={{ width: "150px", height: "205px" }}>
                <div
                  className="jsx-1370451c15a89ae2 ienv-shadow absolute pointer-events-none"
                  style={{
                    left: "50%",
                    bottom: "-6px",
                    width: "99px",
                    height: "11px",
                    marginLeft: "-49.5px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.45)",
                    filter: "blur(4px)",
                    zIndex: "0",
                    willChange: "transform, opacity",
                  }}
                />
                <img
                  alt=""
                  className="jsx-1370451c15a89ae2 ienv-back absolute inset-0 pointer-events-none"
                  src={envelopeImg}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center bottom",
                    transformOrigin: "50% 100%",
                    transform: "translateX(20%) translateY(-10%) scale(-0.8, 0.8) rotate(-15deg)",
                    zIndex: "1",
                    filter: "drop-shadow(rgba(0, 0, 0, 0.18) 0px 8px 14px)",
                    willChange: "transform",
                  }}
                />
                <img
                  alt=""
                  className="jsx-1370451c15a89ae2 ienv-card absolute inset-0 pointer-events-none"
                  src={envelopeImg}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center bottom",
                    rotate: "-10deg",
                    zIndex: "2",
                    filter: "drop-shadow(rgba(0, 0, 0, 0.22) 0px 10px 18px)",
                    willChange: "transform",
                  }}
                />
              </div>
            </div>

            <p
              className="jsx-1370451c15a89ae2 ienv-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium"
              style={{ color: accentColor }}
            >
              <span>Nhấn để mở</span>
            </p>
          </button>

          <dialog className={`modal modal-bottom sm:modal-middle ${isModalOpen ? "modal-open" : ""}`}>
            <div
              className="modal-box max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: "rgb(254, 250, 240)" }}
            >
              <div className="relative px-6 pt-6 pb-4 text-center" style={{ backgroundColor: textColor }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-white/80 hover:text-white hover:bg-white/20"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2
                  className={'uppercase text-[20px] md:text-[24px] "Times New Roman", ChungDoiIndic, serif'}
                  style={{
                    textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px",
                    fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  Hộp Quà Mừng
                </h2>
              </div>

              <div className="p-4 sm:p-6">
                <div
                  className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center"
                  style={{ color: accentColor }}
                >
                  {bankAccounts.map((acc, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                      <h3
                        className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2"
                        style={{ color: textColor }}
                      >
                        {acc.role}
                      </h3>
                      <div
                        className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center"
                        style={{ border: `2px solid ${textColor.replace("rgb", "rgba").replace(")", ", 0.125)")}` }}
                      >
                        <img alt={`QR - ${acc.role}`} className="w-full h-full object-contain" src={acc.qrUrl} />
                      </div>
                      <div className="mt-2 text-center space-y-0.5">
                        <p className="text-[10px]" style={{ color: accentColor }}>
                          {acc.bank}
                        </p>
                        <p className="text-[10px] font-mono" style={{ color: accentColor }}>
                          {acc.accountNumber}
                        </p>
                        <p className="text-[10px] font-semibold" style={{ color: accentColor }}>
                          {acc.accountHolder}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors"
                        style={{
                          color: textColor,
                          backgroundColor: textColor.replace("rgb", "rgba").replace(")", ", 0.082)"),
                        }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Lưu QR
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
              <button type="submit">close</button>
            </form>
          </dialog>
        </div>

        {/* Thank You Note */}
        <span
          className="whitespace-pre-line flex flex-col items-center gap-1 px-6 text-center text-[11px] md:text-[13px] mx-auto md:max-w-[560px]"
          style={{
            color: accentColor,
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
          }}
        >
          <span>{thankText}</span>
        </span>

        {/* Footer */}
        <div className="flex items-center justify-center ">
          <a
            href="https://chungdoi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs opacity-50 hover:opacity-70 transition-opacity "
            style={{ color: accentColor }}
          >
            ♡ chungdoi.com
          </a>
        </div>
      </div>
    </section>
  );
}
