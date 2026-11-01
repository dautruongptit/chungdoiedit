import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/minimalism_green_demo_outer.html", "utf8");

// Check classes and structure
const hasEnvelope = html.includes("envelope.webp");
const hasPolaroid = html.includes("envelope-cut.webp");
console.log("hasEnvelope:", hasEnvelope, "hasPolaroid:", hasPolaroid);

// Let's find all section tags
const sectionMatches = [...html.matchAll(/<(header|section|footer)\b([^>]*)>/g)];
console.log("Total sections found:", sectionMatches.length);
sectionMatches.forEach((m, i) => {
  console.log(`[${i}] <${m[1]}> attrs: ${m[2].slice(0, 100)}`);
});
