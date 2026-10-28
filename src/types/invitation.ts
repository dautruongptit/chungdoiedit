export type Wish = { name: string; msg: string; at: string };

export type GiftMethod = {
  id: string;
  who: "groom" | "bride" | "custom";
  type?: string;
  bankName: string;
  bankCode: string;
  bankBin?: string;
  bankLogo?: string;
  accountNumber: string;
  accountName: string;
  customLabel?: string;
  qrUrl?: string;
  /** Giá trị các ô của form phương thức (PayPal, Wise, SEPA...) theo khóa ô nhập. */
  fields?: Record<string, string>;
  /** Ẩn mã QR, chỉ hiện thông tin chữ / nút bấm. */
  hideQr?: boolean;
};

export type Gift = GiftMethod;

export type Ceremony = {
  title: string;
  date: string;
  time: string;
  place: string;
  lunar?: string;
};

export type TimelineEvent = {
  time: string;
  text: string;
};

export type RsvpResponse = { name: string; phone: string; attending: string; count: string; answers: Record<string, string>; note: string; at: string };

export interface Inv {
  templateId: string;
  templateName: string;
  templateThumb: string;
  photoCrops: Record<string, { z: number; x: number; y: number }>;
  heroOn: boolean;
  heroPhoto: string;
  heroZoom: number;
  heroX: number;
  heroY: number;
  introCustom: boolean;
  introText: string;
  groomFull: string;
  brideFull: string;
  groomNick: string;
  brideNick: string;
  groomRole: string; // e.g. "Út Nam" or "Chú rể"
  brideRole: string; // e.g. "Út Nữ" or "Cô dâu"
  order: "groom" | "bride";
  albumOn: boolean;
  albumLayout: "grid" | "collage" | "3d";
  photos: string[];
  familyOn: boolean;
  groomFamTitle: string;
  brideFamTitle: string;
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;
  groomAddr: string;
  brideAddr: string;
  announceOn: boolean;
  announcementLine1: string;
  announcementLine2: string;
  announce: string;
  ceremonyTitle: string;
  ceremonies: Ceremony[];
  partyOn: boolean;
  banquetType: "wedding" | "reception" | "engagement";
  banquetTitle: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  clock: "24h" | "ampm";
  hideWelcomeTimes: boolean;
  welcomeTime: string;
  startTime: string;
  countdown: boolean;
  locTitle: string;
  address: string;
  showMap: boolean;
  mapUrl: string;
  rsvpOn: boolean;
  rsvpDisplay: "button" | "inline";
  partyMode: "free" | "limit";
  partyLimit: number;
  questions: string[];
  dressOn: boolean;
  dressTitle?: string;
  dressText: string;
  dressColors: string[];
  schedOn: boolean;
  schedTitle?: string;
  sched: TimelineEvent[];
  guestOn: boolean;
  wishes: Wish[];
  /** Phản hồi RSVP của khách (riêng tư, KHÔNG hiển thị trên thiệp); chỉ lưu trong trình duyệt này, chưa có backend. */
  rsvps?: RsvpResponse[];
  giftOn: boolean;
  giftTitle: string;
  giftDisplayMode: "gift_box" | "envelope" | "qr_inline";
  gifts: GiftMethod[];
  thanksOn: boolean;
  thanks: string;
  musicName: string;
  musicUrl: string;
  musicAutoPlay: boolean;
  envelopeGuest: string;
  envelopeInviteMessage: string;
  envelopeText: string;
  shareStyle: "envelope" | "photo";
  customSharePhoto?: string;
}
