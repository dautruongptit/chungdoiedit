import React, { useEffect, useRef } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Lightbox({ ctx }: { ctx: InvitationCtx }) {
  const { lightboxOpen, setLightboxOpen, albumPhotos, activePhotoIdx, setActivePhotoIdx, t } = ctx;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textColor = t.ink || "rgb(255, 223, 175)";

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

          {albumPhotos.length > 1 && (
            <button
              type="button"
              className="btn btn-circle btn-ghost absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
              aria-label="Previous photo"
              onClick={handlePrev}
            >
              ❮
            </button>
          )}

          <div
            className="flex-1 flex items-center justify-center min-h-0 w-full overflow-hidden"
            onClick={() => setLightboxOpen(false)}
          >
            <img
              src={curSrc}
              alt={`Photo ${currentIdx + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {albumPhotos.length > 1 && (
            <button
              type="button"
              className="btn btn-circle btn-ghost absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
              aria-label="Next photo"
              onClick={handleNext}
            >
              ❯
            </button>
          )}

          <div className="mt-2 text-center text-sm text-white/80">
            {currentIdx + 1} / {albumPhotos.length}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" onClick={() => setLightboxOpen(false)}>
          close
        </button>
      </form>
    </dialog>
  );
}
