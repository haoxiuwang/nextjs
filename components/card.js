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
    <Words {...{height,texts,index,str:texts[index].en,setFav,path}}/>
  </div>)

  return(
    <div>
      <div className="fixed inset-x-3 z-20 ">
      <Progress setIndex={setIndex} index={index} length={time.length}/>
      <div className="w-full my-[25px] grid grid-cols-[min-content_1fr]">
        <svg onClick={()=>back(-1)} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-arrow-left text-sky-400 font-bold" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        <div className="flex place-content-end">
          <svg onClick={()=>setAuto(!auto)} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className={`bi bi-record-circle ${auto&&"text-sky-400"}`} viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          </svg>
          <span className="ml-3" onClick={()=>setFz(!fz)}>
            {fz?(<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-app" viewBox="0 0 16 16">
              <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z"/>
            </svg>):(<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-app-indicator" viewBox="0 0 16 16">
              <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"/>
              <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            </svg>)}
          </span>

          <svg onClick={()=>setFav(true)} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-bucket ml-3" viewBox="0 0 16 16">
            <path d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527zm9.892 1-1.286 8.574a.5.5 0 0 1-.494.426H4.36a.5.5 0 0 1-.494-.426L2.58 6h10.838z"/>
          </svg>
        </div>
      </div>
    </div>
      <Swipe {...props}/>
    </div>)
}
