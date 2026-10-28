# Kế hoạch chung clone 75 mẫu

Dựa trên: `docs/clone-rules.md` và khảo sát 5 mẫu (`docs/survey/`). Mọi con số dưới đây là **ước lượng từ 5/75 mẫu** — phải được xác nhận bằng quét tự động (mục 3) trước khi làm hàng loạt.

## 1. Ước lượng số "loại" thực tế

| Tầng | Đo được ở 5 mẫu | Ước lượng cho 75 | Độ chắc |
|---|---|---|---|
| Engine mở thiệp | 1 engine, 2 biến thể (hộp 3D có `dragon-fly-forward`; phong bì không có) | 1 engine, 2–3 biến thể | **Cao** (5/5 cùng chuỗi, đo bằng animation API) |
| Engine hộp quà | 2 (`igb*` 3D, `ienv*` phong bì) | 2–3 | **Cao** |
| Engine album | 1 (coverflow 3D) × 2 chỉ báo (đếm / chấm) | 1 × 2–3 | Cao |
| Bộ thẻ editor | 1 schema, 3 cờ (kiểu ảnh đầu, dòng mở đầu, vị trí album) | 1 schema, 3–5 cờ | Trung bình–cao (5/5 cùng field/nút) |
| Cờ khối thiệp (đếm ngược, parallax, hành vi ≥768) | 3 cờ, 2–3 giá trị mỗi cờ | 3–6 cờ | Trung bình |
| **Họ bố cục** (cách dàn từng khối) | 5/5 mẫu khác nhau, nhưng chủ đích chọn khác nhau | **10–20** (giả định trung tâm 15) | **Thấp** — mã local có 31 họ bìa nhưng bìa dùng chung engine nên không suy ra được họ bố cục |
| Dữ liệu riêng (theme + demo) | 75 | 75 | Chắc |

Kết luận tạm: nên làm **1 engine + ~15 họ bố cục + 75 bộ theme/dữ liệu**, thay vì 75 component. Mức tiết kiệm phụ thuộc hoàn toàn vào số họ bố cục thật; nếu >30 thì lợi thế giảm.

## 2. Thứ tự làm

**Giai đoạn 0 — Nền tảng (trước khi làm mẫu nào)**
1. Chuyển bản chuẩn Nâu từ component tĩnh sang `engine khối` đọc `Inv` + `theme.json` + `capabilities.json` (chính Nâu là bài kiểm tra: kết quả phải giữ nguyên số đo).
2. Engine bìa/mở thiệp theo bảng A1 (một component, tham số theo `cover.*`, `gift.widget`).
3. Editor đọc `capabilities` (B2). Kiểm `editor-sync` mẫu Nâu 0 FAIL.
4. Quyết định phạm vi preflight/tiện ích (mục 5) — làm một lần.
5. Công cụ: gom `scripts/audit.mjs`, `editor-sync.mjs`, `phase6_all.mjs` vào một lệnh `npm run audit -- <id>` / `--all`.

**Giai đoạn 1 — Quét 75 mẫu để chốt "loại"** (mục 3). Không viết mẫu nào trước khi có kết quả.

**Giai đoạn 2 — Thí điểm:** mỗi họ bố cục làm **một** mẫu đại diện (≈10–20 mẫu). Mục tiêu là chứng minh engine đủ; mỗi lần phát hiện cờ mới thì cập nhật `clone-rules.md`.

**Giai đoạn 3 — Hàng loạt theo họ:** ưu tiên họ lớn trước (ví dụ nhóm Baroque/Porcelain ~21 mẫu nếu quét xác nhận cùng họ bố cục).

## 3. Quy trình quét tự động 75 mẫu (xác nhận/điều chỉnh các "loại")

Công cụ đã có: `scripts/survey/probe.js` + `run.js` + `editor.js` (đo trong Chrome của người dùng), `collector.mjs` (ghi `docs/survey/raw/`), `build_report.mjs`.
Cần viết thêm:
- `scripts/survey/crawl.md` + một hàm `P.crawl(list)` chạy tuần tự cho từng mẫu: `stepCover` → `stepOpened(390)` → `stepGift` (đã có) + đo album (probe `album_probe`) + đo editor (cần bước "Chọn mẫu này" → "Áp dụng").
- `scripts/survey/cluster.mjs`: gom nhóm theo vector đặc trưng.

**Vector đặc trưng mỗi mẫu:** cờ engine (có `dragon-fly-forward`, `ienv*` hay `igb*`, `ambient-fall|rise`), tập tiêu đề khối theo thứ tự, danh sách chiều cao khối ở 390 (làm tròn 10px), số phần tử con của root, hành vi 768→1440 (đổi/không), số phần tử parallax, đếm ngược, chỉ báo album, bộ thẻ editor + thứ tự, tên nhạc, bộ font. Gom bằng khoảng cách Hamming trên cờ + Jaccard trên tập tiêu đề; ngưỡng cắt cho ra nhóm; nhóm lẻ (<2 mẫu) được gắn nhãn "riêng".

**Tần suất/độ an toàn:** mỗi mẫu 5–6 lần tải (bìa, mở 390, 768, 1440, trang mẫu + editor). Giãn ≥20s giữa các lần tải, 10 mẫu mỗi phiên, dừng ngay khi thấy trang chặn. Lượt 1 (nhẹ): chỉ bìa + mở 390 cho 75 mẫu (≈150 lần tải) → gom nhóm; lượt 2: 768/1440/editor chỉ cho mẫu đại diện của mỗi nhóm. Ước tính: lượt 1 ≈ 1,5–2 giờ.

**Cách điều chỉnh "loại":** nếu một nhóm có mẫu lệch >2px ở khối nào sau khi dựng bằng engine, tách nhóm đó thành họ mới; nếu hai họ cho cùng số đo sau khi dựng bằng cùng engine, gộp.

## 4. Kích thước lô và điều kiện qua lô

| Giai đoạn | Lô | Điều kiện qua lô |
|---|---|---|
| 2 (thí điểm) | 3–4 mẫu đại diện cùng lúc | Mỗi mẫu qua toàn bộ mục D của `clone-rules.md`; không thay đổi nào làm mẫu đã xong lệch >2px (chạy lại audit của mọi mẫu đã xong) |
| 3 (hàng loạt) | 5–8 mẫu cùng họ | Như trên + mẫu mới không cần mã riêng ngoài `theme.json` + `data/demo/<id>.json` + `capabilities.json` (nếu cần mã riêng: ghi lý do, tính vào "họ mới") |

**Chạy lại audit để chắc không hồi quy (sau mỗi lô và trước khi merge):**
1. `tsc --noEmit`, `vite build`.
2. `scripts/audit.mjs` cho **mọi mẫu đã xong** (3 khổ) → 0 khối lệch >2px.
3. `scripts/editor-sync.mjs` cho mẫu mới + 3 mẫu xoay vòng đã xong → 0 FAIL.
4. `scripts/phase6_all.mjs` (quét 75 mẫu, console/network) → 0 mẫu có lỗi.
5. So ảnh bìa + 3 khối (pixelmatch ≤3%) cho mẫu mới.

## 5. Việc cần bạn quyết định

1. **Cho phép quét 75 mẫu** (≈150–450 lần tải trang gốc trong nhiều phiên, từ Chrome của bạn, có giãn cách)? Hay chỉ quét một phần (ví dụ 20 mẫu đại diện)?
2. **Phạm vi sửa CSS toàn cục:** bạn đã đồng ý bỏ `!important` ở khối tiện ích cũ (làm rồi, chưa soát các mẫu khác ở 768/1440). Có bật **preflight Tailwind toàn cục** (chuẩn hóa như trang gốc, rủi ro đổi giao diện editor/trang chủ) hay giữ preflight cục bộ theo từng thiệp (an toàn, thêm một dòng CSS cho mỗi vùng)? Đề xuất: cục bộ cho vùng thiệp (`.invitation-root`).
3. **Vị trí lưu cấu hình mẫu:** đề xuất `src/features/templates/<id>/{theme.json,capabilities.json}` và `src/features/templates/demo/<id>.json`. Đồng ý?
4. **Nhạc mặc định từng mẫu:** đã tải 4 tệp vào `public/assets/_reference/music/` (chỉ localhost). Dùng chúng làm nhạc demo local, hay thay bằng nhạc không bản quyền?
5. **Bản đồ:** dùng `maps.google.com/maps?q=…&output=embed` (không khóa, hiện đang dùng) hay Google Maps Embed API có khóa của bạn?
6. **Thứ tự ưu tiên họ bố cục** sau khi có kết quả quét (đề xuất: họ đông mẫu nhất trước).
7. **Quy tắc "một nháp":** local hiện cho tạo nhiều nháp; gốc chỉ một. Giữ nguyên hay đồng bộ với gốc?
8. **Cách chia commit** (đề xuất, sẽ báo lại khi bạn duyệt): (a) CSS nền (`!important`, preflight cục bộ, modal) · (b) `MinimalismBrown` nối dữ liệu + demo + tiện ích lịch/lunar · (c) editor (gift modal, schedule, share, basic) · (d) `docs/` + `scripts/` (công cụ đo, không gồm `_reference/`, `.chrome_profile`, ảnh chụp) · (e) `.gitignore`. Mỗi commit chạy `tsc` + `vite build`.

## 6. Rủi ro
- Số họ bố cục có thể lớn hơn ước lượng (mục 1); khi đó cân nhắc giữ component riêng cho họ lẻ.
- Cloudflare: đo bằng Chrome của bạn nhưng vẫn có thể bị chặn tạm thời; kế hoạch có giãn cách và dừng sớm.
- Nhiều thứ trong `Preview` chung (đường dựng cho mẫu không phải Nâu) đang thiếu trường (xem `editor-sync-*.md`); phần engine khối là công việc lớn nhất, nên làm xong ở Giai đoạn 0–2 trước khi nhân rộng.

## 7. Cập nhật sau kiểm tra từng phần tử mẫu Nâu (ưu tiên hơn mục 2–3 khi xung đột)

Kết quả (`docs/brown-fix-plan.md`): mẫu Nâu **chưa** đúng từng px — thiệp mở 56 phần tử lệch hình học (còn 33 sau khi chỉ thêm biến `--tw-*`), bìa 0 lệch hình học, hộp thoại quà/RSVP/editor còn lệch, chuỗi mở thiệp lệch. Nguyên nhân gốc là **hệ CSS khác** (gốc: Tailwind v4 + daisyUI v5; local: Tailwind v3 chỉ `utilities`), không phải từng mẫu.

**Giai đoạn 0 bổ sung (làm trước mọi mẫu mới):**
1. Công thức R1–R4, R8, R10 (engine) → chạy lại `diff_dump` mẫu Nâu, mục tiêu 0 lệch ở 4 trạng thái × 3 khổ.
2. R11: viết lại hộp thoại RSVP theo đặc tả; R12: token theme `halloween` cho editor.
3. Mở rộng `diff_dump` (allowlist, so ảnh chụp bổ sung) và `audit.mjs` để chạy cho mọi mẫu: `npm run audit -- <id>`.
4. **Sau đó** mới nhân sang 4 mẫu đã khảo sát (Song Hỷ, Baroque, Florence, Hoa Mộc) bằng đúng quy trình mục 4 của `brown-fix-plan.md`; số "họ bố cục" xác nhận từ kết quả này.

**Quyết định thêm cần bạn:**
- **Hướng CSS cho vùng thiệp:** (A) giữ Tailwind v3 + bổ sung dần (R1–R4: nhanh, rủi ro lệch lặt vặt kéo dài) hay (B) **build riêng CSS thiệp bằng Tailwind v4 + daisyUI v5**, đặt trong vùng cô lập (iframe hoặc `@layer` + tiền tố), giống trang gốc nhất. Đề xuất: **B** cho thiệp, giữ nguyên CSS app/editor; editor cần token theme `halloween` (R12).
- Có cho phép thêm phụ thuộc (`tailwindcss@4`, `daisyui@5`) vào dự án không.
- Xem trước trong editor: render thiệp trong iframe (viewport đúng như người xem thật; sửa luôn media query ≥768) hay trong trang như hiện nay.
