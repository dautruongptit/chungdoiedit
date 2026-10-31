import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1531, height: 1023 });
await c.navigate("http://localhost:5173/invitations/create/minimalism-do-dam",5000);
await c.eval(`(() => { const t=[...document.querySelectorAll('*')].find(e=>e.children.length===0 && (e.innerText||'').trim()==='Bản đồ'); t.scrollIntoView({block:'start'}); window.scrollBy(0,-150); })()`);
await new Promise(r=>setTimeout(r,800));
await c.screenshot(process.argv[2]+"/clone_editor_map.png");
process.exit(0);
