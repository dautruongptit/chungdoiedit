import { execSync } from "child_process";

const batch5_part1 = [
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

for (const id of batch5_part1) {
  console.log(`\n========================================`);
  console.log(`VERIFYING ${id}`);
  console.log(`========================================`);
  try {
    execSync(`node web/scripts/survey/local_dump.mjs ${id} open 390`, { stdio: "inherit" });
    execSync(`node web/scripts/survey/diff_dump.mjs ${id} open 390`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Verification failed for ${id}:`, e.message);
  }
}
