import { useState, useEffect } from "react"
import { Image } from "next/image"
import { useRouter } from 'next/router'
export default function Episode() {
  const router = useRouter()
  const { serie,season,episode,count,path } = router.query
  const [index,setIndex] = useState(-1)


  const [parts,setParts] = useState(null)

  useEffect(()=>{
    if (!episode)return
    var url = `${path}/source.json`

    fetch(url)
    .then((res)=>res.json())
    .then((data)=>setParts(data))
  },[episode])
  const [blob,setBlob] = useState(null)
  useEffect(()=>{
    if(index>-1)
    fetch(`${path}/${index}.mp3`)
    .then((res)=>res.blob())
    .then((data)=>setBlob(data))
  },[index])
  const [time,setTime] = useState(null)
  useEffect(()=>{
    if(index>-1)
    fetch(`${path}/${index}.json`)
    .then((res)=>res.json())
    .then((data)=>setTime(data))
  },[index])
  function list(count) {
    var i = 0
    var arr = []
    while (i<count) {
      arr.push(((m)=>{
        return <span className="item" onClick={()=>setIndex(m)} key={m}>{m}</span>
      })(i))
      i++
    }
    return arr
  }


  if(index==-1){

  return (
    <div className="container episode" style={{minHeight:"100vh"}}>
      <div className="episode">
      <div style={{textAlign:"center",marginBottom:"25px"}}>This episode include {count} parts, please start with one of them:</div>
      <div>
        {list(count)}
      </div>
      </div>
    </div>
  )}

  var part = parts[index]

  return(

        part?(<Card texts={part}/>)
        :(<div className="container episode" style={{minHeight:"100vh"}}>Loading...</div>)

  )

}
function Card({texts,blob,time}) {
  const [index,setIndex] = useState(0)
  var value = (100*(1-index/texts.length))+"%"
  var play
  useEffect(()=>{
    if (!blob)return
    player = new Audio()
    player.src = window.URL.createObjectURL(blob)
    player.ontimeupdate = function () {
      if(time[index].timeSeconds>time[index+1].timeSeconds-0.8)
      player.pause()      
    }
    return function () {
      if(!blob)return
      player.ontimeupdate = null
      player = null
    }
  },[blob])
  return(
    <div>
    <div onClick={(e)=>{
      setIndex(Math.floor(texts.length*e.screenX/window.innerWidth))
    }} className="progress">
      <div style={{marginRight:value}}></div>
    </div>
      <div onClick={(e)=>{
        if(e.screenX<50)
          setIndex(index==texts.length-1?index:index+1)
        else if(e.screenX>window.innerWidth-50)
        setIndex(index==0?index:index-1);
        else{
          player.currentTime = time[index].timeSeconds
          if(player.paused)
          player.play()
        }

      }} className="episode" style={{minHeight:"100vh"}}>
        {texts[index].en}
      </div>
    </div>
  )
}