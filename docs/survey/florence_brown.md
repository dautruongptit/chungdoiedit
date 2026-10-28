# Florence - Nâu (`florence_brown`)

Nguồn: chungdoi.com/vi/mau-thiep/florence-nau/demo · đo bằng probe trong Chrome của người dùng · số liệu thô: `docs/survey/raw/florence_brown_*.json`

## Màn Xem demo (bìa)
- Chữ trên bìa: Hoàng Phúc / & / Tuệ Anh / ❦ / 25 tháng 4, 2027 / Thân Mời / Mở thiệp / Chat với chúng tôi! / cdc-REDACTED
- Hạt nền: `ambient-fall` (mã local đang ghi: blossom); con dấu local: heart
- Font bìa: Carattere 400 normal; Lora 100 900 normal; Viaoda Libre 400 normal; Alex Brush 400 normal

## Hiệu ứng bấm "Mở thiệp"
- Nút: <A> "Mở thiệp" href=`?autoscroll=0&open=1`
- Hộp quà bay (dragon-fly-forward): không
- Nội dung hiện sau ≈ 617 ms (lúc bìa bị gỡ khỏi DOM)

| t (ms) | animation | thời lượng | delay | easing |
|---|---|---|---|---|
| 17 | seal-pulse | 2000 | 0 | linear |
| 17 | shine | 3000 | 0 | linear |
| 17 | ping | 1000 | 0 | linear |
| 67 | seal-break | 500 | 0 | linear |
| 67 | seal-ring | 600 | 0 | linear |
| 554 | particle-burst | 1400 | 40 | linear |
| 555 | envelope-away | 800 | 0 | linear |

Khung hình 0/25/50/75/100%: `docs/survey/frames/florence_brown/open_{0,25,50,75,100}.png` (đóng băng animation tại 0/375/750/1125/1500 ms).

## Thiệp đã mở

| Khối (390) | Cao 390 | Cao 768 | Cao 1440 |
|---|---|---|---|
| WELCOME TO OUR WEDDING HOÀNG | 703 | 1384 | 1604 |
| THÔNG TIN LỄ CƯỚI | 600 | 939 | 980 |
| Album Ảnh | 453 | 672 | 682 |
| THÔNG TIN TIỆC CƯỚI | 946 | 1301 | 1375 |
| Tiệc cưới sẽ tổ chức tại | 407 | 584 | 584 |
| DRESS CODE | 202 | 250 | 253 |
| LỊCH TRÌNH NGÀY CƯỚI | 754 | 1122 | 1204 |
| Sổ lưu bút | 769 | 811 | 816 |
| Hộp Quà Mừng | 467 | 476 | 476 |
| Sự hiện diện của quý khách là | 33 | 23 | 23 |
| ♡ chungdoi.com | 129 | 239 | 277 |
| (không tiêu đề) | 844 | 900 | 900 |

Chiều cao trang: 390px → 5667 (khung nội dung rộng 375px); 768px → 8203 (khung nội dung rộng 753px); 1440px → 8746 (khung nội dung rộng 900px)

## Tính năng
- Nhạc: le-duong.mp3
- Bản đồ Google Maps embed: có
- Đếm ngược: có; RSVP inline: không (nút → hộp thoại)
- Album: coverflow 3D + bộ đếm n / N
- Hộp quà: phong bì (ienv*)
- Hộp thoại quà: HỘP QUÀ MỪNG / Chú Rể - THIEP CUOI DEMO / Vietcombank / 0000000000 / THIEP CUOI DEMO / Lưu QR / close
- Animation khi mở hộp quà: ienvSparkleAnim:2000, ienvSparkleAnim:2000, ienvSparkleAnim:2000, ienvSparkleAnim:2000, ienvShadowPulse:3000, ienvFloat:5200, ienvFloatMain:3000, ienvHintPulse:2000, ping-slow:1500, ping:1000, background-color:300, background-color:300

## Chuyển động
- Thư viện JS: {} (không có AOS/GSAP/Swiper); data-aos: 0
- Keyframes riêng của mẫu/nhóm: ienvFloat, ienvFloatMain, ienvShadowPulse, ienvSparkleAnim, ienvHintPulse, ienvGrow, ienvWave, ienvBackWave
- Phần tử đổi style khi cuộn: 12/418 — ví dụ: img.absolute.start-[-18.821%].top-0.mt-[; img.absolute.start-[42.857%].top-0.mt-[4; img.absolute.start-[-19.955%].top-0.mt-[; img.absolute.left-[10.729%].top-0.z-0

## Kiểu chữ & nút
- Font đã nạp: Roboto 100 900 normal; Roboto 100 900 normal; The Nautigal 700 normal; Carattere 400 normal; Viaoda Libre 400 normal; Alex Brush 400 normal; Cormorant Garamond 300 700 normal; EB Garamond 400 800 normal; Clicker Script 400 normal; Montserrat 500 normal; Montserrat 500 normal; Montserrat 500 normal
- h: "THÔNG TIN LỄ CƯỚI" "Times New Roman", Times, ChungDoiIndic, 20px/700 ls 0.4px rgb(156, 115, 85)
- h: "Lý Hoàng Phúc" Carattere, "Alex Brush", ChungDoiIndic,  29px/400 ls normal rgb(156, 115, 85)
- h: "Phan Tuệ Anh" Carattere, "Alex Brush", ChungDoiIndic,  29px/400 ls normal rgb(156, 115, 85)
- h: "Album Ảnh" "Times New Roman", Times, ChungDoiIndic, 20px/700 ls 0.4px rgb(156, 115, 85)
- nút "Thêm vào lịch" 81×21 nền rgba(0, 0, 0, 0) chữ rgb(0, 0, 0) bo 0px 14px/300
- nút "XÁC NHẬN THAM DỰ" 199×32 nền rgb(156, 115, 85) chữ rgb(254, 251, 244) bo 7px 13px/300
- nút "Chỉ đường" 128×36 nền rgba(0, 0, 0, 0) chữ rgb(0, 0, 0) bo 3.35544e+07px 14px/600
- nút "🪄" 38×32 nền rgba(156, 115, 85, 0.1) chữ rgb(156, 115, 85) bo 8px 16px/300

Ảnh: 30 tệp dùng trong thiệp (`public/assets/_reference/florence_brown/`).

## Màn Chỉnh sửa (thẻ theo thứ tự)

| # | Thẻ | Công tắc | Cao | Field | Nút chính |
|---|---|---|---|---|---|
| 1 | Thông tin cơ bản | Ẩn | 550 | 7 | Collapse section, Đặt lại mặc định, Nhà trai trước, Nhà gái trước |
| 2 | Thông tin gia đình | Hiện | 722 | 8 | Collapse section |
| 3 | Lời thông báo | Hiện | 194 | 1 | Collapse section |
| 4 | Lễ | - | 298 | 1 | Collapse section, Thêm lễ |
| 5 | Thư viện ảnh | Hiện | 340 | 0 | Collapse section, Lưới, Ghép ảnh, 3D |
| 6 | Tiệc cưới | Hiện | 932 | 5 | Collapse section, Tiệc cưới, Tiệc báo hỷ, Tiệc đính hôn |
| 7 | Xác nhận tham dự (RSVP) | Hiện | 425 | 0 | Collapse section, Nút bấm, Hiện trực tiếp, Khách tự chọn |
| 8 | Dress Code | Ẩn | 122 | 0 | Collapse section |
| 9 | Lịch trình ngày cưới | Ẩn | 142 | 0 | Collapse section |
| 10 | Sổ lưu bút | Hiện | 134 | 0 | Collapse section, 0 lời chúcXem và quản lý |
| 11 | Hộp Quà Mừng | Hiện | 242 | 2 | Collapse section, Hộp Quà Mừng: Hộp Quà Mừng, ✕, Đặt lại mặc định |
| 12 | Lời cảm ơn | Hiện | 194 | 1 | Collapse section |
| 13 | Nhạc nền | - | 258 | 0 | Collapse section, Chọn nhạc |
| 14 | Phong bì | - | 174 | 1 | Collapse section, Quản lý khách mời |
| 15 | Ảnh xem trước khi chia sẻ | - | 682 | 0 | Collapse section, Phong bì thiệp, Ảnh của bạn, xem hướng dẫn tại đây. |
