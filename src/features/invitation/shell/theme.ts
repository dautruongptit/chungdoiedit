/**
 * Chủ đề riêng của một mẫu (đọc từ `specs/<id>/theme.json`).
 * Các khối trong `blocks/` không chứa màu / đường dẫn ảnh cố định mà đọc từ đây.
 */
export interface ThemeJson {
  /** Thư mục ảnh trang trí/nền của mẫu, tính từ gốc site (không có dấu / ở cuối) */
  assets: string;
  /**
   * Màu của mẫu. Khóa lõi dùng chung: ink (chữ chính, rgb(...)), inkRgb ("r, g, b" để ghép rgba), paper (nền trang),
   * edge (viền khung ngoài ≥768px, có thể có alpha), cream (chữ sáng trên nền ink, vd nút nhạc).
   * Mỗi họ bố cục có thể thêm khóa riêng (minimalism: sub, muted, line, accent; riviera: text...).
   */
  colors: Record<string, string>;
  /** Giá trị khác không phải màu (vd danh sách icon lịch trình), dạng chuỗi */
  tokens?: Record<string, string>;
}

/** Mọi khối đọc chủ đề qua đối tượng này (t.ink, t.assets...). */
export type ThemeTokens = { assets: string } & Record<string, string>;

export const buildTheme = (j: any): ThemeTokens => ({ assets: j.assets, ...(j.colors ?? {}), ...j, ...(j.tokens ?? {}) });
