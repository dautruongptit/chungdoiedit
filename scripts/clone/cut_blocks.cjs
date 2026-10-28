const ts=require("typescript");const fs=require("fs");
const [,, file, outDir]=process.argv;
const src="const X = (\n"+fs.readFileSync(file,"utf8")+"\n);";
const sf=ts.createSourceFile("x.tsx",src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
let root;(function f(n){if(!root&&ts.isJsxElement(n)){root=n;return}ts.forEachChild(n,f)})(sf);
const kids=root.children.filter(c=>!(ts.isJsxText(c)&&!c.getText().trim()));
kids.forEach((k,i)=>{fs.writeFileSync(outDir+"/"+String(i).padStart(2,"0")+".jsx",k.getText())});
console.log(kids.length);
