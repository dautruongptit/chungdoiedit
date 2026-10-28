# Baroque V2 - Đỏ Đậm (`baroque_v2_darkred`)

Nguồn: chungdoi.com/vi/mau-thiep/baroque-v2-do-dam/demo · đo bằng probe trong Chrome của người dùng · số liệu thô: `docs/survey/raw/baroque_v2_darkred_*.json`

## Màn Xem demo (bìa)
- Chữ trên bìa: Gia Bảo / & / Ngọc Diệp / ❦ / 19 tháng 12, 2026 / Thân Mời / Mở thiệp / Chat với chúng tôi! / cdc-REDACTED
- Hạt nền: `ambient-fall` (mã local đang ghi: petal); con dấu local: heart
- Font bìa: The Nautigal 400 normal; Lora 100 900 normal; Viaoda Libre 400 normal; Cormorant Garamond 300 700 normal

## Hiệu ứng bấm "Mở thiệp"
- Nút: <A> "Mở thiệp" href=`?autoscroll=0&open=1`
- Hộp quà bay (dragon-fly-forward): không
- Nội dung hiện sau ≈ 449 ms (lúc bìa bị gỡ khỏi DOM)

| t (ms) | animation | thời lượng | delay | easing |
|---|---|---|---|---|
| 22 | seal-pulse | 2000 | 0 | linear |
| 22 | shine | 3000 | 0 | linear |
| 22 | ping | 1000 | 0 | linear |
| 70 | seal-break | 500 | 0 | linear |
| 70 | seal-ring | 600 | 0 | linear |
| 553 | particle-burst | 1400 | 124 | linear |
| 554 | envelope-away | 800 | 0 | linear |

Khung hình 0/25/50/75/100%: `docs/survey/frames/baroque_v2_darkred/open_{0,25,50,75,100}.png` (đóng băng animation tại 0/375/750/1125/1500 ms).

## Thiệp đã mở

| Khối (390) | Cao 390 | Cao 768 | Cao 1440 |
|---|---|---|---|
| SAVE THE DATE & GIA BẢO NGỌC | 755 | 1180 | 1347 |
| THÔNG TIN LỄ CƯỚI | 926 | 1082 | 1082 |
| Album Ảnh | 437 | 623 | 623 |
| THÔNG TIN TIỆC CƯỚI | 866 | 943 | 943 |
| XÁC NHẬN THAM DỰ | 32 | 32 | 32 |
| Tiệc cưới sẽ tổ chức tại | 427 | 534 | 534 |
| DRESS CODE | 194 | 228 | 228 |
| LỊCH TRÌNH NGÀY CƯỚI | 389 | 467 | 467 |
| Sổ lưu bút | 813 | 819 | 819 |
| Hộp Quà Mừng | 397 | 403 | 403 |
| Sự hiện diện của quý khách là | 33 | 20 | 20 |
| ♡ chungdoi.com | 16 | 16 | 16 |

Chiều cao trang: 390px → 5711 (khung nội dung rộng 375px); 768px → 6977 (khung nội dung rộng 751px); 1440px → 7185 (khung nội dung rộng 898px)

## Tính năng
- Nhạc: la-anh.mp3
- Bản đồ Google Maps embed: có
- Đếm ngược: có; RSVP inline: không (nút → hộp thoại)
- Album: coverflow 3D + chấm điều hướng (Go to photo n)
- Hộp quà: phong bì (ienv*)
- Hộp thoại quà: HỘP QUÀ MỪNG / Chú Rể - LY GIA BAO / Vietcombank / 1024778391 / LY GIA BAO / Lưu QR / Cô Dâu - PHAN NGOC DIEP / MB Bank / 6820119034 / PHAN NGOC DIEP / Lưu QR / close
- Animation khi mở hộp quà: ienvSparkleAnim:2000, ienvSparkleAnim:2000, ienvSparkleAnim:2000, ienvSparkleAnim:2000, ienvShadowPulse:3000, ienvFloat:5200, ienvFloatMain:3000, ienvHintPulse:2000, ping-slow:1500, ping:1000, background-color:300, background-color:300

## Chuyển động
- Thư viện JS: {} (không có AOS/GSAP/Swiper); data-aos: 0
- Keyframes riêng của mẫu/nhóm: ienvFloat, ienvFloatMain, ienvShadowPulse, ienvSparkleAnim, ienvHintPulse, ienvGrow, ienvWave, ienvBackWave
- Phần tử đổi style khi cuộn: 3/377 — ví dụ: span.jsx-1370451c15a89ae2.ienv-sparkle-3; div.jsx-1370451c15a89ae2.ienv-shadow.abs; p.jsx-1370451c15a89ae2.ienv-hint.absolut

## Kiểu chữ & nút
- Font đã nạp: Roboto 100 900 normal; Roboto 100 900 normal; Ms Madi 400 normal; The Nautigal 400 normal; Uchen 400 normal; Viaoda Libre 400 normal; Cormorant Garamond 300 700 normal; Playfair Display 400 900 normal; Montserrat 500 normal; Montserrat 500 normal; Montserrat 500 normal
- h: "THÔNG TIN LỄ CƯỚI" "Times New Roman", ChungDoiIndic, serif 20px/700 ls normal rgb(255, 223, 175)
- h: "Lý Gia Bảo" "Cormorant Garamond", "EB Garamond", "Ti 39px/400 ls normal rgb(255, 223, 175)
- h: "Phan Ngọc Diệp" "Cormorant Garamond", "EB Garamond", "Ti 39px/400 ls normal rgb(255, 223, 175)
- h: "Album Ảnh" "Times New Roman", ChungDoiIndic, serif 20px/700 ls normal rgb(255, 223, 175)
- nút "Thêm vào lịch" 81×21 nền rgba(0, 0, 0, 0) chữ rgb(255, 223, 175) bo 0px 14px/300
- nút "XÁC NHẬN THAM DỰ" 187×32 nền rgb(255, 223, 175) chữ rgb(81, 20, 25) bo 3.35544e+07px 13px/300
- nút "Chỉ đường" 129×36 nền rgba(0, 0, 0, 0) chữ rgb(255, 239, 214) bo 3.35544e+07px 14px/600
- nút "🪄" 38×32 nền rgba(255, 223, 175, 0.1) chữ rgb(255, 223, 175) bo 8px 16px/300

Ảnh: 22 tệp dùng trong thiệp (`public/assets/_reference/baroque_v2_darkred/`).

## Màn Chỉnh sửa (thẻ theo thứ tự)

| # | Thẻ | Công tắc | Cao | Field | Nút chính |
|---|---|---|---|---|---|
| 1 | Thông tin cơ bản | Ẩn | 550 | 7 | Collapse section, Đặt lại mặc định, Nhà trai trước, Nhà gái trước |
| 2 | Ảnh đầu thiệp | Hiện | 400 | 0 | Collapse section, Tải lên, ✕, Huỷ |
| 3 | Thông tin gia đình | Hiện | 722 | 8 | Collapse section |
| 4 | Lời thông báo | Hiện | 194 | 1 | Collapse section |
| 5 | Lễ | - | 298 | 1 | Collapse section, Thêm lễ |
| 6 | Thư viện ảnh | Hiện | 340 | 0 | Collapse section, Lưới, Ghép ảnh, 3D |
| 7 | Tiệc cưới | Hiện | 932 | 5 | Collapse section, Tiệc cưới, Tiệc báo hỷ, Tiệc đính hôn |
| 8 | Xác nhận tham dự (RSVP) | Hiện | 425 | 0 | Collapse section, Nút bấm, Hiện trực tiếp, Khách tự chọn |
| 9 | Dress Code | Ẩn | 122 | 0 | Collapse section |
| 10 | Lịch trình ngày cưới | Ẩn | 142 | 0 | Collapse section |
| 11 | Sổ lưu bút | Hiện | 134 | 0 | Collapse section, 0 lời chúcXem và quản lý |
| 12 | Hộp Quà Mừng | Hiện | 242 | 2 | Collapse section, Hộp Quà Mừng: Hộp Quà Mừng, ✕, Đặt lại mặc định |
| 13 | Lời cảm ơn | Hiện | 194 | 1 | Collapse section |
| 14 | Nhạc nền | - | 258 | 0 | Collapse section, Chọn nhạc |
| 15 | Phong bì | - | 174 | 1 | Collapse section, Quản lý khách mời |
| 16 | Ảnh xem trước khi chia sẻ | - | 682 | 0 | Collapse section, Phong bì thiệp, Ảnh của bạn, xem hướng dẫn tại đây. |
