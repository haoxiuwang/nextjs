import { useState, useEffect,useReducer } from "react"

import { useRouter } from 'next/router'
import Link from 'next/link'
function reducer(state,action) {
  var index = action.type
  return {last:index==-1?state.last:index}
}
export default function Episode() {
  const router = useRouter()
  const { serie,season,episode,count,path,dir_name } = router.query

  const [index,setIndex] = useState(-1)
  const [{parts,error0},setParts] = useState({parts:null,error0:null})
  useEffect(()=>{
    if (!episode)return
    var url = `${path}/source.json`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>setParts({parts:data,error0:null}))
    .catch((error)=>setParts({parts:null,error0:error}))
  },[episode])


  const [{blob,error1},setBlob] = useState({blob:null,error1:null})
  useEffect(()=>{
    if(index<0)return
    setBlob({blob:null,error1:null})
    fetch(`${path}/${index}.mp3`)
    .then((res)=>res.blob())
    .then((data)=>setBlob({blob:data,error1:null}))
    .catch((error)=>setBlob({blob:null,error1:error}))
  },[index])


  const [{time,error2},setTime] = useState({time:null,error2:null})
  useEffect(()=>{
    if(index<0)return
    setTime({time:null,error2:null})
    fetch(`${path}/${index}.json`)
    .then((res)=>res.json())
    .then((data)=>setTime({time:data,error2:null}))
    .catch((error)=>setTime({time:null,error2:error}))
  },[index])

  const [state, dispatch] = useReducer(reducer, {last:-1});

  useEffect(()=>dispatch({type:index}),[index])

  console.log({state});
  function list(count) {
    var i = 0
    var arr = []
    while (i<count) {
      arr.push(((m)=>{
        return <span style={{textDecoration:state.last==m?"underline":"none",textDecorationColor:"gray"}} className="item" onClick={()=>setIndex(m)} key={m}>{m}</span>
      })(i))
      i++
    }
    return arr
  }
  const [player,setPlayer] = useState(null)
  useEffect(()=>{
    if(!player)
    setPlayer(new Audio())
  },[episode])

  if (!parts)return(<div className="episode" style={{height:"100vh"}}>loading text data...</div>)
  if (error0)return(<div className="episode" style={{height:"100vh"}}>loading text data error...</div>)
  if(index==-1){
  return (
    <div>
    <div className="episode container" style={{minHeight:"calc(100vh - 80px)"}}>
      <div className="episode">
        <div>
          <img width="200" alt={`Serie ${serie} cover photo`} src={`/series/${dir_name}/cover.jpg`} />
        </div>
        <div style={{textAlign:"center",marginBottom:"25px"}}>{serie}, {season>0&&"Season "+season+", "}Episode {episode}, include {count} parts, please start with one of them:</div>
        <div className="flex_row_center">
          {list(count)}
        </div>
      </div>
    </div>
    <div style={{backgroundColor:"#eceff1",height:"80px"}} className="flex_row_center"><Link href="/"><a>Back to Home Page</a></Link></div>
    </div>
  )}
  if (!time)return(<div className="episode" style={{height:"100vh"}}>loading time data...</div>)
  if (!blob)return(<div className="episode" style={{height:"100vh"}}>loading audio data...</div>)
  if (error1||error2)return(<div className="episode" style={{height:"100vh"}}>time and audio data error...</div>)
  var part = parts[index]

  return(

        blob?(<Card texts={part} blob={blob} time={time} player={player} back={setIndex} />)
        :(<div className="container episode" style={{minHeight:"100vh"}}>Loading...</div>)

  )

}
function Card({texts,blob,time,player,back}) {
  console.log({time,texts});
  const [index,setIndex] = useState(0)
  var value = (100*(1-index/texts.length))+"%"
  const [repeat,setRepeat] = useState(false)
  useEffect(()=>{
    player.src = window.URL.createObjectURL(blob)
  },[blob])
  useEffect(()=>{
    if (index<0){
      if(!player.paused)
      player.pause()
      player.ontimeupdate = null
      back(-1)
      return
    }

    player.ontimeupdate = ()=>{
      if(index==time.length-1)return
      if(player.currentTime>(time[index+1].timeSeconds-0.8))
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
    player.play()
  },[index,repeat])

  return(
    <div>
      <Progress setIndex={setIndex} index={index} length={time.length}/>
      <div onClick={(e)=>{
        console.log({e});
        var n = window.innerHeight*0.2
        var m = window.innerHeight*0.3
        if(e.screenY>window.innerHeight-n)
          setIndex(index==texts.length-1?index:index+1)
        else if (e.screenY<m)
        setIndex(index==0?index:index-1);
        else
        setRepeat(!repeat)

      }} className="episode" style={{minHeight:"calc(100vh - 110px)",padding:"25px"}}>
        {index>-1&&(
        <div className="episode">
          <span>
            {texts[index].en}
          </span>
          <span style={{color:"gray",display:"block"}}>
            {texts[index].zh}
          </span>
        </div>)}
      </div>
      <div style={{backgroundColor:"#eceff1",height:"80px"}} className="flex_row_center" onClick={()=>{
        setIndex(-1)
      }}>Back to Parts</div>

    </div>
  )
}

function Progress({setIndex,index,length}) {
  const [ratio,setRatio] = useState(0)
  useEffect(()=>setRatio(index/length),[index,length])
  return(
    <div onClick={(e)=>{
      var ratio = e.screenX/window.innerWidth
      var value = Math.floor(length*ratio)
      if(value>length-1)value=length-1
      setRatio(ratio)
      setIndex(value)
    }} style={{height:"30px"}}>
      <div style={{backgroundColor:"pink"}}>
        <div style={{width:ratio*100+"%",backgroundColor:"red",height:"3px"}}></div>
      </div>
    </div>
  )
}
