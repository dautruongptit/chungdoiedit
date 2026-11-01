import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/song_hy_v2_red_demo_outer.html", "utf8");
const imgMatches = [...html.matchAll(/(?:src|href)="([^"]*(?:themes|envelope|design)[^"]*)"/g)].map(m => m[1]);
console.log(`\n=== song_hy_v2_red assets (found ${imgMatches.length}) ===`);
const unique = [...new Set(imgMatches)];
console.log(unique);
