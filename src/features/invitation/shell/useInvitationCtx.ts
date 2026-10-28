import React, { useState, useRef, useEffect } from "react";
import type { Inv } from "@/types/invitation";
import { groomShown, brideShown } from "@/utils/format";
import { WEEKDAYS_FULL, buildIcs, formatTime, monthGrid, parseDate } from "@/utils/date";
import { googleCalendarUrl } from "@/utils/calendar";
import { lunarLabel } from "@/utils/lunar";
import { assetUrl } from "@/services/asset";
import { introDefaultFor } from "@/features/templates/data/templates";
import type { ThemeTokens } from "@/features/invitation/shell/theme";
import { useIsMd, useViewportWidth } from "@/features/invitation/shell/useMedia";

const SAMPLE_ALBUM = ["1e0986014ff4206f135df254987fb52eb45ae964e8cce6f0dba29a905e0e0b67","cea4d58014368af2908a492045ec39a91ab5ed17d4544eb6520733a40beb078a","6c5d0a317cc97ce46cf6798f0248ceb3d97739840e1f27fc5040798c21ad55c6","3f8b94b89026dc3738bb80e625b8ee993ce93949e595ef9539b9c41d17898671","6f6851cc63126158d802563c047297dd76ba3f532c1e3809a556ab617c312000","1c177f9721cd1802abf4fa62e6f22113bb477130cbc30b138c7a42cd995bb670","0c4b3896fb70a7e08523a1299f851735fa4544c530ad41ab5ce1a6dc4677173c","1bbb42e6ee9c2736341c2a79759bae02176bbb899bfca22cc71c0fa860f64a9e"].map((h) => `/images/photo-library/design/${h}.webp`);

export const isLightColor = (hex: string) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return false;
  const n = parseInt(m[1], 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 > 0.85;
};

export function useInvitationCtx(d: Inv, set: (p: Partial<Inv>) => void, t: ThemeTokens) {
  const isMd = useIsMd();
  const vw = useViewportWidth();
  /** Nội suy tuyến tính giữa giá trị đo ở 768px và ở 1440px (giá trị trang trí parallax phụ thuộc bề rộng) */
  const mix = (a: number, b: number) => a + (b - a) * Math.min(1, Math.max(0, (vw - 768) / 672));
  const gName = groomShown(d);
  
  const bName = brideShown(d);
  
  const brideFirst = d.order === "bride";
  
  const [n1, n2] = brideFirst ? [bName, gName] : [gName, bName];
  
  const [r1, r2] = brideFirst ? [d.brideRole, d.groomRole] : [d.groomRole, d.brideRole];
  
  const full1 = (brideFirst ? d.brideFull : d.groomFull) || (brideFirst ? "Họ Tên Cô Dâu" : "Họ Tên Chú Rể");
  
  const full2 = (brideFirst ? d.groomFull : d.brideFull) || (brideFirst ? "Họ Tên Chú Rể" : "Họ Tên Cô Dâu");
  
  const famOf = (title: string, f: string, m: string, addr: string, who: string) => ({ title, f: f || `Họ Tên Cha ${who}`, m: m || `Họ Tên Mẹ ${who}`, addr });
  
  const fams = [
      famOf(d.groomFamTitle, d.groomFather, d.groomMother, d.groomAddr, "Chú Rể"),
      famOf(d.brideFamTitle, d.brideFather, d.brideMother, d.brideAddr, "Cô Dâu"),
    ];
  
  if (brideFirst) fams.reverse();
  
  const intro = d.introCustom && d.introText.trim() ? d.introText.trim() : introDefaultFor(d.templateId);
  
  const g = monthGrid(d.date);
  
  const albumPhotos = d.photos.length > 0 ? d.photos : SAMPLE_ALBUM;
  
  const heroSrc = (d.heroOn ? d.heroPhoto : "") || d.photos[0] || assetUrl("/images/avatar-placeholder.jpeg");
  
  const dt = parseDate(d.date);
  
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  
  const [rsvpOpen, setRsvpOpen] = useState(false);
  
  const [wishName, setWishName] = useState("");
  
  const [wishMsg, setWishMsg] = useState("");
  
  const giftTitle = (g: Inv["gifts"][number]) => (g.who === "custom" && g.customLabel ? g.customLabel : g.who === "groom" ? "Chú Rể" : "Cô Dâu");
  
  const saveQr = (g: Inv["gifts"][number]) => {
      if (!g.qrUrl) return;
      const a = document.createElement("a");
      a.href = g.qrUrl;
      a.download = `vietqr-${g.bankCode}-${g.accountNumber}.png`;
      a.click();
    };
  
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  
  const copyToClipboard = (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopiedBank(id);
      setTimeout(() => setCopiedBank(null), 2500);
    };
  
  const handleSendWish = (e: React.FormEvent) => {
      e.preventDefault();
      if (!wishName.trim() || !wishMsg.trim()) return;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
      const newWish = { name: wishName.trim(), msg: wishMsg.trim(), at: timeStr };
      set({ wishes: [newWish, ...d.wishes] });
      setWishName("");
      setWishMsg("");
    };
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
      }
    }, []);
  
  const toggleMusic = () => {
      if (!audioRef.current) return;
      if (isPlayingMusic) {
        audioRef.current.pause();
        setIsPlayingMusic(false);
      } else {
        audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
      }
    };
  
  const addToCalendar = () => {
      const blob = new Blob([buildIcs(d)], { type: "text/calendar;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `dam-cuoi-${gName}-${bName}.ics`;
      a.click();
    };

  return { d, set, t, isMd, mix, gName, bName, brideFirst, n1, n2, r1, r2, full1, full2, famOf, fams, intro, g, albumPhotos, heroSrc, dt, isPlayingMusic, setIsPlayingMusic, giftModalOpen, setGiftModalOpen, lightboxOpen, setLightboxOpen, activePhotoIdx, setActivePhotoIdx, rsvpOpen, setRsvpOpen, wishName, setWishName, wishMsg, setWishMsg, giftTitle, saveQr, copiedBank, setCopiedBank, copyToClipboard, handleSendWish, audioRef, toggleMusic, addToCalendar };
}

export type InvitationCtx = ReturnType<typeof useInvitationCtx>;
