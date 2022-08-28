var arr = [
`"	&quot;`,
`&	&amp;`,
`'	&apos;`,
`<	&lt;`,
`>	&gt;`]
arr = arr.map((str,i)=>str.split("	"))

var source = require("./source.json")

var o = {en:`"hello", he said.`}
o = JSON.stringify(o)
console.log(JSON.parse(o).en);
// source = source.map((part,i)=>{
//   return part.map(({en,zh},m)=>{
//   en = arr.reduce((str,ch,m)=>{
//     if(str.indexOf(`'`)>-1)
//     console.log(str);
//     var str1 = str.replace(ch[0],ch[1])
//
//     return str1
//   },en)
//   // console.log({en,zh});
//   return {en,zh}
//   })
// })
