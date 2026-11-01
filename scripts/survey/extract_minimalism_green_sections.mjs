import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/minimalism_green_demo_outer.html", "utf8");

// Parse main sections
const rootMatch = html.match(/<div[^>]*data-testid="minimalism-green-template"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*$/) || html.match(/<div[^>]*class="st-card[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*$/);

console.log("Template outer len:", html.length);
// Print all direct children of the inner container
const matches = [...html.matchAll(/<(header|section|footer)\b([\s\S]*?)<\/\1>/g)];
console.log("Sections count:", matches.length);
matches.forEach((m, i) => {
  const tag = m[1];
  const body = m[0];
  const firstLine = body.slice(0, body.indexOf(">") + 1);
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 70);
  console.log(`[${i}] <${tag}>: ${firstLine}`);
  console.log(`    text: "${text}" (len: ${body.length})`);
});
