import { useRef, useState } from "react";
import type { Inv } from "@/types/invitation";
import { Section } from "@/components/ui/ui";
import { CropModal } from "@/components/common/CropModal";

export { CropModal };

type P = { d: Inv; set: (p: Partial<Inv>) => void };

export default function HeroPhoto({ d, set }: P) {
  const [crop, setCrop] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const icon = (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  );

  const pick = async (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    setUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    // Realistic upload simulation
    for (let p = 15; p <= 100; p += 25) {
      await new Promise((r) => setTimeout(r, 120));
      setUploadProgress(p);
    }

    const url = URL.createObjectURL(f);
    set({ heroPhoto: url, heroZoom: 1, heroX: 50, heroY: 50 });
    setUploading(false);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setCrop(true);
    }, 1200);
  };

  return (
    <Section title="Ảnh đầu thiệp" icon={icon} enabled={d.heroOn} onEnabled={(v) => set({ heroOn: v })} enabledLabel="Hiện">
      <input ref={file} type="file" accept="image/*" hidden onChange={(e) => { pick(e.target.files); e.target.value = ""; }} />

      {!d.heroOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Ảnh lớn ở đầu thiệp. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</div>
        </div>
      ) : uploading ? (
        <div className="hero-ed">
          <span className="hero-lbl">Ảnh đầu thiệp</span>
          <div className="hero-thumb hero-thumb-uploading">
            <svg className="hero-thumb-bg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <div className="hero-uploading-overlay">
              <span className="spinner" style={{ width: 22, height: 22, borderWidth: 2 }} />
              <span className="hero-up-status">Đang tải lên...</span>
              <span className="hero-up-pct">{uploadProgress}%</span>
            </div>
          </div>
          <div className="hero-btns">
            <button type="button" className="hero-btn-disabled" disabled>Tải lên</button>
          </div>
          <p className="hero-help">JPG, PNG, GIF, WebP, HEIC</p>
          <p className="hero-help2">Nên dùng ảnh dọc hoặc ảnh cặp đôi toàn thân</p>
        </div>
      ) : uploadSuccess ? (
        <div className="hero-ed">
          <span className="hero-lbl">Ảnh đầu thiệp</span>
          <div className="hero-thumb hero-thumb-success">
            <div className="hero-success-check">
              <svg width="32" height="32" fill="none" stroke="#22c55e" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="hero-btns">
            <button type="button" className="hero-btn primary" onClick={() => file.current?.click()}>Đổi ảnh</button>
            <button type="button" className="hero-btn danger" onClick={() => { set({ heroPhoto: "" }); setUploadSuccess(false); }}>Xoá</button>
          </div>
          <p className="hero-help">JPG, PNG, GIF, WebP, HEIC</p>
          <p className="hero-help2">Nên dùng ảnh dọc hoặc ảnh cặp đôi toàn thân</p>
        </div>
      ) : !d.heroPhoto ? (
        <div className="hero-empty-container">
          <div className="hero-empty-group">
            <span className="hero-lbl">Ảnh đầu thiệp</span>
            <div className="hero-empty-thumb">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <button type="button" className="hero-upload-btn-outline" onClick={() => file.current?.click()}>
              Tải lên
            </button>
            <p className="hero-help">JPG, PNG, GIF, WebP, HEIC</p>
          </div>
          <p className="hero-help2">Nên dùng ảnh dọc hoặc ảnh cặp đôi toàn thân</p>
        </div>
      ) : (
        <div className="hero-ed">
          <span className="hero-lbl">Ảnh đầu thiệp</span>
          <div className="hero-thumb">
            <img src={d.heroPhoto} alt="Ảnh đầu thiệp" style={{ objectPosition: `${d.heroX}% ${d.heroY}%`, transform: `scale(${d.heroZoom})`, transformOrigin: `${d.heroX}% ${d.heroY}%` }} />
          </div>
          <div className="hero-btns">
            <button type="button" className="hero-btn primary" onClick={() => file.current?.click()}>Đổi ảnh</button>
            <button type="button" className="hero-btn danger" onClick={() => set({ heroPhoto: "" })}>Xoá</button>
          </div>
          <p className="hero-help">JPG, PNG, GIF, WebP, HEIC</p>
          <p className="hero-help2">Nên dùng ảnh dọc hoặc ảnh cặp đôi toàn thân</p>
        </div>
      )}

      {crop && d.heroPhoto && (
        <CropModal src={d.heroPhoto} zoom0={d.heroZoom} x0={d.heroX} y0={d.heroY}
          onApply={(z, x, y) => set({ heroZoom: z, heroX: x, heroY: y })} onClose={() => setCrop(false)} />
      )}
    </Section>
  );
}
