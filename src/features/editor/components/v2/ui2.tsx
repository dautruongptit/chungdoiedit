import type { ReactNode } from "react";
export { CardV2 as Card2 } from "@/features/editor/components/v2/CardV2";

/** Nhóm thành phần form dựng theo markup gốc (daisyUI fieldset/legend/input). Chỉ dùng bên trong `CardV2` (vùng `.inv-root`). */

export function Field2({ label, children, plain, cap }: { label?: ReactNode; children: ReactNode; plain?: boolean; cap?: boolean }) {
  if (cap) {
    return (
      <div>
        <p className="text-[10px] font-medium text-base-content/40 uppercase tracking-wider mb-2">{label}</p>
        {children}
      </div>
    );
  }
  return (
    <fieldset className="fieldset w-full">
      {label !== undefined && <legend className="fieldset-legend text-xs">{plain ? label : <span className="flex items-center">{label}</span>}</legend>}
      {children}
    </fieldset>
  );
}

export function Row2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={"grid grid-cols-2 gap-3 " + className}>{children}</div>;
}

export function Input2(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="text" {...props} className={"input input-sm w-full text-base sm:text-sm " + (props.className ?? "")} />;
}

export function Textarea2(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={"textarea textarea-sm w-full text-base sm:text-sm " + (props.className ?? "")} />;
}

export function Sub2({ children }: { children: ReactNode }) {
  return <p className="text-xs text-base-content/50 font-medium">{children}</p>;
}

export function Divider2() {
  return <div className="divider my-2" />;
}

export function Note2({ children }: { children: ReactNode }) {
  return <p className="text-xs text-base-content/50">{children}</p>;
}

/** Hộp gợi ý khi thẻ đang tắt (hoặc ghi chú vàng) */
export function Hint2({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-base-200/50 p-3 text-sm opacity-80">
      <svg className="mt-0.5 h-4 w-4 shrink-0 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
      <span>{children}</span>
    </div>
  );
}

export function Seg2<T extends string>({ value, options, onChange, label, help, helpClass }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label?: string; help?: string; helpClass?: string }) {
  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  const n = options.length;
  return (
    <div>
      {label && <p className="text-[10px] font-medium text-base-content/40 uppercase tracking-wider mb-2">{label}</p>}
      <div className="relative flex w-full rounded-xl bg-base-200/60 p-1">
        <span className="absolute top-1 bottom-1 rounded-lg bg-base-100 shadow-sm ring-1 ring-base-content/5 transition-all duration-300 ease-out" style={{ insetInlineStart: `calc(${(idx * 100) / n}% + ${4 - (idx * 4) / n * 0}px)`, width: `calc(${100 / n}% - ${8 / n}px)` }} />
        {options.map((o) => (
          <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)} className={"relative z-10 flex-1 rounded-lg font-medium transition-colors duration-200 py-1.5 text-sm " + (o.value === value ? "text-base-content" : "text-base-content/40 hover:text-base-content/60")}>
            {o.label}
          </button>
        ))}
      </div>
      {help && <p className={helpClass ?? "text-[11px] opacity-60 mt-1.5"}>{help}</p>}
    </div>
  );
}

export function Helper2({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <p className="-mt-1 text-xs text-base-content/60" style={style}>{children}</p>;
}

export function Toggle2({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return <input type="checkbox" className="toggle toggle-sm toggle-primary" checked={on} onChange={(e) => onChange(e.target.checked)} />;
}

export function OutlineButton2({ children, onClick, style }: { children: ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <button type="button" className="btn btn-outline btn-sm w-full mt-2" onClick={onClick} style={style}>
      {children}
    </button>
  );
}
