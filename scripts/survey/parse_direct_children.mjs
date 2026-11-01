import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/minimalism_green_full_scrolled.html", "utf8");

// Find root container and its inner showcase-root div
const innerStart = html.indexOf('<div class="relative w-full max-w-[480px]');
console.log("innerStart pos:", innerStart);

// Let's parse with regex or DOM
const rootInner = innerStart !== -1 ? html.slice(innerStart) : html;

// Match direct children of the container
// Let's write a parser that counts direct child elements
let pos = 0;
// find the opening of the container
const containerMatch = html.match(/<div[^>]*data-testid="minimalism-green-template"[^>]*>[\s\r\n]*<div[^>]*>/);
if (containerMatch) {
  const containerStart = containerMatch.index + containerMatch[0].length;
  console.log("Container start:", containerStart);
  let depth = 1;
  let cursor = containerStart;
  const children = [];
  let childStart = cursor;
  let tagMatch;
  const tagRe = /<\/?([a-zA-Z0-9-]+)(\s+[^>]*)?>/g;
  tagRe.lastIndex = cursor;

  while ((tagMatch = tagRe.exec(html)) !== null) {
    const fullTag = tagMatch[0];
    const tagName = tagMatch[1].toLowerCase();
    const isClosing = fullTag.startsWith("</");
    const isSelfClosing = fullTag.endsWith("/>") || ["img", "input", "br", "hr"].includes(tagName);

    if (depth === 1 && !isClosing) {
      childStart = tagMatch.index;
    }

    if (!isClosing && !isSelfClosing) {
      depth++;
    } else if (isClosing) {
      depth--;
      if (depth === 1) {
        // finished one direct child!
        const childHtml = html.slice(childStart, tagMatch.index + fullTag.length);
        children.push({
          tag: tagName,
          fullTag: childHtml.slice(0, childHtml.indexOf(">") + 1),
          html: childHtml,
          len: childHtml.length,
          preview: childHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 80)
        });
      } else if (depth === 0) {
        break; // container closed!
      }
    } else if (isSelfClosing && depth === 1) {
      const childHtml = fullTag;
      children.push({
        tag: tagName,
        fullTag,
        html: childHtml,
        len: childHtml.length,
        preview: ""
      });
    }
  }

  console.log("Direct children of container:", children.length);
  children.forEach((c, i) => {
    console.log(`[${i}] <${c.tag}> len=${c.len}: ${c.preview}`);
  });
}
