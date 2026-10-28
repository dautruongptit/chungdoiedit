import { useRef, useState } from "react";
import type { Inv } from "@/types/invitation";
import { CropModal } from "@/components/common/CropModal";
import { CardV2 } from "@/features/editor/components/v2/CardV2";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

const imageIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

/** Thẻ "Ảnh đầu thiệp" — dựng theo HTML đo từ trang gốc (trạng thái chưa có ảnh); các trạng thái khác dùng cùng bộ lớp. */
export default function HeroV2({ d, set }: P) {
  const [crop, setCrop] = useState(false);
  const [uploading, setUploading] = useState(false);
  const file = useRef<HTMLInputElement>(null);

  const pick = async (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    setUploading(true);
    await new Promise((r) => setTimeout(r, 400));
    set({ heroPhoto: URL.createObjectURL(f), heroZoom: 1, heroX: 50, heroY: 50 });
    setUploading(false);
    setCrop(true);
  };

  return (
    <>
      <CardV2 icon={imageIcon} title="Ảnh đầu thiệp" enabled={d.heroOn} onEnabled={(v) => set({ heroOn: v })}>
        {!d.heroOn ? (
          <div className="flex items-start gap-2.5 rounded-lg bg-base-200/50 p-3 text-sm opacity-80">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <span>Ảnh lớn ở đầu thiệp. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-base-content/70">Ảnh đầu thiệp</span>
              <div className="relative overflow-hidden bg-base-200 ring ring-offset-base-100 ring-offset-2 ring-base-300 w-[120px] max-w-full rounded-lg" style={{ aspectRatio: "0.594595 / 1" }}>
                {d.heroPhoto ? (
                  <img src={d.heroPhoto} alt="Ảnh đầu thiệp" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: `${d.heroX}% ${d.heroY}%`, transform: `scale(${d.heroZoom})`, transformOrigin: `${d.heroX}% ${d.heroY}%` }} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-base-content/30">
                    {uploading ? <span className="loading loading-spinner" /> : <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                  </div>
                )}
              </div>
              <input ref={file} accept="image/*" type="file" style={{ position: "absolute", width: "0.1px", height: "0.1px", opacity: 0, overflow: "hidden", zIndex: -1 }} onChange={(e) => { pick(e.target.files); e.target.value = ""; }} />
              <div className="flex gap-2">
                <button type="button" disabled={uploading} className="btn btn-sm btn-outline btn-primary" onClick={() => file.current?.click()}>{d.heroPhoto ? "Đổi ảnh" : "Tải lên"}</button>
                {d.heroPhoto && <button type="button" className="btn btn-sm btn-outline btn-error" onClick={() => set({ heroPhoto: "" })}>Xoá</button>}
              </div>
              <p className="text-xs text-base-content/40 text-center">JPG, PNG, GIF, WebP, HEIC</p>
            </div>
            <p className="text-xs text-base-content/50 text-center max-w-sm">Nên dùng ảnh dọc hoặc ảnh cặp đôi toàn thân</p>
          </div>
        )}
      </CardV2>
      {crop && d.heroPhoto && (
        <CropModal src={d.heroPhoto} zoom0={d.heroZoom} x0={d.heroX} y0={d.heroY} onApply={(z, x, y) => set({ heroZoom: z, heroX: x, heroY: y })} onClose={() => setCrop(false)} />
      )}
    </>
  );
}
