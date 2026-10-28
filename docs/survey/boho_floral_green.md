# Hoa Mộc - Xanh (`boho_floral_green`)

Nguồn: chungdoi.com/vi/mau-thiep/hoa-moc-xanh/demo · đo bằng probe trong Chrome của người dùng · số liệu thô: `docs/survey/raw/boho_floral_green_*.json`

## Màn Xem demo (bìa)
- Chữ trên bìa: Minh Quân / & / Thu Hà / ❦ / 24 tháng 5, 2026 / Thân Mời / Mở thiệp / Chat với chúng tôi! / cdc-REDACTED
- Hạt nền: `ambient-fall` (mã local đang ghi: petal); con dấu local: heart
- Font bìa: Lora 100 900 normal; EB Garamond 400 800 normal; Playfair Display 400 normal

## Hiệu ứng bấm "Mở thiệp"
- Nút: <A> "Mở thiệp" href=`?autoscroll=0&open=1`
- Hộp quà bay (dragon-fly-forward): có
- Nội dung hiện sau ≈ 642 ms (lúc bìa bị gỡ khỏi DOM)

| t (ms) | animation | thời lượng | delay | easing |
|---|---|---|---|---|
| 16 | seal-pulse | 2000 | 0 | linear |
| 16 | shine | 3000 | 0 | linear |
| 16 | ping | 1000 | 0 | linear |
| 67 | seal-break | 500 | 0 | linear |
| 67 | seal-ring | 600 | 0 | linear |
| 67 | dragon-fly-forward | 1200 | 0 | linear |
| 641 | particle-burst | 1400 | 103 | linear |
| 641 | envelope-away | 800 | 0 | linear |

Khung hình 0/25/50/75/100%: `docs/survey/frames/boho_floral_green/open_{0,25,50,75,100}.png` (đóng băng animation tại 0/375/750/1125/1500 ms).

## Thiệp đã mở

| Khối (390) | Cao 390 | Cao 768 | Cao 1440 |
|---|---|---|---|
| Trưởng Nam Minh Quân Út Nữ Thu | 840 | 1002 | 1002 |
| (không tiêu đề) | 565 | 722 | 885 |
| (không tiêu đề) | 825 | 1082 | 1298 |
| (không tiêu đề) | 1059 | 1398 | 1674 |
| THÔNG TIN LỄ CƯỚI | 36 | 36 | 36 |
| Ông Bà Trần Văn Hùng Hạm Thị L | 115 | 130 | 130 |
| TRÂN TRỌNG BÁO TIN LỄ THÀNH HÔ | 45 | 54 | 54 |
| Trần Minh Quân | 237 | 314 | 314 |
| LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI | 270 | 338 | 338 |
| (không tiêu đề) | 559 | 720 | 860 |
| (không tiêu đề) | 1033 | 1385 | 1674 |
| (không tiêu đề) | 405 | 545 | 643 |
| (không tiêu đề) | 1491 | 2000 | 2421 |
| (không tiêu đề) | 317 | 427 | 512 |
| (không tiêu đề) | 405 | 545 | 643 |
| Album Ảnh | 512 | 716 | 716 |
| THÔNG TIN TIỆC CƯỚI | 36 | 36 | 36 |
| Tiệc cưới sẽ diễn ra vào lúc: | 614 | 717 | 717 |
| XÁC NHẬN THAM DỰ | 40 | 40 | 40 |
| (không tiêu đề) | 846 | 1100 | 1100 |
| Tiệc cưới sẽ tổ chức tại | 525 | 695 | 695 |
| DRESS CODE | 200 | 228 | 228 |
| LỊCH TRÌNH NGÀY CƯỚI | 315 | 369 | 369 |
| Sổ lưu bút | 941 | 957 | 957 |
| Hộp Quà Mừng | 404 | 436 | 436 |
| Sự hiện diện của quý khách là | 96 | 84 | 84 |
| ♡ chungdoi.com | 16 | 16 | 16 |
| (không tiêu đề) | 844 | 900 | 900 |

Chiều cao trang: 390px → 5571 (khung nội dung rộng 375px); 768px → 6686 (khung nội dung rộng 753px); 1440px → 6686 (khung nội dung rộng 900px)

## Tính năng
- Nhạc: my-love-westlife.mp3
- Bản đồ Google Maps embed: có
- Đếm ngược: không; RSVP inline: không (nút → hộp thoại)
- Album: coverflow 3D + bộ đếm n / N
- Hộp quà: hộp 3D (igb*)
- Hộp thoại quà: HỘP QUÀ MỪNG / Chú Rể - THIEP CUOI DEMO / Vietcombank / 0000000000 / THIEP CUOI DEMO / Lưu QR / Cô Dâu - Nguyễn Thu Hà / BIDV / 6665558888 / Nguyễn Thu Hà / Lưu QR / close
- Animation khi mở hộp quà: igbSparkleAnim:2000, igbSparkleAnim:2000, igbSparkleAnim:2000, igbSparkleAnim:2000, igbGiftBob:3000, igbShadowPulse:3000, igbHintPulse:2000, ping-slow:1500, ping:1000, background-color:300, background-color:300, opacity:200

## Chuyển động
- Thư viện JS: {} (không có AOS/GSAP/Swiper); data-aos: 0
- Keyframes riêng của mẫu/nhóm: igbGiftBob, igbShadowPulse, igbSparkleAnim, igbHintPulse, igbBoxPop, igbConfettiFly1, igbConfettiFly2, igbConfettiFly3, igbConfettiFly4, igbConfettiFly5, igbConfettiFly6, igbConfettiFly7, igbConfettiFly8, igbDecorFlyUp1, igbDecorFlyUp2, igbDecorFlyUp3, igbDecorFlyUp4, igbDecorFlyUp5, igbDecorFlyUp6, igbDecorFlyUp7
- Phần tử đổi style khi cuộn: 17/397 — ví dụ: div.absolute.top-[-327px].left-[111.5px]; div.absolute.top-[5px].md:top-[18px].lg:; div.absolute.top-[302px].md:top-[360px].; div.absolute.top-[1054px].md:top-[1190px

## Kiểu chữ & nút
- Font đã nạp: Ms Madi 400 normal; EB Garamond 400 800 normal; Montserrat 400 normal; Montserrat 400 normal; Montserrat 400 normal; Montserrat 500 normal; Montserrat 500 normal; Montserrat 500 normal; Playfair Display 400 normal; Playfair Display 400 normal; Playfair Display 400 normal
- h: "THÔNG TIN LỄ CƯỚI" "Times New Roman", ChungDoiIndic, serif 24px/700 ls 1px rgb(48, 83, 15)
- h: "Trần Minh Quân" "EB Garamond", ChungDoiIndic, serif 40px/400 ls normal rgb(48, 83, 15)
- h: "Nguyễn Thu Hà" "EB Garamond", ChungDoiIndic, serif 40px/400 ls normal rgb(48, 83, 15)
- h: "Album Ảnh" "Times New Roman", ChungDoiIndic, serif 24px/700 ls 1px rgb(48, 83, 15)
- nút "Thêm vào lịch" 90×20 nền rgba(0, 0, 0, 0) chữ rgb(48, 83, 15) bo 0px 14px/300
- nút "XÁC NHẬN THAM DỰ" 216×40 nền rgb(48, 83, 15) chữ rgb(255, 250, 247) bo 10px 16px/600
- nút "Chỉ đường" 128×36 nền rgba(0, 0, 0, 0) chữ rgb(48, 83, 15) bo 3.35544e+07px 14px/600
- nút "🪄" 38×32 nền rgba(48, 83, 15, 0.1) chữ rgb(48, 83, 15) bo 8px 16px/300

Ảnh: 22 tệp dùng trong thiệp (`public/assets/_reference/boho_floral_green/`).

## Màn Chỉnh sửa (thẻ theo thứ tự)

| # | Thẻ | Công tắc | Cao | Field | Nút chính |
|---|---|---|---|---|---|
| 1 | Thông tin cơ bản | - | 424 | 6 | Collapse section, Đặt lại mặc định, Nhà trai trước, Nhà gái trước |
| 2 | Ảnh đôi | Hiện | 266 | 0 | Collapse section, Tải lên, ✕, Huỷ |
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
