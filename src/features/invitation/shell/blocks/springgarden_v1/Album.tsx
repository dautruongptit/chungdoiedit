import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Album({ ctx }: { ctx: InvitationCtx }) {
  const { albumPhotos, t, setLightboxOpen, setActivePhotoIdx } = ctx;
  const photos = albumPhotos || [];
  const [currentIdx, setCurrentIdx] = useState(2);
  const total = photos.length;
  const ink = t.ink || "rgb(210, 95, 101)";

  if (total === 0) return null;

  const nextPhoto = () => setCurrentIdx((prev) => (prev + 1) % total);
  const prevPhoto = () => setCurrentIdx((prev) => (prev - 1 + total) % total);

  const getSlideStyle = (index: number): React.CSSProperties => {
    let diff = (index - currentIdx + total) % total;
    if (diff > total / 2) diff -= total;

    if (diff === 0) {
      return {
        aspectRatio: "0.666667 / 1",
        transitionDuration: "1100ms",
        transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)",
        opacity: "1",
        zIndex: 100,
      };
    } else if (diff === 1 || (total === 2 && diff === -1)) {
      return {
        aspectRatio: "0.666667 / 1",
        transitionDuration: "1100ms",
        transform: "translateX(60%) translateZ(-150px) rotateY(45deg) scale(0.85)",
        opacity: "0.75",
        zIndex: 99,
      };
    } else if (diff === -1) {
      return {
        aspectRatio: "0.666667 / 1",
        transitionDuration: "1100ms",
        transform: "translateX(-60%) translateZ(-150px) rotateY(-45deg) scale(0.85)",
        opacity: "0.75",
        zIndex: 99,
      };
    } else if (diff > 1) {
      return {
        aspectRatio: "0.666667 / 1",
        transitionDuration: "1100ms",
        transform: "translateX(120%) translateZ(-300px) rotateY(90deg) scale(0.7)",
        opacity: "0.5",
        zIndex: 98,
      };
    } else {
      return {
        aspectRatio: "0.666667 / 1",
        transitionDuration: "1100ms",
        transform: "translateX(-120%) translateZ(-300px) rotateY(-90deg) scale(0.7)",
        opacity: "0.5",
        zIndex: 98,
      };
    }
  };

  return (
    <div className="relative flex flex-col items-center px-6 md:px-10 pb-12 md:pb-16 md:mt-8 z-10">
      <h2
        className="uppercase font-normal text-[20px] md:text-[26px]"
        style={{
          color: ink,
          fontFamily: t.fontFamily || "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          letterSpacing: "0.05em",
        }}
      >
        <span>Album Ảnh</span>
      </h2>

      <div className="mt-6 w-full max-w-[432px] md:max-w-[600px]">
        <div className="relative h-[340px] md:h-[520px] touch-pan-y">
          {/* Nút Previous */}
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

          {/* Nút Next */}
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

          {/* 3D Carousel */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
            {photos.map((src, idx) => {
              const slideStyle = getSlideStyle(idx);
              const isCurrent = idx === currentIdx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (isCurrent) {
                      setActivePhotoIdx(idx);
                      setLightboxOpen(true);
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

        {/* Indicator dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {photos.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to photo ${idx + 1}`}
              onClick={() => setCurrentIdx(idx)}
              className={`rounded-full transition-all duration-300 h-2 bg-current ${
                idx === currentIdx ? "w-6 opacity-70" : "w-2 opacity-25 hover:opacity-40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
