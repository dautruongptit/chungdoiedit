import fs from "fs";

const data = JSON.parse(fs.readFileSync("docs/survey/raw/real_common_form_full.json", "utf8"));
console.log("=== ALL INPUTS & FIELDS IN REAL EDITOR ===");
data.fields.forEach((f, i) => {
  if (f.type === "input") {
    console.log(`[${i}] INPUT (${f.inputType}) name="${f.name || ''}" placeholder="${f.placeholder || ''}" value="${f.value}"`);
  } else if (f.type === "textarea") {
    console.log(`[${i}] TEXTAREA name="${f.name || ''}" placeholder="${f.placeholder || ''}" value="${f.value || ''}"`);
  } else if (f.type === "button") {
    console.log(`[${i}] BUTTON "${f.text}"`);
  } else if (f.type === "label") {
    console.log(`[${i}] LABEL "${f.text}"`);
  }
});
