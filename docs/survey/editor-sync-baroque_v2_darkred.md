# Editor ↔ xem trước — baroque_v2_darkred

Bản local, 2026-10-25. **35 đạt, 6 lỗi, 9 bỏ qua.**

| Thẻ | Kiểm tra | Kết quả | Ghi chú |
|---|---|---|---|
| (cấu trúc) | Số thẻ local = gốc | pass | local 16 / gốc 16 |
| (cấu trúc) | Không thiếu thẻ so với gốc | pass |  |
| (cấu trúc) | Không thừa thẻ so với gốc | pass |  |
| (cấu trúc) | Thứ tự thẻ khớp gốc | FAIL | gốc: Thông tin cơ bản > Ảnh đầu thiệp > Thông tin gia đình > Lời thông báo > Lễ > Thư viện ảnh > Tiệc cưới > Xác nhận tham dự (RSVP) > Dress Code > Lịch trình ngày cưới > Sổ lưu bút > Hộp Quà Mừng > Lời cảm ơn > Nhạc nền > Phong bì > Ảnh xem trước khi chia sẻ |
| Thông tin cơ bản | Sửa "Họ tên chú rể" -> xem trước | pass | Phạm Quang Huy |
| Thông tin cơ bản | Sửa "Họ tên cô dâu" -> xem trước | pass | Đỗ Minh Anh |
| Thông tin cơ bản | Sửa "Tên ngắn chú rể" -> xem trước | pass | Quang Huy |
| Thông tin cơ bản | Sửa "Tên ngắn cô dâu" -> xem trước | pass | Minh Anh |
| Thông tin gia đình | Sửa "Địa chỉ nhà trai" -> xem trước | pass | Số 9 Phố Kiểm Thử |
| Lời thông báo | Sửa "Câu thông báo" -> xem trước | pass | KÍNH BÁO KIỂM THỬ |
| Lễ | Sửa "Tiêu đề mục" -> xem trước | pass | LỄ KIỂM THỬ |
| Tiệc cưới | Sửa "Tiêu đề mục" -> xem trước | pass | TIỆC KIỂM THỬ |
| Tiệc cưới | Sửa "Tiêu đề mục địa điểm" -> xem trước | FAIL | ĐỊA ĐIỂM KIỂM THỬ |
| Tiệc cưới | Sửa "Địa chỉ" -> xem trước | pass | 99 Đường Kiểm Thử, Quận 1 |
| Lời cảm ơn | Sửa "Lời cảm ơn" -> xem trước | pass | Cảm ơn kiểm thử |
| Tiệc cưới | Đổi ngày 13/02/2027 -> xem trước | pass |  |
| Tiệc cưới | Đổi giờ 17:30 -> xem trước | FAIL |  |
| Thư viện ảnh | Công tắc ẩn/hiện | skip | khối không hiện sẵn khi thiệp trống (cần dữ liệu trước, vd chưa có tài khoản quà) — so với gốc |
| Thông tin gia đình | Công tắc ẩn/hiện | skip | khối không hiện sẵn khi thiệp trống (cần dữ liệu trước, vd chưa có tài khoản quà) — so với gốc |
| Lời thông báo | Tắt -> khối biến mất | pass |  |
| Lời thông báo | Bật lại -> khối quay về | pass |  |
| Tiệc cưới | Tắt -> khối biến mất | pass |  |
| Tiệc cưới | Bật lại -> khối quay về | pass |  |
| Xác nhận tham dự | Tắt -> khối biến mất | pass |  |
| Xác nhận tham dự | Bật lại -> khối quay về | pass |  |
| Dress Code | Bật -> khối hiện trong xem trước | pass |  |
| Dress Code | Tắt lại -> khối biến mất | pass |  |
| Lịch trình ngày cưới | Bật -> khối hiện trong xem trước | pass |  |
| Lịch trình ngày cưới | Tắt lại -> khối biến mất | pass |  |
| Sổ lưu bút | Tắt -> khối biến mất | pass |  |
| Sổ lưu bút | Bật lại -> khối quay về | pass |  |
| Hộp Quà Mừng | Công tắc ẩn/hiện | skip | khối không hiện sẵn khi thiệp trống (cần dữ liệu trước, vd chưa có tài khoản quà) — so với gốc |
| Lời cảm ơn | Tắt -> khối biến mất | pass |  |
| Lời cảm ơn | Bật lại -> khối quay về | pass |  |
| (thứ tự khối) | Thứ tự tiêu đề khối tăng dần sau tắt/bật | pass | SỔ LƯU BÚT |
| Lễ | Thêm lễ -> xuất hiện thêm khối lễ | pass | 1 -> 2 |
| Thư viện ảnh | Kiểu album "3D" -> xem trước vẫn dựng được | FAIL |  |
| Thư viện ảnh | Kiểu album "Lưới" -> xem trước vẫn dựng được | FAIL |  |
| Thư viện ảnh | Kiểu album "Ghép ảnh" -> xem trước vẫn dựng được | FAIL |  |
| RSVP | Chọn 'Hiện trực tiếp' -> form RSVP nằm trong trang | pass | kiểm tra form inline |
| Hộp Quà Mừng | Bấm 'Thêm tài khoản' -> mở hộp thoại | pass | ok |
| Ảnh đầu thiệp | Action (thêm/đổi ảnh/nhạc/…) | skip | cần tải tệp ảnh (file picker) |
| Thư viện ảnh | Action (thêm/đổi ảnh/nhạc/…) | skip | thêm/xóa/đổi ảnh cần file picker |
| Nhạc nền | Action (thêm/đổi ảnh/nhạc/…) | skip | chọn/tải nhạc cần hộp thoại + tệp |
| Phong bì | Action (thêm/đổi ảnh/nhạc/…) | skip | chỉ hiện ở màn bìa, không có trong xem trước |
| Ảnh xem trước khi chia sẻ | Action (thêm/đổi ảnh/nhạc/…) | skip | không có phần tương ứng trong thiệp |
| Lịch trình ngày cưới | Action (thêm/đổi ảnh/nhạc/…) | skip | thêm hoạt động: field nằm trong hộp thoại riêng, chưa tự động hóa |
| (tải lại) | Họ tên chú rể còn nguyên | pass | Phạm Quang Huy |
| (tải lại) | Địa chỉ tiệc còn nguyên | pass | 99 Đường Kiểm Thử, Quận 1 |
| (tải lại) | Trạng thái công tắc Dress Code còn nguyên | pass | false |
