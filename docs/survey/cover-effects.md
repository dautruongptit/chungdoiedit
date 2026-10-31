# Hiệu ứng bìa và mở thiệp của trang thật (đo từ mã `EnvelopeCover`, 01/11/2026)

Nguồn: component bìa của chungdoi.com (chunk tải khi mở trang demo), đọc trực tiếp từ mã chạy trên trang. Chỉ ghi lại **thông số hành vi** để dựng lại; không sao chép mã nguồn.

## 1. Hạt nền (đang chờ mở)
- **12 hạt** mỗi mẫu. Vị trí là **cố định theo mẫu** nhờ bộ sinh ngẫu nhiên có hạt giống: hạt giống = băm FNV-1a 32 bit của chuỗi `"<mã mẫu>:<a>:<s>"` (a, s là hai tham số của component, chưa xác định ý nghĩa; mặc định hạt giống dùng `"default"` khi không có mã mẫu), rồi bộ sinh dạng mulberry32 (hằng số `0x6d2b79f5`).
- Thứ tự gọi bộ sinh cho mỗi hạt `s = 0..11`: `n = 18 + 8·r` (thời lượng, giây) → `x = 5 + 90·r` (%) → màu = `particleColors[floor(r·len)]` → `size = 10 + 14·r` (px) → (confetti: `r < 0.5` ⇒ hình chữ nhật, ngược lại tam giác) → `delay = -r·n` (giây, âm) → `sway = (r − 0.5)·60` (px).
- Hoạt ảnh: `ambient-fall {n}s ease-in-out {delay}s infinite`, **riêng `happiness` (囍) dùng `ambient-rise`** và xuất phát từ đáy (`bottom: -30px`) thay vì từ đỉnh (`top: -30px`).
- `ambient-fall`: 0% `translateY(-8vh)`, opacity 0 → 10% opacity .5 → 50% `translateY(48vh) translateX(var(--sway)) rotate(180deg)`, opacity .6 → 92% opacity .45 → 100% `translateY(105vh) rotate(360deg)`, opacity 0.
- `ambient-rise`: 0% `translateY(6vh)`, opacity 0 → 12% .45 → 55% `translateY(-42vh) translateX(var(--sway)) rotate(8deg)`, opacity .55 → 92% .35 → 100% `translateY(-92vh)`, opacity 0.
- Lớp hạt: `absolute inset-0 pointer-events-none overflow-hidden`, `z-index: 1`.

## 2. Hình hạt theo `particleType`
| `particleType` | Hình |
|---|---|
| `flowers` | SVG 6 cánh elip (`rx 2.2, ry 4.5`, xoay 0/60/120/180/240/300°) + nhụy tròn r 1.8 (độ mờ .45) |
| `happiness` | chữ 囍 |
| `leaves` | SVG chiếc lá (đường vẽ một lá) |
| `petals` | emoji 🌸 |
| `sparkles` | ký tự ✦ |
| `confetti` | chữ nhật 0.4em×0.7em hoặc tam giác (viền 0.3em/0.6em) |
| `hearts` | SVG trái tim |
Tất cả cỡ `1em` theo `font-size = size`, màu `currentColor`.

## 3. Bắn hạt khi bấm mở
- **32 hạt**, dùng `Math.random` (không hạt giống): góc `2π·t/32 + (r − .5)·.4`, bán kính `25 + 60·r` (%) quanh tâm 50%/50%, `size = 10 + 16·r`, `rotStart = (r − .5)·30`, `rotEnd = (r − .5)·360`, `delay = .15·r`.
- Mỗi hạt có `text-shadow: 0 0 10px <màu>`, biến `--dx = (x − 50)·5 px`, `--dy` tương tự; hoạt ảnh `particle-burst`: 0% opacity 0, scale 0 → 15% opacity 1, scale 1.3, xoay `--rot-start` → 100% opacity 0, dịch `(--dx, --dy)`, scale .6, xoay `--rot-end`. Lớp hạt `z-index: 100`. Tự xóa sau 1.5 s.
- Đây chính là hiệu ứng "pháo hoa" khi mở thiệp: chỉ khác loại hạt và màu theo mẫu.

## 4. Các hoạt ảnh khác của bìa (tên + giá trị đo)
- `envelope-away` (bìa bay lên khi mở): 0% `translateY(0) rotate(0)`; 15% `translateY(10px) rotate(.5deg)`; 100% `translateY(-120vh) rotate(-2deg)`, opacity 0.
- `seal-pulse` (con dấu thở): scale 1 → 1.06 → 1, bóng đổ tăng theo `--shadow-color`.
- `seal-break`: scale 1 → 1.15 xoay 5° (sáng 1.3) → 1.05 xoay −3° (sáng 1.5, opacity .5) → 0 xoay 15° (sáng 2, opacity 0).
- `seal-ring` (vòng sóng): scale .8 → 2.5, opacity .8 → 0.
- `seal-flower-bloom`: scale 1 → 1.16 xoay −3° → 1.06.
- `dragon-fly-forward` (ảnh `flyOnOpen`, ví dụ rồng/phượng): scale ×1 → ×1.6 (blur 2px, opacity .5) → ×3 (blur 10px, opacity 0).
- `shine`: vệt sáng chạy ngang.

## 5. Trạng thái và thời gian
- Trạng thái: `idle` → `opening` → `away` → `done` (khi `done` bìa gỡ khỏi DOM).
- Có **bộ canh 2600 ms**: nếu quá 2.6 s mà chưa tới `done` thì ép mở thiệp (khi tab quay lại hiển thị thì tính lại 2.6 s).
- **Âm thanh chuông tổng hợp** (Web Audio, sóng sin) khi mở: bốn nốt 523.25, 659.25, 783.99, 1046.5 Hz cách nhau 0.1 s (biên độ .035 giảm dần .005 mỗi nốt, tắt dần ~1.8 s); hai nốt cao 1567.98 và 2093 Hz bắt đầu từ 0.35 s; một nốt trầm 261.63 Hz (lọc thông thấp 400 Hz, tăng tới .025 trong .4 s, tắt dần tới 2.5 s); sau 1.2 s thêm bốn nốt 783.99, 987.77, 1174.66, 1567.98 Hz cách nhau 0.06 s. Âm lượng rất nhỏ. Bản local chưa có.

## 6. Phân bố trong 88 mẫu (xem `catalog-88-summary.md`)
- `flowers` 47, `happiness` 18, `leaves` 9, `petals` 5, `sparkles` 5, `confetti` 2, `hearts` 2.
- **Không** mẫu nào dùng "tuyết", "pháo hoa" hay "đèn lồng" riêng. Cảm giác tuyết rơi đến từ hạt `flowers`/`petals` màu trắng/nhạt rơi chậm; cảm giác pháo hoa đến từ hiệu ứng bắn 32 hạt khi mở (mục 3).
- Con dấu: tim 67; ảnh 7; 囍 2; 12 mẫu không khai báo (chưa biết mặc định, cần đo).
- Ảnh bay khi mở (`flyOnOpen`): 59 mẫu có ít nhất một ảnh.
- Kính mờ nền (`backgroundGlassBlur`): 4 mẫu.

## 7. Việc còn lại để dựng đúng
- Xác định `a`, `s` trong hạt giống (cần đọc phần khai báo component), để tái hiện đúng vị trí hạt của từng mẫu.
- Đo thời điểm từng bước của `opening → away → done` (có sẵn `open_timeline.js`).
- Tách phần `fly` ảnh (CSS `--fly-scale-x`), seal image, ảnh bìa theo `cardImages` (đã có trong catalog).
