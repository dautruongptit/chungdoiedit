import React, { useState } from "react";
import type { Inv, RsvpResponse } from "@/types/invitation";

/**
 * Hộp thoại "Xác nhận tham dự" của mẫu Nâu — dựng theo HTML đo từ trang gốc (chungdoi.com, ?open=1):
 * lớp phủ fixed + hộp trắng bo 2xl, form: tên → "Bạn sẽ đến chứ?" (2 lựa chọn) → [số khách + lời nhắn khi chọn "đến"] → nút gửi.
 * Màu nút lấy từ chủ đề của mẫu (btnBg / btnText).
 */
export function BrownRsvpDialog({
  d,
  set,
  onClose,
  btnBg = "rgb(124, 106, 96)",
  btnText = "rgb(222, 217, 215)",
}: {
  d: Inv;
  set: (p: Partial<Inv>) => void;
  onClose: () => void;
  btnBg?: string;
  btnText?: string;
}) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"" | "yes" | "no">("");
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const maxCount = d.partyMode === "limit" ? Math.max(1, d.partyLimit || 1) : 20;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attending) return;
    const now = new Date();
    const at = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const rec: RsvpResponse = { name: name.trim(), phone: "", attending, count: String(attending === "yes" ? count : 0), answers: {}, note: note.trim(), at };
    set({ rsvps: [rec, ...(d.rsvps || [])] });
    setSent(true);
  };

  const tick = (cls: string) => (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
  );
  const cross = (cls: string) => (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
  );

  return (
    <dialog className="modal modal-bottom sm:modal-middle modal-open" open>
      <div className="modal-box max-w-md p-0 max-h-[90vh] overflow-y-auto bg-white rounded-2xl">
        <div className="relative px-6 pt-6 pb-4">
          <button type="button" onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-gray-500 hover:text-gray-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-72px)]">
          {sent ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1"><span dir="auto">Cảm ơn bạn!</span></h2>
              <div className="text-sm text-gray-500 mb-6"><span dir="auto">Chúng tôi đã nhận được xác nhận của bạn.</span></div>
              <button type="button" className="w-full py-3.5 text-sm font-semibold rounded-xl" style={{ backgroundColor: btnBg, color: btnText }} onClick={onClose}><span dir="auto">Đóng</span></button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1"><span dir="auto">Xác nhận tham dự</span></h2>
              <div className="text-sm text-gray-500 mb-6"><span dir="auto">Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi. Xin xác nhận để chúng tôi chuẩn bị chu đáo nhất.</span></div>
              <form className="space-y-4" onSubmit={submit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5"><span dir="auto">Tên của bạn</span></label>
                  <input required placeholder="Nhập tên của bạn" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow placeholder:text-gray-400 bg-white text-gray-900" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><span dir="auto">Bạn sẽ đến chứ?</span></label>
                  <div className="space-y-2">
                    <label className={"flex items-center gap-3 py-2.5 px-3 rounded-xl border-2 cursor-pointer transition-all duration-200 " + (attending === "yes" ? "border-emerald-500 bg-emerald-50/50" : "border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50")}>
                      <input className="sr-only" type="radio" value="yes" name="attending" checked={attending === "yes"} onChange={() => setAttending("yes")} />
                      <div className={"w-8 h-8 rounded-full flex items-center justify-center transition-colors " + (attending === "yes" ? "bg-emerald-500" : "bg-gray-200")}>{tick("w-4 h-4 " + (attending === "yes" ? "text-white" : "text-gray-500"))}</div>
                      <span className="text-sm font-medium text-gray-700"><span dir="auto">Tôi sẽ đến</span></span>
                    </label>
                    <label className={"flex items-center gap-3 py-2.5 px-3 rounded-xl border-2 cursor-pointer transition-all duration-200 " + (attending === "no" ? "border-red-400 bg-red-50/50" : "border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50")}>
                      <input className="sr-only" type="radio" value="no" name="attending" checked={attending === "no"} onChange={() => setAttending("no")} />
                      <div className={"w-8 h-8 rounded-full flex items-center justify-center transition-colors " + (attending === "no" ? "bg-red-400" : "bg-gray-200")}>{cross("w-4 h-4 " + (attending === "no" ? "text-white" : "text-gray-500"))}</div>
                      <span className="text-sm font-medium text-gray-700"><span dir="auto">Rất tiếc, tôi không thể đến</span></span>
                    </label>
                  </div>
                </div>
                {attending === "yes" && (
                  <>
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                        <label className="min-w-0 flex-1 basis-28 text-sm font-medium text-gray-700"><span dir="auto">Số lượng khách (bao gồm bạn)</span></label>
                        <div className="ms-auto flex shrink-0 items-center gap-2.5">
                          <button type="button" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent" disabled={count <= 1} onClick={() => setCount((c) => Math.max(1, c - 1))}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                          </button>
                          <span className="w-8 text-center text-lg font-semibold text-gray-900">{count}</span>
                          <button type="button" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent" disabled={count >= maxCount} onClick={() => setCount((c) => Math.min(maxCount, c + 1))}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200 space-y-1.5">
                      <label className="block text-sm font-medium text-gray-700"><span dir="auto">Lời nhắn cho cô dâu chú rể</span></label>
                      <textarea rows={3} maxLength={1000} placeholder="Để lại lời nhắn (không bắt buộc)" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-base sm:text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow placeholder:text-gray-400 resize-none" value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                  </>
                )}
                <button type="submit" disabled={!name.trim() || !attending} className="w-full py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none" style={{ backgroundColor: btnBg, color: btnText, boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 12px -2px" }}>
                  <span dir="auto">Gửi xác nhận</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}><button type="button">close</button></div>
    </dialog>
  );
}
