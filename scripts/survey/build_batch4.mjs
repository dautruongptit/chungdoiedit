import { buildTemplate } from "./auto_build_template.mjs";

const batch4 = [
  { id: "chateau_green", family: "chateau_green", slug: "lau-dai-xanh" },
  { id: "chateau_blue", family: "chateau_blue", slug: "lau-dai-lam" },
  { id: "royal_red", family: "royal_red", slug: "hoang-kim-do" },
  { id: "royal_green", family: "royal_green", slug: "hoang-kim-xanh" },
  { id: "royal_blue", family: "royal_blue", slug: "hoang-kim-lam" },
  { id: "royal_v2_green", family: "royal_v2_green", slug: "hoang-kim-ii-xanh" },
  { id: "royal_v2_purple", family: "royal_v2_purple", slug: "hoang-kim-ii-tim" },
  { id: "baroque_gold", family: "baroque_gold", slug: "hoang-gia-vang" },
  { id: "baroque_blue", family: "baroque_blue", slug: "baroque-lam" },
  { id: "porcelain_brown", family: "porcelain_brown", slug: "bach-su-nau" },
  { id: "porcelain_blue", family: "porcelain_blue", slug: "bach-su-lam" },
  { id: "porcelain_red", family: "porcelain_red", slug: "bach-su-do" },
  { id: "florence_brown", family: "florence_brown", slug: "florence-nau" },
];

for (const it of batch4) {
  try {
    buildTemplate({
      ...it,
      htmlPath: `docs/survey/raw/${it.id}_demo_outer.html`,
      dumpPath: `docs/survey/raw/${it.id}_dump_open_390.json`
    });
  } catch (err) {
    console.error(`Error building ${it.id}:`, err);
  }
}
