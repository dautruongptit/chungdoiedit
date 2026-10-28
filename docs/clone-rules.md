# Bộ rule clone 75 mẫu (rút từ 5 mẫu đã đo)

Nguồn: `docs/survey/*.md|json` (5 mẫu: Nâu làm chuẩn, Song Hỷ Đỏ, Baroque V2 Đỏ Đậm, Florence Nâu, Hoa Mộc Xanh), số liệu thô `docs/survey/raw/`, khung hình `docs/survey/frames/`.
**Độ chắc chắn:** quy tắc nhóm A (chung) chắc cao (5/5 mẫu giống nhau, đo bằng animation API/computed style). Nhóm B (biến thể) chắc trung bình: mới thấy 2–3 giá trị mỗi cờ, cờ thật có thể nhiều hơn. Nhóm C chỉ là dữ liệu.

---

## A. Chung cho mọi mẫu → quy tắc cứng + component dùng chung

### A1. Bìa và hiệu ứng mở thiệp (một engine, đo ở 5/5 mẫu)
- Nút "Mở thiệp" là `<a href="?autoscroll=0&open=1">`, chặn điều hướng, đổi trạng thái tại chỗ (URL không đổi; chiều cao trang 844 → nội dung).
- Idle trên bìa (lặp vô hạn): `seal-pulse` 2000ms, `shine` 3000ms, `ping` 1000ms, hạt `ambient-fall|rise` ~18–25s tuyến tính, delay âm.
- Chuỗi khi bấm (t = 0 lúc bấm; `linear` ở mức animation, easing nằm trong keyframes):

| t (ms) | animation | thời lượng | điều kiện |
|---|---|---|---|
| ~15–70 | `seal-break` | 500 | luôn |
| ~15–70 | `seal-ring` | 600 | luôn |
| ~15–70 | `dragon-fly-forward` | 1200, ease-in | **chỉ hộp quà 3D** |
| ~490–830 | `particle-burst` | 1400, delay 40–125 | luôn |
| ~490–830 | `envelope-away` | 800, ease-in | luôn |
| ~510–640 | bìa bị gỡ khỏi DOM | — | nội dung hiện, cuộn về đầu |
| ~1340–1360 | gỡ phần tử cũ, thêm nút nhạc (`bounce-gentle` 2000, `ping-slow` 1500) | — | luôn |
| ngay sau | hộp quà idle: `igb*` (3D: BoxPop, GiftBob 3000, SparkleAnim 2000×4 lệch 600/1200/1700, ShadowPulse 3000, HintPulse 2000) hoặc `ienv*` (phong bì: Float 5200, FloatMain 3000, Sparkle, ShadowPulse, HintPulse, Grow, Wave) | — | theo kiểu hộp quà |

  Khung hình đã chụp: `docs/survey/frames/<id>/open_{0,25,50,75,100}.png` (đóng băng ở 0/375/750/1125/1500 ms). Nội dung đã hiện đủ từ ≈1100 ms nên khung 75% và 100% giống nhau.
- Tooltip "Chạm để phát nhạc"/nút nhạc nổi, nhạc bắt đầu sau lần chạm đầu.
- **Không** có thư viện chuyển động (AOS, GSAP, Swiper, Lenis, lottie… đều không có). Tất cả là CSS keyframes + React. Toàn bộ keyframes nằm trong **một** bundle CSS dùng chung (kể cả của mẫu khác), nên "keyframes riêng của mẫu" không tồn tại; cái riêng là chỗ gắn animation lên phần tử nào.
- Không có hiệu ứng "hiện dần khi cuộn" (data-aos = 0; opacity không đổi khi cuộn). Phần tử đổi style khi cuộn chỉ là: vòng lặp thời gian (float/sparkle) và **parallax của hình trang trí** (Florence 12, Hoa Mộc 17 phần tử `transform` đổi theo vị trí cuộn).
- Demo tự cuộn ~50px/s tới khi có wheel/touch/mouse/keydown; `?autoscroll=0` tắt. (Đã làm ở `Demo.tsx`.)

### A2. Khối nội dung và thứ tự (5/5)
Thứ tự khối trong thiệp: [Header] → THÔNG TIN LỄ CƯỚI (gia đình, lời báo, cặp đôi, các lễ) → ALBUM ẢNH → THÔNG TIN TIỆC CƯỚI (+ đếm ngược nếu có, lịch tháng, "Thêm vào lịch", RSVP) → địa điểm (Google Maps) → DRESS CODE → LỊCH TRÌNH NGÀY CƯỚI → SỔ LƯU BÚT → HỘP QUÀ MỪNG → lời cảm ơn → "♡ chungdoi.com". Tiêu đề mục đều **đọc từ dữ liệu** (`ceremonyTitle`, `banquetTitle`, `locTitle`, `dressTitle`, `schedTitle`, `giftTitle`).
- Hộp thoại quà: tiêu đề giữa, mỗi tài khoản là một thẻ "Chú Rể/Cô Dâu - TÊN CHỦ TK" + QR + ngân hàng + số TK + "Lưu QR"; nút mở có `aria-label="Mở hộp mừng cưới"`.
- RSVP: nút "XÁC NHẬN THAM DỰ" mở hộp thoại; không mẫu nào đo được dùng form inline trên demo (inline là lựa chọn của người dùng trong editor).
- Bản đồ: iframe Google Maps Embed (place) theo địa chỉ, nút "Chỉ đường" = `google.com/maps/dir/?api=1&destination=<địa chỉ>`. Bản local dùng `maps.google.com/maps?q=…&output=embed` (không cần khóa); **không sao chép khóa API của trang gốc**.
- Album: luôn là **coverflow 3D** (perspective, mũi tên Previous/Next photo), nhấp ảnh mở lightbox. Biến thể chỉ ở chỉ báo: bộ đếm `n / N` hoặc chấm `Go to photo n` (xem B).
- Gốc render một cột `max-width` 480px (mobile) và 900px ở ≥768px; vùng hiển thị `w-full` trong khung, nền ngoài khác nền thiệp.

### A3. Editor (5/5)
- Một bộ thẻ duy nhất, mỗi thẻ là `div.bg-base-100.border.rounded-lg`, có thể gập (`Collapse section`), công tắc "Hiện/Ẩn" cho các thẻ: Ảnh đầu thiệp, Thư viện ảnh, Gia đình, Lời thông báo, Tiệc cưới, RSVP, Dress Code, Lịch trình, Sổ lưu bút, Hộp quà, Lời cảm ơn. Thẻ không có công tắc: Thông tin cơ bản, Lễ, Nhạc nền, Phong bì, Ảnh chia sẻ.
- Field/nút của từng thẻ **giống nhau** ở cả 5 mẫu (chỉ khác 3 điểm — xem B3). Chiều cao thẻ đo được trùng với bản local: 550, 400, 340, 722, 194, 298, 932, 425, 122, 142, 134, 242, 194, 258, 174, 682.
- Chỉ giữ một thiệp nháp; chọn mẫu khác → hộp thoại "Áp dụng vào thiệp nháp".

### A4. Kỹ thuật dựng (đã gặp, bắt buộc theo)
- Mọi giá trị hiển thị lấy từ `Inv`; không hardcode chữ/ảnh/số của demo trong component (demo = một file dữ liệu).
- Kích thước/kiểu chữ đo từ computed style của trang gốc; style tĩnh chép ở 390px **không** được dùng làm inline nếu có lớp `md:`/`lg:` tương ứng.
- Khối số đo: mọi khối ở 390/768/1440 trùng ≤2px; tổng trang ≤2px (sai số làm tròn nửa pixel).

---

## B. Biến thể theo nhóm → "loại", khai báo bằng cờ trong `template.capabilities.json`

### B1. Cờ capabilities (đầy đủ, theo những gì đã thấy)
```jsonc
{
  "id": "song_hy_red",
  "family": "traditional",            // họ bố cục (xem clone-plan: số họ ước lượng)
  "cover": {
    "seal": "heart | xi | none",      // biểu tượng/ con dấu giữa bìa
    "ambient": "fall | rise",         // hướng hạt nền (ambient-fall | ambient-rise)
    "particle": "petal | xi | blossom | confetti | heart",
    "skin": "card | …"                // khung bìa (đã thấy 'card' ở 5/5)
  },
  "gift": { "widget": "box3d | envelope" },   // quyết định hiệu ứng mở: box3d có dragon-fly-forward
  "hero": { "kind": "photo | couple | none", "introLine": true },
  "album": { "indicator": "counter | dots", "defaultLayout": "3d" },
  "countdown": true,
  "layout": { "contentMaxMd": 900, "behaviorMd": "padded | fixed | stretch", "parallaxDecor": false },
  "editor": { "albumCardAfter": "hero | ceremony", "cards": { "hero": true, "coupleHero": false, "introLine": true } },
  "music": "la-anh.mp3",              // tên tệp mặc định (dữ liệu, không phải cờ hành vi)
  "fonts": ["Cormorant Garamond", "Playfair Display"]
}
```
Giá trị thực đo được:

| Cờ | brown | song_hy | baroque | florence | boho |
|---|---|---|---|---|---|
| gift.widget | box3d | box3d | envelope | envelope | box3d |
| cover.ambient | fall | **rise** | fall | fall | fall |
| cover.seal (mã local) | heart | xi | heart | heart | heart |
| album.indicator | counter | **dots** | **dots** | counter | counter |
| countdown | không | không | **có** | **có** | không |
| hero.kind | photo | photo | photo | **none** | **couple** |
| hero.introLine | có | có | có | có | **không** |
| editor.albumCardAfter | hero | ceremony | ceremony | ceremony | ceremony |
| layout.behaviorMd | padded (900 có viền 1px) | fixed | stretch | stretch | fixed |
| parallaxDecor | không | không | không | **có** | **có** |

### B2. Cách editor tự ẩn tùy chọn mẫu không hỗ trợ
1. `capabilities.json` là nguồn duy nhất; editor đọc `getCapabilities(templateId)` (không if theo id mẫu).
2. Bộ thẻ = danh sách chuẩn 16 thẻ **lọc** theo `editor.cards` và **sắp xếp** theo `editor.albumCardAfter`.
3. Thẻ có công tắc nhưng khối không tồn tại ở mẫu (vd `countdown:false`): ẩn tùy chọn "Đếm ngược" (không để công tắc không có tác dụng).
4. Tùy chọn người dùng chọn được (kiểu album Lưới/Ghép/3D, RSVP nút/inline, kiểu hộp quà) hiện đủ; phần xem trước **phải** vẽ được mọi lựa chọn đó, hoặc lựa chọn bị ẩn cho mẫu đó.
5. Kiểm thử bắt buộc: `scripts/editor-sync.mjs <id>` (xem thang kiểm bên dưới).

### B3. Khác biệt editor đã đo (chỉ 3 điểm)
- Thẻ ảnh đầu: "Ảnh đầu thiệp" (brown, song_hy, baroque) / "Ảnh đôi" (boho) / không có (florence → 15 thẻ).
- Thẻ "Thông tin cơ bản": có công tắc "Lời mở đầu" (4 mẫu) hay không (boho).
- Vị trí thẻ "Thư viện ảnh": ngay sau thẻ ảnh đầu (brown) hay sau thẻ "Lễ" (4 mẫu còn lại).

### B4. Biến thể thiệp đã mở
- Khối tiêu đề: tiêu đề có thể là phần tử riêng cao 54px (mobile)/68px (≥768) với hàng đệm (song_hy), hoặc nằm trong khối (brown).
- Hành vi ở ≥768px: `padded` (brown: khung 900 có viền, cao đổi ít), `fixed` (song_hy, boho: chiều cao trang không đổi 768→1440), `stretch` (baroque, florence: cao đổi mạnh theo chiều rộng).
- Trang trí parallax (florence, boho) vs tĩnh.

---

## C. Riêng từng mẫu → `theme.json` + `data/demo/<templateId>.json`

- **theme.json:** màu (nền, chữ chính/phụ/nút), gradient bìa, font + cỡ + trọng lượng + letterSpacing từng cấp, bo góc, bóng, ảnh trang trí/nền (đường dẫn trong `public/images/themes/<slug>/`), vị trí/kích thước họa tiết.
- **data/demo/<id>.json:** tên, gia đình, lễ, tiệc, địa chỉ, dress, lịch trình, lời chúc mẫu, tài khoản quà, ảnh album mẫu (8–10), nhạc mặc định, cờ `countdown`/`giftWidget` mặc định.
- Tài sản bản quyền (ảnh, nhạc) để `public/assets/_reference/` (đã ignore) khi phục vụ so sánh; không đưa vào repo.

---

## D. Ngưỡng audit (qua/không qua)

| Hạng mục | Ngưỡng |
|---|---|
| Chiều cao từng khối ở 390/768/1440 | ≤ 2px so với gốc |
| Tổng chiều cao root | ≤ 2px (sai số 0.5px do làm tròn font là bình thường) |
| So ảnh bìa/khối (pixelmatch) | ≤ 3% điểm lệch (>24/255), loại trừ hạt rơi và widget chat |
| Console error / network 4xx-5xx / ảnh vỡ / tràn ngang | 0 |
| Tương tác: mở bìa, album, hộp quà, RSVP, lời chúc, `?guest=` | đạt |
| `editor-sync` | 0 FAIL (SKIP chỉ khi ghi rõ lý do) |

Công cụ: `scripts/audit.mjs <id>` (khối + console/network), `scripts/editor-sync.mjs <id>`, `scripts/phase6_all.mjs` (quét 75 mẫu).

---

## E. Lỗi hay gặp (đã thấy) — cách nhận biết / cách sửa

| # | Lỗi | Nhận biết | Sửa |
|---|---|---|---|
| 1 | Tiện ích cũ `!important` (`.flex`, `.gap-*`, `.p-*`…) đè biến thể `md:` của Tailwind | Khối đúng ở 390, lệch ở 768/1440; `getComputedStyle` ra giá trị không responsive | Bỏ `!important` ở khối tiện ích cũ (đã làm); ưu tiên Tailwind |
| 2 | App tắt Tailwind preflight, trang gốc có | `border-b` không vẽ viền; `img` có khoảng trống dưới; `h*`/`ol` có margin | Preflight cục bộ bằng `:where([data-testid=…]) *` (đã làm cho mẫu Nâu); xem quyết định ở `clone-plan.md` |
| 3 | Style nội tuyến chép từ kích thước tính toán ở 390 | `md:text-[..]` có trong class nhưng không có tác dụng | Bỏ nội tuyến, dùng lớp responsive hoặc CSS theo breakpoint |
| 4 | Class `.modal` của editor đụng class `.modal` kiểu daisyUI của thiệp | Hộp thoại quà luôn hiện/đè cuối trang | CSS cục bộ cho `dialog.modal` trong thiệp (đã làm) |
| 5 | Thành phần mẫu là bản dump tĩnh (không đọc dữ liệu) | Gõ tên ở editor, xem trước không đổi | Đọc từ `Inv`; kiểm bằng `editor-sync` |
| 6 | Đường dựng chung `Preview` thiếu trường (mẫu không phải Nâu): `locTitle`, giờ tiệc, kiểu album Lưới/Ghép/3D, công tắc ẩn/hiện một số khối, "Thêm lễ" | `editor-sync` báo FAIL ở song_hy/baroque/florence/boho (xem `editor-sync-*.md`) | Dựng engine khối dùng chung đọc `Inv`; đây là việc lớn nhất của kế hoạch |
| 7 | Thứ tự/bộ thẻ editor local khác gốc | `editor-sync` mục "(cấu trúc)" FAIL | Thẻ lọc/sắp xếp theo `capabilities` (B2) |
| 8 | Chữ Unicode NFC/NFD lệch khi so chuỗi | Regex tiếng Việt không khớp dù nhìn giống | `.normalize("NFC")` trước khi so |
| 9 | Làm tròn nửa pixel làm lệch 1px ở tổng | Mọi khối trùng nhưng root lệch 1 (ví dụ Nâu: local 5412,375 vs gốc ≈5413) | Chấp nhận ≤2px, đo khối không đo tổng |
| 10 | Cloudflare chặn khi gửi nhiều request | Trang "Sorry, you have been blocked"; "Invitation not found" thoáng qua | Không đo bằng trình duyệt headless; đo bằng Chrome của người dùng, giãn request, thử lại sau; không vượt chặn |
| 11 | Trình duyệt hỏi quyền "mạng cục bộ" khi trang gốc gửi dữ liệu về localhost | Công cụ treo 45s | Người dùng bấm "Cho phép" một lần |
| 12 | Đầu ra công cụ chứa query string bị chặn | `[BLOCKED: Cookie/query string data]` | Không in URL có `?`; ghi dữ liệu vào tệp qua collector |
| 13 | Vite sập khi quét thư mục profile Chrome | `EBUSY` | `server.watch.ignored: ["**/.chrome_profile/**"]` (đã làm) |
| 14 | Viewport iframe ≠ viewport thật | Media query theo iframe, đúng; nhưng `vh` theo cửa sổ | Đo ở iframe có chiều rộng cố định, chiều cao 844/900 |

---

## F. Quy tắc quy trình
1. Mỗi số đo phải có nguồn (computed style, `getBoundingClientRect`, `getAnimations()`, khung hình đóng băng).
2. Một mẫu = `capabilities.json` + `theme.json` + `data/demo/<id>.json` (+ ảnh); không viết thêm component riêng trừ khi bắt buộc (ghi lý do).
3. Mẫu "xong" khi qua toàn bộ mục D, kể cả `editor-sync`.
4. Không commit tài sản `_reference/`; chỉ commit mã, cấu hình, tài liệu.

---

## G. Công thức sửa dùng cho mọi mẫu (rút từ kiểm tra từng phần tử mẫu Nâu — xem `docs/brown-fix-plan.md`)

**Phát hiện nền tảng:** trang gốc = **Tailwind v4 + daisyUI v5** (preflight v4 zero `margin/padding`; `@layer daisyui…`; màu `oklch`; `rounded-full` = `3.35544e+07px`; `rotate/translate/scale` là thuộc tính riêng nên `transform` tính toán = `none`; editor dùng theme `halloween`). Bản local dùng Tailwind v3 chỉ phát `utilities`.

| Mã | Công thức | Khi nào dùng | Cách kiểm |
|---|---|---|---|
| R1 | Thêm `@tailwind base;` vào `tw.css` (preflight vẫn tắt trong config) để có biến `--tw-*` mặc định | Lệch x/y/w/h ở ảnh/họa tiết dùng `-translate-*`, `rotate-*`, `scale-*`; vòng sáng/bóng `ring-*`, `shadow-*` mất | `diff_dump` giảm lệch hình học; phần tử có xoay ở gốc phải xoay ở local |
| R2 | Bỏ `!important` ở tiện ích cũ (`.flex`, `.gap-*`, `.p-*`…) | Đúng ở 390, lệch ở 768/1440 | Chiều cao khối ≥768 khớp gốc |
| R3 | Preflight v4 cục bộ cho vùng thiệp bằng `:where(.invitation-root) *` (border 0 solid, margin/padding 0, img/svg block, h*/p/ol margin 0, button/input kế thừa font) | Viền `border-b*` không vẽ, ảnh có khoảng trống, tiêu đề lệch dọc | `border` hiển thị; chiều cao khối khớp |
| R4 | Hộp thoại daisyUI: `dialog.modal` ẩn khi đóng; `.modal-bottom .modal-box{width:100%;max-width:none}`; từ `sm:` dùng `max-w-xl`/`max-w-lg` theo lớp | Hộp thoại luôn hiện; rộng 91.67% thay 100% | `diff_dump gift` 0 lệch x/w |
| R5 | Sao chép luật CSS gốc cần thiết (scrollbar, `font-family` hộp thoại…) từ stylesheet gốc bằng `document.styleSheets` (cùng nguồn), không tự đoán | Lệch do thanh cuộn, font hộp thoại | Giá trị bằng nhau trong `diff_dump` |
| R6 | Style nội tuyến chép từ kích thước ở 390 → xóa, thay bằng lớp responsive của gốc | `md:text-[..]` không có tác dụng | Cỡ chữ khớp ở 768/1440 |
| R7 | Token theme (màu/font/cỡ/bo/bóng) lấy từ `computed` của gốc, ghi vào `theme.json`; màu `oklch` giữ nguyên giá trị oklch trong CSS, không làm tròn hex | Màu lệch 1–3 đơn vị, editor dùng trắng 255 thay vì 205 | `diff_dump` màu (so qua canvas) 0 lệch |
| R8 | Bản đồ: render iframe ngay khi `showMap` (lazy) — không chờ bấm | Gốc tải bản đồ luôn | Có iframe maps trong dump |
| R9 | Phần tử ngẫu nhiên/không tất định (hạt rơi, ảnh mini hộp quà, confetti) đưa vào allowlist của audit | Mỗi lần tải khác nhau | Allowlist trong `diff_dump` |
| R10 | Engine mở thiệp theo bảng A1: t0 `seal-break`(500)+`seal-ring`(600)(+`dragon-fly-forward` 1200 nếu hộp 3D); ~490–830ms `particle-burst`(1400)+`envelope-away`(800); idle `seal-pulse/shine/ping` | Chuỗi animation lệch | `scripts/survey/local_open_seq.mjs <id>` 0 khác biệt |
| R11 | Mỗi hộp thoại của trang gốc (RSVP, quà, lightbox) có **đặc tả đo riêng** (kích thước, chữ, màu); không dùng hộp thoại chung của editor | RSVP ở local khác hẳn | `diff_dump rsvp` ghép ≥90% phần tử, 0 lệch |
| R12 | Editor: token = daisyUI theme `halloween` (`--color-base-100/200/300`, `base-content`, `primary`…); thành phần theo đặc tả `fieldset/legend/input/btn` của daisyUI v5 | Màu/kích thước ô nhập/nút/ nhãn lệch | `diff_dump editor` |

**Cây quyết định khi gặp một dòng lệch:** (1) lệch ở lớp tiện ích/hiệu ứng ở mọi mẫu → engine (R1–R4, R10); (2) lệch giá trị của một mẫu → `theme.json` (R6–R7); (3) lệch chữ/ảnh → `data/demo`; (4) lệch cấu trúc → `capabilities`; (5) lệch ngẫu nhiên → allowlist (R9).

**Allowlist chuẩn khi so phần tử (đã cài trong `diff_dump.mjs`):** biểu diễn `3.35544e+07px`≡`9999px`; fallback font `ChungDoiIndic`≡`serif`; `transform` không so (so hình học); khóa của hạt, ảnh mini hộp quà, confetti; dấu ngoặc lunar tách text node.

**Ngưỡng audit cập nhật (thay mục D):** mỗi trạng thái (bìa, thiệp mở, hộp quà, RSVP) × mỗi khổ (390/768/1440) và editor (390/768/1280): **0** lệch hình học (dung sai 1px), **0** lệch kiểu ngoài allowlist, chiều cao root ±1px, chuỗi mở thiệp 0 khác biệt, `editor-sync` 0 FAIL.

### G2. Cô lập CSS thiệp (Phương án B — đã áp dụng cho mẫu Nâu)
- Nguồn: `src/features/invitation/styles/invitation.src.css` (thêm `@source "../components/<Component>.tsx"` cho mỗi component thiệp mới); biên dịch: `npm run css:inv`.
- Bắt buộc: gỡ `@layer` + tiền tố `.inv-root` + loại tiện ích v3 khỏi `.inv-root` (xem `postcss.config.js`). Thiếu một trong ba: mất hiệu ứng (`ring`, `shadow`), lệch ưu tiên, hoặc v3 đè v4.
- Component thiệp phải có class `inv-root` ở phần tử ngoài cùng của vùng (kể cả hộp thoại bên trong).
- **Cảnh báo bản dump HTML:** khi component được chép từ HTML của trang gốc, class có biến thể `[&>...]` bị mã hóa `&gt;` (`[&&gt;div:last-child]`) → Tailwind không nhận. Luôn quét `&gt;`, `&lt;`, `&quot;` trong `className` (`grep -o 'className="[^"]*&[a-z]*;'`).
- Công thức R1 (`@tailwind base`) **không còn cần** với vùng `.inv-root` (v4 đã có `@property` mặc định).
- Token daisyUI: theme `halloween` (bo góc `--radius-box:1rem`…); font mặc định `--font-sans: ui-sans-serif, system-ui, sans-serif, …` như gốc.
