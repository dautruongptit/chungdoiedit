import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Album({ ctx }: { ctx: InvitationCtx }) {
  const { albumPhotos, t, setLightboxOpen, setActivePhotoIdx } = ctx;
  const photos = albumPhotos || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const total = photos.length;
  const isRed = (t.assets || "").includes("red");
  const isPink = (t.assets || "").includes("pink");
  const textColor = isRed ? "rgb(143, 38, 45)" : isPink ? "rgb(220, 133, 153)" : (t.ink || "rgb(70, 79, 30)");
  const accentColor = isRed ? "rgb(101, 78, 47)" : isPink ? "rgb(119, 110, 56)" : (t.accent || "rgb(188, 155, 99)");
  const cardBg = "rgb(254, 250, 240)";

  if (total === 0) return null;

  const nextPhoto = () => setCurrentIdx((prev) => (prev + 1) % total);
  const prevPhoto = () => setCurrentIdx((prev) => (prev - 1 + total) % total);

  const getSlideStyle = (index: number): React.CSSProperties => {
    let diff = (index - currentIdx + total) % total;
    if (diff > total / 2) diff -= total;

    // Standard aspect ratio for photos in this template
    const isLandscape = photos[index]?.includes("5019eadee") || photos[index]?.includes("landscape");
    const isSquare = photos[index]?.includes("2c15dc35") || photos[index]?.includes("a035de8b");
    const ar = isSquare ? "1 / 1" : isLandscape ? "1.2 / 1" : "0.666118 / 1";

    const sign = diff >= 0 ? 1 : -1;
    const absDiff = Math.abs(diff);
    const tx = sign * (absDiff * 60);
    const tz = -absDiff * 150;
    const ry = sign * (absDiff * 45);
    const scale = absDiff === 0 ? 1 : absDiff === 1 ? 0.85 : 0.7;
    const op = absDiff === 0 ? "1" : absDiff === 1 ? "0.75" : absDiff === 2 ? "0.5" : "0.3";
    const zIndex = 100 - absDiff;

    return {
      aspectRatio: ar,
      transitionDuration: "1100ms",
      transform: `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity: op,
      zIndex,
    };
  };

  return (
    <section
      className="relative isolate w-full border-y-[1.5px] "
      style={{
        backgroundColor: cardBg,
        borderColor: isPink ? accentColor : textColor,
        borderRadius: "0px",
        boxShadow: "rgba(0, 0, 0, 0.25) 4px 4px 2px",
      }}
    >
      <div className="relative z-10 flex w-full flex-col items-center px-6 py-8 md:py-10">
        <h2
          className="uppercase text-center relative z-10"
          style={{
            color: textColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          <span>Album Ảnh</span>
        </h2>

        <div className="relative z-10 mt-5 w-full max-w-[340px] md:max-w-[560px]">
          <div className="relative h-[340px] md:h-[520px] touch-pan-y">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={prevPhoto}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-[200] w-8 h-8 items-center justify-center rounded-full bg-base-200/60 hover:bg-base-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={nextPhoto}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-[200] w-8 h-8 items-center justify-center rounded-full bg-base-200/60 hover:bg-base-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {photos.map((src, idx) => {
                const isCurrent = idx === currentIdx;
                const slideStyle = getSlideStyle(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (isCurrent) {
                        setActivePhotoIdx?.(idx);
                        setLightboxOpen?.(true);
                      } else {
                        setCurrentIdx(idx);
                      }
                    }}
                    className={`absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out ${
                      isCurrent ? "ring-2 ring-white/30" : ""
                    }`}
                    style={slideStyle}
                  >
                    <img
                      alt={`Wedding photo ${idx + 1}`}
                      className="h-full w-full object-cover"
                      src={src}
                      style={{ objectPosition: "50% 50%" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {isPink ? (
            <div className="flex justify-center items-center gap-1.5 mt-3" style={{ color: accentColor }}>
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentIdx ? "w-6 h-2 bg-current opacity-70" : "w-2 h-2 bg-current opacity-25"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-3">
              <span className="text-sm tabular-nums opacity-60" style={{ color: accentColor }}>
                {currentIdx + 1} / {total}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
