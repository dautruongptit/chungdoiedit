import fs from "fs";

const dump = JSON.parse(fs.readFileSync("docs/survey/raw/minimalism_green_dump_open_390.json", "utf8"));
console.log("Dump summary:", dump.vw, dump.rootW, dump.rootH, dump.n);

// Find colors
const colors = new Set();
dump.recs.forEach(r => {
  if (r.c) colors.add(r.c);
  if (r.bg) colors.add(r.bg);
});
console.log("Colors in dump:", [...colors].slice(0, 20));

// Find text elements
const texts = dump.recs.filter(r => r.kind === "text").map(r => r.k);
console.log("Total text nodes:", texts.length);
console.log("Sample texts:", texts.slice(0, 15));
