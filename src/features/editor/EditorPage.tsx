import { useCallback, useEffect, useRef, useState } from "react";
import type { Inv } from "@/types/invitation";
import { defaultInv, blankInv } from "@/features/editor/data/defaultData";
import Header, { type Mode } from "@/features/editor/components/Header";
import Preview from "@/features/invitation/components/Preview";
import BanquetV2 from "@/features/editor/components/v2/BanquetV2";
import * as V from "@/features/editor/components/v2/SectionsV2";
import TopNav from "@/components/layout/TopNav";
import EditorTopBar from "@/features/editor/components/EditorTopBar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { BasicV2 } from "@/features/editor/components/v2/BasicV2";
import AlbumV2 from "@/features/editor/components/v2/AlbumV2";
import MusicV2 from "@/features/editor/components/v2/MusicV2";
import { getCapabilities, getEditorSections } from "@/features/invitation/shell/specs";
import HeroPhoto from "@/features/editor/components/v2/HeroV2";
import TutorialTour from "@/features/editor/components/TutorialTour";
import ShareModal from "@/components/common/ShareModal";
import PublishCheckModal from "@/features/editor/components/PublishCheckModal";
import { loadCards, saveCards, loadInv, saveInv, templatePatch } from "@/services/storage/store";
import { TPL_CDN, templateById, templateByIdOrSlug, introDefaultFor, TEMPLATES } from "@/features/templates/data/templates";
import { TEMPLATE_THEMES } from "@/features/invitation/config/templateThemes";
import { getGiftboxConfig } from "@/features/invitation/config/giftboxConfigs";
import { persistInvImages, resolveInvImages } from "@/services/storage/imageStore";
import { albumCardAfter } from "@/features/editor/config/editorSections";

export default function EditorPage() {
  const cardId = typeof window !== "undefined" ? window.location.pathname.replace(/^\/edit\//, "").split("?")[0] : "";
  const [d, setD] = useState<Inv>(() => {
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const queryTplId = searchParams.get("template") || searchParams.get("tpl") || searchParams.get("theme") || undefined;
    const matchedCard = loadCards().find((c) => c.id === cardId);
    const tpl = templateByIdOrSlug(queryTplId) || templateByIdOrSlug(matchedCard?.tplId) || templateByIdOrSlug(cardId);

    const saved = cardId ? loadInv(cardId) : null;
    if (saved) {
      // blob: URL chỉ sống trong phiên trước; idb: URL sẽ được resolve async sau mount
      const keep = (u: string) => !u.startsWith("blob:");
      const curTplId = tpl ? tpl.id : saved.templateId;
      const curTpl = templateByIdOrSlug(curTplId);
      return {
        ...defaultInv,
        ...saved,
        templateId: curTplId,
        templateName: curTpl ? curTpl.name : saved.templateName,
        templateThumb: curTpl ? TPL_CDN + curTpl.img : saved.templateThumb,
        photos: (saved.photos || []).filter(keep),
        heroPhoto: keep(saved.heroPhoto) ? saved.heroPhoto : "",
      };
    }

    if (tpl) {
      const palette = TEMPLATE_THEMES[tpl.id];
      const dressColors = palette
        ? [palette.ink, palette.bg, "#d6c5b3", "#ece5dd"]
        : ["#542e08", "#9c7653", "#d6c5b3", "#ece5dd"];
      return {
        ...blankInv,
        templateId: tpl.id,
        templateName: tpl.name,
        templateThumb: TPL_CDN + tpl.img,
        introText: introDefaultFor(tpl.id),
        dressColors,
        giftDisplayMode: getGiftboxConfig(tpl.id).giftboxType === "envelope" ? "envelope" : "gift_box",
      };
    }

    return defaultInv;
  });
  const [mode, setMode] = useState<Mode>("edit");
  const { loggedIn } = useAuth();
  const [dirty, setDirty] = useState(0);
  const [toast, setToast] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [justPublished, setJustPublished] = useState(false);
  const [showPublishCheck, setShowPublishCheck] = useState(false);

  const cards = loadCards();
  const currentCard = cards.find((c) => c.id === cardId);
  // Chỉ ghi vào thiệp có id khớp URL; không bao giờ dùng cards[0] làm đích ghi (id lạ trên URL không được sửa thiệp khác).
  const activeCardId = cards.some((c) => c.id === cardId) ? cardId : null;
  const [isPublished, setIsPublished] = useState<boolean>(() => currentCard?.status === "published");

  const set = useCallback((p: Partial<Inv>) => {
    setD((prev) => ({ ...prev, ...p }));
    setDirty((n) => n + 1);
  }, []);

  const saveSeq = useRef(0);

  // Sau mount: resolve idb: → object URL để hiển thị ảnh đã lưu
  useEffect(() => {
    let cancelled = false;
    resolveInvImages(d).then((resolved) => {
      if (!cancelled) setD(resolved);
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cardId && !loadCards().some((c) => c.id === cardId)) {
      const t = templateByIdOrSlug(d.templateId) || TEMPLATES[0];
      const [template, ...rest] = t.name.split(" - ");
      const now = new Date();
      const created = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
      saveCards([...loadCards(), { id: cardId, name: `Thiệp ${loadCards().length + 1}`, template, color: rest.join(" - "), status: "draft", created, tplId: t.id }]);
    }
  }, [cardId, d.templateId]);

  useEffect(() => {
    if (dirty <= 0 || !loadCards().some((c) => c.id === cardId)) return;
    const seq = ++saveSeq.current;
    persistInvImages(d).then((persisted) => {
      if (seq !== saveSeq.current) return;
      try {
        saveInv(cardId, persisted);
        if (toast === "Lưu thất bại – bộ nhớ trình duyệt đầy!") setToast("");
      } catch {
        setToast("Lưu thất bại – bộ nhớ trình duyệt đầy!");
      }
    });
  }, [d, dirty, cardId]);

  const handlePublishRequest = () => {
    setShowPublishCheck(true);
  };

  const handleConfirmPublish = () => {
    if (activeCardId) {
      saveCards(loadCards().map((c) => (c.id === activeCardId ? { ...c, status: "published" as const } : c)));
    }
    setIsPublished(true);
    setShowPublishCheck(false);
    setJustPublished(true);
    setShareOpen(true); // Open sharing & QR modal immediately upon publishing!
  };

  const handleOpenShare = () => {
    setJustPublished(false);
    setShareOpen(true);
  };

  const albumAfter = getCapabilities(d.templateId)?.editor.albumCardAfter ?? albumCardAfter(d.templateId);
  const vis = getEditorSections(d.templateId);
  return (
    <div className="editor-page-root">
      {loggedIn ? <TopNav /> : <EditorTopBar />}
      <div className="inv-root"><div className="min-h-screen bg-base-200 pb-14 lg:pb-0">
      <Header
        mode={mode}
        onMode={setMode}
        dirty={dirty}
        onPublish={handlePublishRequest}
        onShare={handleOpenShare}
        isPublished={isPublished}
        templateId={d.templateId}
        templateName={d.templateName}
        templateThumb={d.templateThumb}
        onSelectTemplate={(tpl) => {
          set(templatePatch(tpl, d));
          // giữ bản ghi thiệp (Dashboard, Khách Mời) khớp với mẫu vừa chọn
          const [template, ...rest] = tpl.name.split(" - ");
          if (activeCardId) {
            saveCards(loadCards().map((c) => (c.id === activeCardId ? { ...c, template, color: rest.join(" - "), tplId: tpl.id } : c)));
          }
        }}
      />
      {mode === "edit" ? (
        <main className="max-w-4xl mx-auto"><div className="body">
            <BasicV2 d={d} set={set} />
            {vis.heroPhoto && <HeroPhoto d={d} set={set} />}
            {albumAfter === "hero" && <AlbumV2 d={d} set={set} />}
            <V.Family d={d} set={set} />
            <V.Announce d={d} set={set} />
            <V.Ceremony d={d} set={set} />
            {albumAfter === "ceremony" && <AlbumV2 d={d} set={set} />}
            <BanquetV2 d={d} set={set} />
            <V.Rsvp d={d} set={set} />
            <V.Dress d={d} set={set} />
            <V.Schedule d={d} set={set} />
            {vis.guestbook && <V.Guestbook d={d} set={set} />}
            <V.GiftBox d={d} set={set} />
            <V.Thanks d={d} set={set} />
            <MusicV2 d={d} set={set} />
            {vis.envelope && <V.Envelope d={d} set={set} />}
            <V.Share d={d} set={set} />
          </div></main>
      ) : (
        <main className="editor-main"><Preview d={d} set={set} initialOpen={true} /></main>
      )}
      </div></div>
      {toast && <div className="toast">{toast}</div>}
      {showPublishCheck && (
        <PublishCheckModal
          card={currentCard}
          d={d}
          onConfirm={handleConfirmPublish}
          onCancel={() => setShowPublishCheck(false)}
        />
      )}
      {shareOpen && isPublished && (
        <ShareModal
          name={d.groomNick && d.brideNick ? `${d.groomNick} & ${d.brideNick}` : "Hoàng Long & Bảo Ngọc"}
          slug="z6dt5xo7"
          justPublished={justPublished}
          onClose={() => setShareOpen(false)}
        />
      )}
      <TutorialTour />
    </div>
  );
}
