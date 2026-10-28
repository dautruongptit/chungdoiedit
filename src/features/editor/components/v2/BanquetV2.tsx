import { useState } from "react";
import type { Inv } from "@/types/invitation";
import { Card2, Field2, Row2, Input2, Textarea2, Hint2, Helper2, Divider2 } from "@/features/editor/components/v2/ui2";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

const BANQUET_TITLES: Record<Inv["banquetType"], { title: string; loc: string }> = {
  wedding: { title: "THÔNG TIN TIỆC CƯỚI", loc: "Tiệc cưới sẽ tổ chức tại" },
  reception: { title: "THÔNG TIN TIỆC BÁO HỶ", loc: "Tiệc báo hỷ sẽ tổ chức tại" },
  engagement: { title: "THÔNG TIN TIỆC ĐÍNH HÔN", loc: "Tiệc đính hôn sẽ tổ chức tại" },
};

const cakeIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>
);

function Pill<T extends string>({ value, options, onChange, compact }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; compact?: boolean }) {
  const idx = Math.max(0, options.findIndex((o) => o.value === value));
  const n = options.length;
  return (
    <div className="relative flex w-full rounded-xl bg-base-200/60 p-1">
      <span aria-hidden="true" className="absolute top-1 bottom-1 rounded-lg bg-base-100 shadow-sm ring-1 ring-base-content/5 transition-all duration-300 ease-out" style={{ insetInlineStart: `calc(${(idx * 100) / n}% + ${4 - (idx * 4) / n * 0}px)`, width: `calc(${100 / n}% - ${n === 3 ? "2.66667px" : "4px"})` }} />
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)} className={"relative z-10 flex-1 rounded-lg font-medium transition-colors duration-200 " + (compact ? "px-1 py-1.5 text-xs leading-tight text-balance " : "py-1.5 text-sm ") + (o.value === value ? "text-base-content" : "text-base-content/40 hover:text-base-content/60")}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ToggleRow({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between mt-4 mb-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <span className="text-xs opacity-70 select-none">{on ? "Hiện" : "Ẩn"}</span>
        <input className="toggle toggle-sm toggle-primary" type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} />
      </label>
    </div>
  );
}

const timeProps = (value: string, onChange: (v: string) => void) => ({
  type: "time" as const,
  value,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
  onClick: (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      (e.currentTarget as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
    } catch { /* trình duyệt không hỗ trợ */ }
  },
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Enter"].includes(e.key)) e.preventDefault();
  },
});

function MapBox({ d, set }: P) {
  // Mặc định bản đồ tự lấy theo địa chỉ tiệc cưới; chỉ hiện ô nhập khi bấm "Thay đổi" (hoặc đã có link tuỳ chỉnh).
  const [editing, setEditing] = useState(!!d.mapUrl);
  if (!editing) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-base-200/30 rounded-lg">
          <p className="text-xs text-base-content/50">Bản đồ tự động hiển thị theo địa chỉ tiệc cưới. Chỉ nên thay đổi nếu vị trí trên bản đồ không chính xác.</p>
          <button type="button" className="text-xs text-primary hover:text-primary/80 font-medium whitespace-nowrap ml-3 transition-colors" onClick={() => setEditing(true)}>Thay đổi</button>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="p-3 bg-base-200/30 rounded-lg space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">Địa chỉ bản đồ</span>
          <button type="button" className="text-xs text-primary hover:text-primary/80 font-medium" onClick={() => { set({ mapUrl: "" }); setEditing(false); }}>Hủy</button>
        </div>
        <Textarea2 rows={3} placeholder="Nhập địa chỉ hoặc dán link Google Maps / Apple Maps" value={d.mapUrl} onChange={(e) => set({ mapUrl: e.target.value })} />
        <p className="text-xs text-base-content/50">Nhập địa chỉ, tọa độ, hoặc dán link Google Maps / Apple Maps. Mở Google Maps / Apple Maps, tìm địa điểm, bấm Chia sẻ → Sao chép liên kết rồi dán vào đây.</p>
      </div>
    </div>
  );
}

/** Thẻ "Tiệc cưới" — dựng theo HTML đo từ trang gốc. */
export default function BanquetV2({ d, set }: P) {
  // Đổi loại tiệc thì đổi luôn hai tiêu đề mặc định, nhưng không ghi đè tiêu đề người dùng đã tự sửa
  const changeType = (t: Inv["banquetType"]) => {
    const prev = BANQUET_TITLES[d.banquetType];
    const next = BANQUET_TITLES[t];
    set({
      banquetType: t,
      banquetTitle: d.banquetTitle === prev.title || !d.banquetTitle ? next.title : d.banquetTitle,
      locTitle: d.locTitle === prev.loc || d.locTitle === "ĐỊA ĐIỂM TIỆC CƯỚI" || !d.locTitle ? next.loc : d.locTitle,
    });
  };
  return (
    <Card2 title="Tiệc cưới" icon={cakeIcon} enabled={d.partyOn} onEnabled={(v) => set({ partyOn: v })}>
      {!d.partyOn ? (
        <Hint2>Phần này hiển thị thông tin tiệc cưới (ngày, giờ, địa điểm, bản đồ). Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp! Ẩn phần này cũng ẩn luôn bản đồ địa điểm, vì công tắc riêng của bản đồ nằm bên trong phần này.</Hint2>
      ) : (
        <>
          <Pill compact value={d.banquetType} onChange={changeType} options={[{ value: "wedding", label: "Tiệc cưới" }, { value: "reception", label: "Tiệc báo hỷ" }, { value: "engagement", label: "Tiệc đính hôn" }]} />
          <Field2 label="Tiêu đề mục">
            <Input2 value={d.banquetTitle} onChange={(e) => set({ banquetTitle: e.target.value })} />
          </Field2>
          <Helper2>Tiêu đề in phía trên mục này trên thiệp. Để trống nếu bạn muốn bỏ hẳn.</Helper2>
          <Field2 plain label="Ngày tổ chức">
            <Input2 type="date" value={d.date} onChange={(e) => set({ date: e.target.value })} onClick={(e) => { try { (e.currentTarget as HTMLInputElement & { showPicker?: () => void }).showPicker?.(); } catch { /* bỏ qua */ } }} />
          </Field2>
          <Field2 plain label="Giờ tổ chức">
            <Input2 {...timeProps(d.time, (v) => set({ time: v }))} />
          </Field2>
          <p className="text-xs text-base-content/50 -mt-1">Giờ chính hiển thị lớn trên thiệp, dùng cho đếm ngược và thêm vào lịch.</p>
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-sm font-medium">Định dạng giờ</span>
            </div>
            <Pill value={d.clock} onChange={(v) => set({ clock: v })} options={[{ value: "24h", label: "24 giờ" }, { value: "ampm", label: "Sáng/Chiều" }]} />
          </div>
          <div className="mt-4 rounded-xl border border-base-200 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug">Giờ Đón khách &amp; Khai tiệc</p>
                <p className="text-xs text-base-content/50 mt-1">Thiệp chỉ hiển thị giờ tổ chức. Bật để thêm giờ đón khách và khai tiệc.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer shrink-0 pt-0.5">
                <span className="text-xs opacity-70 select-none">{d.hideWelcomeTimes ? "Ẩn" : "Hiện"}</span>
                <input className="toggle toggle-sm toggle-primary" type="checkbox" checked={!d.hideWelcomeTimes} onChange={(e) => set({ hideWelcomeTimes: !e.target.checked })} />
              </label>
            </div>
            {!d.hideWelcomeTimes && (
              <Row2 className="mt-3">
                <Field2 plain label="Giờ đón khách"><Input2 {...timeProps(d.welcomeTime, (v) => set({ welcomeTime: v }))} /></Field2>
                <Field2 plain label="Giờ khai tiệc"><Input2 {...timeProps(d.startTime, (v) => set({ startTime: v }))} /></Field2>
              </Row2>
            )}
          </div>
          <ToggleRow label="Đồng hồ đếm ngược" on={d.countdown} onChange={(v) => set({ countdown: v })} />
          <Divider2 />
          <Field2 label="Tiêu đề mục địa điểm">
            <Input2 value={d.locTitle || "Tiệc cưới sẽ tổ chức tại"} placeholder="Tiệc cưới sẽ tổ chức tại" onChange={(e) => set({ locTitle: e.target.value })} />
          </Field2>
          <Field2 label="Địa chỉ">
            <Textarea2 rows={2} placeholder="Địa chỉ tiệc cưới" value={d.address} onChange={(e) => set({ address: e.target.value })} />
          </Field2>
          <ToggleRow label="Bản đồ" on={d.showMap} onChange={(v) => set({ showMap: v })} />
          <p className="text-xs opacity-60 mb-2">Bản đồ nằm trong phần này, nên ẩn cả phần thì bản đồ cũng ẩn theo, và công tắc riêng của bản đồ nằm ngay ở đây.</p>
          {d.showMap && <MapBox d={d} set={set} />}
        </>
      )}
    </Card2>
  );
}
