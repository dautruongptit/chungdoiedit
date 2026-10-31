import type { Inv } from "@/types/invitation";

export interface CoverProps {
  d: Inv;
  onOpen: () => void;
}

export interface CoverImage {
  src: string;
  className: string;
  style?: React.CSSProperties;
}

export interface CoverConfig {
  slug: string;
  templateId: string;
  templateName: string;
  sig: string;
  bg: string;
  cardBg: string;
  cardBorder: string;
  imgs: CoverImage[];
  particleType: "xi" | "xi-gold" | "petal" | "blossom" | "confetti" | "stars" | "heart";
  sealType: "xi" | "heart" | "none";
  sealBg: string;
  sealColor: string;
  sealTop?: number;
  nameFont: string;
  accentColor: string;
  textColor: string;
  rgb: string;
  btnBg: string;
  btnTextColor: string;
  /** Tên cô dâu chú rể lên cỡ lớn từ breakpoint sm (640px) thay vì md (768px), như trang gốc. */
  nameFromSm?: boolean;
  /** Hiệu ứng chuyển cảnh riêng khi bấm "Mở thiệp" (mặc định: hạt tuôn từ dấu sáp + 2 vòng sóng). */
  openFx?: "center-hearts" | "dragon-fly";
  /** Màu chữ ngày/khách mời khi trang gốc không dùng mặc định chung (mặc định: textColor + opacity 0.85 / nâu 0.72). */
  dateColor?: string;
  guestColor?: string;
  /** Font dấu "&" giữa tên (mặc định Baskerville) */
  ampFont?: string;
  /** Con dấu là một ảnh (nền trong suốt, không đổ bóng) thay vì chữ/biểu tượng; ví dụ ảnh song hỷ của Long Phụng V4 */
  sealImg?: string;
  /** Đường kính con dấu (mặc định 56) */
  sealSize?: number;
}
