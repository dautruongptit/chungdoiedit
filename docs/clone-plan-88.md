# Kế hoạch đưa 88 mẫu về giống trang thật

Thay cho `clone-plan.md` (viết cho 75 mẫu, trước khi có khuôn chung). Số liệu dưới đây đo ngày 01/11/2026 trên chungdoi.com và bản local; chỗ nào là **giả định** thì ghi rõ và sẽ được xác nhận ở Giai đoạn 1.

## 0. Hiện trạng (đã đo)

| Hạng mục | Trang thật | Local |
|---|---|---|
| Số mẫu | **88** (danh sách, hộp thoại đổi mẫu, kho mẫu trong mã đều 88) | **88** trong danh sách; đúng thứ tự, tên, mô tả, tag, nhãn Hot/Mới, ảnh listing + full |
| Mẫu đã clone theo khuôn chung (bìa, thiệp mở, hộp quà, RSVP, editor, xem trước) | — | **3**: `minimalism_brown`, `riviera_blue`, `dragon_phoenix_v4_red` |
| Mẫu còn chạy đường `Preview.tsx` cũ (lệch lớn) | — | **85** |
| Cấu hình bìa đo thật | — | 3/88. 72 mục trong `coverConfigs.ts` là giá trị mặc định/đoán (52 hạt `petal`, 57 con dấu `heart`) |
| Cửa sổ chi tiết mẫu (danh sách) | daisyUI, ảnh tự cuộn | đã khớp ở ≥768px; mobile chưa đo |
| Quy tắc "một thiệp nháp" | có hộp thoại áp mẫu vào nháp | đã làm, đã xác nhận trên thật |

**Phân nhóm theo tên** (bỏ hậu tố màu): 88 mẫu = **51 nhóm tên**. Nhóm đông: Minimalism 7; Dragon Phoenix 4; Glass Garden 4; Double Dragon, Boho Floral, Crystal Floral, Baroque V2, Qasr, Silk Ribbon, Royal, Spring Garden, Porcelain, Porcelain V2 mỗi nhóm 3; còn lại 1–2. Đây chỉ là **cận trên** số họ bố cục: giả định các bản khác màu cùng bố cục, khác ảnh/màu. **Giả định này chưa kiểm chứng**; số họ thật (ước lượng 15–25) chỉ có sau Giai đoạn 1.

## 1. Phạm vi "giống thật" cho mỗi mẫu

Ba màn, mỗi màn đo thật rồi so, dung sai 1px, các độ rộng 390/768/1280/1440:

**A. Xem demo `/vi/mau-thiep/<slug>/demo`**
- Bìa: ảnh, chữ, con dấu (囍 / tim / ảnh), khung, phông; **hiệu ứng nền** (tuyết/cánh hoa rơi hoặc bay lên, hạt 囍, pháo hoa, ngôi sao…) với đúng loại, số lượng, tốc độ, hướng.
- **Bấm "Mở thiệp"**: chuỗi chuyển cảnh theo thời gian (hạt tuôn từ con dấu, sóng, pháo hoa, rồng bay…), thời điểm bìa biến mất, thiệp hiện, thanh cuộn. So bằng dòng thời gian (`open_timeline.js`), không so bằng mắt.
- Thiệp đã mở: từng khối, thứ tự, khoảng cách, phông, màu, hiệu ứng khi cuộn (parallax, hiện dần).
- Hộp quà (hộp 3D / phong bì / QR), RSVP, lời chúc, lightbox ảnh, nhạc nền (nút, tự phát).

**B. Chỉnh sửa**: đầy đủ thẻ và trường như thật cho mẫu đó (thẻ có/không, vị trí Thư viện ảnh, kiểu ảnh đầu thiệp tròn/dọc, dòng mở đầu, kiểu hộp quà, kiểu album…), nút đổi mẫu, hộp thoại, hiệu ứng nếu có.

**C. Xem trước trong editor**: dùng đúng bộ dựng của màn A, đổi theo dữ liệu nhập; mọi công tắc/trường ở B phản ánh sang C.

## 2. Nguyên tắc

1. Số đo phải đo thật. Không đoán, không dùng "mặc định" cho mẫu chưa đo.
2. Một bộ dựng chung (khuôn + khối + engine hiệu ứng) và dữ liệu theo mẫu (`theme.json`, `capabilities.json`, `demo.json`). Không `if (templateId === …)` trong khối.
3. Mẫu bản khác màu của cùng họ chỉ được thêm khi **tự động** so ra 0 lệch hình học; nếu lệch thì tách họ mới.
4. Sửa một file dùng chung thì kiểm lại ở trang thật xem tính năng đó có dùng chung không, rồi chạy lại các mẫu đã xong (bài học từ khung cắt ảnh và thứ tự thẻ album).
5. Không commit/push khi chưa được duyệt; không nhập mật khẩu, không tạo tài khoản, không vượt Cloudflare; ít request.

## 3. Các giai đoạn

### Giai đoạn 0 — Công cụ và nợ kỹ thuật (làm trước, không đo thêm mẫu)
- Gom đo hàng loạt: `P.crawl(list)` chạy tuần tự, giãn ≥20s giữa các lần tải, dừng khi gặp trang chặn; `npm run audit -- <id>|--all` chạy `diff_dump` + `editor-sync` + timeline và ghi **bảng trạng thái 88 mẫu** `docs/survey/status-88.md` (mẫu × màn × khổ → số lệch).
- Nợ đã biết cần trả vì mọi họ đều dùng: (1) ~~hộp thoại RSVP theo markup daisyUI thật~~ **đã xong** (`BrownRsvpDialog` chuyển sang `<dialog className="modal">`); (2) parallax khi cuộn — **đo một phần (01/11/2026)**: không có hiệu ứng fade-in/reveal khi cuộn (mọi phần tử opacity luôn 1, kể cả phần tử nằm dưới xa điểm cuộn hiện tại — đã kiểm bằng `getComputedStyle` ở nhiều vị trí cuộn trên `riviera-lam`). **Có** parallax decor thật: ảnh nền trang trí (`cloud-2/3.webp`, `mountain.webp`, `lake.webp`, `village.webp` — `position:absolute`, `pointer-events-none`) có `transform: matrix(...)` đổi theo cuộn, biên độ nhỏ (ty đổi ~0.02–0.04px cho mỗi px cuộn ở mountain/lake); `cloud-2` có offset cố định không đổi theo cuộn tiếp (có thể là hiệu ứng tính một lần theo vị trí xuất hiện, không phải tuyến tính theo scrollY toàn trang). **Chưa trích được công thức chính xác** (cần hook `requestAnimationFrame`/đọc mã nguồn bundle thay vì suy luận từ mẫu rời rạc — trang có smooth-scroll/snap làm `scrollTo()` không nhảy đúng vị trí yêu cầu). Việc còn lại: đọc mã js bundle phần parallax hoặc dùng `performance`/`MutationObserver` để bắt transform mỗi frame, suy ra công thức, rồi viết `useParallaxDecor` áp cho `layout.parallaxDecor === true` (hiện chỉ riviera_blue). (3) ~~nối `getCapabilities()` vào editor~~ **đã xong**: `getEditorSections()` trong `specs/index.ts` ưu tiên `capabilities.editor.sections` (đo thật), fallback sang ma trận 88 mẫu khi mẫu chưa có spec; (4) cửa sổ chi tiết mẫu ở mobile — **vẫn chặn**: công cụ `resize_window` không thu nhỏ được cửa sổ Chrome trong môi trường này (giữ nguyên 1920px dù gọi nhiều lần, tab mới cũng vậy) — cần bạn tự mở cửa sổ ~390px hoặc gửi ảnh chụp mobile của cửa sổ chi tiết mẫu thật; (5) kiểu album Lưới/Ghép ảnh/3D theo lựa chọn — **đã nối** vào 3 shell Album blocks, nhưng Grid/Collage trong `AlbumGallery.tsx` là dựng theo **Figma, chưa đo thật** từ trang gốc (chỉ nhánh 3D là markup đo thật); cần đo lại Grid/Collage ở Giai đoạn 1/2 rồi thay bằng markup thật; (6) công thức bìa của V4/Riviera tách thành thư viện — đã khá tốt (75/75 mẫu có `CoverConfig` đo thật qua `BaseCoverCard`, 6 mẫu bespoke riêng), không cần refactor lớn.
- Cổng qua: 3 mẫu đã xong giữ 0 lệch sau khi đổi nền (so bằng `cmp_dumps`).

### Giai đoạn 1 — Khảo sát phân loại 88 mẫu (chưa viết mẫu nào)
Mục tiêu là ra **bảng thật**: mẫu → họ bố cục, hiệu ứng, cờ editor. Hai nguồn:
- **Từ mã trang thật** (rẻ, không cần tải từng mẫu). **Đã xác nhận một phần (01/11/2026):** chunk `58089-*.js` có **88 module cấu hình bìa** dạng `{theme:{background, cardBg, textPrimary, accent, buttonBg, particleColors, particleType, …}, fonts, couple, decorations, sealType, cardImages, flyOnOpen, musicTrackId, …}`. Phân bố đã đếm: `particleType` = flowers 47, happiness (囍) 18, leaves 9, petals 5, sparkles 5, confetti 2, hearts 2; `sealType` = heart 67, happiness 3. Trong bảng này **không** có "tuyết" hay "pháo hoa" làm loại hạt; hai hiệu ứng đó (nếu có) nằm ở chuyển cảnh mở thiệp hoặc ở nơi khác, phải đo. Mỗi module còn có `musicTrackId` (nhạc demo của mẫu) và đường dẫn ảnh `/images/themes/<tên>/…`. Việc còn lại: tách 88 module, gắn với mã mẫu (qua thư mục `images/themes/<tên>`), phân giải các biến ảnh (`p.flower`…), ghi `docs/survey/catalog-88.json`.
- **Đã đo thân thiệp 88 mẫu (01/11/2026)** bằng iframe cùng origin rộng 390px (đồng thời là bố cục mobile): kết quả `docs/survey/body-sig-88.json`, gom thử `docs/survey/families-88.md`. Kết luận chắc chắn: cả 88 mẫu dùng **chung một bộ mã**; mã thân thiệp của từng mẫu là một trong **88 module có `data-testid` riêng** nằm cùng một chunk lớn; thứ tự khối có 6 kiểu (62 mẫu theo thứ tự chuẩn Lễ → Album → Tiệc → Dress → Lịch trình → Lưu bút → Quà; 9 mẫu Album đứng đầu; …). Gom họ theo chiều cao khối **không đủ sắc** (gom nhầm Nâu với V4) nên **không dùng**. Sau ~100 lần tải, Cloudflare bắt đầu chặn → đã dừng; 8 mẫu còn thiếu vị trí tiêu đề.
- **Đã chia họ bằng so mã (01/11/2026, 1 request):** kết quả `docs/survey/families-88.md` (+ `families-code-88.json`). Phân bố độ giống tách đôi rõ, ngưỡng 0,8 ổn định → **69 họ**: 10 họ nhiều mẫu (29 mẫu, đều là bản khác màu cùng tên: Long Phụng ×4, Vườn Xuân, Bạch Sứ V2, Song Long, Baroque V2, Hoa Thủy Tinh, Hoàng Kim, Bạch Sứ ×3, Song Phụng ×2, Song Hỷ ×2) và **59 mẫu thiết kế riêng**. Nhiều bộ trùng tên **không** cùng mã (7 bản Minimalism chỉ giống ~0,3–0,4; Vườn Kính, Tơ Duyên, Thanh Cung, Lâu Đài, Hoa Mộc…). Một số cặp riêng giống 0,6–0,7 (Thanh Cung vàng/xanh, Hoa Mộc xanh/nâu, Vườn Kính, Tơ Duyên) → dựng chung khung, khác chi tiết. **Còn phải dựng 66 bố cục** cho 85 mẫu; 3 mẫu đã clone đều là mẫu riêng. Kiểm chứng: Nâu↔V4 0,11; Long Phụng đỏ↔lam 0,99.
- **Đo trực tiếp** bằng Chrome, từng mẫu: bìa (ảnh chụp + DOM), chuỗi mở thiệp, thiệp mở ở 390, danh sách tiêu đề khối theo thứ tự, chiều cao khối (làm tròn 10px), animation đang chạy (API animation). Mẫu bị lệch phát hiện sớm thì ghi lại, chưa sửa.
- `cluster.mjs`: gom theo vector đặc trưng (engine mở, loại hạt, con dấu, thứ tự khối, chiều cao khối, kiểu album/hộp quà) → bảng họ.
- **Danh mục hiệu ứng** (mỗi dòng: loại, mẫu dùng, thông số đo): hạt rơi/bay lên (cánh hoa, tuyết, hoa anh đào…), hạt 囍, tim, pháo hoa/confetti, ngôi sao, rồng bay, sóng con dấu. Chưa biết mẫu nào có pháo hoa hay tuyết; bước này trả lời.
- Đầu ra: `docs/survey/catalog-88.json`, `docs/survey/families.md`. Cổng qua: mỗi mẫu có họ + danh sách hiệu ứng; số họ chốt.

### Giai đoạn 2 — Thư viện hiệu ứng bìa/mở thiệp (một lần cho cả 88 mẫu)
Mỗi loại hiệu ứng trong danh mục Giai đoạn 1 làm **một lần**, tham số hóa (số hạt, kích thước, tốc độ, màu, hướng, thời điểm), đo bằng dòng thời gian và so với trang thật ở 2–3 mẫu dùng nó:
- Hạt nền: rơi / bay lên / lắc lư; biến thể cánh hoa, tuyết, 囍, tim, ngôi sao, confetti.
- Chuyển cảnh mở thiệp: tuôn hạt từ con dấu + sóng (đã có), rồng bay (đã có cho V4), pháo hoa/tuôn hạt ở tâm (nếu danh mục xác nhận), các biến thể khác.
- Con dấu: chữ, ảnh, tim, không có. Khung bìa, kiểu chữ tên.
- Cổng qua: với mỗi hiệu ứng, lệch thời điểm ≤ 1 khung hình (~40ms) ở mốc bìa biến mất; vị trí/kích thước hạt khớp phân bố thật.

### Giai đoạn 3 — Thí điểm: một mẫu đại diện cho mỗi họ
Theo thứ tự họ đông mẫu trước (Minimalism 7, Dragon Phoenix 4, Glass Garden 4, rồi các họ 3, 2…). Mỗi mẫu làm đủ A + B + C theo quy trình `clone-playbook.md`: đo → sinh khối (`gen_*.cjs`) → theme/capabilities/demo → cover config → `diff_dump` 0 lệch → `editor-sync` → timeline mở thiệp. Mỗi họ mới thì bổ sung `capabilities`, **không** bỏ qua cờ nào.
- Cổng qua mỗi họ: hình học 0 lệch và kiểu 0 lệch (trừ phần tử đổi theo thời gian) ở 4 khổ; `editor-sync` 0 FAIL; không làm lệch mẫu đã xong.
- 3 họ đã xong: Minimalism (Nâu), Riviera, Traditional (Long Phụng V4).

### Giai đoạn 4 — Các bản khác màu / biến thể trong cùng họ (hàng loạt, phần lớn tự động)
Với mỗi mẫu: thêm `theme.json` + `demo.json` + ảnh + cấu hình bìa lấy từ Giai đoạn 1, chạy `audit` tự động. 0 lệch → xong; lệch → mở lại họ (tách họ mới hoặc thêm cờ). Làm theo lô 5–8 mẫu cùng họ, chạy lại audit của mọi mẫu đã xong sau mỗi lô.

### Giai đoạn 5 — Editor: thẻ và trường theo từng mẫu
Editor dùng chung phần lớn; khác biệt giữa mẫu nằm ở `capabilities` (vị trí album, hình ảnh đầu thiệp, dòng mở đầu, kiểu hộp quà, nhạc, kiểu album…). Đo editor thật cho **một mẫu mỗi họ**: cần áp mẫu vào bản nháp của bạn (đổi dữ liệu tài khoản). Đề xuất cách an toàn: xin phép một lần, làm tuần tự, **cuối cùng áp lại Long Phụng V4** và kiểm số ảnh/trường còn nguyên (như đã làm hôm nay). Các mẫu còn lại của họ kế thừa, nhưng vẫn kiểm bằng `editor-sync`.

### Giai đoạn 6 — Hồi quy toàn bộ và đóng
- `tsc`, build; `audit --all` cho 88 mẫu × 3 màn × 4 khổ ra bảng `status-88.md` với 0 lệch; `phase6_all.mjs` quét 88 mẫu không lỗi console/network.
- So ảnh chụp bìa + 3 khối (pixelmatch ≤3%) cho mẫu mới.
- Dọn đường cũ `Preview.tsx` khi không còn mẫu nào dùng. Cập nhật `AGENTS.md`, `clone-playbook.md`.
- Chia commit theo nhóm (xem mục 5), sau khi bạn duyệt.

## 3b. Lỗi dữ liệu cần sửa trước (phát hiện 01/11/2026)

- **Ảnh tải lên không được lưu.** Ảnh đầu thiệp, album, ảnh trong lịch trình… lưu dưới dạng `blob:` URL (`URL.createObjectURL`) — chỉ là tham chiếu tạm trong tab hiện tại, **tệp ảnh không được ghi ở đâu cả**. Khi mở lại editor (tải lại trang, hoặc chọn mẫu mới → áp vào nháp → mở lại editor), `EditorPage` lọc bỏ mọi `blob:` URL, nên ảnh mất hết. Thông tin chữ thì **có** được lưu (đã thử: tên chú rể còn sau tải lại và sau đổi mẫu).
- **Rủi ro mất cả thông tin chữ:** ảnh QR ngân hàng lưu dạng `data:` URL ngay trong `localStorage` (giới hạn ~5MB). Ảnh QR lớn làm vượt hạn mức → lệnh lưu thất bại **im lặng** → mọi thay đổi sau đó không được lưu.
- **Cách sửa đề xuất:** lưu tệp ảnh vào IndexedDB của trình duyệt (dung lượng lớn), trong dữ liệu thiệp chỉ ghi khóa ổn định (ví dụ `idb:<mã>`), khi hiển thị thì đổi khóa thành URL. Ảnh còn nguyên sau tải lại và khi đổi mẫu; QR không còn chiếm `localStorage`. Thêm báo lỗi khi lưu thất bại thay vì im lặng.

## 4. Ước lượng công sức (giả định, sẽ cập nhật sau thí điểm)

Chưa có số đo thời gian chắc chắn cho cả dự án. Tham chiếu: một họ mới (Long Phụng V4) cần cả một phiên làm việc dài để đạt gần 0 lệch, chưa kể sửa nền chung. Nếu số họ là 15–25 và biến thể khác màu chạy tự động được thì khối lượng chính nằm ở Giai đoạn 0–3, không phải 88 lần làm lại. Nếu số họ lên đến 30–51 thì mỗi mẫu gần như một công việc riêng và kế hoạch phải đổi (xem rủi ro). **Chỉ chốt con số sau Giai đoạn 1.**

## 5. Cần bạn quyết định

1. **Cho phép khảo sát 88 mẫu trên trang thật:** ước tính 5–6 lần tải mỗi mẫu (bìa, mở 390/768/1440, trang mẫu, editor) trong nhiều phiên, giãn cách, dừng khi bị chặn. Hoặc chỉ khảo sát một phần ban đầu (ví dụ 20 mẫu đại diện).
2. **Áp mẫu vào bản nháp để đo editor** (Giai đoạn 5): đồng ý một lần cho cả quy trình có khôi phục về Long Phụng V4 không? Mỗi lần áp là thay đổi dữ liệu tài khoản.
3. **Màn mobile của các cửa sổ** (chi tiết mẫu, hộp quà…): cần cửa sổ trình duyệt thu nhỏ thật để đo; tôi chưa tự thu nhỏ được. Bạn có thể mở cửa sổ ~390px hoặc gửi ảnh chụp.
4. **Nhạc và ảnh bản quyền:** tiếp tục để ở `public/assets/_reference/` và `public/images/template-previews/` (chỉ localhost, không commit)? Hay thay bằng tài nguyên không bản quyền?
5. **Thứ tự ưu tiên họ:** đề xuất họ đông mẫu nhất trước (Minimalism, Dragon Phoenix, Glass Garden…), hay theo mẫu bạn cần bán/dùng trước?
6. **Nhiều thiệp nháp:** hiện đã đồng bộ "một thiệp nháp"; thiệp đã xuất bản và nhiều thiệp xuất bản chưa đối chiếu với trang thật (cần xuất bản thật một thiệp để thử).
7. **Cách chia commit** (đề xuất): (a) CSS nền và hộp thoại · (b) khuôn thiệp + engine hiệu ứng · (c) từng họ mẫu một commit · (d) editor + capabilities · (e) dữ liệu 88 mẫu + docs. Sẽ báo lại khi bạn duyệt.

## 6. Rủi ro

- Số họ bố cục có thể lớn hơn ước lượng → công sức tăng gần tuyến tính theo số họ (giả định ở mục 0).
- Cấu hình hiệu ứng có thể sinh động trong JS theo mẫu chứ không phải dữ liệu tĩnh → phải đo từng mẫu (Giai đoạn 1, nhánh "đo trực tiếp").
- Parallax và hiệu ứng theo cuộn phụ thuộc lịch sử cuộn → cần quy ước đo (cuộn cố định rồi lấy mẫu) để so được.
- Cloudflare có thể chặn tạm → kế hoạch có giãn cách và dừng sớm.
- Ảnh listing/full của 13 mẫu mới là bản WebP nén lại qua `_next/image` (không phải tệp gốc); đủ cho xem local, không dùng để so điểm ảnh.
- Hộp quà/phong bì của một số mẫu dùng ảnh dự phòng (chưa có ảnh thật cho mọi mẫu).
