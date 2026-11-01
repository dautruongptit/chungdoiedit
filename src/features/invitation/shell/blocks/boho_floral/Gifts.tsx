function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}
import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");
  const d = (ctx.d || {}) as any;

  const giftBoxTitle = toStr(d.giftBox, "Hộp Quà\u00A0Mừng");
  const thankYouNote = toStr(
    d.thankYouNote,
    "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!"
  );
  const tapToOpen = toStr(d.tapToOpen, "Nhấn để mở");

  const groomBankName = toStr(d.groomBankName, "Vietcombank");
  const groomAccount = toStr(d.groomAccountNumber, "123456789");
  const groomHolder = toStr(d.groomAccountName, "TRAN MINH QUAN");
  const groomQr =
    toStr(d.groomBankQr) ||
    "/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M";

  const brideBankName = toStr(d.brideBankName, "BIDV");
  const brideAccount = toStr(d.brideAccountNumber, "987654321");
  const brideHolder = toStr(d.brideAccountName, "NGUYEN THU HA");
  const brideQr =
    toStr(d.brideBankQr) ||
    "/api/qr-png?d=00020101021238540010A00000072701240006970418011066655588880208QRIBFTTA53037045802VN6304086E&ec=M";

  return (
    <div
      className="flex flex-col items-center justify-center py-8 relative z-10 pt-8 md:pt-12 pb-10 md:pb-14"
      data-landing-screenshot-id="invite-gift"
    >
      <h2
        className="mb-4 uppercase font-bold flex flex-col items-center"
        style={{
          color: theme.primaryColor,
          fontFamily: '"Times New Roman", ChungDoiIndic, serif',
          fontSize: "24px",
          fontWeight: 700,
          letterSpacing: "1px",
        }}
      >
        <span dir="auto">{giftBoxTitle}</span>
      </h2>

      <button
        type="button"
        aria-label="Mở hộp mừng cưới"
        onClick={() => setIsOpen(true)}
        className="group relative cursor-pointer outline-none border-none bg-transparent "
        style={{ width: "260px", height: "280px" }}
      >
        <div className="relative w-full h-full flex items-end justify-center pb-[26px]">
          <span
            className="igb-sparkle-2 absolute pointer-events-none z-20"
            style={{
              top: "18%",
              right: "10%",
              color: theme.sparkleColor,
              fontSize: "16px",
            }}
          >
            ✦
          </span>
          <span
            className="igb-sparkle-3 absolute pointer-events-none z-20"
            style={{
              top: "32%",
              left: "5%",
              color: theme.sparkleColor,
              fontSize: "14px",
            }}
          >
            ✦
          </span>
          <span
            className="igb-sparkle-4 absolute pointer-events-none z-20"
            style={{
              top: "26%",
              right: "5%",
              color: theme.sparkleColor,
              fontSize: "14px",
            }}
          >
            ✦
          </span>

          <div
            className="absolute pointer-events-none z-0"
            style={{ bottom: "187px", left: "50%" }}
          >
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
                backgroundColor: theme.confettiC2,
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
                backgroundColor: theme.confettiC7,
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

          <div
            className="igb-bob relative"
            style={{ width: "200px", height: "220px" }}
          >
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
              loading="lazy"
              decoding="async"
              className="igb-decor igb-decor-1 absolute pointer-events-none"
              src={theme.miniDecor[0]}
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
              loading="lazy"
              decoding="async"
              className="igb-decor igb-decor-2 absolute pointer-events-none"
              src={theme.miniDecor[1]}
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
              loading="lazy"
              decoding="async"
              className="igb-decor igb-decor-3 absolute pointer-events-none"
              src={theme.miniDecor[2]}
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
              loading="lazy"
              decoding="async"
              className="igb-decor igb-decor-4 absolute pointer-events-none"
              src={theme.miniDecor[3]}
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
              loading="lazy"
              decoding="async"
              className="igb-box absolute pointer-events-none"
              src={theme.boxImage}
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
              loading="lazy"
              decoding="async"
              className="igb-decor igb-decor-5 absolute pointer-events-none"
              src={theme.miniDecor[4]}
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
              loading="lazy"
              decoding="async"
              className="igb-decor igb-decor-6 absolute pointer-events-none"
              src={theme.miniDecor[5]}
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
              loading="lazy"
              decoding="async"
              className="igb-decor igb-decor-7 absolute pointer-events-none"
              src={theme.miniDecor[6]}
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
          style={{ color: theme.primaryColor }}
        >
          <span dir="auto">{tapToOpen}</span>
        </p>
      </button>

      {/* Modal QR Code */}
      <dialog
        className={`modal modal-bottom sm:modal-middle ${
          isOpen ? "modal-open" : ""
        }`}
      >
        <div
          className="modal-box max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: theme.modalPaperBg }}
        >
          <div
            className="relative px-6 pt-6 pb-4 text-center"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-white/80 hover:text-white hover:bg-white/20"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2
              className="font-bold text-[20px] md:text-[24px] uppercase tracking-wide "
              style={{
                textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px",
                fontFamily:
                  'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                color: "white",
              }}
            >
              Hộp Quà Mừng
            </h2>
            <p
              className="mt-2 text-xs md:text-sm whitespace-pre-line text-white/80"
              style={{
                fontFamily:
                  'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              {thankYouNote}
            </p>
          </div>

          <div
            className="flex border-b"
            style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("groom")}
              className={`flex-1 py-3 text-center text-sm md:text-base font-semibold transition-colors ${
                activeTab === "groom" ? "border-b-2" : "text-gray-500"
              }`}
              style={{
                borderColor:
                  activeTab === "groom" ? theme.primaryColor : "transparent",
                color: activeTab === "groom" ? theme.primaryColor : undefined,
                fontFamily:
                  'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              Mừng Chú Rể
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bride")}
              className={`flex-1 py-3 text-center text-sm md:text-base font-semibold transition-colors ${
                activeTab === "bride" ? "border-b-2" : "text-gray-500"
              }`}
              style={{
                borderColor:
                  activeTab === "bride" ? theme.primaryColor : "transparent",
                color: activeTab === "bride" ? theme.primaryColor : undefined,
                fontFamily:
                  'Baskerville, "Times New Roman", ChungDoiIndic, serif',
              }}
            >
              Mừng Cô Dâu
            </button>
          </div>

          <div className="p-6">
            {activeTab === "groom" ? (
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white p-2 rounded-xl shadow-inner border border-black/5 flex items-center justify-center">
                  <img
                    src={groomQr}
                    alt="QR mừng cưới Chú Rể"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div
                  className="mt-4 text-center space-y-1"
                  style={{
                    fontFamily:
                      'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Ngân hàng
                  </p>
                  <p
                    className="font-bold text-base"
                    style={{ color: theme.primaryColor }}
                  >
                    {groomBankName}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">
                    Số tài khoản
                  </p>
                  <p
                    className="font-bold text-lg tracking-widest"
                    style={{ color: theme.primaryColor }}
                  >
                    {groomAccount}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">
                    Chủ tài khoản
                  </p>
                  <p
                    className="font-bold text-base"
                    style={{ color: theme.primaryColor }}
                  >
                    {groomHolder}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white p-2 rounded-xl shadow-inner border border-black/5 flex items-center justify-center">
                  <img
                    src={brideQr}
                    alt="QR mừng cưới Cô Dâu"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div
                  className="mt-4 text-center space-y-1"
                  style={{
                    fontFamily:
                      'Baskerville, "Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Ngân hàng
                  </p>
                  <p
                    className="font-bold text-base"
                    style={{ color: theme.primaryColor }}
                  >
                    {brideBankName}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">
                    Số tài khoản
                  </p>
                  <p
                    className="font-bold text-lg tracking-widest"
                    style={{ color: theme.primaryColor }}
                  >
                    {brideAccount}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">
                    Chủ tài khoản
                  </p>
                  <p
                    className="font-bold text-base"
                    style={{ color: theme.primaryColor }}
                  >
                    {brideHolder}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={() => setIsOpen(false)}>
            close
          </button>
        </form>
      </dialog>
    </div>
  );
}
