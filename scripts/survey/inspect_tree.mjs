import fs from "node:fs";
import { ChromeController } from "../cdp_helper.mjs";

const c = new ChromeController();
try {
  await c.start({ headless: true });
  await c.newPage();
  await c.setViewport({ width: 390, height: 844 });
  await c.navigate("https://chungdoi.com/vi/mau-thiep/bach-su-v2-xanh/demo?open=1&autoscroll=0", 8000);
  await new Promise((r) => setTimeout(r, 2000));

  const dumpSrc = fs.readFileSync("web/scripts/survey/dump.js", "utf8");
  await c.eval(dumpSrc);

  const infoStr = await c.eval(`
    (() => {
      const dumpRes = window.__dump();
      const d = document, H = d.documentElement.scrollHeight;
      let root = null, bd = -1;
      d.body.querySelectorAll("*").forEach((e) => {
        const r = e.getBoundingClientRect();
        if (e.children.length >= 5 && r.height >= H * 0.85 && r.height <= H + 5) {
          let dep = 0, p = e; while (p) { dep++; p = p.parentElement; }
          if (dep > bd) { root = e; bd = dep; }
        }
      });
      return JSON.stringify({
        dumpN: dumpRes.n,
        dumpRootW: dumpRes.rootW,
        dumpRootH: dumpRes.rootH,
        rootTag: root ? root.tagName : null,
        rootCls: root ? root.className : null,
        parentCls: root && root.parentElement ? root.parentElement.className : null,
        childrenCount: root ? root.children.length : 0
      });
    })()
  `);

  console.log(JSON.parse(infoStr));
} catch (e) {
  console.error(e);
} finally {
  await c.close();
}
