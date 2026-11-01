import { execSync } from "child_process";

const batch4 = [
  "chateau_green",
  "chateau_blue",
  "royal_red",
  "royal_green",
  "royal_blue",
  "royal_v2_green",
  "royal_v2_purple",
  "baroque_gold",
  "baroque_blue",
  "porcelain_brown",
  "porcelain_blue",
  "porcelain_red",
  "florence_brown",
];

for (const id of batch4) {
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
