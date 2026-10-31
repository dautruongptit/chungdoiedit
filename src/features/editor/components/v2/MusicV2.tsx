import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Inv } from "@/types/invitation";
import { CardV2 } from "@/features/editor/components/v2/CardV2";
import library from "@/features/editor/data/musicLibrary.json";

type P = { d: Inv; set: (p: Partial<Inv>) => void };
type Track = { id: string; title: string; artist: string; duration: number; tags: string[]; market: string; uses: number };

/** Thư viện nhạc nền lấy từ trang gốc (136 bài, đã sắp theo lượt dùng giảm dần như giao diện thật). */
const TRACKS = library as Track[];
const trackUrl = (t: Track) => `/music/${t.id}.mp3`;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");

const noteIcon = (cls: string) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
);
const playIcon = (cls: string) => <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>;
const pauseIcon = (cls: string) => <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>;

/** 60 thanh sóng cố định đo từ trang gốc: chiều cao = 20% + ((5 + 6·i) mod 17) · 80/17 %. */
const BARS = Array.from({ length: 60 }, (_, i) => 20 + (((5 + 6 * i) % 17) * 80) / 17);

/** Thanh sóng kéo để chọn đoạn nhạc bắt đầu/kết thúc (markup đo từ chungdoi.com). */
function Trimmer({ duration, start, end, onChange }: { duration: number; start: number; end: number; onChange: (s: number, e: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ kind: "l" | "r" | "m"; x: number; s: number; e: number } | null>(null);
  const pct = (v: number) => (v / duration) * 100;
  const MIN = Math.min(5, duration);

  const move = (ev: PointerEvent) => {
    const g = drag.current;
    const w = ref.current?.getBoundingClientRect().width;
    if (!g || !w) return;
    const dt = ((ev.clientX - g.x) / w) * duration;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    if (g.kind === "l") onChange(clamp(g.s + dt, 0, g.e - MIN), g.e);
    else if (g.kind === "r") onChange(g.s, clamp(g.e + dt, g.s + MIN, duration));
    else {
      const len = g.e - g.s;
      const s = clamp(g.s + dt, 0, duration - len);
      onChange(s, s + len);
    }
  };
  const up = () => { drag.current = null; window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  const down = (kind: "l" | "r" | "m") => (e: React.PointerEvent) => {
    e.preventDefault();
    drag.current = { kind, x: e.clientX, s: start, e: end };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  useEffect(() => up, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref} className="relative h-11 rounded-lg bg-base-300 overflow-hidden select-none touch-none">
      <div className="absolute inset-0 flex items-center px-0.5 pointer-events-none">
        {BARS.map((h, i) => {
          const mid = ((i + 0.5) / BARS.length) * duration;
          const inside = mid >= start && mid <= end;
          return <div key={i} className={"flex-1 mx-px rounded-full transition-colors duration-150 " + (inside ? "bg-primary/70" : "bg-base-content/20")} style={{ height: h + "%" }} />;
        })}
      </div>
      <div className="absolute top-0 bottom-0 left-0 bg-black/20 pointer-events-none" style={{ width: pct(start) + "%" }} />
      <div className="absolute top-0 bottom-0 right-0 bg-black/20 pointer-events-none" style={{ width: 100 - pct(end) + "%" }} />
      <div className="absolute top-0 h-0.5 bg-primary pointer-events-none z-10" style={{ left: pct(start) + "%", width: pct(end) - pct(start) + "%" }} />
      <div className="absolute bottom-0 h-0.5 bg-primary pointer-events-none z-10" style={{ left: pct(start) + "%", width: pct(end) - pct(start) + "%" }} />
      <div className="absolute top-0 bottom-0 cursor-grab active:cursor-grabbing z-10" style={{ left: `calc(${pct(start)}% + 12px)`, width: `calc(${pct(end) - pct(start)}% - 24px)` }} onPointerDown={down("m")} />
      <div className="absolute top-0 bottom-0 z-20 cursor-ew-resize flex items-center" style={{ left: `calc(${pct(start)}% - 6px)` }} onPointerDown={down("l")}>
        <div className="w-3 h-full bg-primary rounded-l-md flex items-center justify-center"><div className="w-0.5 h-4 bg-white/70 rounded-full" /></div>
      </div>
      <div className="absolute top-0 bottom-0 z-20 cursor-ew-resize flex items-center" style={{ left: `calc(${pct(end)}% - 6px)` }} onPointerDown={down("r")}>
        <div className="w-3 h-full bg-primary rounded-r-md flex items-center justify-center"><div className="w-0.5 h-4 bg-white/70 rounded-full" /></div>
      </div>
    </div>
  );
}

/** Bộ chọn nhạc nền: dựng theo HTML đo từ chungdoi.com (tab Thư Viện / Thêm nhạc, tìm kiếm, danh sách, bảng chọn đoạn, "Không Sử Dụng Nhạc"). */
function MusicPickerV2({ d, onConfirm, onClear, onClose }: { d: Inv; onConfirm: (t: Track, s: number, e: number) => void; onClear: () => void; onClose: () => void }) {
  const current = TRACKS.find((t) => trackUrl(t) === d.musicUrl) || null;
  const [tab, setTab] = useState<"lib" | "add">("lib");
  const [q, setQ] = useState("");
  const [yt, setYt] = useState("");
  const [note, setNote] = useState("");
  const [sel, setSel] = useState<Track | null>(current);
  const [range, setRange] = useState<[number, number]>(current ? [d.musicStart ?? 0, d.musicEnd ?? current.duration] : [0, 0]);
  const [playing, setPlaying] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => { audio.current?.pause(); audio.current = null; }, []);

  const list = useMemo(() => {
    const k = fold(q.trim());
    return k ? TRACKS.filter((t) => fold(t.title).includes(k) || fold(t.artist).includes(k)) : TRACKS;
  }, [q]);

  const stop = () => { audio.current?.pause(); setPlaying(null); };
  const toggle = (t: Track, from = 0) => {
    if (playing === t.id) return stop();
    audio.current?.pause();
    const a = new Audio(trackUrl(t));
    a.currentTime = from;
    a.onended = () => setPlaying(null);
    a.play().catch(() => setPlaying(null));
    audio.current = a;
    setPlaying(t.id);
  };
  const choose = (t: Track) => { stop(); setSel(t); setRange([0, t.duration]); };

  return createPortal(
    <div className="inv-root">
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={onClose} />
        <div className="relative bg-base-100 w-full sm:w-[480px] h-[85vh] sm:h-[600px] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-base-200">
            <button aria-label="Đóng" className="btn btn-ghost btn-sm btn-circle cursor-pointer" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-lg font-semibold">Chọn Nhạc Nền</h2>
            <div className="w-8" />
          </div>
          <div data-bot-screenshot-id="editor-music-picker-tabs" className="px-4 pt-3 pb-2 flex items-center gap-2">
            <button className={"btn btn-sm cursor-pointer " + (tab === "lib" ? "btn-primary" : "btn-ghost")} onClick={() => setTab("lib")}>Thư Viện</button>
            <div className="flex-1" />
            <button className={"btn btn-sm gap-1 cursor-pointer relative " + (tab === "add" ? "btn-primary" : "btn-ghost")} onClick={() => setTab("add")}>
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
              <span>Thêm nhạc</span>
            </button>
          </div>
          {tab === "lib" ? (
            <>
              <div className="px-4 py-2 pb-3 border-b border-base-200">
                <div className="relative">
                  <input placeholder="Tìm kiếm bài hát..." className="input w-full pl-10 text-base sm:text-sm bg-base-200 border-0 focus:outline-none focus:ring-2 focus:ring-primary/30" type="text" value={q} onChange={(e) => setQ(e.target.value)} />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2">
                <div className="space-y-2">
                  {list.map((t) => (
                    <div key={t.id} className={"relative p-3 rounded-xl transition-all cursor-pointer " + (sel?.id === t.id ? "bg-primary/10 ring-2 ring-primary" : "bg-base-200 hover:bg-base-300")} onClick={() => choose(t)}>
                      <div>
                        <div className="flex items-center gap-3">
                          <button type="button" className="btn btn-circle btn-sm cursor-pointer btn-ghost bg-base-100" aria-label={playing === t.id ? "Dừng" : "Phát"} onClick={(e) => { e.stopPropagation(); toggle(t); }}>
                            {playing === t.id ? pauseIcon("w-4 h-4") : playIcon("w-4 h-4")}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-medium text-sm">{t.title}</p>
                            <p className="truncate text-xs text-base-content/60">{t.artist}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="badge badge-ghost badge-xs text-base-content/50">{t.uses} lượt dùng</span>
                            <span className="text-xs text-base-content/50">{fmt(t.duration)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {list.length === 0 && <p className="text-center text-sm text-base-content/50 py-8">Không tìm thấy bài hát</p>}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2 space-y-3">
              <div className="rounded-2xl bg-base-200 px-3 py-3 space-y-2">
                <form
                  className="space-y-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Bản local chưa có máy chủ chuyển link YouTube thành bài hát (trang gốc xử lý 1–3 phút phía máy chủ).
                    setNote("Bản local chưa có máy chủ xử lý link YouTube nên chưa thêm được bài này.");
                  }}
                >
                  <label className="text-xs font-medium text-base-content/70 block mb-1">Dán link YouTube để thêm bài hát mới vào thư viện</label>
                  <div className="flex items-stretch gap-2">
                    <input inputMode="url" placeholder="https://youtu.be/..." className="input input-sm flex-1 text-base sm:text-sm bg-base-100 border-0 focus:outline-none focus:ring-2 focus:ring-primary/30" type="url" value={yt} onChange={(e) => { setYt(e.target.value); setNote(""); }} />
                    <button type="submit" disabled={!yt.trim()} className="btn btn-primary btn-sm cursor-pointer whitespace-nowrap">Thêm</button>
                  </div>
                </form>
              </div>
              <p className="text-[11px] text-base-content/50 leading-snug px-1">Mất khoảng 1-3 phút để xử lý. Bạn cứ tiếp tục chỉnh sửa thiệp, bài hát sẽ tự xuất hiện trong thư viện khi xong. Mỗi bài tối đa 10 phút.</p>
              {note && <p className="text-[11px] text-warning leading-snug px-1">{note}</p>}
            </div>
          )}
          <div className="px-4 py-3 border-t border-base-200 bg-base-100">
            {sel ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <button className="btn btn-circle btn-sm cursor-pointer btn-ghost bg-base-200" onClick={() => toggle(sel, range[0])}>
                    {playing === sel.id ? pauseIcon("h-4 w-4") : playIcon("h-4 w-4")}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{sel.title}</p>
                    <p className="text-xs text-base-content/60">{sel.artist}</p>
                  </div>
                  <button className="btn btn-ghost btn-sm text-error cursor-pointer" onClick={() => { stop(); onClear(); }}>Bỏ Chọn</button>
                  <button className="btn btn-primary btn-sm cursor-pointer" onClick={() => { stop(); onConfirm(sel, Math.round(range[0]), Math.round(range[1])); }}>Xác Nhận</button>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-base-content/60">
                    <span>{fmt(range[0])} - {fmt(range[1])}</span>
                    <span className="flex items-center gap-1.5 text-base-content/40">{fmt(range[1] - range[0])} / {fmt(sel.duration)}</span>
                  </div>
                  <Trimmer duration={sel.duration} start={range[0]} end={range[1]} onChange={(s, e) => setRange([s, e])} />
                  <p className="text-[10px] text-base-content/40 text-center">Kéo để chọn đoạn nhạc bắt đầu và kết thúc</p>
                </div>
              </div>
            ) : (
              <button className="btn btn-ghost w-full cursor-pointer" onClick={onClear}>Không Sử Dụng Nhạc</button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Thẻ "Nhạc nền": trạng thái chưa chọn và đã chọn đều đo từ trang gốc. */
export default function MusicV2({ d, set }: P) {
  const [open, setOpen] = useState(false);
  const sel = TRACKS.find((t) => trackUrl(t) === d.musicUrl) || null;
  return (
    <>
      <CardV2 icon={noteIcon("w-4 h-4")} title="Nhạc nền">
        {d.musicUrl || d.musicName ? (
          <div className="space-y-3">
            <div className="relative p-3 rounded-xl transition-all bg-primary/10 ring-2 ring-primary">
              <div>
                <div className="flex items-center gap-3">
                  <button type="button" className="btn btn-circle btn-sm cursor-pointer btn-ghost bg-base-100" aria-label="Phát" onClick={() => setOpen(true)}>{playIcon("w-4 h-4")}</button>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-sm">{sel?.title || d.musicName}</p>
                    <p className="truncate text-xs text-base-content/60">{sel?.artist || ""}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">{sel && <span className="text-xs text-base-content/50">{fmt(sel.duration)}</span>}</div>
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-outline w-full gap-2" onClick={() => setOpen(true)}>{noteIcon("w-5 h-5")}Đổi nhạc khác</button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">{noteIcon("w-8 h-8 text-base-content/30")}</div>
            <p className="text-sm text-base-content/60">Chưa chọn nhạc nền</p>
            <button type="button" className="btn btn-primary gap-2" onClick={() => setOpen(true)}>{noteIcon("w-5 h-5")}Chọn nhạc</button>
          </div>
        )}
      </CardV2>
      {open && (
        <MusicPickerV2
          d={d}
          onClose={() => setOpen(false)}
          onClear={() => { set({ musicName: "", musicUrl: "", musicStart: undefined, musicEnd: undefined }); setOpen(false); }}
          onConfirm={(t, s, e) => { set({ musicName: t.title, musicUrl: trackUrl(t), musicAutoPlay: true, musicStart: s, musicEnd: e >= t.duration ? undefined : e }); setOpen(false); }}
        />
      )}
    </>
  );
}
