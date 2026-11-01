function toStr(v: any, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.vi) return v.vi;
  return fallback;
}
import React, { useState } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getSongHyTheme } from "./themeVars";

const DEFAULT_PHOTOS = [
  "https://assets.chungdoi.com/photo-library/design/e523eaddf90b9700235cbb63ce5f27a1a4fe795772b68d0a13d5271cb92c773b.webp",
  "https://assets.chungdoi.com/photo-library/design/a878b637e33da8599edc016e3bd2164750ae7d839ea72f3ebeeefe9c74cbb595.webp",
  "https://assets.chungdoi.com/photo-library/design/24017d76b67552fc03b87db62dfc545e506948e36759710879ecafea0e96f90f.webp",
  "https://assets.chungdoi.com/photo-library/design/2b09f29a3701a3b015b497da90682826c71352968caf0b4353985e8597c12c40.webp",
  "https://assets.chungdoi.com/photo-library/design/f4d3bf953b7429d6d94f351c0738ab0a49d8f3d0c5d3098e642daccec738c30b.webp",
  "https://assets.chungdoi.com/photo-library/design/223c2ad83cd2ee02edf54f52e85d9e7a103b8c1415fb4c95cd893fc4b47f0c1f.webp",
  "https://assets.chungdoi.com/photo-library/design/eb6d597051eb096bdfd352f1164298b3bdaebdb15e003206f1bebf3e6329a7a3.webp",
  "https://assets.chungdoi.com/photo-library/design/00808e5c34131c224135f9cead6692d40b1ef457ff7d12bf8a8240858d9925c2.webp",
  "https://assets.chungdoi.com/photo-library/design/c2ee0f7ad3220952ba32df1df099288ae57c2bab23fbbd55f1bb091ed6f3bb1f.webp",
  "https://assets.chungdoi.com/photo-library/design/9ab5970787a8a6985809e56a9e4328f033e8d3154bf9b11b9e0aaedd2527cb35.webp",
  "https://assets.chungdoi.com/photo-library/design/96ad5836c2edaa42c65e12bdeee209920e6a96c0fc5f4638d112bea717774c17.webp",
  "https://assets.chungdoi.com/photo-library/design/86c838bfb18ec46de2bef1a31c746f6f9c021729cfe76ac30ffca1edf8b9a1cb.webp",
  "https://assets.chungdoi.com/photo-library/design/551b8f5534d233bfedcb473258c0e3de20def36e1d9499f61236c31fd3bb705a.webp",
  "https://assets.chungdoi.com/photo-library/design/8de4792ea7a8470b3116610a50bb02d012a8532ff5de32a22b8239af534ba4ad.webp",
  "https://assets.chungdoi.com/photo-library/design/442dfbe73174b2750aa345bda5f2d3ce8d9ba8a4d0aecab9c627b0fb331f57f7.webp",
];

export function Album({ ctx }: { ctx: InvitationCtx }) {
  const theme = getSongHyTheme(ctx);
  const d = ctx.d as any;

  const photos: string[] =
    d.photos && d.photos.length > 0
      ? d.photos
      : ctx.albumPhotos && ctx.albumPhotos.length > 0
      ? ctx.albumPhotos
      : DEFAULT_PHOTOS;

  const total = photos.length;
  // Trang gốc:
  // total = 15 (Red): index 4 (5 / 15)
  // total = 8 (Blue): index 4 (5 / 8)
  // total = 6 (Green): index 1
  const initialIdx = theme.isGreen ? 1 : 0;

  const [currentIdx, setCurrentIdx] = useState(initialIdx);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);

  const isDots = true;

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
      aspectRatio: theme.photoAspectRatios[index] || (theme.isGreen ? "0.664062 / 1" : "0.666992 / 1"),
      transitionDuration: "1100ms",
      transform: `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity: op,
      zIndex,
    };
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: theme.paperColor }}
    >
      
      <div className="relative z-10 w-full max-w-lg mx-auto py-4 px-2 sm:px-4">
        <div className="">
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
              {photos.map((src, i) => {
                const isCenter = i === currentIdx;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (isCenter) {
                        setModalIdx(i);
                        setIsModalOpen(true);
                      } else {
                        setCurrentIdx(i);
                      }
                    }}
                    className={`absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out ${
                      isCenter ? "ring-2 ring-white/30" : ""
                    }`}
                    style={getSlideStyle(i)}
                  >
                    <img
                      alt={`Wedding photo ${i + 1}`}
                      className="h-full w-full object-cover"
                      src={src}
                      style={{ objectPosition: "50% 50%" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {isDots ? (
            <div className="flex justify-center gap-1.5 mt-3" style={{ color: "oklch(0.84955 0 0)" }}>
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

      {/* Lightbox dialog modal */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box max-w-none w-auto h-auto bg-transparent shadow-none p-0 m-0 cursor-pointer">
          <div className="flex flex-col items-center h-[100dvh] w-screen px-2 sm:px-4 pt-10 sm:pt-12 pb-4 sm:pb-6">
            <form method="dialog" className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost text-white text-xl sm:text-2xl hover:bg-white/20"
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </form>
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white text-sm sm:text-lg bg-black/40 px-2 sm:px-3 py-1 rounded-full shadow-md z-10">
              {modalIdx + 1} / {total}
            </div>
            <div
              className="relative flex flex-1 w-full max-w-5xl items-center justify-center cursor-pointer px-8 sm:px-12 min-h-0 overscroll-none"
              style={{ touchAction: "none" }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalIdx((p) => (p - 1 + total) % total);
                }}
                className="btn btn-circle btn-ghost text-white text-2xl sm:text-4xl absolute left-0 sm:left-2 z-10 hover:bg-white/20 btn-sm sm:btn-md"
                aria-label="Previous image"
              >
                ‹
              </button>
              <img
                alt={`Ảnh cưới ${modalIdx + 1}`}
                className="max-h-full max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl select-none cursor-default"
                draggable="false"
                src={photos[modalIdx]}
                style={{
                  transform: "translate(0px, 0px) scale(1)",
                  transition: "transform 0.2s ease-out",
                  willChange: "transform",
                  touchAction: "none",
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalIdx((p) => (p + 1) % total);
                }}
                className="btn btn-circle btn-ghost text-white text-2xl sm:text-4xl absolute right-0 sm:right-2 z-10 hover:bg-white/20 btn-sm sm:btn-md"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
            <div
              className="flex-shrink-0 flex gap-2 sm:gap-3 overflow-x-auto px-2 sm:px-4 py-2 sm:py-3 mt-3 sm:mt-4 bg-black/30 rounded-lg backdrop-blur-sm max-w-[90vw] sm:max-w-[80vw] cursor-default [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {photos.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setModalIdx(i)}
                  className={`flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-md sm:rounded-lg overflow-hidden transition-all duration-200 ${
                    i === modalIdx
                      ? "scale-105 shadow-lg"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === modalIdx}
                  style={
                    i === modalIdx
                      ? { outline: "rgb(239, 68, 68) solid 2px", outlineOffset: "2px" }
                      : undefined
                  }
                >
                  <img
                    className="h-full w-full object-cover"
                    alt={`Thumbnail ${i + 1}`}
                    draggable="false"
                    src={src}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/85">
          <button type="button" onClick={() => setIsModalOpen(false)}>
            close
          </button>
        </form>
      </dialog>
    </div>
  );
}
