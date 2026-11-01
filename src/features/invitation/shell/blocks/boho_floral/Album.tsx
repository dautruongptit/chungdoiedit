import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Album({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);
  const d = ctx.d || {};

  const photos: string[] =
    d.photos && d.photos.length > 0
      ? d.photos
      : ctx.albumPhotos && ctx.albumPhotos.length > 0
      ? ctx.albumPhotos
      : [];

  const total = photos.length || 1;
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextPhoto = () => setCurrentIdx((p) => (p + 1) % total);
  const prevPhoto = () => setCurrentIdx((p) => (p - 1 + total) % total);

  const getSlideStyle = (index: number): React.CSSProperties => {
    let diff = index - currentIdx;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    const sign = diff >= 0 ? 1 : -1;

    const tx = sign * (absDiff * 60);
    const tz = -absDiff * 150;
    const ry = sign * (absDiff * 45);
    const scale = absDiff === 0 ? 1 : absDiff === 1 ? 0.85 : 0.7;
    const op = absDiff === 0 ? 1 : absDiff === 1 ? 0.75 : absDiff === 2 ? 0.5 : 0.3;
    const zIndex = 100 - absDiff;

    return {
      aspectRatio: theme.photoAspectRatios[index] || "0.666992 / 1",
      transitionDuration: "1100ms",
      transform: `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity: op,
      zIndex,
    };
  };

  return (
    <div className="relative flex flex-col items-center px-6 md:px-10 pt-10 md:pt-14 pb-10 md:pb-12 overflow-visible z-10">
      <h2
        className="uppercase font-bold"
        style={{
          color: theme.primaryColor,
          fontFamily: '"Times New Roman", ChungDoiIndic, serif',
          fontSize: "24px",
          fontWeight: 700,
          letterSpacing: "1px",
        }}
      >
        <span dir="auto">Album Ảnh</span>
      </h2>
      <div className="mt-6 w-full max-w-[390px] md:max-w-[560px] relative z-10">
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
          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
            {photos.map((src, idx) => {
              const isActive = idx === currentIdx;
              const ringClass = isActive ? "ring-2 ring-white/30" : " ";
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out ${ringClass}`}
                  style={getSlideStyle(idx)}
                >
                  <img
                    alt={`Wedding photo ${idx + 1}`}
                    className="h-full w-full object-cover"
                    src={src}
                    style={{ objectPosition: theme.objectPositions[idx] || "50% 50%" }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {theme.isDotsAlbum ? (
          <div className="flex justify-center gap-1.5 mt-3">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => setCurrentIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIdx
                    ? "w-6 h-2 bg-current opacity-70"
                    : "w-2 h-2 bg-current opacity-25 hover:opacity-40"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center mt-3">
            <span className="text-sm tabular-nums opacity-60">
              {currentIdx + 1} / {total}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
