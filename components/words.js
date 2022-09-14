
import {useState, useEffect} from "react"
// import getWords from '../libs/helper'
export default function Words({texts,index,str,setFav,path}) {
  var key = path.replaceAll("/","_")
  const [words] = useState(str.split(' '))
  const [word,setWord] = useState({en:"",zh:""})
  const [local,setLocal] = useState([])
  useEffect(()=>{
    var data = window.localStorage.getItem(key)

    setLocal(data?JSON.parse(data):[])
  },[])
  useEffect(()=>{
    var data = JSON.stringify(local)
    window.localStorage.setItem(key,data)
    setWord({en:"",zh:""})
  },[local])

  return (
      <div>
        <div className="fixed left-3 top-3">
          <svg onClick={()=>setFav(false)} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-arrow-left text-sky-400 font-bold" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
        </div>
        <div >
          <div className="border-b-2 border-sky-700 border-solid my-3">
            {word&&(<input value={word.en} onChange={(e)=>setWord({en:e.target.value,zh:""})}/>)}
          </div>
          <div className="border-b-2 border-sky-700 border-solid my-3 flex place-content-start">
            <span className="text-center mr-2" onClick={()=>{
                fetch(`https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&nums=10&is_need_mean=1&word=${word.en}`)
                .then((res)=>res.json())
                .then((data)=>setWord({en:word.en,zh:data.message[0].paraphrase}))
                .catch((e)=>console.log(e))
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-book text-sky-800" viewBox="0 0 16 16">
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
              </svg>
            </span>
            {word&&(<input value={word.zh} onChange={(e)=>setWord({en:word.en,zh:e.target.value})} className=""/>)}
          </div>

        </div>
        <div>
          {
            words.map((item,i)=>(
              <span onClick={()=>setWord({en:(word.en+" "+item).trim(),zh:word.zh})} className="inline-block mr-2" key={i}>{item}</span>
            ))
          }
        </div>
        <div>{texts[index].zh}</div>
        <div onClick={()=>{
          if(word.en=="")return
          setLocal([...local,word])
        }} className="my-9 text-center bg-sky-200 text-sky-800">收藏</div>
        <div>
          <ul>
          {
            local&&local.map((item,i)=>{
              return(
              <li key={i} className="block">
                <span>{item.en}</span><span>{item.zh}</span>
              </li>
              )
            })
          }
          </ul>
        </div>
        </div>
  )
}