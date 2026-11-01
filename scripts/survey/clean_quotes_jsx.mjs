import fs from "fs";

const dir = "web/src/features/invitation/shell/blocks/minimalism_green";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".tsx"));

for (const f of files) {
  const p = `${dir}/${f}`;
  let content = fs.readFileSync(p, "utf8");
  // Replace unescaped quotes inside classNames
  let updated = content
    .replace(/className="([^"]*)\\"([^"]*)\\"([^"]*)"/g, 'className="$1&quot;$2&quot;$3"')
    .replace(/\\"Times New Roman\\"/g, '&quot;Times New Roman&quot;')
    .replace(/\\"The Nautigal\\"/g, '&quot;The Nautigal&quot;')
    .replace(/\\"Cormorant Garamond\\"/g, '&quot;Cormorant Garamond&quot;');

  if (updated !== content) {
    fs.writeFileSync(p, updated);
    console.log(`Cleaned unescaped quotes in ${f}`);
  }
}
