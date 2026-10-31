import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Gifts({ ctx }: { ctx: InvitationCtx }) {
  const [isOpen, setIsOpen] = useState(false);
  const { d, t } = ctx;
  const anyD = d as any;

  const ink = t.ink || "rgb(210, 95, 101)";
  const muted = t.muted || "rgb(181, 75, 81)";
  const fontFam = t.fontFamily || "Baskerville, \"Times New Roman\", ChungDoiIndic, serif";

  const brideName = anyD.brideFull || "Phạm Thị Ngọc Hân";
  const groomName = anyD.groomFull || "THIEP CUOI DEMO";

  const bankAccounts: Array<{
    role: string;
    bank: string;
    accountNumber: string;
    accountHolder: string;
    qrUrl: string;
  }> = (anyD.bankAccounts && anyD.bankAccounts.length > 0)
    ? anyD.bankAccounts
    : [
        {
          role: "Cô Dâu - " + brideName,
          bank: "BIDV",
          accountNumber: "8084856145",
          accountHolder: brideName,
          qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970418011080848561450208QRIBFTTA53037045802VN63044CBC&ec=M",
        },
        {
          role: "Chú Rể - " + groomName,
          bank: "Vietcombank",
          accountNumber: "0000000000",
          accountHolder: groomName,
          qrUrl: "/api/qr-png?d=00020101021238540010A00000072701240006970436011000000000000208QRIBFTTA53037045802VN63048C2A&ec=M",
        },
      ];

  const envelopeImg = "/images/envelope/spring_garden_red.webp";

  return (
    <div
      className="flex flex-col items-center justify-center py-8 relative px-6 md:px-10 pb-10 md:pb-14"
      style={{ backgroundColor: "transparent" }}
    >
      <style>{`
        @keyframes ienvFloat{0%,100%{translate:0 0}50%{translate:0 -7px}}
        @keyframes ienvFloatMain{0%,100%{translate:-15% 0}50%{translate:-15% -7px}}
        @keyframes ienvShadowPulse{0%,100%{transform:scalex(1);opacity:.28}50%{transform:scalex(.9);opacity:.16}}
        @keyframes ienvSparkleAnim{0%,100%{opacity:0;transform:scale(.4)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes ienvHintPulse{0%,100%{opacity:.45}50%{opacity:1}}
        @keyframes ienvGrow{from{transform:scale(1)}to{transform:scale(1.12)}}
        @keyframes ienvWave{0%{transform:scale(1.12)rotate(0deg)}20%{transform:scale(1.12)rotate(-6deg)}40%{transform:scale(1.12)rotate(4.5deg)}60%{transform:scale(1.12)rotate(-3deg)}80%{transform:scale(1.12)rotate(1.5deg)}100%{transform:scale(1.12)rotate(0deg)}}
        @keyframes ienvBackWave{0%,100%{rotate:0deg}20%{rotate:-1deg}40%{rotate:2deg}60%{rotate:-2.5deg}80%{rotate:1.5deg}}

        .ienv-shadow{animation:ienvShadowPulse 3s ease-in-out infinite}
        .ienv-card{transition:transform .35s ease;transform-origin:50% 92%;animation:ienvFloatMain 3s ease-in-out infinite}
        .ienv-back{transition:rotate .3s ease;animation:ienvFloat 5.2s ease-in-out .5s infinite}
        .ienv-hint{animation:ienvHintPulse 2s ease-in-out infinite}
        .ienv-sparkle{animation:ienvSparkleAnim 2s ease-in-out infinite}
        .ienv-sparkle-2{animation:ienvSparkleAnim 2s ease-in-out .6s infinite}
        .ienv-sparkle-3{animation:ienvSparkleAnim 2s ease-in-out 1.2s infinite}
        .ienv-sparkle-4{animation:ienvSparkleAnim 2s ease-in-out 1.7s infinite}
      `}</style>
      <h2
        className="mb-4 uppercase font-normal text-[20px] md:text-[26px] flex flex-col items-center"
        style={{
          color: muted,
          fontFamily: fontFam,
          letterSpacing: "0.05em",
        }}
      >
        <span>Hộp Quà&nbsp;Mừng</span>
      </h2>

      {/* Nút phong bì tương tác */}
      <button
        type="button"
        aria-label="Mở hộp mừng cưới"
        onClick={() => setIsOpen(true)}
        className="group relative cursor-pointer outline-none border-none bg-transparent"
        style={{ width: "250px", height: "357px" }}
      >
        <div className="relative w-full h-full flex items-end justify-center pb-[48px]">
          <span
            className="ienv-sparkle absolute pointer-events-none z-20"
            style={{ top: "6%", left: "12%", color: muted, fontSize: "20.9px" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle-2 absolute pointer-events-none z-20"
            style={{ top: "14%", right: "8%", color: muted, fontSize: "15.2px" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle-3 absolute pointer-events-none z-20"
            style={{ top: "34%", left: "3%", color: muted, fontSize: "13.3px" }}
          >
            ✦
          </span>
          <span
            className="ienv-sparkle-4 absolute pointer-events-none z-20"
            style={{ top: "24%", right: "3%", color: muted, fontSize: "13.3px" }}
          >
            ✦
          </span>

          <div className="relative" style={{ width: "190px", height: "275px" }}>
            <div
              className="ienv-shadow absolute pointer-events-none"
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
              className="ienv-back absolute inset-0 pointer-events-none"
              src={envelopeImg}
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
              className="ienv-card absolute inset-0 pointer-events-none"
              src={envelopeImg}
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
          className="ienv-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium"
          style={{ color: muted }}
        >
          <span>Nhấn để mở</span>
        </p>
      </button>

      {/* Modal hiển thị tài khoản ngân hàng */}
      <dialog className={`modal modal-bottom sm:modal-middle ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "#ffffff" }}>
          <div className="relative px-6 pt-6 pb-4 text-center" style={{ backgroundColor: ink }}>
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
              className="uppercase font-normal text-[20px] md:text-[26px]"
              style={{
                textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px",
                fontFamily: fontFam,
                letterSpacing: "0.05em",
                color: "white",
              }}
            >
              Hộp Quà Mừng
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center" style={{ color: muted }}>
              {bankAccounts.map((account, idx: number) => (
                <div key={idx} className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none">
                  <h3
                    className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2"
                    style={{ color: ink }}
                  >
                    {account.role || `Tài khoản ${idx + 1}`}
                  </h3>
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center"
                    style={{ border: `2px solid color-mix(in srgb, ${ink} 12.5%, transparent 87.5%)` }}
                  >
                    <img
                      alt={`QR - ${account.role || account.accountHolder}`}
                      className="w-full h-full object-contain"
                      src={account.qrUrl}
                    />
                  </div>
                  <div className="mt-2 text-center space-y-0.5">
                    <p className="text-[10px]" style={{ color: muted }}>
                      {account.bank}
                    </p>
                    <p className="text-[10px] font-mono" style={{ color: muted }}>
                      {account.accountNumber}
                    </p>
                    <p className="text-[10px] font-semibold" style={{ color: muted }}>
                      {account.accountHolder}
                    </p>
                  </div>
                  <a
                    href={account.qrUrl}
                    download="qr-code.png"
                    className="mt-1.5 text-[10px] px-2 py-1 inline-flex items-center gap-1 font-medium rounded-full transition-colors"
                    style={{
                      color: ink,
                      backgroundColor: `color-mix(in srgb, ${ink} 8.2%, transparent 91.8%)`,
                    }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Lưu QR
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsOpen(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
}
