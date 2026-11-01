function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}
import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const theme = getSongHyTheme(ctx);
  const [isOpen, setIsOpen] = useState(false);
  const d = (ctx.d || {}) as any;

  const giftBoxTitle = toStr(d.giftBox, "Hộp Quà\u00A0Mừng");
  const thankYouNote = toStr(d.thankYouNote, theme.thankYouNote);
  const tapToOpen = toStr(d.tapToOpen, "Nhấn để mở");

  const groomBankName = toStr(d.groomBankName, "Vietcombank");
  const groomAccount = toStr(d.groomAccountNumber, "123456789");
  const groomHolder = toStr(d.groomAccountName, "Vo Hai Nam");
  const groomQr =
    toStr(d.groomBankQr) ||
    "/api/qr-png?d=00020101021238530010A0000007270123000697043601091234567890208QRIBFTTA53037045802VN63045653&ec=M";

  const brideBankName = toStr(d.brideBankName, "BIDV");
  const brideAccount = toStr(d.brideAccountNumber, "123456789");
  const brideHolder = toStr(d.brideAccountName, "Huynh Khanh Linh");
  const brideQr =
    toStr(d.brideBankQr) ||
    "/api/qr-png?d=00020101021238530010A0000007270123000697041801091234567890208QRIBFTTA53037045802VN6304D2A5&ec=M";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: theme.paperColor }}
    >
      <div
        className="flex flex-col items-center justify-center py-8 relative z-10"
        style={{ backgroundColor: "transparent" }}
      >
        <h2
          className="mb-4 font-bold text-[20px] md:text-[24px] uppercase tracking-wide flex flex-col items-center"
          style={{
            color: theme.primaryColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">{giftBoxTitle}</span>
        </h2>

        <button
          type="button"
          aria-label="Mở hộp mừng cưới"
          onClick={() => setIsOpen(true)}
          className="jsx-dd7f1ef62680a11c group relative cursor-pointer outline-none border-none bg-transparent "
          style={{ width: "260px", height: "280px" }}
        >
          <div className="jsx-dd7f1ef62680a11c relative w-full h-full flex items-end justify-center pb-[26px]">
            <span
              className="jsx-dd7f1ef62680a11c igb-sparkle absolute pointer-events-none z-20"
              style={{
                top: "8%",
                left: "14%",
                color: theme.sparkleColor,
                fontSize: "22px",
              }}
            >
              ✦
            </span>
            <span
              className="jsx-dd7f1ef62680a11c igb-sparkle-2 absolute pointer-events-none z-20"
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
              className="jsx-dd7f1ef62680a11c igb-sparkle-3 absolute pointer-events-none z-20"
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
              className="jsx-dd7f1ef62680a11c igb-sparkle-4 absolute pointer-events-none z-20"
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
              className="jsx-dd7f1ef62680a11c absolute pointer-events-none z-0"
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
              className="jsx-dd7f1ef62680a11c igb-bob relative"
              style={{ width: "200px", height: "220px" }}
            >
              <div
                className="jsx-dd7f1ef62680a11c igb-shadow absolute pointer-events-none"
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
                className="jsx-dd7f1ef62680a11c igb-box absolute pointer-events-none"
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
            className="jsx-dd7f1ef62680a11c igb-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium"
            style={{ color: "rgb(70, 70, 70)" }}
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
            </div>
            <div className="p-4 sm:p-6">
              <div
                className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center"
                style={{ color: "rgb(70, 70, 70)" }}
              >
                <div className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                  <h3
                    className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2"
                    style={{ color: theme.primaryColor }}
                  >
                    Chú Rể - {groomHolder}
                  </h3>
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center"
                    style={{
                      border: `2px solid ${
                        theme.isGreen
                          ? "rgba(31, 58, 37, 0.125)"
                          : "rgba(128, 0, 0, 0.125)"
                      }`,
                    }}
                  >
                    <img
                      alt={`QR - Chú Rể - ${groomHolder}`}
                      className="w-full h-full object-contain"
                      src={groomQr}
                    />
                  </div>
                  <div className="mt-2 text-center space-y-0.5">
                    <p
                      className="text-[10px]"
                      style={{ color: "rgb(70, 70, 70)" }}
                    >
                      {groomBankName}
                    </p>
                    <p
                      className="text-[10px] font-mono"
                      style={{ color: "rgb(70, 70, 70)" }}
                    >
                      {groomAccount}
                    </p>
                    <p
                      className="text-[10px] font-semibold"
                      style={{ color: "rgb(70, 70, 70)" }}
                    >
                      {groomHolder}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors"
                    style={{
                      color: theme.primaryColor,
                      backgroundColor: theme.isGreen
                        ? "rgba(31, 58, 37, 0.082)"
                        : "rgba(128, 0, 0, 0.082)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Lưu QR
                  </button>
                </div>

                <div className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                  <h3
                    className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2"
                    style={{ color: theme.primaryColor }}
                  >
                    Cô Dâu - {brideHolder}
                  </h3>
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center"
                    style={{
                      border: `2px solid ${
                        theme.isGreen
                          ? "rgba(31, 58, 37, 0.125)"
                          : "rgba(128, 0, 0, 0.125)"
                      }`,
                    }}
                  >
                    <img
                      alt={`QR - Cô Dâu - ${brideHolder}`}
                      className="w-full h-full object-contain"
                      src={brideQr}
                    />
                  </div>
                  <div className="mt-2 text-center space-y-0.5">
                    <p
                      className="text-[10px]"
                      style={{ color: "rgb(70, 70, 70)" }}
                    >
                      {brideBankName}
                    </p>
                    <p
                      className="text-[10px] font-mono"
                      style={{ color: "rgb(70, 70, 70)" }}
                    >
                      {brideAccount}
                    </p>
                    <p
                      className="text-[10px] font-semibold"
                      style={{ color: "rgb(70, 70, 70)" }}
                    >
                      {brideHolder}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors"
                    style={{
                      color: theme.primaryColor,
                      backgroundColor: theme.isGreen
                        ? "rgba(31, 58, 37, 0.082)"
                        : "rgba(128, 0, 0, 0.082)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Lưu QR
                  </button>
                </div>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button type="button" onClick={() => setIsOpen(false)}>
              close
            </button>
          </form>
        </dialog>
      </div>

      {/* Thank you note */}
      <div className="relative z-10 py-8 text-center max-w-4xl mx-auto px-2 sm:px-4">
        <span
          className="whitespace-pre-line flex flex-col items-center gap-1 text-xl mx-auto md:max-w-[560px]"
          style={{
            color: "rgb(102, 102, 102)",
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">{thankYouNote}</span>
        </span>
      </div>
    </div>
  );
}
