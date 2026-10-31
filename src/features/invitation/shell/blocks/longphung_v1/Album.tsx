import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import AlbumGallery from "@/features/invitation/components/AlbumGallery";

export function Album({ ctx }: { ctx: InvitationCtx }) {
  const { d, setActivePhotoIdx, activePhotoIdx, albumPhotos, t, setLightboxOpen } = ctx;
  const [localIdx, setLocalIdx] = React.useState(0);
  const [ratios, setRatios] = React.useState<Record<number, number>>({});
  const layout = d.albumLayout || "3d";
  const curIdx = localIdx;
  const ink = t.ink || "rgb(233, 206, 158)";

  const setIdx = (i: number) => {
    setLocalIdx(i);
    setActivePhotoIdx(i);
  };

  if (!d.albumOn || albumPhotos.length === 0) return null;

  return (
    <div className="relative flex flex-col items-center px-6 md:px-10 pb-12 md:pb-16 md:mt-8 z-10">
      <h2
        className="uppercase font-normal text-[20px] md:text-[26px]"
        style={{
          color: ink,
          fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          fontSize: "20px",
          letterSpacing: "0.05em",
        }}
      >
        <span className="flex flex-col items-center" style={{ color: ink }}>
          <span lang="vi" style={{ color: ink }}>Album Ảnh</span>
          <span lang="zh-Hant" className=" text-[0.85em] opacity-70" style={{ color: ink }}>
            相簿
          </span>
        </span>
      </h2>
      <div className="mt-6 w-full max-w-[432px] md:max-w-[600px]">
        {layout !== "3d" ? (
          <AlbumGallery
            photos={albumPhotos}
            photoCrops={d.photoCrops}
            layout={layout}
            onPhotoClick={(url) => {
              const i = albumPhotos.indexOf(url);
              if (i >= 0) setIdx(i);
              setLightboxOpen(true);
            }}
          />
        ) : (
          <div className="relative h-[340px] md:h-[520px] touch-pan-y">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => setIdx((curIdx - 1 + albumPhotos.length) % albumPhotos.length)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-[200] w-8 h-8 items-center justify-center rounded-full bg-base-200/60 hover:bg-base-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setIdx((curIdx + 1) % albumPhotos.length)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-[200] w-8 h-8 items-center justify-center rounded-full bg-base-200/60 hover:bg-base-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
              {albumPhotos.map((src, i) => {
                const nA = albumPhotos.length;
                let o = (((i - curIdx) % nA) + nA) % nA;
                if (o > nA / 2) o -= nA;
                const a = Math.abs(o);
                const sg = o < 0 ? -1 : 1;
                const st =
                  a === 0
                    ? { transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 100 }
                    : {
                        transform: `translateX(${sg * 60 * a}%) translateZ(${-150 * a}px) rotateY(${sg * 45 * a}deg) scale(${
                          a === 1 ? 0.85 : 0.7
                        })`,
                        opacity: a === 1 ? 0.75 : a === 2 ? 0.5 : 0.3,
                        zIndex: 100 - a,
                      };
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (i === curIdx) {
                        setLightboxOpen(true);
                      } else {
                        setIdx(i);
                      }
                    }}
                    className={
                      "absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all ease-in-out " +
                      (a === 0 ? "ring-2 ring-white/30" : "")
                    }
                    style={{
                      aspectRatio: "1 / 1",
                      transitionDuration: "1100ms",
                      ...st,
                    }}
                  >
                    <img
                      alt={"Wedding photo " + (i + 1)}
                      className="h-full w-full object-cover"
                      src={src}
                      style={{ objectPosition: "50% 50%" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex justify-center gap-1.5 mt-3" style={{ color: ink }}>
          {albumPhotos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={"Go to photo " + (i + 1)}
              onClick={() => setIdx(i)}
              className={
                "rounded-full transition-all duration-300 " +
                (i === curIdx ? "w-6 h-2 bg-current opacity-70" : "w-2 h-2 bg-current opacity-25 hover:opacity-40")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
