import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navigate } from "@/app/router";
import type { Tpl } from "@/features/templates/data/templates";
import { applyTemplateToDraft, createDraft, getDraftCard } from "@/services/storage/store";

/** Hộp thoại khi đã có thiệp nháp mà chọn mẫu khác (markup đo từ trang gốc chungdoi.com). */
function DraftPrompt({ onClose, onApply }: { onClose: () => void; onApply: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  // Vẽ ra document.body trong vùng `.inv-root` để dùng đúng `dialog.modal` của daisyUI, không bị CSS cũ đè.
  return createPortal(
    <div className="inv-root">
      <dialog className="modal modal-open">
        <div className="modal-box max-w-md p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight">Bạn đang có một thiệp nháp</h3>
              <p className="text-base-content/60 text-sm mt-0.5">Mỗi lúc bạn chỉ giữ một thiệp nháp.</p>
            </div>
          </div>
          <div className="mt-5 rounded-xl p-4 bg-base-200/70">
            <p className="text-sm text-base-content/80">Mẫu này sẽ được áp dụng cho thiệp nháp hiện tại của bạn, nên mọi thông tin bạn đã nhập vẫn được giữ nguyên. Chỉ thay đổi giao diện.</p>
          </div>
          <div className="modal-action mt-6 flex-col-reverse gap-2 sm:flex-row sm:gap-3">
            <button className="btn btn-ghost w-full sm:w-auto" onClick={onClose}>Đóng</button>
            <button className="btn btn-primary w-full sm:w-auto" onClick={onApply}>Áp dụng vào thiệp nháp</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onSubmit={(e) => { e.preventDefault(); onClose(); }}><button>close</button></form>
      </dialog>
    </div>,
    document.body,
  );
}

/**
 * Chọn một mẫu: chưa có thiệp nháp thì tạo mới; đã có thì hỏi và áp mẫu vào thiệp nháp hiện tại (giữ dữ liệu).
 * Dùng chung cho mọi chỗ chọn mẫu; nhớ vẽ `prompt` ở trong trang gọi.
 */
export function useChooseTemplate(): { choose: (tpl: Tpl) => void; prompt: ReactNode } {
  const [pending, setPending] = useState<Tpl | null>(null);
  const choose = (tpl: Tpl) => {
    if (getDraftCard()) setPending(tpl);
    else navigate(`/edit/${createDraft(tpl)}?template=${tpl.id}`);
  };
  const apply = () => {
    const card = getDraftCard();
    const tpl = pending;
    if (!card || !tpl) return setPending(null);
    setPending(null);
    navigate(`/edit/${applyTemplateToDraft(card, tpl)}?template=${tpl.id}`);
  };
  return { choose, prompt: pending ? <DraftPrompt onClose={() => setPending(null)} onApply={apply} /> : null };
}
