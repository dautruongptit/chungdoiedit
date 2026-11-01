import { buildTemplate } from "./auto_build_template.mjs";

const items = [
  { id: "dragon_phoenix_v3_red", family: "dragon_phoenix_v3_red", slug: "long-phung-v3-do" },
  { id: "dragon_phoenix_v2_red", family: "dragon_phoenix_v2_red", slug: "long-phung-v2-do" },
  { id: "double_phoenix_red", family: "double_phoenix_red", slug: "song-phung-do" },
  { id: "double_phoenix_green", family: "double_phoenix_green", slug: "song-phung-xanh" },
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
