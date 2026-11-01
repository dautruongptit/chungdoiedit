import fs from "fs";
import path from "path";

export async function downloadMissingAssets(id) {
  const html = fs.readFileSync(`docs/survey/raw/${id}_demo_outer.html`, "utf8");
  const matches = [...html.matchAll(/(?:src|href)="(\/images\/themes\/[^"]+)"/g)].map(m => m[1]);
  const unique = [...new Set(matches)];

  let downloaded = 0;
  for (const rel of unique) {
    const localPath = path.join("web/public", rel);
    if (!fs.existsSync(localPath)) {
      const url = `https://chungdoi.com${rel}`;
      console.log(`Downloading missing asset: ${url} -> ${localPath}`);
      try {
        const res = await fetch(url);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          fs.mkdirSync(path.dirname(localPath), { recursive: true });
          fs.writeFileSync(localPath, buf);
          downloaded++;
        } else {
          console.warn(`Failed to fetch ${url}: status ${res.status}`);
        }
      } catch (e) {
        console.error(`Error downloading ${url}:`, e.message);
      }
    }
  }
  console.log(`[${id}] Downloaded ${downloaded} missing assets.`);
}

await downloadMissingAssets("glass_garden_light_green");
