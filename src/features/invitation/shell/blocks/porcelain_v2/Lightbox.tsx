import React, { useEffect, useRef } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Lightbox({ ctx }: { ctx: InvitationCtx }) {
  const { lightboxOpen, setLightboxOpen, albumPhotos, activePhotoIdx, setActivePhotoIdx, t } = ctx;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textColor = t.ink || "rgb(70, 79, 30)";

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (lightboxOpen && !el.open) {
      el.showModal();
    } else if (!lightboxOpen && el.open) {
      el.close();
    }
  }, [lightboxOpen]);

  if (albumPhotos.length === 0) return null;

  const currentIdx = Math.min(Math.max(activePhotoIdx, 0), albumPhotos.length - 1);
  const curSrc = albumPhotos[currentIdx];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((currentIdx - 1 + albumPhotos.length) % albumPhotos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((currentIdx + 1) % albumPhotos.length);
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={() => setLightboxOpen(false)}
    >
      <div className="modal-box max-w-none w-auto h-auto bg-transparent shadow-none p-0 m-0 cursor-pointer">
        <div className="flex flex-col items-center h-[100dvh] w-screen px-2 sm:px-4 pt-10 sm:pt-12 pb-4 sm:pb-6">
          <form method="dialog" className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10">
            <button
              type="submit"
              className="btn btn-sm btn-circle btn-ghost text-white text-xl sm:text-2xl hover:bg-white/20"
              aria-label="Close lightbox"
              onClick={() => setLightboxOpen(false)}
            >
              ✕
            </button>
          </form>

          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white text-sm sm:text-lg bg-black/40 px-2 sm:px-3 py-1 rounded-full shadow-md z-10">
            {currentIdx + 1} / {albumPhotos.length}
          </div>

          <div
            className="relative flex flex-1 w-full max-w-5xl items-center justify-center cursor-pointer px-8 sm:px-12 min-h-0 overscroll-none"
            style={{ touchAction: "none" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightboxOpen(false);
            }}
          >
            {albumPhotos.length > 1 && (
              <button
                type="button"
                className="btn btn-circle btn-ghost text-white text-2xl sm:text-4xl absolute left-0 sm:left-2 z-10 hover:bg-white/20 btn-sm sm:btn-md"
                aria-label="Previous image"
                onClick={handlePrev}
              >
                ‹
              </button>
            )}

            <img
              alt={`Ảnh cưới ${currentIdx + 1}`}
              className="max-h-full max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl select-none cursor-default"
              draggable="false"
              src={curSrc}
              style={{
                transform: "translate(0px, 0px) scale(1)",
                transition: "transform 0.2s ease-out",
                willChange: "transform",
                touchAction: "none",
              }}
            />

            {albumPhotos.length > 1 && (
              <button
                type="button"
                className="btn btn-circle btn-ghost text-white text-2xl sm:text-4xl absolute right-0 sm:right-2 z-10 hover:bg-white/20 btn-sm sm:btn-md"
                aria-label="Next image"
                onClick={handleNext}
              >
                ›
              </button>
            )}
          </div>

          <div
            className="flex-shrink-0 flex gap-2 sm:gap-3 overflow-x-auto px-2 sm:px-4 py-2 sm:py-3 mt-3 sm:mt-4 bg-black/30 rounded-lg backdrop-blur-sm max-w-[90vw] sm:max-w-[80vw] cursor-default [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {albumPhotos.map((src, idx) => {
              const isSelected = idx === currentIdx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-md sm:rounded-lg overflow-hidden transition-all duration-200 ${
                    isSelected ? "scale-105 shadow-lg" : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                  aria-current={isSelected ? "true" : undefined}
                  style={
                    isSelected
                      ? {
                          outline: `${textColor} solid 2px`,
                          outlineOffset: "2px",
                        }
                      : undefined
                  }
                >
                  <img
                    className="h-full w-full object-cover"
                    alt={`Thumbnail ${idx + 1}`}
                    draggable="false"
                    src={src}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop bg-black/85">
        <button type="submit" onClick={() => setLightboxOpen(false)}>
          close
        </button>
      </form>
    </dialog>
  );
}
