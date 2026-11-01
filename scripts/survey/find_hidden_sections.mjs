import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/minimalism_green_full_scrolled.html", "utf8");

for (const query of ["Album Ảnh", "DRESS CODE", "Hộp Quà Mừng"]) {
  const idx = html.indexOf(query);
  console.log(`=== Query: "${query}" (pos ${idx}) ===`);
  if (idx !== -1) {
    // Find enclosing tag
    const before = html.slice(Math.max(0, idx - 300), idx);
    const after = html.slice(idx, Math.min(html.length, idx + 300));
    console.log("Before snippet:\n", before);
    console.log("After snippet:\n", after);
  }
}
