import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController();
await c.start({ headless: true });
await c.newPage();
const js = `(() => { try { const card=document.querySelector('h1').closest('.relative.rounded-lg'); const out=[];
 const root=card.parentElement.parentElement;
 root.querySelectorAll('*').forEach(e=>{ if(e.tagName==='path'||e.tagName==='svg')return; const r=e.getBoundingClientRect(); if(!r.width)return; const s=getComputedStyle(e);
  out.push([e.tagName, (e.innerText||'').slice(0,14).split(String.fromCharCode(10)).join('|'), Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height), s.fontSize,s.fontFamily.slice(0,18),s.color,s.backgroundColor==='rgba(0, 0, 0, 0)'?'':s.backgroundColor, s.opacity, s.letterSpacing,s.fontWeight].join(' ; '));});
 return out; } catch(e){ return String(e); } })()`;
const res = {};
const dbg=(k,v)=>{ if(!Array.isArray(v)) console.log("NONARRAY",k,String(v).slice(0,300)); return v; };
for (const [name, url] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  for (const w of [1280, 390]) {
    await c.setViewport({ width: w, height: 900, mobile: w<500 });
    await c.navigate(url, 3500);
    res[name+w] = dbg(name+w, await c.eval(js));
  }
}
for (const w of [1280,390]) { console.log("=== diff", w);
  const a=res["real"+w], b=res["clone"+w];
  console.log("real n",a.length,"clone n",b.length);
  const sb=new Set(b); a.forEach(l=>{ if(!sb.has(l)) console.log("R:",l)});
  const sa=new Set(a); b.forEach(l=>{ if(!sa.has(l)) console.log("C:",l)});
}
process.exit(0);
