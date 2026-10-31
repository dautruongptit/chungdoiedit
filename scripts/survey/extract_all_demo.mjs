import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const VARIANTS = [
  { id: "porcelain_v2_green", slug: "bach-su-v2-xanh" },
  { id: "porcelain_v2_red", slug: "bach-su-v2-do" },
  { id: "porcelain_v2_pink", slug: "bach-su-v2-hong" },
];

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });

  for (const v of VARIANTS) {
    console.log("Extracting demo for", v.id, "slug:", v.slug);
    await c.navigate(`https://chungdoi.com/vi/mau-thiep/${v.slug}/demo?open=1&autoscroll=0`, 8000);
    await new Promise((r) => setTimeout(r, 2000));

    const resStr = await c.eval(`
      (() => {
        // Collect photos
        const albumImgs = Array.from(document.querySelectorAll("section img"))
          .map(img => img.src)
          .filter(src => src.includes("photo-library"));
        const photos = Array.from(new Set(albumImgs));

        // Guestbook entries
        const gbCards = Array.from(document.querySelectorAll("section form + div > div"));
        const guestbookEntries = gbCards.map(c => {
          const spans = c.querySelectorAll("span");
          const name = spans[0]?.textContent?.trim() || "";
          const createdAt = spans[1]?.textContent?.trim() || "";
          const message = c.querySelector("p")?.textContent?.trim() || "";
          return { name, createdAt, message };
        }).filter(e => e.name);

        // Bank accounts
        const qrContainers = Array.from(document.querySelectorAll("dialog .flex-1"));
        const bankAccounts = qrContainers.map(qc => {
          const role = qc.querySelector("h3")?.textContent?.trim() || "";
          const ps = Array.from(qc.querySelectorAll("p")).map(p => p.textContent.trim());
          const bank = ps[0] || "";
          const accountNumber = ps[1] || "";
          const accountHolder = ps[2] || "";
          const qrImg = qc.querySelector("img")?.src || "";
          return { role, bank, accountNumber, accountHolder, qrUrl: qrImg };
        }).filter(b => b.role);

        // All text elements to inspect
        return JSON.stringify({ photos, guestbookEntries, bankAccounts });
      })()
    `);

    const res = JSON.parse(resStr);
    const out = `web/docs/survey/raw/${v.id}_extracted_meta.json`;
    fs.writeFileSync(out, JSON.stringify(res, null, 2));
    console.log(`Saved ${v.id} metadata: ${res.photos.length} photos, ${res.guestbookEntries.length} gb entries, ${res.bankAccounts.length} bank accounts`);
  }
} catch (e) {
  console.error(e);
} finally {
  await c.close();
}
