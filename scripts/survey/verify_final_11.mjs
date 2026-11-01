import { execSync } from "child_process";

const final11 = [
  "qasr_blue",
  "san_miguel_yellow",
  "hoa_kho_orange",
  "mahal_gold",
  "floral_fiesta_yellow",
  "nomad_brown",
  "saraya_gold",
  "qasr_gold",
  "qasr_green",
  "mandap_darkred",
  "brocade_flower_red",
];

for (const id of final11) {
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
