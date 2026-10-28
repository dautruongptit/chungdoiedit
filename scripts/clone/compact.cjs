const fs=require("fs");
let s=fs.readFileSync(process.argv[2],"utf8");
const from=Number(process.argv[3]||0), len=Number(process.argv[4]||6000);
s=s.replace(/ style=\{\{(?:[^{}]|\{[^{}]*\})*\}\}/g,"").replace(/ className="[^"]*"/g,"").replace(/ aria-hidden="true"/g,"").replace(/ alt=""/g,"").replace(/ dir="auto"/g,"").replace(/src="\/images\/themes\/riviera-blue\//g,'src="@/').replace(/\.webp"/g,'"');
console.log(s.slice(from,from+len));
