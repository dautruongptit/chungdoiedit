import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/ui";
import { TEMPLATES, TPL_CDN, templateById, type Tpl } from "@/features/templates/data/templates";
import { previewFocal } from "@/features/templates/data/previewFocal";
import { assetUrl } from "@/services/asset";

export type Mode = "edit" | "preview";

export default function Header({
  mode,
  onMode,
  dirty,
  onPublish,
  onShare,
  isPublished = false,
  templateId = "double_phoenix_red",
  templateName = "Song Phụng - Đỏ",
  templateThumb = assetUrl("/template-previews/vi/landscape/double_phoenix_red.d0f325f5.webp"),
  onSelectTemplate,
}: {
  mode: Mode;
  onMode: (m: Mode) => void;
  dirty: number;
  onPublish: () => void;
  onShare?: () => void;
  isPublished?: boolean;
  templateId?: string;
  templateName?: string;
  templateThumb?: string;
  onSelectTemplate?: (tpl: Tpl) => void;
}) {
  const curTpl = templateById(templateId);
  const [menu, setMenu] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dirty) return;
    setStatus("saving");
    const t = setTimeout(() => setStatus("saved"), 600);
    return () => clearTimeout(t);
  }, [dirty]);

  useEffect(() => {
    const h = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setMenu(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <>
      <div className="inv-root" style={{ position: "sticky", top: 0, zIndex: 30 }}><header className="bg-base-100 border-b border-base-200"><div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3"><div className="flex items-center gap-3"><div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1"><a href="/dashboard" className="btn btn-ghost btn-circle btn-sm flex-shrink-0" title="Quay lại danh sách thiệp"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7m0 0l7-7m-7 7h18"></path></svg></a><button id="change-template-btn" onClick={() => setTemplateModal(true)} className="relative flex-1 lg:flex-none lg:w-48 h-12 sm:h-14 lg:h-10 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group border border-base-300 hover:border-primary/50 transition-all hover:shadow-md" title="Đổi mẫu thiệp"><img alt={templateName} className="object-cover" decoding="async" src={curTpl ? TPL_CDN + curTpl.img : templateThumb} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", objectPosition: `center ${previewFocal(templateId)}%`, color: "transparent" }} /><div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/20 to-transparent"></div><div className="absolute inset-0 flex items-center justify-end px-3 sm:px-4 lg:px-3"><div className="flex flex-col items-end text-white lg:hidden [text-shadow:_0_1px_3px_rgb(0_0_0_/_80%)]"><span className="text-[10px] sm:text-xs opacity-90 leading-tight">Đổi mẫu</span><div className="flex items-center gap-1.5"><span className="text-sm sm:text-base font-semibold whitespace-nowrap">{templateName}</span><svg className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div></div><div className="hidden lg:flex items-center gap-1.5 text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_80%)]"><span className="text-sm font-semibold whitespace-nowrap">{templateName}</span><svg className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div></div><div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div></button><div ref={ref} className={"dropdown dropdown-end hidden lg:block" + (menu ? " dropdown-open" : "")}><div tabIndex={0} role="button" onClick={() => setMenu(!menu)} className="flex items-center gap-1.5 h-10 px-3 rounded-xl border border-base-300 hover:border-primary/50 transition-all hover:shadow-md bg-base-100" title="Cài đặt" aria-label="Cài đặt"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.397-1.11-.94l-.213-1.28c-.062-.375-.312-.687-.644-.87a6.52 6.52 0 01-.22-.128c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><ul tabIndex={0} onClick={() => setMenu(false)} className="dropdown-content menu bg-base-100 rounded-2xl z-[60] w-56 p-2 shadow-lg border border-base-200 mt-2"><li><button className="flex items-start gap-2.5 py-2"><svg className="w-4 h-4 opacity-70 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"></path></svg><span className="flex min-w-0 flex-1 flex-col items-start gap-0.5"><span className="flex w-full items-center gap-2"><span>Ngôn ngữ thiệp</span><span className="ml-auto text-xs opacity-60">VI</span></span><span className="text-xs font-normal leading-snug opacity-60">Đổi hoặc thêm ngôn ngữ hiển thị trên thiệp</span></span></button></li><li className="menu-disabled py-1" aria-hidden="true"><div className="mx-2 border-t border-base-200 p-0 hover:bg-transparent"></div></li><li><button className="flex items-start gap-2.5 py-2"><svg className="w-4 h-4 opacity-70 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.479m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path></svg><span className="flex min-w-0 flex-1 flex-col items-start gap-0.5"><span>Thành viên</span><span className="text-xs font-normal leading-snug opacity-60">Mời người khác cùng chỉnh sửa thiệp</span></span></button></li></ul></div><button id="publish-btn-mobile" onClick={isPublished ? onShare : onPublish} className="lg:hidden relative flex items-center justify-center h-12 sm:h-14 px-4 rounded-xl border border-base-300 bg-base-100 hover:bg-base-200/60 active:bg-base-200 active:scale-[0.97] active:shadow-sm transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden flex-shrink-0" title="Xuất bản"><span className="text-sm font-medium text-primary">{isPublished ? "Chia sẻ" : "Xuất bản"}</span><span className="absolute inset-0 bg-gradient-to-r from-transparent via-base-content/10 to-transparent animate-selector-shimmer pointer-events-none"></span></button></div><div className="hidden lg:flex justify-center"><div id="mode-toggle-desktop" className="relative inline-flex p-1 bg-base-200 rounded-full "><div className={"absolute top-1 bottom-1 start-1 bg-base-100 rounded-full shadow-sm transition-all duration-200 ease-in-out" + (mode === "edit" ? " translate-x-0" : " translate-x-full")} style={{ width: "calc(50% - 0.25rem)" }}></div><button onClick={() => onMode("edit")} className={"relative flex-1 min-w-28 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 " + (mode === "edit" ? "text-base-content" : "text-base-content/60 hover:text-base-content/80")} title="Chỉnh sửa bằng form"><div className="flex items-center justify-center gap-2 whitespace-nowrap"><svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg><span>Chỉnh sửa</span></div></button><button onClick={() => onMode("preview")} className={"relative flex-1 min-w-28 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 " + (mode === "preview" ? "text-base-content" : "text-base-content/60 hover:text-base-content/80")} title="Xem trước thiệp mời"><div className="flex items-center justify-center gap-2 whitespace-nowrap"><svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg><span>Xem trước</span></div></button></div></div><div className="hidden lg:flex items-center gap-3 flex-1 justify-end"><div id="save-status-desktop" className="flex items-center"><div className="flex items-center gap-1 min-w-[20px] min-h-[20px]" title={status === "saved" ? "Đã lưu tự động" : status === "saving" ? "Đang lưu thay đổi..." : ""}>{status === "saving" && <span className="loading loading-spinner loading-xs" />}{status === "saved" && <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}</div></div><button id="publish-btn-desktop" onClick={isPublished ? onShare : onPublish} className="btn btn-primary btn-sm gap-2" title="Xuất bản thiệp để chia sẻ với khách mời"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg><span>{isPublished ? "Chia sẻ" : "Xuất bản"}</span></button></div></div></div></header></div>

      {/* Full 7-column Template Selector Modal (matches media_1792164790175_cb0f3aef.png) */}
      {templateModal && (
        <div className="modal-back" onClick={() => setTemplateModal(false)}>
          <div className="tpl-grid-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tpl-modal-header">
              <div className="tpl-modal-titles">
                <h3>Đổi mẫu thiệp</h3>
                <p>Nội dung thiệp sẽ được giữ nguyên, chỉ thay đổi giao diện</p>
              </div>
              <button
                type="button"
                className="tpl-modal-close"
                onClick={() => setTemplateModal(false)}
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            <div className="tpl-grid-content">
              <div className="tpl-grid">
                {TEMPLATES.map((t) => {
                  const isSelected = t.id === templateId || t.name === templateName;
                  return (
                    <div
                      key={t.id}
                      className={`tpl-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        onSelectTemplate?.(t);
                        setTemplateModal(false);
                      }}
                    >
                      <img src={TPL_CDN + t.img} alt={t.name} loading="lazy" />
                      {isSelected && (
                        <div className="tpl-card-check">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <div className="tpl-card-name">{t.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
