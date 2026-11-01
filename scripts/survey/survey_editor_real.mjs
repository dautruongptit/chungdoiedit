import fs from "fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: false });
  await c.newPage();
  await c.setViewport({ width: 1280, height: 800 });

  console.log("Navigating to template listing: https://chungdoi.com/vi/mau-thiep ...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep", 12000);
  
  // Chờ bypass Cloudflare
  for (let i = 0; i < 15; i++) {
    const title = await c.eval("document.title");
    console.log(`[${i}s] title: ${title}`);
    if (!title.includes("Just a moment") && title.length > 0) break;
    await new Promise((r) => setTimeout(r, 1000));
  }
  await new Promise((r) => setTimeout(r, 3000));

  // Kiểm tra danh sách mẫu trên trang /vi/mau-thiep
  const listInfo = await c.eval(`(()=>{
    const cards = Array.from(document.querySelectorAll('a[href*="/vi/mau-thiep/"]'));
    return {
      totalLinks: cards.length,
      sampleLinks: cards.slice(0, 10).map(a => ({ href: a.href, text: a.innerText.replace(/\\n/g, ' ') }))
    };
  })()`);
  console.log("Template listing info:", JSON.stringify(listInfo, null, 2));

  // Bấm vào mẫu liên hoa v2 xanh: https://chungdoi.com/vi/mau-thiep/lien-hoa-v2-xanh
  console.log("Navigating to lien-hoa-v2-xanh page...");
  await c.navigate("https://chungdoi.com/vi/mau-thiep/lien-hoa-v2-xanh", 8000);
  await new Promise(r => setTimeout(r, 2000));

  // Khảo sát các nút hành động trên trang chi tiết mẫu
  const detailButtons = await c.eval(`(()=>{
    const buttons = Array.from(document.querySelectorAll('button, a')).filter(el => {
      const t = el.innerText || '';
      return t.includes('Tạo') || t.includes('Dùng') || t.includes('Xem') || t.includes('Sử dụng') || t.includes('Demo') || t.includes('demo');
    });
    return buttons.map(b => ({ tag: b.tagName, text: (b.innerText || '').trim(), href: b.href }));
  })()`);
  console.log("Detail action buttons:", detailButtons);

  // Tìm nút tạo thiệp / dùng mẫu này
  const useBtn = detailButtons.find(b => b.text.includes('Tạo') || b.text.includes('Dùng') || b.text.includes('Sử dụng'));
  if (useBtn && useBtn.href) {
    console.log("Navigating to editor URL via href:", useBtn.href);
    await c.navigate(useBtn.href, 10000);
  } else {
    // Thử click nút
    console.log("Clicking 'Dùng mẫu này' / 'Tạo thiệp' button...");
    await c.eval(`(()=>{
      const btn = [...document.querySelectorAll('button, a')].find(el => {
        const t = el.innerText || '';
        return t.includes('Tạo') || t.includes('Dùng') || t.includes('Sử dụng');
      });
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 4000));
  }

  // Khảo sát trang Editor
  const currentUrl = await c.eval("location.href");
  console.log("Current URL after click:", currentUrl);

  const editorInfo = await c.eval(`(()=>{
    // Khảo sát toàn bộ các section / card / accordions trong editor
    const main = document.querySelector('main') || document.body;
    // Tìm các headings / title của các nhóm form
    const sections = [];
    // Tìm các thẻ card hoặc accordion
    const cards = document.querySelectorAll('.card, [class*="card"], [class*="section"], [class*="collapse"], [class*="accordion"]');
    
    // Tìm tất cả các tiêu đề h2, h3, h4 trong form
    const headings = Array.from(main.querySelectorAll('h1, h2, h3, h4, h5, button, summary')).map(h => ({
      tag: h.tagName,
      text: (h.innerText || '').trim(),
      cls: h.className
    })).filter(h => h.text.length > 0 && h.text.length < 50);

    // Lấy toàn bộ text của editor
    const fullText = main.innerText;

    // Lấy danh sách các input, select, textarea, file upload
    const inputs = Array.from(main.querySelectorAll('input, select, textarea')).map(inp => ({
      tag: inp.tagName,
      type: inp.type,
      name: inp.name,
      id: inp.id,
      placeholder: inp.placeholder,
      value: inp.value ? inp.value.slice(0, 30) : ''
    }));

    return {
      title: document.title,
      url: location.href,
      fullTextPreview: fullText.slice(0, 1500),
      headings: headings.slice(0, 40),
      inputsCount: inputs.length,
      sampleInputs: inputs.slice(0, 30)
    };
  })()`);

  console.log("Editor Info:", JSON.stringify(editorInfo, null, 2));
  fs.writeFileSync("docs/survey/raw/real_editor_survey.json", JSON.stringify(editorInfo, null, 2));

} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
