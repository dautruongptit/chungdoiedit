# Playbook: clone 1 mẫu thiệp cho khớp trang gốc (chungdoi.com)

Dùng cho **bất kỳ `<templateId>`** (vd `song_hy_red`). Làm lần lượt; mỗi bước có lệnh kiểm tra và tiêu chí qua.
Tài liệu liên quan: `docs/clone-rules.md` (rule + capabilities), `docs/clone-plan.md` (kế hoạch 75 mẫu), `docs/brown-fix-plan.md` (ví dụ làm hết mẫu Nâu).
Mẫu tham chiếu đã đạt: `minimalism_brown`.

> Trạng thái: engine mở thiệp, hộp thoại RSVP, editor (khung + 16 thẻ) và khuôn thiệp đã mở (`shell/`: theme.json + capabilities.json + block) dùng chung. Khuôn hiện có một họ bố cục (minimalism); xem mục 4.2 và 8.

---

## 0. Quy tắc cứng (đọc trước)

- Số đo phải **đo thật** từ trang gốc, không đoán. Tiêu chí qua: lệch hình học **0** (dung sai 1px) ở 390 / 768 / 1280, lệch kiểu 0 (trừ allowlist trong `diff_dump.mjs`).
- Không nhập mật khẩu / tạo tài khoản / gửi form trên trang gốc. Không vượt Cloudflare; ít request. Gặp "Invitation not found" hoặc bị đăng xuất → chờ, thử lại.
- Ảnh/nhạc bản quyền chỉ để ở `public/assets/_reference/` (đã gitignore, chỉ localhost). Dữ liệu đo từ trang gốc chỉ gửi về collector localhost.
- **Không commit** khi chưa được duyệt.
- Công cụ Bash trong môi trường này làm mất dấu `\` trong lệnh/heredoc → file có regex/backslash phải tạo bằng công cụ Write/Edit, không dùng heredoc. Không in URL có `?`.

## 1. Chuẩn bị môi trường

1. Dev server: `npm run dev` (cổng 5173). Đổi `postcss.config.js` thì **khởi động lại** server.
2. Collector đo: `Start-Process node scripts/survey/collector.mjs` (PowerShell; cổng 5199; ghi `docs/survey/raw/<tên>.json`). Tắt: kill process giữ cổng 5199.
3. Trình duyệt: tab Chrome đang ở chungdoi.com, đã nạp `scripts/survey/probe.js` + `run.js` (đưa vào bằng `javascript_tool`, tạo `window.__P`). Draft dùng để đo: lấy từ `location.pathname` (`/edit/<draftId>?template=<templateId>`). Muốn áp mẫu vào draft: "Chọn mẫu này" → "Áp dụng vào thiệp nháp".
4. CSS thiệp: `npm run css:inv` sau **mỗi lần** thêm class Tailwind/daisy mới (class chỉ được biên dịch khi đã xuất hiện trong nguồn thuộc `@source` của `src/features/invitation/styles/invitation.src.css`). Thêm file nguồn mới thì khai báo thêm `@source`.

## 2. Đo trang gốc (tạo "đáp án")

Chạy trong tab chungdoi.com qua `javascript_tool` (mỗi lệnh `await window.__P...`):

| Màn | Lệnh | Ra file |
|---|---|---|
| Bìa | `P.dumpReal(slug, id, 390, "cover")` | `<id>_dump_cover_390.json` |
| Đã mở | `P.dumpReal(slug, id, 390, "open")` (và 768, 1440) | `<id>_dump_open_<w>.json` |
| Hộp quà | `P.dumpReal(slug, id, 390, "gift")` | `..._gift_390.json` |
| RSVP | `P.dumpReal(slug, id, 390, "rsvp")` | `..._rsvp_390.json` |
| Editor | `P.dumpEditorReal(draftId, templateId, id, 390 / 768 / 1280)` | `<id>_dump_editor_<w>.json` |

- `slug` = đường dẫn mẫu (`/vi/mau-thiep/<slug>/demo`), `id` = `templateId`.
- Kiểm tra mỗi dump: số phần tử hợp lý, editor phải có **16 thẻ** (`cards`). Thiếu → bị đăng xuất/lỗi tải, đo lại.
- HTML thô của editor/thiệp (để chép markup): `docs/survey/raw/<id>_editor_html.json`; đổi sang JSX: `node scripts/survey/html2jsx.mjs <file.json> <key> [idx]`.
- Tải ảnh/nhạc tham chiếu: `node scripts/survey/fetch_assets.mjs <id>` → `public/assets/_reference/<id>/`.
- Metadata & khả năng của mẫu: `scripts/survey/survey_meta.mjs`, tóm tắt trong `docs/survey/_meta75.json`.

## 3. Đo bản local và so (vòng lặp chính)

```
node scripts/survey/local_dump.mjs <id> <cover|open|gift|rsvp|editor> <390|768|1280|1440>
node scripts/survey/diff_dump.mjs  <id> <state> <width>     # ghi docs/survey/diff-<id>-<state>-<width>.md
```

Đọc báo cáo `diff-...md`: mỗi dòng = phần tử, `local→gốc` từng thuộc tính (x,y,w,h,c,fs,lh...), kèm `[class]` của local.
Cách đọc nhanh:

- Tìm **dòng đầu tiên** lệch theo y — mọi dòng dưới nó thường chỉ là hệ quả dịch chuyển. Sửa dòng đầu rồi đo lại.
- Lệch y đúng bằng một hằng số ở nhiều dòng liên tiếp = có phần tử phía trên cao/thấp hơn; tìm chỗ đổi.
- "Chỉ gốc / chỉ local" nhiều + lệch hàng loạt thường là do ghép sai khóa, không phải lỗi thật (vd local có overlay hướng dẫn, gốc có thanh dưới chỉ hiện khi đăng nhập).
- Sửa → `npm run css:inv` (nếu thêm class) → đo lại. Lặp tới 0.

## 4. Dựng / sửa từng màn

### 4.1 Bìa + hiệu ứng mở (dùng chung, không viết lại)
- Cấu hình ở `src/features/invitation/components/covers/coverConfigs.ts` (thêm mục cho `templateId`: màu thẻ, gradient con dấu, màu ngày, ảnh trang trí, ...) và `src/features/invitation/config/giftboxConfigs.ts` (hộp quà).
- Engine: `BaseCoverCard.tsx` + `OpenTransition.tsx`. Mọi mẫu dùng chung 1 engine của trang gốc (trừ Hoa Mộc: bìa riêng). Chỉ sửa engine khi **tất cả** mẫu cùng lệch.
- Kiểm tra: `diff_dump … cover 390` = 0, `open` chuỗi mở (`scripts/survey/local_open_seq.mjs`).

### 4.2 Thiệp đã mở (khuôn chung `src/features/invitation/shell/`)
Cấu trúc:
- `InvitationShell.tsx`: dựng thiệp = `useInvitationCtx(d, set, theme)` + danh sách khối lấy từ `capabilities.json#blocks`.
- `useInvitationCtx.ts`: toàn bộ phần tính toán/trạng thái dùng chung (tên, gia đình, lịch, album, quà, lời chúc, nhạc...). Trả về `ctx` cho các khối.
- `blocks/*.tsx`: một khối = một đoạn thiệp (Backdrop, Hero, Family, Album, Banquet, Venue, Dress, Schedule, Guestbook, Gifts, Thanks, RsvpButton, RsvpDialogHost, Lightbox, MusicPlayer). Đăng ký trong `blocks/index.ts` (họ "minimalism").
- `specs/<id>/theme.json`: màu (ink, sub, muted, paper, line, accent, edge, cream) + thư mục ảnh (`assets`). Khối **không** chứa màu / đường dẫn ảnh cố định, chỉ đọc `t.ink`, `t.assets`...
- `specs/<id>/capabilities.json`: danh sách & thứ tự khối, cờ cover/gift/hero/album/countdown/layout/editor/music (schema ở `docs/clone-rules.md` mục B1).
- `specs/index.ts`: đăng ký mẫu (`getTemplateSpec(id)`, `getCapabilities(id)`). `Preview.tsx` tự dùng khuôn khi mẫu có spec.

Thêm mẫu cùng họ bố cục (minimalism: Nâu, Xanh lá, Tím, Đỏ... chỉ khác màu/ảnh):
1. Chép `specs/minimalism_brown` → `specs/<id>/`; sửa `theme.json` theo số đo trang gốc (màu chữ chính/phụ/mờ, nền giấy, viền, thư mục ảnh `public/images/themes/<slug>/`) và `capabilities.json` (id, testId, cờ).
2. Thêm 1 dòng vào `SPECS` trong `specs/index.ts`.
3. Đo & so (mục 3). Lệch còn lại → sửa token / cờ trước; chỉ khi **cấu trúc** khác mới thêm biến thể khối.

Khi cấu trúc khác (họ bố cục mới, vd song_hy / baroque / florence / boho):
- Tạo bộ khối riêng `blocks/<family>/` và một bản đồ khối mới (như `MINIMALISM_BLOCKS`), cho `InvitationShell` chọn bản đồ theo `capabilities.family`. Giữ nguyên `useInvitationCtx` và token.
- Khối mới: lấy HTML từ dump gốc (`html2jsx`), dựng JSX với class đúng, màu/ảnh đi qua `t.*`.

Nguyên tắc: không `if (templateId === ...)` trong khối; mọi khác biệt là dữ liệu trong `theme.json`/`capabilities.json` hoặc là một khối khác.
Chứng minh refactor không đổi số đo: `node scripts/cmp_dumps.mjs <thư mục mốc> <id> cover:390 open:390 open:768 open:1440 gift:390 rsvp:390` (so từng thuộc tính từng phần tử với dump local đã lưu trước khi sửa).
Ghi chú còn lại: hộp thoại RSVP dùng `BrownRsvpDialog.tsx` (khớp 18/18); dữ liệu demo ở `src/pages/Demo.tsx`.
- Kiểm tra: `diff_dump … open 390/768/1440` = 0; `node scripts/audit.mjs <id>` Δ0 ở 390/768/1440.

### 4.2b Họ bố cục mới (đã làm thử với Riviera Lam, `riviera_blue`)
Khi mẫu có cấu trúc khác (không chỉ khác màu), dựng bộ khối mới theo các bước sau. Công cụ ở `scripts/clone/`:

1. **Thu HTML thật** của thiệp đã mở: trong tab chungdoi.com, lấy `outerHTML` của `[data-showcase-root]` ở 390 và 1440 (gửi về collector, ghi `docs/survey/raw/<id>_open_html.json`). Lấy thêm `P.stepCover/stepOpened/stepGift`, `P.engineDump` (keyframes + CSS styled-jsx thật).
2. **HTML → JSX → khối**: `html2jsx.mjs` → `scripts/clone/cut_blocks.cjs <jsx> <thư mục>` tách các con trực tiếp của khung thành `NN.jsx` (đã lưu ở `docs/survey/blocks/<id>/`). `scripts/clone/compact.cjs` in dạng rút gọn (bỏ class/style) để đọc cấu trúc.
3. **Gắn dữ liệu**: viết bộ sinh như `scripts/clone/gen_riviera.cjs` (thư viện `jsxkit.cjs`: tìm phần tử theo class, thay văn bản, lặp phần tử mẫu theo mảng dữ liệu, bọc điều kiện cờ `xxxOn`). Bộ sinh cũng thay màu/ảnh bằng token `t.*` và xuất `shell/blocks/<family>/*.tsx`. Chạy lại bộ sinh khi sửa quy tắc, không sửa tay file sinh ra.
4. **Khai báo**: `shell/blocks/<family>/index.ts` (bản đồ khối), `blocksForFamily` trong `shell/blocks/index.ts`, `specs/<id>/{theme,capabilities,demo}.json`, một dòng trong `specs/index.ts`. Dữ liệu demo của gốc để trong `demo.json` (`Demo.tsx` tự gộp), không thêm `if (id === ...)`.
5. **Bìa**: chỉ cần điền `coverConfigs.ts` đúng số đo (màu, font, `rgb`, `ampFont`, ảnh nền). Dùng class tùy ý `h-[520px]` thay cho `h-130` (Tailwind v4 của gốc ≠ Tailwind v3 ngoài `.inv-root`). Hộp thoại RSVP nhận màu qua `t.ink`, `t.rsvpBtnText`.

**Bài học Riviera (áp dụng cho mọi họ mới):**
- **Ảnh `loading="lazy"`**: `html2jsx` bỏ thuộc tính `loading/decoding`; phải khôi phục (ảnh hero `eager`, ảnh trang trí phía dưới `lazy`) vì ảnh lazy chưa tải có chiều cao 0 và làm lệch cả trang.
- **Ngưỡng tải lazy phụ thuộc môi trường** nên so sánh "mới nạp" không ổn định. Dùng trạng thái `openfull` (cuộn hết trang cho ảnh tải đủ rồi về đầu): `P.dumpReal(slug, id, w, "openfull")` và `local_dump.mjs <id> openfull <w>`, rồi `diff_dump.mjs <id> openfull <w>`. Giữ `open` ở 390 để kiểm hiệu ứng nghỉ.
- **Giá trị inline theo breakpoint**: gốc đổi `fontSize` inline ở ≥768 bằng JS (tên 30→55px...). Dùng `isMd` (`useIsMd`) từ ctx; so HTML 390 với 1440 (xem script so thẻ trong lịch sử) để thấy hết các thuộc tính đổi.
- **Parallax**: gốc dịch ảnh trang trí theo cuộn có làm mượt theo thời gian, giá trị phụ thuộc lịch sử cuộn. Chưa tái tạo công thức: dùng giá trị nghỉ lúc chưa cuộn (`ctx.mix(a768, a1440)` nội suy theo bề rộng). Khối vẫn đúng bố cục, chỉ không chuyển động khi cuộn.
- **Chuỗi nhiều text node**: React gốc render `(`, nội dung, `)` thành 3 text node; khóa ghép của `dump.js` ghép theo từng node, nên cần chia đúng như gốc mới ghép được.
- **Trường editor ↔ thiệp**: kiểm bằng `editor-sync` (vd "Câu thông báo" lưu vào `announcementLine1/2`, không phải `announce`).
- **Phần tử đổi theo thời gian** (đếm ngược, hạt rơi ở bìa, ảnh lazy dưới cùng) luôn nằm trong "chỉ gốc / chỉ local"; bỏ qua có chủ đích.
- Font: gốc không nạp `Libre Baskerville`; bản local từng nạp nên chữ rộng hơn (đã bỏ khỏi `index.html`). Khi lệch bề rộng chữ hàng loạt, so danh sách font thật gốc nạp (`document.fonts`).

### 4.3 Editor (đã dùng chung cho mọi mẫu)
- Khung: `EditorPage.tsx` (wrapper `inv-root > div.min-h-screen.bg-base-200.pb-14.lg:pb-0` chứa `Header` + `main.max-w-4xl > .body`), `Header.tsx`, `EditorTopBar.tsx`.
- Thẻ: `components/v2/` — `CardV2` (vỏ thẻ), `ui2.tsx` (`Field2`, `Row2`, `Input2`, `Textarea2`, `Seg2`, `Hint2`, `Helper2`, `Toggle2`, `OutlineButton2`, `Divider2`), `BasicV2`, `HeroV2`, `AlbumV2`, `BanquetV2`, `SectionsV2` (các thẻ còn lại).
- Chỉ khác theo mẫu: thẻ ảnh đầu thiệp (Ảnh đầu thiệp / Ảnh đôi / không có), công tắc intro, vị trí thẻ album — khai báo bằng cờ capabilities (`docs/clone-rules.md` mục B).
- Thẻ mới/khác: lấy HTML thẻ từ `*_editor_html.json` (`cards[i]`), bỏ SVG để đọc cấu trúc, dựng lại **đúng class**, đo lại.
- Kiểm tra: `diff_dump … editor 390`, `768`, `1280` = 0; `node scripts/editor-sync.mjs <id>` không FAIL (sửa field → preview đổi; công tắc ẩn/hiện; hành động; tải lại còn dữ liệu).

## 5. Bẫy đã gặp (kiểm tra đầu tiên khi số đo kỳ lạ)

1. **Tailwind v3 (`tw.css`) và CSS cũ (`styles.css`, `pages.css`) đè lên `.inv-root`.** `postcss.config.js` đã thêm `:not(:where(.inv-root *))` cho `tw.css` và các class trùng tên daisy/Tailwind-v4 (`.btn .input .toggle .card .modal .textarea .divider .dropdown`…). Class cũ mới đặt tên trùng mà chưa bị loại → thêm vào lúc tính danh sách trùng hoặc sửa rule cũ bằng `:not(.inv-root *)`.
2. **`.space-y-*` cũ cộng dồn** (`styles.css` ~dòng 2062) → khoảng cách gấp đôi. Đã loại trong `.inv-root`; nếu thấy chênh đúng 4/8/12px sau một `<p>` hay phần tử `space-y`, kiểm tra margin tính toán (`getComputedStyle`).
3. **`<dialog class="modal">` ẩn ở gốc là phần tử cùng cấp** → `space-y-*` vẫn cộng margin-bottom cho phần tử đứng trước nó (thẻ Hộp quà: +12px). Thêm `<dialog className="modal" />` rỗng cùng chỗ.
4. **Class chỉ có tác dụng bên trong `.inv-root`** và **không áp lên chính phần tử `inv-root`**: luôn bọc `<div className="inv-root"><div className="navbar …">`.
5. **Class Tailwind mới không có tác dụng** → chưa chạy `npm run css:inv`, hoặc file chứa nó ngoài `@source`.
6. **Rule `!important` cũ theo `data-bot-screenshot-id`/class** (vd margin của nút "Phương thức khác") → tìm bằng `grep` trong `src/styles/*.css`, xóa.
7. **Style inline làm `md:` không chạy** (vd width cố định 390).
8. Tailwind v4 dùng thuộc tính riêng `rotate`/`translate`/`scale` → `transform` tính toán là `none`; so bằng `getBoundingClientRect`, không bằng `transform`.
9. **Màu oklch**: dump chuẩn hóa màu qua canvas; so sánh theo giá trị đã chuẩn hóa.
10. **Font**: `ChungDoiIndic`, `Gotham/Montserrat` (h1–h6), `EB Garamond`, `Lora`; kiểm tra `ff` trong báo cáo.
11. Overlay hướng dẫn (`TutorialTour`) chỉ có ở local → nằm trong "chỉ local"; bỏ qua.
12. `rounded-full` đo ra `3.35544e+07px` ở gốc ↔ `9999px` ở local: nằm trong allowlist.

## 6. Hồi quy sau mỗi mẫu/đợt sửa

```
npx tsc --noEmit -p .
npm run css:inv
for s in cover open gift rsvp: node scripts/survey/local_dump.mjs minimalism_brown $s 390 && node scripts/survey/diff_dump.mjs minimalism_brown $s 390
node scripts/audit.mjs minimalism_brown
node scripts/editor-sync.mjs minimalism_brown
node scripts/phase6_all.mjs        # quét 75 mẫu (lâu)
npm run build
```

Mẫu Nâu phải **giữ nguyên số đo** (open: 3 phần tử coverflow ảnh ngang là tồn đọng đã biết; editor: 1 phần tử hoa trang trí ở thẻ chia sẻ).

## 7. Tiêu chí hoàn tất 1 mẫu

- [ ] bìa 0 lệch ở 390 (và 768/1440 nếu có số đo)
- [ ] chuỗi mở thiệp khớp (`local_open_seq`)
- [ ] đã mở: 0 lệch hình học ở 390 / 768 / 1440; `audit.mjs` Δ0
- [ ] hộp quà + RSVP: 0 lệch
- [ ] editor: 0 lệch ở 390 / 768 / 1280; `editor-sync` không FAIL
- [ ] hồi quy mẫu Nâu không đổi; `tsc` + `build` sạch
- [ ] báo cáo `docs/survey/diff-<id>-*.md` đính kèm; ghi mục tồn đọng (nếu có) vào `docs/clone-plan.md`
- [ ] chưa commit — xin duyệt, rồi tách commit: (a) CSS nền, (b) component mẫu + demo, (c) editor, (d) docs + scripts, (e) `.gitignore` (không đưa `_reference/`, `.chrome_profile`, ảnh chụp màn hình)

## 8. Việc chưa làm (ảnh hưởng playbook)

- Khuôn chung có **hai họ bố cục** (minimalism: Nâu; riviera: Riviera Lam) và **hai mẫu**. Họ khác (song_hy, baroque, florence, boho) cần bộ khối riêng khi clone mẫu đầu tiên của họ đó. Mục 4.2b là quy trình đã dùng cho Riviera.
- Editor chưa đọc `getCapabilities(templateId)` (còn hiển thị đủ 16 thẻ cho mọi mẫu); cần nối khi làm mẫu có thẻ khác (rule B2).
- `music` mặc định trong `capabilities.json` chỉ là dữ liệu; chưa nối với `MusicPlayer`.
- Ảnh đo editor thanh dưới trên mobile (chỉ hiện khi đăng nhập) và trạng thái RSVP "cảm ơn" chưa đo — bỏ qua theo yêu cầu.
