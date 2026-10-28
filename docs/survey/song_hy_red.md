# Song Hỷ - Đỏ (`song_hy_red`)

Nguồn: chungdoi.com/vi/mau-thiep/song-hy-do/demo · đo bằng probe trong Chrome của người dùng · số liệu thô: `docs/survey/raw/song_hy_red_*.json`

## Màn Xem demo (bìa)
- Chữ trên bìa: 囍 / 囍 / 囍 / 囍 / 囍 / 囍 / 囍 / 囍 / 囍 / 囍 / 囍 / 囍 / Gia Khánh / & / Quỳnh Anh / ❦ / 14 tháng 6, 2026 / Thân Mời / Mở thiệp / Chat với chúng tôi! / cdc-REDACTED
- Hạt nền: `ambient-rise` (mã local đang ghi: xi); con dấu local: xi
- Font bìa: Lora 100 900 normal; Playfair Display 400 normal

## Hiệu ứng bấm "Mở thiệp"
- Nút: <A> "Mở thiệp" href=`?autoscroll=0&open=1`
- Hộp quà bay (dragon-fly-forward): có
- Nội dung hiện sau ≈ 509 ms (lúc bìa bị gỡ khỏi DOM)

| t (ms) | animation | thời lượng | delay | easing |
|---|---|---|---|---|
| 15 | seal-pulse | 2000 | 0 | linear |
| 15 | shine | 3000 | 0 | linear |
| 15 | ping | 1000 | 0 | linear |
| 62 | seal-break | 500 | 0 | linear |
| 62 | seal-ring | 600 | 0 | linear |
| 63 | dragon-fly-forward | 1200 | 0 | linear |
| 831 | particle-burst | 1400 | 78 | linear |
| 831 | envelope-away | 800 | 0 | linear |

Khung hình 0/25/50/75/100%: `docs/survey/frames/song_hy_red/open_{0,25,50,75,100}.png` (đóng băng animation tại 0/375/750/1125/1500 ms).

## Thiệp đã mở

| Khối (390) | Cao 390 | Cao 768 | Cao 1440 |
|---|---|---|---|
| WELCOME TO OUR WEDDING ÚT NAM | 722 | 940 | 940 |
| THÔNG TIN LỄ CƯỚI | 54 | 68 | 68 |
| Phan Gia Khánh | 761 | 934 | 934 |
| Album Ảnh | 54 | 68 | 68 |
| (không tiêu đề) | 392 | 572 | 572 |
| THÔNG TIN TIỆC CƯỚI | 54 | 68 | 68 |
| Tiệc cưới sẽ diễn ra vào lúc: | 691 | 751 | 751 |
| Tiệc cưới sẽ tổ chức tại | 600 | 706 | 706 |
| DRESS CODE | 194 | 228 | 228 |
| LỊCH TRÌNH NGÀY CƯỚI | 309 | 369 | 369 |
| Sổ lưu bút | 54 | 68 | 68 |
| Sổ lưu bút | 916 | 928 | 928 |
| Hộp Quà Mừng | 510 | 488 | 488 |
| ♡ chungdoi.com | 28 | 28 | 28 |

Chiều cao trang: 390px → 5418 (khung nội dung rộng 375px); 768px → 6314 (khung nội dung rộng 753px); 1440px → 6314 (khung nội dung rộng 900px)

## Tính năng
- Nhạc: perfect-ed-sheeran.mp3
- Bản đồ Google Maps embed: có
- Đếm ngược: không; RSVP inline: không (nút → hộp thoại)
- Album: coverflow 3D + chấm điều hướng (Go to photo n)
- Hộp quà: hộp 3D (igb*)
- Hộp thoại quà: HỘP QUÀ MỪNG / Chú Rể - THIEP CUOI DEMO / Vietcombank / 0000000000 / THIEP CUOI DEMO / Lưu QR / Cô Dâu - Phạm Quỳnh Anh / BIDV / 8084856145 / Phạm Quỳnh Anh / Lưu QR / close
- Animation khi mở hộp quà: igbSparkleAnim:2000, igbSparkleAnim:2000, igbSparkleAnim:2000, igbSparkleAnim:2000, igbGiftBob:3000, igbShadowPulse:3000, igbHintPulse:2000, ping-slow:1500, ping:1000, background-color:300, background-color:300, opacity:200

## Chuyển động
- Thư viện JS: {} (không có AOS/GSAP/Swiper); data-aos: 0
- Keyframes riêng của mẫu/nhóm: igbGiftBob, igbShadowPulse, igbSparkleAnim, igbHintPulse, igbBoxPop, igbConfettiFly1, igbConfettiFly2, igbConfettiFly3, igbConfettiFly4, igbConfettiFly5, igbConfettiFly6, igbConfettiFly7, igbConfettiFly8, igbDecorFlyUp1, igbDecorFlyUp2, igbDecorFlyUp3, igbDecorFlyUp4, igbDecorFlyUp5, igbDecorFlyUp6, igbDecorFlyUp7
- Phần tử đổi style khi cuộn: 5/372 — ví dụ: span.jsx-dd7f1ef62680a11c.igb-sparkle.ab; span.jsx-dd7f1ef62680a11c.igb-sparkle-2.; div.jsx-dd7f1ef62680a11c.igb-bob.relativ; div.jsx-dd7f1ef62680a11c.igb-shadow.abso

## Kiểu chữ & nút
- Font đã nạp: Roboto 100 900 normal; Roboto 100 900 normal; Cormorant Garamond 300 700 normal; EB Garamond 400 800 normal; Montserrat 500 normal; Montserrat 500 normal; Montserrat 500 normal
- h: "THÔNG TIN LỄ CƯỚI" "Times New Roman", ChungDoiIndic, serif 20px/700 ls 0.5px rgb(255, 238, 210)
- h: "Phan Gia Khánh" "EB Garamond", serif 36px/400 ls normal rgb(128, 0, 0)
- h: "Phạm Quỳnh Anh" "EB Garamond", serif 36px/400 ls normal rgb(128, 0, 0)
- h: "Album Ảnh" "Times New Roman", ChungDoiIndic, serif 20px/700 ls 0.5px rgb(255, 238, 210)
- nút "✕" 30×30 nền rgba(0, 0, 0, 0) chữ rgb(255, 255, 255) bo 3.35544e+07px 20px/600
- nút "‹" 30×30 nền rgba(0, 0, 0, 0) chữ rgb(255, 255, 255) bo 3.35544e+07px 24px/600
- nút "›" 30×30 nền rgba(0, 0, 0, 0) chữ rgb(255, 255, 255) bo 3.35544e+07px 24px/600
- nút "close" 375×844 nền rgba(0, 0, 0, 0) chữ rgba(0, 0, 0, 0) bo 0px 16px/300

Ảnh: 20 tệp dùng trong thiệp (`public/assets/_reference/song_hy_red/`).

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
