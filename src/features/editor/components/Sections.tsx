import { useRef, useState } from "react";
import MusicPicker, { MUSIC_LIBRARY } from "@/features/editor/components/MusicPicker";
import { CropModal } from "@/components/common/CropModal";
import type { Inv, Gift } from "@/types/invitation";
import { groomShown, brideShown } from "@/utils/format";
import { Field, Helper, Hint, Input, Modal, OutlineButton, ResetInput, Row, Section, Segmented, Textarea, Toggle, Icon } from "@/components/ui/ui";
import { introDefaultFor } from "@/features/templates/data/templates";
import { TEMPLATE_THEMES } from "@/features/invitation/config/templateThemes";
import { VN_BANKS } from "@/features/editor/constants/banks";
import { PAYMENT_METHODS } from "@/features/editor/constants/paymentMethods";
import GiftMethodModal, { isMethodForm, giftLines } from "@/features/editor/components/GiftMethodModal";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

const basicHeartIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export function Basic({ d, set }: P) {
  return (
    <Section title="Thông tin cơ bản" icon={basicHeartIcon}>
      <div className="basic-intro-header">
        <span className="basic-intro-title">Lời mở đầu</span>
        <div className="basic-toggle-wrap">
          <span className="basic-toggle-label">{d.introCustom ? "Tùy chỉnh" : "Mặc định"}</span>
          <Toggle on={d.introCustom} onChange={(v) => set({ introCustom: v })} />
        </div>
      </div>

      {d.introCustom ? (
        <div style={{ marginTop: 10 }}>
          <Input placeholder={introDefaultFor(d.templateId)} value={d.introText} onChange={(e) => set({ introText: e.target.value })} />
        </div>
      ) : (
        <div className="basic-intro-hint">
          <svg width="16" height="16" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>
            <span className="basic-hint-text">Đang dùng chữ mặc định của mẫu:</span>
            <div className="basic-hint-val">“{introDefaultFor(d.templateId)}”</div>
          </div>
        </div>
      )}

      <div>
      <Row>
        <Field label="Họ tên chú rể" half>
          <Input placeholder="VD: Nguyễn Thế Bảo" value={d.groomFull} onChange={(e) => set({ groomFull: e.target.value })} />
        </Field>
        <Field label="Họ tên cô dâu" half>
          <Input placeholder="VD: Trần Ngọc Ánh" value={d.brideFull} onChange={(e) => set({ brideFull: e.target.value })} />
        </Field>
      </Row>
      </div>

      <div style={{ marginBottom: 4 }}>
        <Row>
          <Field label="Tên ngắn chú rể" half>
            <ResetInput value={d.groomNick} onChange={(v) => set({ groomNick: v })} placeholder={d.groomFull} />
          </Field>
          <Field label="Tên ngắn cô dâu" half>
            <ResetInput value={d.brideNick} onChange={(v) => set({ brideNick: v })} placeholder={d.brideFull} />
          </Field>
        </Row>
      </div>

      <Row>
        <Field label="Danh xưng chú rể" half>
          <Input placeholder="VD: Trưởng Nam" value={d.groomRole || "Trưởng Nam"} onChange={(e) => set({ groomRole: e.target.value })} />
        </Field>
        <Field label="Danh xưng cô dâu" half>
          <Input placeholder="VD: Út Nữ" value={d.brideRole || "Út Nữ"} onChange={(e) => set({ brideRole: e.target.value })} />
        </Field>
      </Row>

      <div className="basic-order-block">
        <span className="basic-order-heading">THỨ TỰ HIỂN THỊ</span>
        <Segmented
          value={d.order || "groom"}
          onChange={(v) => set({ order: v })}
          options={[
            { value: "groom", label: "Nhà trai trước" },
            { value: "bride", label: "Nhà gái trước" },
          ]}
        />
        <Helper>
          {d.order === "bride"
            ? "Hiển thị tên cô dâu và nhà gái trước trên thiệp"
            : "Hiển thị tên chú rể và nhà trai trước trên thiệp"}
        </Helper>
      </div>
    </Section>
  );
}

function LayoutIcon({ k }: { k: "grid" | "collage" | "3d" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      {k === "grid" && (<><rect x="2" y="2" width="9" height="9" rx="1.5" /><rect x="13" y="2" width="9" height="9" rx="1.5" /><rect x="2" y="13" width="9" height="9" rx="1.5" /><rect x="13" y="13" width="9" height="9" rx="1.5" /></>)}
      {k === "collage" && (<><rect x="2" y="2" width="20" height="10" rx="1.5" /><rect x="2" y="14" width="9" height="8" rx="1.5" /><rect x="13" y="14" width="9" height="8" rx="1.5" /></>)}
      {k === "3d" && (<>
        <rect x="-3.5" y="-6" width="7" height="12" rx="1" fill="currentColor" opacity=".15" stroke="currentColor" strokeWidth="1" transform="translate(4.5,11) skewY(4)" />
        <rect x="-3.5" y="-6" width="7" height="12" rx="1" fill="currentColor" opacity=".15" stroke="currentColor" strokeWidth="1" transform="translate(19.5,11) skewY(-4)" />
        <rect x="6" y="3" width="12" height="16" rx="1.5" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="1.5" />
      </>)}
    </svg>
  );
}

export function Album({ d, set }: P) {
  const [up, setUp] = useState<{ done: number; total: number } | null>(null);
  const latest = useRef(d.photos);
  latest.current = d.photos;
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
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };
  const upText = up ? `Đang tải lên ${Math.min(up.done + 1, up.total)}/${up.total}...` : "";
  const [showSuccess, setShowSuccess] = useState(false);
  const [menu, setMenu] = useState<number | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const [crop, setCrop] = useState<number | null>(null);
  const move = (from: number, to: number) => {
    if (from === to) return;
    const next = [...d.photos];
    next.splice(to, 0, next.splice(from, 1)[0]);
    set({ photos: next });
  };
  const galleryIcon = (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  );
  return (
    <Section title="Thư viện ảnh" icon={galleryIcon} enabled={d.albumOn} onEnabled={(v) => set({ albumOn: v })} enabledLabel="Hiện">
      {!d.albumOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Phần này hiển thị album ảnh cưới trên thiệp. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</div>
        </div>
      ) : (
        <>
          <Field label="KIỂU HIỂN THỊ" cap>
            <Segmented value={d.albumLayout} onChange={(v) => set({ albumLayout: v })}
              options={[{ value: "grid", label: "Lưới", icon: <LayoutIcon k="grid" /> }, { value: "collage", label: "Ghép ảnh", icon: <LayoutIcon k="collage" /> }, { value: "3d", label: "3D", icon: <LayoutIcon k="3d" /> }]} />
          </Field>
      <div className="lbl-row"><span className="lbl">Thư viện ảnh</span><span className="helper">{d.photos.length} ảnh</span></div>

      {up && (
        <div className="gallery-prog-box">
          <div className="gallery-prog-track">
            <div className="gallery-prog-fill" style={{ width: `${Math.round(((up.done + 0.5) / up.total) * 100)}%` }} />
          </div>
          <p className="gallery-prog-status">{upText}</p>
        </div>
      )}

      {showSuccess && (
        <div className="gallery-success-pill">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
          <span>Tải ảnh lên thành công!</span>
        </div>
      )}

      {d.photos.length === 0 && !up ? (
        <label className="album-empty-add">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg>
          <span style={{ fontSize: "13px", fontWeight: 500 }}>Thêm ảnh</span>
          <input type="file" accept="image/*" multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
        </label>
      ) : (
        <div className="photos">
          {d.photos.map((p, i) => (
            <div className={"photo" + (drag === i ? " drag" : "")} key={p} draggable
              onDragStart={() => { setDrag(i); setMenu(null); }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (drag !== null) move(drag, i); setDrag(null); }}
              onDragEnd={() => setDrag(null)}>
              <img src={p} alt={`Gallery ${i + 1}`} draggable={false}
                style={d.photoCrops[p] ? { objectPosition: `${d.photoCrops[p].x}% ${d.photoCrops[p].y}%`, transform: `scale(${d.photoCrops[p].z})`, transformOrigin: `${d.photoCrops[p].x}% ${d.photoCrops[p].y}%` } : undefined} />
              <button
                type="button"
                className="photo-menu"
                aria-label="Tùy chọn ảnh"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(menu === i ? null : i);
                }}
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <circle cx="8" cy="3" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="8" cy="13" r="1.5" />
                </svg>
              </button>
              {menu === i && (
                <div className="photo-pop-overlay" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="photo-pop-btn"
                    aria-label="Cắt ảnh"
                    title="Cắt ảnh"
                    onClick={() => {
                      setCrop(i);
                      setMenu(null);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2v14a2 2 0 0 0 2 2h14M2 6h14a2 2 0 0 1 2 2v14" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="photo-pop-btn del"
                    aria-label="Xóa ảnh"
                    title="Xóa ảnh"
                    onClick={() => {
                      set({ photos: d.photos.filter((_, j) => j !== i) });
                      setMenu(null);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="photo-pop-btn"
                    aria-label="Chuyển lên trước"
                    title="Chuyển lên trước"
                    disabled={i === 0}
                    onClick={() => {
                      move(i, i - 1);
                      setMenu(null);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="photo-pop-btn"
                    aria-label="Chuyển ra sau"
                    title="Chuyển ra sau"
                    disabled={i === d.photos.length - 1}
                    onClick={() => {
                      move(i, i + 1);
                      setMenu(null);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
          {up ? (
            <div className="photo gallery-uploading-tile">
              <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>{upText}</span>
            </div>
          ) : d.photos.length < 20 && (
            <label className="add-photo">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Thêm ảnh</span>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => {
                  add(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
      )}
      <Helper>Hỗ trợ: JPG, PNG, GIF, WebP, HEIC. Tối đa 20 ảnh/lần.</Helper>
      {crop !== null && d.photos[crop] && (
        <CropModal title="Điều chỉnh ảnh" aspect={1} src={d.photos[crop]}
          zoom0={d.photoCrops[d.photos[crop]]?.z ?? 1} x0={d.photoCrops[d.photos[crop]]?.x ?? 50} y0={d.photoCrops[d.photos[crop]]?.y ?? 50}
          onApply={(z, x, y) => set({ photoCrops: { ...d.photoCrops, [d.photos[crop]]: { z, x, y } } })} onClose={() => setCrop(null)} />
      )}
        </>
      )}
    </Section>
  );
}

const familyIcon = (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export function Family({ d, set }: P) {
  return (
    <Section title="Thông tin gia đình" icon={familyIcon} enabled={d.familyOn} onEnabled={(v) => set({ familyOn: v })} enabledLabel="Hiện">
      {!d.familyOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Phần này hiển thị thông tin gia đình hai bên. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</div>
        </div>
      ) : (
        <>
          <p className="sub">Nhà trai</p>
          <Field label="Danh xưng"><Input placeholder="VD: Ông Bà" value={d.groomFamTitle} onChange={(e) => set({ groomFamTitle: e.target.value })} /></Field>
          <Row>
            <Field label="Ông" half><Input placeholder="VD: Nguyễn Văn Hùng" value={d.groomFather} onChange={(e) => set({ groomFather: e.target.value })} /></Field>
            <Field label="Bà" half><Input placeholder="VD: Trần Thị Lan" value={d.groomMother} onChange={(e) => set({ groomMother: e.target.value })} /></Field>
          </Row>
          <Field label="Địa chỉ nhà trai"><Textarea rows={2} placeholder="Địa chỉ nhà trai" value={d.groomAddr} onChange={(e) => set({ groomAddr: e.target.value })} /></Field>
          <hr className="divider" />
          <p className="sub">Nhà gái</p>
          <Field label="Danh xưng"><Input placeholder="VD: Ông Bà" value={d.brideFamTitle} onChange={(e) => set({ brideFamTitle: e.target.value })} /></Field>
          <Row>
            <Field label="Ông" half><Input placeholder="VD: Trần Văn Minh" value={d.brideFather} onChange={(e) => set({ brideFather: e.target.value })} /></Field>
            <Field label="Bà" half><Input placeholder="VD: Phạm Thị Hoa" value={d.brideMother} onChange={(e) => set({ brideMother: e.target.value })} /></Field>
          </Row>
          <Field label="Địa chỉ nhà gái"><Textarea rows={2} placeholder="Địa chỉ nhà gái" value={d.brideAddr} onChange={(e) => set({ brideAddr: e.target.value })} /></Field>
        </>
      )}
    </Section>
  );
}

const announceIcon = (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2v3h-2V3h-3V1h3a2 2 0 0 1 2 2zm-8-1H9a4 4 0 0 0-4 4v1H3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a4 4 0 0 0 4 4h3v-2H9a2 2 0 0 1-2-2v-1h5l6 4V4l-6 4H7V7a2 2 0 0 1 2-2h3V1z" />
  </svg>
);

export function Announce({ d, set }: P) {
  return (
    <Section title="Lời thông báo" icon={announceIcon} enabled={d.announceOn} onEnabled={(v) => set({ announceOn: v })} enabledLabel="Hiện">
      {!d.announceOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Phần này hiển thị lời thông báo trên thiệp. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</div>
        </div>
      ) : (
        <Field label="Câu thông báo (để trống nếu không muốn hiện)">
          <Textarea rows={2} placeholder={"VD: TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}
            value={[d.announcementLine1, d.announcementLine2].filter((x) => x !== undefined).join("\n")}
            onChange={(e) => { const [a = "", ...r] = e.target.value.split("\n"); set({ announcementLine1: a, announcementLine2: r.join("\n") }); }} />
        </Field>
      )}
    </Section>
  );
}

const ceremonyClockIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
  </svg>
);

export function Ceremony({ d, set }: P) {
  const upd = (i: number, p: Partial<Inv["ceremonies"][number]>) =>
    set({ ceremonies: d.ceremonies.map((c, j) => (j === i ? { ...c, ...p } : c)) });
  return (
    <Section title="Lễ" icon={ceremonyClockIcon}>
      <Field label="Tiêu đề mục"><Input value={d.ceremonyTitle} onChange={(e) => set({ ceremonyTitle: e.target.value })} /></Field>
      <Helper>Tiêu đề in phía trên mục này trên thiệp. Để trống nếu bạn muốn bỏ hẳn.</Helper>
      {d.ceremonies.length === 0 && (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Bạn có tổ chức lễ vu quy/lễ thành hôn tại nhà không? Nếu có, hãy bấm nút bên dưới để thêm lễ!</div>
        </div>
      )}
      {d.ceremonies.map((c, i) => (
        <div className="mini-col" key={i}>
          <Row>
            <Field label="Tên lễ" half><Input placeholder="Ví dụ: Lễ gia tiên" value={c.title} onChange={(e) => upd(i, { title: e.target.value })} /></Field>
            <button className="icon-ghost sm" aria-label="Xoá lễ" onClick={() => set({ ceremonies: d.ceremonies.filter((_, j) => j !== i) })}>{Icon.trash()}</button>
          </Row>
          <Row>
            <Field label="Ngày" half>
              <input
                type="date"
                className="input sched-time-input"
                value={c.date}
                onChange={(e) => upd(i, { date: e.target.value })}
                onClick={(e) => {
                  try {
                    (e.currentTarget as any).showPicker?.();
                  } catch {}
                }}
              />
            </Field>
            <Field label="Giờ" half>
              <input
                type="time"
                className="input sched-time-input"
                value={c.time}
                onChange={(e) => upd(i, { time: e.target.value })}
                onClick={(e) => {
                  try {
                    (e.currentTarget as any).showPicker?.();
                  } catch {}
                }}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Enter"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </Field>
          </Row>
          <Field label="Địa điểm"><Input value={c.place} onChange={(e) => upd(i, { place: e.target.value })} /></Field>
        </div>
      ))}
      <button
        type="button"
        className="btn-outline-pill-full"
        onClick={() => set({ ceremonies: [...d.ceremonies, { title: "", date: "", time: "", place: "" }] })}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        Thêm lễ
      </button>
    </Section>
  );
}

const cakeIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2 21h20" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 8v2M12 8v2M17 8v2" />
    <circle cx="7" cy="4" r="1" fill="currentColor" />
    <circle cx="12" cy="4" r="1" fill="currentColor" />
    <circle cx="17" cy="4" r="1" fill="currentColor" />
  </svg>
);

const BANQUET_TITLES: Record<Inv["banquetType"], { title: string; loc: string }> = {
  wedding: { title: "THÔNG TIN TIỆC CƯỚI", loc: "Tiệc cưới sẽ tổ chức tại" },
  reception: { title: "THÔNG TIN TIỆC BÁO HỶ", loc: "Tiệc báo hỷ sẽ tổ chức tại" },
  engagement: { title: "THÔNG TIN TIỆC ĐÍNH HÔN", loc: "Tiệc đính hôn sẽ tổ chức tại" },
};

export function Banquet({ d, set }: P) {
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
    <Section title="Tiệc cưới" icon={cakeIcon} enabled={d.partyOn} onEnabled={(v) => set({ partyOn: v })} enabledLabel="Hiện">
      {!d.partyOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Phần này hiển thị thông tin tiệc cưới (ngày, giờ, địa điểm, bản đồ). Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp! Ẩn phần này cũng ẩn luôn bản đồ địa điểm, vì công tắc riêng của bản đồ nằm bên trong phần này.</div>
        </div>
      ) : (
        <>
          <Segmented
            size="sm"
            value={d.banquetType}
            onChange={changeType}
            options={[
              { value: "wedding", label: "Tiệc cưới" },
              { value: "reception", label: "Tiệc báo hỷ" },
              { value: "engagement", label: "Tiệc đính hôn" },
            ]}
          />
          <Field label="Tiêu đề mục">
            <Input value={d.banquetTitle} onChange={(e) => set({ banquetTitle: e.target.value })} />
          </Field>
          <Helper style={{ marginBottom: -4 }}>Tiêu đề in phía trên mục này trên thiệp. Để trống nếu bạn muốn bỏ hẳn.</Helper>
          <Field label="Ngày tổ chức">
            <input
              type="date"
              className="input sched-time-input"
              value={d.date}
              onChange={(e) => set({ date: e.target.value })}
              onClick={(e) => {
                try {
                  (e.currentTarget as any).showPicker?.();
                } catch {}
              }}
            />
          </Field>

          <Field label="Giờ tổ chức">
            <input
              type="time"
              className="input sched-time-input"
              value={d.time}
              onChange={(e) => set({ time: e.target.value })}
              onClick={(e) => {
                try {
                  (e.currentTarget as any).showPicker?.();
                } catch {}
              }}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Enter"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Field>
          <Helper style={{ marginBottom: -4 }}>Giờ chính hiển thị lớn trên thiệp, dùng cho đếm ngược và thêm vào lịch.</Helper>

          <Field label="Định dạng giờ">
            <Segmented
              size="sm"
              value={d.clock}
              onChange={(v) => set({ clock: v })}
              options={[
                { value: "24h", label: "24 giờ" },
                { value: "ampm", label: "Sáng/Chiều" },
              ]}
            />
          </Field>

          <div className="banquet-extra-card">
            <div className="banquet-extra-header">
              <span className="banquet-extra-title">Giờ Đón khách &amp; Khai tiệc</span>
              <div className="banquet-toggle-wrap">
                <span className="banquet-toggle-status">{d.hideWelcomeTimes ? "Ẩn" : "Hiện"}</span>
                <Toggle on={!d.hideWelcomeTimes} onChange={(v) => set({ hideWelcomeTimes: !v })} />
              </div>
            </div>
            <p className="banquet-extra-help">Thiệp chỉ hiển thị giờ tổ chức. Bật để thêm giờ đón khách và khai tiệc.</p>
            {!d.hideWelcomeTimes && (
              <Row>
                <Field label="Giờ đón khách" half>
                  <input
                    type="time"
                    className="input sched-time-input"
                    value={d.welcomeTime}
                    onChange={(e) => set({ welcomeTime: e.target.value })}
                    onClick={(e) => {
                      try {
                        (e.currentTarget as any).showPicker?.();
                      } catch {}
                    }}
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Enter"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Field>
                <Field label="Giờ khai tiệc" half>
                  <input
                    type="time"
                    className="input sched-time-input"
                    value={d.startTime}
                    onChange={(e) => set({ startTime: e.target.value })}
                    onClick={(e) => {
                      try {
                        (e.currentTarget as any).showPicker?.();
                      } catch {}
                    }}
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Enter"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Field>
              </Row>
            )}
          </div>

          <div className="banquet-row-toggle">
            <span className="banquet-row-title">Đồng hồ đếm ngược</span>
            <div className="banquet-toggle-wrap">
              <span className="banquet-toggle-status">{d.countdown ? "Hiện" : "Ẩn"}</span>
              <Toggle on={d.countdown} onChange={(v) => set({ countdown: v })} />
            </div>
          </div>

          <Field label="Tiêu đề mục địa điểm">
            <Input
              value={d.locTitle || "Tiệc cưới sẽ tổ chức tại"}
              placeholder="Tiệc cưới sẽ tổ chức tại"
              onChange={(e) => set({ locTitle: e.target.value })}
            />
          </Field>

          <Field label="Địa chỉ">
            <Textarea
              rows={3}
              placeholder="Địa chỉ tiệc cưới"
              value={d.address}
              onChange={(e) => set({ address: e.target.value })}
            />
          </Field>

          <div className="banquet-row-toggle">
            <span className="banquet-row-title">Bản đồ</span>
            <div className="banquet-toggle-wrap">
              <span className="banquet-toggle-status">{d.showMap ? "Hiện" : "Ẩn"}</span>
              <Toggle on={d.showMap} onChange={(v) => set({ showMap: v })} />
            </div>
          </div>
          <Helper>Bản đồ nằm trong phần này, nên ẩn cả phần thì bản đồ cũng ẩn theo, và công tắc riêng của bản đồ nằm ngay ở đây.</Helper>

          {d.showMap && <MapBox d={d} set={set} />}
        </>
      )}
    </Section>
  );
}

function MapBox({ d, set }: P) {
  // Mặc định bản đồ tự lấy theo địa chỉ tiệc cưới; chỉ hiện ô nhập khi bấm "Thay đổi" (hoặc đã có link tuỳ chỉnh).
  const [editing, setEditing] = useState(!!d.mapUrl);
  if (!editing) {
    return (
      <div className="banquet-map-card">
        <div className="banquet-map-content">
          <p className="banquet-map-text">Bản đồ tự động hiển thị theo địa chỉ tiệc cưới. Chỉ nên thay đổi nếu vị trí trên bản đồ không chính xác.</p>
          <button type="button" className="banquet-map-link" onClick={() => setEditing(true)}>Thay đổi</button>
        </div>
      </div>
    );
  }
  return (
    <div className="banquet-map-card edit-mode">
      <div className="banquet-map-edit-header">
        <span className="banquet-map-edit-title">Địa chỉ bản đồ</span>
        <button
          type="button"
          className="banquet-map-cancel"
          onClick={() => { set({ mapUrl: "" }); setEditing(false); }}
        >
          Hủy
        </button>
      </div>

      <textarea
        className="input banquet-map-textarea"
        rows={3}
        placeholder="Nhập địa chỉ hoặc dán link Google Maps / Apple Maps"
        value={d.mapUrl}
        onChange={(e) => set({ mapUrl: e.target.value })}
      />

      <div className="banquet-map-footer">
        <span>Nhập địa chỉ, tọa độ, hoặc dán link Google Maps / Apple Maps · </span>
        <a
          href="#guide"
          className="banquet-map-guide-link"
          onClick={(e) => {
            e.preventDefault();
            alert("Hướng dẫn: Mở Google Maps / Apple Maps, tìm địa điểm tổ chức của bạn, bấm Chia sẻ -> Sao chép liên kết rồi dán vào đây.");
          }}
        >
          ▷ Xem video hướng dẫn
        </a>
      </div>
    </div>
  );
}

const rsvpIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

export function Rsvp({ d, set }: P) {
  const upd = (i: number, v: string) => set({ questions: d.questions.map((q, j) => (j === i ? v : q)) });
  return (
    <Section title="Xác nhận tham dự (RSVP)" icon={rsvpIcon} enabled={d.rsvpOn} onEnabled={(v) => set({ rsvpOn: v })} enabledLabel="Hiện">
      {!d.rsvpOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Cho phép khách mời xác nhận tham dự và số lượng khách. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</div>
        </div>
      ) : (
        <>
          <div className="rsvp-info">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: 2 }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <div>
              <b>Khách mời có thể xác nhận tham dự trực tiếp trên thiệp</b>
              <p>Xem danh sách xác nhận trong trang Quản lý khách mời</p>
            </div>
          </div>
          <Field label="Kiểu hiển thị" cap>
            <Segmented size="sm" value={d.rsvpDisplay} onChange={(v) => set({ rsvpDisplay: v })} options={[{ value: "button", label: "Nút bấm" }, { value: "inline", label: "Hiện trực tiếp" }]} />
            <Helper>{d.rsvpDisplay === "button" ? "Khách bấm nút để mở form xác nhận trong cửa sổ popup" : "Form xác nhận hiển thị trực tiếp trên thiệp"}</Helper>
          </Field>
          <Field label="Số người mỗi thiệp" cap>
            <Segmented size="sm" value={d.partyMode} onChange={(v) => set({ partyMode: v })} options={[{ value: "free", label: "Khách tự chọn" }, { value: "limit", label: "Giới hạn" }]} />
            <Helper>{d.partyMode === "free" ? "Khách tự điền số người sẽ đến." : "Giới hạn số người tối đa cho mỗi thiệp."}</Helper>
          </Field>
          {d.partyMode === "limit" && (
            <Field label="Giới hạn tối đa"><Input type="number" min={1} value={d.partyLimit} onChange={(e) => set({ partyLimit: Math.max(1, Number(e.target.value) || 1) })} /></Field>
          )}
          <Field label="Câu hỏi thêm cho khách mời" cap>
            <Helper style={{ marginBottom: 0 }}>Khách trả lời khi xác nhận tham dự trên thiệp</Helper>
            {d.questions.map((q, i) => (
              <Row key={i}>
                <Input value={q} placeholder="Nhập câu hỏi" onChange={(e) => upd(i, e.target.value)} />
                <button className="icon-ghost sm" aria-label="Xoá câu hỏi" onClick={() => set({ questions: d.questions.filter((_, j) => j !== i) })}>{Icon.trash()}</button>
              </Row>
            ))}
            <OutlineButton onClick={() => set({ questions: [...d.questions, ""] })} style={{ marginTop: -2 }}>{Icon.plus(16)} Thêm câu hỏi</OutlineButton>
          </Field>
        </>
      )}
    </Section>
  );
}

const dressIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 2h8l-2 7 4 13H6l4-13L8 2z" />
  </svg>
);

export function Dress({ d, set }: P) {
  const [customColor, setCustomColor] = useState("#E8B7B7");
  const colorInputRef = useRef<HTMLInputElement>(null);

  const addColor = (c: string = "#d4af37") => {
    set({ dressColors: [...(d.dressColors || []), c] });
  };
  const updColor = (i: number, val: string) => {
    const list = [...(d.dressColors || [])];
    list[i] = val;
    set({ dressColors: list });
  };
  const delColor = (i: number) => {
    const list = [...(d.dressColors || [])];
    list.splice(i, 1);
    set({ dressColors: list });
  };

  const SUGGESTED_COLORS = ["#000000", "#ffffff", "#e0d5be", "#aab99b", "#a4b5be"];

  return (
    <Section title="Dress Code" icon={dressIcon} enabled={d.dressOn} onEnabled={(v) => set({ dressOn: v })}>
      {!d.dressOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>Bật để gợi ý trang phục cho khách mời theo màu sắc chủ đạo của tiệc cưới.</span>
        </div>
      ) : (
        <>
          <Field label="Tiêu đề">
            <Input
              value={d.dressTitle || "DRESS CODE"}
              placeholder="DRESS CODE"
              onChange={(e) => set({ dressTitle: e.target.value })}
            />
          </Field>
          <Field label="Mô tả">
            <Textarea
              rows={3}
              value={d.dressText || "Trang phục dự tiệc"}
              placeholder="Trang phục dự tiệc"
              onChange={(e) => set({ dressText: e.target.value })}
            />
          </Field>
          <Field label="Màu sắc">
            <div className="dress-colors-row">
              {(d.dressColors || []).map((c, i) => (
                <div key={i} className="dress-swatch-wrap">
                  <input
                    type="color"
                    id={`dress-color-${i}`}
                    value={c}
                    className="dress-swatch-hidden"
                    onChange={(e) => updColor(i, e.target.value)}
                  />
                  <label
                    htmlFor={`dress-color-${i}`}
                    className="dress-swatch-bubble"
                    style={{ backgroundColor: c }}
                    title="Bấm để đổi màu"
                  />
                  <button
                    type="button"
                    className="dress-swatch-del"
                    aria-label="Xóa màu"
                    onClick={() => delColor(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="dress-swatch-add"
                aria-label="Thêm màu sắc"
                title="Thêm màu"
                onClick={() => addColor()}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </Field>

          {/* Chọn từ gợi ý */}
          <div className="dress-suggest-section">
            <span className="dress-sublabel">Chọn từ gợi ý</span>
            <div className="dress-suggest-row">
              {SUGGESTED_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="dress-suggest-bubble"
                  style={{
                    backgroundColor: c,
                    border: c === "#ffffff" ? "1px solid rgba(255, 255, 255, 0.4)" : "none",
                  }}
                  title={`Thêm màu ${c}`}
                  onClick={() => addColor(c)}
                />
              ))}
            </div>
          </div>

          <hr className="dress-divider" />

          {/* Màu tùy chỉnh */}
          <div className="dress-custom-section">
            <span className="dress-sublabel">Màu tùy chỉnh</span>
            <div className="dress-custom-row">
              <input
                ref={colorInputRef}
                type="color"
                value={customColor}
                className="dress-swatch-hidden"
                onChange={(e) => setCustomColor(e.target.value.toUpperCase())}
              />
              <button
                type="button"
                className="dress-custom-preview-bubble"
                style={{ backgroundColor: customColor }}
                title="Bấm để chọn màu"
                onClick={() => colorInputRef.current?.click()}
              />
              <input
                type="text"
                className="input dress-custom-input"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
              />
              <button
                type="button"
                className="dress-custom-add-btn"
                onClick={() => addColor(customColor)}
              >
                + Thêm
              </button>
            </div>
          </div>
        </>
      )}
    </Section>
  );
}

export function Schedule({ d, set }: P) {
  // Xóa hoạt động cần bấm xác nhận ngay trên thẻ ("Xóa" / "Hủy") như trang gốc
  const [confirmDel, setConfirmDel] = useState<number | null>(null);
  const upd = (i: number, p: Partial<{ time: string; text: string }>) =>
    set({ sched: d.sched.map((s, j) => (j === i ? { ...s, ...p } : s)) });

  const move = (from: number, to: number) => {
    if (to < 0 || to >= d.sched.length) return;
    const next = [...d.sched];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    set({ sched: next });
  };

  const remove = (i: number) => {
    set({ sched: d.sched.filter((_, j) => j !== i) });
  };

  return (
    <Section
      title="Lịch trình ngày cưới"
      enabled={d.schedOn}
      onEnabled={(v) => set({ schedOn: v })}
      icon={
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      }
    >
      {!d.schedOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none" }}>
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
          </svg>
          <span>Bật để hiển thị lịch trình các hoạt động trong ngày cưới (đón khách, lễ gia tiên, khai tiệc...) cho khách dễ theo dõi.</span>
        </div>
      ) : (
        <div className="sched-wrap">
          <Field label="Tiêu đề">
            <Input
              value={d.schedTitle || "LỊCH TRÌNH NGÀY CƯỚI"}
              placeholder="LỊCH TRÌNH NGÀY CƯỚI"
              onChange={(e) => set({ schedTitle: e.target.value })}
            />
          </Field>
          {d.sched.map((s, i) => (
          <div className="sched-card" key={i}>
            <div className="sched-card-header">
              <span className="sched-card-title">Hoạt động {i + 1}</span>
              <div className="sched-card-actions">
                {i > 0 && (
                  <button
                    type="button"
                    className="sched-btn-icon"
                    onClick={() => move(i, i - 1)}
                    aria-label="Di chuyển lên"
                    title="Di chuyển lên"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                )}
                {i < d.sched.length - 1 && (
                  <button
                    type="button"
                    className="sched-btn-icon"
                    onClick={() => move(i, i + 1)}
                    aria-label="Di chuyển xuống"
                    title="Di chuyển xuống"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
                {confirmDel === i ? (
                  <>
                    <button type="button" className="sched-btn-confirm" onClick={() => { remove(i); setConfirmDel(null); }}>Xóa</button>
                    <button type="button" className="sched-btn-cancel" onClick={() => setConfirmDel(null)}>Hủy</button>
                  </>
                ) : (
                <button
                  type="button"
                  className="sched-btn-icon delete"
                  onClick={() => setConfirmDel(i)}
                  aria-label="Xóa hoạt động"
                  title="Xóa"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                )}
              </div>
            </div>
            <div className="sched-card-body">
              <div className="sched-input-group">
                <label>Giờ</label>
                <input
                  type="time"
                  className="input sched-time-input"
                  value={s.time}
                  onChange={(e) => upd(i, { time: e.target.value })}
                  onClick={(e) => {
                    try {
                      (e.currentTarget as any).showPicker?.();
                    } catch {}
                  }}
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Enter"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="sched-input-group">
                <label>Nội dung</label>
                <Input
                  type="text"
                  value={s.text}
                  placeholder="VD: Đón khách"
                  onChange={(e) => upd(i, { text: e.target.value })}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn-outline-pill-full"
          onClick={() => set({ sched: [...d.sched, { time: "", text: "" }] })}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Thêm hoạt động
        </button>

        <Helper>Khách mời sẽ yên tâm hơn khi biết: đến lúc nào, các nghi thức diễn ra khi nào, về lúc nào. Chỉ cần 5-7 hoạt động là vừa.</Helper>
        </div>
      )}
    </Section>
  );
}

const bookOpenIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export function Guestbook({ d, set }: P) {
  return (
    <Section title="Sổ lưu bút" icon={bookOpenIcon} enabled={d.guestOn} onEnabled={(v) => set({ guestOn: v })}>
      {!d.guestOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Phần này cho phép khách gửi lời nhắn. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</div>
        </div>
      ) : (
        <div
          className="guestbook-manage-card"
          onClick={() => alert("Trang quản lý lời chúc sổ lưu bút.")}
        >
          <div className="guestbook-icon-wrap">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="guestbook-info">
            <span className="guestbook-count">{d.wishes?.length || 0} lời chúc</span>
            <span className="guestbook-sub">Xem và quản lý</span>
          </div>
          <svg className="guestbook-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
          </svg>
        </div>
      )}
    </Section>
  );
}

export { VN_BANKS };

export function GiftBox({ d, set }: P) {
  const [openModal, setOpenModal] = useState(false);
  const [openOtherModal, setOpenOtherModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  // Hộp thoại của các phương thức khác ngoài VietQR (PayPal, Wise, SEPA, Lời nhắn...)
  const [methodModal, setMethodModal] = useState<{ method: string; initial?: Gift } | null>(null);
  const saveMethod = (g: Omit<Gift, "id">) => {
    const initial = methodModal?.initial;
    set({ gifts: initial ? d.gifts.map((x) => (x.id === initial.id ? { ...x, ...g } : x)) : [...d.gifts, { id: "gift-" + Date.now(), ...g }] });
    setMethodModal(null);
  };

  const [who, setWho] = useState<Gift["who"]>("groom");
  const [customLabel, setCustomLabel] = useState("");
  const [selectedBank, setSelectedBank] = useState<(typeof VN_BANKS)[number] | null>(null);
  const [bankSearch, setBankSearch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [showBankDropdown, setShowBankDropdown] = useState(false);

  const handleOpenAdd = () => {
    setEditId(null);
    setWho("groom");
    setCustomLabel("");
    setSelectedBank(null);
    setAccountNumber("");
    setAccountName("");
    setBankSearch("");
    setOpenModal(true);
  };

  const handleEdit = (g: Gift) => {
    if (isMethodForm(g.type)) {
      setMethodModal({ method: g.type!, initial: g });
      return;
    }
    setEditId(g.id);
    setWho(g.who);
    setCustomLabel(g.customLabel || "");
    const found = VN_BANKS.find((b) => b.code === g.bankCode) || {
      code: g.bankCode,
      name: g.bankName,
      bin: g.bankBin || "970415",
      shortName: g.bankName,
      fullName: g.bankName,
    };
    setSelectedBank(found);
    setAccountNumber(g.accountNumber);
    setAccountName(g.accountName);
    setBankSearch("");
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    set({ gifts: d.gifts.filter((g) => g.id !== id) });
  };

  const handleSave = () => {
    // Như trang gốc: cho lưu cả khi chưa nhập gì (thành mục "VietQR" trống, điền sau)
    const cleanNum = accountNumber.trim().replace(/[\s-]+/g, "");
    const cleanName = accountName.trim().toUpperCase();
    const qrUrl = selectedBank && cleanNum ? `https://api.vietqr.io/image/${selectedBank.bin || "970415"}-${cleanNum}-print.png?accountName=${encodeURIComponent(cleanName)}` : "";
    const bankFields = {
      bankName: selectedBank?.name ?? "",
      bankCode: selectedBank?.code ?? "",
      bankBin: selectedBank?.bin ?? "",
      bankLogo: selectedBank ? `https://api.vietqr.io/img/${selectedBank.code}.png` : "",
    };

    if (editId) {
      set({
        gifts: d.gifts.map((g) =>
          g.id === editId
            ? {
                ...g,
                who,
                customLabel: who === "custom" ? customLabel.trim() : undefined,
                ...bankFields,
                accountNumber: cleanNum,
                accountName: cleanName,
                qrUrl,
              }
            : g
        ),
      });
    } else {
      const newGift: Gift = {
        id: "gift-" + Date.now(),
        who,
        customLabel: who === "custom" ? customLabel.trim() : undefined,
        ...bankFields,
        accountNumber: cleanNum,
        accountName: cleanName,
        qrUrl,
      };
      set({ gifts: [...d.gifts, newGift] });
    }
    setOpenModal(false);
  };

  const getWhoTitle = (g: Gift) => {
    if (g.who === "custom" && g.customLabel) return g.customLabel;
    if (g.who === "groom") return "Chú Rể";
    if (g.who === "bride") return "Cô Dâu";
    return "Tùy chọn";
  };

  const filteredBanks = VN_BANKS.filter(
    (b) =>
      b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      b.code.toLowerCase().includes(bankSearch.toLowerCase())
  );

  return (
    <Section
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      }
      title={d.giftTitle || "Hộp Quà Mừng"}
      onTitle={(v) => set({ giftTitle: v })}
      enabled={d.giftOn}
      onEnabled={(v) => set({ giftOn: v })}
      enabledLabel="Hiện"
    >
      {!d.giftOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Phần này hiển thị mã QR ngân hàng để khách gửi mừng cưới. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</div>
        </div>
      ) : (
        <>
          {/* Display Mode Selector (3 Tabs) */}
          <div className="space-y-3 pt-2">
            <div className="gift-bank-list">
              {d.gifts.length === 0 ? (
                <div className="empty-box">Chưa có phương thức nào. Nhấn nút bên dưới để thêm.</div>
              ) : (
                d.gifts.map((g) => (
                  <div className="gift-bank-card" key={g.id}>
                    <div className={"gift-bank-logo" + (g.bankCode || isMethodForm(g.type) ? "" : " gift-bank-logo-qr")}>
                      {isMethodForm(g.type) ? (
                        <img alt={g.bankName} src={PAYMENT_METHODS.find((m) => m.id === g.type)?.icon} />
                      ) : g.bankCode ? (
                        <img
                          alt={g.bankName}
                          src={g.bankLogo || `https://api.vietqr.io/img/${g.bankCode}.png`}
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2z" /></svg>
                      )}
                    </div>
                    <div className="gift-bank-info">
                      <p className="gift-bank-title">{getWhoTitle(g)}</p>
                      {isMethodForm(g.type) ? (
                        <>
                          {giftLines(g)[0] && <p className="gift-bank-num">{giftLines(g)[0]}</p>}
                          <p className="gift-bank-org">{giftLines(g)[1]}</p>
                        </>
                      ) : (
                        <>
                          {g.accountName && <p className="gift-bank-name">{g.accountName}</p>}
                          {g.accountNumber && <p className="gift-bank-num">{g.accountNumber}</p>}
                          <p className="gift-bank-org">{g.bankName || (g.accountNumber || g.accountName ? "" : "VietQR")}</p>
                        </>
                      )}
                    </div>
                    <div className="gift-bank-actions">
                      <button
                        type="button"
                        className="gift-action-btn"
                        aria-label="Sửa"
                        title="Sửa"
                        onClick={() => handleEdit(g)}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="gift-action-btn delete"
                        aria-label="Xóa"
                        title="Xóa"
                        onClick={() => handleDelete(g.id)}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                className="btn-outline-pill-full"
                onClick={handleOpenAdd}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Thêm tài khoản ngân hàng
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-xs w-full opacity-70 text-center"
                style={{ display: "block", textAlign: "center", margin: "4px auto 0", cursor: "pointer" }}
                data-bot-screenshot-id="editor-gift-add-method"
                onClick={() => setOpenOtherModal(true)}
              >
                Phương thức khác
              </button>
            </div>
          </div>

          {d.gifts.length > 0 && <Field label="Kiểu hiển thị">
            <Segmented inline
              value={d.giftDisplayMode || "gift_box"}
              onChange={(v) => set({ giftDisplayMode: v })}
              options={[
                {
                  value: "gift_box",
                  label: "Hộp quà",
                  icon: (
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                    </svg>
                  ),
                },
                {
                  value: "envelope",
                  label: "Phong bì",
                  icon: (
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  value: "qr_inline",
                  label: "Hiện QR trực tiếp",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5z" />
                      <rect x="6" y="6" width="2" height="2" />
                      <path d="M13 3h8v8h-8V3zm2 2v4h4V5h-4z" />
                      <rect x="16" y="6" width="2" height="2" />
                      <path d="M3 13h8v8H3v-8zm2 2v4h4v-4H5z" />
                      <rect x="6" y="16" width="2" height="2" />
                      <rect x="13" y="13" width="3" height="3" />
                      <rect x="18" y="13" width="3" height="3" />
                      <rect x="13" y="18" width="3" height="3" />
                      <rect x="18" y="18" width="3" height="3" />
                    </svg>
                  ),
                },
              ]}
            />
          </Field>}
        </>
      )}

      {/* MODAL 1: ADD / EDIT VIETQR BANK */}
      {openModal && (
        <Modal
          title={editId ? `Chỉnh sửa ${selectedBank?.shortName || selectedBank?.name || "VietQR"}` : "Thêm VietQR"}
          onClose={() => setOpenModal(false)}
          className="bank-edit-modal-box"
        >
          <div className="bank-edit-form">
            {/* Dành cho */}
            <div className="bank-form-group">
              <label className="bank-form-label">Dành cho</label>
              <div className="bank-who-chips">
                <button
                  type="button"
                  className={`bank-who-chip ${who === "groom" ? "active" : ""}`}
                  onClick={() => setWho("groom")}
                >
                  Chú Rể
                </button>
                <button
                  type="button"
                  className={`bank-who-chip ${who === "bride" ? "active" : ""}`}
                  onClick={() => setWho("bride")}
                >
                  Cô Dâu
                </button>
                <button
                  type="button"
                  className={`bank-who-chip ${who === "custom" ? "active" : ""}`}
                  onClick={() => setWho("custom")}
                >
                  Tùy chọn
                </button>
              </div>
            </div>

            {who === "custom" && (
              <div className="bank-form-group">
                <label className="bank-form-label">Tiêu đề hiển thị</label>
                <input
                  type="text"
                  className="bank-form-input"
                  placeholder="VD: Gia đình Chú Rể, Bố Mẹ..."
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                />
              </div>
            )}

            {/* Ngân hàng */}
            <div className="bank-form-group" style={{ position: "relative" }}>
              <label className="bank-form-label">Ngân hàng</label>
              <svg className="bank-search-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              <input
                type="text"
                className="bank-form-input bank-search-input"
                placeholder="Tìm kiếm ngân hàng..."
                value={bankSearch}
                onChange={(e) => {
                  setBankSearch(e.target.value);
                  setShowBankDropdown(true);
                }}
                onFocus={() => setShowBankDropdown(true)}
              />

              {/* Selected Bank Card (pink container matching media_1792176413994_26d8bd95.png) */}
              {selectedBank && <div className="bank-selected-pink-card">
                <div className="bank-logo-white-box">
                  <img
                    src={`https://api.vietqr.io/img/${selectedBank.code}.png`}
                    alt={selectedBank.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="bank-selected-text-col">
                  <div className="bank-selected-short">{selectedBank.shortName || selectedBank.name}</div>
                  <div className="bank-selected-full">{selectedBank.fullName || selectedBank.name}</div>
                </div>
              </div>}

              {/* Bank dropdown options */}
              {showBankDropdown && bankSearch.trim() && (
                <div className="bank-dropdown-menu">
                  {filteredBanks.map((b) => (
                    <div
                      key={b.code}
                      className="bank-dropdown-row"
                      onClick={() => {
                        setSelectedBank(b);
                        setBankSearch("");
                        setShowBankDropdown(false);
                      }}
                    >
                      <img src={`https://api.vietqr.io/img/${b.code}.png`} alt={b.name} className="w-6 h-6 object-contain" />
                      <div>
                        <div className="bank-row-short">{b.shortName}</div>
                        <div className="bank-row-full">{b.fullName || b.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Số tài khoản */}
            <div className="bank-form-group">
              <label className="bank-form-label">Số tài khoản</label>
              <input
                type="text"
                className="bank-form-input"
                placeholder="Nhập số tài khoản"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            {/* Tên chủ tài khoản */}
            <div className="bank-form-group">
              <label className="bank-form-label">Tên chủ tài khoản</label>
              <input
                type="text"
                className="bank-form-input"
                placeholder="Nhập tên chủ tài khoản"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value.toUpperCase())}
              />
            </div>

            {/* Actions */}
            <div className="bank-form-actions">
              <button
                type="button"
                className="bank-btn-cancel"
                onClick={() => setOpenModal(false)}
              >
                Hủy
              </button>
              <button
                type="button"
                className="bank-btn-save"
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 2: OTHER PAYMENT METHODS (thứ tự và nhóm như trang gốc) */}
      {openOtherModal && (
        <Modal
          title="Chọn phương thức nhận quà"
          onClose={() => setOpenOtherModal(false)}
          className="payment-modal-box"
        >
          <div className="space-y-4 pt-1">
            {[
              { label: "Phổ biến", ids: ["vietqr", "paypal", "wise", "registry"] },
              { label: "Khác", ids: ["upload_qr", "venmo", "cashapp", "revolut", "zelle", "sepa", "bank_generic", "note"] },
            ].map((group) => (
              <div key={group.label}>
                <p className="text-xs uppercase opacity-60 font-semibold mb-2">{group.label}</p>
                <div className="payment-methods-grid">
                  {group.ids.map((id) => PAYMENT_METHODS.find((x) => x.id === id)!).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className="payment-method-card"
                      title={m.description}
                      onClick={() => {
                        setOpenOtherModal(false);
                        if (m.id === "vietqr") handleOpenAdd();
                        else setMethodModal({ method: m.id });
                      }}
                    >
                      <div className="payment-icon-wrap" style={{ backgroundColor: `${m.accent}14` }}>
                        <img alt={m.name} className="w-full h-full object-contain p-1" src={m.icon} />
                      </div>
                      <span className="payment-title">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {methodModal && (
        <GiftMethodModal
          key={methodModal.method + (methodModal.initial?.id ?? "new")}
          method={methodModal.method}
          initial={methodModal.initial}
          onClose={() => setMethodModal(null)}
          onSave={saveMethod}
        />
      )}
    </Section>
  );
}

const thanksIcon = (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
  </svg>
);

export function Thanks({ d, set }: P) {
  return (
    <Section title="Lời cảm ơn" icon={thanksIcon} enabled={d.thanksOn} onEnabled={(v) => set({ thanksOn: v })} enabledLabel="Hiện">
      {!d.thanksOn ? (
        <div className="section-disabled-hint">
          <svg width="18" height="18" fill="none" stroke="#f59e0b" viewBox="0 0 24 24" strokeWidth="2" style={{ flex: "none", marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>Phần này hiển thị lời cảm ơn ở cuối thiệp. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</div>
        </div>
      ) : (
        <Field label="Lời cảm ơn"><Textarea rows={3} placeholder="Cảm ơn bạn đã đến chung vui cùng chúng tôi!" value={d.thanks} onChange={(e) => set({ thanks: e.target.value })} /></Field>
      )}
    </Section>
  );
}

export function Music({ d, set }: P) {
  const [pick, setPick] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const song = MUSIC_LIBRARY.find((s) => d.musicName.toLowerCase().startsWith(s.title.toLowerCase()));

  return (
    <Section
      title="Nhạc nền"
      icon={
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      }
    >
      {d.musicName ? (
        <div className="music-active-container">
          <div className="music-selected-card">
            <button
              type="button"
              className="music-card-play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Dừng" : "Phát"}
            >
              {isPlaying ? (
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: 2 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="music-card-info">
              <h4 className="music-card-title">{song?.title || d.musicName}</h4>
              <p className="music-card-artist">{song?.artist || "Nhạc của bạn"}</p>
            </div>
            {song && <span className="music-card-dur">{song.dur}</span>}
          </div>

          <button
            type="button"
            className="btn-outline-pill-full"
            style={{ marginTop: 12 }}
            onClick={() => setPick(true)}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z" />
            </svg>
            Đổi nhạc khác
          </button>
        </div>
      ) : (
        <div className="music-box-container">
          <div className="music-disc-large">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <p className="music-track-name">Chưa chọn nhạc nền</p>
          <button type="button" className="music-choose-btn" onClick={() => setPick(true)}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            Chọn nhạc
          </button>
        </div>
      )}
      {pick && <MusicPicker current={d.musicName} onPick={(n) => set({ musicName: n })} onClose={() => setPick(false)} />}
    </Section>
  );
}

export function Envelope({ d, set }: P) {
  return (
    <Section title="Phong bì">
      <Field label="Lời mời">
        <Input placeholder="VD: Kính Mời" value={d.envelopeInviteMessage} onChange={(e) => set({ envelopeInviteMessage: e.target.value })} />
      </Field>
      <Helper style={{ marginTop: 0 }}>Áp dụng cho tất cả khách. Để thay đổi riêng từng khách, chỉnh trong phần <a className="link-btn" href="/guests">Quản lý khách mời</a>.</Helper>
    </Section>
  );
}

const shareEnvelopeIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect width="20" height="16" x="2" y="4" rx="2" strokeWidth="1.8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

/** Hoa trang trí của ảnh chia sẻ theo mẫu; mẫu chưa khai báo dùng hoa gradient theo màu chủ đạo. */
const SHARE_DECOR: Record<string, string> = {
  minimalism_darkred: "/images/themes/minimalism-dark-red/flower2-decoration.webp",
};

/** Ảnh phong bì xem trước khi chia sẻ: dựng theo bảng màu của mẫu đang chọn (không dùng ảnh tĩnh chung). */
function ShareEnvelopeCover({ templateId }: { templateId: string }) {
  const theme = TEMPLATE_THEMES[templateId];
  const ink = theme?.ink ?? "#43221c";
  const decor = SHARE_DECOR[templateId];
  return (
    <div className="share-og-envelope-cover share-og-themed" role="img" aria-label="Phong bì thiệp" style={{ background: theme?.cover ?? "#f6efe9", color: ink }}>
      <div className="share-og-themed-veil" />
      {decor ? (
        <>
          <img alt="" aria-hidden="true" className="share-og-decor tl" src={decor} />
          <img alt="" aria-hidden="true" className="share-og-decor br" src={decor} />
        </>
      ) : (
        <>
          <span className="share-og-floral left" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${ink} 12%, transparent 65%)` }} />
          <span className="share-og-floral right" style={{ backgroundImage: `radial-gradient(circle at 80% 50%, ${ink} 12%, transparent 65%)` }} />
        </>
      )}
      <div className="share-og-themed-center">
        <span className="share-og-themed-title">Thiệp Cưới</span>
        <span className="share-og-themed-symbol">❦</span>
      </div>
    </div>
  );
}

export function Share({ d, set }: P) {
  const [showCrop, setShowCrop] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [pendingImg, setPendingImg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onPick = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPendingImg(url);
    setShowCrop(true);
  };

  return (
    <Section title="Ảnh xem trước khi chia sẻ" icon={shareEnvelopeIcon}>
      <Helper style={{ fontSize: 14, lineHeight: "20px", opacity: 0.7 }}>Ảnh hiển thị khi bạn gửi link thiệp qua Zalo, Facebook, Messenger. Chọn 1 trong 2 kiểu bên dưới.</Helper>
      <Segmented
        value={d.shareStyle || "photo"}
        onChange={(v) => set({ shareStyle: v })}
        options={[
          { value: "envelope", label: "Phong bì thiệp" },
          { value: "photo", label: "Ảnh của bạn" },
        ]}
      />
      <Helper style={{ marginTop: -8, marginBottom: -4 }}>
        {d.shareStyle === "photo"
          ? "Ảnh bạn chọn, kèm tên cô dâu chú rể và ngày cưới."
          : "Phong bì thiệp của bạn. Với link mời riêng, ảnh sẽ hiện tên khách được mời."}
      </Helper>

      {d.shareStyle === "photo" && (
        <div className="share-actions-row">
          <button
            type="button"
            className="share-action-card"
            onClick={() => {
              if (d.photos && d.photos.length > 0) {
                setShowGalleryModal(true);
              } else {
                alert("Thư viện ảnh hiện chưa có ảnh nào. Vui lòng thêm ảnh vào Thư viện ảnh trước.");
              }
            }}
          >
            <svg width="22" height="22" fill="none" stroke="#fc0081" viewBox="0 0 24 24" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="#fc0081" />
              <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="share-action-text">Chọn từ thư viện</span>
          </button>

          <button
            type="button"
            className="share-action-card"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                onPick(e.target.files);
                e.target.value = "";
              }}
            />
            <svg width="22" height="22" fill="none" stroke="#fc0081" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m7 9 5-5 5 5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12" />
            </svg>
            <span className="share-action-text">Tải ảnh mới</span>
          </button>
        </div>
      )}

      <p className="share-preview-heading">XEM TRƯỚC</p>

      <div className="share-og-card">
        <div className="share-og-img-box">
          {d.shareStyle === "photo" && (d.customSharePhoto || (d.photos && d.photos[0])) ? (
            <div className="share-og-photo-container">
              <img src={d.customSharePhoto || d.photos[0]} alt="Xem trước" className="share-og-img" />
              <div className="share-og-photo-overlay">
                <span className="share-og-photo-thiep">Thiệp Cưới</span>
              </div>
            </div>
          ) : (
            <ShareEnvelopeCover templateId={d.templateId} />
          )}
        </div>
        <div className="share-og-meta">
          <div className="share-og-domain">CHUNGDOI.COM</div>
          <h4 className="share-og-title">{groomShown(d)} &amp; {brideShown(d)}</h4>
          <p className="share-og-desc">Thân mời quý khách đến dự lễ cưới của {groomShown(d)} &amp; {brideShown(d)}</p>
        </div>
      </div>

      <div className="share-foot-notes">
        {d.shareStyle === "photo" && (
          <p className="share-foot-note">
            {!d.customSharePhoto ? "Chưa chọn ảnh, thiệp đang dùng phong bì." : "Đã chọn ảnh tùy chỉnh cho xem trước."}
          </p>
        )}
        <p className="share-foot-note">
          Dòng chữ dưới ảnh gồm lời mời, tên hai bạn, ngày tổ chức và địa chỉ trong phần tiệc. Thiệp chỉ lưu một địa chỉ, nên phần xem trước luôn hiện nơi đó, không hiện nơi làm lễ.
        </p>
        <p className="share-foot-note">
          Zalo và Facebook lưu tạm ảnh xem trước, nên ảnh có thể chưa cập nhật ngay sau khi bạn chỉnh sửa. Nếu cần làm mới,{" "}
          <a
            href="#refresh"
            className="share-foot-link"
            onClick={(e) => {
              e.preventDefault();
              alert("Để Zalo/Facebook cập nhật ảnh xem trước mới, hãy sử dụng công cụ Chia sẻ lại (Facebook Sharing Debugger hoặc gửi lại link trên Zalo).");
            }}
          >
            xem hướng dẫn tại đây.
          </a>
        </p>
      </div>

      {showCrop && pendingImg && (
        <CropModal
          title="Cắt ảnh xem trước (1200×630)"
          aspect={1200 / 630}
          src={pendingImg}
          zoom0={1}
          x0={50}
          y0={50}
          onClose={() => setShowCrop(false)}
          onApply={(z, x, y) => {
            set({ customSharePhoto: pendingImg });
            setShowCrop(false);
          }}
        />
      )}

      {showGalleryModal && (
        <Modal title="Chọn ảnh từ thư viện" onClose={() => setShowGalleryModal(false)}>
          <div className="share-gallery-modal-grid">
            {d.photos.map((p, i) => (
              <button
                key={i}
                type="button"
                className="share-gallery-modal-item"
                onClick={() => {
                  set({ customSharePhoto: p });
                  setShowGalleryModal(false);
                }}
              >
                <img src={p} alt={`Ảnh ${i + 1}`} />
              </button>
            ))}
          </div>
        </Modal>
      )}
    </Section>
  );
}
