import fs from "fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: false });
  await c.newPage();
  await c.setViewport({ width: 1280, height: 900 });

  const url = "https://chungdoi.com/edit/f93f6583-3b2f-42db-a768-4dd4346f509e?template=lien_hoa_v2_green";
  console.log("Navigating to real editor:", url);
  await c.navigate(url, 10000);
  
  for (let i = 0; i < 10; i++) {
    const title = await c.eval("document.title");
    if (!title.includes("Just a moment") && title.length > 0) break;
    await new Promise(r => setTimeout(r, 1000));
  }
  await new Promise(r => setTimeout(r, 2000));

  // Trích xuất toàn diện từng thẻ trong editor
  const fullForm = await c.eval(`(()=>{
    const main = document.querySelector('main') || document.body;
    
    // Tìm các container thẻ cấp 1
    // Trên daisyUI / Tailwind thường là các div có border hoặc bg-base-100 hoặc card
    const formCards = [];

    // Tìm tất cả các element có thể là tiêu đề section
    const nodes = Array.from(main.querySelectorAll('*'));
    
    // Thu thập cấu trúc theo text và inputs
    const sections = [];
    let currentSection = { title: "Thông tin cơ bản", items: [] };

    // Duyệt qua cây DOM của form editor bên trái
    const formRoot = document.querySelector('main > div, main form, [class*="max-w-xl"]') || main;

    // Lấy toàn bộ HTML của form editor (bên trái, không gồm phần preview bên phải)
    // Preview nằm trong iframe hoặc div cố định bên phải
    let leftPane = document.querySelector('main > div:first-child') || document.querySelector('main');

    // Thu thập tất cả các label, input, button, toggle
    const fields = [];
    main.querySelectorAll('label, input, select, textarea, button').forEach(el => {
      const tag = el.tagName.toLowerCase();
      if (tag === 'label') {
        const text = (el.innerText || '').trim().replace(/\\n/g, ' ');
        if (text) fields.push({ type: 'label', text });
      } else if (tag === 'input') {
        fields.push({
          type: 'input',
          inputType: el.type,
          name: el.name,
          placeholder: el.placeholder,
          value: el.type === 'checkbox' ? el.checked : el.value,
          checked: el.checked
        });
      } else if (tag === 'select') {
        const options = Array.from(el.options).map(o => ({ value: o.value, text: o.text, selected: o.selected }));
        fields.push({ type: 'select', name: el.name, options });
      } else if (tag === 'textarea') {
        fields.push({ type: 'textarea', name: el.name, placeholder: el.placeholder, value: el.value });
      } else if (tag === 'button') {
        const text = (el.innerText || '').trim();
        if (text && text.length < 40) fields.push({ type: 'button', text });
      }
    });

    return {
      title: document.title,
      formText: main.innerText,
      fields
    };
  })()`);

  console.log("Extracted full form text length:", fullForm.formText.length);
  fs.writeFileSync("docs/survey/raw/real_common_form_full.json", JSON.stringify(fullForm, null, 2));
  fs.writeFileSync("docs/survey/raw/real_common_form_text.txt", fullForm.formText);
  console.log("Saved full form data to docs/survey/raw/real_common_form_full.json and .txt");

} catch (e) {
  console.error("Error:", e);
} finally {
  await c.close();
}
