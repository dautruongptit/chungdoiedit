import fs from "fs";
import path from "path";

export async function downloadMissingAssetsViaChrome(chromeCtrl, html) {
  const matches = [...html.matchAll(/(?:src|href)="(\/images\/(?:themes|envelope)\/[^"]+)"/g)].map(m => m[1]);
  const unique = [...new Set(matches)];
  const missing = unique.filter(rel => !fs.existsSync(path.join("web/public", rel)));

  if (missing.length === 0) return 0;
  console.log(`Found ${missing.length} missing assets to download via Chrome:`, missing);

  let count = 0;
  for (const rel of missing) {
    try {
      const b64 = await chromeCtrl.eval(`(async () => {
        try {
          const r = await fetch("${rel}");
          if (!r.ok) return null;
          const blob = await r.blob();
          return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          return null;
        }
      })()`);

      if (b64) {
        const localPath = path.join("web/public", rel);
        fs.mkdirSync(path.dirname(localPath), { recursive: true });
        fs.writeFileSync(localPath, Buffer.from(b64, "base64"));
        console.log(`Downloaded: ${rel}`);
        count++;
      } else {
        console.warn(`Could not fetch ${rel}`);
      }
    } catch (err) {
      console.error(`Error fetching ${rel}:`, err.message);
    }
  }
  return count;
}
