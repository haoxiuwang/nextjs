import {useRef,useEffect,useState} from "react"
import Progress from './progress'
export default function ({height,auto,setAuto,fz,setFz,index,setIndex,time,repeat,setRepeat,texts,back,fav,setFav,serie,_key,font}) {
  const card = useRef(null)
  const [lang,setLang] = useState(true)
  const [local,setLocal] = useState([])

  useEffect(()=>{

    var data = window.localStorage.getItem(_key.replaceAll("/","_"))
    setLocal(data?JSON.parse(data):[])
  },[])
  useEffect(()=>{
    var handler = (e)=>e.preventDefault()
    card.current.addEventListener("touchmove",handler,{passive:false})
  },[])

  var {en,zh} = texts[index]
  var rnd = Math.floor(Math.random()*5)
  var rnd2 = Math.floor(Math.random()*5)
  var _local = local.filter((item)=>item.index==index)

  return(
  <div onTouchStart={(e)=>{
    e.stopPropagation()
    var {targetTouches,changedTouches,touches} = e

    var touches = changedTouches
    // alert(touches[0].clientY);
    if (touches.length>1) return
    e.target.start = {y:touches[0].clientY,x:touches[0].clientX}

  }} onTouchEnd={(e)=>{
    e.stopPropagation()
    if(e.target.multi)return
    var {touches,targetTouches,changedTouches,target} = e

    // if (touches.length>2||targetTouches.length>2||changedTouches.length>2) return

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
    }
    // if(distance>20)setIndex(index==0?index:index-1)
    // else if(distance<-20)setIndex(index==texts.length-1?index:index+1)

  }} onContextMenu={(e)=>setFav(true)} ref={card} className="h-full flex place-content-center place-items-center m-3 select-none">
    <div>
      <div style={{transform:`rotate(-${rnd}deg)`,fontSize:font<1?"16px":font<2?"20px":font<3?"25px":"30px"}} className={`relative p-3 py-10 m-auto w-[20rem] md:w-[25rem] text-center bg-sky-200 border-solid rounded border-sky-400 border-1` }>
        {lang?en:zh}
      </div>
      {_local.length>0&&(<div style={{transform:`rotate(-${rnd2}deg)`}} className={`relative p-3 py-10 m-3 w-[20rem] md:w-[25rem] text-center bg-sky-100 border-solid rounded border-sky-400 border-1`}>
        {
          _local.map((item,i)=>{
          return(
            <div className="mb-2 text-left leading-none" key={i}>
              <span className="font-semibold ">{item.en}: </span>
              <span>{item.zh}</span>
            </div>
          )})
        }
      </div>)}
    </div>
    </div>

  )
}
