import fs from "fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: false });
  await c.newPage();
  await c.setViewport({ width: 1280, height: 800 });

  const draftId = "f93f6583-3b2f-42db-a768-4dd4346f509e";
  console.log("Using draft ID:", draftId);

  // Khảo sát 12 mẫu đại diện các dòng thiết kế khác nhau
  const sampleTemplates = [
    { id: "minimalism_darkred", name: "Minimalism - Đỏ Đậm" },
    { id: "minimalism_brown", name: "Minimalism - Nâu" },
    { id: "song_hy_green", name: "Song Hỷ - Xanh" },
    { id: "boho_floral_green", name: "Hoa Mộc - Xanh" },
    { id: "double_dragon_red", name: "Song Long - Đỏ" },
    { id: "dragon_phoenix_v4_red", name: "Long Phụng V4 - Đỏ" },
    { id: "lien_hoa_v2_green", name: "Liên Hoa V2 - Xanh" },
    { id: "baroque_v2_darkgreen", name: "Baroque V2 - Xanh Đậm" },
    { id: "chibi_red", name: "Chibi - Đỏ" },
    { id: "mandap_darkred", name: "Mandap - Đỏ Đậm" },
    { id: "co_ba_red", name: "Cô Ba - Đỏ" },
    { id: "crystal_floral_green", name: "Pha Lê Hoa - Xanh" }
  ];

  const results = {};

  for (const item of sampleTemplates) {
    const editUrl = `https://chungdoi.com/edit/${draftId}?template=${item.id}`;
    console.log(`\nNavigating to [${item.id}] ${item.name}...`);
    await c.navigate(editUrl, 10000);
    
    // Chờ bypass Cloudflare nếu có
    for (let i = 0; i < 10; i++) {
      const title = await c.eval("document.title");
      if (!title.includes("Just a moment") && title.length > 0) break;
      await new Promise(r => setTimeout(r, 1000));
    }
    await new Promise(r => setTimeout(r, 2500));

    const data = await c.eval(`(()=>{
      const main = document.querySelector('main') || document.body;
      const text = main.innerText;

      // Danh sách các thẻ lớn trong editor (nhìn thấy bằng mắt người dùng)
      // Thông thường là các khối có tiêu đề đậm hoặc toggle Hiện/Ẩn
      const sections = [];
      
      const hasHeroPhoto = text.includes('Ảnh đầu thiệp');
      const hasCoupleHero = text.includes('Ảnh đôi') || text.includes('Ảnh cặp đôi');
      const hasFamily = text.includes('Thông tin gia đình');
      const hasNotice = text.includes('Lời thông báo');
      const hasCeremony = text.includes('Lễ vu quy') || text.includes('Lễ thành hôn') || text.includes('Thêm lễ');
      const hasAlbum = text.includes('Thư viện ảnh');
      const hasParty = text.includes('Tiệc cưới') || text.includes('Tiệc báo hỷ');
      const hasRsvp = text.includes('Xác nhận tham dự');
      const hasDress = text.includes('Trang phục dự tiệc') || text.includes('Dress code');
      const hasSchedule = text.includes('Lịch trình ngày cưới') || text.includes('Lịch trình');
      const hasGuestbook = text.includes('Sổ lưu bút');
      const hasGifts = text.includes('Hộp quà mừng') || text.includes('Mừng cưới');
      const hasThanks = text.includes('Lời cảm ơn');
      const hasMusic = text.includes('Nhạc nền');
      const hasCover = text.includes('Bìa thiệp');

      // Vị trí của Thư viện ảnh
      const posHero = text.indexOf('Ảnh đầu thiệp') !== -1 ? text.indexOf('Ảnh đầu thiệp') : text.indexOf('Ảnh đôi');
      const posCeremony = text.indexOf('Thêm lễ') !== -1 ? text.indexOf('Thêm lễ') : text.indexOf('Lễ');
      const posAlbum = text.indexOf('Thư viện ảnh');
      let albumAfter = 'none';
      if (posAlbum !== -1) {
        if (posCeremony !== -1 && posAlbum > posCeremony) albumAfter = 'ceremony';
        else if (posHero !== -1 && posAlbum > posHero) albumAfter = 'hero';
      }

      return {
        hasHeroPhoto,
        hasCoupleHero,
        hasFamily,
        hasNotice,
        hasCeremony,
        hasAlbum,
        albumAfter,
        hasParty,
        hasRsvp,
        hasDress,
        hasSchedule,
        hasGuestbook,
        hasGifts,
        hasThanks,
        hasMusic,
        hasCover,
        textLen: text.length
      };
    })()`);

    results[item.id] = data;
    console.log(`[${item.id}] Sections:`, data);
  }

  fs.mkdirSync("docs/survey/raw", { recursive: true });
  fs.writeFileSync("docs/survey/raw/editor_matrix_survey.json", JSON.stringify(results, null, 2));
  console.log("\nFinished survey! Saved to docs/survey/raw/editor_matrix_survey.json");

} catch (e) {
  console.error("Survey Error:", e);
} finally {
  await c.close();
}
