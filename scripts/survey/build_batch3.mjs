import { buildTemplate } from "./auto_build_template.mjs";

const batch3 = [
  { id: "silk_ribbon_green", family: "silk_ribbon_green", slug: "to-duyen-xanh" },
  { id: "silk_ribbon_darkred", family: "silk_ribbon_darkred", slug: "to-duyen-do-dam" },
  { id: "silk_ribbon_pink", family: "silk_ribbon_pink", slug: "to-duyen-hong" },
  { id: "glass_garden_green", family: "glass_garden_green", slug: "vuonkinh-xanh" },
  { id: "glass_garden_pink", family: "glass_garden_pink", slug: "vuonkinh-hong" },
  { id: "glass_garden_light_green", family: "glass_garden_light_green", slug: "vuonkinh-xanh-nhat" },
  { id: "glass_garden_blue", family: "glass_garden_blue", slug: "vuonkinh-lam" },
  { id: "cherry_blossom_pink", family: "cherry_blossom_pink", slug: "anh-dao-hong" },
  { id: "lien_hoa_pink", family: "lien_hoa_pink", slug: "lien-hoa-hong" },
  { id: "dried_flower_v2_green", family: "dried_flower_v2_green", slug: "hoa-kho-v2-xanh" },
  { id: "hoa_kho_v2_blue", family: "hoa_kho_v2_blue", slug: "hoa-kho-v2-lam" },
];

for (const it of batch3) {
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
