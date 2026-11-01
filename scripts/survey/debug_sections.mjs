import fs from "fs";

export function debugSections(id) {
  const html = fs.readFileSync(`docs/survey/raw/${id}_demo_outer.html`, "utf8");
  const containerMatch = html.match(/<div[^>]*data-testid="[^"]+"[^>]*>[\s\r\n]*<div[^>]*>/) ||
                         html.match(/<div[^>]*class="[^"]*st-card[^"]*"[^>]*>[\s\r\n]*<div[^>]*>/) ||
                         html.match(/<div[^>]*class="[^"]*flex w-full justify-center[^"]*"[^>]*>[\s\r\n]*<div[^>]*>/);
  if (!containerMatch) {
    console.log("No container found for", id);
    return;
  }
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
  console.log(`\n=== Sections for ${id} (total non-style: ${nonStyle.length}) ===`);
  nonStyle.forEach((c, i) => {
    const txt = c.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
    console.log(`[${i}] ${c.slice(0, 25).padEnd(25)} -> ${txt}`);
  });
}

debugSections("minimalism_red");
