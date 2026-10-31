import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1440, height: 900 });
await c.navigate("http://localhost:5173/invitations/create/minimalism-do-dam",4500);
const url = await c.eval("location.href"); const id = url.match(/edit\/([^?]+)/)[1];
const photos = ["abd329aeb24dfdb5db34be2cd39ccbe4b5b0f943f66a89f8c855b2d615cc4e24","09c78712bd94460430a8a633a8e72a0576016ea56e183d89d97c551649ee9ece","d7695e2fed94d3347e78455624c26164a088b3a365bce422de1ef752fdcab2c1"].map(h=>`/images/photo-library/design/${h}.webp`);
const run = async (patch, checks) => {
  await c.eval(`(() => { const k='chungdoi.inv.${id}'; const o=JSON.parse(localStorage.getItem(k)); Object.assign(o, ${JSON.stringify(patch)}); localStorage.setItem(k, JSON.stringify(o)); })()`);
  await c.navigate(url, 4000);
  await c.eval(`[...document.querySelectorAll('button')].find(b=>/Xem trước/.test(b.innerText)).click()`); await new Promise(r=>setTimeout(r,2500));
  const t = await c.eval(`document.body.innerText`);
  for (const [k,expect] of checks) { const has=t.includes(k); console.log((has===expect?"PASS":"FAIL"), expect?"hiện":"ẩn", JSON.stringify(k)); }
};
console.log("--- bật hết, grid"); 
await run({ groomFull:"Zed Chú", brideFull:"Yan Dâu", order:"groom", ceremonyTitle:"CT-X", banquetTitle:"BT-X", locTitle:"LT-X", address:"ADDR-X", albumOn:true, photos, albumLayout:"grid", familyOn:true, announceOn:true, countdown:true, partyOn:true, guestOn:true, rsvpOn:true, rsvpDisplay:"button" },
  [["Zed Chú",true],["Yan Dâu",true],["CT-X",true],["BT-X",true],["LT-X",true],["ADDR-X",true],["ALBUM ẢNH",true],["Còn".toUpperCase(),true],["XÁC NHẬN THAM DỰ",true],["TRÂN TRỌNG BÁO TIN",true],["Ông Bà",true]]);
console.log("--- tắt gia đình/thông báo/countdown/rsvp/tiệc/album");
await run({ familyOn:false, announceOn:false, countdown:false, rsvpOn:false, partyOn:false, albumOn:false },
  [["TRÂN TRỌNG BÁO TIN",false],["Ông Bà",false],["CÒN",false],["XÁC NHẬN THAM DỰ",false],["BT-X",false],["ALBUM ẢNH",false],["CT-X",true],["LT-X",true]]);
console.log("--- album 3d");
await run({ albumOn:true, albumLayout:"3d", partyOn:true }, [["ALBUM ẢNH",true],["BT-X",true]]);
process.exit(0);
