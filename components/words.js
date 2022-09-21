
import {useState, useEffect, useRef} from "react"

// import getWords from '../libs/helper'
export default function Words({height,texts,index,str,setFav,_key}) {
  //_key = "_series_Mom_01x12_0"
  _key = _key.replaceAll("/","_")

  const [mem,setMem] = useState(false)
  const [words] = useState(str.split(' '))
  const [word,setWord] = useState({en:"",zh:""})
  const [notes,setNotes] = useState([])
  const [local,setLocal] = useState([])
  const [count,setCount] = useState(6)
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  useEffect(()=>{
    var data = window.localStorage.getItem(_key)
    setLocal(data?JSON.parse(data):[])
  },[])
  useEffect(()=>{
    var data = JSON.stringify(local)

    window.localStorage.setItem(_key,data)
    setWord({en:"",zh:""})
  },[local])
  useEffect(()=>setNotes([]),[word.en])


  return (
      <div ref={ref2} className="h-full m-3 mt-16">
        <div className="fixed left-3 top-3 right-3 flex place-content-between">
          <svg onClick={()=>setFav(false)} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-arrow-left text-sky-400 font-bold" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
        </div>

        <div>
          <div className="border-b-2 border-sky-700 border-solid my-6 mb-12 grid grid-cols-[min-content_1fr_min-content] gap-1">
            <span className="text-center mr-2" onClick={()=>{
                setNotes([])
                fetch(`https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&nums=10&is_need_mean=1&word=${word.en}`)
                .then((res)=>res.json())
                .then((data)=>{
                  var str = data.message[0].paraphrase.split(/[，；,; ]/)
                  setNotes(str)
                })
                .catch((e)=>console.log(e))
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-book text-sky-800" viewBox="0 0 16 16">
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
              </svg>
            </span>
            <input value={word.en} onChange={(e)=>setWord({en:e.target.value,zh:""})}/>
            <span onClick={()=>setWord({en:"",zh:""})} className="mx-2">{word.en.length>0&&<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>}
            </span>
          </div>

          {word.en.length>0&&
            (<div className="border-b-2 border-sky-700 border-solid my-3 grid grid-cols-[1fr]">
              <input className="w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-sky-600 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6" placeholder="中文意思..." value={word.zh} onChange={(e)=>setWord({en:word.en,zh:e.target.value})}/>
            </div>)
          }

        </div>
      {notes.length>0&&word.en.length>0&&(notes[0]==""?(
        <div className="text-rose-400">Sorry!</div>):(<div className="bg-sky-100  p-3">
          {
            notes.map((item,i)=>(
              <span onClick={()=>setWord({en:(word.en).trim(),zh:word.zh+" "+item})} className="inline-block mr-2 rounded ring-1 bg-white p-1 px-2" _key={i}>{item}</span>
            ))
          }
        </div>))
      }
        <div>
          {
            words.map((item,i)=>(
              <span onClick={()=>setWord({en:(word.en+" "+item.toLowerCase()).replace(/[\,\.\;\?\"]/g," ").trim(),zh:word.zh})} className="inline-block mr-2" _key={i}>{item}</span>
            ))
          }
        </div>
        <div className="text-slate-600">
          {texts[index].zh}
        </div>

          {word.en.length>0&&(
        <div onClick={()=>{
            if(word.en=="")return
            if(!mem)
            word.index = index
            setLocal([word,...local])
          }} className="my-9 text-center bg-sky-200 text-sky-800 w-full rounded ring-1">
          收藏
        </div>)}
        <div className="mt-6 pointer-events-auto w-full rounded-lg bg-white p-4 text-[1rem] leading-5 shadow-xl shadow-black/5 hover:bg-slate-50 ring-2 ring-skey-600">
          <div className="flex justify-between">
            <div className="font-medium text-slate-900">{mem?"全部收藏":"本语句收藏"}</div>
            <svg onClick={()=>setMem(!mem)} className="h-5 w-5 flex-none" fill="none"><path fillRule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z" fill={mem?"#38c3f8":"#aaa"}></path></svg>
          </div>
          <div className="mt-1 text-slate-700 select-none">
            <ul className="block">
            {
              local.map((item,i)=>{
                if(!mem&&item.index!=index)return
                return(
                <li onClick={()=>setWord(item)} onContextMenu={()=>{
                  var arr = [...local]
                  arr.splice(i,1)
                  setLocal(arr)
                }} _key={i} className="block space-y-4">
                  <span className="semibold">{item.en+": "}</span><span>{item.zh}</span>
                </li>
                )
              })
            }
            </ul>
          </div>
          <div className="mt-6 font-medium text-slate-900">
            {mem?local.length:local.filter((item,i)=>item.index==index).length} words
          </div>
        </div>

        </div>
  )
}
