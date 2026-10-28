import type { Inv } from "@/types/invitation";
import { brideShown, groomShown } from "@/utils/format";

export const WEEKDAYS_FULL = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];
export const WEEKDAYS_SHORT = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

/** Ngày mặc định khi thiệp chưa nhập ngày: thứ Bảy đầu tiên từ 30 ngày nữa (giống trang gốc). */
export function defaultWeddingDate(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
  while (d.getDay() !== 6) d.setDate(d.getDate() + 1);
  return d;
}

export function parseDate(s: string) {
  if (!s) return defaultWeddingDate();
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function monthGrid(s: string) {
  const dt = parseDate(s);
  const y = dt.getFullYear();
  const m = dt.getMonth();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7; // Monday first
  const days = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = Array(offset).fill(null);
  for (let i = 1; i <= days; i++) cells.push(i);
  return { y, m, selected: dt.getDate(), cells };
}

export function formatTime(t: string, clock: "24h" | "ampm" = "24h") {
  if (!t || clock === "24h") return t;
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${ap}`;
}

export function buildIcs(inv: Inv) {
  const d = (inv.date || "20260503").replace(/-/g, "");
  const t = (inv.time || "18:00").replace(":", "") + "00";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${d}T${t}`,
    `SUMMARY:Tiệc cưới ${brideShown(inv)} & ${groomShown(inv)}`,
    `LOCATION:${inv.address}`.trim(),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
