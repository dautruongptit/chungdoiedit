import React from "react";
import { getGiftboxConfig } from "@/features/invitation/config/giftboxConfigs";
import type { CoverProps, CoverConfig } from "./types";
import { AmbientParticles } from "./AmbientParticles";
import { OpenTransitionBurst, OpenTransitionBurstCenter, useEnvelopeOpen } from "./OpenTransition";
import { groomShown, brideShown } from "@/utils/format";
import { parseDate } from "@/utils/date";

export interface BaseCoverCardProps extends CoverProps {
  config: CoverConfig;
  cardExtra?: React.ReactNode;
}

export function BaseCoverCard({ d, onOpen, config, cardExtra }: BaseCoverCardProps) {
  const gName = groomShown(d);
  const bName = brideShown(d);
  const dt = parseDate(d.date);
  const dateText = `${dt.getDate()} tháng ${dt.getMonth() + 1}, ${dt.getFullYear()}`;

  const { isOpening, showBurst, triggerOpen } = useEnvelopeOpen(onOpen, config.openFx === "dragon-fly" ? 780 : 500);
  // Trang gốc: hoa trang trí "bay về phía trước" chỉ khi hộp quà là hộp 3D (phong bì thì không)
  const flyDecor = getGiftboxConfig(d.templateId).giftboxType === "3d-box";

  // Seal radial gradient
  const sealBg = config.sealBg || (config.sealType === "xi"
    ? "radial-gradient(circle at 30% 30%, #e9ce9e, rgb(203, 176, 128))"
    : `radial-gradient(circle at 30% 30%, ${config.accentColor}, rgba(${config.rgb}, 0.85))`);

  const sealColor = config.sealColor || (config.sealType === "xi" ? "#4a0808" : "#ffffff");
  const textColor = config.textColor || config.accentColor;

  // Outer background style
  const bgStyle: React.CSSProperties = {
    background: config.bg,
  };

  return (
    <div
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={bgStyle}
    >
      {/* Ambient Floating/Falling Particles */}
      <AmbientParticles type={config.particleType} color={`rgba(${config.rgb}, 0.5)`} count={12} />

      {/* Burst Particles and Ripple Rings during open transition */}
      {showBurst && config.openFx === "center-hearts" && <OpenTransitionBurstCenter />}
      {showBurst && config.openFx !== "center-hearts" && (
        <OpenTransitionBurst type={config.particleType} baseColor={config.accentColor} sealPosition={{ top: config.sealTop !== undefined ? config.sealTop : 50 }} />
      )}

      {/* Main Card Container */}
      <div
        className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]"
        style={{
          zIndex: 10,
          /* translateY(-26px) removed: was compensating for 14px root font-size */
          animation: showBurst ? "0.8s ease-in 0s 1 normal forwards running envelope-away" : undefined,
        }}
      >
        {/* Vòng sóng quanh dấu sáp, chạy ngay khi bấm (chỉ mẫu có openFx) */}
        {config.openFx === "center-hearts" && isOpening && (
          <div
            className="absolute left-1/2 rounded-full pointer-events-none"
            style={{
              top: config.sealTop !== undefined ? config.sealTop : 50,
              width: 56,
              height: 56,
              transform: "translate(-50%, -50%)",
              border: `3px solid ${config.accentColor}`,
              zIndex: 29,
              animation: "0.6s ease-out 0s 1 normal forwards running seal-ring",
            }}
          />
        )}

        {/* Vòng sóng ngay lúc bấm (trang gốc: 56px, viền 3px, 0.6s) */}
        {isOpening && config.sealType !== "none" && (
          <div
            aria-hidden="true"
            className="absolute left-1/2 rounded-full pointer-events-none"
            style={{
              top: config.sealTop !== undefined ? config.sealTop : 50,
              width: 56,
              height: 56,
              transform: "translate(-50%, -50%)",
              border: `3px solid ${config.accentColor}`,
              zIndex: 29,
              animation: "0.6s ease-out 0s 1 normal forwards running seal-ring",
            }}
          />
        )}

        {/* Seal Button on top */}
        {config.sealType !== "none" && (
          <div
            onClick={triggerOpen}
            aria-busy={isOpening ? "true" : undefined}
            title="Bấm để mở thiệp"
            className="wax-seal absolute left-1/2 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              top: config.sealTop !== undefined ? config.sealTop : 50,
              width: config.sealSize ?? 56,
              height: config.sealSize ?? 56,
              transform: "translate(-50%, -50%)",
              background: config.sealImg ? "transparent" : sealBg,
              ["--shadow-color" as any]: `rgba(${config.rgb}, 0.5)`,
              boxShadow: config.sealImg ? "none" : `0 4px 20px rgba(${config.rgb}, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)`,
              zIndex: 30,
              animation: isOpening
                ? "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards running seal-break"
                : "seal-pulse 2s ease-in-out infinite",
            }}
          >
            {config.sealImg ? (
              <img src={config.sealImg} alt="" className="w-[52px] h-[52px] object-contain" style={{ transformOrigin: "center", animation: isOpening ? "0.36s ease-out 0s 1 normal forwards running seal-flower-bloom" : undefined }} />
            ) : config.sealType === "xi" ? (
              <span
                className="text-[26px] leading-none"
                style={{
                  color: sealColor,
                  fontFamily: "serif",
                  transformOrigin: "center center",
                  
                }}
                aria-hidden="true"
              >
                囍
              </span>
            ) : (
              <svg
                style={{
                  fill: sealColor,
                  transformOrigin: "center center",
                  
                }}
                viewBox="0 0 24 24"
                className="w-7 h-7"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </div>
        )}

        {/* Paper Card Frame */}
        <div
          className="relative rounded-lg"
          style={{
            boxShadow: `0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(${config.rgb}, 0.15)`,
          }}
        >
          {/* Card Inner Background with Corner Ornaments */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: config.cardBg || "rgba(255, 255, 255, 0.97)",
              border: `1px solid ${config.cardBorder || `rgba(${config.rgb}, 0.15)`}`,
              clipPath: "inset(0 round 8px)",
            }}
          >
            {config.imgs.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt=""
                aria-hidden="true"
                className={img.className}
                style={{
                  ...img.style,
                  ...(isOpening && flyDecor ? {
                    ["--fly-scale-x" as any]: i === 0 ? 1 : -1,
                    animation: "1.2s ease-in 0s 1 normal forwards running dragon-fly-forward",
                  } : {}),
                }}
              />
            ))}
          </div>

          {/* Rồng phượng bay về phía trước khi mở thiệp: vẽ ngoài khung cắt như trang gốc (ảnh trong thẻ vẫn giữ nguyên bên dưới) */}
          {isOpening && (config.flyCorners ?? config.openFx === "dragon-fly") && config.imgs.map((img, i) => (
            <div key={"fly" + i} className={img.className}>
              <img
                alt=""
                aria-hidden="true"
                src={img.src}
                className="pointer-events-none block h-auto max-h-full w-full object-contain"
                style={{ ["--fly-scale-x" as any]: 1, animation: "1.2s ease-in 0s 1 normal forwards running dragon-fly-forward" }}
              />
            </div>
          ))}

          {/* Optional Extra Elements (e.g. background scenes, tiles) */}
          {cardExtra}

          {/* Card Content */}
          <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
            <h1
              className={`mb-2 flex flex-col items-center text-[30px] leading-[37.5px] font-normal ${config.nameFromSm ? "sm:text-[36px] sm:leading-[45px]" : "md:text-[36px] md:leading-[45px]"}`}
              style={{ color: textColor, fontFamily: config.nameFont, fontWeight: 400 }}
            >
              <span className="block w-full text-center font-normal">{gName}</span>
              <span
                style={{ fontFamily: config.ampFont || '"Baskerville", "Times New Roman", serif' }}
                className={`block w-full text-center text-[18px] leading-[18px] ${config.nameFromSm ? "sm:text-[20px] sm:leading-[20px]" : "md:text-[20px] md:leading-[20px]"}`}
              >
                &amp;
              </span>
              <span className="block w-full text-center font-normal">{bName}</span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-10 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${textColor})` }}
              />
              <span className="text-[14px] leading-[20px]" style={{ color: textColor, opacity: 0.7 }}>
                ❦
              </span>
              <div
                className="w-10 h-px"
                style={{ background: `linear-gradient(to left, transparent, ${textColor})` }}
              />
            </div>

            {/* Date */}
            <div
              className="text-[18px] leading-[27px] mb-5 flex flex-col items-center"
              style={{ color: config.dateColor || textColor, opacity: config.dateColor ? 1 : 0.85, fontFamily: '"Lora", "Times New Roman", serif' }}
            >
              <span className="inline-block">{dateText}</span>
            </div>

            {/* Guest Block */}
            <div className="mb-6 max-w-[300px] md:max-w-[380px] lg:max-w-[440px] mx-auto">
              <p
                className="text-[18px] leading-[27px] font-light mb-2"
                style={{ color: config.guestColor || "rgba(124, 106, 96, 0.72)", fontFamily: '"Lora", "Times New Roman", serif' }}
              >
                <span dir="auto">{d.envelopeGuest || "Thân Mời"}</span>
              </p>
              {d.envelopeInviteMessage && (
                <p
                  className="text-[15px] italic mt-1 inline-block"
                  style={{ color: textColor, opacity: 0.75, fontFamily: '"Lora", "Times New Roman", serif' }}
                >
                  {d.envelopeInviteMessage}
                </p>
              )}
            </div>

            {/* Open Envelope Button */}
            <a
              href="?open=1"
              onClick={(e) => {
                e.preventDefault();
                triggerOpen();
              }}
              rel="nofollow"
              aria-busy={isOpening ? "true" : "false"}
              style={{
                backgroundColor: config.btnBg || "#7c6a60",
                color: config.btnTextColor || "#ffffff",
                boxShadow: `0 4px 14px rgba(${config.rgb}, 0.35)`,
                fontFamily: '"Lora", "Times New Roman", serif',
                WebkitTouchCallout: "none",
                userSelect: "none",
              }}
              className="relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg no-underline cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden"
            >
              <span dir="auto">Mở thiệp</span>
              <div
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  animation: "shine 3s ease-in-out infinite",
                }}
                className="absolute top-0 h-full w-8 pointer-events-none"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
