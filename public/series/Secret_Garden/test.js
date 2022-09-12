const fs = require('fs');
var fic = fs.readFileSync('fiction.md',"utf-8")

var chapter = "CHAPTER"
var arr = [],index = 0, slice = ''
var i = 0
while (true) {
  index = fic.indexOf(chapter,1)
  if (index<0) break
  slice = fic.slice(0,index)

  fs.writeFileSync(`${i++}/source.md`,slice)
  fic = fic.slice(index)
}
fs.writeFileSync(`${i}/source.md`,fic)
