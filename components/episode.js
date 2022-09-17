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
  useEffect(()=>setHeight(window.innerHeight),[])
  useEffect(()=>{
    if (!episode)return
    var url = `${path}/source.json`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>setParts({parts:data,error0:null}))
    .catch((error)=>setParts({parts:null,error0:error}))
  },[])

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

  var part = parts[index]
  return(<Card {...{height,serie,season,episode,count,path,dir_name,part:index,texts:parts[index],setPart:setIndex}} />)
}
