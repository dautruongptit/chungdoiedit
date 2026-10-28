# Chọn mẫu khảo sát

Mục tiêu: chọn 4 mẫu (+ Nâu làm chuẩn) KHÁC NHAU nhất để rút bộ rule chung cho 75 mẫu.

## Căn cứ chọn
Bảng meta 75 mẫu (`docs/survey/_meta75.json`, sinh bằng `scripts/survey/survey_meta.mjs` từ mã local — chỉ là **phỏng đoán ban đầu**, bản gốc có thể chia nhóm khác):

| Thuộc tính (theo mã local) | Phân bố trong 75 mẫu |
|---|---|
| Họ màn bìa (`COVER_REGISTRY`) | 31 loại; lớn nhất: Baroque/Porcelain 21 mẫu, Floral Bouquet 7, Minimalism 5, Architectural 3, Glass Garden 3 |
| Hộp quà | 38 phong bì / 37 hộp 3D |
| Hạt nền | petal 52, xi 17, blossom 3, confetti 2, heart 1 |
| Con dấu bìa | heart 57, xi 17, none 1 |

## Mẫu đã chọn

| Mẫu | Vai trò | Vì sao khác các mẫu còn lại |
|---|---|---|
| `minimalism_brown` (Nâu) | **Chuẩn** (đã clone) | Khối giấy + polaroid; hộp quà 3D; bìa hạt rơi; album có bộ đếm; không đếm ngược; khung nội dung rộng ra 900px |
| `song_hy_red` (Song Hỷ - Đỏ) | Truyền thống | Họ bìa Song Hỷ; hạt `xi` bay **lên**; con dấu 囍; tiêu đề khối tách thành hàng riêng (54/68px); album có chấm điều hướng; **cột nội dung cố định** ở ≥768px; nhạc khác |
| `baroque_v2_darkred` (Baroque V2 - Đỏ Đậm) | Họ lớn nhất (21 mẫu) | Khung mạ vàng/damask; **hộp quà phong bì** (ienv*); không có chuyển động "hộp bay"; có đếm ngược; album chấm điều hướng; nhiều font trang trí |
| `florence_brown` (Florence - Nâu) | Tranh màu nước/kiến trúc | **Không có thẻ "Ảnh đầu thiệp"** trong editor (15 thẻ); trang rất dài và **giãn theo chiều rộng** (8203→8746); trang trí đổi vị trí khi cuộn (parallax); có đếm ngược; hạt `blossom` |
| `boho_floral_green` (Hoa Mộc - Xanh) | Hoa/boho, đã có thành phần riêng | Thẻ "**Ảnh đôi**" thay "Ảnh đầu thiệp"; header hai ảnh xiên; ~28 lớp trang trí; hộp 3D; bố cục cố định ở ≥768; phông chữ khác hẳn |

## Độ phủ
- Hộp quà: 3D ×3 (brown, song_hy, boho), phong bì ×2 (baroque, florence).
- Hạt: rơi (brown, baroque, florence, boho) và bay lên (song_hy).
- Bố cục ≥768px: rộng ra có đệm (brown), cố định (song_hy, boho), giãn mạnh (florence, baroque).
- Editor: bộ thẻ đủ 16 (brown, song_hy, baroque), thiếu thẻ ảnh đầu (florence), thẻ ảnh đôi (boho); thứ tự thẻ Album khác nhau (brown: sau ảnh đầu; còn lại: sau "Lễ").

## Điều chưa bao phủ (rủi ro chọn mẫu)
- Mẫu không có hạt/không có con dấu (`seal none`), hạt confetti/heart.
- Các mẫu có bìa kiểu phong bì **thật** (không phải thẻ) — 4/5 mẫu đo đều dùng cùng khung thẻ; có thể mẫu khác khác.
- Mẫu thiệp song ngữ (Anh/Trung) và mẫu có mục thêm (ví dụ "Phong bì" có nhiều biến thể).
