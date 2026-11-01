import { fetchAndDumpTemplates } from "./batch_fetch_and_dump.mjs";

const batch4 = [
  { id: "chateau_green", slug: "lau-dai-xanh" },
  { id: "chateau_blue", slug: "lau-dai-lam" },
  { id: "royal_red", slug: "hoang-kim-do" },
  { id: "royal_green", slug: "hoang-kim-xanh" },
  { id: "royal_blue", slug: "hoang-kim-lam" },
  { id: "royal_v2_green", slug: "hoang-kim-ii-xanh" },
  { id: "royal_v2_purple", slug: "hoang-kim-ii-tim" },
  { id: "baroque_gold", slug: "hoang-gia-vang" },
  { id: "baroque_blue", slug: "baroque-lam" },
  { id: "porcelain_brown", slug: "bach-su-nau" },
  { id: "porcelain_blue", slug: "bach-su-lam" },
  { id: "porcelain_red", slug: "bach-su-do" },
  { id: "florence_brown", slug: "florence-nau" },
];

await fetchAndDumpTemplates(batch4, { headless: false });
