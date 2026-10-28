# Spec — mẫu `minimalism_brown` (Phase 1: audit)

Nguồn: `chungdoi.com/vi/mau-thiep/minimalism-nau/demo` (`?open=1` mở thẳng thiệp) và editor `/edit/<id>?template=minimalism_brown`.
Ảnh tham chiếu: `docs/reference/` (390 / 768 / 1440 + editor 1920). Token: `docs/design-tokens.json`.
Tài nguyên chỉ dùng học tập trên localhost, không public/thương mại.

## 1. Màn 1 — Cover
- Nền gradient `#f3e6da → #e8d5c4 → #dcc6b2` (to right bottom). Thẻ 310×443 (390px), bo 8, đổ bóng lớn.
- Hoa khô `flower2-decoration` ở góc, huy hiệu trái tim, tên (EB Garamond 30), "&", ❦, ngày, "Thân Mời", nút "Mở thiệp" (Lora 18/600, nền `#7c6a60`, pill).
- Lá rơi `ambient-fall` 19–25s. Nút là `<a href="?open=1">`.
- Chuỗi mở: tim đập + vòng → thẻ nâng/mờ + lá bung → nội dung → tooltip "Chạm để phát nhạc" → tự cuộn.

## 2. Màn 2 — Thiệp đã mở
Root: `relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden`, nền `#fff7f3`. Thứ tự và chiều cao @390:

| # | Section | Cao |
|---|---|---|
| 0 | Header: THE WEDDING OF, tên, khung polaroid + ảnh + dấu sáp | 661 |
| 1 | THÔNG TIN LỄ CƯỚI (giấy `paper.webp` op .5) | 894 |
| 2 | ALBUM ẢNH (coverflow, "n / 8") | 502 |
| 3 | THÔNG TIN TIỆC CƯỚI (đếm ngược, lịch, Thêm vào lịch, RSVP) | 842 |
| 4 | Địa điểm + Google Maps + Chỉ đường | 467 |
| 5 | DRESS CODE (4 ô màu) | 194 |
| 6 | LỊCH TRÌNH NGÀY CƯỚI (3 icon gate/cake/water) | 381 |
| 7 | SỔ LƯU BÚT | 921 |
| 8 | HỘP QUÀ MỪNG (hộp 3D) | 398 |
| 9 | Footer cảm ơn | 76 |
| 10 | "♡ chungdoi.com" | 28 |

Tổng: 5413 @390, 6524 @768, 6544 @1440. Hành vi: demo tự cuộn ~50px/s tới khi có wheel/touch/mouse; nhạc `la-anh.mp3`.

## 3. Màn 3 — Editor
Chế độ "Chỉnh sửa / Xem trước" (không chia đôi). 16 mục: Cơ bản, Ảnh chính, Album, Gia đình, Thông báo, Lễ cưới, Tiệc, RSVP, Dress code, Lịch trình, Sổ lưu bút, Hộp quà, Lời cảm ơn, Nhạc, Phong thư, Chia sẻ. Chỉ giữ 1 bản nháp. Tham chiếu: `brown_editor_1920_*.png`.

## 4. Đối chiếu bản clone (đo ở 390px)

| Section | Gốc | Clone | Lệch |
|---|---|---|---|
| Header | 661 | 661 | 0 |
| Lễ cưới | 894 | 894 | 0 |
| Album | 502 | 502 | 0 |
| Tiệc cưới | 842 | 839 | −3 |
| Địa điểm | 467 | 467 | 0 |
| Dress code | 194 | 194 | 0 |
| Lịch trình | 381 | 381 | 0 |
| Sổ lưu bút | 921 | 888 | −33 (gốc có lời chúc mẫu) |
| Hộp quà | 398 | 398 | 0 |
| Footer | 76 | 76 | 0 |
| Tổng | 5413 | 5376 | −37 |

Chưa kiểm: 768/1440 theo từng section; màu/chi tiết computed của từng khối; cover (màn 1) ở clone; hộp quà minis `minimalism_brown`.

## 5. Khoảng trống đề xuất cho Phase 2+
RSVP lưu dữ liệu, thêm vào lịch (.ics), `?guest=`, đồng bộ editor↔preview, lời chúc mẫu để khớp chiều cao sổ lưu bút, vá −3px khối tiệc cưới.
