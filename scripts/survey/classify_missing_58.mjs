import fs from "fs";

const specsContent = fs.readFileSync("web/src/features/invitation/shell/specs/index.ts", "utf8");
const specIds = new Set([...specsContent.matchAll(/([a-z0-9_]+):\s*\{\s*id:\s*"([^"]+)"/g)].map(m => m[2]));

const tplContent = fs.readFileSync("web/src/features/templates/data/templates.ts", "utf8");
const allTemplates = [...tplContent.matchAll(/"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)].map(m => ({ slug: m[1], id: m[2], name: m[3] }));

const missing = allTemplates.filter(t => !specIds.has(t.id));

const groups = {};
for (const m of missing) {
  const fName = m.name.split(" - ")[0];
  if (!groups[fName]) groups[fName] = [];
  groups[fName].push(m);
}

console.log("Missing templates grouped by family (" + Object.keys(groups).length + " families):");
for (const [fName, list] of Object.entries(groups)) {
  console.log(`\n### ${fName} (${list.length} mẫu):`);
  list.forEach(m => console.log(`  - \`${m.id}\` | slug: \`${m.slug}\` | "${m.name}"`));
}
