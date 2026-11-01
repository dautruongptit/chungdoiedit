import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/minimalism_darkbrown_demo_outer.html", "utf8");
const headerMatch = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/);
if (headerMatch) {
  console.log("=== HEADER CONTENT ===");
  console.log(headerMatch[0]);
}
