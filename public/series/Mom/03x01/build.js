
if(process.env.task == 0){
const fs = require('fs');
var content = fs.readFileSync('source.md','utf8')
function textHandler(text) {
  var arr = text.split('\n')
  arr = arr.map((p,index)=>{
    var i = p.indexOf(': '),who,en

    if(i==0)
    who = p.slice(0,i)
    en = who?p.slice(i+2):p
    return {who,en,index}
  })
  arr = arr.slice(0,arr.length-1)
  return arr
}
var arr = textHandler(content)

var html = arr.reduce(function (html,item,i) {
  return html+= `<p>${item.en}</p>`
},'')
fs.writeFileSync('p.html',html)
}
else if(process.env.task == 1){
const fs = require('fs');
var words = fs.readFileSync('source.md','utf8')
words =  words.split('\n')
words = words.filter((item)=>item.length>0)
var zh,en,index=0,i = 0

var arr = []
var sum = 0
while(i<words.length){
  zh = words[i++]
  en = words[i++]
  sum+=en.length
  arr.push({en,zh})
}
  sum = 4800
var i = 0, source = [],text = ''
while (true) {
  if(i>arr.length-1)break
  text += arr[i].en
  if ((text.length+i*22)>sum) {
    source.push(arr.splice(0,i))
    i = 0
    text = ''
    continue
  }
  i++
}
source.push(arr)
console.log(source.length)
fs.writeFileSync('source.json',JSON.stringify(source))
}

