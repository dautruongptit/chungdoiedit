# Họ mẫu thiệp — 88 mẫu (so mã trang thật, 01/11/2026)

Cách đo: tải **một lần** chunk JS của trang thật chứa 88 module mẫu (mỗi module có `data-testid` riêng); với từng module lấy tập class Tailwind (đã bỏ màu, đường dẫn ảnh) và khung thẻ JSX (bộ ba thẻ liên tiếp); độ giống = trung bình hệ số Jaccard của hai tập đó. Phân bố tách đôi rất rõ: 3.583/3.828 cặp dưới 0,4, chỉ 1 cặp trong khoảng 0,7–0,8, 28 cặp từ 0,8 trở lên → ngưỡng **0,8** (kết quả không đổi trong cả khoảng 0,7–0,8).

Kiểm chứng với mẫu đã clone: Nâu ↔ Long Phụng V4 giống 0,11; Nâu ↔ Riviera 0,17 (khác họ, đúng); Long Phụng đỏ ↔ lam 0,99; Bạch Sứ đỏ ↔ lam 1,00.

## Kết quả: **69 họ** cho 88 mẫu

- **10 họ nhiều mẫu** (bản khác màu cùng mã, 29 mẫu): dựng **một** lần rồi thay theme/ảnh.
- **59 mẫu thiết kế riêng**: mỗi mẫu là một bố cục riêng (kể cả khi trùng tên với mẫu khác, ví dụ 7 bản Minimalism chỉ giống nhau ~0,3–0,4).
- Đã clone: ✅ `minimalism_brown`, ✅ `riviera_blue`, ✅ `dragon_phoenix_v4_red` (cả ba đều là mẫu thiết kế riêng).
- **Còn phải dựng: 66 bố cục** để phủ 85 mẫu còn lại.

Phần **dùng chung** giữa mọi mẫu (không tính vào số bố cục): engine bìa + hạt + mở thiệp (`docs/survey/cover-effects.md`), hộp quà, RSVP, sổ lưu bút, nhạc, lightbox — các module mẫu gọi cùng một bộ module dùng chung (độ trùng danh sách module được gọi 0,7–1,0).

## Họ nhiều mẫu

| Họ | Số mẫu | Mẫu | Loại hạt | Thứ tự khối (390px) |
|---|---|---|---|---|
| F01 | 4 | `dragon_phoenix_blue`, `dragon_phoenix_black`, `dragon_phoenix_green`, `dragon_phoenix_red` | happiness | album > ceremony > banquet > dress > schedule > guestbook > gifts |
| F02 | 3 | `spring_garden_red`, `spring_garden_blue`, `spring_garden_green` | leaves | album > ceremony > banquet > dress > schedule > guestbook > gifts |
| F03 | 3 | `porcelain_v2_green`, `porcelain_v2_red`, `porcelain_v2_pink` | flowers | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| F04 | 3 | `double_dragon_blue`, `double_dragon_red`, `double_dragon_green` | happiness | ceremony > album > banquet > dress > schedule > gifts |
| F05 | 3 | `baroque_v2_darkblue`, `baroque_v2_darkgreen`, `baroque_v2_darkred` | flowers | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| F06 | 3 | `crystal_floral_blue`, `crystal_floral_red`, `crystal_floral_green` | flowers | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| F07 | 3 | `royal_blue`, `royal_red`, `royal_green` | sparkles | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| F08 | 3 | `porcelain_brown`, `porcelain_red`, `porcelain_blue` | flowers | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| F09 | 2 | `double_phoenix_red`, `double_phoenix_green` | happiness | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| F10 | 2 | `song_hy_green`, `song_hy_red` | happiness | ceremony > album > banquet > dress > schedule > guestbook > gifts |

## Mẫu thiết kế riêng

Cột "Gần nhất" là mẫu có mã giống nhất (dùng để chọn mẫu tham khảo khi dựng; dưới 0,5 coi như không dùng lại được).

| # | Mẫu | Loại hạt | Gần nhất (độ giống) | Kích thước module | Thứ tự khối (390px) |
|---|---|---|---|---|---|
| 1 | `qasr_gold` | flowers | `qasr_green` (0.68) | 16 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 2 | `qasr_green` | flowers | `qasr_gold` (0.68) | 18 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 3 | `boho_floral_green` | leaves | `boho_floral_brown` (0.67) | 17 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 4 | `boho_floral_brown` | leaves | `boho_floral_green` (0.67) | 16 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 5 | `glass_garden_blue` | flowers | `glass_garden_green` (0.66) | 17 KB | album > banquet > dress > schedule > guestbook > gifts |
| 6 | `silk_ribbon_pink` | flowers | `silk_ribbon_darkred` (0.66) | 22 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 7 | `silk_ribbon_darkred` | flowers | `silk_ribbon_pink` (0.66) | 22 KB | ? |
| 8 | `glass_garden_green` | flowers | `glass_garden_blue` (0.66) | 16 KB | ? |
| 9 | `silk_ribbon_green` | flowers | `silk_ribbon_darkred` (0.64) | 22 KB | ? |
| 10 | `boho_floral_pink` | petals | `boho_floral_green` (0.63) | 17 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 11 | `chateau_blue` | flowers | `chateau_green` (0.62) | 17 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 12 | `chateau_green` | flowers | `chateau_blue` (0.62) | 20 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 13 | `glass_garden_pink` | flowers | `glass_garden_green` (0.57) | 19 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 14 | ✅ `dragon_phoenix_v4_red` | happiness | `song_hac_red` (0.54) | 21 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 15 | `song_hac_red` | happiness | `dragon_phoenix_v4_red` (0.54) | 24 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 16 | `minimalism_purple` | flowers | `minimalism_darkblue` (0.53) | 20 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 17 | `minimalism_darkblue` | flowers | `minimalism_purple` (0.53) | 20 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 18 | `minimalism_darkred` | hearts | `minimalism_darkblue` (0.53) | 19 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 19 | `san_miguel_yellow` | flowers | `florence_brown` (0.51) | 24 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 20 | `florence_brown` | flowers | `san_miguel_yellow` (0.51) | 23 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 21 | `hoa_kho_v2_blue` | flowers | `dried_flower_v2_green` (0.5) | 22 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 22 | `dried_flower_v2_green` | flowers | `hoa_kho_v2_blue` (0.5) | 21 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 23 | `santorini_blue` | flowers | `florence_brown` (0.47) | 23 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 24 | `mandap_darkred` | flowers | `nomad_brown` (0.46) | 22 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 25 | `glass_garden_light_green` | flowers | `glass_garden_blue` (0.46) | 19 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 26 | `nomad_brown` | flowers | `mandap_darkred` (0.46) | 23 KB | ceremony > album > banquet > schedule > guestbook > gifts |
| 27 | ✅ `riviera_blue` | flowers | `chateau_blue` (0.46) | 26 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 28 | `co_ba_red` | happiness | `nhat_binh_red` (0.44) | 23 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 29 | `royal_v2_purple` | sparkles | `glass_garden_light_green` (0.44) | 21 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 30 | `nhat_binh_red` | confetti | `co_ba_red` (0.44) | 17 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 31 | `minimalism_darkbrown` | flowers | `minimalism_darkblue` (0.43) | 21 KB | ? |
| 32 | `folk_floral_blue` | flowers | `glass_garden_blue` (0.43) | 20 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 33 | `dragon_phoenix_v2_red` | happiness | `double_phoenix_red` (0.43) | 17 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 34 | `baroque_blue` | flowers | `mandap_darkred` (0.43) | 21 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 35 | `hoa_kho_orange` | flowers | `dried_flower_v2_green` (0.42) | 18 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 36 | `saraya_gold` | flowers | `qasr_green` (0.42) | 20 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 37 | `brocade_flower_red` | leaves | `qasr_green` (0.42) | 19 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 38 | `cherry_blossom_pink` | petals | `royal_blue` (0.42) | 13 KB | album > ceremony > banquet > dress > schedule > guestbook > gifts |
| 39 | `baroque_gold` | flowers | `lien_hoa_pink` (0.41) | 18 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 40 | `lien_hoa_pink` | petals | `baroque_gold` (0.41) | 18 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 41 | `silk_flora_brown` | petals | `royal_blue` (0.41) | 12 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 42 | `hoa_dai_pink` | flowers | `florence_brown` (0.4) | 27 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 43 | `minimalism_green` | leaves | `minimalism_darkblue` (0.39) | 19 KB | ? |
| 44 | `jasmine_white` | petals | `royal_blue` (0.39) | 13 KB | ? |
| 45 | ✅ `minimalism_brown` | leaves | `minimalism_green` (0.38) | 18 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 46 | `royal_v2_green` | sparkles | `royal_v2_purple` (0.37) | 19 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 47 | `qasr_blue` | flowers | `brocade_flower_red` (0.36) | 21 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 48 | `mahal_gold` | flowers | `brocade_flower_red` (0.34) | 19 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 49 | `sunflower_yellow` | flowers | `hoa_kho_orange` (0.33) | 17 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 50 | `chibi_red` | confetti | `royal_v2_purple` (0.33) | 19 KB | album > ceremony > banquet > dress > schedule > guestbook > gifts |
| 51 | `marble_yellow` | flowers | `santorini_blue` (0.32) | 20 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 52 | `applique_lace_white` | flowers | `baroque_blue` (0.31) | 22 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 53 | `dragon_phoenix_v3_red` | happiness | `porcelain_red` (0.27) | 19 KB | ? |
| 54 | `minimalism_red` | hearts | `dragon_phoenix_blue` (0.26) | 14 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 55 | `elegant_leaf_green` | leaves | `boho_floral_brown` (0.26) | 17 KB | album > ceremony > banquet > dress > schedule > guestbook > gifts |
| 56 | `lien_hoa_v2_green` | flowers | `porcelain_v2_pink` (0.26) | 22 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 57 | `floral_fiesta_yellow` | flowers | `mandap_darkred` (0.25) | 27 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 58 | `song_hy_v2_red` | happiness | `silk_ribbon_pink` (0.23) | 24 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |
| 59 | `hoa_tinh_red` | happiness | `porcelain_red` (0.23) | 20 KB | ceremony > album > banquet > dress > schedule > guestbook > gifts |

## Ghi chú

- Lần gom trước theo chiều cao khối ở 390px (`families-render-88.md`) **bị loại**: nó gom nhầm Nâu với Long Phụng V4. Dữ liệu đo đó vẫn dùng được cho thứ tự khối và bố cục mobile.
- `co_ba_red` được gắn với module qua suy luận (trùng `data-testid` với `nhat_binh_red`); hai module này có mã khác nhau nên vẫn là hai mẫu riêng.
