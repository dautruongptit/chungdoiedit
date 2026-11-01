import { execSync } from "child_process";

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
