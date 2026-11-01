import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme } from "./themeVars";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);
  const d = ctx.d as any;

  const [isOpen, setIsOpen] = useState(false);

  const groomName = (d.groomFullName || "Lý Gia Bảo").toUpperCase();
  const brideName = (d.brideFullName || "Phan Ngọc Diệp").toUpperCase();

  const groomBank = d.groomBankName || (theme.variant === "darkgreen" ? "VietinBank" : "Vietcombank");
  const groomAccount = d.groomAccountNumber || (theme.variant === "darkgreen" ? "1073920584" : theme.variant === "darkblue" ? "1029384756" : "1024778391");
  const groomQr =
    d.groomQr ||
    (theme.variant === "darkgreen"
      ? "/api/qr-png?d=00020101021238540010A00000072701240006970415011010739205840208QRIBFTTA53037045802VN630433F9&ec=M"
      : theme.variant === "darkblue"
      ? "/api/qr-png?d=00020101021238540010A00000072701240006970436011010293847560208QRIBFTTA53037045802VN630400E0&ec=M"
      : "/api/qr-png?d=00020101021238540010A00000072701240006970436011010247783910208QRIBFTTA53037045802VN63044555&ec=M");

  const brideBank = d.brideBankName || (theme.variant === "darkgreen" ? "Techcombank" : theme.variant === "darkblue" ? "BIDV" : "MB Bank");
  const brideAccount = d.brideAccountNumber || (theme.variant === "darkgreen" ? "1903846271" : theme.variant === "darkblue" ? "5647382910" : "6820119034");
  const brideQr =
    d.brideQr ||
    (theme.variant === "darkgreen"
      ? "/api/qr-png?d=00020101021238540010A00000072701240006970407011019038462710208QRIBFTTA53037045802VN63042ED6&ec=M"
      : theme.variant === "darkblue"
      ? "/api/qr-png?d=00020101021238540010A00000072701240006970418011056473829100208QRIBFTTA53037045802VN63046DC3&ec=M"
      : "/api/qr-png?d=00020101021238540010A00000072701240006970422011068201190340208QRIBFTTA53037045802VN6304D262&ec=M");

  return (
    <div
      className="flex flex-col items-center justify-center py-8 relative z-10 flex w-full flex-col items-center"
      style={{ backgroundColor: "transparent" }}
    >
      <style>{`
        @keyframes rv-ienvFloat { 0%, 100% { translate: 0px; } 50% { translate: 0px -7px; } }
        @keyframes rv-ienvFloatMain { 0%, 100% { translate: -15%; } 50% { translate: -15% -7px; } }
        @keyframes rv-ienvShadowPulse { 0%, 100% { transform: scaleX(1); opacity: 0.28; } 50% { transform: scaleX(0.9); opacity: 0.16; } }
        @keyframes rv-ienvSparkleAnim { 0%, 100% { opacity: 0; transform: scale(0.4); } 50% { opacity: 1; transform: scale(1.15); } }
        @keyframes rv-ienvHintPulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
        @keyframes rv-ienvGrow { 0% { transform: scale(1); } 100% { transform: scale(1.12); } }
        @keyframes rv-ienvWave { 0% { transform: scale(1.12) rotate(0deg); } 20% { transform: scale(1.12) rotate(-6deg); } 40% { transform: scale(1.12) rotate(4.5deg); } 60% { transform: scale(1.12) rotate(-3deg); } 80% { transform: scale(1.12) rotate(1.5deg); } 100% { transform: scale(1.12) rotate(0deg); } }
        @keyframes rv-ienvBackWave { 0%, 100% { rotate: 0deg; } 20% { rotate: -1deg; } 40% { rotate: 2deg; } 60% { rotate: -2.5deg; } 80% { rotate: 1.5deg; } }
        .ienv-shadow.jsx-1370451c15a89ae2 { animation: 3s ease-in-out 0s infinite normal none running rv-ienvShadowPulse; }
        .ienv-card.jsx-1370451c15a89ae2 { transition: transform 0.35s; transform-origin: 50% 92%; animation: 3s ease-in-out 0s infinite normal none running rv-ienvFloatMain; }
        .ienv-back.jsx-1370451c15a89ae2 { transition: rotate 0.3s; animation: 5.2s ease-in-out 0.5s infinite normal none running rv-ienvFloat; }
        .group.jsx-1370451c15a89ae2:hover .ienv-card.jsx-1370451c15a89ae2, .group.jsx-1370451c15a89ae2:focus-visible .ienv-card.jsx-1370451c15a89ae2 { animation: 3s ease-in-out 0s infinite normal none running rv-ienvFloatMain, 0.35s ease 0s 1 normal forwards running rv-ienvGrow, 1.1s ease-in-out 0.35s infinite normal none running rv-ienvWave; }
        .group.jsx-1370451c15a89ae2:hover .ienv-back.jsx-1370451c15a89ae2, .group.jsx-1370451c15a89ae2:focus-visible .ienv-back.jsx-1370451c15a89ae2 { animation: 5.2s ease-in-out 0.5s infinite normal none running rv-ienvFloat, 2.2s ease-in-out 0s infinite normal none running rv-ienvBackWave; }
        .ienv-hint.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 0s infinite normal none running rv-ienvHintPulse; }
        .ienv-sparkle.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 0s infinite normal none running rv-ienvSparkleAnim; }
        .ienv-sparkle-2.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 0.6s infinite normal none running rv-ienvSparkleAnim; }
        .ienv-sparkle-3.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 1.2s infinite normal none running rv-ienvSparkleAnim; }
        .ienv-sparkle-4.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 1.7s infinite normal none running rv-ienvSparkleAnim; }
      `}</style>
      <h2
        className="mb-4 uppercase text-[20px] md:text-[24px] flex flex-col items-center"
        style={{
          color: theme.goldColor,
          fontFamily: '"Times New Roman", ChungDoiIndic, serif',
          fontWeight: 700,
        }}
      >
        <span dir="auto">{"Hộp Quà\u00A0Mừng"}</span>
      </h2>

      <button
        type="button"
        aria-label="Mở hộp mừng cưới"
        onClick={() => setIsOpen(true)}
        className="jsx-1370451c15a89ae2 group relative cursor-pointer outline-none border-none bg-transparent"
        style={{
          width: `${theme.envelopeBtnSize.w}px`,
          height: `${theme.envelopeBtnSize.h}px`,
        }}
      >
        <div className="jsx-1370451c15a89ae2 relative w-full h-full flex items-end justify-center pb-[48px]">
          <span
            className="jsx-1370451c15a89ae2 ienv-sparkle absolute pointer-events-none z-20"
            style={{
              top: "6%",
              left: "12%",
              color: theme.textColor,
              fontSize: `${theme.envelopeSparkles[0]}px`,
            }}
          >
            ✦
          </span>
          <span
            className="jsx-1370451c15a89ae2 ienv-sparkle-2 absolute pointer-events-none z-20"
            style={{
              top: "14%",
              right: "8%",
              color: theme.textColor,
              fontSize: `${theme.envelopeSparkles[1]}px`,
            }}
          >
            ✦
          </span>
          <span
            className="jsx-1370451c15a89ae2 ienv-sparkle-3 absolute pointer-events-none z-20"
            style={{
              top: "34%",
              left: "3%",
              color: theme.textColor,
              fontSize: `${theme.envelopeSparkles[2]}px`,
            }}
          >
            ✦
          </span>
          <span
            className="jsx-1370451c15a89ae2 ienv-sparkle-4 absolute pointer-events-none z-20"
            style={{
              top: "24%",
              right: "3%",
              color: theme.textColor,
              fontSize: `${theme.envelopeSparkles[3]}px`,
            }}
          >
            ✦
          </span>

          <div
            className="jsx-1370451c15a89ae2 relative"
            style={{
              width: `${theme.envelopeInnerSize.w}px`,
              height: `${theme.envelopeInnerSize.h}px`,
            }}
          >
            <div
              className="jsx-1370451c15a89ae2 ienv-shadow absolute pointer-events-none"
              style={{
                left: "50%",
                bottom: "-6px",
                width: `${theme.envelopeShadow.w}px`,
                height: "11px",
                marginLeft: `${theme.envelopeShadow.ml}px`,
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                opacity: 0.28,
                filter: "blur(4px)",
                zIndex: 0,
                willChange: "transform, opacity",
              }}
            />
            <img
              alt=""
              loading="lazy"
              decoding="async"
              className="jsx-1370451c15a89ae2 ienv-back absolute inset-0 pointer-events-none"
              src={theme.envelope}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center bottom",
                transformOrigin: "50% 100%",
                transform: "translateX(20%) translateY(-10%) scale(-0.8, 0.8) rotate(-15deg)",
                zIndex: 1,
                filter: "drop-shadow(rgba(0, 0, 0, 0.18) 0px 8px 14px)",
                willChange: "transform",
              }}
            />
            <img
              alt=""
              loading="lazy"
              decoding="async"
              className="jsx-1370451c15a89ae2 ienv-card absolute inset-0 pointer-events-none"
              src={theme.envelope}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center bottom",
                rotate: "-10deg",
                zIndex: 2,
                filter: "drop-shadow(rgba(0, 0, 0, 0.22) 0px 10px 18px)",
                willChange: "transform",
              }}
            />
          </div>
        </div>
        <p
          className="jsx-1370451c15a89ae2 ienv-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium"
          style={{ color: theme.textColor }}
        >
          <span dir="auto">Nhấn để mở</span>
        </p>
      </button>

      <dialog className={`modal modal-bottom sm:modal-middle ${isOpen ? "modal-open" : ""}`} open={isOpen}>
        <div className="modal-box max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: theme.modalBg }}>
          <div className="relative px-6 pt-6 pb-4 text-center" style={{ backgroundColor: theme.goldColor }}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-white/80 hover:text-white hover:bg-white/20"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2
              className="uppercase text-[20px] md:text-[24px]"
              style={{
                textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px",
                fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                fontWeight: 700,
                color: "white",
              }}
            >
              Hộp Quà Mừng
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center" style={{ color: theme.textColor }}>
              {/* Groom */}
              <div className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                <h3 className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2" style={{ color: theme.goldColor }}>
                  Chú Rể - {groomName}
                </h3>
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center" style={{ border: "2px solid rgba(255, 223, 175, 0.125)" }}>
                  <img alt={`QR - Chú Rể - ${groomName}`} className="w-full h-full object-contain" src={groomQr} />
                </div>
                <div className="mt-2 text-center space-y-0.5">
                  <p className="text-[10px]" style={{ color: theme.textColor }}>{groomBank}</p>
                  <p className="text-[10px] font-mono" style={{ color: theme.textColor }}>{groomAccount}</p>
                  <p className="text-[10px] font-semibold" style={{ color: theme.textColor }}>{groomName}</p>
                </div>
                <button
                  type="button"
                  className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors"
                  style={{
                    color: theme.goldColor,
                    backgroundColor: "rgba(255, 223, 175, 0.082)",
                  }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Lưu QR
                </button>
              </div>

              {/* Bride */}
              <div className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                <h3 className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2" style={{ color: theme.goldColor }}>
                  Cô Dâu - {brideName}
                </h3>
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center" style={{ border: "2px solid rgba(255, 223, 175, 0.125)" }}>
                  <img alt={`QR - Cô Dâu - ${brideName}`} className="w-full h-full object-contain" src={brideQr} />
                </div>
                <div className="mt-2 text-center space-y-0.5">
                  <p className="text-[10px]" style={{ color: theme.textColor }}>{brideBank}</p>
                  <p className="text-[10px] font-mono" style={{ color: theme.textColor }}>{brideAccount}</p>
                  <p className="text-[10px] font-semibold" style={{ color: theme.textColor }}>{brideName}</p>
                </div>
                <button
                  type="button"
                  className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors"
                  style={{
                    color: theme.goldColor,
                    backgroundColor: "rgba(255, 223, 175, 0.082)",
                  }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Lưu QR
                </button>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={() => setIsOpen(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
}
