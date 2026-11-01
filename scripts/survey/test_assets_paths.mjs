import fs from "fs";

for (const id of ["minimalism_darkbrown", "minimalism_darkblue", "minimalism_red"]) {
  const html = fs.readFileSync(`docs/survey/raw/${id}_demo_outer.html`, "utf8");
  const imgMatches = [...html.matchAll(/(?:src|href)="([^"]*(?:themes|envelope|design)[^"]*)"/g)].map(m => m[1]);
  console.log(`\n=== ${id} assets (found ${imgMatches.length}) ===`);
  const unique = [...new Set(imgMatches)];
  console.log(unique.slice(0, 10));
}
