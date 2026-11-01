import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/minimalism_red_demo_outer.html", "utf8");
const containerMatch = html.match(/<div[^>]*data-testid="[^"]+"[^>]*>[\s\r\n]*<div[^>]*>/);
const start = containerMatch.index + containerMatch[0].length;
let depth = 1, cursor = start, children = [], childStart = cursor, tagMatch;
const tagRe = /<\/?([a-zA-Z0-9-]+)(\s+[^>]*)?>/g;
tagRe.lastIndex = cursor;
while ((tagMatch = tagRe.exec(html)) !== null) {
  const full = tagMatch[0], tag = tagMatch[1].toLowerCase();
  const isClosing = full.startsWith("</");
  const isSelf = full.endsWith("/>") || ["img","input","br","hr"].includes(tag);
  if (depth === 1 && !isClosing) childStart = tagMatch.index;
  if (!isClosing && !isSelf) depth++;
  else if (isClosing) {
    depth--;
    if (depth === 1) children.push(html.slice(childStart, tagMatch.index + full.length));
    else if (depth === 0) break;
  }
}
const nonStyle = children.filter(c => !c.startsWith("<style"));
console.log("Child [3] text:\n", nonStyle[3].replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
console.log("\nChild [6] text:\n", nonStyle[6].replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
