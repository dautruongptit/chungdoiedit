import { getGiftboxConfig } from "@/features/invitation/config/giftboxConfigs";
import { TPL_CDN, introDefaultFor, type Tpl } from "@/features/templates/data/templates";
import type { Inv } from "@/types/invitation";
import type { Card } from "@/types/card";
import type { Guest } from "@/types/guest";
import { blankInv } from "@/features/editor/data/defaultData";
import { TEMPLATE_THEMES } from "@/features/invitation/config/templateThemes";

export type { Card, Guest };

const KEY = "chungdoi.cards";

const SEED: Card[] = [];

export function loadCards(): Card[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Card[];
  } catch {
    /* ignore corrupt storage */
  }
  return SEED;
}

export function saveCards(cards: Card[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cards));
  } catch {
    /* storage unavailable (private mode) – state still lives in memory */
  }
}

/** Tạo thiệp nháp từ một mẫu và trả về id để mở editor. */
export function createDraft(t: Tpl): string {
  const id = crypto.randomUUID();
  const cards = loadCards();
  const [template, ...rest] = t.name.split(" - ");
  const d = new Date();
  const created = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  saveCards([...cards, { id, name: `Thiệp ${cards.length + 1}`, template, color: rest.join(" - "), status: "draft", created, tplId: t.id }]);
  const palette = TEMPLATE_THEMES[t.id];
  const dressColors = palette
    ? [palette.ink, palette.bg, "#d6c5b3", "#ece5dd"]
    : ["#542e08", "#9c7653", "#d6c5b3", "#ece5dd"];
  const initialInv: Inv = {
    ...blankInv,
    templateId: t.id,
    templateName: t.name,
    templateThumb: TPL_CDN + t.img,
    introText: introDefaultFor(t.id),
    dressColors,
    // Kiểu hộp quà mặc định theo mẫu (phong bì hay hộp quà 3D) như trang gốc
    giftDisplayMode: getGiftboxConfig(t.id).giftboxType === "envelope" ? "envelope" : "gift_box",
  };
  saveInv(id, initialInv);
  return id;
}

const INV_KEY = (cardId: string) => `chungdoi.inv.${cardId}`;

/** Nội dung editor của một thiệp (chỉ lưu trong trình duyệt này). */
export function loadInv(cardId: string): Inv | null {
  try {
    const raw = localStorage.getItem(INV_KEY(cardId));
    if (raw) return JSON.parse(raw) as Inv;
  } catch {
    /* ignore corrupt storage */
  }
  return null;
}

export function saveInv(cardId: string, inv: Inv) {
  try {
    localStorage.setItem(INV_KEY(cardId), JSON.stringify(inv));
  } catch {
    /* quota hoặc private mode: dữ liệu vẫn nằm trong state */
  }
}

export function removeInv(cardId: string) {
  try {
    localStorage.removeItem(INV_KEY(cardId));
  } catch {
    /* ignore */
  }
}

const GUESTS_KEY = (cardId: string) => `chungdoi.guests.${cardId}`;

export function loadGuests(cardId: string): Guest[] {
  try {
    const raw = localStorage.getItem(GUESTS_KEY(cardId));
    if (raw) return JSON.parse(raw) as Guest[];
  } catch {
    /* ignore corrupt storage */
  }
  return [];
}

export function saveGuests(cardId: string, guests: Guest[]) {
  try {
    localStorage.setItem(GUESTS_KEY(cardId), JSON.stringify(guests));
  } catch {
    /* storage unavailable */
  }
}

/** Xóa thiệp thì phải xóa luôn danh sách khách (dữ liệu cá nhân) của thiệp đó. */
export function removeGuests(cardId: string) {
  try {
    localStorage.removeItem(GUESTS_KEY(cardId));
  } catch {
    /* ignore */
  }
}

/** Link riêng của một khách: luôn gắn với thiệp, dùng chung cho hiển thị, sao chép và CSV. */
export const guestUrl = (cardId: string, g: Guest) => `https://chungdoi.com/i/${cardId.slice(0, 8)}/${g.slug}`;
