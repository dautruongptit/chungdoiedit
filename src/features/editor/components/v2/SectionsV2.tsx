// Tệp sinh bằng scripts/_mksections2.cjs rồi chỉnh tay theo số đo của trang gốc.
import { useEffect, useRef, useState } from "react";
import MusicPicker, { MUSIC_LIBRARY } from "@/features/editor/components/MusicPicker";
import { CropModal } from "@/components/common/CropModal";
import type { Inv, Gift } from "@/types/invitation";
import { groomShown, brideShown } from "@/utils/format";
import { Hint, Modal, ResetInput, Segmented, Field, Icon } from "@/components/ui/ui";
import { Card2, Field2, Row2, Input2, Textarea2, Sub2, Divider2, Hint2, Helper2, Toggle2, OutlineButton2, Seg2 } from "@/features/editor/components/v2/ui2";
import { introDefaultFor } from "@/features/templates/data/templates";
import { TEMPLATE_THEMES } from "@/features/invitation/config/templateThemes";
import { VN_BANKS } from "@/features/editor/constants/banks";
import { PAYMENT_METHODS } from "@/features/editor/constants/paymentMethods";
import GiftMethodModal, { isMethodForm, giftLines } from "@/features/editor/components/GiftMethodModal";

type P = { d: Inv; set: (p: Partial<Inv>) => void };

const familyIcon = (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export function Family({ d, set }: P) {
  return (
    <Card2 title="Thông tin gia đình" icon={familyIcon} enabled={d.familyOn} onEnabled={(v) => set({ familyOn: v })} enabledLabel="Hiện">
      {!d.familyOn ? (
        <Hint2>Phần này hiển thị thông tin gia đình hai bên. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</Hint2>
      ) : (
        <>
          <Sub2>Nhà trai</Sub2>
          <Field2 label={"Danh xưng"}><Input2 placeholder="VD: Ông Bà" value={d.groomFamTitle} onChange={(e) => set({ groomFamTitle: e.target.value })} /></Field2>
          <Row2>
            <Field2 label={"Ông"}><Input2 placeholder="VD: Nguyễn Văn Hùng" value={d.groomFather} onChange={(e) => set({ groomFather: e.target.value })} /></Field2>
            <Field2 label={"Bà"}><Input2 placeholder="VD: Trần Thị Lan" value={d.groomMother} onChange={(e) => set({ groomMother: e.target.value })} /></Field2>
          </Row2>
          <Field2 label={"Địa chỉ nhà trai"}><Textarea2 rows={2} placeholder="Địa chỉ nhà trai" value={d.groomAddr} onChange={(e) => set({ groomAddr: e.target.value })} /></Field2>
          <Divider2 />
          <Sub2>Nhà gái</Sub2>
          <Field2 label={"Danh xưng"}><Input2 placeholder="VD: Ông Bà" value={d.brideFamTitle} onChange={(e) => set({ brideFamTitle: e.target.value })} /></Field2>
          <Row2>
            <Field2 label={"Ông"}><Input2 placeholder="VD: Trần Văn Minh" value={d.brideFather} onChange={(e) => set({ brideFather: e.target.value })} /></Field2>
            <Field2 label={"Bà"}><Input2 placeholder="VD: Phạm Thị Hoa" value={d.brideMother} onChange={(e) => set({ brideMother: e.target.value })} /></Field2>
          </Row2>
          <Field2 label={"Địa chỉ nhà gái"}><Textarea2 rows={2} placeholder="Địa chỉ nhà gái" value={d.brideAddr} onChange={(e) => set({ brideAddr: e.target.value })} /></Field2>
        </>
      )}
    </Card2>
  );
}

const announceIcon = (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2v3h-2V3h-3V1h3a2 2 0 0 1 2 2zm-8-1H9a4 4 0 0 0-4 4v1H3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a4 4 0 0 0 4 4h3v-2H9a2 2 0 0 1-2-2v-1h5l6 4V4l-6 4H7V7a2 2 0 0 1 2-2h3V1z" />
  </svg>
);

export function Announce({ d, set }: P) {
  return (
    <Card2 title="Lời thông báo" icon={announceIcon} enabled={d.announceOn} onEnabled={(v) => set({ announceOn: v })} enabledLabel="Hiện">
      {!d.announceOn ? (
        <Hint2>Phần này hiển thị lời thông báo trên thiệp. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</Hint2>
      ) : (
        <Field2 label={"Câu thông báo (để trống nếu không muốn hiện)"}>
          <Textarea2 rows={2} placeholder={"VD: TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}
            value={[d.announcementLine1, d.announcementLine2].filter((x) => x !== undefined).join("\n")}
            onChange={(e) => { const [a = "", ...r] = e.target.value.split("\n"); set({ announcementLine1: a, announcementLine2: r.join("\n") }); }} />
        </Field2>
      )}
    </Card2>
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
    <Card2 title="Lễ" icon={ceremonyClockIcon}>
      <Field2 label={"Tiêu đề mục"}><Input2 value={d.ceremonyTitle} onChange={(e) => set({ ceremonyTitle: e.target.value })} /></Field2>
      <Helper2>Tiêu đề in phía trên mục này trên thiệp. Để trống nếu bạn muốn bỏ hẳn.</Helper2>
      {d.ceremonies.length === 0 && (
        <Hint2>Bạn có tổ chức lễ vu quy/lễ thành hôn tại nhà không? Nếu có, hãy bấm nút bên dưới để thêm lễ!</Hint2>
      )}
      {d.ceremonies.map((c, i) => (
        <div className="mini-col" key={i}>
          <Row2>
            <Field2 label={"Tên lễ"}><Input2 placeholder="Ví dụ: Lễ gia tiên" value={c.title} onChange={(e) => upd(i, { title: e.target.value })} /></Field2>
            <button className="icon-ghost sm" aria-label="Xoá lễ" onClick={() => set({ ceremonies: d.ceremonies.filter((_, j) => j !== i) })}>{Icon.trash()}</button>
          </Row2>
          <Row2>
            <Field2 label={"Ngày"}>
              <input
                type="date"
                className="input input-sm w-full text-base sm:text-sm"
                value={c.date}
                onChange={(e) => upd(i, { date: e.target.value })}
                onClick={(e) => {
                  try {
                    (e.currentTarget as any).showPicker?.();
                  } catch {}
                }}
              />
            </Field2>
            <Field2 label={"Giờ"}>
              <input
                type="time"
                className="input input-sm w-full text-base sm:text-sm"
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
            </Field2>
          </Row2>
          <Field2 label={"Địa điểm"}><Input2 value={c.place} onChange={(e) => upd(i, { place: e.target.value })} /></Field2>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline btn-sm w-full mt-2"
        onClick={() => set({ ceremonies: [...d.ceremonies, { title: "", date: "", time: "", place: "" }] })}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        Thêm lễ
      </button>
    </Card2>
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
    <Card2 title="Tiệc cưới" icon={cakeIcon} enabled={d.partyOn} onEnabled={(v) => set({ partyOn: v })} enabledLabel="Hiện">
      {!d.partyOn ? (
        <Hint2>Phần này hiển thị thông tin tiệc cưới (ngày, giờ, địa điểm, bản đồ). Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp! Ẩn phần này cũng ẩn luôn bản đồ địa điểm, vì công tắc riêng của bản đồ nằm bên trong phần này.</Hint2>
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
          <Field2 label={"Tiêu đề mục"}>
            <Input2 value={d.banquetTitle} onChange={(e) => set({ banquetTitle: e.target.value })} />
          </Field2>
          <Helper2 style={{ marginBottom: -4 }}>Tiêu đề in phía trên mục này trên thiệp. Để trống nếu bạn muốn bỏ hẳn.</Helper2>
          <Field2 label={"Ngày tổ chức"}>
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
          </Field2>

          <Field2 label={"Giờ tổ chức"}>
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
          </Field2>
          <Helper2 style={{ marginBottom: -4 }}>Giờ chính hiển thị lớn trên thiệp, dùng cho đếm ngược và thêm vào lịch.</Helper2>

          <Field2 label={"Định dạng giờ"}>
            <Segmented
              size="sm"
              value={d.clock}
              onChange={(v) => set({ clock: v })}
              options={[
                { value: "24h", label: "24 giờ" },
                { value: "ampm", label: "Sáng/Chiều" },
              ]}
            />
          </Field2>

          <div className="banquet-extra-card">
            <div className="banquet-extra-header">
              <span className="banquet-extra-title">Giờ Đón khách &amp; Khai tiệc</span>
              <div className="banquet-toggle-wrap">
                <span className="banquet-toggle-status">{d.hideWelcomeTimes ? "Ẩn" : "Hiện"}</span>
                <Toggle2 on={!d.hideWelcomeTimes} onChange={(v) => set({ hideWelcomeTimes: !v })} />
              </div>
            </div>
            <p className="banquet-extra-help">Thiệp chỉ hiển thị giờ tổ chức. Bật để thêm giờ đón khách và khai tiệc.</p>
            {!d.hideWelcomeTimes && (
              <Row2>
                <Field2 label={"Giờ đón khách"}>
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
                </Field2>
                <Field2 label={"Giờ khai tiệc"}>
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
                </Field2>
              </Row2>
            )}
          </div>

          <div className="banquet-row-toggle">
            <span className="banquet-row-title">Đồng hồ đếm ngược</span>
            <div className="banquet-toggle-wrap">
              <span className="banquet-toggle-status">{d.countdown ? "Hiện" : "Ẩn"}</span>
              <Toggle2 on={d.countdown} onChange={(v) => set({ countdown: v })} />
            </div>
          </div>

          <Field2 label={"Tiêu đề mục địa điểm"}>
            <Input2
              value={d.locTitle || "Tiệc cưới sẽ tổ chức tại"}
              placeholder="Tiệc cưới sẽ tổ chức tại"
              onChange={(e) => set({ locTitle: e.target.value })}
            />
          </Field2>

          <Field2 label={"Địa chỉ"}>
            <Textarea2
              rows={3}
              placeholder="Địa chỉ tiệc cưới"
              value={d.address}
              onChange={(e) => set({ address: e.target.value })}
            />
          </Field2>

          <div className="banquet-row-toggle">
            <span className="banquet-row-title">Bản đồ</span>
            <div className="banquet-toggle-wrap">
              <span className="banquet-toggle-status">{d.showMap ? "Hiện" : "Ẩn"}</span>
              <Toggle2 on={d.showMap} onChange={(v) => set({ showMap: v })} />
            </div>
          </div>
          <Helper2>Bản đồ nằm trong phần này, nên ẩn cả phần thì bản đồ cũng ẩn theo, và công tắc riêng của bản đồ nằm ngay ở đây.</Helper2>

          {d.showMap && <MapBox d={d} set={set} />}
        </>
      )}
    </Card2>
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
    <Card2 title="Xác nhận tham dự (RSVP)" icon={rsvpIcon} enabled={d.rsvpOn} onEnabled={(v) => set({ rsvpOn: v })} enabledLabel="Hiện">
      {!d.rsvpOn ? (
        <Hint2>Cho phép khách mời xác nhận tham dự và số lượng khách. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</Hint2>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start gap-2.5 p-3 bg-base-200/50 rounded-lg text-sm">
            <svg className="w-4 h-4 text-info shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium">Khách mời có thể xác nhận tham dự trực tiếp trên thiệp</p>
              <p className="text-xs opacity-60 mt-0.5">Xem danh sách xác nhận trong trang Quản lý khách mời</p>
            </div>
          </div>
          <Seg2 label="Kiểu hiển thị" value={d.rsvpDisplay} onChange={(v) => set({ rsvpDisplay: v })} options={[{ value: "button", label: "Nút bấm" }, { value: "inline", label: "Hiện trực tiếp" }]} help={d.rsvpDisplay === "button" ? "Khách bấm nút để mở form xác nhận trong cửa sổ popup" : "Form xác nhận hiển thị trực tiếp trên thiệp"} />
          <Seg2 label="Số người mỗi thiệp" value={d.partyMode} onChange={(v) => set({ partyMode: v })} options={[{ value: "free", label: "Khách tự chọn" }, { value: "limit", label: "Giới hạn" }]} help={d.partyMode === "free" ? "Khách tự điền số người sẽ đến." : "Giới hạn số người tối đa cho mỗi thiệp."} helpClass="mt-1.5 text-[11px] leading-snug opacity-60" />
          {d.partyMode === "limit" && (
            <Field2 label={"Giới hạn tối đa"}><Input2 type="number" min={1} value={d.partyLimit} onChange={(e) => set({ partyLimit: Math.max(1, Number(e.target.value) || 1) })} /></Field2>
          )}
          <Field2 label={"Câu hỏi thêm cho khách mời"} cap>
            <div className="space-y-2 ">
              <p className="text-base-content/60 text-xs">Khách trả lời khi xác nhận tham dự trên thiệp</p>
              {d.questions.map((q, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input2 value={q} placeholder="Nhập câu hỏi" onChange={(e) => upd(i, e.target.value)} />
                  <button type="button" className="btn btn-ghost btn-sm btn-square" aria-label="Xoá câu hỏi" onClick={() => set({ questions: d.questions.filter((_, j) => j !== i) })}>{Icon.trash()}</button>
                </div>
              ))}
              <button type="button" className="btn btn-outline w-full btn-sm" onClick={() => set({ questions: [...d.questions, ""] })}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Thêm câu hỏi
              </button>
            </div>
          </Field2>
        </div>
      )}
    </Card2>
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
    <Card2 title="Dress Code" icon={dressIcon} enabled={d.dressOn} onEnabled={(v) => set({ dressOn: v })}>
      {!d.dressOn ? (
        <Hint2>Bật để gợi ý trang phục cho khách mời theo màu sắc chủ đạo của tiệc cưới.</Hint2>
      ) : (
        <>
          <Field2 label={"Tiêu đề"}>
            <Input2
              value={d.dressTitle || "DRESS CODE"}
              placeholder="DRESS CODE"
              onChange={(e) => set({ dressTitle: e.target.value })}
            />
          </Field2>
          <Field2 label={"Mô tả"}>
            <Textarea2
              rows={3}
              value={d.dressText || "Trang phục dự tiệc"}
              placeholder="Trang phục dự tiệc"
              onChange={(e) => set({ dressText: e.target.value })}
            />
          </Field2>
          <Field2 label={"Màu sắc"}>
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
          </Field2>

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
    </Card2>
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
    <Card2
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
        <Hint2>Bật để hiển thị lịch trình các hoạt động trong ngày cưới (đón khách, lễ gia tiên, khai tiệc...) cho khách dễ theo dõi.</Hint2>
      ) : (
        <div className="sched-wrap">
          <Field2 label={"Tiêu đề"}>
            <Input2
              value={d.schedTitle || "LỊCH TRÌNH NGÀY CƯỚI"}
              placeholder="LỊCH TRÌNH NGÀY CƯỚI"
              onChange={(e) => set({ schedTitle: e.target.value })}
            />
          </Field2>
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
                <Input2
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

        <Helper2>Khách mời sẽ yên tâm hơn khi biết: đến lúc nào, các nghi thức diễn ra khi nào, về lúc nào. Chỉ cần 5-7 hoạt động là vừa.</Helper2>
        </div>
      )}
    </Card2>
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
    <Card2 title="Sổ lưu bút" icon={bookOpenIcon} enabled={d.guestOn} onEnabled={(v) => set({ guestOn: v })}>
      {!d.guestOn ? (
        <Hint2>Phần này cho phép khách gửi lời nhắn. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</Hint2>
      ) : (
        <a
          className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-base-200/50 hover:bg-base-200 active:bg-base-300 transition-colors"
          href="#"
          onClick={(e) => { e.preventDefault(); alert("Trang quản lý lời chúc sổ lưu bút."); }}
        >
          <div className="w-9 h-9 rounded-lg bg-base-100 border border-base-200 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-base-content/45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-base-content leading-tight">{d.wishes?.length || 0} lời chúc</p>
            <p className="text-xs text-base-content/50 leading-tight mt-0.5">Xem và quản lý</p>
          </div>
          <svg className="w-4 h-4 text-base-content/30 shrink-0 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </Card2>
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
    <Card2
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
        <Hint2>Phần này hiển thị mã QR ngân hàng để khách gửi mừng cưới. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</Hint2>
      ) : (
        <>
          {/* Display Mode Selector (3 Tabs) */}
          <div className="space-y-3">
            <div className="gift-bank-list">
              {d.gifts.length === 0 ? (
                <div className="rounded-lg border border-dashed border-base-300 p-6 text-center text-sm opacity-60">Chưa có phương thức nào. Nhấn nút bên dưới để thêm.</div>
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
                className="btn btn-outline btn-sm w-full"
                onClick={handleOpenAdd}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Thêm tài khoản ngân hàng
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-xs w-full opacity-70"
                data-bot-screenshot-id="editor-gift-add-method"
                onClick={() => setOpenOtherModal(true)}
              >
                Phương thức khác
              </button>
            </div>
          </div>

          <dialog className="modal" />
          {d.gifts.length > 0 && <Field2 label={"Kiểu hiển thị"}>
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
          </Field2>}
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
    </Card2>
  );
}

const thanksIcon = (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
  </svg>
);

export function Thanks({ d, set }: P) {
  return (
    <Card2 title="Lời cảm ơn" icon={thanksIcon} enabled={d.thanksOn} onEnabled={(v) => set({ thanksOn: v })} enabledLabel="Hiện">
      {!d.thanksOn ? (
        <Hint2>Phần này hiển thị lời cảm ơn ở cuối thiệp. Bật công tắc ở trên nếu bạn muốn hiện phần này trên thiệp!</Hint2>
      ) : (
        <Field2 label={"Lời cảm ơn"}><Textarea2 rows={3} placeholder="Cảm ơn bạn đã đến chung vui cùng chúng tôi!" value={d.thanks} onChange={(e) => set({ thanks: e.target.value })} /></Field2>
      )}
    </Card2>
  );
}

export function Music({ d, set }: P) {
  const [pick, setPick] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const song = MUSIC_LIBRARY.find((s) => d.musicName.toLowerCase().startsWith(s.title.toLowerCase()));

  return (
    <Card2
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
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-base-content/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <p className="text-sm text-base-content/60">Chưa chọn nhạc nền</p>
          <button type="button" className="btn btn-primary gap-2" onClick={() => setPick(true)}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            Chọn nhạc
          </button>
        </div>
      )}
      {pick && <MusicPicker current={d.musicName} onPick={(n) => set({ musicName: n })} onClose={() => setPick(false)} />}
    </Card2>
  );
}

const mailIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

export function Envelope({ d, set }: P) {
  return (
    <Card2 title="Phong bì" icon={mailIcon}>
      <Field2 label={"Lời mời"}>
        <Input2 placeholder="VD: Kính Mời" value={d.envelopeInviteMessage} onChange={(e) => set({ envelopeInviteMessage: e.target.value })} />
      </Field2>
      <p className="text-xs text-base-content/40">Áp dụng cho tất cả khách. Để thay đổi riêng từng khách, chỉnh trong phần <a href="/guests" className="underline hover:text-primary transition-colors">Quản lý khách mời</a>.</p>
    </Card2>
  );
}

const shareEnvelopeIcon = mailIcon;

/** Hoa trang trí của ảnh chia sẻ theo mẫu; mẫu chưa khai báo dùng hoa gradient theo màu chủ đạo. */
const SHARE_DECOR: Record<string, string> = {
  minimalism_darkred: "/images/themes/minimalism-dark-red/flower2-decoration.webp",
};

/** Khung xem trước 1200×630 thu nhỏ theo bề rộng thẻ (như trang gốc: scale = bề rộng / 1200). */
function ShareScaled({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2575);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const upd = () => setScale(el.clientWidth / 1200);
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="relative w-full overflow-hidden bg-base-200" style={{ aspectRatio: "1200 / 630" }}>
      <div dir="ltr" className="absolute top-0 left-0 origin-top-left" style={{ width: 1200, height: 630, transform: `scale(${scale})` }}>
        <div style={{ margin: 0, padding: 0, background: "#0b0b0b", width: 1200, height: 630, overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
}

/** Ảnh phong bì xem trước khi chia sẻ: dựng theo bảng màu của mẫu đang chọn (không dùng ảnh tĩnh chung). */
function ShareEnvelopeCover({ templateId }: { templateId: string }) {
  const theme = TEMPLATE_THEMES[templateId];
  const ink = theme?.ink ?? "#43221c";
  const decor = SHARE_DECOR[templateId] ?? `/images/themes/${templateId.replace(/_/g, "-")}/flower2-decoration.webp`;
  return (
    <div id="og-capture" style={{ position: "relative", width: 1200, height: 630, overflow: "hidden", background: theme?.cover ?? "#f6efe9", fontFamily: 'Lora, "Times New Roman", ChungDoiIndic, serif' }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(255, 250, 245, 0.96)" }} />
      <img alt="" aria-hidden="true" className="absolute pointer-events-none w-[340px] top-[5%] left-[-10%] -translate-x-[10%] -translate-y-[10%] opacity-80 rotate-[25deg]" src={decor} />
      <img alt="" aria-hidden="true" className="absolute pointer-events-none w-[340px] bottom-[-5%] right-[-10%] translate-x-[10%] translate-y-[10%] -scale-x-100 opacity-80 -rotate-[25deg]" src={decor} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: '"EB Garamond", ChungDoiIndic, serif', color: ink, fontSize: 64, lineHeight: 1.05, WebkitTextStroke: `0.5px ${ink}`, paintOrder: "stroke" }}>Thiệp Cưới</span>
          <div style={{ color: ink, fontSize: 28, letterSpacing: 6, margin: "6px 0" }}>❦</div>
        </div>
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
    <Card2 title="Ảnh xem trước khi chia sẻ" icon={shareEnvelopeIcon}>
      <div className="space-y-3">
        <p className="text-sm opacity-70">Ảnh hiển thị khi bạn gửi link thiệp qua Zalo, Facebook, Messenger. Chọn 1 trong 2 kiểu bên dưới.</p>
        <Seg2
          value={d.shareStyle || "envelope"}
          onChange={(v) => set({ shareStyle: v })}
          options={[
            { value: "envelope", label: "Phong bì thiệp" },
            { value: "photo", label: "Ảnh của bạn" },
          ]}
        />
        <p className="text-xs opacity-60">
          {d.shareStyle === "photo"
            ? "Ảnh bạn chọn, kèm tên cô dâu chú rể và ngày cưới."
            : "Phong bì thiệp của bạn. Với link mời riêng, ảnh sẽ hiện tên khách được mời."}
        </p>

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

            <button type="button" className="share-action-card" onClick={() => fileInputRef.current?.click()}>
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

        <div>
          <p className="text-[10px] font-medium text-base-content/40 uppercase tracking-wider rtl:tracking-normal mb-2">Xem trước</p>
          <div className="overflow-hidden rounded-lg ring-1 ring-base-content/10 bg-base-100">
            <ShareScaled>
              {d.shareStyle === "photo" && (d.customSharePhoto || (d.photos && d.photos[0])) ? (
                <div style={{ position: "relative", width: 1200, height: 630, overflow: "hidden", background: "#0b0b0b" }}>
                  <img src={d.customSharePhoto || d.photos[0]} alt="Xem trước" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ) : (
                <ShareEnvelopeCover templateId={d.templateId} />
              )}
            </ShareScaled>
            <div className="border-t border-base-content/10 bg-base-200/60 px-3 py-2 text-start">
              <p className="text-[10px] uppercase tracking-wide text-base-content/50 truncate">chungdoi.com</p>
              <p className="text-sm font-semibold leading-snug truncate">{groomShown(d)} &amp; {brideShown(d)}</p>
              <p className="text-xs leading-snug text-base-content/70 line-clamp-2">Thân mời quý khách đến dự lễ cưới của {groomShown(d)} &amp; {brideShown(d)}</p>
            </div>
          </div>
          {d.shareStyle === "photo" && (
            <p className="text-[11px] opacity-60 mt-1.5 leading-relaxed">
              {!d.customSharePhoto ? "Chưa chọn ảnh, thiệp đang dùng phong bì." : "Đã chọn ảnh tùy chỉnh cho xem trước."}
            </p>
          )}
          <p className="text-[11px] opacity-60 mt-1.5 leading-relaxed">Dòng chữ dưới ảnh gồm lời mời, tên hai bạn, ngày tổ chức và địa chỉ trong phần tiệc. Thiệp chỉ lưu một địa chỉ, nên phần xem trước luôn hiện nơi đó, không hiện nơi làm lễ.</p>
          <p className="text-[11px] opacity-60 mt-1.5 leading-relaxed">
            Zalo và Facebook lưu tạm ảnh xem trước, nên ảnh có thể chưa cập nhật ngay sau khi bạn chỉnh sửa. Nếu cần làm mới,{" "}
            <a
              href="/vi/lam-moi-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
              onClick={(e) => {
                e.preventDefault();
                alert("Để Zalo/Facebook cập nhật ảnh xem trước mới, hãy sử dụng công cụ Chia sẻ lại (Facebook Sharing Debugger hoặc gửi lại link trên Zalo).");
              }}
            >
              xem hướng dẫn tại đây.
            </a>
          </p>
        </div>
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
    </Card2>
  );
}
