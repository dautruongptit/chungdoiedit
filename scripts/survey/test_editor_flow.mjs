import { ChromeController } from "../cdp_helper.mjs";

async function testEditorCreationFlow() {
  const c = new ChromeController();
  try {
    await c.start({ headless: true });
    await c.newPage();
    await c.setViewport({ width: 1280, height: 800 });

    const samples = ["song_hy_v2_red", "chateau_green", "qasr_blue", "minimalism_green"];
    for (const id of samples) {
      console.log(`\nTesting editor creation for ${id}: http://localhost:5173/edit/draft-${id}?template=${id}`);
      await c.navigate(`http://localhost:5173/edit/draft-${id}?template=${id}`, 5000);
      await new Promise(r => setTimeout(r, 1000));

      const title = await c.eval("document.title");
      const inputs = await c.eval(`document.querySelectorAll('input, textarea, button').length`);
      const previewRoot = await c.eval(`!!document.querySelector('[data-showcase-root], [data-testid*="-template"]')`);
      console.log(`Editor result for ${id}: inputs=${inputs}, previewRoot=${previewRoot}, title="${title}"`);
    }
  } finally {
    await c.close();
  }
}

await testEditorCreationFlow();
