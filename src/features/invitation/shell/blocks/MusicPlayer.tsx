import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function MusicPlayer({ ctx }: { ctx: InvitationCtx }) {
  const { audioRef, d, isPlayingMusic, toggleMusic, t } = ctx;
  return (
    <><audio
            ref={audioRef}
            src={d.musicUrl || "/music/my-love-westlife.mp3"}
            loop
            preload="auto"
          /><div className="music-floating-wrap fixed top-4 right-4 z-50">
            <button
              className={`music-floating-btn ${isPlayingMusic ? "playing" : ""}`}
              onClick={toggleMusic}
              aria-label={isPlayingMusic ? "Tắt nhạc" : "Phát nhạc"}
              title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: `rgba(${t.inkRgb}, 0.85)`,
                color: t.cream,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                border: "2px solid rgba(255,255,255,0.4)",
                cursor: "pointer",
              }}
            >
              <svg className={`w-5 h-5 ${isPlayingMusic ? "animate-spin" : ""}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </button>
          </div></>
  );
}
