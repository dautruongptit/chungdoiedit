// Tách các phần tử con trực tiếp của một thẻ JSX (đủ dùng cho tệp mẫu một dòng dài).
module.exports = function children(src, openEnd) {
  // openEnd: chỉ số ngay sau '>' của thẻ cha
  const out = []; let i = openEnd;
  const readTag = (p) => { // trả về {end, name, close, self}
    let j = p + 1, name = '', close = false;
    if (src[j] === '/') { close = true; j++; }
    while (/[A-Za-z0-9.]/.test(src[j])) name += src[j++];
    let br = 0, q = null;
    for (; j < src.length; j++) {
      const c = src[j];
      if (q) { if (c === q && src[j - 1] !== String.fromCharCode(92)) q = null; continue; }
      if (br === 0 && (c === '"' || c === "'")) { q = c; continue; }
      if (c === '`') { q = c; continue; }
      if (c === '{') { br++; continue; }
      if (c === '}') { br--; continue; }
      if (br === 0 && c === '>') return { end: j + 1, name, close, self: src[j - 1] === '/' };
      if (br > 0 && (c === '"' || c === "'")) { q = c; continue; }
    }
    throw new Error('unterminated tag at ' + p);
  };
  while (i < src.length) {
    // bỏ chữ/biểu thức giữa các phần tử
    if (src[i] === '{') { let b = 0; const st = i; for (; i < src.length; i++) { if (src[i] === '{') b++; else if (src[i] === '}') { b--; if (!b) { i++; break; } } } out.push({ start: st, end: i, expr: true }); continue; }
    if (src[i] !== '<') { i++; continue; }
    const t = readTag(i);
    if (t.close) break; // đóng thẻ cha
    const start = i; i = t.end;
    if (!t.self) { let depth = 1; while (depth > 0) { const k = src.indexOf('<', i); if (k < 0) throw new Error('eof'); const u = readTag(k); i = u.end; if (u.close) depth--; else if (!u.self) depth++; } }
    out.push({ start, end: i, name: t.name });
  }
  return out;
};
