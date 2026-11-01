import fs from "fs";

const specsContent = fs.readFileSync("web/src/features/invitation/shell/specs/index.ts", "utf8");
const specMatches = specsContent.matchAll(/^\s*([a-z0-9_]+):\s*\{\s*id:\s*"([^"]+)"/gm);
const specs = [];
for (const m of specMatches) specs.push(m[2]);

console.log("Total templates with spec in SPECS:", specs.length);
console.log("Specs list:", specs);

// Đọc danh sách 88 mẫu từ templates.ts
const tplContent = fs.readFileSync("web/src/features/templates/data/templates.ts", "utf8");
const tplMatches = tplContent.matchAll(/"id":\s*"([^"]+)"/g);
const allTemplates = [];
for (const m of tplMatches) {
  if (!allTemplates.includes(m[1])) allTemplates.push(m[1]);
}
console.log("Total templates in templates.ts:", allTemplates.length);

const missingSpecs = allTemplates.filter(t => !specs.includes(t));
console.log("Templates missing spec:", missingSpecs.length);
console.log("List of missing:", missingSpecs);
