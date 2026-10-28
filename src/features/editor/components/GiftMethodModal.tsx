import { useState } from "react";
import { Modal } from "@/components/ui/ui";
import type { Gift } from "@/types/invitation";
import { PAYMENT_METHODS } from "@/features/editor/constants/paymentMethods";

type FieldDef = { key: string; label: string; placeholder?: string; required?: boolean; help?: string; textarea?: boolean };
type FormDef = {
  /** Tiêu đề hộp thoại: "Thêm {title}" */
  title: string;
  info?: string;
  fields: FieldDef[];
  /** Ô tải ảnh mã QR (phương thức "Ảnh mã QR") */
  upload?: boolean;
  /** Ô chọn "Ẩn mã QR" kèm lời giải thích */
  hideQr?: string;
  /** Nút Lưu bị khóa (mờ) cho tới khi nhập đủ ô bắt buộc */
  strict?: boolean;
  /** Ô dùng làm dòng chính / dòng phụ khi hiển thị trên thẻ và trong thiệp */
  primary: string;
  secondary?: string;
};

/** Các ô của từng phương thức nhận quà, theo trang gốc (mọi phương thức ngoài VietQR). */
export const METHOD_FORMS: Record<string, FormDef> = {
  paypal: {
    title: "PayPal", primary: "account",
    fields: [{ key: "account", label: "Tài khoản PayPal", placeholder: "yourname", required: true, help: "Tên người dùng PayPal.me của bạn" }],
  },
  wise: {
    title: "Wise", primary: "link",
    fields: [{ key: "link", label: "Liên kết Wise", placeholder: "https://wise.com/pay/me/yourname", required: true, help: "Tạo trong ứng dụng Wise → Receive → Payment link." }],
  },
  registry: {
    title: "Danh sách quà cưới", primary: "url", secondary: "name",
    fields: [
      { key: "name", label: "Tên hiển thị", placeholder: "Honeyfund / Zola / ...", required: true },
      { key: "url", label: "Đường dẫn danh sách quà", placeholder: "https://...", required: true },
    ],
    hideQr: "Chỉ hiển thị nút bấm, không hiện mã QR. Dùng khi bạn chỉ muốn khách bấm thẳng vào đường dẫn.",
  },
  upload_qr: {
    title: "Ảnh mã QR", primary: "caption", upload: true, strict: true,
    fields: [{ key: "caption", label: "Chú thích (tùy chọn)", placeholder: "Ví dụ: tên chủ tài khoản" }],
  },
  venmo: {
    title: "Venmo", primary: "account",
    fields: [{ key: "account", label: "Tên Venmo", placeholder: "yourname", required: true }],
  },
  cashapp: {
    title: "Cash App", primary: "account",
    fields: [{ key: "account", label: "$Cashtag", placeholder: "$yourname", required: true }],
  },
  revolut: {
    title: "Revolut", primary: "account",
    fields: [{ key: "account", label: "Tên Revolut", placeholder: "yourname", required: true, help: "Tạo Revolut Pay link trong ứng dụng → Profile." }],
  },
  zelle: {
    title: "Zelle", primary: "contact", secondary: "bank",
    info: "Khách gửi qua ứng dụng ngân hàng Mỹ của họ. Zelle không có liên kết QR công khai, nên thẻ chỉ hiển thị thông tin để khách sao chép.",
    fields: [
      { key: "contact", label: "Email hoặc số điện thoại Mỹ", placeholder: "you@example.com", required: true },
      { key: "bank", label: "Tên ngân hàng (tùy chọn)", placeholder: "Bank of America" },
    ],
  },
  sepa: {
    title: "SEPA", primary: "iban", secondary: "holder",
    info: "Tạo mã QR EPC069-12 cho các ứng dụng ngân hàng EU. Khách quét và tự điền IBAN trong ứng dụng ngân hàng của họ.",
    fields: [
      { key: "iban", label: "IBAN", placeholder: "DE89 3704 0044 0532 0130 00", required: true },
      { key: "holder", label: "Tên chủ tài khoản", placeholder: "Erika Mustermann", required: true },
      { key: "bic", label: "BIC / SWIFT (tùy chọn)", placeholder: "COBADEFFXXX" },
      { key: "bank", label: "Tên ngân hàng (tùy chọn)", placeholder: "Commerzbank" },
    ],
  },
  bank_generic: {
    title: "Ngân hàng", primary: "number", secondary: "holder",
    info: "Dành cho bất kỳ ngân hàng nào không có sẵn ở trên. QR là văn bản thuần để khách sao chép.",
    fields: [
      { key: "bank", label: "Tên ngân hàng", required: true },
      { key: "holder", label: "Tên chủ tài khoản", required: true },
      { key: "number", label: "Số tài khoản" },
      { key: "routing", label: "Routing (US)" },
      { key: "sort", label: "Sort code (UK)" },
      { key: "bsb", label: "BSB (AU)" },
      { key: "iban", label: "IBAN" },
      { key: "swift", label: "SWIFT / BIC" },
      { key: "country", label: "Quốc gia" },
    ],
    hideQr: "Chỉ hiển thị thông tin văn bản, không hiện mã QR. Dùng khi ngân hàng của bạn không có mã QR.",
  },
  note: {
    title: "Lời nhắn", primary: "message", secondary: "title", strict: true,
    fields: [
      { key: "title", label: "Tiêu đề hiển thị", placeholder: "Ví dụ: Nhà Gái", required: true, help: "Tên hiển thị cho hộp quà này" },
      { key: "message", label: "Lời nhắn gửi khách mời", placeholder: "Ví dụ: Mừng cưới tại bàn tiệc.", required: true, textarea: true, help: "Chỉ có chữ, không hiện số tài khoản hay mã QR. Dùng khi khách mừng cưới ngay tại tiệc." },
    ],
  },
};

export const isMethodForm = (type?: string) => !!type && type in METHOD_FORMS;

/** Dòng hiển thị của một mục quà (dùng chung cho thẻ ở editor): [dòng chính, dòng phụ]. */
export function giftLines(g: Gift): [string, string] {
  const def = g.type ? METHOD_FORMS[g.type] : undefined;
  if (!def) return [g.accountNumber || "", g.bankName || ""];
  const f = g.fields || {};
  return [f[def.primary] || "", (def.secondary ? f[def.secondary] : "") || def.title];
}

const isBlank = (v?: string) => !v || !v.trim();

export default function GiftMethodModal({
  method, initial, onClose, onSave,
}: {
  method: string;
  initial?: Gift;
  onClose: () => void;
  onSave: (g: Omit<Gift, "id">) => void;
}) {
  const def = METHOD_FORMS[method];
  const cfg = PAYMENT_METHODS.find((m) => m.id === method);
  const [who, setWho] = useState<Gift["who"]>(initial?.who ?? "groom");
  const [customLabel, setCustomLabel] = useState(initial?.customLabel ?? "");
  const [vals, setVals] = useState<Record<string, string>>(initial?.fields ?? {});
  const [hideQr, setHideQr] = useState(!!initial?.hideQr);
  const [image, setImage] = useState(initial?.qrUrl && method === "upload_qr" ? initial.qrUrl : "");

  const set = (k: string, v: string) => setVals((p) => ({ ...p, [k]: v }));
  const missing = def.fields.some((f) => f.required && isBlank(vals[f.key])) || (def.upload && !image);

  const save = () => {
    if (missing) return;
    const primary = (vals[def.primary] || "").trim();
    const secondary = def.secondary ? (vals[def.secondary] || "").trim() : "";
    onSave({
      who,
      customLabel: who === "custom" ? customLabel.trim() : undefined,
      type: method,
      bankName: method === "bank_generic" ? (vals.bank || "").trim() : def.title,
      bankCode: "",
      bankLogo: cfg?.icon,
      accountNumber: primary,
      accountName: secondary,
      qrUrl: def.upload ? image : "",
      fields: { ...vals },
      hideQr: def.hideQr ? hideQr : undefined,
    });
  };

  const pickImage = (file?: File) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setImage(String(r.result));
    r.readAsDataURL(file);
  };

  return (
    <Modal title={`${initial ? "Chỉnh sửa" : "Thêm"} ${def.title}`} onClose={onClose} className="bank-edit-modal-box">
      <div className="bank-edit-form">
        <div className="bank-form-group">
          <label className="bank-form-label">Dành cho</label>
          <div className="bank-who-chips">
            {([["groom", "Chú Rể"], ["bride", "Cô Dâu"], ["custom", "Tùy chọn"]] as const).map(([k, l]) => (
              <button key={k} type="button" className={`bank-who-chip ${who === k ? "active" : ""}`} onClick={() => setWho(k)}>{l}</button>
            ))}
          </div>
        </div>

        {who === "custom" && (
          <div className="bank-form-group">
            <label className="bank-form-label">Tiêu đề hiển thị</label>
            <input type="text" className="bank-form-input" placeholder="VD: Gia đình Chú Rể, Bố Mẹ..." value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} />
          </div>
        )}

        {def.info && (
          <div className="gm-info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
            <span>{def.info}</span>
          </div>
        )}

        {def.upload && (
          <div className="bank-form-group">
            <label className="bank-form-label">Ảnh mã QR</label>
            <label className="gm-upload">
              {image ? (
                <img src={image} alt="Mã QR" />
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
                  <span>Tải lên mã QR của bạn</span>
                </>
              )}
              <input type="file" accept="image/png,image/jpeg" hidden onChange={(e) => { pickImage(e.target.files?.[0]); e.target.value = ""; }} />
            </label>
            <p className="gm-help gm-center">Ảnh chụp mã QR ngân hàng hoặc ví điện tử (PNG, JPG)</p>
          </div>
        )}

        {def.fields.map((f) => (
          <div className="bank-form-group" key={f.key}>
            <label className="bank-form-label">{f.label}{f.required && <span className="gm-req"> *</span>}</label>
            {f.textarea ? (
              <textarea className="bank-form-input gm-textarea" placeholder={f.placeholder} value={vals[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} />
            ) : (
              <input type="text" className="bank-form-input" placeholder={f.placeholder} value={vals[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} />
            )}
            {f.help && <p className="gm-help">{f.help}</p>}
          </div>
        ))}

        {def.hideQr && (
          <label className="gm-check">
            <input type="checkbox" checked={hideQr} onChange={(e) => setHideQr(e.target.checked)} />
            <span>
              <b>Ẩn mã QR</b>
              <small>{def.hideQr}</small>
            </span>
          </label>
        )}

        <div className="bank-form-actions">
          <button type="button" className="bank-btn-cancel" onClick={onClose}>Hủy</button>
          <button type="button" className="bank-btn-save" disabled={!!def.strict && !!missing} onClick={save}>Lưu</button>
        </div>
      </div>
    </Modal>
  );
}
