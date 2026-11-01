import { fetchAndDumpTemplates } from "./batch_fetch_and_dump.mjs";

const batch2 = [
  { id: "dragon_phoenix_v3_red", slug: "long-phung-v3-do" },
  { id: "dragon_phoenix_v2_red", slug: "long-phung-v2-do" },
  { id: "double_phoenix_red", slug: "song-phung-do" },
  { id: "double_phoenix_green", slug: "song-phung-xanh" },
  { id: "song_hac_red", slug: "song-hac-do" },
  { id: "nhat_binh_red", slug: "nhat-binh-do" },
  { id: "co_ba_red", slug: "co-ba-do" },
];

await fetchAndDumpTemplates(batch2, { headless: false });
