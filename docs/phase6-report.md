# Phase 6 — Báo cáo kiểm tra (mẫu `minimalism_brown`)

Chạy bằng `scripts/phase6_audit.mjs` (mẫu Nâu ở 390/768/1440 + editor) và `scripts/phase6_all.mjs` (75 mẫu, bìa + thiệp mở, 390px).
Số liệu thô: `docs/phase6-results.json`, `docs/phase6-all-templates.json`. Không sửa mã trong phase này.

## Đạt
- `tsc` sạch; `vite build` thành công.
- Không có lỗi console, không có request 4xx/5xx, không ảnh vỡ, không tràn ngang ở 390/768/1440 (bìa và thiệp mở) và ở editor 390.
- 75 mẫu: 74 mẫu không có lỗi; không mẫu nào bị hộp thoại lộ ra hay tràn ngang.
- Bìa mẫu Nâu 390px so với ảnh gốc: sai khác điểm ảnh trung bình 1,58/255 (1,18% điểm lệch >24, chủ yếu là lá rơi và nút Messenger của trang gốc).
- Chiều cao 390px: đúng ở 10/11 khối (header 661, lễ 894, album 502, địa điểm 467, dress 194, lịch trình 381, lưu bút 921, hộp quà 398, cảm ơn 76, thương hiệu 28).
- Tương tác chạy đúng: album trước/sau, gửi lời chúc (thêm vào đầu danh sách, xóa ô nhập), mở/đóng hộp quà (2 thẻ), liên kết Google Calendar và chỉ đường, mở hộp thoại RSVP, nút nhạc, `?guest=`.
- Editor: gõ tên, xem trước hiện đúng; sau khi tải lại vẫn còn.

## Lỗi và chênh lệch cần sửa (gộp một lần)

| # | Mức | Vấn đề | Đề xuất sửa |
|---|---|---|---|
| 1 | Cao | Demo mẫu Nâu vẫn hiển thị album "1 / 6" và ảnh chính `couple.webp`, trong khi bản gốc là 8 ảnh và ảnh thư viện. Đoạn gán `photos` và `heroPhoto` cho nhánh `isBrown` trong `src/pages/Demo.tsx` chưa áp dụng. | Gán lại 8 ảnh mẫu và ảnh chính trong nhánh `isBrown`. |
| 2 | Cao | Thiệp mới: dòng âm lịch ở khối tiệc cưới bị ẩn (do `d.date` rỗng), trong khi bản gốc hiện âm lịch của ngày mặc định. | Dùng `lunarLabel(dt)` không phụ thuộc `d.date`. |
| 3 | Trung | Mẫu Nâu bỏ qua các trường: `introText`/`introCustom` ("THE WEDDING OF" cứng), `giftTitle` ("Hộp Quà Mừng" cứng), `showMap`/`mapUrl` (bản đồ cứng), `countdown`, `heroZoom/X/Y` và `photoCrops`, `rsvpDisplay: inline`, `giftDisplayMode` (mẫu chỉ có hộp 3D, không có phong bì/QR inline). | Nối các trường vào `MinimalismBrown.tsx`. |
| 4 | Trung | Nhạc mặc định là `/music/my-love-westlife.mp3`; bản gốc là `la-anh.mp3`. | Đổi nhạc mặc định theo mẫu (kiểm tra có tệp cục bộ). |
| 5 | Trung | Demo không tự cuộn ~50px/s như bản gốc. | Thêm tự cuộn, dừng khi có wheel/touch/mouse. |
| 6 | Thấp | Khối tiệc cưới cao 839px, bản gốc 842px (−3px). | Tìm khoảng trống 3px (khối đón khách/khai tiệc hoặc lịch). |
| 7 | Thấp | Thanh cuộn của danh sách lời chúc: bản gốc mảnh, màu nâu nhạt; bản clone dùng thanh mặc định. | CSS `scrollbar-color`/`scrollbar-width`. |
| 8 | Thấp | Mẫu `co-ba-do` (thiệp mở): cảnh báo React "two children with the same key". | Sửa key trùng trong danh sách của mẫu này. |

## Chưa kiểm tra được (cần bản gốc)
- **768 và 1440:** tổng chiều cao clone lệch −139px ở cả hai khổ (6385 so với 6524; 6405 so với 6544). Nguyên nhân là khối nào chưa biết vì chưa đo được từng khối của bản gốc ở hai khổ này. Cloudflare đang chặn trang gốc.
- Chuỗi hiệu ứng mở thiệp (tim đập, thẻ nâng, lá bung) và kích thước lá rơi.
- Hộp thoại hộp quà của bản gốc (so với bản clone).
- Màu và chi tiết tính toán của từng khối sau khi nối dữ liệu.

## Ghi chú
- Bản xem trước thiệp mới không có khối "Lễ cưới" vì chưa có buổi lễ nào; chưa đối chiếu với bản gốc.
- `scripts/` còn nhiều tệp debug cũ, chưa dọn, chưa commit.

---

# Cập nhật sau khi truy cập lại được bản gốc

Đo lại bản gốc (iframe 768 và 1440, mỗi khổ một lần tải) rồi sửa gộp một lần.

## Nguyên nhân gốc tìm được
1. `src/styles/styles.css` có khối tiện ích cũ (`.flex`, `.gap-*`, `.p-*`, `.items-*`, `.justify-*`…) khai báo `!important`, đè lên mọi biến thể Tailwind (`md:gap-4`, `md:flex-row`…). Đã bỏ `!important` ở khối này (kiểm tra: chiều cao thẻ editor ở 1280 và 390, trang chủ, kho mẫu, "Thiệp của tôi" không đổi).
2. App tắt Tailwind preflight, còn trang gốc có preflight: `border-b`, `border-b-2` không vẽ viền, ảnh/`h*`/`ol`/`a` khác mặc định. Đã thêm preflight riêng cho mẫu Nâu (độ ưu tiên 0, qua `:where`).
3. Bản dump tĩnh của mẫu Nâu có style nội tuyến chép từ kích thước tính toán ở 390px (vd `fontSize:12px`), đè lên các lớp `md:text-[13px]`. Đã bỏ ở tên bố mẹ; tên cặp đôi (46px), dòng thứ trong lịch (17px) và khoảng cách trên danh sách lời chúc (65px/130px) dùng lớp riêng theo breakpoint.

## Kết quả đo (clone so với gốc)
| Khổ | Tổng | Header | Lễ | Album | Tiệc | Địa điểm | Dress | Lịch trình | Lưu bút | Hộp quà | Cảm ơn | Brand |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 390 | 5412 / 5413 | 661 | 894 | 502 | 842 | 467 | 194 | 381 | 921 | 398 | 76 | 28 |
| 768 | 6524 / 6524 | 1056 | 968 | 682 | 944 | 594 | 222 | 405 | 1118 | 398 | 60 | 28 |
| 1440 | 6544 / 6544 | 1056 | 968 | 682 | 944 | 594 | 222 | 405 | 1138 | 398 | 60 | 28 |

Mọi khối trùng số đo bản gốc (390px còn lệch 1px ở tổng, chưa rõ nguồn).

## Trạng thái các mục
| # | Trạng thái |
|---|---|
| 1 Demo album 8 ảnh + ảnh chính | Xong (album "1 / 8") |
| 2 Âm lịch thiệp mới | Xong |
| 3 Trường bị bỏ qua | Xong: lời mở đầu, tiêu đề hộp quà, bản đồ (`showMap`, `mapUrl`, bấm để tải), cắt/phóng ảnh chính. Chưa làm: `countdown` (bản gốc mẫu Nâu không có), RSVP inline, `giftDisplayMode` (mẫu chỉ có hộp 3D) |
| 4 Nhạc mặc định | Chưa: cần tải `la-anh.mp3` về (chưa được phép tải tệp nhạc) |
| 5 Tự cuộn | Xong (`?autoscroll=0` để tắt) |
| 6 Tiệc −3px | Xong (do thiếu viền trong lịch) |
| 7 Thanh cuộn lời chúc | Xong (mảnh, màu nâu nhạt) |
| 8 Key trùng `dau-re` (co-ba-do) | Xong |

Quét lại 75 mẫu ở 390px: 0 mẫu có lỗi. Chưa so lại bố cục các mẫu khác ở 768/1440 sau khi bỏ `!important` (không có số đo gốc để đối chiếu).
