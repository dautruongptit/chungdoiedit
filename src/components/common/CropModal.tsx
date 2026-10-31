import React, { useEffect, useRef, useState } from "react";

export function CropModal({
  src,
  zoom0,
  x0,
  y0,
  onApply,
  onClose,
  title = "Điều chỉnh ảnh đầu thiệp",
  aspect = 0.594595,
  round = false,
}: {
  title?: string;
  aspect?: number;
  /** Khung cắt hình tròn (ảnh đầu thiệp của các mẫu khung tròn) */
  round?: boolean;
  src: string;
  zoom0: number;
  x0: number;
  y0: number;
  onApply: (z: number, x: number, y: number) => void;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(zoom0);
  const [pos, setPos] = useState({ x: x0, y: y0 });
  const start = useRef<{ px: number; py: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y };
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const clamp = (v: number) => Math.max(0, Math.min(100, v));
    setPos({
      x: clamp(start.current.x - ((e.clientX - start.current.px) / r.width) * 100),
      y: clamp(start.current.y - ((e.clientY - start.current.py) / r.height) * 100),
    });
  };

  return (
    <div className="modal-back" onMouseDown={onClose}>
      <div className="crop-box" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <div className="crop-head">
          <div>
            <h3>{title}</h3>
            <p>Kéo để điều chỉnh vị trí và dùng thanh trượt để phóng to/thu nhỏ</p>
          </div>
          <button type="button" className="icon-ghost" aria-label="Đóng" onClick={onClose}>
            ✕
          </button>
        </div>
        <div
          className="crop-stage"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={() => (start.current = null)}
        >
          <div className={"crop-frame" + (round ? " crop-frame-round" : "")} style={{ aspectRatio: String(aspect) }}>
            <img
              src={src}
              alt=""
              draggable={false}
              style={{
                objectPosition: `${pos.x}% ${pos.y}%`,
                transform: `scale(${zoom})`,
                transformOrigin: `${pos.x}% ${pos.y}%`,
              }}
            />
            <div className="crop-grid">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
        <div className="crop-zoom">
          <span>Phóng to:</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
          <span className="val">{zoom.toFixed(1)}x</span>
        </div>
        <div className="crop-actions">
          <button type="button" className="crop-cancel-btn" onClick={onClose}>
            Huỷ
          </button>
          <button
            type="button"
            className="crop-apply-btn"
            onClick={() => {
              onApply(zoom, pos.x, pos.y);
              onClose();
            }}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
