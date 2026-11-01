import fs from "fs";

const specsContent = fs.readFileSync("web/src/features/invitation/shell/specs/index.ts", "utf8");
const specIds = new Set([...specsContent.matchAll(/([a-z0-9_]+):\s*\{\s*id:\s*"([^"]+)"/g)].map(m => m[2]));

const tplContent = fs.readFileSync("web/src/features/templates/data/templates.ts", "utf8");
const allTemplates = [...tplContent.matchAll(/"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)].map(m => ({ slug: m[1], id: m[2], name: m[3] }));

const missing = allTemplates.filter(t => !specIds.has(t.id));

const themeFolders = fs.readdirSync("web/public/images/themes");

console.log("Checking asset folders for 58 missing templates:\n");
let foundCount = 0;
for (const m of missing) {
  // try various naming conventions: kebab-case, slug, etc.
  const kebab = m.id.replace(/_/g, "-");
  const match = themeFolders.find(f => {
    const fn = f.toLowerCase().replace(/_/g, "-");
    return fn === kebab || fn === m.slug || fn === m.id || fn.includes(kebab) || kebab.includes(fn);
  });
  if (match) {
    foundCount++;
    console.log(`[FOUND] ${m.id} -> web/public/images/themes/${match}`);
  } else {
    console.log(`[MISSING FOLDER] ${m.id} (slug: ${m.slug})`);
  }
}
console.log(`\nTotal found: ${foundCount}/${missing.length}`);
