import {useEffect,useState,useCallback} from 'react'
import Progress from "./progress"
import Swipe from "./swipe"
import Words from "./words"
export default function Card({height,serie,season,episode,count,path,dir_name,part,texts,setPart,setParts,parts}) {
  const [index,setIndex] = useState(0)
  var value = (100*(1-index/texts.length))+"%"
  const [repeat,setRepeat] = useState(false)
  const [fz,setFz] = useState(false)
  const [fav,setFav] = useState(false)
  const [player,setPlayer] = useState(null)
  useEffect(()=>{
    if(!player)
    setPlayer(new Audio())
  },[])
  const [{blob,error1},setBlob] = useState({blob:null,error1:null})
  const [{time,error2},setTime] = useState({time:null,error2:null})

  useEffect(()=>{
    fetch(`${path}/${part}.mp3`)
    .then((res)=>res.blob())
    .then((data)=>{

      setBlob({blob:data,error1:null})
    })
    .catch((error)=>{
      setBlob({blob:null,error1:error})
    })

    fetch(`${path}/${part}.json`)
    .then((res)=>res.json())
    .then((data)=>{
      setTime({time:data,error2:null})
    })
    .catch((error)=>setTime({time:null,error2:error}))
  },[])

  useEffect(()=>{

    if(blob)
    player.src = window.URL.createObjectURL(blob)
  },[blob])
  useEffect(()=>{
    if(!time||!blob||!player)return
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
  },[index,repeat,auto])

  const [auto,setAuto] = useState(false)

  if (!time||!blob)return(<div style={{height}} className="flex place-content-center place-items-center">loading data...</div>)

  if (error1||error2)return(<div style={{height}} className="flex place-content-center place-items-center">time and audio data error...</div>)

  var props = {height,auto,setAuto,fz,setFz,index,setIndex,time,repeat,setRepeat,texts,fav,setFav,serie,_key:path+"_"+part}

  if(fav)
  return(<div>
    <Words {...{height,texts,index,str:texts[index].en,setFav,_key:path+"_"+part,setAuto}}/>
  </div>)
  console.log({serie});
  return(
    <div>
      <div  className="z-50 fixed right-14 bottom-14 flex space-x-4  place-content-center">
      <button onClick={()=>{
        window.open(`${path}/${part}.mp3`,"_blank")
        }} className="button-17 ">播放</button>
      <button onClick={()=>{
          player.pause()
          player.ontimeupdate = null
          player.src = null
          setPart(-1)
        }} className="button-17 ">返回</button>
        <button onClick={(e)=>{
          e.stopPropagation()
          setAuto(!auto)
        }} className={`button-17 ${auto?"current":""}`} >{auto?"结束":"循环"}</button>
      </div>

      <div className="fixed inset-x-3 z-20 ">

        <Progress setIndex={setIndex} index={index} length={time.length}/>

      </div>

      <Swipe {...props}/>
    </div>)
}
