import React, { useEffect, useRef } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Lightbox({ ctx }: { ctx: InvitationCtx }) {
  const { lightboxOpen, setLightboxOpen, albumPhotos, activePhotoIdx, setActivePhotoIdx, t } = ctx;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ink = t.ink || "rgb(210, 95, 101)";

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

          {/* Main photo view */}
          <div
            className="flex-1 w-full flex items-center justify-center min-h-0 relative select-none"
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightboxOpen(false);
            }}
          >
            {albumPhotos.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="btn btn-circle btn-sm sm:btn-md btn-ghost text-white absolute left-2 sm:left-4 z-10 hover:bg-white/20"
                aria-label="Previous photo"
              >
                ❮
              </button>
            )}

            <img
              src={curSrc}
              alt={`Photo ${currentIdx + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
            />

            {albumPhotos.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-circle btn-sm sm:btn-md btn-ghost text-white absolute right-2 sm:right-4 z-10 hover:bg-white/20"
                aria-label="Next photo"
              >
                ❯
              </button>
            )}
          </div>

          {/* Thumbnails strip */}
          {albumPhotos.length > 1 && (
            <div className="flex items-center gap-2 mt-3 px-4 py-2 overflow-x-auto max-w-full rounded-xl bg-black/40 backdrop-blur-sm z-10">
              {albumPhotos.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIdx(idx);
                  }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    idx === currentIdx ? "border-white scale-105 opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                  style={{
                    borderColor: idx === currentIdx ? ink : "transparent",
                  }}
                >
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setLightboxOpen(false)}>close</button>
      </form>
    </dialog>
  );
}
