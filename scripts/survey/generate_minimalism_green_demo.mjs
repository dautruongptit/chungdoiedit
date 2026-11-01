import fs from "fs";

const dump = JSON.parse(fs.readFileSync("docs/survey/raw/minimalism_green_dump_open_390.json", "utf8"));
const html = fs.readFileSync("docs/survey/raw/minimalism_green_demo_outer.html", "utf8");

// Extract photos
const photoMatches = [...html.matchAll(/src="(https:\/\/assets\.chungdoi\.com\/photo-library\/design\/[^"]+)"/g)].map(m => m[1]);
const photos = [...new Set(photoMatches)];
console.log("Photos extracted:", photos.length);

const demoData = {
  "_note": "Dữ liệu demo của Minimalism Xanh (minimalism_green) đo từ chungdoi.com ngày 2026-11-01.",
  "order": "groom",
  "groomNick": "Đăng Khoa",
  "brideNick": "Mỹ Duyên",
  "groomFull": "Trần Đăng Khoa",
  "brideFull": "Nguyễn Mỹ Duyên",
  "groomOrder": "Trưởng Nam",
  "brideOrder": "Út Nữ",
  "heroOn": true,
  "albumOn": true,
  "photos": photos.slice(2), // first 2 are polaroids
  "groomPhoto": photos[0] || "",
  "bridePhoto": photos[1] || "",
  "familyOn": true,
  "groomFamTitle": "Ông Bà",
  "brideFamTitle": "Ông Bà",
  "groomFather": "Trần Văn Hùng",
  "groomMother": "Lê Thị Hoa",
  "groomAddress": "Tổ dân phố 3A, thị trấn Eakar, huyện Eakar, tỉnh Đắk Lắk",
  "brideFather": "Nguyễn Văn Nam",
  "brideMother": "Phạm Thị Lan",
  "brideAddress": "Khối 2, thị xã Buôn Hồ, tỉnh Đắk Lắk",
  "announceOn": true,
  "announcementLine1": "TRÂN TRỌNG BÁO TIN",
  "announcementLine2": "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI",
  "ceremonyLocation": "TƯ GIA",
  "ceremonyTime": "09:00",
  "ceremonyDayOfWeek": "THỨ BẢY",
  "ceremonyDay": 18,
  "ceremonyMonth": 7,
  "ceremonyYear": 2026,
  "ceremonyLunar": "( Tức ngày 5 tháng 6 năm Bính Ngọ)",
  "partyOn": true,
  "banquetTime": "18:00",
  "banquetDayOfWeek": "THỨ BẢY",
  "banquetDay": 18,
  "banquetMonth": 7,
  "banquetYear": 2026,
  "banquetLunar": "( Tức ngày 5 tháng 6 năm Bính Ngọ)",
  "countdownText": "CÙNG ĐẾM NGƯỢC THỜI GIAN",
  "receptionTime": "16:00",
  "feastTime": "18:00",
  "date": "2026-07-18",
  "locTitle": "Riverside Palace",
  "locAddress": "Riverside Palace, 360 Bến Vân Đồn, Quận 4, TP. Hồ Chí Minh",
  "mapIframe": "https://www.google.com/maps/embed/v1/place?key=AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg&q=Riverside%20Palace%2C%20360%20B%E1%BA%BFn%20V%C3%A2n%20%C4%90%E1%BB%93n%2C%20Qu%E1%BA%ADn%204%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh",
  "wishes": [
    {
      "name": "Minh Tuấn",
      "msg": "Chúc mừng hạnh phúc hai bạn! Chúc hai bạn trăm năm gắn kết, cùng nhau xây đắp mái ấm tràn ngập niềm vui!",
      "at": "18:31:14 9/7/2026"
    }
  ],
  "gifts": []
};

fs.writeFileSync("web/src/features/invitation/shell/specs/minimalism_green/demo.json", JSON.stringify(demoData, null, 2));
console.log("Saved minimalism_green demo.json");
