import { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative isolate z-10 overflow-x-clip">
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
        .ienv-hint.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 0s infinite normal none running rv-ienvHintPulse; }
        .ienv-sparkle.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 0s infinite normal none running rv-ienvSparkleAnim; }
        .ienv-sparkle-2.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 0.6s infinite normal none running rv-ienvSparkleAnim; }
        .ienv-sparkle-3.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 1.2s infinite normal none running rv-ienvSparkleAnim; }
        .ienv-sparkle-4.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 1.7s infinite normal none running rv-ienvSparkleAnim; }
      `}</style>
      <div
        className="flex flex-col items-center justify-center py-8 relative z-10 flex flex-col items-center px-6 pb-6 pt-8"
        style={{ backgroundColor: "transparent" }}
      >
        <h2
          className="mb-4 uppercase text-[20px] flex flex-col items-center"
          style={{
            color: "rgb(120, 105, 160)",
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
            letterSpacing: "0.03em",
          }}
        >
          <span>Hộp Quà&nbsp;Mừng</span>
        </h2>
        <button
          type="button"
          aria-label="Mở hộp mừng cưới"
          onClick={() => setModalOpen(true)}
          className="jsx-1370451c15a89ae2 group relative cursor-pointer outline-none border-none bg-transparent "
          style={{ width: "250px", height: "357px" }}
        >
          <div className="jsx-1370451c15a89ae2 relative w-full h-full flex items-end justify-center pb-[48px]">
            <span
              className="jsx-1370451c15a89ae2 ienv-sparkle absolute pointer-events-none z-20"
              style={{ top: "6%", left: "12%", color: "rgb(181, 139, 47)", fontSize: "20.9px" }}
            >
              ✦
            </span>
            <span
              className="jsx-1370451c15a89ae2 ienv-sparkle-2 absolute pointer-events-none z-20"
              style={{ top: "14%", right: "8%", color: "rgb(181, 139, 47)", fontSize: "15.2px" }}
            >
              ✦
            </span>
            <span
              className="jsx-1370451c15a89ae2 ienv-sparkle-3 absolute pointer-events-none z-20"
              style={{ top: "34%", left: "3%", color: "rgb(181, 139, 47)", fontSize: "13.3px" }}
            >
              ✦
            </span>
            <span
              className="jsx-1370451c15a89ae2 ienv-sparkle-4 absolute pointer-events-none z-20"
              style={{ top: "24%", right: "3%", color: "rgb(181, 139, 47)", fontSize: "13.3px" }}
            >
              ✦
            </span>
            <div className="jsx-1370451c15a89ae2 relative" style={{ width: "190px", height: "275px" }}>
              <div
                className="jsx-1370451c15a89ae2 ienv-shadow absolute pointer-events-none"
                style={{
                  left: "50%",
                  bottom: "-6px",
                  width: "125.4px",
                  height: "11px",
                  marginLeft: "-62.7px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.45)",
                  filter: "blur(4px)",
                  zIndex: 0,
                  willChange: "transform, opacity",
                }}
              />
              <img
                alt=""
                className="jsx-1370451c15a89ae2 ienv-back absolute inset-0 pointer-events-none"
                src="/images/envelope/minimalism_purple.webp"
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
                className="jsx-1370451c15a89ae2 ienv-card absolute inset-0 pointer-events-none"
                src="/images/envelope/minimalism_purple.webp"
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
            style={{ color: "rgb(120, 105, 160)" }}
          >
            <span>Nhấn để mở</span>
          </p>
        </button>
        <dialog className={`modal modal-bottom sm:modal-middle${modalOpen ? " modal-open" : ""}`} open={modalOpen}>
          <div
            className="modal-box max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          >
            <div className="relative px-6 pt-6 pb-4 text-center" style={{ backgroundColor: "rgb(120, 105, 160)" }}>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-white/80 hover:text-white hover:bg-white/20"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2
                className="uppercase text-[20px]"
                style={{
                  textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px",
                  fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  color: "white",
                }}
              >
                Hộp Quà Mừng
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <div
                className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center"
                style={{ color: "rgb(120, 105, 160)" }}
              >
                <div className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                  <h3
                    className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2"
                    style={{ color: "rgb(120, 105, 160)" }}
                  >
                    Chú Rể - LY QUOC BAO
                  </h3>
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center"
                    style={{ border: "2px solid rgba(120, 105, 160, 0.125)" }}
                  >
                    <img
                      alt="QR - Chú Rể - LY QUOC BAO"
                      className="w-full h-full object-contain"
                      src="/api/qr-png?d=00020101021238540010A00000072701240006970436011010177889900208QRIBFTTA53037045802VN630426BF&ec=M"
                    />
                  </div>
                  <div className="mt-2 text-center space-y-0.5">
                    <p className="text-[10px]" style={{ color: "rgb(120, 105, 160)" }}>
                      Vietcombank
                    </p>
                    <p className="text-[10px] font-mono" style={{ color: "rgb(120, 105, 160)" }}>
                      1017788990
                    </p>
                    <p className="text-[10px] font-semibold" style={{ color: "rgb(120, 105, 160)" }}>
                      LY QUOC BAO
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors"
                    style={{ color: "rgb(120, 105, 160)", backgroundColor: "rgba(120, 105, 160, 0.082)" }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Lưu QR
                  </button>
                </div>
                <div className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                  <h3
                    className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2"
                    style={{ color: "rgb(120, 105, 160)" }}
                  >
                    Cô Dâu - DINH DIEU LINH
                  </h3>
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center"
                    style={{ border: "2px solid rgba(120, 105, 160, 0.125)" }}
                  >
                    <img
                      alt="QR - Cô Dâu - DINH DIEU LINH"
                      className="w-full h-full object-contain"
                      src="/api/qr-png?d=00020101021238540010A00000072701240006970407011019044556600208QRIBFTTA53037045802VN63049D40&ec=M"
                    />
                  </div>
                  <div className="mt-2 text-center space-y-0.5">
                    <p className="text-[10px]" style={{ color: "rgb(120, 105, 160)" }}>
                      Techcombank
                    </p>
                    <p className="text-[10px] font-mono" style={{ color: "rgb(120, 105, 160)" }}>
                      1904455660
                    </p>
                    <p className="text-[10px] font-semibold" style={{ color: "rgb(120, 105, 160)" }}>
                      DINH DIEU LINH
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors"
                    style={{ color: "rgb(120, 105, 160)", backgroundColor: "rgba(120, 105, 160, 0.082)" }}
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
          <form method="dialog" className="modal-backdrop" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
            <button type="submit">close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
