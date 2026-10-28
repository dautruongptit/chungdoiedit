// Tóm tắt dữ liệu thô docs/survey/raw cho các mẫu: node scripts/survey/summarize.mjs <templateId>...
import fs from "node:fs";
const R = (id, n) => { try { return JSON.parse(fs.readFileSync(`docs/survey/raw/${id}_${n}.json`, "utf8")); } catch { return null; } };
for (const id of process.argv.slice(2)) {
  const o = R(id, "open390"), c = R(id, "cover390"), s = R(id, "openSeq"), g = R(id, "gift");
  console.log("=====", id);
  console.log("headings:", o.features.headings.join(" | "));
  console.log("audio:", JSON.stringify(o.features.audio), "iframes:", JSON.stringify(o.features.iframes), "countdown:", o.features.countdown, "rsvpInline:", o.features.rsvpInline, "forms:", JSON.stringify(o.features.forms).slice(0, 200));
  console.log("buttons:", o.features.buttons.join(" | ").slice(0, 400));
  console.log("libs:", JSON.stringify(o.motion.libs), "hints:", o.motion.classHints, "dataAos:", o.motion.dataAos, "scripts:", o.motion.scripts.length);
  console.log("keyframes:", Object.keys(o.motion.keyframes).join(","));
  console.log("scrollFx:", o.scrollFx.total, o.scrollFx.changed, JSON.stringify(o.scrollFx.sample.slice(0, 3)));
  console.log("fonts:", o.styles.fonts.join("; ").slice(0, 300));
  console.log("cover kids:", c.layout.kids.map((k) => k.sel.slice(0, 22) + ":" + k.h).join(" ; ").slice(0, 400));
  console.log("openSeq:", (s.anims || []).map((a) => `${a.at}ms ${a.name}(${Math.round(a.dur)}ms d${Math.round(a.delay || 0)} ${String(a.ease).slice(0, 14)})`).join(" -> ").slice(0, 900));
  console.log("dom:", (s.dom || []).slice(0, 8).map((d) => d.at + d.op + ":" + d.el.slice(0, 20)).join(" "));
  console.log("gift:", g && g.dialog && g.dialog.text.slice(0, 160), g && g.anims.map((a) => a.name + ":" + Math.round(a.dur)).join(","));
  console.log("images:", o.styles.images.length, "bg:", o.styles.bgImages.length);
}
