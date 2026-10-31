import React from "react";
import { getGiftboxConfig } from "@/features/invitation/config/giftboxConfigs";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

/** "left: 1px; top: 2px" -> { left: "1px", top: "2px" } (cấu hình ảnh nhỏ của hộp quà lưu dạng chuỗi CSS) */
const cssObj = (s: string): React.CSSProperties => {
  const o: Record<string, string> = {};
  for (const part of s.split(";")) {
    const i = part.indexOf(":");
    if (i < 0) continue;
    const k = part.slice(0, i).trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (k) o[k] = part.slice(i + 1).trim();
  }
  return o as React.CSSProperties;
};

const ENVELOPE_CSS = `@keyframes rv-ienvFloat { 0%, 100% { translate: 0px; } 50% { translate: 0px -7px; } }
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
    .ienv-sparkle-4.jsx-1370451c15a89ae2 { animation: 2s ease-in-out 1.7s infinite normal none running rv-ienvSparkleAnim; }`;

/**
 * Các kiểu hiển thị quà còn lại mà mẫu không dùng mặc định. Người dùng chọn kiểu ở thẻ "Hộp Quà Mừng" của editor
 * (`d.giftDisplayMode`); khối của từng mẫu giữ nguyên markup đã đo cho kiểu mặc định và gọi widget này cho các kiểu khác.
 */
export function AltGiftWidget({ ctx, mode }: { ctx: InvitationCtx; mode: string | undefined }) {
  const { d, t, setGiftModalOpen, giftTitle, saveQr, copyToClipboard, copiedBank } = ctx;
  const ink = t.ink;
  const sub = (t.sub as string | undefined) ?? t.ink;

  if (mode === "qr_inline") {
    return (
      <div className="flex w-full flex-row flex-wrap items-start justify-center gap-6 px-4" style={{ color: ink }}>
        {d.gifts.map((g) => (
          <div key={g.id} className="flex flex-col items-center" style={{ maxWidth: 220 }}>
            <h3 className="mb-2 text-xs min-h-[2rem] flex items-start justify-center font-medium text-center line-clamp-2" style={{ color: ink }}>{giftTitle(g)} - {g.accountName}</h3>
            {g.qrUrl && !g.hideQr && (
              <div className="w-40 h-40 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center">
                <img alt={`QR - ${giftTitle(g)} - ${g.accountName}`} className="w-full h-full object-contain" src={g.qrUrl} />
              </div>
            )}
            <div className="mt-3 text-center space-y-0.5">
              <p className="text-xs">{g.bankName}</p>
              <p className="text-xs font-mono">{g.accountNumber}</p>
              <p className="text-xs font-semibold">{g.accountName}</p>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <button type="button" className="text-xs px-3 py-1.5 inline-flex items-center gap-1 font-medium rounded-full transition-colors" style={{ color: ink, backgroundColor: `color-mix(in srgb, ${ink} 12%, transparent)` }} onClick={() => copyToClipboard(g.accountNumber, g.id)}>
                {copiedBank === g.id ? "✓ Đã sao chép" : "Sao chép STK"}
              </button>
              {g.qrUrl && (
                <button type="button" className="text-xs px-3 py-1.5 inline-flex items-center gap-1 font-medium rounded-full transition-colors" style={{ color: ink, backgroundColor: `color-mix(in srgb, ${ink} 12%, transparent)` }} onClick={() => saveQr(g)}>Lưu QR</button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (mode === "envelope") {
    const envSrc = `/images/envelope/${d.templateId}.webp`;
    const fallbackEnv = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/envelope/minimalism_darkred.webp"; };
    return (
      <>
        <style>{ENVELOPE_CSS}</style>
        <button type="button" aria-label="Mở hộp mừng cưới" onClick={() => setGiftModalOpen(true)} className="jsx-1370451c15a89ae2 group relative cursor-pointer outline-none border-none bg-transparent " style={{ width: "250px", height: "357px" }}><div className="jsx-1370451c15a89ae2 relative w-full h-full flex items-end justify-center pb-[48px]"><span className="jsx-1370451c15a89ae2 ienv-sparkle absolute pointer-events-none z-20" style={{ top: "6%", left: "12%", color: ink, fontSize: "20.9px" }}>✦</span><span className="jsx-1370451c15a89ae2 ienv-sparkle-2 absolute pointer-events-none z-20" style={{ top: "14%", right: "8%", color: ink, fontSize: "15.2px" }}>✦</span><span className="jsx-1370451c15a89ae2 ienv-sparkle-3 absolute pointer-events-none z-20" style={{ top: "34%", left: "3%", color: ink, fontSize: "13.3px" }}>✦</span><span className="jsx-1370451c15a89ae2 ienv-sparkle-4 absolute pointer-events-none z-20" style={{ top: "24%", right: "3%", color: ink, fontSize: "13.3px" }}>✦</span><div className="jsx-1370451c15a89ae2 relative" style={{ width: "190px", height: "275px" }}><div className="jsx-1370451c15a89ae2 ienv-shadow absolute pointer-events-none" style={{ left: "50%", bottom: "-6px", width: "125.4px", height: "11px", marginLeft: "-62.7px", borderRadius: "50%", backgroundColor: "rgba(0, 0, 0, 0.45)", filter: "blur(4px)", zIndex: "0", willChange: "transform, opacity" }}></div><img alt="" className="jsx-1370451c15a89ae2 ienv-back absolute inset-0 pointer-events-none" loading="lazy" decoding="async" src={envSrc} onError={fallbackEnv} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", transformOrigin: "50% 100%", transform: "translateX(20%) translateY(-10%) scale(-0.8, 0.8) rotate(-15deg)", zIndex: "1", filter: "drop-shadow(rgba(0, 0, 0, 0.18) 0px 8px 14px)", willChange: "transform" }} /><img alt="" className="jsx-1370451c15a89ae2 ienv-card absolute inset-0 pointer-events-none" loading="lazy" decoding="async" src={envSrc} onError={fallbackEnv} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", rotate: "-10deg", zIndex: "2", filter: "drop-shadow(rgba(0, 0, 0, 0.22) 0px 10px 18px)", willChange: "transform" }} /></div></div><p className="jsx-1370451c15a89ae2 ienv-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium" style={{ color: ink }}><span>Nhấn để mở</span></p></button>
      </>
    );
  }

  // "gift_box": hộp quà 3D; mẫu mặc định phong bì có thể thiếu ảnh hộp -> dùng ảnh hộp của chính mẫu hoặc ảnh dự phòng
  const cfg = getGiftboxConfig(d.templateId);
  const minis = cfg.miniImgs && cfg.miniImgs.length ? cfg.miniImgs : (getGiftboxConfig("minimalism_brown").miniImgs ?? []);
  const mainBox = cfg.mainBoxSrc || `/images/giftbox/${d.templateId}.webp`;
  return (
    <button type="button" aria-label="Mở hộp mừng cưới" onClick={() => setGiftModalOpen(true)} className="jsx-dd7f1ef62680a11c group relative cursor-pointer outline-none border-none bg-transparent " style={{"width":"260px","height":"280px"}}><div className="jsx-dd7f1ef62680a11c relative w-full h-full flex items-end justify-center pb-[26px]"><span className="jsx-dd7f1ef62680a11c igb-sparkle absolute pointer-events-none z-20" style={{"top":"8%","left":"14%","color":sub,"fontSize":"22px"}}>✦</span><span className="jsx-dd7f1ef62680a11c igb-sparkle-2 absolute pointer-events-none z-20" style={{"top":"18%","right":"10%","color":sub,"fontSize":"16px"}}>✦</span><span className="jsx-dd7f1ef62680a11c igb-sparkle-3 absolute pointer-events-none z-20" style={{"top":"32%","left":"5%","color":sub,"fontSize":"14px"}}>✦</span><span className="jsx-dd7f1ef62680a11c igb-sparkle-4 absolute pointer-events-none z-20" style={{"top":"26%","right":"5%","color":sub,"fontSize":"14px"}}>✦</span><div className="jsx-dd7f1ef62680a11c absolute pointer-events-none z-0" style={{"bottom":"187px","left":"50%"}}><div className="igb-confetti igb-c1" style={{"position":"absolute","left":"50%","top":"0px","opacity":"0","marginLeft":"-5.5px","marginTop":"-2.75px","pointerEvents":"none","willChange":"transform, opacity","width":"11px","height":"5.5px","backgroundColor":"rgb(236, 72, 153)","borderRadius":"2px"}}></div><div className="igb-confetti igb-c2" style={{"position":"absolute","left":"50%","top":"0px","opacity":"0","marginLeft":"-5px","marginTop":"-5px","pointerEvents":"none","willChange":"transform, opacity","width":"10px","height":"10px","backgroundColor":sub,"borderRadius":"50%"}}></div><div className="igb-confetti igb-c3" style={{"position":"absolute","left":"50%","top":"0px","opacity":"0","marginLeft":"-5.5px","marginTop":"-2.75px","pointerEvents":"none","willChange":"transform, opacity","width":"11px","height":"5.5px","backgroundColor":"rgb(34, 197, 94)","borderRadius":"2px"}}></div><div className="igb-confetti igb-c4" style={{"position":"absolute","left":"50%","top":"0px","opacity":"0","marginLeft":"-4.5px","marginTop":"-4.5px","pointerEvents":"none","willChange":"transform, opacity","width":"9px","height":"9px","backgroundColor":"rgb(59, 130, 246)","borderRadius":"50%"}}></div><div className="igb-confetti igb-c5" style={{"position":"absolute","left":"50%","top":"0px","opacity":"0","marginLeft":"-6px","marginTop":"-3px","pointerEvents":"none","willChange":"transform, opacity","width":"12px","height":"6px","backgroundColor":"rgb(168, 85, 247)","borderRadius":"2px"}}></div><div className="igb-confetti igb-c6" style={{"position":"absolute","left":"50%","top":"0px","opacity":"0","marginLeft":"-5px","marginTop":"-5px","pointerEvents":"none","willChange":"transform, opacity","width":"0px","height":"0px","borderLeft":"5px solid transparent","borderRight":"5px solid transparent","borderBottom":"10px solid rgb(250, 204, 21)"}}></div><div className="igb-confetti igb-c7" style={{"position":"absolute","left":"50%","top":"0px","opacity":"0","marginLeft":"-5px","marginTop":"-2.5px","pointerEvents":"none","willChange":"transform, opacity","width":"10px","height":"5px","backgroundColor":ink,"borderRadius":"2px"}}></div><div className="igb-confetti igb-c8" style={{"position":"absolute","left":"50%","top":"0px","opacity":"0","marginLeft":"-4.5px","marginTop":"-4.5px","pointerEvents":"none","willChange":"transform, opacity","width":"9px","height":"9px","backgroundColor":"rgb(249, 115, 22)","borderRadius":"50%"}}></div></div><div className="jsx-dd7f1ef62680a11c igb-bob relative" style={{"width":"200px","height":"220px"}}><div className="jsx-dd7f1ef62680a11c igb-shadow absolute pointer-events-none" style={{"left":"50%","bottom":"-8px","width":"144px","height":"12px","marginLeft":"-72px","borderRadius":"50%","backgroundColor":"rgba(0, 0, 0, 0.45)","filter":"blur(4px)","zIndex":"0","willChange":"transform, opacity"}}></div>{minis.map((m, i) => (<img key={i} alt="" loading="lazy" decoding="async" className={m.className} src={m.src} style={cssObj(m.style)} />))}<img alt="" loading="lazy" decoding="async" className="jsx-dd7f1ef62680a11c igb-box absolute pointer-events-none" src={mainBox} onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/giftbox/minimalism_brown.webp"; }} style={{ left: "50%", bottom: "0px", width: "170px", maxHeight: "220px", objectFit: "contain", marginLeft: "-85px", zIndex: "2", filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 10px 18px)", willChange: "transform" }} /></div></div><p className="jsx-dd7f1ef62680a11c igb-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium" style={{"color":ink}}><span dir="auto">Nhấn để mở</span></p></button>
  );
}
