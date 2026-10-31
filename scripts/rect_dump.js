(() => { const main=document.querySelector('main'); const mb=main.getBoundingClientRect(); const out=[];
const clean=(s)=>s.replace(/[^\p{L}\p{N} ]/gu,'').slice(0,14);
main.querySelectorAll('*').forEach(e=>{ const cs=getComputedStyle(e); if(cs.display==='none'||cs.visibility==='hidden') return; const r=e.getBoundingClientRect(); if(!r.width||!r.height) return; const tag=e.tagName.toLowerCase();
 const own=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ');
 if(!own && !['img','input','textarea','button'].includes(tag)) return;
 let name=clean(own); if(tag==='img'){ const s=(e.currentSrc||e.src); name = s.startsWith('data:') ? 'datauri' : clean(s.split('/').pop().split('?')[0].replace(/\.(webp|jpeg|jpg|png)$/,'')); }
 out.push([tag,name,Math.round(r.left-mb.left),Math.round(r.top-mb.top+main.scrollTop),Math.round(r.width),Math.round(r.height),cs.fontSize,cs.fontWeight].join('|')); });
return JSON.stringify({ mainW: Math.round(mb.width), lines: out.filter(l=>!/^span\|\d{1,2}\|.*\|13px\|/.test(l)) }); })()
