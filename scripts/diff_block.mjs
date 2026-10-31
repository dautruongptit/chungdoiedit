import { ChromeController } from "./cdp_helper.mjs";
const c = new ChromeController(); await c.start({ headless: true }); await c.newPage();
const [,, key, W] = process.argv; await c.setViewport({ width: +W, height: 900, mobile: +W<500 });
const open = `(() => { const b=[...document.querySelectorAll('button,a')].find(x=>/mở thiệp/i.test(x.innerText||'')); b.click(); })()`;
const js = `(() => { const k=${JSON.stringify(key)}; const col=document.querySelector('header').parentElement; const top=col.children.length<3?col.parentElement:col; const s=[...top.children].find(x=>(x.innerText||'').trim().toUpperCase().startsWith(k)); if(!s) return ['NOTFOUND']; const t0=s.getBoundingClientRect().top; const out=[]; const walk=(e)=>{ [...e.children].forEach(ch=>{ const r=ch.getBoundingClientRect(); if(r.height>0 && !(ch.tagName==='IMG') && !(ch.tagName==='path')){ const cs=getComputedStyle(ch); const dir=ch.getAttribute&&ch.getAttribute('dir'); out.push([ch.tagName,(ch.innerText||'').trim().slice(0,14).split(String.fromCharCode(10)).join('|'),Math.round(r.x),Math.round(r.y-t0),Math.round(r.width),Math.round(r.height),cs.fontSize,cs.color,cs.opacity].join(';')); } walk(ch); }); }; walk(s); out.unshift('BLOCK h='+Math.round(s.getBoundingClientRect().height)); return out; })()`;
const res={};
for (const [name,url] of [["real","https://chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo"],["clone","http://localhost:5173/demo?template=minimalism-do-dam"]]) {
  await c.navigate(url, 3500); await c.eval(open); await new Promise(r=>setTimeout(r,4000)); res[name]=await c.eval(js);
}
const norm=l=>l.replace(/^(DIV|SPAN|SECTION|P|H2|H3|BUTTON);/,'$1;');
const sc=new Set(res.clone), sr=new Set(res.real);
console.log(res.real[0],'|',res.clone[0]);
res.real.slice(1).forEach(l=>{ if(!sc.has(l)) console.log("R",l)}); res.clone.slice(1).forEach(l=>{ if(!sr.has(l)) console.log("C",l)});
process.exit(0);
