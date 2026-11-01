import fs from "fs";

// Parse danh sách mẫu bằng regex an toàn
const content = fs.readFileSync("web/src/features/templates/data/templates.ts", "utf8");
const re = /\{\s*"slug":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g;
let m;
const templates = [];
while ((m = re.exec(content))) {
  templates.push({ slug: m[1], id: m[2], name: m[3] });
}

console.log("Total templates in TEMPLATES array:", templates.length);

const specsContent = fs.readFileSync("web/src/features/invitation/shell/specs/index.ts", "utf8");
const specMatches = specsContent.matchAll(/^\s*([a-z0-9_]+):\s*\{\s*id:\s*"([^"]+)"/gm);
const specs = [];
for (const sm of specMatches) specs.push(sm[2]);

console.log("Total specs implemented:", specs.length);
console.log("Implemented specs:", specs);

const unimplemented = templates.filter(t => !specs.includes(t.id));
console.log("Remaining templates to implement (" + unimplemented.length + "):");
unimplemented.forEach((t, i) => {
  console.log(`${i + 1}. [${t.id}] ${t.name} (slug: ${t.slug})`);
});
