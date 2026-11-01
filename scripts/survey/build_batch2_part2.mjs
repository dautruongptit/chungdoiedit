import { buildTemplate } from "./auto_build_template.mjs";

const items = [
  { id: "song_hac_red", family: "song_hac_red", slug: "song-hac-do" },
  { id: "nhat_binh_red", family: "nhat_binh_red", slug: "nhat-binh-do" },
  { id: "co_ba_red", family: "co_ba_red", slug: "co-ba-do" },
];

for (const it of items) {
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
