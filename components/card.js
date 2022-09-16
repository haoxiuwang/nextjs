import {useEffect,useState} from 'react'
import Progress from "./progress"
import Swipe from "./swipe"
import Words from "./words"
export default function Card({height,texts,blob,time,player,back,path}) {
  // console.log({path});
  const [index,setIndex] = useState(0)
  var value = (100*(1-index/texts.length))+"%"
  const [repeat,setRepeat] = useState(false)
  const [fz,setFz] = useState(false)
  const [fav,setFav] = useState(false)

  useEffect(()=>{
    player.src = window.URL.createObjectURL(blob)
  },[blob,player])
  useEffect(()=>{
    player.ontimeupdate = ()=>{
      if(index==time.length-1&&player.currentTime>(player.duration-0.8)){
        if(auto)setIndex(0)
      }
      if(index<time.length-1&&player.currentTime>(time[index+1].timeSeconds-0.8))
        if(auto)setIndex(index+1)
        else
        player.pause()

    }
  },[index,repeat])
  useEffect(()=>{
    if (index<0){
      if(!player.paused)
      player.pause()
      player.ontimeupdate = null
      back(-1)
      return
    }
    if(!player.paused)
      player.pause()
    player.currentTime = time[index].timeSeconds
    if(player.paused)
    player.play()
  },[index,repeat,player,back])

  const [auto,setAuto] = useState(false)
  var props = {auto,setAuto,fz,setFz,height,index,setIndex,time,repeat,setRepeat,texts,back,fav,setFav}
  if(fav)
  return(<div>
    <Words {...{texts,index,str:texts[index].en,setFav,path}}/>
  </div>)
  return(<Swipe {...props}/>)
}
