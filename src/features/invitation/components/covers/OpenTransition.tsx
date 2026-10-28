import React, { useState, useCallback, useMemo } from "react";
import type { ParticleKind } from "./AmbientParticles";

interface BurstParticle {
  dx: string;
  dy: string;
  rotStart: string;
  rotEnd: string;
  color: string;
  size: string;
  delay: string;
}

export function generateBurstParticles(type: ParticleKind, baseColor: string, count = 32): BurstParticle[] {
  const particles: BurstParticle[] = [];
  const palette =
    type === "stars"
      ? ["#f5e6c8", "#ffffff", "#d4a85c", "#e8d8b0", "#ffd700"]
      : type === "xi-gold"
      ? ["#FFD700", "#FFE066", "#FFC107", "#FF6B6B", "#FFA000"]
      : type === "xi"
      ? ["#FFD700", "#FF6B6B", "#C41230", "#8B0000", "#FFC107"]
      : type === "confetti"
      ? ["#FF0040", "#CC0033", "#AA0028", "#B80030", "#FFD700"]
      : type === "blossom"
      ? ["#c0524f", "#b03235", "#d14f4a", "#f6f3e7", "#e27370"]
      : type === "heart"
      ? ["#a8323b", "#ece4d8", "#c9a24a", "#7a1f26", "#511419"]
      : [baseColor, "#d1db9c", "#ffffff", "#b8c985"];

  for (let i = 0; i < count; i++) {
    // 360 degree radial spread with varied distance
    const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * 0.3;
    const distance = 120 + Math.random() * 260; // 120px to 380px spread
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const color = palette[i % palette.length];
    const size = 12 + Math.random() * 14; // 12px to 26px
    const delay = Math.random() * 0.08; // 0 to 80ms stagger
    const rotStart = (Math.random() - 0.5) * 30;
    const rotEnd = (Math.random() - 0.5) * 360;

    particles.push({
      dx: `${dx.toFixed(1)}px`,
      dy: `${dy.toFixed(1)}px`,
      rotStart: `${rotStart.toFixed(1)}deg`,
      rotEnd: `${rotEnd.toFixed(1)}deg`,
      color,
      size: `${size.toFixed(1)}px`,
      delay: `${delay.toFixed(3)}s`,
    });
  }
  return particles;
}

interface OpenTransitionProps {
  type: ParticleKind;
  baseColor: string;
  sealPosition?: { top: number };
}

export function OpenTransitionBurst({ type, baseColor, sealPosition = { top: 50 } }: OpenTransitionProps) {
  const particles = useMemo(() => generateBurstParticles(type, baseColor, 32), [type, baseColor]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 40 }}
      aria-hidden="true"
    >
      {/* 32 Burst Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute left-1/2 pointer-events-none select-none"
          style={{
            top: sealPosition.top,
            color: p.color,
            fontSize: p.size,
            textShadow: `0 0 10px ${p.color}`,
            ["--dx" as any]: p.dx,
            ["--dy" as any]: p.dy,
            ["--rot-start" as any]: p.rotStart,
            ["--rot-end" as any]: p.rotEnd,
            animation: `particle-burst 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay} 1 normal forwards running`,
          }}
        >
          {type === "stars" ? (
            "✦"
          ) : type === "xi" || type === "xi-gold" ? (
            <span style={{ fontFamily: "serif" }}>囍</span>
          ) : type === "confetti" ? (
            <span
              style={{
                display: "inline-block",
                width: "0.4em",
                height: "0.7em",
                backgroundColor: "currentColor",
                borderRadius: "1px",
              }}
            />
          ) : type === "blossom" ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <g>
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)" />
                <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)" />
              </g>
              <circle cx="12" cy="12" r="1.8" fillOpacity="0.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export function useEnvelopeOpen(onOpen: () => void) {
  const [isOpening, setIsOpening] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const triggerOpen = useCallback(() => {
    if (isOpening) return;

    setIsOpening(true);

    // Phase 2: Seal breaks, card flies away at 500ms
    setTimeout(() => {
      setShowBurst(true);
    }, 500);

    // Phase 3: Transition finishes at 1300ms -> mount opened invitation
    setTimeout(() => {
      onOpen();
    }, 1300);
  }, [isOpening, onOpen]);

  return { isOpening, showBurst, triggerOpen };
}

const HEART_PATH = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
const CENTER_PALETTE = ["#a8323b", "#ece4d8", "#c9a24a", "#7a1f26"];

/** Tim bung ra từ tâm màn hình (Minimalism - Đỏ Đậm): 32 hạt, không có vòng sóng, z-index 100. */
export function OpenTransitionBurstCenter() {
  const particles = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => {
        const angle = (i / 32) * 2 * Math.PI + (Math.random() - 0.5) * 0.3;
        const distance = 120 + Math.random() * 260;
        return {
          dx: `${(Math.cos(angle) * distance).toFixed(1)}px`,
          dy: `${(Math.sin(angle) * distance).toFixed(1)}px`,
          rotStart: `${((Math.random() - 0.5) * 30).toFixed(1)}deg`,
          rotEnd: `${((Math.random() - 0.5) * 360).toFixed(1)}deg`,
          color: CENTER_PALETTE[Math.floor(Math.random() * CENTER_PALETTE.length)],
          size: 10 + Math.random() * 16,
          delay: Math.random() * 0.15,
        };
      }),
    [],
  );
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 100 }} aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute left-1/2"
          style={{
            top: "50%",
            color: p.color,
            fontSize: p.size,
            textShadow: `0 0 10px ${p.color}`,
            ["--dx" as any]: p.dx,
            ["--dy" as any]: p.dy,
            ["--rot-start" as any]: p.rotStart,
            ["--rot-end" as any]: p.rotEnd,
            animation: `particle-burst 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay.toFixed(3)}s 1 normal forwards running`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d={HEART_PATH} /></svg>
        </div>
      ))}
    </div>
  );
}
