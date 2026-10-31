import { useRef, useState } from "react";
import type { Inv } from "@/types/invitation";
import { CropModal } from "@/components/common/CropModal";
import { CardV2 } from "@/features/editor/components/v2/CardV2";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

const galleryIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
);

const LAYOUTS = [
  {
    value: "grid" as const,
    label: "Lưới",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="9" height="9" rx="1.5" /><rect x="13" y="2" width="9" height="9" rx="1.5" /><rect x="2" y="13" width="9" height="9" rx="1.5" /><rect x="13" y="13" width="9" height="9" rx="1.5" /></svg>
    ),
  },
  {
    value: "collage" as const,
    label: "Ghép ảnh",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="10" rx="1.5" /><rect x="2" y="14" width="9" height="8" rx="1.5" /><rect x="13" y="14" width="9" height="8" rx="1.5" /></svg>
    ),
  },
  {
    value: "3d" as const,
    label: "3D",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="-3.5" y="-6" width="7" height="12" rx="1" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" transform="translate(4.5,11) skewY(4)" />
        <rect x="-3.5" y="-6" width="7" height="12" rx="1" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" transform="translate(19.5,11) skewY(-4)" />
        <rect x="6" y="3" width="12" height="16" rx="1.5" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

/** Thẻ "Thư viện ảnh" — dựng theo HTML đo từ trang gốc (trạng thái chưa có ảnh); trạng thái có ảnh dùng cùng bộ lớp. */
export default function AlbumV2({ d, set }: P) {
  const [up, setUp] = useState<{ done: number; total: number } | null>(null);
  const [menu, setMenu] = useState<number | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const [crop, setCrop] = useState<number | null>(null);
  const latest = useRef(d.photos);
  latest.current = d.photos;
  const idx = Math.max(0, LAYOUTS.findIndex((l) => l.value === d.albumLayout));

  const add = async (files: FileList | null) => {
    if (!files || up) return;
    const list = Array.from(files).slice(0, 20 - d.photos.length);
    if (!list.length) return;
    const urls: string[] = [];
    setUp({ done: 0, total: list.length });
    for (const f of list) {
      await new Promise((r) => setTimeout(r, 200));
      urls.push(URL.createObjectURL(f));
      setUp({ done: urls.length, total: list.length });
    }
    set({ photos: [...latest.current, ...urls].slice(0, 20) });
    setUp(null);
  };
  const move = (from: number, to: number) => {
    if (from === to || to < 0 || to >= d.photos.length) return;
    const next = [...d.photos];
    next.splice(to, 0, next.splice(from, 1)[0]);
    set({ photos: next });
  };

  const addInput = (
    <input accept="image/*" multiple type="file" style={{ position: "absolute", width: "0.1px", height: "0.1px", opacity: 0, overflow: "hidden", zIndex: -1 }} onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
  );

  return (
    <>
    <CardV2 icon={galleryIcon} title="Thư viện ảnh" enabled={d.albumOn} onEnabled={(v) => set({ albumOn: v })}>
      {!d.albumOn ? (
        <div className="flex items-start gap-2.5 rounded-lg bg-base-200/50 p-3 text-sm opacity-80">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          <span>Phần này hiển thị album ảnh cưới trên thiệp. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</span>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-medium text-base-content/40 uppercase tracking-wider mb-2">Kiểu hiển thị</p>
            <div className="relative flex w-full rounded-xl bg-base-200/60 p-1">
              <span aria-hidden="true" className="absolute top-1 bottom-1 rounded-lg bg-base-100 shadow-sm ring-1 ring-base-content/5 transition-all duration-300 ease-out" style={{ insetInlineStart: `calc(${idx * 33.3333}% + ${4 - idx * 1.3333}px)`, width: "calc(33.3333% - 2.66667px)" }} />
              {LAYOUTS.map((l) => (
                <button key={l.value} type="button" aria-pressed={d.albumLayout === l.value} onClick={() => set({ albumLayout: l.value })} className={"relative z-10 flex-1 rounded-lg font-medium transition-colors duration-200 flex flex-col items-center gap-0.5 py-1.5 " + (d.albumLayout === l.value ? "text-base-content" : "text-base-content/40 hover:text-base-content/60")}>
                  {l.icon}
                  <span className="text-[10px] leading-tight">{l.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-sm">Thư viện ảnh</span>
              <span className="label-text-alt text-xs text-base-content/50">{d.photos.length} ảnh</span>
            </label>
            <div className="grid gap-2 justify-center [grid-template-columns:repeat(auto-fit,minmax(76px,120px))]">
              {d.photos.map((p, i) => (
                <div
                  key={p}
                  draggable
                  className={"aspect-square rounded-lg overflow-hidden relative bg-base-200 " + (drag === i ? "opacity-50" : "")}
                  onDragStart={() => { setDrag(i); setMenu(null); }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => { if (drag !== null) move(drag, i); setDrag(null); }}
                  onDragEnd={() => setDrag(null)}
                >
                  <img src={p} alt={`Gallery ${i + 1}`} draggable={false} className="w-full h-full object-cover" style={d.photoCrops[p] ? { objectPosition: `${d.photoCrops[p].x}% ${d.photoCrops[p].y}%`, transform: `scale(${d.photoCrops[p].z})`, transformOrigin: `${d.photoCrops[p].x}% ${d.photoCrops[p].y}%` } : undefined} />
                  <button type="button" aria-label="Tùy chọn ảnh" className="btn btn-xs btn-circle btn-ghost absolute top-1 right-1 bg-base-100/70" onClick={(e) => { e.stopPropagation(); setMenu(menu === i ? null : i); }}>
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="3" r="1.5" /><circle cx="8" cy="8" r="1.5" /><circle cx="8" cy="13" r="1.5" /></svg>
                  </button>
                  {menu === i && (
                    <div className="absolute inset-0 bg-base-100/85 flex flex-wrap items-center justify-center gap-1 p-1" onClick={(e) => e.stopPropagation()}>
                      <button type="button" className="btn btn-xs btn-circle" aria-label="Cắt ảnh" title="Cắt ảnh" onClick={() => { setCrop(i); setMenu(null); }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14M2 6h14a2 2 0 0 1 2 2v14" /></svg>
                      </button>
                      <button type="button" className="btn btn-xs btn-circle btn-error" aria-label="Xóa ảnh" title="Xóa ảnh" onClick={() => { set({ photos: d.photos.filter((_, j) => j !== i) }); setMenu(null); }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                      </button>
                      <button type="button" className="btn btn-xs btn-circle" aria-label="Chuyển lên trước" title="Chuyển lên trước" disabled={i === 0} onClick={() => { move(i, i - 1); setMenu(null); }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                      </button>
                      <button type="button" className="btn btn-xs btn-circle" aria-label="Chuyển ra sau" title="Chuyển ra sau" disabled={i === d.photos.length - 1} onClick={() => { move(i, i + 1); setMenu(null); }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {up ? (
                <div className="aspect-square rounded-lg bg-base-200 flex flex-col items-center justify-center gap-1">
                  <span className="loading loading-spinner loading-sm" />
                  <span className="text-xs text-base-content/50">{`${Math.min(up.done + 1, up.total)}/${up.total}`}</span>
                </div>
              ) : (
                d.photos.length < 20 && (
                  <button type="button" onClick={(e) => (e.currentTarget.nextElementSibling as HTMLInputElement | null)?.click()} className="aspect-square bg-base-200 rounded-lg border-2 border-dashed border-base-300 hover:border-primary hover:bg-base-100 transition-colors flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg className="w-6 h-6 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
                    <span className="text-xs text-base-content/50">Thêm ảnh</span>
                  </button>
                )
              )}
              {addInput}
            </div>
            <p className="text-xs text-base-content/40 mt-2">Hỗ trợ: JPG, PNG, GIF, WebP, HEIC. Tối đa 20 ảnh/lần.</p>
          </div>
        </div>
      )}
    </CardV2>
      {crop !== null && d.photos[crop] && (
        <CropModal title="Điều chỉnh vị trí ảnh" aspect={1} src={d.photos[crop]} zoom0={d.photoCrops[d.photos[crop]]?.z ?? 1} x0={d.photoCrops[d.photos[crop]]?.x ?? 50} y0={d.photoCrops[d.photos[crop]]?.y ?? 50} onApply={(z, x, y) => set({ photoCrops: { ...d.photoCrops, [d.photos[crop]]: { z, x, y } } })} onClose={() => setCrop(null)} />
      )}
    </>
  );
}
