import fs from "fs";

const items = [
  "jasmine_white",
  "marble_yellow",
  "elegant_leaf_green",
  "chibi_red",
  "applique_lace_white",
  "silk_flora_brown",
  "hoa_tinh_red",
  "sunflower_yellow",
  "santorini_blue",
  "folk_floral_blue",
  "hoa_dai_pink",
];

for (const id of items) {
  const html = fs.readFileSync(`docs/survey/raw/${id}_demo_outer.html`, "utf8");
  const m = [...html.matchAll(/\/images\/themes\/([^"\/]+)/g)].map(x => x[1]);
  console.log(id, "-->", [...new Set(m)]);
}
