import { buildTemplate } from "./auto_build_template.mjs";

const items = [
  {
    id: "minimalism_darkbrown",
    family: "minimalism_darkbrown",
    slug: "minimalism-nau-dam",
    htmlPath: "docs/survey/raw/minimalism_darkbrown_demo_outer.html",
    dumpPath: "docs/survey/raw/minimalism_darkbrown_dump_open_390.json"
  },
  {
    id: "minimalism_darkblue",
    family: "minimalism_darkblue",
    slug: "minimalism-lam-dam",
    htmlPath: "docs/survey/raw/minimalism_darkblue_demo_outer.html",
    dumpPath: "docs/survey/raw/minimalism_darkblue_dump_open_390.json"
  },
  {
    id: "minimalism_red",
    family: "minimalism_red",
    slug: "minimalism-do",
    htmlPath: "docs/survey/raw/minimalism_red_demo_outer.html",
    dumpPath: "docs/survey/raw/minimalism_red_dump_open_390.json"
  }
];

for (const it of items) {
  try {
    buildTemplate(it);
  } catch (err) {
    console.error(`Error building ${it.id}:`, err);
  }
}
