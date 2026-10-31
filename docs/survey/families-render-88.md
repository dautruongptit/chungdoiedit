# Họ bố cục thân thiệp — 88 mẫu (đo trang thật, iframe 390px)

> **Tạm thời, KHÔNG dùng để chia việc.** Gom theo nhịp chiều cao khối ở 390px không đủ sắc: ở ngưỡng 15%, họ H01 gom chung Nâu và Long Phụng V4 (đã biết là hai thiết kế khác hẳn), trong khi nhiều bản khác màu lại bị tách. Số họ đổi từ 46 xuống 12 khi nới ngưỡng 6% → 20%. Kết luận đáng tin rút từ lần đo này: (1) cả 88 mẫu dùng **chung một bộ mã** (không có chunk JS riêng theo mẫu); (2) mã từng mẫu nằm trong một chunk lớn có 88 module có `data-testid` riêng; (3) thứ tự khối có 6 kiểu (bảng dưới, cột "Thứ tự khối"). Chia họ chính xác phải làm bằng **so sánh mã của 88 module** (xem `docs/clone-plan-88.md`).

Tiêu chí cùng họ: cùng thứ tự khối và chiều cao từng khối (khoảng cách giữa hai tiêu đề) lệch trung bình ≤ 12%. Đây là gom theo **cấu trúc hiển thị ở 390px**, cần xác nhận lại ở 768/1440 khi dựng.

- Đo được: 88/88 mẫu
- Số họ: **19** (họ ≥2 mẫu: 12; mẫu lẻ: 7)
- Họ đã có mẫu clone (✅): 2

| Họ | Số mẫu | Thứ tự khối | Chiều cao khối (px, 390) | Mẫu (loại hạt) | Nhóm tên khớp? |
|---|---|---|---|---|---|
| H01 | 41 | ceremony>album>banquet>dress>schedule>guestbook>gifts | 801/486/1275/206/451/877/547 | `minimalism_darkred` (hearts), ✅`minimalism_brown` (leaves), `boho_floral_green` (leaves), `song_hy_v2_red` (happiness), `dragon_phoenix_v2_red` (happiness), `double_phoenix_red` (happiness), `double_dragon_green` (happiness), `glass_garden_pink` (flowers), `silk_ribbon_pink` (flowers), ✅`dragon_phoenix_v4_red` (happiness), `lien_hoa_v2_green` (flowers), `song_hac_red` (happiness), `nhat_binh_red` (confetti), `baroque_v2_darkgreen` (flowers), `baroque_v2_darkred` (flowers), `boho_floral_pink` (petals), `applique_lace_white` (flowers), `hoa_tinh_red` (happiness), `minimalism_darkblue` (flowers), `minimalism_red` (hearts), `double_phoenix_green` (happiness), `boho_floral_brown` (leaves), `glass_garden_light_green` (flowers), `crystal_floral_blue` (flowers), `minimalism_purple` (flowers), `porcelain_v2_green` (flowers), `dried_flower_v2_green` (flowers), `porcelain_v2_pink` (flowers), `hoa_kho_v2_blue` (flowers), `royal_v2_green` (sparkles), `baroque_blue` (flowers), `porcelain_brown` (flowers), `royal_blue` (sparkles), `baroque_v2_darkblue` (flowers), `sunflower_yellow` (flowers), `porcelain_v2_red` (flowers), `qasr_blue` (flowers), `hoa_kho_orange` (flowers), `floral_fiesta_yellow` (flowers), `saraya_gold` (flowers), `qasr_gold` (flowers) | 28 nhóm tên |
| H02 | 8 | album>ceremony>banquet>dress>schedule>guestbook>gifts | 488/1188/1533/236/514/919/576 | `dragon_phoenix_red` (happiness), `elegant_leaf_green` (leaves), `spring_garden_green` (leaves), `cherry_blossom_pink` (petals), `spring_garden_blue` (leaves), `spring_garden_red` (leaves), `dragon_phoenix_blue` (happiness), `dragon_phoenix_black` (happiness) | 4 nhóm tên |
| H03 | 7 | ceremony>album>banquet>dress>schedule>guestbook>gifts | 872/704/1488/194/389/951/884 | `chateau_green` (flowers), `chateau_blue` (flowers), `lien_hoa_pink` (petals), `royal_v2_purple` (sparkles), `mahal_gold` (flowers), `qasr_green` (flowers), `brocade_flower_red` (leaves) | 6 nhóm tên |
| H04 | 5 | album>banquet>dress>schedule>guestbook>gifts | 529/1442/194/389/951/581 | `crystal_floral_red` (flowers), `crystal_floral_green` (flowers), `porcelain_blue` (flowers), `porcelain_red` (flowers), `glass_garden_blue` (flowers) | 3 nhóm tên |
| H05 | 4 | ceremony>album>banquet>dress>schedule>guestbook>gifts | 1261/484/1400/194/735/927/470 | `silk_flora_brown` (petals), `baroque_gold` (flowers), `co_ba_red` (happiness), `san_miguel_yellow` (flowers) | 4 nhóm tên |
| H06 | 4 | ceremony>album>banquet>dress>schedule>guestbook>gifts | 1053/459/1441/174/584/803/715 | ✅`riviera_blue` (flowers), `santorini_blue` (flowers), `hoa_dai_pink` (flowers), `mandap_darkred` (flowers) | 4 nhóm tên |
| H07 | 2 | sec6 | 700/980/440/520/880/360 | `silk_ribbon_green` (flowers), `silk_ribbon_darkred` (flowers) | cùng nhóm tên |
| H08 | 2 | sec5 | 940/920/440/380/900 | `minimalism_green` (leaves), `minimalism_darkbrown` (flowers) | cùng nhóm tên |
| H09 | 2 | sec3 | 2340/500/940 | `jasmine_white` (petals), `dragon_phoenix_v3_red` (happiness) | 2 nhóm tên |
| H10 | 2 | ceremony>album>banquet>dress>schedule>gifts | 830/458/1372/194/1431/554 | `double_dragon_red` (happiness), `double_dragon_blue` (happiness) | cùng nhóm tên |
| H11 | 2 | ceremony>album>banquet>dress>schedule>guestbook>gifts | 1041/393/1357/194/389/927/470 | `royal_red` (sparkles), `royal_green` (sparkles) | cùng nhóm tên |
| H12 | 2 | ceremony>album>banquet>dress>schedule>guestbook>gifts | 726/442/1416/206/757/806/638 | `florence_brown` (flowers), `folk_floral_blue` (flowers) | 2 nhóm tên |
| H13 | 1 | ceremony>album>banquet>dress>schedule>guestbook>gifts | 814/446/1373/194/-3556/4906/506 | `song_hy_green` (happiness) | cùng nhóm tên |
| H14 | 1 | sec2 | 600/920 | `song_hy_red` (happiness) | cùng nhóm tên |
| H15 | 1 | sec6 | 540/800/440/800/380/880 | `glass_garden_green` (flowers) | cùng nhóm tên |
| H16 | 1 | ceremony>album>banquet>dress>schedule>guestbook>gifts | 638/438/1130/174/554/795/521 | `marble_yellow` (flowers) | cùng nhóm tên |
| H17 | 1 | album>ceremony>banquet>dress>schedule>guestbook>gifts | 514/935/1275/248/653/894/503 | `chibi_red` (confetti) | cùng nhóm tên |
| H18 | 1 | sec3 | 0/0/0 | `dragon_phoenix_green` (happiness) | cùng nhóm tên |
| H19 | 1 | ceremony>album>banquet>schedule>guestbook>gifts | 759/496/1659/718/842/560 | `nomad_brown` (flowers) | cùng nhóm tên |

## Nhóm tên bị tách ra nhiều họ (bản khác màu nhưng bố cục đo được khác)

- `minimalism`: minimalism_darkred→H01, minimalism_brown→H01, minimalism_green→H08, minimalism_darkbrown→H08, minimalism_darkblue→H01, minimalism_red→H01, minimalism_purple→H01
- `song_hy`: song_hy_green→H13, song_hy_red→H14
- `silk_ribbon`: silk_ribbon_green→H07, silk_ribbon_darkred→H07, silk_ribbon_pink→H01
- `dragon_phoenix`: dragon_phoenix_red→H02, dragon_phoenix_green→H18, dragon_phoenix_blue→H02, dragon_phoenix_black→H02
- `double_dragon`: double_dragon_red→H10, double_dragon_green→H01, double_dragon_blue→H10
- `glass_garden`: glass_garden_green→H15, glass_garden_pink→H01, glass_garden_light_green→H01, glass_garden_blue→H04
- `royal`: royal_red→H11, royal_green→H11, royal_blue→H01
- `baroque`: baroque_gold→H05, baroque_blue→H01
- `crystal_floral`: crystal_floral_blue→H01, crystal_floral_red→H04, crystal_floral_green→H04
- `royal_v2`: royal_v2_green→H01, royal_v2_purple→H03
- `porcelain`: porcelain_brown→H01, porcelain_blue→H04, porcelain_red→H04
- `qasr`: qasr_blue→H01, qasr_gold→H01, qasr_green→H03
