import type { Inv } from "@/types/invitation";
import { introDefaultFor } from "@/features/templates/data/templates";
import { CardV2 } from "@/features/editor/components/v2/CardV2";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

const heart = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);
const rotateCcw = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw w-3.5 h-3.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
);

/** Ô "tên ngắn": trống = dùng mặc định (nền base-200, mờ); có chữ = tùy chỉnh (nền thường + nút đặt lại) */
function NickInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  const custom = !!value;
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        className={"input input-sm w-full text-base sm:text-sm pr-9 transition-colors " + (custom ? "" : "bg-base-200 border-transparent text-base-content/45")}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        disabled={!custom}
        aria-label="Đặt lại mặc định"
        title="Đặt lại mặc định"
        onClick={() => onChange("")}
        className={"absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded transition-colors " + (custom ? "text-base-content/60 hover:text-base-content cursor-pointer" : "text-base-content/20 cursor-not-allowed")}
      >
        {rotateCcw}
      </button>
    </div>
  );
}

export function BasicV2({ d, set }: P) {
  const order = d.order || "groom";
  return (
    <CardV2 id="basic-info-section" icon={heart} title="Thông tin cơ bản">
      <fieldset className="fieldset mb-4 w-full">
        <div className="flex items-center justify-between">
          <legend className="fieldset-legend text-xs">Lời mở đầu</legend>
          <label className="flex cursor-pointer items-center gap-2">
            <span className="select-none text-xs opacity-70">{d.introCustom ? "Tùy chỉnh" : "Mặc định"}</span>
            <input className="toggle toggle-sm toggle-primary" type="checkbox" checked={d.introCustom} onChange={(e) => set({ introCustom: e.target.checked })} />
          </label>
        </div>
        {d.introCustom ? (
          <input className="input input-sm w-full text-base sm:text-sm" type="text" placeholder={introDefaultFor(d.templateId)} value={d.introText} onChange={(e) => set({ introText: e.target.value })} />
        ) : (
          <div className="flex items-start gap-2.5 rounded-lg bg-base-200/50 p-3 text-sm opacity-80">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <span>
              Đang dùng chữ mặc định của mẫu:
              <span className="mt-1 block font-medium opacity-90">“{introDefaultFor(d.templateId)}”</span>
            </span>
          </div>
        )}
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        <fieldset id="groom-name-field" className="fieldset w-full">
          <legend className="fieldset-legend text-xs">Họ tên chú rể</legend>
          <input className="input input-sm w-full text-base sm:text-sm" placeholder="VD: Nguyễn Thế Bảo" type="text" value={d.groomFull} onChange={(e) => set({ groomFull: e.target.value })} />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-xs">Họ tên cô dâu</legend>
          <input className="input input-sm w-full text-base sm:text-sm" placeholder="VD: Trần Ngọc Ánh" type="text" value={d.brideFull} onChange={(e) => set({ brideFull: e.target.value })} />
        </fieldset>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-xs">Tên ngắn chú rể</legend>
          <NickInput value={d.groomNick} onChange={(v) => set({ groomNick: v })} placeholder={d.groomFull} />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-xs">Tên ngắn cô dâu</legend>
          <NickInput value={d.brideNick} onChange={(v) => set({ brideNick: v })} placeholder={d.brideFull} />
        </fieldset>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-xs"><span className="flex items-center">Danh xưng chú rể</span></legend>
          <input className="input input-sm w-full text-base sm:text-sm" placeholder="VD: Trưởng Nam" type="text" value={d.groomRole || "Trưởng Nam"} onChange={(e) => set({ groomRole: e.target.value })} />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-xs"><span className="flex items-center">Danh xưng cô dâu</span></legend>
          <input className="input input-sm w-full text-base sm:text-sm" placeholder="VD: Út Nữ" type="text" value={d.brideRole || "Út Nữ"} onChange={(e) => set({ brideRole: e.target.value })} />
        </fieldset>
      </div>
      <div className="mb-4">
        <p className="text-[10px] font-medium text-base-content/40 uppercase tracking-wider mb-2">Thứ tự hiển thị</p>
        <div className="relative flex w-full rounded-xl bg-base-200/60 p-1">
          <span className="absolute top-1 bottom-1 rounded-lg bg-base-100 shadow-sm ring-1 ring-base-content/5 transition-all duration-300 ease-out" style={{ insetInlineStart: order === "groom" ? "calc(0% + 4px)" : "calc(50% + 0px)", width: "calc(50% - 4px)" }} />
          <button type="button" aria-pressed={order === "groom"} onClick={() => set({ order: "groom" })} className={"relative z-10 flex-1 rounded-lg font-medium transition-colors duration-200 py-1.5 text-sm " + (order === "groom" ? "text-base-content" : "text-base-content/40 hover:text-base-content/60")}>Nhà trai trước</button>
          <button type="button" aria-pressed={order === "bride"} onClick={() => set({ order: "bride" })} className={"relative z-10 flex-1 rounded-lg font-medium transition-colors duration-200 py-1.5 text-sm " + (order === "bride" ? "text-base-content" : "text-base-content/40 hover:text-base-content/60")}>Nhà gái trước</button>
        </div>
        <p className="text-[11px] opacity-60 mt-1.5">{order === "bride" ? "Hiển thị tên cô dâu và nhà gái trước trên thiệp" : "Hiển thị tên chú rể và nhà trai trước trên thiệp"}</p>
      </div>
    </CardV2>
  );
}
