// Thư viện nhỏ biến đổi JSX (đã chuyển từ HTML gốc) thành khối có gắn dữ liệu. Dùng bởi scripts/_riv_gen.cjs.
const ts = require("typescript");

const PRE = "const X = (\n";
const POST = "\n);";

class J {
  constructor(src) { this.src = src; }
  parse() {
    const text = PRE + this.src + POST;
    const sf = ts.createSourceFile("x.tsx", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    return { sf, text, off: PRE.length };
  }
  all(pred) {
    const { sf, off } = this.parse();
    const out = [];
    const walk = (n) => {
      if ((ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) && pred(n)) out.push({ s: n.getStart() - off, e: n.getEnd() - off, node: n });
      ts.forEachChild(n, walk);
    };
    walk(sf);
    return out;
  }
  attr(n, name) {
    const el = ts.isJsxElement(n) ? n.openingElement : n;
    for (const a of el.attributes.properties) if (ts.isJsxAttribute(a) && a.name.getText() === name) return a.initializer ? a.initializer.getText() : "";
    return null;
  }
  tag(n) { return (ts.isJsxElement(n) ? n.openingElement : n).tagName.getText(); }
  cls(n) { const a = this.attr(n, "className"); return a ? a.replace(/^["{`]+|["}`]+$/g, "") : ""; }
  // phần tử có className bắt đầu bằng prefix (tùy chọn tag)
  byClass(prefix, nth = 0, tag) {
    const list = this.all((n) => this.cls(n).startsWith(prefix) && (!tag || this.tag(n) === tag));
    if (!list[nth]) throw new Error(`không thấy phần tử class "${prefix}" #${nth} (có ${list.length})`);
    return list[nth];
  }
  slice(h) { return this.src.slice(h.s, h.e); }
  splice(s, e, repl) { this.src = this.src.slice(0, s) + repl + this.src.slice(e); return this; }
  // thay chuỗi chính xác (mặc định phải xuất hiện đúng 1 lần)
  rep(find, repl, count = 1) {
    const parts = this.src.split(find);
    if (parts.length - 1 !== count) throw new Error(`"${find.slice(0, 70)}" xuất hiện ${parts.length - 1} lần, cần ${count}`);
    this.src = parts.join(repl);
    return this;
  }
  // thay nút văn bản `>text<` bằng `>{expr}<`
  text(text, expr, count = 1) { return this.rep(">" + text + "<", ">{" + expr + "}<", count); }
  // thay toàn bộ con của một phần tử bằng chuỗi (giữ thẻ mở/đóng)
  setChildren(h, inner) {
    const n = h.node;
    if (!ts.isJsxElement(n)) throw new Error("setChildren cần phần tử có con");
    const { off } = this.parse();
    const s = n.openingElement.getEnd() - off, e = n.closingElement.getStart() - off;
    this.splice(s, e, inner);
    return this;
  }
  childrenOf(h) {
    const n = h.node;
    const { off } = this.parse();
    return n.children.filter((c) => !(ts.isJsxText(c) && !c.getText().trim())).map((c) => ({ s: c.getStart() - off, e: c.getEnd() - off, text: c.getText() }));
  }
}
module.exports = { J };

// thay lần lượt các nút văn bản trùng nhau bằng danh sách biểu thức
J.prototype.textEach = function (text, exprs) {
  const find = ">" + text + "<";
  const parts = this.src.split(find);
  if (parts.length - 1 !== exprs.length) throw new Error(`"${text.slice(0, 60)}" xuất hiện ${parts.length - 1} lần, cần ${exprs.length}`);
  this.src = parts.reduce((acc, p, i) => acc + p + (i < exprs.length ? ">{" + exprs[i] + "}<" : ""), "");
  return this;
};

J.prototype.textFirst = function (text, expr) {
  const find = ">" + text + "<";
  const i = this.src.indexOf(find);
  if (i < 0) throw new Error("không thấy " + text);
  this.src = this.src.slice(0, i) + ">{" + expr + "}<" + this.src.slice(i + find.length);
  return this;
};
