import type { Inv } from "@/types/invitation";

export const groomShown = (d: Inv) => d.groomNick || d.groomFull || "Chú Rể";
export const brideShown = (d: Inv) => d.brideNick || d.brideFull || "Cô Dâu";

/** Nối hai từ cuối bằng khoảng trắng không ngắt (mẫu Riviera dùng cho tiêu đề/địa điểm). */
export const nb = (s: string) => s.replace(/ (?=[^ ]*$)/, "\u00a0");
