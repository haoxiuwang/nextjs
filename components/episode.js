import { useState, useEffect,useReducer } from "react"
import Card from "./card.js"
function reducer(state,action) {
  var index = action.type
  return {last:index==-1?state.last:index}
}
export default function Episode({ serie,season,episode,count,path,dir_name,setSelected }) {
  
  const [index,setIndex] = useState(-1)
  const [height,setHeight] = useState(0)
  const [{parts,error0},setParts] = useState({parts:null,error0:null})
  useEffect(()=>{
    var handler = (e)=>e.preventDefault()
    document.body.addEventListener("touchmove",handler,{passive:false})
    setHeight(window.innerHeight)
    return ()=>{
      document.body.removeEventListener("touchmove",handler,{passive:false})
    }
  },[])

  useEffect(()=>{
    if (!episode)return
    var url = `${path}/source.json`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>setParts({parts:data,error0:null}))
    .catch((error)=>setParts({parts:null,error0:error}))
  },[episode,path])


  const [{blob,error1},setBlob] = useState({blob:null,error1:null})
  useEffect(()=>{

    if(index<0){
      setBlob({blob:null,error1:null})
      return
    }
    fetch(`${path}/${index}.mp3`)
    .then((res)=>res.blob())
    .then((data)=>setBlob({blob:data,error1:null}))
    .catch((error)=>setBlob({blob:null,error1:error}))
  },[index,path])


  const [{time,error2},setTime] = useState({time:null,error2:null})
  useEffect(()=>{
    if(index<0){
      setTime({time:null,error2:null})
      return
    }
    fetch(`${path}/${index}.json`)
    .then((res)=>res.json())
    .then((data)=>setTime({time:data,error2:null}))
    .catch((error)=>setTime({time:null,error2:error}))
  },[index,path])

  const [state, dispatch] = useReducer(reducer, {last:-1});

  useEffect(()=>dispatch({type:index}),[index])

  function list(count) {
    var i = 0
    var arr = []
    while (i<count) {
      arr.push(((m)=>{
        return <span style={{textDecoration:state.last==m?"underline":"none",textDecorationColor:"gray"}} className="mr-3" onClick={()=>setIndex(m)} key={m}>{m}</span>
      })(i))
      i++
    }
    return arr
  }
  const [player,setPlayer] = useState(null)
  useEffect(()=>{
    if(!player)
    setPlayer(new Audio())
  },[episode,player])
  var center = "flex flex-col place-items-center place-content-center"
  var flex = `${center} h-[${height}px]`
  if (!parts)return(<div style={{height:height+"px"}} className={flex}>loading text data...</div>)
  if (error0)return(<div style={{height:height+"px"}} className={flex}>loading text data error...</div>)
  if(index==-1){

  return (
  <div className="select-none relative" style={{minHeight:height+"px"}}>
    <div className={`grid grid-rows-[1fr_min-content] absolute inset-0`}>
      <div className={center}>
        <div className={`${center} mx-3`}>
          <div>
            <img width="200" alt={`Serie ${serie} cover photo`} src={`/series/${dir_name}/cover.jpg`} />
          </div>
          <div className="text-center my-[25px] font-semibold">{serie}, {season>0&&"Season "+season+", "}Episode {episode}, include {count} parts, please start with one of them</div>
          <div className={`flex flex-row flex-wrap mx-5 place-content-center`}>
            {list(count)}
          </div>
        </div>
      </div>
      <div onClick={()=>setSelected(null)} className={`bg-sky-500 w-full h-[50px] text-gray-200 ${center}`}>Back to Home Page</div>
    </div>
  </div>
  )}
  if (!time)return(<div style={{height:height+"px"}} className={center}>loading time data...</div>)
  if (!blob)return(<div style={{height:height+"px"}} className={center}>loading audio data...</div>)
  if (error1||error2)return(<div style={{height:height+"px"}} className={flex}>time and audio data error...</div>)
  var part = parts[index]

  return(

        blob?(<Card {...{height,texts:part,blob,time,player,back:setIndex,path:`${path}/${index}`}} />)
        :(<div className={flex}>Loading...</div>)

  )

}
