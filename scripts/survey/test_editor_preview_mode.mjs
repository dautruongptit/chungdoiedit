import { ChromeController } from "../cdp_helper.mjs";

async function testEditorPreviewMode() {
  const c = new ChromeController();
  try {
    await c.start({ headless: true });
    await c.newPage();
    await c.setViewport({ width: 1280, height: 800 });

    const samples = ["song_hy_v2_red", "chateau_green", "qasr_blue", "minimalism_green"];
    for (const id of samples) {
      console.log(`\n--- Testing Editor Preview Mode for ${id} ---`);
      await c.navigate(`http://localhost:5173/edit/draft-${id}?template=${id}`, 5000);
      await new Promise(r => setTimeout(r, 1000));

      // Click "Xem trước" tab/button
      const clicked = await c.eval(`(()=>{
        const btns = [...document.querySelectorAll('button')];
        const previewBtn = btns.find(b => b.textContent && b.textContent.includes('Xem trước'));
        if (previewBtn) {
          previewBtn.click();
          return true;
        }
        return false;
      })()`);
      console.log(`Clicked "Xem trước": ${clicked}`);
      await new Promise(r => setTimeout(r, 1500));

      const hasShowcaseRoot = await c.eval(`!!document.querySelector('[data-showcase-root], [data-testid*="-template"]')`);
      console.log(`Live Preview active for ${id}: ${hasShowcaseRoot}`);
    }
  } finally {
    await c.close();
  }
}

await testEditorPreviewMode();
