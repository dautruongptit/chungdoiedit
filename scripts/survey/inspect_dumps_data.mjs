import fs from "node:fs";

function extractFromDump(path) {
  const d = JSON.parse(fs.readFileSync(path, "utf8"));
  const recs = d.recs;

  // Photos
  const photos = recs
    .filter((r) => r.kind === "img" && r.k.includes("photo-library"))
    .map((r) => {
      // reconstruct url from k
      // k looks like: img:5019eadee002f02ce6f39d9c5bdb7304d4da683b4e109c41e7ed14e63391d9b0.webp#1
      const hash = r.k.replace(/^img:/, "").replace(/#\d+$/, "");
      return `https://assets.chungdoi.com/photo-library/design/${hash}`;
    });

  // Unique photos in order
  const uniquePhotos = Array.from(new Set(photos));

  // Bank accounts
  const qrImgs = recs.filter((r) => r.kind === "img" && r.k.includes("qr-png"));
  const qrUrls = qrImgs.map((r) => {
    const query = r.k.replace(/^img:qr-png\?/, "").replace(/#\d+$/, "");
    return `/api/qr-png?${query}`;
  });

  return {
    recsCount: recs.length,
    photos: uniquePhotos,
    qrUrls,
    texts: recs.filter((r) => r.kind === "text").map((r) => r.k.replace(/^t:/, "").replace(/#\d+$/, "")),
  };
}

console.log("GREEN:", extractFromDump("docs/survey/raw/porcelain_v2_green_dump_open_390.json").photos);
console.log("RED:", extractFromDump("docs/survey/raw/porcelain_v2_red_dump_open_390.json").photos);
console.log("PINK:", extractFromDump("docs/survey/raw/porcelain_v2_pink_dump_open_390.json").photos);
