import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useIsMd } from "@/features/invitation/shell/useMedia";
import qrcode from "qrcode-generator";
import { Link, navigate } from "@/app/router";
import { TPL_CDN, Tpl } from "@/features/templates/data/templates";
import { getTemplateThemeAssets } from "@/features/templates/data/themeManifest";
import { useChooseTemplate } from "@/features/templates/components/DraftPrompt";

const ico = (d: string) => (
  <svg className="feat-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const FEATURES: [string, string][] = [
  ["Tùy chỉnh nội dung", "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"],
  ["Ảnh không giới hạn", "M3 5h18v14H3zM8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM21 15l-5-5L5 19"],
  ["Google Maps", "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"],
  ["Đa ngôn ngữ", "M5 8h8M9 4v4M7 8c0 3-2 5-4 6M7 10c1 2 3 4 5 5M12 20l4-10 4 10M13.5 17h5"],
  ["Ghi tên khách mời", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"],
  ["Chia sẻ qua link", "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4"],
  ["Xác nhận tham dự", "M8 2v4M16 2v4M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM9 15l2 2 4-4"],
  ["Nhận lời chúc", "M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z"],
];

const DEMO_ORIGIN = "https://chungdoi.com";

function Qr({ text }: { text: string }) {
  const svg = useMemo(() => {
    const q = qrcode(0, "M");
    q.addData(text);
    q.make();
    return q.createSvgTag({ cellSize: 3, margin: 0, scalable: true });
  }, [text]);
  return <div className="qr" role="img" aria-label="Mã QR xem demo" dangerouslySetInnerHTML={{ __html: svg }} />;
}

function LegacyModal({ tpl, onClose }: { tpl: Tpl; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const { choose, prompt } = useChooseTemplate();

  const themeAssets = getTemplateThemeAssets(tpl.id);

  return (
    <>
    <div className="tm-back" onMouseDown={onClose}>
      <div className="tm" role="dialog" aria-modal="true" aria-label={tpl.name} onMouseDown={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="tm-x" aria-label="Đóng" onClick={onClose}>✕</button>
        
        {/* Mobile Header (rendered above phone mockup on mobile) */}
        <div className="tm-header-mobile">
          <h2>{tpl.name}</h2>
          <p className="tm-desc">{tpl.desc}</p>
          <div className="tm-tags">
            {tpl.tags.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>

        <div className="tm-left">
          <div className="tm-phone-frame">
            <img src={TPL_CDN + tpl.full} alt={`Xem trước ${tpl.name}`} />
          </div>
        </div>
        <div className="tm-right">
          <div className="tm-header-desktop">
            <h2>{tpl.name}</h2>
            <p className="tm-desc">{tpl.desc}</p>
            <div className="tm-tags">
              {tpl.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
          <h3>Tính năng</h3>
          <ul className="tm-feats">
            {FEATURES.map(([t, d]) => <li key={t}>{ico(d)}{t}</li>)}
          </ul>
          <div className="tm-spacer" />
          <div className="tm-qr">
            <Qr text={`${DEMO_ORIGIN}/vi/mau-thiep/${tpl.slug}/demo`} />
            <p>Quét mã QR để xem demo trực tiếp trên điện thoại</p>
          </div>
          <p className="tm-note">Tạo miễn phí · Thử 3 ngày · Đẹp mới thanh toán<br />Bạn có thể đổi mẫu bất cứ lúc nào khi chỉnh sửa</p>
          <div className="tm-actions">
            <button className="tm-choose" onClick={() => choose(tpl)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
              Chọn mẫu này
            </button>
            <Link className="tm-demo" href={`/vi/mau-thiep/${tpl.slug}/demo`} onClick={onClose}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
              Xem demo
            </Link>
          </div>
        </div>
      </div>
    </div>
    {prompt}
    </>
  );
}

/** Biểu tượng tính năng: đường vẽ lấy từ cửa sổ chi tiết mẫu của trang gốc. */
const FEATURE_ICONS = [
  "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
];

const icon = (d: string, cls: string) => (
  <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} /></svg>
);

/** Cửa sổ chi tiết mẫu ở màn ≥768px, dựng theo markup daisyUI đo từ chungdoi.com (kích thước theo breakpoint như bản gốc). */
function DesktopModal({ tpl, onClose }: { tpl: Tpl; onClose: () => void }) {
  const { choose, prompt } = useChooseTemplate();
  const stripRef = useRef<HTMLDivElement>(null);
  const qr = useMemo(() => {
    const q = qrcode(0, "M");
    q.addData(`${DEMO_ORIGIN}/vi/mau-thiep/${tpl.slug}/demo`);
    q.make();
    return "data:image/svg+xml," + encodeURIComponent(q.createSvgTag({ cellSize: 3, margin: 0, scalable: true }));
  }, [tpl.slug]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Trang gốc: ảnh dài đứng yên ~1,8s rồi tự cuộn xuống khoảng 100px/giây cho tới cuối.
  useEffect(() => {
    let raf = 0;
    let last = 0;
    let pos = 0;
    const el = stripRef.current;
    const tick = (t: number) => {
      if (!el) return;
      if (last) pos += ((t - last) * 100) / 1000;
      last = t;
      el.scrollTop = pos;
      if (!el.scrollHeight || el.scrollTop < el.scrollHeight - el.clientHeight - 1) raf = requestAnimationFrame(tick);
    };
    const start = window.setTimeout(() => { raf = requestAnimationFrame(tick); }, 1800);
    return () => { clearTimeout(start); cancelAnimationFrame(raf); };
  }, [tpl.id]);

  return createPortal(
    <div className="inv-root">
      <dialog
        open
        className="modal fixed inset-0 m-0 p-0 max-w-none max-h-none w-screen h-screen"
        style={{ touchAction: "none" }}
        onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="p-0 shadow-2xl animate-modal-scale-in overflow-hidden border border-base-content/10 relative rounded-3xl flex flex-row w-[900px] lg:w-[1000px] xl:w-[1100px] max-w-[90vw] h-[600px] lg:h-[680px] xl:h-[750px] max-h-[85vh] m-auto bg-base-100/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={tpl.name}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 z-20 bg-base-100/50 hover:bg-base-100/80" onClick={onClose}>✕</button>
          <div className="overflow-hidden flex items-center justify-center animate-stagger-1 w-[340px] lg:w-[380px] xl:w-[420px] flex-shrink-0 p-6 lg:p-8 bg-base-content/5">
            <div className="rounded-2xl overflow-hidden bg-white shadow-xl ring-1 ring-black/5 w-full h-full">
              <div ref={stripRef} className="relative overflow-hidden w-full" style={{ height: "100%" }}>
                <img alt={tpl.name} width={400} decoding="async" className="w-full h-auto object-cover object-top" src={TPL_CDN + tpl.full} style={{ color: "transparent" }} />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 min-w-0 bg-base-content/5">
            <div className="flex-shrink-0 px-6 lg:px-8 pt-5 lg:pt-6 pb-2 lg:pb-3">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2 pr-8 animate-stagger-2">{tpl.name}</h2>
              <p className="text-base lg:text-lg text-base-content/70 animate-stagger-2">{tpl.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-3 animate-stagger-3">
                {tpl.tags.map((t) => <span key={t} className="badge badge-sm bg-base-100/50 border-base-content/20">{t}</span>)}
              </div>
            </div>
            <div className="px-6 lg:px-8 pt-1 pb-3 animate-stagger-3">
              <h3 className="text-sm font-medium text-base-content/70 mb-2">Tính năng</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {FEATURES.map(([t], i) => (
                  <li key={t} className="flex items-center gap-1.5 text-xs text-base-content/80">{icon(FEATURE_ICONS[i], "w-3.5 h-3.5 text-primary flex-shrink-0")}{t}</li>
                ))}
              </ul>
            </div>
            <div className="flex-1 flex items-end pb-2 px-6 lg:px-8 animate-stagger-4">
              <div className="flex items-center gap-3">
                <img alt="Mã QR xem demo" className="w-20 h-20 xl:w-28 xl:h-28 flex-shrink-0 rounded-lg bg-white p-1.5 ring-1 ring-base-content/10" src={qr} />
                <p className="text-xs text-base-content/70 max-w-[180px]">Quét mã QR để xem demo trực tiếp trên điện thoại</p>
              </div>
            </div>
            <div className="flex-shrink-0 px-6 lg:px-8 pb-6 lg:pb-8 animate-stagger-4">
              <p className="text-xs text-base-content/50 tracking-wide mb-1">Tạo miễn phí · Thử 3 ngày · Đẹp mới thanh toán</p>
              <p className="text-xs text-base-content/40 mb-3">Bạn có thể đổi mẫu bất cứ lúc nào khi chỉnh sửa</p>
              <div className="flex gap-3">
                <button className="btn btn-primary rounded-xl flex-1 flex-nowrap whitespace-nowrap px-2 gap-1.5" onClick={() => choose(tpl)}>
                  {icon("M4.5 12.75l6 6 9-13.5", "w-5 h-5 shrink-0")}Chọn mẫu này
                </button>
                <a href={`/vi/mau-thiep/${tpl.slug}/demo`} className="btn btn-outline rounded-xl flex-1 flex-nowrap whitespace-nowrap px-2 gap-1.5" onClick={(e) => { e.preventDefault(); onClose(); navigate(`/vi/mau-thiep/${tpl.slug}/demo`); }}>
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>Xem demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      {prompt}
    </div>,
    document.body,
  );
}

export default function TemplateModal(props: { tpl: Tpl; onClose: () => void }) {
  const isMd = useIsMd();
  return isMd ? <DesktopModal {...props} /> : <LegacyModal {...props} />;
}
