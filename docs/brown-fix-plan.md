# Mẫu Nâu — kiểm tra từng phần tử và kế hoạch sửa (làm chuẩn cho các mẫu khác)

Cách kiểm tra (mới, so **từng phần tử**, không chỉ chiều cao):
`scripts/survey/dump.js` ghi, cho mọi phần tử chữ/ảnh/hộp có nền-viền-bóng, tọa độ (x,y,w,h so với root), cỡ chữ, trọng lượng, font, line-height, letter-spacing, màu (đổi oklch/oklab về RGB bằng canvas), bo góc, viền, bóng. Chạy giống hệt trên trang gốc (iframe trong Chrome của bạn) và bản local; `scripts/survey/diff_dump.mjs` ghép theo khóa (nội dung chữ / tên ảnh / kiểu hộp) và báo lệch (dung sai hình học 1px, kiểu so chuỗi). Animation CSS được đưa về `t=0`, transition kết thúc, hạt/ảnh ngẫu nhiên không tính.
Số liệu thô: `docs/survey/raw/minimalism_brown_dump_*` (gốc) và `local_*` (local); báo cáo: `docs/survey/diff-minimalism_brown-<màn>-<khổ>[-exp].md`.

## 1. Kết luận: đã đúng từng px chưa?

| Màn (khổ) | Ghép được | Lệch hình học | Lệch kiểu | Kết luận |
|---|---|---|---|---|
| Thiệp đã mở 390 | 214/222 | **56** | 8 | Chưa đúng. Sau khi thêm `@tailwind base` (mô phỏng, chưa sửa mã): **33 / 4** |
| Thiệp đã mở 768, 1440 | 216/224 | 58 | 15 | Như trên; mô phỏng: 33 / 11 |
| Bìa 390/768/1440 | 16/31 | **0** | 2 | Đúng hình học; lệch 2 kiểu (bóng con dấu, màu chữ ngày); còn lại là hạt ngẫu nhiên |
| Hộp thoại quà 390/768 | 19/22 | 6 / 18 | 3 | Chưa đúng (độ rộng hộp thoại, font tiêu đề, nút đóng) |
| Hộp thoại RSVP | 1/15 | — | — | **Chưa làm đúng**: local dùng hộp thoại chung của editor, không phải mẫu của trang gốc |
| Chuỗi mở thiệp | — | — | — | Lệch: thiếu `ping`, `seal-ring` bắt đầu 567ms (gốc 65ms), thừa `seal-flower-bloom`, bìa gỡ 1360ms (gốc 984ms) |
| Chỉnh sửa 390/768 | 177/299 | **157 / 177** | 136 | Chưa đúng: màu theme, header, kích thước ô nhập, nút |
| Editor 1280 | — | — | — | Lần đo gốc cuối bị lỗi (trang trả 0 thẻ); chưa có số |

## 2. Nguyên nhân gốc (phát hiện bằng so từng phần tử)

**Trang gốc = Tailwind v4 + daisyUI v5** (bằng chứng: `@layer base` preflight với `margin/padding: 0`; `@layer daisyui…`; màu `oklch()`; `rounded-full` = `3.35544e+07px`; `rotate`/`translate`/`scale` là thuộc tính riêng nên `transform` tính toán = `none`; theme editor `data-theme="halloween"` với token `--color-base-100: oklch(21% .006 56.043)` …). Bản local dùng Tailwind v3 chỉ phát `utilities`.

Ba hệ quả lớn, **áp dụng cho mọi mẫu**:

1. **Thiếu biến mặc định `--tw-*`.** `tw.css` chỉ có `@tailwind utilities`, nên `-translate-x-1/2`, `rotate-*`, `scale-*`, `ring-*`, `shadow-*` ra `transform: none`/mất bóng. Đây là nguồn của phần lớn lệch x/y/w/h (ảnh polaroid không xoay, `house-background`/`paper-note` lệch ngang 187–243px, biểu tượng lịch trình lệch 18px, vòng sáng quanh ảnh album mất). **Thử nghiệm không sửa mã:** chèn 2,8KB do `@tailwind base` sinh ra (`docs/survey/tw_base_defaults.css`; preflight đang tắt trong `tailwind.config.js` nên chỉ phát biến) → lệch hình học 61 → 46 (mốc đầu) → 33 (sau chuẩn hóa).
2. **Preflight v4 chưa đủ:** gốc zero hóa `margin/padding` mọi phần tử, local chỉ zero một số thẻ.
3. **Tiện ích cũ `!important` + class đè** (đã sửa một phần ở Phase 6) và **`.modal` daisyUI** (đã dựng bản thủ công, nhưng sai kích thước — xem 3.3).

## 3. Danh sách việc: phải sửa gì → sẽ sửa gì → sửa như nào

Ký hiệu: **[E]** engine/dùng chung cho mọi mẫu · **[T]** dữ liệu/theme riêng từng mẫu · **[N]** chỉ mẫu Nâu.

### 3.1 Thiệp đã mở
| # | Phát hiện (bằng chứng) | Sẽ sửa | Sửa như nào |
|---|---|---|---|
| O1 [E] | Thiếu `--tw-*` (xem trên). 25 phần tử lệch x/y/w/h, mọi `rotate/translate/scale/ring` | Thêm `@tailwind base;` vào `src/styles/tw.css` (preflight vẫn tắt) | 1 dòng; kiểm: `diff_dump … open 390/768/1440` lệch hình học giảm ≥40% và không phần tử nào có `transform:none` ở chỗ gốc có xoay/dịch |
| O2 [N→T] | Tên cặp đôi: local 29px/300, gốc 27px/400 ở <768 (768+: weight 400 vs 300) | Bỏ style nội tuyến cỡ/độ đậm, đưa vào lớp `theme.json` | Giá trị đo: `font: EB Garamond 27px/400` (mobile), `46px/400` (≥768) |
| O3 [E] | Danh sách lời chúc: thẻ rộng 309 (local) vs 304 (gốc); thanh cuộn: gốc dùng thanh mặc định, chỉ mỏng khi hover (`hover:scrollbar-thin`: `scrollbar-width: thin; ::-webkit-scrollbar{width:4px}`) | Bỏ `scrollbar-width: thin` của mình; thêm `.scrollbar-none` và `.hover\:scrollbar-thin:hover` đúng như gốc | Sao chép các luật đã đọc từ CSS gốc (đã liệt kê trong `docs/survey/raw`, hoặc xem mục R5) |
| O4 [E] | Hàng thứ trong lịch: `line-height` 16.5px (gốc) vs 17px (local) ở ≥768 | Bỏ lớp `.mb-cal-days` ép 17px | Dùng `leading` mặc định (1.5×11px) của lớp gốc; kiểm tổng khối vẫn 944 ở 768 |
| O5 [E] | Bản đồ: gốc tải iframe Google Maps ngay, local hiện nút "Xem bản đồ" chờ bấm | Render iframe `loading="lazy"` ngay khi `showMap` | Bỏ state `mapOpen`; vùng chứa giữ `h-[268px] md:h-[380px]`, bo 15px, viền 1px `#7c6a60` |
| O6 [E] | Coverflow: một phần tử (offset 2) lệch x 380→502, w 24→70 | Cần đo lại không đóng băng | Ghi nhận **chưa rõ nguyên nhân** (có thể do transition 1100ms ở thời điểm đo). Việc: so `style.transform` từng phần tử sau khi chờ 8s |
| O7 [E] | Ảnh mini của hộp quà 3D: tập ảnh khác nhau giữa hai lần tải gốc | Không coi là lỗi | Đưa vào danh sách loại trừ của audit (ngẫu nhiên). Nếu muốn giống: xáo ngẫu nhiên cùng quy tắc (7 ảnh trong kho `giftbox/mini`) |
| O8 [E] | Chuỗi chữ "( Tức ngày … )" tách 2 text node ở gốc | Không ảnh hưởng hiển thị | Chuẩn hóa khóa so sánh (bỏ khoảng trắng quanh dấu ngoặc) |
| O9 [E] | `font-family` gốc thêm `ChungDoiIndic` (font dự phòng) | Không ảnh hưởng chiều cao | Giữ nguyên fallback `serif`; ghi vào allowlist |
| O10 [E] | `rounded-full` (3.35544e+07px), `transform` biểu diễn khác | Chỉ khác cách biểu diễn | Chuẩn hóa trong `diff_dump` (đã làm) |

### 3.2 Bìa
| # | Phát hiện | Sẽ sửa | Sửa như nào |
|---|---|---|---|
| C1 [E] | Bóng con dấu: gốc 1 lớp `0 4px 20px rgba(124,106,96,.5)`, local thêm lớp trắng `0 2px 4px` | Bỏ lớp thừa | `coverConfigs.ts` mẫu Nâu `sealShadow` |
| C2 [T] | "3 tháng 1, 2026": gốc màu `rgba(124,106,96,.72)` (đã ghi từ Phase 3 nhưng local vẫn đặc) | Dùng alpha .72 | Theo token `coverText` của `design-tokens.json` |
| C3 [E] | Chuỗi mở: thiếu `ping`; `seal-ring` bắt đầu muộn 500ms; thừa `seal-flower-bloom`; bìa gỡ chậm 376ms | Đồng bộ engine mở thiệp theo bảng A1 trong `clone-rules.md` | Viết lại `OpenTransition.tsx` thành máy trạng thái: t0 → `seal-break`(500)+`seal-ring`(600)+(`dragon-fly-forward` 1200 nếu hộp 3D); t≈490–830 → `particle-burst`(1400, delay 40–125)+`envelope-away`(800); bìa gỡ ≈ sau `envelope-away` bắt đầu ~0–150ms. Kiểm: `local_open_seq.mjs` 0 khác biệt |

### 3.3 Hộp thoại quà
| # | Phát hiện | Sửa như nào |
|---|---|---|
| G1 [E] | `.modal-box` gốc: **100% rộng ở mobile** (375), `max-w-xl`=576px ở ≥640; local 91.67%/512px | Theo daisyUI v5: `.modal-bottom .modal-box{width:100%;max-width:none}`; `sm:modal-middle` giữ `max-width` theo lớp (`max-w-lg sm:max-w-xl`) — sửa CSS thủ công trong `styles.css` hoặc dùng bản CSS daisyUI rút gọn |
| G2 [E] | Tiêu đề thẻ (h3): gốc `Gotham, Montserrat`, local `ui-sans-serif` | Thêm `font-family: Gotham, Montserrat` cho vùng hộp thoại quà |
| G3 [E] | Nút đóng gốc: nút tròn nền tối `oklch(.14 .004 49.25)`, local trong suốt | Dùng đúng lớp `btn btn-sm btn-circle` của daisyUI (kích thước 24–32px, nền `--color-base-200`) |
| G4 [T] | QR: gốc `/api/qr-png?...` | Local dùng ảnh mẫu; giữ nhưng đúng kích thước 128/144px |

### 3.4 Hộp thoại RSVP (chưa làm đúng)
Đặc tả đo từ gốc (390): hộp trắng `343×484` tại (16,180), bo 16, tiêu đề "Xác nhận tham dự" 20px, mô tả 14px (xám `oklch(.551 .027 264)`), nhãn "Tên của bạn" 14px, ô nhập `295×50` bo 12, nhóm "Bạn sẽ đến chứ?" gồm 2 lựa chọn (nhãn `295×56`, nền trắng 50% bo 12): "Tôi sẽ đến" / "Rất tiếc, tôi không thể đến", nút "Gửi xác nhận" `295×48` nền `#7c6a60` chữ `#ded9d7` bo 12. → Viết `BrownRsvpDialog` theo đặc tả (dữ liệu từ `rsvpOn`, `questions`, `partyMode`, `partyLimit`); ghi `rsvps` như hiện tại.

### 3.5 Chỉnh sửa
Khảo sát phần tử cho thấy editor local giống bố cục nhưng **khác theme và kích thước thành phần**:
| # | Phát hiện | Sửa như nào |
|---|---|---|
| E1 [E] | Theme gốc = daisyUI `halloween`: `base-100 oklch(21% .006 56.043)`, `base-200 oklch(14% .004 49.25)`, `base-300 oklch(0% 0 0)`, `base-content oklch(84.955% 0 0)` (=rgb 205), `primary oklch(77.48% .204 60.62)`… ; local dùng trắng 255 / hex gần đúng (106 phần tử lệch màu) | Định nghĩa token editor bằng đúng các biến `--color-*` của theme (đã lưu `docs/survey/raw/daisy_halloween.json`); thay hex rải rác bằng `var(--color-*)` |
| E2 [E] | Header: gốc `header` nền `base-100` + logo ảnh 34×34/210×46 + nút "Đăng Nhập" bo 12, viền; local có `nav`+`header` riêng, nút bo 8/999px | Dựng lại thanh trên + thanh công cụ theo đo (xem diff-…-editor-390.md các dòng y<200) |
| E3 [E] | Ô nhập/nút: gốc input cao 50 (RSVP) và 32 (editor, bo 8); nhiều phần tử `b:input` 22 cái chỉ có ở gốc; ngược lại local có 14 input/10 button/7 section thừa | So khóa "chỉ ở gốc/chỉ ở local" (đã liệt kê) và loại bỏ phần thừa/bổ sung phần thiếu |
| E4 [E] | Kích thước nhãn field: gốc h=32 (nhãn + khoảng), local h=26; cùng chiều rộng nhãn khác (74 vs 148) → nhãn đang `block`, gốc `inline`/fit-content | Sửa lớp nhãn theo `fieldset-legend` của daisyUI (`padding-block: 0.25rem`, inline) |
| E5 | Chiều cao tài liệu: local 6443 vs gốc 6484 (390), 6290 vs 6306 (768) | Mục tiêu cuối: bằng nhau ±2px sau E1–E4 |

## 4. Quy trình sửa áp dụng cho mọi mẫu ("cách thức")

1. **Dựng nền một lần** (engine): O1 `@tailwind base`, preflight v4 đầy đủ cho vùng thiệp (zero margin/padding, border-solid, img block…), daisy-modal đúng chuẩn, token editor, bộ scrollbar. Sau mỗi bước chạy `diff_dump` mẫu Nâu và ghi số lệch.
2. **Với mỗi mẫu mới:** `probe.js/run.js` đo gốc → `local_dump.mjs` + `diff_dump.mjs` cho 4 trạng thái (cover/open/gift/rsvp) × 3 khổ → bảng lệch.
3. **Phân loại mỗi dòng lệch** theo cây quyết định:
   - lệch ở mọi mẫu / ở lớp tiện ích (transform, ring, shadow, border, margin) → sửa **engine**;
   - lệch ở kích thước/màu/font/ảnh của một mẫu → sửa **theme.json** (giá trị lấy từ `computed` của gốc, không đoán);
   - lệch ở nội dung/văn bản → sửa **data/demo/<id>.json**;
   - lệch ở trình tự/hành vi → sửa **capabilities** hoặc engine (hiệu ứng).
4. **Điều kiện qua mẫu:** `diff_dump` mỗi trạng thái/khổ: 0 lệch hình học (dung sai 1px), 0 lệch kiểu ngoài allowlist (`ff` fallback, `br 9999`, `tf` biểu diễn, phần tử ngẫu nhiên: hạt, ảnh mini hộp quà, dấu ngoặc lunar); chiều cao root bằng gốc ±1px.
5. **Hồi quy:** sau thay đổi engine chạy lại `diff_dump` cho **toàn bộ mẫu đã xong** và `phase6_all.mjs`.

## 5. Việc kiểm tra còn thiếu (chưa đo được)
- Editor 1280 (gốc): lần đo cuối trả 0 thẻ — cần đo lại.
- Coverflow khi đang chuyển cảnh, hiệu ứng khi cuộn (parallax): chưa có số.
- So **pixel** (ảnh chụp) vẫn chưa làm; hiện so bằng hình học + kiểu của phần tử (chặt hơn ảnh ở chỗ có tọa độ, nhưng không bắt được ảnh nền/gradient sai).

---

## 6. Kết quả sau khi làm Phương án B (Tailwind v4 + daisyUI v5 cô lập trong `.inv-root`)

Đã làm (mẫu Nâu, trang xem trước vẫn nằm trong trang như hiện nay):
- `src/features/invitation/styles/invitation.src.css` → `npm run css:inv` (`scripts/build-invitation-css.mjs`) biên dịch bằng Tailwind v4.3 + daisyUI 5.7 (theme `halloween`, `--font-sans` như gốc), **gỡ `@layer`** (CSS app không nằm trong layer sẽ thắng CSS trong layer) và **gắn tiền tố `.inv-root`** cho mọi selector → `invitation.generated.css` (đã `.gitignore`; `npm run dev/build` tự chạy).
- `postcss.config.js`: tiện ích Tailwind v3 của app **không áp dụng trong `.inv-root`** (`:not(:where(.inv-root *))`, độ ưu tiên 0) — nếu không, biến `--tw-*` của v3 đè v4 (vòng sáng `ring-2` mất).
- `styles.css`: `.modal` của editor không áp dụng trong `.inv-root`; xóa toàn bộ CSS thủ công theo mẫu Nâu (modal, preflight cục bộ, `mb-*`).
- `MinimalismBrown.tsx`: gốc có class `inv-root`; sửa lỗi dump HTML (`[&&gt;div:last-child]` → `[&>div:last-child]`, vốn làm mất khoảng cách 65/130px của danh sách lời chúc); tên cặp đôi dùng `text-[27px] md:text-[46px] font-normal`; bản đồ nạp iframe ngay; tiêu đề thẻ quà dùng `Gotham, Montserrat`.
- Bìa: bóng con dấu một lớp, màu ngày `rgba(124,106,96,.72)`.

**Kết quả đo (so từng phần tử, dung sai 1px):**

| Màn | Trước | Sau |
|---|---|---|
| Thiệp mở 390 / 768 / 1440: lệch hình học | 56 / 58 / 58 | **3** / 3 / 3 |
| Thiệp mở: lệch kiểu | 8 / 15 / 15 | **1** / 1 / 1 |
| Chiều cao root so với gốc (audit) | lệch 1px | **Δ0 / Δ0 / Δ0** |
| Bìa 390: hình học / kiểu | 0 / 2 | **0 / 0** |
| Hộp thoại quà 390 và 768 | 6–18 hình học, 3 kiểu | **0 / 0** |

Kiểm tra hồi quy đạt: `tsc`, `npm run build`, `editor-sync` Nâu 45 đạt / 0 lỗi, quét 75 mẫu 0 lỗi, chiều cao thẻ editor (1280, 390), trang chủ, kho mẫu, "Thiệp của tôi" không đổi.

**Còn lại (chưa đạt "đúng từng px"):**
1. Coverflow: một ảnh **ngang** (`6c5d0a31…`, 2048×1360) ở gốc có phần tử rộng bằng khung (375px) thay vì theo `aspect-ratio` → lệch 3 phần tử (x 380→502, w 24→70). Cần tìm lớp/kiểu của gốc khiến ảnh ngang nở theo ảnh.
2. Ảnh mini hộp quà và hạt: ngẫu nhiên ở gốc (đã nằm trong allowlist).
3. Hộp thoại RSVP: chưa viết lại theo đặc tả (mục 3.4).
4. Chuỗi mở thiệp: vẫn 3 khác biệt (`ping`, `seal-ring` trễ, `seal-flower-bloom`); cần engine theo bảng A1 và keyframes gốc (`--shadow-color`, `--dx`, `--rot-start`…).
5. Editor: chưa chạm tới (màu theme `halloween`, kích thước ô nhập, header) — mục 3.5.
6. Chưa kiểm tra mẫu thứ hai bằng đường B (mới Nâu): các mẫu khác vẫn dùng CSS cũ; muốn chuyển sang `inv-root` cần thêm `@source` cho từng component và chạy lại `diff_dump`.

---

## 7. Tiến độ làm lần lượt (Bước 1–3)

**Bước 1 — Engine mở thiệp: xong cho mẫu Nâu.** `local_open_seq.mjs` 0 khác biệt (Nâu, Song Hỷ Đỏ, Baroque, Florence). Dữ liệu gốc (`docs/survey/raw/minimalism_brown_engine_html.json`) cho thấy: hoa trang trí của bìa "bay về trước" (`dragon-fly-forward`, `--fly-scale-x` ±1) **chỉ khi hộp quà là hộp 3D**; một vòng sóng 56px viền 3px lúc bấm (`seal-ring` 0,6s, z-index 29); con dấu giữ `box-shadow` có `inset`, còn keyframes `seal-pulse` dùng `var(--shadow-color)` (0 4px 20px → 0 6px 35px); 33 hạt `particle-burst` (1,4s, delay 0–0,14s, biến `--dx --dy --rot-start --rot-end`) và `envelope-away` ở ~555ms; không có animation `fadeIn` khi nội dung hiện; `ping` là của widget chat bên thứ ba, không thuộc engine. Đã sửa: `BaseCoverCard.tsx` (vòng sóng, `--shadow-color`, `flyDecor` theo `giftboxType`, bỏ `seal-flower-bloom`), `OpenTransition.tsx` (bỏ hai vòng cũ), `styles.css` (`seal-pulse`), `Preview.tsx` (bỏ `fadeIn`). Còn lại: Hoa Mộc dùng `HoaMocXanhCover` riêng (chưa theo engine: thiếu `seal-ring`, `dragon-fly-forward`).

**Bước 2 — Hộp thoại RSVP: xong cho mẫu Nâu.** `BrownRsvpDialog.tsx` dựng theo HTML đo từ gốc (lớp phủ `fixed … bg-black/60 backdrop-blur-sm`, hộp `rounded-2xl max-w-md`, ô tên, hai lựa chọn có màu emerald/red khi chọn, số khách + lời nhắn khi chọn "đến", nút gửi); ghi vào `d.rsvps`. `diff_dump … rsvp 390`: **18/18 phần tử, 0 lệch**. Chưa đo: màn "cảm ơn" sau khi gửi (cần gửi thật lên trang gốc — chưa làm để tránh ghi dữ liệu), RSVP ở 768 (số đo gốc cũ).

**Bước 3 — Editor: mới bắt đầu.** Đã đổi token chữ `--fg` từ trắng sang `#cdcdcd` (= `base-content` của theme `halloween`): lệch kiểu 136 → 96. Bố cục editor local đã gần gốc (vị trí ±3px), nhưng còn: 157 lệch hình học (nhãn dạng block thay vì inline, chiều cao nhãn 26 vs 32, nút "Xuất bản" là nút viền hồng chứ không đặc, cỡ/độ đậm chữ một số nút, `opacity` dùng cho văn bản phụ…), ~120 phần tử chỉ có ở gốc/~140 chỉ có ở local (ô nhập, nút, svg). Cách làm tiếp: lặp `diff_dump … editor` theo từng thẻ, sửa CSS/markup của đúng thành phần (`Section`, `Field`, `Segmented`, `Header`), mục tiêu 0 lệch hình học ở 390/768/1280.

Kiểm tra hồi quy sau Bước 1–2: `tsc`, `npm run build`, quét 75 mẫu (0 lỗi), `editor-sync` Nâu 45 đạt / 0 lỗi, chiều cao thẻ editor/trang chủ không đổi.
