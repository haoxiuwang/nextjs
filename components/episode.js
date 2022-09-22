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
    var url = `${path}/source.json`
    var _data = window.localStorage.getItem(url.replaceAll("/","_"))
    if(_data){
      _data = JSON.parse(_data)
      setParts(_data)
    }
    else
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>setParts({parts:data,error0:null}))
    .catch((error)=>setParts({parts:null,error0:error}))
  },[])
  useEffect(()=>{
    var url = `${path}/source.json`
    window.localStorage.getItem(url.replaceAll("/","_"),JSON.stringify(parts))
  },[parts])
  const [state, dispatch] = useReducer(reducer, {last:-1});

  useEffect(()=>dispatch({type:index}),[index])

  function list(count) {
    var i = 0
    var arr = []
    while (i<count) {
      arr.push(((m)=>{
        return(<button onClick={()=>setIndex(m)} key={m} className={`button-17 ${state.last==m?"current":""}`}>{m}</button>)
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
  <div className="fixed inset-0 select-none" style={{minHeight:height+"px"}}>

          <div className="fixed inset-0 z-2 bg-sky-800/30"></div>
          <div className="grid grid-rows-4 place-content-center place-items-center">
            {[0,1,2,3].map((item)=><div key={item}><img className="w-[100%]" src={`${path}/covers/${item}.jpg`} /></div>)}
          </div>

          <div className={`fixed inset-x-0 bottom-12 flex flex-wrap place-items-center space-x-4 space-y-1 m-9 place-content-center`}>
            {list(count)}
            <button onClick={()=>setSelected(null)} className="button-17">返回</button>
          </div>

    </div>

  )}

  var part = parts[index]
  return(<Card {...{height,serie,season,episode,count,path,dir_name,part:index,texts:parts[index],setPart:setIndex,setParts,parts}} />)
}
