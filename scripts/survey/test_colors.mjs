import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/song_hy_v2_red_demo_outer.html", "utf8");
const bgColors = [...html.matchAll(/#([0-9a-fA-F]{6})|rgb\([^)]+\)/g)].map(m => m[0]);
console.log("Colors found in song_hy_v2_red:", [...new Set(bgColors)].slice(0, 15));
