# Form điền thông tin (editor) — phân loại 88 mẫu trên trang thật

Đo ngày 01/11/2026 trên chungdoi.com, dùng 1 thiệp nháp (`/edit/<draftId>?template=<id>`), chuyển mẫu bằng router phía client (`history.pushState` + `popstate`, không tải lại trang) để tránh gửi nhiều request HTML/Cloudflare — đã đối chiếu cách này cho kết quả giống hệt khi tải lại trang đầy đủ (kiểm bằng `navigate` thật cho `royal_blue`, và bằng luồng "Chọn mẫu này → Áp dụng vào thiệp nháp" đầy đủ cho `lien_hoa_v2_green`).

Với mỗi mẫu trong 88 mẫu, lấy toàn bộ text của `<main>` (danh sách thẻ, nhãn, trạng thái Hiện/Ẩn mặc định, các lựa chọn như kiểu hiển thị album, định dạng giờ...) rồi so độ dài + hash.

## Kết quả

**Cả 88/88 mẫu cho ra đúng 1 chữ ký giống hệt nhau** (2850 ký tự, hash `-764889978`) — **không có mẫu nào khác biệt**, kể cả khi so các mẫu khác hẳn nhau về phong cách (Minimalism, Long Phụng V4, Song Long, Chibi, Mandap, Qasr, Riviera, Liên Hoa V2...).

Nghĩa là: **form điền thông tin trên trang thật dùng chung 100% cho mọi mẫu** — không có thẻ/nhãn/trạng thái mặc định nào thay đổi theo `templateId`. Mẫu chỉ đổi giao diện hiển thị (theme/cover/khối thiệp), không đổi cấu trúc form chỉnh sửa.

→ Ghi chú trong `clone-playbook.md` mục 4.3 ("Editor chưa đọc `getCapabilities(templateId)`, còn hiển thị đủ 16 thẻ cho mọi mẫu") **không phải thiếu sót của bản local** — đó là hành vi đúng của trang gốc. Không cần làm editor khác nhau theo mẫu/họ; chỉ cần 1 bộ editor dùng chung (đã có).

Phần khác biệt thật sự giữa các mẫu nằm ở **thiệp đã mở** (theme màu, ảnh, khối, hiệu ứng) — không nằm ở editor.

## Phương pháp (để tái lặp)

```js
// Chạy trong tab đã mở /edit/<draftId>?template=<bất kỳ id nào trong 88>
const ids = [/* 88 id từ src/features/templates/data/templates.ts */];
function fp(s){let h=0; for(let i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))|0;} return h;}
const out = {};
for (const id of ids) {
  history.pushState(null, '', location.pathname + '?template=' + id);
  window.dispatchEvent(new PopStateEvent('popstate'));
  await new Promise(r => setTimeout(r, 450));
  const t = document.querySelector('main').innerText;
  out[id] = t.length + ':' + fp(t);
}
```

## Số mẫu trên trang thật (xác nhận lại)

`/vi/mau-thiep` hiện liệt kê đúng **88 mẫu** (đếm `img[alt]` khác "Chung Đôi" trên trang danh sách) — khớp với 88 mẫu trong `src/features/templates/data/templates.ts` ở local, không có mẫu mới/mất mẫu nào kể từ lần khảo sát trước.
