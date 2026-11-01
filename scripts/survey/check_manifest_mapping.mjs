import fs from "fs";

const manifestContent = fs.readFileSync("web/src/features/templates/data/themeManifest.ts", "utf8");
const tplFoldersMatch = manifestContent.match(/export const TEMPLATE_THEME_FOLDERS: Record<string, string\[\]> = (\{[\s\S]*?\n\};)/);
let templateThemeFolders = {};
if (tplFoldersMatch) {
  try {
    eval("templateThemeFolders = " + tplFoldersMatch[1]);
  } catch (e) {
    console.error("eval error:", e);
  }
}

const specsContent = fs.readFileSync("web/src/features/invitation/shell/specs/index.ts", "utf8");
const specIds = new Set([...specsContent.matchAll(/([a-z0-9_]+):\s*\{\s*id:\s*"([^"]+)"/g)].map(m => m[2]));

const tplContent = fs.readFileSync("web/src/features/templates/data/templates.ts", "utf8");
const allTemplates = [...tplContent.matchAll(/"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)].map(m => ({ slug: m[1], id: m[2], name: m[3] }));

const missing = allTemplates.filter(t => !specIds.has(t.id));

console.log("TemplateThemeFolders check for 58 missing:\n");
let count = 0;
for (const m of missing) {
  const folders = templateThemeFolders[m.id];
  if (folders && folders.length > 0) {
    count++;
    console.log(`[MAP] ${m.id} -> ${folders.join(", ")}`);
  } else {
    console.log(`[NO MAP] ${m.id}`);
  }
}
console.log(`\nMapped in themeManifest: ${count}/${missing.length}`);
