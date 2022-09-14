import {useEffect,useState} from 'react'
import Progress from "./progress.js"
export default function Card({height,texts,blob,time,player,back,path}) {

  const [index,setIndex] = useState(0)
  var value = (100*(1-index/texts.length))+"%"
  const [repeat,setRepeat] = useState(false)
  const [fz,setFz] = useState(34)

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

  return(
  <div className="select-none relative" style={{minHeight:height+"px"}}>
    <div className="fixed z-50 right-[25px] top-[25px] flex content-center ">
      <svg onClick={()=>setAuto(!auto)} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className={`bi bi-record-circle ${auto&&"text-sky-400"}`} viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      </svg>
      <span className="ml-3" onClick={()=>setFz(fz==35?34:35)}>
      {fz==35?(<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-dpad-fill" viewBox="0 0 16 16">
        <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v3a.5.5 0 0 1-.5.5h-3A1.5 1.5 0 0 0 0 6.5v3A1.5 1.5 0 0 0 1.5 11h3a.5.5 0 0 1 .5.5v3A1.5 1.5 0 0 0 6.5 16h3a1.5 1.5 0 0 0 1.5-1.5v-3a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 0 16 9.5v-3A1.5 1.5 0 0 0 14.5 5h-3a.5.5 0 0 1-.5-.5v-3A1.5 1.5 0 0 0 9.5 0h-3Zm1.288 2.34a.25.25 0 0 1 .424 0l.799 1.278A.25.25 0 0 1 8.799 4H7.201a.25.25 0 0 1-.212-.382l.799-1.279Zm0 11.32-.799-1.277A.25.25 0 0 1 7.201 12H8.8a.25.25 0 0 1 .212.383l-.799 1.278a.25.25 0 0 1-.424 0Zm-4.17-4.65-1.279-.798a.25.25 0 0 1 0-.424l1.279-.799A.25.25 0 0 1 4 7.201V8.8a.25.25 0 0 1-.382.212Zm10.043-.798-1.278.799A.25.25 0 0 1 12 8.799V7.2a.25.25 0 0 1 .383-.212l1.278.799a.25.25 0 0 1 0 .424Z"/>
      </svg>):(<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-dpad" viewBox="0 0 16 16">
        <path d="m7.788 2.34-.799 1.278A.25.25 0 0 0 7.201 4h1.598a.25.25 0 0 0 .212-.382l-.799-1.279a.25.25 0 0 0-.424 0Zm0 11.32-.799-1.277A.25.25 0 0 1 7.201 12h1.598a.25.25 0 0 1 .212.383l-.799 1.278a.25.25 0 0 1-.424 0ZM3.617 9.01 2.34 8.213a.25.25 0 0 1 0-.424l1.278-.799A.25.25 0 0 1 4 7.201V8.8a.25.25 0 0 1-.383.212Zm10.043-.798-1.277.799A.25.25 0 0 1 12 8.799V7.2a.25.25 0 0 1 .383-.212l1.278.799a.25.25 0 0 1 0 .424Z"/>
        <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v3a.5.5 0 0 1-.5.5h-3A1.5 1.5 0 0 0 0 6.5v3A1.5 1.5 0 0 0 1.5 11h3a.5.5 0 0 1 .5.5v3A1.5 1.5 0 0 0 6.5 16h3a1.5 1.5 0 0 0 1.5-1.5v-3a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 0 16 9.5v-3A1.5 1.5 0 0 0 14.5 5h-3a.5.5 0 0 1-.5-.5v-3A1.5 1.5 0 0 0 9.5 0h-3ZM6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3A1.5 1.5 0 0 0 11.5 6h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a1.5 1.5 0 0 0-1.5 1.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3A1.5 1.5 0 0 0 4.5 10h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 0 6 4.5v-3Z"/>
      </svg>)}
      </span>
    </div>

    <div className={`absolute inset-0 grid grid-rows-[min-content_1fr_min-content]`}>
      <Progress setIndex={setIndex} index={index} length={time.length}/>
      <div className="flex place-content-center place-items-center"
      onTouchStart={(e)=>{
        e.stopPropagation()
        var {targetTouches,changedTouches,target} = e
        var touches = changedTouches
        // alert(touches[0].clientY);
        if (touches.length>1) return
        e.target.start = touches[0].clientY

      }} onTouchEnd={(e)=>{
        e.stopPropagation()

        var {touches,targetTouches,changedTouches,target} = e

        if (touches.length>1||targetTouches.length>1||changedTouches.length>1) return

        var distance = changedTouches[0].clientY-e.target.start
        if(distance>20)setIndex(index==0?index:index-1)
        else if(distance<-20)setIndex(index==texts.length-1?index:index+1)
        else setRepeat(!repeat)
      }}>

        {index>-1&&(
        <div className={`grid grid-rows-2 gap-3 mx-3 leading-none text-xl ${fz==35&&"text-[35px]"}`}>
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
