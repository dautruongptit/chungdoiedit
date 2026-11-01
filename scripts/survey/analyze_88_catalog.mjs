import fs from "fs";

const content = fs.readFileSync("web/src/features/templates/data/templates.ts", "utf8");
const matches = [...content.matchAll(/"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
console.log("Total templates in TEMPLATES:", matches.length);

const specsContent = fs.readFileSync("web/src/features/invitation/shell/specs/index.ts", "utf8");
const specIds = new Set([...specsContent.matchAll(/([a-z0-9_]+):\s*\{\s*id:\s*"([^"]+)"/g)].map(m => m[2]));

// Group by name prefix
const families = {};
for (const [_, slug, id, name] of matches) {
  const baseName = name.split(" - ")[0];
  if (!families[baseName]) families[baseName] = [];
  families[baseName].push({ slug, id, name, done: specIds.has(id) });
}

console.log("Total families:", Object.keys(families).length);
console.log("-----------------------------------------");
let totalDone = 0;
for (const [fName, list] of Object.entries(families)) {
  const doneCount = list.filter(x => x.done).length;
  totalDone += doneCount;
  console.log(`- ${fName} (${doneCount}/${list.length}): ${list.map(x => (x.done ? "✅ " : "⏳ ") + x.id).join(", ")}`);
}
console.log("-----------------------------------------");
console.log(`Summary: ${totalDone}/88 done (${Object.keys(families).length} families)`);
