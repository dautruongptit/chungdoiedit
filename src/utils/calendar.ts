import type { Inv } from "@/types/invitation";
import { brideShown, groomShown } from "@/utils/format";

/** Liên kết "Thêm vào Google Calendar" cho tiệc cưới (giờ Việt Nam, UTC+7). */
export function googleCalendarUrl(d: Inv) {
  const day = (d.date || "2026-05-03").replace(/-/g, "");
  const [h, m] = (d.startTime || d.time || "18:00").split(":").map(Number);
  const fmt = (hh: number) => `${day}T${String(((hh % 24) + 24) % 24).padStart(2, "0")}${String(m || 0).padStart(2, "0")}00`;
  const names = `${groomShown(d)} & ${brideShown(d)}`;
  const q = new URLSearchParams({ action: "TEMPLATE", text: `Đám cưới ${names}`, dates: `${fmt(h - 7)}Z/${fmt(h - 5)}Z`, ctz: "Asia/Ho_Chi_Minh", details: `Tiệc cưới của ${names} tại ${d.address}`, location: d.address });
  return `https://www.google.com/calendar/render?${q.toString()}`;
}
