import {useState} from "react"

export default function Search({setSearch,parts}) {
  const [word,setWord] = useState("")
  const [list,setList] = useState(parts.reduce((arr,part,i)=>[...arr,...part.filter((item,m)=>true)],[]))

  return (
    <div onContextMenu={()=>setSearch(false)} className="fixed inset-0 bg-sky-100 overflow-y-auto">
      <div className="p-6 bg-white">
      <div className="relative h-14 p-3 flex place-content-center place-items-center border-2 border-solid border-slate-300">
      <span onClick={(e)=>{
        setList(parts.reduce((arr,part,i)=>{

          var _arr = part.filter((item,m)=>{
            if(word.length==0)return true
            return item.en.toLowerCase().indexOf(word.toLowerCase())>-1
          })

          if(_arr.length>0){

            var _x = [...arr,..._arr]

            return _x
          }
          else return[...arr]
        },[]))

      }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-3 bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></span>
      <input onChange={(e)=>setWord(e.target.value)} type="text" autoFocus="autofocus" className="appearance-none w-full text-base text-sky-600 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6" value={word} />
      {word.length>0&&<div onClick={()=>setWord("")} className="w-10 flex flex-col place-content-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg></div>}
      </div>
      </div>
      <ul className="m-3">
        {
          list.length>0&&list.map((item,i)=>(
            <li className="border-solid border-sky-800/30 border-b-2 mt-3">
              {item.en}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
