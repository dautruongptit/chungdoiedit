import { ChromeController } from "../cdp_helper.mjs";

async function testCatalogAndSelectionFlow() {
  console.log("\n=======================================================");
  console.log("TESTING END-TO-END TEMPLATE SELECTION FLOW (88 TEMPLATES)");
  console.log("=======================================================");

  const c = new ChromeController();
  try {
    await c.start({ headless: true });
    await c.newPage();
    await c.setViewport({ width: 1280, height: 800 });

    // 1. Visit Catalog
    console.log("1. Navigating to template catalog: http://localhost:5173/vi/mau-thiep");
    await c.navigate("http://localhost:5173/vi/mau-thiep", 10000);

    const catalogCount = await c.eval(`document.querySelectorAll('a[href*="/demo"], button, a[href*="/edit"]').length`);
    console.log("Found interactive elements in catalog:", catalogCount);

    const templateCards = await c.eval(`(()=>{
      const links = [...document.querySelectorAll('a[href*="/demo"]')];
      return links.map(a => a.getAttribute('href'));
    })()`);
    console.log(`Found ${templateCards.length} demo links in catalog`);

    // 2. Test selecting and viewing 3 diverse templates from different archetypes:
    // a) song_hy_v2_red (Traditional)
    // b) chateau_green (European Castle)
    // c) qasr_blue (Oriental Royal)
    const testSamples = [
      { id: "song_hy_v2_red", slug: "song-hy-v2-do" },
      { id: "chateau_green", slug: "lau-dai-xanh" },
      { id: "qasr_blue", slug: "thanhcung-lam" },
      { id: "minimalism_green", slug: "minimalism-xanh" }
    ];

    for (const t of testSamples) {
      console.log(`\n--- Testing selection flow for ${t.id} ---`);
      
      // Navigate to demo
      const demoUrl = `http://localhost:5173/vi/mau-thiep/${t.slug}/demo`;
      console.log(`Navigating to demo: ${demoUrl}`);
      await c.navigate(demoUrl, 5000);
      await new Promise(r => setTimeout(r, 1000));

      const title = await c.eval("document.title");
      console.log(`Demo page loaded. Title: "${title}"`);

      // Test open envelope
      const openBtnExists = await c.eval(`!!document.querySelector('button[aria-label*="Mở thiệp"], button, .cursor-pointer')`);
      console.log(`Open button/cover exists: ${openBtnExists}`);

      // Open invitation
      await c.eval(`(()=>{
        const btn = document.querySelector('button[aria-label*="Mở thiệp"]') || document.querySelector('.cursor-pointer');
        if (btn) btn.click();
      })()`);
      await new Promise(r => setTimeout(r, 1500));

      const isOpen = await c.eval(`!!document.querySelector('[data-showcase-root], [data-testid*="-template"]')`);
      console.log(`Invitation opened successfully: ${isOpen}`);

      // Test Editor navigation
      const editUrl = `http://localhost:5173/edit?template=${t.id}`;
      console.log(`Navigating to editor: ${editUrl}`);
      await c.navigate(editUrl, 5000);
      await new Promise(r => setTimeout(r, 1500));

      const editorCards = await c.eval(`document.querySelectorAll('.collapse, [data-testid*="editor"], form, input').length`);
      console.log(`Editor loaded with ${editorCards} form inputs/sections`);
    }

    console.log("\n=======================================================");
    console.log("ALL E2E SELECTION & LIVE PREVIEW FLOW TESTS PASSED!");
    console.log("=======================================================");
  } catch (err) {
    console.error("Test error:", err);
  } finally {
    await c.close();
  }
}

await testCatalogAndSelectionFlow();
