# Editor ↔ xem trước — boho_floral_green

Bản local, 2026-10-25. **24 đạt, 15 lỗi, 10 bỏ qua.**

| Thẻ | Kiểm tra | Kết quả | Ghi chú |
|---|---|---|---|
| (cấu trúc) | Số thẻ local = gốc | pass | local 16 / gốc 16 |
| (cấu trúc) | Không thiếu thẻ so với gốc | FAIL | ảnh đôi |
| (cấu trúc) | Không thừa thẻ so với gốc | FAIL | ảnh đầu thiệp |
| (cấu trúc) | Thứ tự thẻ khớp gốc | FAIL | gốc: Thông tin cơ bản > Ảnh đôi > Thông tin gia đình > Lời thông báo > Lễ > Thư viện ảnh > Tiệc cưới > Xác nhận tham dự (RSVP) > Dress Code > Lịch trình ngày cưới > Sổ lưu bút > Hộp Quà Mừng > Lời cảm ơn > Nhạc nền > Phong bì > Ảnh xem trước khi chia sẻ |
| Thông tin cơ bản | Sửa "Họ tên chú rể" -> xem trước | pass | Phạm Quang Huy |
| Thông tin cơ bản | Sửa "Họ tên cô dâu" -> xem trước | pass | Đỗ Minh Anh |
| Thông tin cơ bản | Sửa "Tên ngắn chú rể" -> xem trước | pass | Quang Huy |
| Thông tin cơ bản | Sửa "Tên ngắn cô dâu" -> xem trước | pass | Minh Anh |
| Thông tin gia đình | Sửa "Địa chỉ nhà trai" -> xem trước | pass | Số 9 Phố Kiểm Thử |
| Lời thông báo | Sửa "Câu thông báo" -> xem trước | FAIL | KÍNH BÁO KIỂM THỬ |
| Lễ | Sửa "Tiêu đề mục" -> xem trước | FAIL | LỄ KIỂM THỬ |
| Tiệc cưới | Sửa "Tiêu đề mục" -> xem trước | FAIL | TIỆC KIỂM THỬ |
| Tiệc cưới | Sửa "Tiêu đề mục địa điểm" -> xem trước | pass | ĐỊA ĐIỂM KIỂM THỬ |
| Tiệc cưới | Sửa "Địa chỉ" -> xem trước | pass | 99 Đường Kiểm Thử, Quận 1 |
| Lời cảm ơn | Sửa "Lời cảm ơn" -> xem trước | FAIL | Cảm ơn kiểm thử |
| Tiệc cưới | Đổi ngày 13/02/2027 -> xem trước | FAIL |  |
| Tiệc cưới | Đổi giờ 17:30 -> xem trước | pass |  |
| Thư viện ảnh | Tắt -> khối biến mất | FAIL |  |
| Thư viện ảnh | Bật lại -> khối quay về | pass |  |
| Thông tin gia đình | Công tắc ẩn/hiện | skip | khối không hiện sẵn khi thiệp trống (cần dữ liệu trước, vd chưa có tài khoản quà) — so với gốc |
| Lời thông báo | Công tắc ẩn/hiện | skip | khối không hiện sẵn khi thiệp trống (cần dữ liệu trước, vd chưa có tài khoản quà) — so với gốc |
| Tiệc cưới | Công tắc ẩn/hiện | skip | khối không hiện sẵn khi thiệp trống (cần dữ liệu trước, vd chưa có tài khoản quà) — so với gốc |
| Xác nhận tham dự | Tắt -> khối biến mất | FAIL |  |
| Xác nhận tham dự | Bật lại -> khối quay về | pass |  |
| Dress Code | Bật -> khối hiện trong xem trước | pass |  |
| Dress Code | Tắt lại -> khối biến mất | FAIL |  |
| Lịch trình ngày cưới | Bật -> khối hiện trong xem trước | pass |  |
| Lịch trình ngày cưới | Tắt lại -> khối biến mất | FAIL |  |
| Sổ lưu bút | Tắt -> khối biến mất | FAIL |  |
| Sổ lưu bút | Bật lại -> khối quay về | pass |  |
| Hộp Quà Mừng | Tắt -> khối biến mất | FAIL |  |
| Hộp Quà Mừng | Bật lại -> khối quay về | pass |  |
| Lời cảm ơn | Công tắc ẩn/hiện | skip | khối không hiện sẵn khi thiệp trống (cần dữ liệu trước, vd chưa có tài khoản quà) — so với gốc |
| (thứ tự khối) | Thứ tự tiêu đề khối tăng dần sau tắt/bật | pass | THÔNG TIN LỄ CƯỚI > ALBUM ẢNH > THÔNG TIN TIỆC CƯỚI > DRESS CODE > LỊCH TRÌNH > SỔ LƯU BÚT > HỘP QUÀ |
| Lễ | Thêm lễ -> xuất hiện thêm khối lễ | FAIL | 1 -> 1 |
| Thư viện ảnh | Kiểu album "3D" -> xem trước vẫn dựng được | pass |  |
| Thư viện ảnh | Kiểu album "Lưới" -> xem trước vẫn dựng được | pass |  |
| Thư viện ảnh | Kiểu album "Ghép ảnh" -> xem trước vẫn dựng được | pass |  |
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
