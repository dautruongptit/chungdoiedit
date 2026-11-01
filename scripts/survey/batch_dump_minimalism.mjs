import { execSync } from "child_process";

const remaining = [
  { id: "minimalism_darkbrown", slug: "minimalism-nau-dam" },
  { id: "minimalism_darkblue", slug: "minimalism-lam-dam" },
  { id: "minimalism_red", slug: "minimalism-do" },
];

for (const t of remaining) {
  console.log(`\n=== DUMPING ${t.id} (${t.slug}) ===`);
  try {
    execSync(`node web/scripts/survey/dump_real_direct.mjs ${t.id} ${t.slug} 390 open`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Error dumping ${t.id}:`, e.message);
  }
}
