const path = require('path');
const fs = require('fs');
var data = []
var root = './series'
var series = fs.readdirSync(root,{withFileTypes:true})
series = series.filter((serie,i)=>serie.isDirectory)

function readParts(dir) {
  var parts = fs.readdirSync(dir)
  var max = parts.reduce((count,part,i)=>{
    var index = part.indexOf('mp3')
    if (index<part.length-3) return count

    var number =part.slice(0,index)
    number = parseInt(number)
    return Math.max(count,number)
  },0)
  return max+1
}

function buildSE(serie,child) {
  var current
  if (child.indexOf('x')>-1) {
    let [season,episode] = child.split('x')
    season = parseInt(season)
    episode = parseInt(episode)
    current = {season,episode}
  }
  else{
    current = {season:0,episode:parseInt(child)}
  }
  let count = readParts(`${root}/${serie}/${child}`)
  current['count'] = count
  current['path'] = child

  return current
}

series = series.map((serie,i)=>{
  const dir_name = serie.name
  const name = dir_name.replaceAll('_',' ')
  var children = fs.readdirSync(`${root}/${dir_name}`,{withFileTypes:true})
  children = children.filter((item)=>item.isDirectory())
  children = children.map((item)=>item.name)

  children = children.map((item,i)=>buildSE(dir_name,item))

  children = children.reduce((arr,{season,episode,count,path},index)=>{
    if(arr.length==0){
      var _season = {season,episodes:[{episode,count,path}]}
      return [_season]
    }

    var result = [...arr]
    var last = result[result.length-1]
    if (last.season==season) {
      last.episodes.push({episode,path,count})
    }
    else {
      var _season = {season,episodes:[{episode,count,path}]}
      result.push(_season)
    }
    return result
  },[])

  children = children.map((item)=>{
    var item1 = item.episodes.sort((a,b)=>a.episode-b.episode)
    return {season:item.season,episodes:item1}
  })

  return {name,dir_name,children}
})

fs.writeFileSync('meta.json',JSON.stringify(series),"utf8")
