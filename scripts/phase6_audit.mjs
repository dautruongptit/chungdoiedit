// Phase 6: kiểm tra tổng hợp mẫu Nâu (không sửa gì). Ghi kết quả JSON ra docs/phase6-results.json
import fs from "node:fs";
import { ChromeController } from "./cdp_helper.mjs";

const BASE = "http://localhost:5173";
const REAL = { 390: { total: 5413, secs: [661, 894, 502, 842, 467, 194, 381, 921, 398, 76, 28] }, 768: { total: 6524 }, 1440: { total: 6544 } };
const out = { widths: {}, interactions: {}, editor: {}, covers: {} };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();

const pageHealth = async () => {
  const net = c.networkLogs.filter((n) => n.response && n.response.status >= 400).map((n) => `${n.response.status} ${n.response.url.replace(BASE, "")}`);
  const cons = c.consoleLogs.filter((m) => m.type === "error" || m.type === "warning").map((m) => `${m.type}: ${(m.args || []).map((a) => a.value || a.description || "").join(" ").slice(0, 160)}`);
  c.networkLogs.length = 0; c.consoleLogs.length = 0;
  return { net: [...new Set(net)], cons: [...new Set(cons)].slice(0, 12) };
};

const ROWS = `(() => { const h=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&/THE WEDDING OF/i.test(e.textContent)); let root=h; for(let i=0;i<10&&root;i++){ if(root.children.length>=5&&root.getBoundingClientRect().height>2500) break; root=root.parentElement; } const kids=[...root.children].filter(e=>e.tagName!=='STYLE'&&e.tagName!=='DIALOG'&&e.getBoundingClientRect().height>0).map(e=>Math.round(e.getBoundingClientRect().height)); const imgs=[...document.images]; const broken=imgs.filter(i=>i.complete&&i.naturalWidth===0&&i.src).map(i=>i.src.replace(location.origin,'')); const ov=document.documentElement.scrollWidth-document.documentElement.clientWidth; const wide=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>document.documentElement.clientWidth+2&&r.width>0&&getComputedStyle(e).position!=='fixed'}).length; return JSON.stringify({total:Math.round(root.getBoundingClientRect().height),kids,broken:[...new Set(broken)],hOverflow:ov,wideEls:wide,fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family.replace(/"/g,'')).filter((v,i,a)=>a.indexOf(v)===i)}); })()`;

for (const w of [390, 768, 1440]) {
  await c.setViewport({ width: w, height: w === 390 ? 844 : 900 });
  await c.navigate(`${BASE}/vi/mau-thiep/minimalism-nau/demo?open=1&autoscroll=0`, 6500);
  const r = JSON.parse(await c.eval(ROWS));
  const h = await pageHealth();
  out.widths[w] = { ...r, ...h, realTotal: REAL[w].total, deltaTotal: r.total - REAL[w].total };
  if (w === 390) out.widths[w].deltaSecs = REAL[390].secs.map((x, i) => (r.kids[i] ?? 0) - x);
  await c.screenshot(`docs/reference/brown_local_${w}_full_top.png`);
  // cover
  await c.navigate(`${BASE}/vi/mau-thiep/minimalism-nau/demo`, 4500);
  out.covers[w] = JSON.parse(await c.eval(`JSON.stringify({btn:!!([...document.querySelectorAll('a,button')].find(e=>/Mở thiệp/.test(e.textContent))),overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth})`));
  Object.assign(out.covers[w], await pageHealth());
}

// ----- tương tác ở 390 -----
await c.setViewport({ width: 390, height: 844 });
await c.navigate(`${BASE}/vi/mau-thiep/minimalism-nau/demo?open=1&autoscroll=0&guest=${encodeURIComponent("Anh Tuấn")}`, 6000);
const I = out.interactions;
const ev = (s) => c.eval(`(()=>{try{return JSON.stringify((${s})())}catch(e){return JSON.stringify('ERR '+e.message)}})()`).then((v) => JSON.parse(v));
I.albumNext = await ev(`()=>{const t=()=>document.body.innerText.match(/(\\d+) \\/ (\\d+)/)?.[0];const a=t();document.querySelector('button[aria-label="Next photo"]')?.click();return {before:a}}`);
await sleep(400);
I.albumAfter = await ev(`()=>[...document.querySelectorAll('span')].find(e=>/^\\d+ \\/ \\d+$/.test(e.textContent.trim()))?.textContent`);
// gửi lời chúc
I.wishBefore = await ev(`()=>document.querySelectorAll('p.leading-relaxed').length`);
await c.eval(`(()=>{const set=(el,v,P)=>{Object.getOwnPropertyDescriptor(P.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}))};set(document.querySelector('input[placeholder="Nhập tên*"]'),'Kiểm Thử',HTMLInputElement);set(document.querySelector('textarea[placeholder="Nhập lời chúc*"]'),'Chúc mừng!',HTMLTextAreaElement);return 1})()`);
await sleep(200);
await c.eval(`(()=>{[...document.querySelectorAll('button')].find(b=>/GỬI LỜI CHÚC/.test(b.textContent)).click();return 1})()`);
await sleep(500);
I.wishAfter = await ev(`()=>({n:document.querySelectorAll('p.leading-relaxed').length,first:document.querySelector('p.leading-relaxed')?.textContent,cleared:document.querySelector('input[placeholder="Nhập tên*"]').value===''})`);
// gift modal
await c.eval(`document.querySelector('button[aria-label="Mở hộp mừng cưới"]').click()`);
await sleep(600);
I.giftModal = await ev(`()=>{const d=document.querySelector('dialog.modal-open');return {open:!!d,visible:d?getComputedStyle(d).visibility:null,cards:d?d.querySelectorAll('h3').length:0}}`);
await c.eval(`document.querySelector('dialog.modal-open .modal-box button')?.click()`);
await sleep(400);
I.giftClosed = await ev(`()=>!document.querySelector('dialog.modal-open')`);
// calendar + directions links
I.links = await ev(`()=>({cal:[...document.querySelectorAll('a')].find(a=>/Thêm vào lịch/.test(a.textContent))?.href.slice(0,70),dir:[...document.querySelectorAll('a')].find(a=>/Chỉ đường/.test(a.textContent))?.href.slice(0,80)})`);
// RSVP
await c.eval(`[...document.querySelectorAll('button')].find(b=>/XÁC NHẬN THAM DỰ/.test(b.textContent))?.click()`);
await sleep(600);
I.rsvp = await ev(`()=>({modal:!!document.querySelector('.rsvp-modal-box, [class*=rsvp]')&&/tham dự/i.test(document.body.innerText)})`);
// music button
I.music = await ev(`()=>({btn:!!document.querySelector('.music-floating-btn'),audio:!!document.querySelector('audio')})`);
// ?guest
await c.navigate(`${BASE}/vi/mau-thiep/minimalism-nau/demo?guest=${encodeURIComponent("Anh Tuấn")}`, 4500);
I.guestParam = await ev(`()=>document.body.innerText.includes('Anh Tuấn')`);
Object.assign(I, { health: await pageHealth() });

// ----- editor ↔ preview -----
await c.setViewport({ width: 1280, height: 900 });
const id = "p6-" + Date.now();
const URL_E = `${BASE}/edit/${id}?template=minimalism_brown`;
await c.navigate(URL_E, 4500);
const setInput = (ph, v) => c.eval(`(()=>{const el=[...document.querySelectorAll('input,textarea')].find(i=>(i.placeholder||'').includes(${JSON.stringify(ph)}));if(!el)return 'missing';const P=el.tagName==='TEXTAREA'?HTMLTextAreaElement:HTMLInputElement;Object.getOwnPropertyDescriptor(P.prototype,'value').set.call(el,${JSON.stringify(v)});el.dispatchEvent(new Event('input',{bubbles:true}));return 'ok'})()`);
const E = out.editor;
E.fields = { groom: await setInput("Nguyễn Thế Bảo", "Phạm Quang Huy"), bride: await setInput("Trần Ngọc Ánh", "Đỗ Minh Anh") };
await sleep(400);
await c.eval(`[...document.querySelectorAll('button')].find(b=>/^Xem trước/.test(b.textContent.trim()))?.click()`);
await sleep(1500);
const txt = (await c.eval(`document.body.innerText`)) || "";
E.previewHasNames = txt.includes("Phạm Quang Huy") && txt.includes("Đỗ Minh Anh");
E.previewDefaults = { date: /THÁNG \d{2}/.test(txt), lunar: /TỨC NGÀY|Tức ngày/i.test(txt) };
E.health = await pageHealth();
await c.navigate(URL_E, 3500);
E.persistedAfterReload = await ev(`()=>[...document.querySelectorAll('input')].some(i=>i.value==='Phạm Quang Huy')`);
// 390 mobile editor overflow
await c.setViewport({ width: 390, height: 844 });
await c.navigate(URL_E, 4000);
E.mobileOverflow = await ev(`()=>document.documentElement.scrollWidth-document.documentElement.clientWidth`);
await c.screenshot("docs/reference/brown_local_390_editor.png");

fs.writeFileSync("docs/phase6-results.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
process.exit(0);
