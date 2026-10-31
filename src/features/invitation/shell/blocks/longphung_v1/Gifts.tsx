import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, giftModalOpen, setGiftModalOpen, giftTitle, saveQr } = ctx;
  const ink = t.ink || "rgb(233, 206, 158)";
  const muted = t.muted || "rgb(217, 188, 134)";
  const cardBg = t.cardBg || "rgb(104, 14, 14)";

  const defaultGifts = [
    {
      id: "groom",
      who: "groom" as const,
      bankName: "Vietcombank",
      accountNumber: "0000000000",
      accountName: "THIEP CUOI DEMO",
      label: "Chú Rể / 新郎 - THIEP CUOI DEMO",
      qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M",
    },
    {
      id: "bride",
      who: "bride" as const,
      bankName: "VietinBank",
      accountNumber: "8084856145",
      accountName: "Lê Ngọc Linh",
      label: "Cô Dâu / 新娘 - Lê Ngọc Linh",
      qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970415011080848561450208QRIBFTTA53037045802VN63041BE3&ec=M",
    },
  ];

  const giftItems = d.gifts && d.gifts.length > 0 ? d.gifts : defaultGifts;

  return (
    <div
      className="flex flex-col items-center justify-center py-8 relative px-6 md:px-10 pt-6 md:pt-8 pb-10 md:pb-14 z-10"
      style={{ backgroundColor: "transparent" }}
    >
      <h2
        className="mb-4 uppercase font-normal text-[20px] md:text-[26px]  flex flex-col items-center"
        style={{
          color: ink,
          fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          letterSpacing: "0.05em",
        }}
      >
        <span className="flex flex-col items-center">
          <span lang="vi">Hộp Quà&nbsp;Mừng</span>
          <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
            禮物盒
          </span>
        </span>
      </h2>

      <button
        type="button"
        aria-label="Mở hộp mừng cưới"
        onClick={() => setGiftModalOpen(true)}
        className="group relative cursor-pointer outline-none border-none bg-transparent"
        style={{ width: "260px", height: "280px" }}
      >
        <div className="relative w-full h-full flex items-end justify-center pb-[26px]">
          <span
            className="igb-sparkle absolute pointer-events-none z-20"
            style={{ top: "8%", left: "14%", color: muted, fontSize: "22px" }}
          >
            ✦
          </span>
          <span
            className="igb-sparkle-2 absolute pointer-events-none z-20"
            style={{ top: "18%", right: "10%", color: muted, fontSize: "16px" }}
          >
            ✦
          </span>
          <span
            className="igb-sparkle-3 absolute pointer-events-none z-20"
            style={{ top: "32%", left: "5%", color: muted, fontSize: "14px" }}
          >
            ✦
          </span>
          <span
            className="igb-sparkle-4 absolute pointer-events-none z-20"
            style={{ top: "26%", right: "5%", color: muted, fontSize: "14px" }}
          >
            ✦
          </span>

          <div className="absolute pointer-events-none z-0" style={{ bottom: "187px", left: "50%" }}>
            <div
              className="igb-confetti igb-c1"
              style={{
                position: "absolute",
                left: "50%",
                top: "0px",
                opacity: 0,
                marginLeft: "-5.5px",
                marginTop: "-2.75px",
                pointerEvents: "none",
                willChange: "transform, opacity",
                width: "11px",
                height: "5.5px",
                backgroundColor: "rgb(236, 72, 153)",
                borderRadius: "2px",
              }}
            />
            <div
              className="igb-confetti igb-c2"
              style={{
                position: "absolute",
                left: "50%",
                top: "0px",
                opacity: 0,
                marginLeft: "-5px",
                marginTop: "-5px",
                pointerEvents: "none",
                willChange: "transform, opacity",
                width: "10px",
                height: "10px",
                backgroundColor: muted,
                borderRadius: "50%",
              }}
            />
            <div
              className="igb-confetti igb-c3"
              style={{
                position: "absolute",
                left: "50%",
                top: "0px",
                opacity: 0,
                marginLeft: "-5.5px",
                marginTop: "-2.75px",
                pointerEvents: "none",
                willChange: "transform, opacity",
                width: "11px",
                height: "5.5px",
                backgroundColor: "rgb(34, 197, 94)",
                borderRadius: "2px",
              }}
            />
            <div
              className="igb-confetti igb-c4"
              style={{
                position: "absolute",
                left: "50%",
                top: "0px",
                opacity: 0,
                marginLeft: "-4.5px",
                marginTop: "-4.5px",
                pointerEvents: "none",
                willChange: "transform, opacity",
                width: "9px",
                height: "9px",
                backgroundColor: "rgb(59, 130, 246)",
                borderRadius: "50%",
              }}
            />
            <div
              className="igb-confetti igb-c5"
              style={{
                position: "absolute",
                left: "50%",
                top: "0px",
                opacity: 0,
                marginLeft: "-6px",
                marginTop: "-3px",
                pointerEvents: "none",
                willChange: "transform, opacity",
                width: "12px",
                height: "6px",
                backgroundColor: "rgb(168, 85, 247)",
                borderRadius: "2px",
              }}
            />
            <div
              className="igb-confetti igb-c6"
              style={{
                position: "absolute",
                left: "50%",
                top: "0px",
                opacity: 0,
                marginLeft: "-5px",
                marginTop: "-5px",
                pointerEvents: "none",
                willChange: "transform, opacity",
                width: "0px",
                height: "0px",
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: "10px solid rgb(250, 204, 21)",
              }}
            />
            <div
              className="igb-confetti igb-c7"
              style={{
                position: "absolute",
                left: "50%",
                top: "0px",
                opacity: 0,
                marginLeft: "-5px",
                marginTop: "-2.5px",
                pointerEvents: "none",
                willChange: "transform, opacity",
                width: "10px",
                height: "5px",
                backgroundColor: ink,
                borderRadius: "2px",
              }}
            />
            <div
              className="igb-confetti igb-c8"
              style={{
                position: "absolute",
                left: "50%",
                top: "0px",
                opacity: 0,
                marginLeft: "-4.5px",
                marginTop: "-4.5px",
                pointerEvents: "none",
                willChange: "transform, opacity",
                width: "9px",
                height: "9px",
                backgroundColor: "rgb(249, 115, 22)",
                borderRadius: "50%",
              }}
            />
          </div>

          <div className="igb-bob relative" style={{ width: "200px", height: "220px" }}>
            <div
              className="igb-shadow absolute pointer-events-none"
              style={{
                left: "50%",
                bottom: "-8px",
                width: "144px",
                height: "12px",
                marginLeft: "-72px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                filter: "blur(4px)",
                zIndex: 0,
                willChange: "transform, opacity",
              }}
            />
            <img
              alt=""
              className="igb-decor igb-decor-1 absolute pointer-events-none"
              src="/images/giftbox/mini/qasr_gold.webp"
              style={{
                left: "-20px",
                top: "10px",
                width: "34px",
                zIndex: 1,
                transform: "rotate(-22deg)",
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)",
                willChange: "transform, opacity",
              }}
            />
            <img
              alt=""
              className="igb-decor igb-decor-2 absolute pointer-events-none"
              src="/images/giftbox/mini/song_hy_green.webp"
              style={{
                left: "168px",
                top: "2px",
                width: "38px",
                zIndex: 1,
                transform: "rotate(20deg)",
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)",
                willChange: "transform, opacity",
              }}
            />
            <img
              alt=""
              className="igb-decor igb-decor-3 absolute pointer-events-none"
              src="/images/giftbox/mini/spring_garden_green.webp"
              style={{
                left: "-16px",
                top: "120px",
                width: "26px",
                zIndex: 1,
                transform: "rotate(-18deg)",
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)",
                willChange: "transform, opacity",
              }}
            />
            <img
              alt=""
              className="igb-decor igb-decor-4 absolute pointer-events-none"
              src="/images/giftbox/mini/minimalism_green.webp"
              style={{
                left: "182px",
                top: "114px",
                width: "24px",
                zIndex: 1,
                transform: "rotate(14deg)",
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)",
                willChange: "transform, opacity",
              }}
            />
            <img
              alt=""
              className="igb-box absolute pointer-events-none"
              loading="lazy"
              decoding="async"
              src="/images/giftbox/dragon_phoenix.webp"
              style={{
                left: "50%",
                bottom: "0px",
                width: "170px",
                maxHeight: "220px",
                objectFit: "contain",
                marginLeft: "-85px",
                zIndex: 2,
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 10px 18px)",
                willChange: "transform",
              }}
            />
            <img
              alt=""
              className="igb-decor igb-decor-5 absolute pointer-events-none"
              src="/images/giftbox/mini/elegant_leaf_green.webp"
              style={{
                left: "-8px",
                top: "172px",
                width: "44px",
                zIndex: 3,
                transform: "rotate(8deg)",
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)",
                willChange: "transform, opacity",
              }}
            />
            <img
              alt=""
              className="igb-decor igb-decor-6 absolute pointer-events-none"
              src="/images/giftbox/mini/sunflower_yellow.webp"
              style={{
                left: "26px",
                top: "182px",
                width: "26px",
                zIndex: 3,
                transform: "rotate(-10deg)",
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)",
                willChange: "transform, opacity",
              }}
            />
            <img
              alt=""
              className="igb-decor igb-decor-7 absolute pointer-events-none"
              src="/images/giftbox/mini/chibi_red.webp"
              style={{
                left: "118px",
                top: "176px",
                width: "40px",
                zIndex: 3,
                transform: "rotate(-14deg)",
                filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)",
                willChange: "transform, opacity",
              }}
            />
          </div>
        </div>
        <p
          className="igb-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium"
          style={{ color: ink }}
        >
          <span className="flex flex-col items-center">
            <span lang="vi">Nhấn để mở</span>
            <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
              點擊開啟
            </span>
          </span>
        </p>
      </button>

      {/* Modal Hộp quà */}
      <dialog
        className={`modal modal-bottom sm:modal-middle ${giftModalOpen ? "modal-open" : ""}`}
        open={giftModalOpen}
      >
        <div
          className="modal-box max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: cardBg }}
        >
          <div className="relative px-6 pt-6 pb-4 text-center" style={{ backgroundColor: ink }}>
            <button
              type="button"
              onClick={() => setGiftModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-white/80 hover:text-white hover:bg-white/20"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2
              className="uppercase font-normal text-[20px] md:text-[26px]"
              style={{
                textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px",
                fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
                letterSpacing: "0.05em",
                color: "white",
              }}
            >
              Hộp Quà Mừng / 禮物盒
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            <div
              className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center"
              style={{ color: ink }}
            >
              {giftItems.map((g) => {
                const label = "label" in g ? (g as any).label : `${giftTitle(g as any)} - ${g.accountName}`;
                return (
                  <div key={g.id} className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                    <h3
                      className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2"
                      style={{ color: ink }}
                    >
                      {label}
                    </h3>
                    <div
                      className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center"
                      style={{ border: "2px solid rgba(233, 206, 158, 0.125)" }}
                    >
                      <img
                        alt={`QR - ${label}`}
                        className="w-full h-full object-contain"
                        src={g.qrUrl}
                      />
                    </div>
                    <div className="mt-2 text-center space-y-0.5">
                      <p className="text-[10px]" style={{ color: ink }}>
                        {g.bankName}
                      </p>
                      <p className="text-[10px] font-mono" style={{ color: ink }}>
                        {g.accountNumber}
                      </p>
                      <p className="text-[10px] font-semibold" style={{ color: ink }}>
                        {g.accountName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => saveQr(g as any)}
                      className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors"
                      style={{ color: ink, backgroundColor: "rgba(233, 206, 158, 0.082)" }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Lưu QR / 儲存QR
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="modal-backdrop" onClick={() => setGiftModalOpen(false)}>
          <button type="button">close</button>
        </div>
      </dialog>
    </div>
  );
}
