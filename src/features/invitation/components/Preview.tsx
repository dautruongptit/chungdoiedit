import { useEffect, useRef, useState } from "react";
import { introDefaultFor } from "@/features/templates/data/templates";
import { TEMPLATE_THEMES } from "@/features/invitation/config/templateThemes";
import { LongPhungHeader } from "@/features/invitation/components/LongPhungV2";
import { getCoverComponent } from "@/features/invitation/components/covers";
import { getGiftboxConfig } from "@/features/invitation/config/giftboxConfigs";
import { GENERATED_HEADERS } from "@/features/invitation/components/generated/headers";
import AlbumGallery from "@/features/invitation/components/AlbumGallery";
import { HoaMocXanh } from "@/features/invitation/components/HoaMocXanh";
import { InvitationShell } from "@/features/invitation/shell/InvitationShell";
import { getTemplateSpec } from "@/features/invitation/shell/specs";
import { DarkRedAlbum, DarkRedBanquet, DarkRedGuestbook, DarkRedHeader, DarkRedInfoFrame, DarkRedSchedule, DarkRedVenue } from "@/features/invitation/components/MinimalismDarkRed";
import { getThemeBackgroundUrl, getThemeDecorations, getTemplateManifest } from "@/features/templates/data/themeManifest";
import { assetUrl } from "@/services/asset";
import type { Inv } from "@/types/invitation";
import { brideShown, groomShown } from "@/utils/format";
import { lunarLabel } from "@/utils/lunar";
import { googleCalendarUrl } from "@/utils/calendar";
import {
  WEEKDAYS_FULL,
  WEEKDAYS_SHORT,
  buildIcs,
  formatTime,
  monthGrid,
  parseDate,
} from "@/utils/date";

/** Ảnh đại diện xám hiện trong phong bì khi chưa có ảnh đầu thiệp (cùng tệp với trang gốc). */
const AVATAR_PLACEHOLDER = assetUrl("/images/avatar-placeholder.jpeg");

/** Tên khách từ liên kết riêng (?guest=Tên); chỉ áp dụng khi xem thiệp độc lập, không ảnh hưởng editor. */
function guestFromUrl(standalone: boolean): string {
  if (!standalone || typeof location === "undefined") return "";
  return (new URLSearchParams(location.search).get("guest") || "").trim().slice(0, 60);
}

export default function Preview({
  d: dProp,
  set,
  standalone = false,
  initialOpen,
  onEnvelopeOpen,
}: {
  d: Inv;
  set: (p: Partial<Inv>) => void;
  standalone?: boolean;
  initialOpen?: boolean;
  onEnvelopeOpen?: () => void;
}) {
  const urlGuest = guestFromUrl(standalone);
  const d = urlGuest ? { ...dProp, envelopeGuest: urlGuest } : dProp;
  const [isOpen, setIsOpen] = useState(() => {
    if (initialOpen !== undefined) return initialOpen;
    if (standalone) {
      return typeof location !== "undefined" && new URLSearchParams(location.search).get("open") === "1";
    }
    // Inside editor preview, default to opened immediately (no envelope screen)
    return true;
  });
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpPublic, setRsvpPublic] = useState(false);
  const [rsvpAnswers, setRsvpAnswers] = useState<Record<string, string>>({});

  const intro = d.introCustom && d.introText.trim() ? d.introText.trim() : introDefaultFor(d.templateId);
  const isDarkRed = d.templateId === "minimalism_darkred";
  const shellSpec = getTemplateSpec(d.templateId);
  const isMinimalismBrown = d.templateId === "minimalism_brown";
  const isMinimalism = isMinimalismBrown;
  const palette = TEMPLATE_THEMES[d.templateId];
  const red = palette ? (() => { const [r, g, b] = palette.rgb.split(",").map(Number); return r > g * 1.5 && r > b * 1.5; })() : true;
  const paletteVars = palette
    ? ({ "--inv-bg": palette.bg, "--inv-ink": palette.ink, "--inv-rgb": palette.rgb, "--inv-cover": palette.cover } as React.CSSProperties)
    : undefined;
  const isLongPhungV2 = d.templateId === "dragon_phoenix_v2_red";
  const isSongHy = (d.templateId || "").includes("song_hy") || (d.templateName || "").includes("Song Hỷ");
  const themeBgUrl = getThemeBackgroundUrl(d.templateId);
  const themeDecos = getThemeDecorations(d.templateId);
  const giftConfig = getGiftboxConfig(d.templateId);
  // Kiểu hiển thị hộp quà: theo lựa chọn của người dùng; chưa chọn thì theo kiểu mặc định của mẫu
  const giftMode = d.giftDisplayMode || (giftConfig.giftboxType === "envelope" ? "envelope" : "gift_box");
  const [rsvpForm, setRsvpForm] = useState({
    name: d.envelopeGuest || "",
    phone: "",
    count: "1",
    attending: "yes",
    diet: "",
    note: "",
  });
  const [wishName, setWishName] = useState("");
  const [wishMsg, setWishMsg] = useState("");
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [activeBankTab, setActiveBankTab] = useState<"all" | "groom" | "bride" | "custom">("all");
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dt = parseDate(d.date);
  const gName = groomShown(d);
  const bName = brideShown(d);
  const brideFirst = d.order === "bride";
  const [n1, n2] = brideFirst ? [bName, gName] : [gName, bName];
  const [r1, r2] = brideFirst ? [d.brideRole, d.groomRole] : [d.groomRole, d.brideRole];

  const fams = [
    {
      label: "Nhà Gái",
      title: d.brideFamTitle,
      f: d.brideFather,
      m: d.brideMother,
      addr: d.brideAddr,
    },
    {
      label: "Nhà Trai",
      title: d.groomFamTitle,
      f: d.groomFather,
      m: d.groomMother,
      addr: d.groomAddr,
    },
  ];
  if (!brideFirst) fams.reverse();

  const g = monthGrid(d.date);
  const daysDiff = Math.ceil((dt.getTime() - Date.now()) / 86400000);
  const days = Math.max(0, daysDiff);
  // Chỉ đếm ngược khi đã nhập ngày và ngày đó chưa qua (không hiện "CÒN 0 NGÀY" cho ngày mặc định/đã qua)
  const showCountdown = !!d.date && daysDiff >= 0;

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    onEnvelopeOpen?.();
    if (d.musicUrl && d.musicAutoPlay) {
      if (!audioRef.current) {
        audioRef.current = new Audio(d.musicUrl);
        audioRef.current.loop = true;
      }
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current && d.musicUrl) {
      audioRef.current = new Audio(d.musicUrl);
      audioRef.current.loop = true;
    }
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.pause();
        setIsPlayingMusic(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlayingMusic(true))
          .catch(() => {});
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const addToCalendar = () => {
    const blob = new Blob([buildIcs(d)], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dam-cuoi-${brideShown(d)}-${groomShown(d)}.ics`;
    a.click();
  };

  const sendWish = () => {
    if (!wishName.trim() || !wishMsg.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${now.toLocaleDateString("vi-VN")}`;
    set({
      wishes: [{ name: wishName.trim(), msg: wishMsg.trim(), at: timeStr }, ...d.wishes],
    });
    setWishName("");
    setWishMsg("");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const currentGift =
    d.gifts.find((g) => g.who === activeBankTab) || d.gifts[0] || null;

  const rsvpBox = (
          <div
            className={"rsvp-modal-box" + (d.rsvpDisplay === "inline" ? " is-inline" : "")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rsvp-modal-header">
              <h3>Xác nhận tham dự</h3>
              <button
                className="rsvp-close-btn"
                onClick={() => setRsvpOpen(false)}
              >
                ✕
              </button>
            </div>

            {rsvpSubmitted ? (
              <div className="rsvp-success-state">
                <span className="rsvp-check-icon">✓</span>
                <h4>Cảm ơn bạn đã phản hồi!</h4>
                <p>Chúng tôi rất mong được đón tiếp bạn trong ngày vui.</p>
                <button
                  className="sp-btn-primary"
                  onClick={() => setRsvpOpen(false)}
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form
                className="rsvp-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setRsvpSubmitted(true);
                  // Phản hồi RSVP là dữ liệu riêng của khách: lưu vào danh sách phản hồi, không đưa vào sổ lưu bút công khai.
                  // Chỉ lời nhắn được đăng lên sổ lưu bút khi khách tích đồng ý.
                  const at = new Date().toLocaleDateString("vi-VN");
                  set({
                    rsvps: [{ name: rsvpForm.name || "Khách mời", phone: rsvpForm.phone, attending: rsvpForm.attending, count: rsvpForm.count, answers: rsvpAnswers, note: rsvpForm.note, at }, ...(d.rsvps ?? [])],
                    ...(rsvpPublic && rsvpForm.note.trim() ? { wishes: [{ name: rsvpForm.name || "Khách mời", msg: rsvpForm.note.trim(), at }, ...d.wishes] } : {}),
                  });
                }}
              >
                <label className="rsvp-field">
                  <span>Họ và tên của bạn*</span>
                  <input
                    required
                    type="text"
                    value={rsvpForm.name}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, name: e.target.value })
                    }
                    placeholder="Ví dụ: Nguyễn Văn A"
                  />
                </label>

                <label className="rsvp-field">
                  <span>Số điện thoại</span>
                  <input
                    type="tel"
                    value={rsvpForm.phone}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, phone: e.target.value })
                    }
                    placeholder="Ví dụ: 0912 345 678"
                  />
                </label>

                <label className="rsvp-field">
                  <span>Bạn sẽ tham dự chứ?</span>
                  <select
                    value={rsvpForm.attending}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, attending: e.target.value })
                    }
                  >
                    <option value="yes">Chắc chắn tham dự</option>
                    <option value="maybe">Có thể tham dự</option>
                    <option value="no">Rất tiếc không thể tham dự</option>
                  </select>
                </label>

                <label className="rsvp-field">
                  <span>Số người tham dự</span>
                  {d.partyMode === "limit" ? (
                    <select value={rsvpForm.count} onChange={(e) => setRsvpForm({ ...rsvpForm, count: e.target.value })}>
                      {Array.from({ length: Math.max(1, d.partyLimit) }, (_, i) => (
                        <option key={i + 1} value={String(i + 1)}>{i + 1} người</option>
                      ))}
                    </select>
                  ) : (
                    <input type="number" min={1} value={rsvpForm.count} onChange={(e) => setRsvpForm({ ...rsvpForm, count: String(Math.max(1, Number(e.target.value) || 1)) })} />
                  )}
                </label>

                {d.questions.filter((q) => q.trim()).map((q, i) => (
                  <label className="rsvp-field" key={i}>
                    <span>{q}</span>
                    <input
                      type="text"
                      value={rsvpAnswers[q] || ""}
                      onChange={(e) => setRsvpAnswers({ ...rsvpAnswers, [q]: e.target.value })}
                    />
                  </label>
                ))}

                <label className="rsvp-field">
                  <span>Gửi lời nhắn hoặc chế độ ăn uống</span>
                  <textarea
                    rows={2}
                    value={rsvpForm.note}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, note: e.target.value })
                    }
                    placeholder="Ví dụ: Ăn chay, hoặc lời chúc mừng gửi tới dâu rể..."
                  />
                </label>

                <label className="rsvp-field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" checked={rsvpPublic} onChange={(e) => setRsvpPublic(e.target.checked)} style={{ width: "auto" }} />
                  <span>Đăng lời nhắn của tôi lên sổ lưu bút (hiển thị công khai trên thiệp)</span>
                </label>

                <button type="submit" className="sp-btn-primary full-w">
                  Gửi phản hồi
                </button>
              </form>
            )}
          </div>
  );

  return (
    <div style={paletteVars} className={`pv-wrapper ${red && !GENERATED_HEADERS[d.templateId] ? "" : "palette-plain"} ${standalone ? "is-standalone" : ""} ${isDarkRed ? "theme-minimalism-darkred" : isMinimalismBrown ? "theme-minimalism" : isSongHy ? "theme-songhy" : isLongPhungV2 ? "theme-longphung-v2" : "theme-songphung"}`}>
      {/* ==================== 1. MÀN HÌNH BÌ THƯ (ENVELOPE) ==================== */}
      {!isOpen && (() => {
        const CoverComponent = getCoverComponent(d.templateId);
        return <CoverComponent d={d} onOpen={handleOpenEnvelope} />;
      })()}

      {/* ==================== 2. NỘI DUNG THIỆP ĐÃ MỞ (OPENED) ==================== */}
      {isOpen && (
        d.templateId === "boho_floral_green" ? (
          <HoaMocXanh d={d} set={set} standalone={standalone} />
        ) : shellSpec ? (
          <InvitationShell d={d} set={set} spec={shellSpec} standalone={standalone} />
        ) : (
        <div
          className={`songphung-template ${isDarkRed ? "is-minimalism-darkred-body" : isMinimalismBrown ? "is-minimalism-body" : isSongHy ? "is-songhy-body" : ""}`}
          style={undefined}
        >
          {/* Floating background audio button */}
          {d.musicUrl && (
            <div className="music-floating-wrap">
              <div className="music-ping-ring" />
              <button
                className={`music-floating-btn ${isPlayingMusic ? "playing" : ""}`}
                onClick={toggleMusic}
                aria-label={isPlayingMusic ? "Tắt nhạc" : "Phát nhạc"}
                title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
              >
                <div className="music-disc">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
              </button>
            </div>
          )}

          {/* Paper Background Texture Overlay */}
          {themeBgUrl && (
            <div
              className="paper-texture"
              style={{
                backgroundImage: `url("${themeBgUrl}")`,
              }}
            />
          )}

          {/* Theme Decorations Layer */}
          {themeDecos && themeDecos.length > 0 && (
            <div className="theme-decorations-layer pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
              {themeDecos.map((deco, di) => (
                <img
                  key={`${deco.id}-${di}`}
                  src={deco.path}
                  alt=""
                  className={`theme-deco theme-deco-${deco.id} pointer-events-none`}
                  data-theme-deco={deco.id}
                  style={{ display: "none" }}
                />
              ))}
            </div>
          )}

          {/* Phoenix Line Side Decorations (Parallax Artwork only for double_phoenix_red) */}
          {d.templateId === "double_phoenix_red" && (
            <>
              <div className="line-deco-left" aria-hidden="true">
                <img
                  src="/images/themes/songphung-red/Phuong%20line.webp"
                  alt=""
                />
              </div>
              <div className="line-deco-right" aria-hidden="true">
                <img
                  src="/images/themes/songphung-red/Phuong%20line.webp"
                  alt=""
                />
              </div>
            </>
          )}

          {/* -------------------- HERO SECTION -------------------- */}
          {isDarkRed ? (
            <DarkRedHeader groom={gName} bride={bName} intro={intro} crop={{ x: d.heroX, y: d.heroY, z: d.heroZoom }} photo={!d.heroOn ? undefined : d.heroPhoto || d.photos[0] || AVATAR_PLACEHOLDER} />
          ) : GENERATED_HEADERS[d.templateId] ? (
            GENERATED_HEADERS[d.templateId]({ groom: gName, bride: bName, intro, photo: !d.heroOn ? undefined : d.heroPhoto || d.photos[0] || assetUrl("/images/photo-library/design/cdecf6cfe2eeb3cfd63829abde62f1066f10a364ec27d4c997c0f51012c8803e.webp") })
          ) : isLongPhungV2 ? (
            <LongPhungHeader groom={gName} bride={bName} />
          ) : isMinimalism ? (
            /* Hero cho Minimalism - Nâu (media_1792167846581_6cfd16e7.png) */
            <header className="relative z-10 flex flex-col items-center px-4 pt-12 pb-20 text-center md:pb-28 overflow-hidden">
              {/* Paper overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  backgroundImage: `url("${themeBgUrl || '/images/themes/minimalism-brown/paper.webp'}")`,
                  backgroundSize: "100% auto",
                  backgroundPosition: "top center",
                  mixBlendMode: "multiply",
                  opacity: 0.4,
                }}
              />
              <img
                src="/images/themes/minimalism-brown/leaf-background.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-[-24%] top-[2%] w-[52%] max-w-none object-contain opacity-[0.15]"
              />
              <img
                src="/images/themes/minimalism-brown/house-background.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[30%] w-[130%] max-w-none -translate-x-1/2 object-contain opacity-[0.08] mix-blend-multiply"
              />

              <p
                data-testid="event-heading"
                className="relative z-10 whitespace-pre-line text-[13px] uppercase md:text-[15px]"
                style={{
                  fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
                  color: "#827771",
                  letterSpacing: "0.18em",
                  fontWeight: 600,
                }}
              >
                {intro}
              </p>

              <div className="relative z-10 mt-2 flex items-center justify-center gap-2 md:mt-3 md:gap-3">
                <span
                  className="italic text-[clamp(28px,7.5vw,36px)] md:text-[44px]"
                  style={{ fontFamily: '"Times New Roman", "Playfair Display", serif', color: "#827771" }}
                >
                  {gName}
                </span>
                <span
                  className="text-[38px] leading-none md:text-[48px]"
                  style={{ fontFamily: '"The Nautigal", "Brush Script MT", cursive', color: "#918077" }}
                >
                  &amp;
                </span>
                <span
                  className="italic text-[clamp(28px,7.5vw,36px)] md:text-[44px]"
                  style={{ fontFamily: '"Times New Roman", "Playfair Display", serif', color: "#827771" }}
                >
                  {bName}
                </span>
              </div>

              {d.heroOn && (
                <div className="relative z-10 mt-6 aspect-[1094/1554] w-[88%] max-w-[360px] md:mt-8 md:max-w-[460px]">
                  <div className="absolute left-[11.5%] top-[8%] z-10 h-[77%] w-[72%] rotate-[-4.78deg] overflow-hidden bg-white shadow-inner">
                    <img
                      src={d.heroPhoto || "/images/themes/minimalism-brown/couple.webp"}
                      alt={`${gName} & ${bName}`}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: `${d.heroX}% ${d.heroY}%`, transform: `scale(${d.heroZoom})`, transformOrigin: `${d.heroX}% ${d.heroY}%` }}
                    />
                  </div>
                  <img
                    src="/images/themes/minimalism-brown/frame-avatar.webp"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 size-full max-w-none drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute block bottom-[-6%] left-[-5%] z-30 w-[34%]"
                    style={{ animation: "mbFloat 5s ease-in-out infinite", animationDelay: "0s", willChange: "transform" }}
                  >
                    <img
                      src="/images/themes/minimalism-brown/flower2-decoration.webp"
                      alt=""
                      className="block w-full max-w-none object-contain drop-shadow-[4px_4px_2px_rgba(0,0,0,0.25)]"
                    />
                  </span>
                </div>
              )}
            </header>
          ) : isSongHy ? (
            /* Hero cho Song Hỷ - Xanh (media_1792167676918_431db77f.png) */
            <header className="sh-hero-sec">
              <div className="sh-green-arch">
                <p className="sh-welcome">{intro}</p>
                <div className="sh-couple-row">
                  <div className="sh-groom-col">
                    <span className="sh-role">Chú Rể</span>
                    <span className="sh-name">{gName}</span>
                  </div>
                  <div className="sh-xi-box">
                    <span className="sh-xi">囍</span>
                  </div>
                  <div className="sh-bride-col">
                    <span className="sh-role">Cô Dâu</span>
                    <span className="sh-name">{bName}</span>
                  </div>
                </div>
                <p className="sh-arch-footer">LOVE NEVER FAILS</p>
              </div>
            </header>
          ) : d.templateId === "double_phoenix_red" ? (
            /* Hero cho Song Phụng - Đỏ */
            <header className="relative flex flex-col items-center justify-center text-center z-10 pt-12 md:pt-16 pb-[200px] md:pb-[220px] lg:pb-[240px]">
              <div className="w-full text-[36px] md:text-[44px] lg:text-[52px] mb-6 md:mb-8 text-left pl-6 md:pl-8 md:ml-[80px] lg:ml-[80px] uppercase" style={{ color: "var(--inv-ink, #710001)", fontFamily: '"Playfair Display", serif', lineHeight: 1.11, fontWeight: 400 }}>
                <div className="ml-[15px]">{n1}</div>
                <div className="ml-[50px] mt-[10px]">{n2}</div>
              </div>
              <div className="relative w-full flex items-center justify-center mb-4 md:mb-6 h-[260px] md:h-[488px] lg:h-[488px]">
                <div className="absolute w-full h-[110px] md:h-[206px] lg:h-[206px] z-0" style={{ backgroundColor: "var(--inv-ink, #710001)", top: "50%" }} />
                <div className="absolute left-[-90px] md:left-[-169px] lg:left-[-169px] top-0 w-[230px] md:w-[431px] lg:w-[431px] h-[480px] md:h-[900px] lg:h-[900px] z-10">
                  <img data-art="1" src="/images/themes/songphung-red/Phuong%202.webp" alt="Phoenix Left" className="w-full h-full object-contain" style={{ objectPosition: "left center" }} />
                </div>
                <div className="relative z-20 w-[155px] h-[155px] md:w-[291px] md:h-[291px] lg:w-[291px] lg:h-[291px]">
                  <img data-art="1" src="/images/themes/songphung-red/CHU%20HY.webp" alt="Chữ Hỷ" className="w-full h-full object-contain" />
                </div>
                <div className="absolute left-[calc(50%+77.5px)] md:left-[calc(50%+145.5px)] lg:left-[calc(50%+145.5px)] top-[-120px] md:top-[-225px] lg:top-[-225px] w-[155px] md:w-[291px] lg:w-[291px] h-[320px] md:h-[600px] lg:h-[600px] z-10">
                  <img data-art="1" src="/images/themes/songphung-red/Phuong.webp" alt="Phoenix Right" className="w-full h-full object-contain" style={{ objectPosition: "right center" }} />
                </div>
              </div>
            </header>
          ) : (
            /* Clean Generic Fallback for templates without bespoke hero */
            <header className="relative flex flex-col items-center justify-center text-center z-10 pt-16 pb-16 px-4">
              <p className="text-[14px] uppercase tracking-[0.2em] mb-4 opacity-80" style={{ color: "var(--inv-ink, #710001)" }}>
                {intro}
              </p>
              <div className="text-[34px] md:text-[48px] uppercase tracking-wide font-normal" style={{ color: "var(--inv-ink, #710001)", fontFamily: '"Playfair Display", serif', lineHeight: 1.2 }}>
                {gName} &amp; {bName}
              </div>
            </header>
          )}

          {/* -------------------- SECTION 1: LỄ CƯỚI & GIA ĐÌNH -------------------- */}
          {(d.familyOn || d.announceOn || d.ceremonies.length > 0) && isDarkRed && (
            <DarkRedInfoFrame
              heading={d.ceremonyTitle || "THÔNG TIN LỄ CƯỚI"}
              fams={d.familyOn ? fams.map((f) => { const who = f.label === "Nhà Trai" ? "Chú Rể" : "Cô Dâu"; return { title: f.title, f: f.f || `Họ Tên Cha ${who}`, m: f.m || `Họ Tên Mẹ ${who}`, addr: f.addr }; }) : undefined}
              announce={d.announceOn ? { line1: d.announcementLine1 || "TRÂN TRỌNG BÁO TIN", line2: d.announcementLine2 || "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI" } : undefined}
              couple={d.announceOn ? {
                n1: (brideFirst ? d.brideFull : d.groomFull) || (brideFirst ? "Họ Tên Cô Dâu" : "Họ Tên Chú Rể"), r1,
                n2: (brideFirst ? d.groomFull : d.brideFull) || (brideFirst ? "Họ Tên Chú Rể" : "Họ Tên Cô Dâu"), r2,
              } : undefined}
              ceremonies={d.ceremonies.map((c) => {
                const cd = parseDate(c.date);
                return {
                  title: c.title,
                  place: c.place,
                  time: formatTime(c.time, d.clock),
                  weekday: WEEKDAYS_FULL[cd.getDay()].toUpperCase(),
                  day: String(cd.getDate()).padStart(2, "0"),
                  month: String(cd.getMonth() + 1).padStart(2, "0"),
                  year: String(cd.getFullYear()),
                  lunar: c.lunar,
                };
              })}
            />
          )}
          {(d.familyOn || d.announceOn || d.ceremonies.length > 0) && !isDarkRed && (
            <section className="sp-section sp-family-sec relative overflow-x-clip">
              {/* Flower Accent top-right only for double_phoenix_red */}
              {d.templateId === "double_phoenix_red" && (
                <div className="absolute right-0 top-[-220px] md:top-[-270px] lg:top-[-290px] w-[192px] md:w-[360px] lg:w-[360px] h-auto opacity-100 pointer-events-none z-[5]">
                  <img data-art="1" src="/images/themes/songphung-red/HOA.webp" alt="" className="w-full h-auto object-contain" />
                </div>
              )}

              {d.familyOn && (
                <div className="sp-family-block">
                  <h2 className="sp-sec-title">{d.ceremonyTitle || "THÔNG TIN LỄ CƯỚI"}</h2>

                  <div className="sp-family-grid">
                    {/* Left Column */}
                    <div className="sp-family-col">
                      <p className="sp-fam-title">{fams[0].title}</p>
                      <p className="sp-fam-name">{fams[0].f}</p>
                      <p className="sp-fam-name">{fams[0].m}</p>
                      {fams[0].addr && <p className="sp-fam-addr">{fams[0].addr}</p>}
                    </div>

                    {/* Vertical Divider */}
                    <div className="sp-family-div" />

                    {/* Right Column */}
                    <div className="sp-family-col">
                      <p className="sp-fam-title">{fams[1].title}</p>
                      <p className="sp-fam-name">{fams[1].f}</p>
                      <p className="sp-fam-name">{fams[1].m}</p>
                      {fams[1].addr && <p className="sp-fam-addr">{fams[1].addr}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Announcement Lines & Couple Call */}
              {d.announceOn && (
                <div className="sp-announce-block">
                  <div className="sp-announce">
                    <p className="sp-ann-1">{d.announcementLine1 || "TRÂN TRỌNG BÁO TIN"}</p>
                    <p className="sp-ann-2">{d.announcementLine2 || "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}</p>
                  </div>

                  <div className="sp-couple-call">
                    <div className="sp-person-name">{n1}</div>
                    <div className="sp-person-role">({r1})</div>
                    <div className="sp-person-amp">&amp;</div>
                    <div className="sp-person-name">{n2}</div>
                    <div className="sp-person-role">({r2})</div>
                  </div>
                </div>
              )}

              {/* Ceremonies Cards */}
              {d.ceremonies.length > 0 && (
                <div className="sp-ceremonies-block">
                  {!d.familyOn && d.ceremonyTitle && <h2 className="sp-sec-title">{d.ceremonyTitle}</h2>}
                  {d.ceremonies.map((c, i) => (
                    <div className="sp-ceremony-card" key={i}>
                      <h3 className="sp-ceremony-header">{c.title}</h3>
                      <div className="sp-time-badge">
                        <span>VÀO LÚC {formatTime(c.time, d.clock)}</span>
                      </div>
                      <div className="sp-date-row">
                        <span>{WEEKDAYS_FULL[parseDate(c.date).getDay()].toUpperCase()}</span>
                        <span className="sp-date-sep">|</span>
                        <span className="sp-date-num">
                          {parseDate(c.date).getDate()} THÁNG {parseDate(c.date).getMonth() + 1}
                        </span>
                        <span className="sp-date-sep">|</span>
                        <span>{parseDate(c.date).getFullYear()}</span>
                      </div>
                      {c.lunar && <p className="sp-lunar-date">({c.lunar})</p>}
                      {c.place && <p className="sp-ceremony-place">Địa điểm: {c.place}</p>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* -------------------- SECTION 2: ALBUM HÌNH CƯỚI -------------------- */}
          {d.albumOn && d.photos.length > 0 && isDarkRed && (
            <DarkRedAlbum photos={d.photos} title="Album Ảnh" crops={d.photoCrops} onPhotoClick={(url) => setLightboxImg(url)}>
              {d.albumLayout === "3d" ? undefined : (
                <AlbumGallery photos={d.photos} photoCrops={d.photoCrops} layout={d.albumLayout} onPhotoClick={(url) => setLightboxImg(url)} />
              )}
            </DarkRedAlbum>
          )}
          {d.albumOn && d.photos.length > 0 && !isDarkRed && (
            <section className="sp-section sp-gallery-sec">
              <h2 className="sp-sec-title">ALBUM HÌNH CƯỚI</h2>
              <AlbumGallery
                photos={d.photos}
                photoCrops={d.photoCrops}
                layout={d.albumLayout}
                onPhotoClick={(url) => setLightboxImg(url)}
              />
            </section>
          )}

          {/* -------------------- SECTION 3: TIỆC CƯỚI (BANQUET) -------------------- */}
          {d.partyOn && isDarkRed && (
            <DarkRedBanquet
              heading={d.banquetTitle.trim() || "THÔNG TIN TIỆC CƯỚI"}
              title="Tiệc cưới sẽ diễn ra vào lúc:"
              time={formatTime(d.startTime || d.time, d.clock)}
              weekday={WEEKDAYS_FULL[dt.getDay()].toUpperCase()}
              day={String(dt.getDate()).padStart(2, "0")}
              month={String(dt.getMonth() + 1).padStart(2, "0")}
              year={String(dt.getFullYear())}
              lunar={lunarLabel(dt)}
              countdownTo={d.countdown && d.date && d.time ? new Date(`${d.date}T${d.time}`) : undefined}
              welcome={!d.hideWelcomeTimes && d.welcomeTime ? formatTime(d.welcomeTime, d.clock) : undefined}
              start={!d.hideWelcomeTimes && (d.startTime || d.time) ? formatTime(d.startTime || d.time, d.clock) : undefined}
              cal={g}
              calLabels={WEEKDAYS_SHORT}
              calendarHref={googleCalendarUrl(d)}
              rsvpInline={d.rsvpOn && d.rsvpDisplay === "inline" ? <div className="sp-rsvp-inline">{rsvpBox}</div> : undefined}
              onRsvp={d.rsvpOn && d.rsvpDisplay !== "inline" ? () => { setRsvpOpen(true); setRsvpSubmitted(false); } : undefined}
            />
          )}
          {d.partyOn && !isDarkRed && (
            <section className="sp-section sp-banquet-sec relative overflow-x-clip">
              {isDarkRed && (
                <img
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[-1%] w-[158%] -translate-x-1/2 z-0"
                  src="/images/themes/minimalism-dark-red/castle-background.webp"
                />
              )}
              {d.banquetTitle.trim() && <h2 className="sp-sec-title">{d.banquetTitle}</h2>}
              <p className="sp-lead">Tiệc cưới được tổ chức vào lúc:</p>

              <div className="sp-banquet-date">
                <span className="sp-b-wd">{WEEKDAYS_FULL[dt.getDay()].toUpperCase()}</span>
                <span className="sp-b-slash">/</span>
                <span className="sp-b-day">{dt.getDate()}</span>
                <span className="sp-b-slash">/</span>
                <span className="sp-b-month">THÁNG {dt.getMonth() + 1}</span>
              </div>

              {!d.hideWelcomeTimes && (d.welcomeTime || d.startTime || d.time) && (
                <div className="sp-welcome-times">
                  {d.welcomeTime && <span>Đón khách: <b>{formatTime(d.welcomeTime, d.clock)}</b></span>}
                  {d.welcomeTime && (d.startTime || d.time) && <span className="sp-dot">•</span>}
                  {(d.startTime || d.time) && <span>Khai tiệc: <b>{formatTime(d.startTime || d.time, d.clock)}</b></span>}
                </div>
              )}

              {/* Countdown badge */}
              {d.countdown && showCountdown && (
                <div className="sp-countdown-box">
                  <span className="sp-cd-text">CÒN</span>
                  <span className="sp-cd-days">{days}</span>
                  <span className="sp-cd-text">NGÀY NỮA</span>
                </div>
              )}

              {/* Monthly Calendar */}
              {d.date && (
                <div className="sp-calendar">
                  <div className="sp-cal-header">
                    Tháng {g.m + 1}, {g.y}
                  </div>
                  <div className="sp-cal-grid">
                    {WEEKDAYS_SHORT.map((w) => (
                      <span key={w} className="sp-cal-w">
                        {w}
                      </span>
                    ))}
                    {g.cells.map((c, i) => (
                      <span
                        key={i}
                        className={`sp-cal-d ${c === g.selected ? "selected" : ""}`}
                      >
                        {c ?? ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button className="sp-btn-link" onClick={addToCalendar}>
                📅 Thêm vào lịch của bạn
              </button>

              {/* RSVP Button */}
              {d.rsvpOn && d.rsvpDisplay === "inline" && <div className="sp-rsvp-inline">{rsvpBox}</div>}
              {d.rsvpOn && d.rsvpDisplay !== "inline" && (
                <div className="sp-rsvp-action">
                  <button
                    className="sp-btn-primary"
                    onClick={() => {
                      setRsvpOpen(true);
                      setRsvpSubmitted(false);
                    }}
                  >
                    XÁC NHẬN THAM DỰ
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Standalone RSVP when party section is disabled */}
          {!d.partyOn && d.rsvpOn && (
            <section className="sp-section sp-rsvp-sec flex justify-center py-6">
              {d.rsvpDisplay === "inline" ? (
                <div className="sp-rsvp-inline">{rsvpBox}</div>
              ) : (
                <div className="sp-rsvp-action">
                  <button
                    className="sp-btn-primary"
                    onClick={() => {
                      setRsvpOpen(true);
                      setRsvpSubmitted(false);
                    }}
                  >
                    XÁC NHẬN THAM DỰ
                  </button>
                </div>
              )}
            </section>
          )}

          {/* -------------------- SECTION 4: ĐỊA ĐIỂM (VENUE & MAP) -------------------- */}
          {d.address && isDarkRed && (
            <DarkRedVenue
              title={d.locTitle || "Tiệc cưới sẽ tổ chức tại"}
              address={d.address}
              mapSrc={d.showMap ? `https://maps.google.com/maps?q=${encodeURIComponent(d.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed` : undefined}
              directionsHref={d.showMap ? d.mapUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(d.address)}` : undefined}
            />
          )}
          {d.address && !isDarkRed && (
            <section className="sp-section sp-venue-sec relative overflow-x-clip">
              {isDarkRed && (
                <img
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[6%] w-[155%] -translate-x-1/2 z-0"
                  src="/images/themes/minimalism-dark-red/castle-background.webp"
                />
              )}
              <h2 className="sp-sec-title">{d.locTitle || "ĐỊA ĐIỂM TIỆC CƯỚI"}</h2>
              <div className="sp-address-box">
                <p className="sp-address-txt">{d.address}</p>
                {d.showMap && (
                  <a
                    className="sp-map-btn"
                    target="_blank"
                    rel="noreferrer"
                    href={
                      d.mapUrl ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        d.address
                      )}`
                    }
                  >
                    📍 Chỉ đường trên Google Maps
                  </a>
                )}
              </div>

              {/* Interactive Map Embed */}
              {d.showMap && (
                <div className="sp-map-frame">
                  <iframe
                    title="Bản đồ địa điểm"
                    width="100%"
                    height="280"
                    style={{ border: 0, borderRadius: "16px" }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      d.address
                    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              )}
            </section>
          )}

          {/* -------------------- SECTION 5: DRESS CODE -------------------- */}
          {d.dressOn && (
            <section className="sp-section sp-dress-sec">
              <h2 className="sp-sec-title">{d.dressTitle || "DRESS CODE"}</h2>
              <p className="sp-dress-sub">{d.dressText || "Trang phục dự tiệc"}</p>
              {d.dressColors && d.dressColors.length > 0 && (
                <div className="sp-color-swatches">
                  {d.dressColors.map((hex, i) => (
                    <div className="sp-swatch-item" key={i}>
                      <div
                        className="sp-swatch-circle"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="sp-swatch-hex">{hex}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* -------------------- SECTION 6: LỊCH TRÌNH (TIMELINE) -------------------- */}
          {d.schedOn && d.sched.length > 0 && isDarkRed && (
            <DarkRedSchedule
              title={d.schedTitle || "LỊCH TRÌNH NGÀY CƯỚI"}
              events={d.sched.map((s) => ({ time: formatTime(s.time, d.clock), text: s.text }))}
            />
          )}
          {d.schedOn && d.sched.length > 0 && !isDarkRed && (
            <section className="sp-section sp-timeline-sec">
              <h2 className="sp-sec-title">{d.schedTitle || "LỊCH TRÌNH NGÀY CƯỚI"}</h2>
              <div className="sp-timeline">
                {d.sched.map((item, i) => (
                  <div className="sp-tl-item" key={i}>
                    <div className="sp-tl-bullet">
                      <div className="sp-tl-dot" />
                    </div>
                    <div className="sp-tl-content">
                      <span className="sp-tl-time">{formatTime(item.time, d.clock)}</span>
                      <span className="sp-tl-text">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------------------- SECTION 7: SỔ LƯU BÚT (GUESTBOOK) -------------------- */}
          {d.guestOn && isDarkRed && (
            <DarkRedGuestbook wishes={d.wishes} name={wishName} msg={wishMsg} onName={setWishName} onMsg={setWishMsg} onSend={sendWish} />
          )}
          {d.guestOn && !isDarkRed && (
            <section className="sp-section sp-guestbook-sec relative overflow-x-clip">
              {(isDarkRed || isMinimalismBrown) && (
                <img
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[-15px] md:top-[-30px] lg:top-[-30px] w-[120%] max-w-[650px] -translate-x-1/2 object-contain opacity-95 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)] z-0"
                  src={isDarkRed ? "/images/themes/minimalism-dark-red/papernote-background.webp" : "/images/themes/minimalism-brown/paper-note.webp"}
                />
              )}
              <h2 className="sp-gb-title">Sổ lưu bút</h2>
              <div className="sp-gb-form">
                <input
                  type="text"
                  placeholder="Nhập tên của bạn*"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                />
                <textarea
                  rows={3}
                  placeholder="Nhập lời chúc của bạn*"
                  value={wishMsg}
                  onChange={(e) => setWishMsg(e.target.value)}
                />
                <button
                  className="sp-gb-submit"
                  disabled={!wishName.trim() || !wishMsg.trim()}
                  onClick={sendWish}
                >
                  GỬI LỜI CHÚC
                </button>
              </div>

              {/* Wish list */}
              <div className="sp-wishes-list">
                {d.wishes.map((w, i) => (
                  <div className="sp-wish-card" key={i}>
                    <div className="sp-wish-header">
                      <span className="sp-wish-author">{w.name}</span>
                      <span className="sp-wish-time">{w.at}</span>
                    </div>
                    <p className="sp-wish-msg">{w.msg}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------------------- SECTION 8: HỘP MỪNG CƯỚI (GIFT BOX) -------------------- */}
          {d.giftOn && d.gifts.length > 0 && (
            <section
              className="sp-section"
              style={{
                backgroundColor: "transparent",
                padding: isDarkRed ? "32px 24px 40px" : "32px 16px",
                position: "relative",
                zIndex: 10,
                ...(isDarkRed ? { overflowX: "clip" as const } : {}),
              }}
            >
              {isDarkRed && (
                <img
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[6%] w-[155%]"
                  style={{ transform: "translateX(-50%)" }}
                  src="/images/themes/minimalism-dark-red/castle-background.webp"
                />
              )}
              <h2
                className={isDarkRed ? "mb-4 uppercase text-[20px] flex flex-col items-center" : "mb-4 text-[21px] md:text-[25px] lg:text-[32px] flex flex-col items-center"}
                style={{
                  color: giftConfig.sectionTitleColor || (d.giftDisplayMode === "gift_box" ? "rgb(84, 46, 8)" : "rgb(255, 223, 175)"),
                  fontFamily: giftConfig.sectionTitleFont || (d.giftDisplayMode === "gift_box" ? "Oswald, sans-serif" : '"Times New Roman", serif'),
                  fontWeight: isDarkRed ? 700 : 600,
                  letterSpacing: isDarkRed ? "0.03em" : "0.02em",
                  marginTop: isDarkRed ? 0 : undefined,
                  marginBottom: d.giftDisplayMode === "qr_inline" ? "24px" : "16px",
                  ...(isDarkRed ? { position: "relative" as const, zIndex: 10 } : {}),
                }}
              >
                <span dir="auto">{d.giftTitle || giftConfig.sectionTitle || "Hộp Quà Mừng"}</span>
              </h2>

              {/* MODE 1: QR INLINE */}
              {d.giftDisplayMode === "qr_inline" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "24px",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "0 16px",
                  }}
                >
                  {d.gifts.map((g) => {
                    const title =
                      g.who === "custom" && g.customLabel
                        ? g.customLabel
                        : g.who === "groom"
                        ? "Chú Rể"
                        : "Cô Dâu";
                    return (
                      <div key={g.id} className="sp-qr-card-unified">
                        <h3 className="sp-qr-card-unified-title">
                          {title} - {g.accountName}
                        </h3>
                        {g.qrUrl && !g.hideQr && (
                          <div className="sp-qr-box-unified">
                            <img
                              alt={`QR - ${title} - ${g.accountName}`}
                              src={g.qrUrl}
                            />
                          </div>
                        )}
                        <div className="sp-qr-unified-texts">
                          <p>{g.bankName}</p>
                          <p className="acc-num">{g.accountNumber}</p>
                          <p className="acc-name">{g.accountName}</p>
                        </div>
                        <div className="sp-qr-unified-actions">
                          <button
                            type="button"
                            className="sp-qr-unified-btn"
                            onClick={() => copyToClipboard(g.accountNumber, g.id)}
                          >
                            {copiedBank === g.id ? "✓ Đã sao chép" : "Sao chép STK"}
                          </button>
                          {g.qrUrl && (
                            <a
                              href={g.qrUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={`vietqr-${g.bankCode}-${g.accountNumber}.png`}
                              className="sp-qr-unified-btn"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Lưu QR
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* MODE: ENVELOPE (Phong bì thư tối giản) */}
              {giftMode === "envelope" && (
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <button
                    type="button"
                    aria-label="Mở hộp mừng cưới"
                    className="group relative cursor-pointer outline-none border-none bg-transparent hover:scale-105 active:scale-95 transition-transform"
                    style={{ width: "250px", height: "357px" }}
                    onClick={() => setGiftModalOpen(true)}
                  >
                    <div className="relative w-full h-full flex items-end justify-center pb-[48px]">
                      <span className="ienv-sparkle absolute pointer-events-none z-20" style={{ top: "6%", left: "12%", color: giftConfig.sectionTitleColor || "rgb(181, 139, 47)", fontSize: "20.9px" }}>✦</span>
                      <span className="ienv-sparkle-2 absolute pointer-events-none z-20" style={{ top: "14%", right: "8%", color: giftConfig.sectionTitleColor || "rgb(181, 139, 47)", fontSize: "15.2px" }}>✦</span>
                      <span className="ienv-sparkle-3 absolute pointer-events-none z-20" style={{ top: "34%", left: "3%", color: giftConfig.sectionTitleColor || "rgb(181, 139, 47)", fontSize: "13.3px" }}>✦</span>
                      <span className="ienv-sparkle-4 absolute pointer-events-none z-20" style={{ top: "24%", right: "3%", color: giftConfig.sectionTitleColor || "rgb(181, 139, 47)", fontSize: "13.3px" }}>✦</span>
                      <div className="relative" style={{ width: "190px", height: "275px" }}>
                        <div className="ienv-shadow absolute pointer-events-none" style={{ left: "50%", bottom: "-6px", width: "125.4px", height: "11px", marginLeft: "-62.7px", borderRadius: "50%", backgroundColor: "rgba(0, 0, 0, 0.45)", filter: "blur(4px)", zIndex: 0, willChange: "transform, opacity" }} />
                        <img
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="ienv-back absolute inset-0 pointer-events-none"
                          src={assetUrl(`/images/envelope/${d.templateId}.webp`)}
                          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", transformOrigin: "50% 100%", transform: "translateX(20%) translateY(-10%) scale(-0.8, 0.8) rotate(-15deg)", zIndex: 1, filter: "drop-shadow(rgba(0, 0, 0, 0.18) 0px 8px 14px)", willChange: "transform" }}
                        />
                        <img
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="ienv-card absolute inset-0 pointer-events-none"
                          src={assetUrl(`/images/envelope/${d.templateId}.webp`)}
                          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", rotate: "-10deg", zIndex: 2, filter: "drop-shadow(rgba(0, 0, 0, 0.22) 0px 10px 18px)", willChange: "transform" }}
                        />
                      </div>
                    </div>
                    <p className="ienv-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium" style={{ color: giftConfig.sectionTitleColor || "rgb(81, 20, 25)" }}>
                      <span dir="auto">Nhấn để mở</span>
                    </p>
                  </button>
                </div>
              )}

              {/* MODE: 3D GIFT BOX (Hộp quà 3D chuyển động kèm hộp mini trang trí) */}
              {giftMode === "gift_box" && (
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <button
                    type="button"
                    aria-label="Mở hộp mừng cưới"
                    className="group relative cursor-pointer outline-none border-none bg-transparent hover:scale-105 active:scale-95 transition-transform"
                    style={{ width: "260px", height: "280px" }}
                    onClick={() => setGiftModalOpen(true)}
                  >
                    <div className="relative w-full h-full flex items-end justify-center pb-[26px]">
                      <span className="igb-sparkle absolute pointer-events-none z-20" style={{ top: "8%", left: "14%", color: giftConfig.sectionTitleColor || "rgb(84, 46, 8)", fontSize: "22px" }}>✦</span>
                      <span className="igb-sparkle-2 absolute pointer-events-none z-20" style={{ top: "18%", right: "10%", color: giftConfig.sectionTitleColor || "rgb(84, 46, 8)", fontSize: "16px" }}>✦</span>
                      <span className="igb-sparkle-3 absolute pointer-events-none z-20" style={{ top: "32%", left: "5%", color: giftConfig.sectionTitleColor || "rgb(84, 46, 8)", fontSize: "14px" }}>✦</span>
                      <span className="igb-sparkle-4 absolute pointer-events-none z-20" style={{ top: "26%", right: "5%", color: giftConfig.sectionTitleColor || "rgb(84, 46, 8)", fontSize: "14px" }}>✦</span>
                      
                      {/* 8 Confetti particles */}
                      <div className="absolute pointer-events-none z-0" style={{ bottom: "187px", left: "50%" }}>
                        <div className="igb-confetti igb-c1" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5.5px", marginTop: "-2.75px", pointerEvents: "none", willChange: "transform, opacity", width: "11px", height: "5.5px", backgroundColor: "rgb(236, 72, 153)", borderRadius: "2px" }} />
                        <div className="igb-confetti igb-c2" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5px", marginTop: "-5px", pointerEvents: "none", willChange: "transform, opacity", width: "10px", height: "10px", backgroundColor: "rgb(84, 46, 8)", borderRadius: "50%" }} />
                        <div className="igb-confetti igb-c3" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5.5px", marginTop: "-2.75px", pointerEvents: "none", willChange: "transform, opacity", width: "11px", height: "5.5px", backgroundColor: "rgb(34, 197, 94)", borderRadius: "2px" }} />
                        <div className="igb-confetti igb-c4" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-4.5px", marginTop: "-4.5px", pointerEvents: "none", willChange: "transform, opacity", width: "9px", height: "9px", backgroundColor: "rgb(59, 130, 246)", borderRadius: "50%" }} />
                        <div className="igb-confetti igb-c5" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-6px", marginTop: "-3px", pointerEvents: "none", willChange: "transform, opacity", width: "12px", height: "6px", backgroundColor: "rgb(168, 85, 247)", borderRadius: "2px" }} />
                        <div className="igb-confetti igb-c6" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5px", marginTop: "-5px", pointerEvents: "none", willChange: "transform, opacity", width: "0px", height: "0px", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "10px solid rgb(250, 204, 21)" }} />
                        <div className="igb-confetti igb-c7" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-5px", marginTop: "-2.5px", pointerEvents: "none", willChange: "transform, opacity", width: "10px", height: "5px", backgroundColor: "rgb(195, 42, 41)", borderRadius: "2px" }} />
                        <div className="igb-confetti igb-c8" style={{ position: "absolute", left: "50%", top: "0px", opacity: 0, marginLeft: "-4.5px", marginTop: "-4.5px", pointerEvents: "none", willChange: "transform, opacity", width: "9px", height: "9px", backgroundColor: "rgb(249, 115, 22)", borderRadius: "50%" }} />
                      </div>

                      {/* Bobbing Box and Mini Decors */}
                      <div className="igb-bob relative" style={{ width: "200px", height: "220px" }}>
                        <div className="igb-shadow absolute pointer-events-none" style={{ left: "50%", bottom: "-8px", width: "144px", height: "12px", marginLeft: "-72px", borderRadius: "50%", backgroundColor: "rgba(0, 0, 0, 0.45)", filter: "blur(4px)", zIndex: 0, willChange: "transform, opacity" }} />
                        {(giftConfig.miniImgs || []).map((m, idx) => (
                          <img
                            key={idx}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className={m.className}
                            src={assetUrl(m.src)}
                            style={Object.fromEntries(
                              m.style.split(";").filter(Boolean).map((s) => {
                                const [k, ...v] = s.split(":");
                                const camel = k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                                return [camel, v.join(":").trim()];
                              })
                            )}
                          />
                        ))}
                        <img
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="igb-box absolute pointer-events-none"
                          src={assetUrl(giftConfig.mainBoxSrc || `/images/giftbox/${d.templateId}.webp`)}
                          style={{ left: "50%", bottom: "0px", width: "170px", maxHeight: "220px", objectFit: "contain", marginLeft: "-85px", zIndex: 2, filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 10px 18px)", willChange: "transform" }}
                        />
                      </div>
                    </div>
                    <p className="igb-hint absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium" style={{ color: giftConfig.sectionTitleColor || "rgb(84, 46, 8)" }}>
                      <span dir="auto">Nhấn để mở</span>
                    </p>
                  </button>
                </div>
              )}
            </section>
          )}

          {/* -------------------- FOOTER -------------------- */}
          {d.thanksOn && (isDarkRed ? (
            <footer className="relative z-10 flex flex-col items-center px-6 pb-10 text-center">
              <span className="whitespace-pre-line flex flex-col items-center gap-1 text-[12px] md:text-[13px] mx-auto" style={{ color: "rgb(81, 20, 25)", fontFamily: '"Times New Roman", serif' }}>{d.thanks}</span>
            </footer>
          ) : (
            <footer className="sp-footer">
              <p className="sp-thanks-msg">{d.thanks}</p>
            </footer>
          ))}

          {isDarkRed ? (
            <div className="relative z-20 flex items-center justify-center pb-3">
              <span className="text-xs opacity-50" style={{ color: "rgb(81, 20, 25)" }}>ChungDoi · Tạo thiệp cưới online miễn phí</span>
            </div>
          ) : (
            <div className="sp-brand-bottom">
              <span>ChungDoi · Tạo thiệp cưới online miễn phí</span>
            </div>
          )}
        </div>
        )
      )}

      {/* ==================== LIGHTBOX MODAL ==================== */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg} alt="Ảnh phóng to" />
            <button
              className="lightbox-close"
              onClick={() => setLightboxImg(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ==================== RSVP MODAL ==================== */}
      {rsvpOpen && (
        <div className="lightbox-overlay" onClick={() => setRsvpOpen(false)}>
          {rsvpBox}
        </div>
      )}

      {/* ==================== GIFT MODAL ==================== */}
      {giftModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setGiftModalOpen(false)}
        >
          <div
            className="w-full max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
            style={{ backgroundColor: giftConfig.modal.bodyBg || "rgb(248, 243, 224)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative px-6 pt-6 pb-4 text-center"
              style={{ backgroundColor: giftConfig.modal.headerBg || "rgb(195, 42, 41)" }}
            >
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-white/20"
                style={{ color: giftConfig.modal.headerColor || "white" }}
                onClick={() => setGiftModalOpen(false)}
                aria-label="Đóng"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2
                className="text-[21px] md:text-[25px] lg:text-[32px]"
                style={{
                  textShadow: "rgba(0, 0, 0, 0.2) 1px 1px 2px",
                  fontFamily: giftConfig.modal.headerFont || "Oswald, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: giftConfig.modal.headerColor || "white",
                }}
              >
                {d.giftTitle || giftConfig.modal.title || "Hộp Quà Mừng"}
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <div
                className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center"
                style={{ color: "rgb(84, 46, 8)" }}
              >
                {d.gifts.map((g) => {
                  const title =
                    g.who === "custom" && g.customLabel
                      ? g.customLabel
                      : g.who === "groom"
                      ? "Chú Rể"
                      : "Cô Dâu";
                  return (
                    <div
                      className="flex flex-col items-center flex-1 max-w-[180px] sm:max-w-none"
                      key={g.id}
                    >
                      <h3
                        className="mb-3 text-sm font-medium text-center line-clamp-2"
                        style={{ color: giftConfig.modal.headerBg || "rgb(195, 42, 41)" }}
                      >
                        {title} - {g.accountName}
                      </h3>
                      {g.qrUrl && !g.hideQr && (
                        <div
                          className="w-44 h-44 sm:w-48 sm:h-48 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center"
                          style={{
                            border: `2px solid ${
                              giftConfig.modal.headerBg
                                ? giftConfig.modal.headerBg.replace("rgb", "rgba").replace(")", ", 0.15)")
                                : "rgba(195, 42, 41, 0.125)"
                            }`,
                          }}
                        >
                          <img
                            alt={`QR - ${title} - ${g.accountName}`}
                            className="w-full h-full object-contain"
                            src={g.qrUrl}
                          />
                        </div>
                      )}
                      <div className="mt-3 text-center space-y-0.5">
                        <p className="text-xs" style={{ color: "rgb(84, 46, 8)" }}>
                          {g.bankName}
                        </p>
                        <p className="text-xs font-mono font-bold" style={{ color: "rgb(84, 46, 8)" }}>
                          {g.accountNumber}
                        </p>
                        <p className="text-xs font-semibold" style={{ color: "rgb(84, 46, 8)" }}>
                          {g.accountName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          className="text-xs px-3 py-1.5 inline-flex items-center gap-1 font-medium rounded-full transition-colors cursor-pointer"
                          style={{
                            color: giftConfig.modal.headerBg || "rgb(195, 42, 41)",
                            backgroundColor: giftConfig.modal.headerBg
                              ? giftConfig.modal.headerBg.replace("rgb", "rgba").replace(")", ", 0.082)")
                              : "rgba(195, 42, 41, 0.082)",
                          }}
                          onClick={() => copyToClipboard(g.accountNumber, g.id)}
                        >
                          {copiedBank === g.id ? "✓ Đã chép" : "Sao chép STK"}
                        </button>
                        {g.qrUrl && (
                          <a
                            href={g.qrUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={`vietqr-${g.bankCode}-${g.accountNumber}.png`}
                            className="text-xs px-3 py-1.5 inline-flex items-center gap-1 font-medium rounded-full transition-colors cursor-pointer"
                            style={{
                              color: giftConfig.modal.headerBg || "rgb(195, 42, 41)",
                              backgroundColor: giftConfig.modal.headerBg
                                ? giftConfig.modal.headerBg.replace("rgb", "rgba").replace(")", ", 0.082)")
                                : "rgba(195, 42, 41, 0.082)",
                              textDecoration: "none",
                            }}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Lưu QR
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
