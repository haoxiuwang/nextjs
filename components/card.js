import {useEffect,useState} from 'react'
import Progress from "./progress"
import Swipe from "./swipe"
import Words from "./words"
export default function Card({height,texts,blob,time,player,back,path}) {
  const [index,setIndex] = useState(0)
  var value = (100*(1-index/texts.length))+"%"
  const [repeat,setRepeat] = useState(false)
  const [fz,setFz] = useState(false)
  const [fav,setFav] = useState(false)

  useEffect(()=>{
    player.src = window.URL.createObjectURL(blob)
  },[])
  useEffect(()=>{
    player.currentTime = time[index].timeSeconds
    if(player.paused)
    player.play()
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


  const [auto,setAuto] = useState(false)
  var props = {height,auto,setAuto,fz,setFz,index,setIndex,time,repeat,setRepeat,texts,back,fav,setFav}
  if(fav)
  return(<div>
    <Words {...{texts,index,str:texts[index].en,setFav,path}}/>
  </div>)

  return(<Swipe {...props}/>)
}
