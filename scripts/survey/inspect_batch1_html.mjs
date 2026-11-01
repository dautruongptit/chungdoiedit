import fs from "fs";

for (const id of ["minimalism_darkbrown", "minimalism_darkblue", "minimalism_red"]) {
  const html = fs.readFileSync(`docs/survey/raw/${id}_demo_outer.html`, "utf8");
  const dump = JSON.parse(fs.readFileSync(`docs/survey/raw/${id}_dump_open_390.json`, "utf8"));
  console.log(id, "html len:", html.length, "dump nodes:", dump.n, "root:", dump.rootW, "x", dump.rootH);
}
