import {useEffect,useState} from 'react'
import Progress from "./progress.js"
export default function Card({height,texts,blob,time,player,back,path}) {

  const [index,setIndex] = useState(0)
  var value = (100*(1-index/texts.length))+"%"
  const [repeat,setRepeat] = useState(false)


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
  },[index])
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

  return(
  <div className="select-none" style={{height:height+"px"}}>
    <div onClick={()=>setAuto(!auto)} className="fixed right-[25px] top-[25px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-record-circle ${auto&&"text-sky-400"}`} viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
<path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
</svg>
    </div>

    <div className={`h-full w-full grid grid-rows-[min-content_1fr_min-content]`}>
      <Progress setIndex={setIndex} index={index} length={time.length}/>
      <div className="flex place-content-center place-items-center"
      onTouchStart={(e)=>{
        e.stopPropagation()
        var {targetTouches,changedTouches,target} = e
        var touches = changedTouches
        // alert(touches[0].clientY);
        if (touches.length>1) return
        e.target.start = touches[0].clientY
        // return false
      }} onTouchEnd={(e)=>{
        e.stopPropagation()

        var {touches,targetTouches,changedTouches,target} = e

        if (touches.length>1||targetTouches.length>1||changedTouches.length>1) return
        // alert(touches.length+":"+changedTouches.length+":"+targetTouches.length);
        // return
        var distance = changedTouches[0].clientY-e.target.start
        if(distance>20)setIndex(index==0?index:index-1)
        else if(distance<-20)setIndex(index==texts.length-1?index:index+1)
        else setRepeat(!repeat)
        // return false
      }}>

        {index>-1&&(
        <div className="grid grid-rows-2 gap-3 mx-3 leading-none text-xl">
          <span>
            {texts[index].en}
          </span>
          <span className="text-gray-500 block">
            {texts[index].zh}
          </span>
        </div>)}
        </div>
        <div className="flex flex-row place-items-center place-content-center bg-sky-500 text-white w-full h-[50px]" onClick={()=>{
          back(-1)
        }}>
          Back to Parts
        </div>

    </div>
  </div>
  )
}
