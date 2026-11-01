import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/minimalism_green_full_scrolled.html", "utf8");
const sections = [...html.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)].map(m => m[0]);
console.log("Total sections matched:", sections.length);
sections.forEach((s, i) => {
  const t = s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 60);
  console.log(`Section ${i}: ${t}`);
});
