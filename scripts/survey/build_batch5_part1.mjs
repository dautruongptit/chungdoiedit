import { buildTemplate } from "./auto_build_template.mjs";

const batch5_part1 = [
  { id: "jasmine_white", family: "jasmine_white", slug: "mai-lan-trang" },
  { id: "marble_yellow", family: "marble_yellow", slug: "cam-thach-vang" },
  { id: "elegant_leaf_green", family: "elegant_leaf_green", slug: "thanh-diep-xanh" },
  { id: "chibi_red", family: "chibi_red", slug: "chibi-red" },
  { id: "applique_lace_white", family: "applique_lace_white", slug: "ren-theu-trang" },
  { id: "silk_flora_brown", family: "silk_flora_brown", slug: "hoa-lua-nau" },
  { id: "hoa_tinh_red", family: "hoa_tinh_red", slug: "hoa-tinh-do" },
  { id: "sunflower_yellow", family: "sunflower_yellow", slug: "hoa-huong-duong" },
  { id: "santorini_blue", family: "santorini_blue", slug: "santorini-lam" },
  { id: "folk_floral_blue", family: "folk_floral_blue", slug: "hoa-mau-lam" },
  { id: "hoa_dai_pink", family: "hoa_dai_pink", slug: "hoa-dai-hong" },
];

for (const it of batch5_part1) {
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
