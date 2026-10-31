import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
await c.setViewport({ width: 1280, height: 720 });
const names = /seal-break|dragon-fly-forward|seal-ring|particle-burst|fade-in$|fadeIn|envelope-away|seal-flower-bloom|ping$|seal-pulse/;
const js = `(() => { const out=[]; for (const ss of document.styleSheets) { let rules; try{rules=ss.cssRules}catch(e){continue} const walk=(rs)=>{ for (const r of rs) { if (r.type===7 && ${names}.test(r.name)) out.push(r.cssText.replace(/\s+/g,' ')); else if (r.cssRules && r.type!==7) walk(r.cssRules); } }; walk(rules); } return [...new Set(out)]; })()`;
for (const [n,u] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(u,3500); console.log("=====",n); console.log((await c.eval(js)).join("\n"));
}
process.exit(0);
