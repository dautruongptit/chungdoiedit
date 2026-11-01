import fs from "fs";

for (const id of ["minimalism_red", "minimalism_darkblue"]) {
  const html = fs.readFileSync(`docs/survey/raw/${id}_demo_outer.html`, "utf8");
  const headerMatch = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/);
  console.log(`=== ${id} HEADER ===`);
  if (headerMatch) {
    console.log(headerMatch[0].slice(0, 400) + "...\n");
  }
}
