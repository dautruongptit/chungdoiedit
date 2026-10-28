# Minimalism - Nâu (`minimalism_brown`)

Nguồn: chungdoi.com/vi/mau-thiep/minimalism-nau/demo · đo bằng probe trong Chrome của người dùng · số liệu thô: `docs/survey/raw/minimalism_brown_*.json`

## Màn Xem demo (bìa)
- Chữ trên bìa: Hoàng Nam / & / Thảo Vy / ❦ / 3 tháng 1, 2026 / Thân Mời / Mở thiệp / Chat với chúng tôi! / cdc-REDACTED
- Hạt nền: `ambient-fall` (mã local đang ghi: petal); con dấu local: heart
- Font bìa: Lora 100 900 normal; EB Garamond 400 800 normal

## Hiệu ứng bấm "Mở thiệp"
- Nút: <A> "Mở thiệp" href=`?autoscroll=0&open=1`
- Hộp quà bay (dragon-fly-forward): có
- Nội dung hiện sau ≈ 984 ms (lúc bìa bị gỡ khỏi DOM)

| t (ms) | animation | thời lượng | delay | easing |
|---|---|---|---|---|
| 22 | seal-pulse | 2000 | 0 | linear |
| 22 | shine | 3000 | 0 | linear |
| 22 | ping | 1000 | 0 | linear |
| 65 | seal-break | 500 | 0 | linear |
| 65 | seal-ring | 600 | 0 | linear |
| 65 | dragon-fly-forward | 1200 | 0 | linear |
| 555 | particle-burst | 1400 | 76 | linear |
| 556 | envelope-away | 800 | 0 | linear |

Khung hình 0/25/50/75/100%: `docs/survey/frames/minimalism_brown/open_{0,25,50,75,100}.png` (đóng băng animation tại 0/375/750/1125/1500 ms).

## Thiệp đã mở

| Khối (390) | Cao 390 | Cao 768 | Cao 1440 |
|---|---|---|---|
| (không tiêu đề) | 5412 | 6521 | 6541 |
| THE WEDDING OF Hoàng Nam & Th | 661 | 1056 | 1056 |
| THÔNG TIN LỄ CƯỚI | 894 | 968 | 968 |
| Album Ảnh | 502 | 682 | 682 |
| THÔNG TIN TIỆC CƯỚI | 842 | 944 | 944 |
| Tiệc cưới sẽ tổ chức tại | 467 | 594 | 594 |
| DRESS CODE | 194 | 222 | 222 |
| LỊCH TRÌNH NGÀY CƯỚI | 381 | 405 | 405 |
| Sổ lưu bút | 921 | 1118 | 1138 |
| Hộp Quà Mừng | 398 | 398 | 398 |
| Sự hiện diện của quý khách là | 76 | 60 | 60 |
| ♡ chungdoi.com | 28 | 28 | 28 |
| (không tiêu đề) | 844 | 900 | 900 |

Chiều cao trang: 390px → 5413 (khung nội dung rộng 375px); 768px → 6524 (khung nội dung rộng 753px); 1440px → 6544 (khung nội dung rộng 900px)

## Tính năng
- Nhạc: la-anh.mp3
- Bản đồ Google Maps embed: có
- Đếm ngược: không; RSVP inline: không (nút → hộp thoại)
- Album: coverflow 3D + bộ đếm n / N
- Hộp quà: hộp 3D (igb*)
- Hộp thoại quà: HỘP QUÀ MỪNG / Chú Rể - TRAN TUAN KIET / Vietcombank / 1023456789 / TRAN TUAN KIET / Lưu QR / Cô Dâu - LE MINH ANH / Techcombank / 9988776655 / LE MINH ANH / Lưu QR / close
- Animation khi mở hộp quà: mbFloat:5000, igbSparkleAnim:2000, igbSparkleAnim:2000, igbSparkleAnim:2000, igbSparkleAnim:2000, igbGiftBob:3000, igbShadowPulse:3000, igbHintPulse:2000, ping-slow:1500, ping:1000, background-color:300, background-color:300

## Chuyển động
- Thư viện JS: {} (không có AOS/GSAP/Swiper); data-aos: 0
- Keyframes riêng của mẫu/nhóm: igbGiftBob, igbShadowPulse, igbSparkleAnim, igbHintPulse, igbBoxPop, igbConfettiFly1, igbConfettiFly2, igbConfettiFly3, igbConfettiFly4, igbConfettiFly5, igbConfettiFly6, igbConfettiFly7, igbConfettiFly8, igbDecorFlyUp1, igbDecorFlyUp2, igbDecorFlyUp3, igbDecorFlyUp4, igbDecorFlyUp5, igbDecorFlyUp6, igbDecorFlyUp7, mbFloat
- Phần tử đổi style khi cuộn: 12/429 — ví dụ: span.pointer-events-none.absolute.block.; span.pointer-events-none.absolute.block.; span.pointer-events-none.absolute.block.; span.pointer-events-none.absolute.block.

## Kiểu chữ & nút
- Font đã nạp: Ms Madi 400 normal; The Nautigal 400 normal; Cormorant Garamond 300 700 normal; EB Garamond 400 800 normal; Montserrat 500 normal; Montserrat 500 normal
- h: "THÔNG TIN LỄ CƯỚI" "Times New Roman", ChungDoiIndic, serif 16px/700 ls 0.48px rgb(124, 106, 96)
- h: "Nguyễn Hoàng Nam" "EB Garamond", ChungDoiIndic, serif 27px/400 ls normal rgb(124, 106, 96)
- h: "Trần Thảo Vy" "EB Garamond", ChungDoiIndic, serif 27px/400 ls normal rgb(124, 106, 96)
- h: "Album Ảnh" "Times New Roman", ChungDoiIndic, serif 20px/700 ls 0.6px rgb(124, 106, 96)
- nút "Thêm vào lịch" 81×20 nền rgba(0, 0, 0, 0) chữ rgb(124, 106, 96) bo 0px 14px/300
- nút "XÁC NHẬN THAM DỰ" 196×36 nền rgb(124, 106, 96) chữ rgb(222, 217, 215) bo 3.35544e+07px 14px/300
- nút "Chỉ đường" 128×36 nền rgba(0, 0, 0, 0) chữ rgb(145, 128, 119) bo 3.35544e+07px 14px/600
- nút "🪄" 38×32 nền rgba(124, 106, 96, 0.1) chữ rgb(124, 106, 96) bo 8px 16px/300

Ảnh: 27 tệp dùng trong thiệp (`public/assets/_reference/minimalism_brown/`).

## Màn Chỉnh sửa (thẻ theo thứ tự)

| # | Thẻ | Công tắc | Cao | Field | Nút chính |
|---|---|---|---|---|---|
| 1 | Thông tin cơ bản | Ẩn | 550 | 7 | Collapse section, Đặt lại mặc định, Nhà trai trước, Nhà gái trước |
| 2 | Ảnh đầu thiệp | Hiện | 400 | 0 | Collapse section, Tải lên, ✕, Huỷ |
| 3 | Thư viện ảnh | Hiện | 340 | 0 | Collapse section, Lưới, Ghép ảnh, 3D |
| 4 | Thông tin gia đình | Hiện | 722 | 8 | Collapse section |
| 5 | Lời thông báo | Hiện | 194 | 1 | Collapse section |
| 6 | Lễ | - | 298 | 1 | Collapse section, Thêm lễ |
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
