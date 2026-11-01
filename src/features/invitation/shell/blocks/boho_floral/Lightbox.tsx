import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Lightbox({ ctx }: { ctx: InvitationCtx }) {
  const { lightboxOpen, setLightboxOpen } = ctx;
  const theme = getBohoFloralTheme(ctx);
  const d = ctx.d || {};
  const photos: string[] =
    d.photos && d.photos.length > 0
      ? d.photos
      : ctx.albumPhotos && ctx.albumPhotos.length > 0
      ? ctx.albumPhotos
      : [];

  const total = photos.length || 1;
  const firstPhoto = photos[0] || "";

  return (
    <dialog className={`modal ${lightboxOpen ? "modal-open" : ""}`} open={lightboxOpen}>
      <div className="modal-box max-w-none w-auto h-auto bg-transparent shadow-none p-0 m-0 cursor-pointer">
        <div className="flex flex-col items-center h-[100dvh] w-screen px-2 sm:px-4 pt-10 sm:pt-12 pb-4 sm:pb-6">
          <form method="dialog" className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10">
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="btn btn-sm btn-circle btn-ghost text-white text-xl sm:text-2xl hover:bg-white/20"
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </form>
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white text-sm sm:text-lg bg-black/40 px-2 sm:px-3 py-1 rounded-full shadow-md z-10">
            1 / {total}
          </div>
          <div
            className="relative flex flex-1 w-full max-w-5xl items-center justify-center cursor-pointer px-8 sm:px-12 min-h-0 overscroll-none"
            style={{ touchAction: "none" }}
          >
            <button
              type="button"
              className="btn btn-circle btn-ghost text-white text-2xl sm:text-4xl absolute left-0 sm:left-2 z-10 hover:bg-white/20 btn-sm sm:btn-md"
              aria-label="Previous image"
            >
              ‹
            </button>
            <img
              alt="Ảnh cưới 1"
              className="max-h-full max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl select-none cursor-default"
              draggable="false"
              src={firstPhoto}
              style={{
                transform: "translate(0px, 0px) scale(1)",
                transition: "transform 0.2s ease-out",
                willChange: "transform",
                touchAction: "none",
              }}
            />
            <button
              type="button"
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
            {photos.map((src, idx) => (
              <button
                key={idx}
                type="button"
                className={`flex-shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-md sm:rounded-lg overflow-hidden transition-all duration-200 ${
                  idx === 0
                    ? "scale-105 shadow-lg"
                    : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`View image ${idx + 1}`}
                aria-current={idx === 0 ? "true" : undefined}
                style={
                  idx === 0
                    ? { outline: `${theme.primaryColor} solid 2px`, outlineOffset: "2px" }
                    : undefined
                }
              >
                <img className="h-full w-full object-cover" alt={`Thumbnail ${idx + 1}`} draggable="false" src={src} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop bg-black/85">
        <button type="button" onClick={() => setLightboxOpen(false)}>
          close
        </button>
      </form>
    </dialog>
  );
}
