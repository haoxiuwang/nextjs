import {useEffect,useState,useCallback,useRef} from 'react'
import Progress from "./progress"
import Swipe from "./swipe"
import Words from "./words"
import Search from "./search"
export default function Card({height,serie,season,episode,count,path,dir_name,part,texts,setPart,setParts,parts}) {
  const [side,setSide] = useState(true)

  const [index,setIndex] = useState(0)
  var value = (100*(1-index/texts.length))+"%"
  const [repeat,setRepeat] = useState(false)
  const [fz,setFz] = useState(false)
  const [fav,setFav] = useState(false)
  const [player,setPlayer] = useState(null)
  const [mute,setMute] = useState(false)
  const [search,setSearch] = useState(false)
  useEffect(()=>{
    if(!player)
    setPlayer(new Audio())
  },[])
  const [{blob,error1},setBlob] = useState({blob:null,error1:null})
  const [{time,error2},setTime] = useState({time:null,error2:null})
  console.log(`${path}/${part}.mp3`);
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
      console.log({data});
      setTime({time:data,error2:null})
    })
    .catch((error)=>{
      console.log({error});
      setTime({time:null,error2:error})
    })
  },[])

  useEffect(()=>{

    if(blob)
    player.src = window.URL.createObjectURL(blob)
  },[blob])

  useEffect(()=>{
    if(mute){
      player.pause()
      player.ontimeupdate = null
      return
    }
    if(!time||!blob||!player)return
    (player.currentTime = time[index].timeSeconds)
    if(player.paused)
    player.play()
    player.ontimeupdate = ()=>{
      if(index==time.length-1&&player.currentTime>(player.duration-0.7)){
        if(auto)setIndex(0)
      }
      if(index<time.length-1&&player.currentTime>(time[index+1].timeSeconds-0.7))
        if(auto)setIndex(index+1)
        else
        player.pause()
    }
  },[index,repeat,auto])

  const [auto,setAuto] = useState(false)
  const [font,setFont] = useState(2)
  if (!time||!blob)return(<div style={{height}} className="flex place-content-center place-items-center">loading data...</div>)

  if (error1||error2)return(<div style={{height}} className="flex place-content-center place-items-center">time and audio data error...</div>)

  var props = {height,auto,setAuto,fz,setFz,index,setIndex,time,repeat,setRepeat,texts,fav,setFav,serie,_key:path+"_"+part,font}

  if(search)return(<Search {...{parts,setSearch}}/>)
  if(fav)
  return(<div>
    <Words {...{height,texts,index,str:texts[index].en,setFav,_key:path+"_"+part,setAuto}}/>
  </div>)

  return(
    <div>
      <div onClick={(e)=>{e.stopPropagation();return false}} onContextMenu={(e)=>{e.stopPropagation();setSide(!side);return false}} className={`z-50 h-full fixed select-none ${side?"left-2":"right-2"} inset0-y-0 flex-wrap flex flex-col space-y-5  place-content-center place-items-center`}>
              <button className={`rounded ${!mute?"bg-rose-300":""}`} onClick={(e)=>{
                setMute(!mute)
              }} >{mute?(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" viewBox="0 0 16 16">
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
              </svg>):(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-mute" viewBox="0 0 16 16">
          <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3z"/>
          <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/>
        </svg>)}</button>
              <button onClick={()=>{
                setSearch(true)
              }} className=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg></button>
              <button onClick={()=>{
                var f = font
                f++
                f = f>3?0:f
                setFont(f)
              }} className="">{font<1?"S":font<2?"M":font<3?"B":"B+"}</button>

              <button onClick={()=>{
                  player.pause()
                  player.ontimeupdate = null
                  player.src = null
                  setPart(-1)
                }} className=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
        </svg></button>
                <button className={`rounded ${!auto?"bg-rose-300":""}`} onClick={(e)=>{
                  e.stopPropagation()
                  setAuto(!auto)
                }} >{auto?(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat-1" viewBox="0 0 16 16">
                  <path d="M11 4v1.466a.25.25 0 0 0 .41.192l2.36-1.966a.25.25 0 0 0 0-.384l-2.36-1.966a.25.25 0 0 0-.41.192V3H5a5 5 0 0 0-4.48 7.223.5.5 0 0 0 .896-.446A4 4 0 0 1 5 4h6Zm4.48 1.777a.5.5 0 0 0-.896.446A4 4 0 0 1 11 12H5.001v-1.466a.25.25 0 0 0-.41-.192l-2.36 1.966a.25.25 0 0 0 0 .384l2.36 1.966a.25.25 0 0 0 .41-.192V13h6a5 5 0 0 0 4.48-7.223Z"/>
                  <path d="M9 5.5a.5.5 0 0 0-.854-.354l-1.75 1.75a.5.5 0 1 0 .708.708L8 6.707V10.5a.5.5 0 0 0 1 0v-5Z"/>
                </svg>):(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
                  <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                </svg>)}
                </button>
      </div>

      <div className="fixed inset-x-3 z-20 ">

        <Progress setIndex={setIndex} index={index} length={time.length}/>

      </div>
      <div className="fixed z-1 inset-0">
        <Swipe {...props}/>
      </div>
    </div>)
}
