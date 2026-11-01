import { fetchAndDumpTemplates } from "./batch_fetch_and_dump.mjs";

const batch5_part1 = [
  { id: "jasmine_white", slug: "mai-lan-trang" },
  { id: "marble_yellow", slug: "cam-thach-vang" },
  { id: "elegant_leaf_green", slug: "thanh-diep-xanh" },
  { id: "chibi_red", slug: "chibi-red" },
  { id: "applique_lace_white", slug: "ren-theu-trang" },
  { id: "silk_flora_brown", slug: "hoa-lua-nau" },
  { id: "hoa_tinh_red", slug: "hoa-tinh-do" },
  { id: "sunflower_yellow", slug: "hoa-huong-duong" },
  { id: "santorini_blue", slug: "santorini-lam" },
  { id: "folk_floral_blue", slug: "hoa-mau-lam" },
  { id: "hoa_dai_pink", slug: "hoa-dai-hong" },
];

await fetchAndDumpTemplates(batch5_part1, { headless: false });
