import { ReactNode, useEffect, useState } from "react";

export const Icon = {
  chevronRight: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
  ),
  chevronDown: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
  ),
  back: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
  ),
  gear: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg>
  ),
  pencil: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
  ),
  eye: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  check: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
  ),
  plus: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
  ),
  trash: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
  ),
  music: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z" /></svg>
  ),
  reset: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
  ),
};

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} className={"toggle" + (on ? " on" : "")} onClick={() => onChange(!on)}>
      <span />
    </button>
  );
}

export function Section({
  title,
  enabled,
  onEnabled,
  children,
  defaultOpen = true,
  enabledLabel = "Hiện",
  onTitle,
  icon,
}: {
  icon?: ReactNode;
  title: string;
  enabled?: boolean;
  onEnabled?: (v: boolean) => void;
  children: ReactNode;
  defaultOpen?: boolean;
  enabledLabel?: string;
  onTitle?: (v: string) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [editing, setEditing] = useState(false);
  return (
    <section className="card">
      <div className="card-h">
        <button type="button" className="collapse-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className={"chev" + (open ? " open" : "")}>{Icon.chevronRight(12)}</span>
        </button>
        {icon && <span className="sec-icon">{icon}</span>}
        {onTitle ? (
          editing ? (
            <input className="input title-edit" autoFocus value={title} onChange={(e) => onTitle(e.target.value)}
              onBlur={() => setEditing(false)} onKeyDown={(e) => e.key === "Enter" && setEditing(false)} />
          ) : (
            <h3 className="editable" onClick={() => setEditing(true)} title="Đổi tên phần">{title} {Icon.pencil(12)}</h3>
          )
        ) : (
          <h3>{title}</h3>
        )}
        {onEnabled !== undefined && (
          <label className="card-toggle">
            <span>{enabled ? (enabledLabel || "Hiện") : "Ẩn"}</span>
            <Toggle on={!!enabled} onChange={onEnabled} />
          </label>
        )}
      </div>
      <div className={"card-collapse" + (open ? " open" : "")}>
        <div>
          <div className="card-b">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function Field({ label, children, half, cap }: { label?: string; children: ReactNode; half?: boolean; cap?: boolean }) {
  return (
    <div className={"field" + (half ? " half" : "")}>
      {label && <div className={cap ? "lbl cap" : "lbl"}>{label}</div>}
      {children}
    </div>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="row">{children}</div>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={"input " + (props.className ?? "")} />;
}

export function ResetInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="reset-wrap">
      <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      <button type="button" className="reset-btn" aria-label="Đặt lại mặc định" title="Đặt lại mặc định" disabled={!value} onClick={() => onChange("")}>{Icon.reset(14)}</button>
    </div>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return <div className="hint">{children}</div>;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="input textarea" />;
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  inline,
  size,
}: {
  value: T;
  options: { value: T; label: string; icon?: ReactNode }[];
  onChange: (v: T) => void;
  /** icon nằm cùng hàng với chữ (Hộp quà / Phong bì / Hiện QR) */
  inline?: boolean;
  /** "sm": thanh chọn thấp 32px như trang gốc (loại tiệc, định dạng giờ) */
  size?: "sm";
}) {
  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  return (
    <div className={"seg" + (inline ? " seg-row" : "") + (size === "sm" ? " sm" : "")} style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      <div className="seg-thumb" style={{ width: `calc((100% - ${size === "sm" ? 4 : 8}px) / ${options.length})`, transform: `translateX(${idx * 100}%)` }} />
      {options.map((o) => (
        <button type="button" key={o.value} className={o.value === value ? "active" : ""} onClick={() => onChange(o.value)}>
          {o.icon}
          {o.icon ? <span>{o.label}</span> : o.label}
        </button>
      ))}
    </div>
  );
}

export function OutlineButton({ children, onClick, style }: { children: ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <button type="button" className="btn-outline" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export function Helper({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <p className="helper" style={style}>{children}</p>;
}

export function Modal({
  title,
  onClose,
  children,
  className = "",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="modal-back" onMouseDown={onClose}>
      <div className={`modal ${className}`} role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h4>{title}</h4>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
