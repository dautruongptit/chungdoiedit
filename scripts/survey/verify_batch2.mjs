import { execSync } from "child_process";

const batch2 = [
  "dragon_phoenix_v3_red",
  "dragon_phoenix_v2_red",
  "double_phoenix_red",
  "double_phoenix_green",
  "song_hac_red",
  "nhat_binh_red",
  "co_ba_red",
];

for (const id of batch2) {
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
