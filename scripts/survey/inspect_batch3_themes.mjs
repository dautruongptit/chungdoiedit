import fs from "fs";

const batch3 = [
  "silk_ribbon_green",
  "silk_ribbon_darkred",
  "silk_ribbon_pink",
  "glass_garden_green",
  "glass_garden_pink",
  "glass_garden_light_green",
  "glass_garden_blue",
  "cherry_blossom_pink",
  "lien_hoa_pink",
  "dried_flower_v2_green",
  "hoa_kho_v2_blue",
];

for (const id of batch3) {
  const html = fs.readFileSync(`docs/survey/raw/${id}_demo_outer.html`, "utf8");
  const m = [...html.matchAll(/\/images\/themes\/([^"\/]+)/g)].map(x => x[1]);
  console.log(id, "-->", [...new Set(m)]);
}
