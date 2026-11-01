import { fetchAndDumpTemplates } from "./batch_fetch_and_dump.mjs";

const batch3 = [
  { id: "silk_ribbon_green", slug: "to-duyen-xanh" },
  { id: "silk_ribbon_darkred", slug: "to-duyen-do-dam" },
  { id: "silk_ribbon_pink", slug: "to-duyen-hong" },
  { id: "glass_garden_green", slug: "vuonkinh-xanh" },
  { id: "glass_garden_pink", slug: "vuonkinh-hong" },
  { id: "glass_garden_light_green", slug: "vuonkinh-xanh-nhat" },
  { id: "glass_garden_blue", slug: "vuonkinh-lam" },
  { id: "cherry_blossom_pink", slug: "anh-dao-hong" },
  { id: "lien_hoa_pink", slug: "lien-hoa-hong" },
  { id: "dried_flower_v2_green", slug: "hoa-kho-v2-xanh" },
  { id: "hoa_kho_v2_blue", slug: "hoa-kho-v2-lam" },
];

await fetchAndDumpTemplates(batch3, { headless: false });
