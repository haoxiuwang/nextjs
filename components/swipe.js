import {useRef,useEffect,useState} from "react"
import Progress from './progress'
export default function ({height,auto,setAuto,fz,setFz,index,setIndex,time,repeat,setRepeat,texts,back,fav,setFav}) {
  const card = useRef(null)

  useEffect(()=>{
    var handler = (e)=>e.preventDefault()
    card.current.addEventListener("touchmove",handler,{passive:false})
  },[])

  return(
  <div ref={card} className="fixed inset-0 flex place-content-center place-items-center m-3">

      <div
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
      }}
      >
        <div className={`leading-tight text-slate-700 ${fz?"text-3xl":"text-xl"}`}>
          <span className="tracking-wide">
            {texts[index].en}
          </span>
          <span className="text-gray-500 block">
            {texts[index].zh}
          </span>
        </div>
        </div>
    </div>

  )
}
