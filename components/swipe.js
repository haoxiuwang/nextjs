import {useRef,useEffect,useState} from "react"
import Progress from './progress'
export default function ({height,auto,setAuto,fz,setFz,index,setIndex,time,repeat,setRepeat,texts,back,fav,setFav}) {
  const card = useRef(null)
  const [lang,setLang] = useState(true)
  useEffect(()=>{
    var handler = (e)=>e.preventDefault()
    card.current.addEventListener("touchmove",handler,{passive:false})
  },[])

  return(
  <div onTouchStart={(e)=>{
    e.stopPropagation()
    var {targetTouches,changedTouches,target} = e
    var touches = changedTouches
    // alert(touches[0].clientY);
    if (touches.length>1) return
    e.target.start = {y:touches[0].clientY,x:touches[0].clientX}

  }} onTouchEnd={(e)=>{
    e.stopPropagation()

    var {touches,targetTouches,changedTouches,target} = e

    if (touches.length>1||targetTouches.length>1||changedTouches.length>1) return

    var distanceY = changedTouches[0].clientY-e.target.start.y
    var distanceX = changedTouches[0].clientX-e.target.start.x
    var absX = Math.abs(distanceX), absY = Math.abs(distanceY)

    if(absX<40&&absY<40)
      setRepeat(!repeat)
    else{
      if(absX>absY)setLang(!lang)
      else {
        index = distanceY>0?(index==0?index:index-1):(index==texts.length-1?index:index+1)
        setIndex(index)
      }
      return
    }
    // if(distance>20)setIndex(index==0?index:index-1)
    // else if(distance<-20)setIndex(index==texts.length-1?index:index+1)

  }} onContextMenu={(e)=>setFav(true)} ref={card} className="fixed inset-0 flex place-content-center place-items-center m-3 select-none">

      <div>
        <div className="pt-20 m-auto w-[20rem] md:w-[25rem] text-center transform rotate-[-2deg]">
          <span className="tracking-wide">
            {lang?texts[index].en:texts[index].zh}
          </span>
        </div>
        </div>
    </div>

  )
}
