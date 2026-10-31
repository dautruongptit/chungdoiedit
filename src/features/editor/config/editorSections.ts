// Section visibility per template.
//
// 01/11/2026: Từng dùng danh sách "có" (whitelist) suy ra từ dò từ khoá trong chunk JS trang gốc —
// ĐÃ CHỨNG MINH KHÔNG ĐÁNG TIN: 2/3 mẫu kiểm chứng tay (minimalism_brown, dragon_phoenix_v4_red) bị
// matrix báo sai (không bắt được module), khiến "Ảnh đầu thiệp" biến mất ở editor cho rất nhiều mẫu
// thực ra có ảnh đầu thiệp — lỗi nghiêm trọng, người dùng báo "ảnh đầu thiệp toàn bộ bị mất".
// Sửa: đổi hướng sang danh sách "chắc chắn không có" (blacklist), mặc định LUÔN HIỆN.
// Chỉ đưa vào blacklist khi có bằng chứng đo thật/người dùng xác nhận trực tiếp (không suy luận từ matrix).
// Mẫu đã có capabilities.json riêng (minimalism_brown, riviera_blue, dragon_phoenix_v4_red) không đọc
// các Set này — capabilities.editor.sections của chúng đã ghi đè trước ở getEditorSections().

/** Xác nhận bởi người dùng (song_hac_red): editor gốc không có "Ảnh đầu thiệp" lẫn "Sổ lưu bút". */
const NO_HERO_PHOTO = new Set(["song_hac_red"]);
const NO_GUESTBOOK = new Set(["song_hac_red"]);
const NO_ENVELOPE = new Set<string>([]);

export interface EditorSections {
  heroPhoto: boolean;
  guestbook: boolean;
  envelope: boolean;
}

export function editorSections(templateId: string): EditorSections {
  return {
    heroPhoto: !NO_HERO_PHOTO.has(templateId),
    guestbook: !NO_GUESTBOOK.has(templateId),
    envelope: !NO_ENVELOPE.has(templateId),
  };
}

// Vị trí thẻ "Thư viện ảnh" trong editor — đo thật trên 5 mẫu (docs/survey/editor-sync-*.md, 01/11/2026):
// 4/5 mẫu có Album NGAY SAU Lễ (mặc định); chỉ minimalism_brown đo được là NGAY SAU Hero.
// Toàn bộ thứ tự còn lại khớp 100% ở cả 5 mẫu đo — không cần hệ thống order tổng quát, chỉ cần đòn bẩy này.
// Lưu ý: dragon_phoenix_v4_red đã đo là "sau Lễ" (xem capabilities.json của mẫu đó) — KHÔNG thuộc tập này.
const ALBUM_AFTER_HERO = new Set([
  "minimalism_brown", // đo thật khi clone mẫu này
]);

export function albumCardAfter(templateId: string): "hero" | "ceremony" {
  return ALBUM_AFTER_HERO.has(templateId) ? "hero" : "ceremony";
}
