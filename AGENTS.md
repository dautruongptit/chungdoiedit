# Bàn giao cho agent khác (Antigravity / Codex / người)

Dự án: **clone giao diện thiệp cưới chungdoi.com sang bản chạy localhost**, khớp từng px (hình học + kiểu) theo từng mẫu. Ngôn ngữ làm việc với chủ dự án: tiếng Việt.

## 1. Việc đang làm
- Nhánh `fix/clone-match`. Đã đạt: **minimalism_brown** (Nâu), **riviera_blue** (Riviera - Lam) và **dragon_phoenix_v4_red** (Long Phụng V4 - Đỏ) ở bìa, thiệp đã mở, hộp quà, RSVP; editor đã dựng theo markup gốc (16 thẻ) và khớp mẫu Nâu ở 390/768/1280.
- Còn lại (xem `docs/clone-playbook.md` mục 8): đo editor thật của Riviera; parallax khi cuộn của Riviera; nối `getCapabilities()` vào editor; 71 mẫu chưa clone (đang đi đường `Preview.tsx` cũ, lệch lớn).
- Đọc theo thứ tự: `docs/clone-playbook.md` (quy trình) → `docs/clone-rules.md` (rule, capabilities) → `docs/clone-plan-88.md` (kế hoạch 88 mẫu, thay `clone-plan.md` cũ) → `docs/brown-fix-plan.md` (ví dụ làm hết một mẫu).

## 2. Kiến trúc cần biết
- Stack: React 18 + Vite 5 + TypeScript; router tự viết; dữ liệu thiệp ở localStorage (`Inv` trong `src/types/invitation.ts`).
- **Khuôn thiệp đã mở** `src/features/invitation/shell/`: `InvitationShell` + `useInvitationCtx` + `blocks/<họ>/*` + `specs/<id>/{theme,capabilities,demo}.json` + `specs/index.ts` (đăng ký). `Preview.tsx` tự dùng khuôn khi mẫu có spec. Không viết `if (templateId === ...)` trong khối.
- **CSS thiệp/editor** theo trang gốc (Tailwind v4 + daisyUI v5) biên dịch riêng, cô lập trong `.inv-root`: nguồn `src/features/invitation/styles/invitation.src.css` → `npm run css:inv` → `invitation.generated.css` (gitignore). **Chạy lại `css:inv` mỗi khi thêm class Tailwind mới.** Phần còn lại của app dùng Tailwind v3 + CSS cũ (`src/styles/*.css`); `postcss.config.js` loại các luật cũ trùng tên khỏi `.inv-root`.
- Bìa/mở thiệp: engine chung `src/features/invitation/components/covers/` (`coverConfigs.ts` theo mẫu). Editor: `src/features/editor/` (`components/v2/*` là markup gốc).

## 3. Lệnh
```
npm install
npm run dev            # tự chạy css:inv rồi vite (cổng 5173)
npx tsc --noEmit -p .  # kiểm kiểu
npm run build
node scripts/survey/local_dump.mjs <id> <cover|open|openfull|gift|rsvp|editor> <390|768|1280|1440>
node scripts/survey/diff_dump.mjs  <id> <state> <width>     # ghi docs/survey/diff-<id>-<state>-<width>.md
node scripts/cmp_dumps.mjs <thư mục mốc> <id> open:390 ...   # chứng minh refactor không đổi số đo
node scripts/editor-sync.mjs <id>   # sửa field → xem trước đổi; bật/tắt; tải lại giữ dữ liệu
node scripts/audit.mjs <id>
node scripts/clone/gen_riviera.cjs      # sinh lại block Riviera từ docs/survey/blocks/riviera_blue
node scripts/clone/gen_traditional.cjs  # sinh lại block họ traditional (Long Phụng V4) — dùng scripts/clone/genkit.cjs
```
Tiêu chí đạt một màn: lệch hình học **0** (dung sai 1px) và lệch kiểu 0, trừ phần tử đổi theo thời gian (đếm ngược, hạt rơi, ảnh lazy ở cuối trang). Mẫu Nâu không được đổi số đo (kiểm bằng `cmp_dumps`).

## 4. Đo trang gốc (cần trình duyệt)
- Chạy collector: `node scripts/survey/collector.mjs` (cổng 5199, ghi `docs/survey/raw/<tên>.json`).
- Trong một tab Chrome đang mở chungdoi.com, nạp `scripts/survey/probe.js`, `run.js` (đã có sẵn `P.dumpReal`, `P.dumpEditorReal`, `P.stepCover/stepOpened/stepGift`, `P.engineDump`), rồi gọi ví dụ `await P.dumpReal("riviera-lam","riviera_blue",390,"open")`. Với nhiều mẫu/độ rộng, mỗi lệnh phải xong dưới ~45 giây.
- Chrome có thể hỏi quyền truy cập mạng nội bộ cho localhost khi gửi dữ liệu lần đầu: chọn Cho phép.

## 5. Quy tắc cứng (đừng vi phạm)
- Số đo phải **đo thật** từ trang gốc, không đoán.
- **Không** nhập mật khẩu / tạo tài khoản / gửi form trên trang gốc; không vượt Cloudflare; ít request. Áp mẫu vào bản nháp tài khoản của chủ dự án (để đo editor) là thao tác thay đổi tài khoản: **hỏi chủ dự án trước**.
- Ảnh/nhạc bản quyền của trang gốc chỉ để ở `public/assets/_reference/` (gitignore, chỉ localhost). Không đưa khóa API, mã tài khoản, email thật vào repo (dump thô đã che `AIzaSy_REDACTED`, `cdc-REDACTED`).
- **Không commit/push khi chưa được chủ dự án duyệt.** Commit chia theo nhóm (xem lịch sử).
- Sửa tay không phải cách làm với file sinh: `blocks/riviera/*`, `blocks/traditional/*` do `scripts/clone/gen_*.cjs` sinh; sửa bộ sinh rồi chạy lại.

## 6. Bẫy đã gặp
1. Công cụ shell có thể làm mất dấu `\` trong lệnh/heredoc (regex hỏng) → tạo file chứa backslash bằng công cụ ghi file, không dùng heredoc.
2. Vite có thể cache bản rỗng của một file vừa ghi → khởi động lại dev server.
3. Class Tailwind v4 (vd `h-130`) không có ngoài `.inv-root` → dùng dạng tùy ý `h-[520px]`.
4. CSS cũ cộng dồn (`.space-y-*`, rule `!important` theo `data-bot-screenshot-id`) → xem playbook mục 5.
5. Ảnh `loading="lazy"` có chiều cao 0 khi chưa tải → so sánh bằng trạng thái `openfull`.
6. `npm run css:inv` dò Tailwind v4 theo phiên bản vì vị trí trong `node_modules` đổi theo máy; nếu báo không thấy, chạy `npm install`.
7. Font: gốc không nạp Libre Baskerville; thêm font vào `index.html` làm chữ rộng hơn gốc.
