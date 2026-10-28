// Liệt kê các thẻ + field của editor LOCAL cho một mẫu (để viết/kiểm tra editor-sync). Dùng: node scripts/survey/local_cards.mjs <templateId>
import { ChromeController } from "../cdp_helper.mjs";

const id = process.argv[2];
if (!id) { console.error("thiếu <templateId>"); process.exit(1); }
const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
await c.setViewport({ width: 1280, height: 900 });
await c.navigate(`http://localhost:5173/edit/dump-${id}?template=${id}`, 5000);
const expr = `JSON.stringify([...document.querySelectorAll('section.card')].map((s) => {
  const t = s.querySelector('h3').textContent.trim();
  const f = [...s.querySelectorAll('.field')].map((f) => {
    const l = ((f.querySelector('.lbl') || {}).textContent || '').trim();
    const i = [...f.querySelectorAll('input,textarea,select')].map((x) => x.tagName[0] + (x.type && x.tagName === 'INPUT' ? ':' + x.type : '') + '/' + (x.placeholder || x.value || '').slice(0, 18)).join(',');
    return l + '=' + i;
  }).join(' | ');
  const b = [...s.querySelectorAll('button')].map((b) => b.textContent.trim() || b.getAttribute('aria-label') || '').filter(Boolean).slice(0, 8).join(',');
  return t + (s.querySelector('[role=switch]') ? ' [T]' : '') + ' F: ' + f.slice(0, 380) + ' B: ' + b;
}))`;
const r = await c.eval(expr);
console.log(JSON.parse(r).join("\n"));
process.exit(0);
