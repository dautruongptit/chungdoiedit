import { useState, type ReactNode } from "react";

/**
 * Khung thẻ của editor — dựng theo HTML đo từ trang gốc (daisyUI + Tailwind v4, vùng `.inv-root`).
 * Dùng cho các thẻ đã chuyển sang phiên bản khớp trang gốc; các thẻ chưa chuyển vẫn dùng `Section` cũ.
 */
export function CardV2({
  id,
  icon,
  title,
  enabled,
  onEnabled,
  enabledLabel = "Hiện",
  defaultOpen = true,
  onTitle,
  children,
}: {
  id?: string;
  icon?: ReactNode;
  title: ReactNode;
  enabled?: boolean;
  onEnabled?: (v: boolean) => void;
  enabledLabel?: string;
  defaultOpen?: boolean;
  /** Cho phép đổi tên mục ngay trên tiêu đề (Dress Code, Lịch trình…) */
  onTitle?: (v: string) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [editing, setEditing] = useState(false);
  return (
    // CSS cũ của danh sách thẻ (`.body`) còn khoảng cách 16px giữa các thẻ; mb-4 của thẻ gốc đã bù vào đó
    <div className="inv-root" style={{ marginBottom: -16 }}>
      <div id={id} className="bg-base-100 border border-base-300 rounded-lg mb-4">
        <div className="flex items-center justify-between gap-2 p-4">
          <div className="flex items-center gap-2 font-medium text-sm flex-1 min-w-0">
            <button type="button" className="flex items-center justify-center w-5 h-5 hover:bg-base-200 rounded transition-colors" aria-label="Collapse section" onClick={() => setOpen(!open)}>
              <svg className={"w-3 h-3 transition-transform" + (open ? " rotate-90" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            {icon && <span className="text-base-content/70">{icon}</span>}
            {onTitle && typeof title === "string" ? (
              editing ? (
                <input className="input input-xs flex-1 min-w-0" autoFocus value={title} onChange={(e) => onTitle(e.target.value)} onBlur={() => setEditing(false)} onKeyDown={(e) => e.key === "Enter" && setEditing(false)} />
              ) : (
                <span className="flex-1 min-w-0">
                  <button type="button" className="group -mx-1 inline-flex min-w-0 max-w-full items-center gap-1.5 rounded px-1 py-0.5 hover:bg-base-200 transition-colors" aria-label={title + ": " + title} onClick={() => setEditing(true)}>
                    <span className="truncate font-medium">{title}</span>
                    <svg className="w-3.5 h-3.5 shrink-0 text-base-content/40 group-hover:text-base-content/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </span>
              )
            ) : (
              <span className="flex-1 min-w-0">{title}</span>
            )}
          </div>
          {onEnabled !== undefined && (
            <div className="flex-shrink-0 relative z-10">
              <label className="flex items-center gap-2 cursor-pointer pointer-events-auto">
                <span className="text-xs opacity-70 select-none">{enabled ? enabledLabel : "Ẩn"}</span>
                <input type="checkbox" className="toggle toggle-sm toggle-primary" checked={!!enabled} onChange={(e) => onEnabled(e.target.checked)} />
              </label>
            </div>
          )}
        </div>
        <div className="grid transition-all duration-200 ease-in-out" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
          <div className="min-h-0 overflow-hidden">
            <div className="px-4 pb-4">
              <div className="space-y-3 pt-2">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
