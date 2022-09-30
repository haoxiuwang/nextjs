const fs = require('fs');

var dir = fs.readdirSync("./1")
dir = dir.filter((item)=>/^[0-9]{1,2}\.json/.test(item))
dir = dir.filter((item)=>{
  var arr = require("./1/"+item)
  var value = arr.reduce((last,cur,i)=>{
    if(last<0)return last
    if(cur.timeSeconds<last)return -1
    return cur.timeSeconds
  },0)
  return(value==-1)
})
console.log(dir);
