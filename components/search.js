import {useState} from "react"

export default function Search({setSearch,parts}) {
  const [word,setWord] = useState("")
  const [list,setList] = useState([])
  console.log({list});
  return (
    <div onContextMenu={()=>setSearch(false)} className="fixed inset-0 bg-sky-100 overflow-y-auto">
      <div className="p-6 bg-white">
      <div className="h-14 p-3 flex place-content-center place-items-center border-2 border-solid border-slate-300">
      <input type="text" autoFocus="autofocus" className="appearance-none w-full text-base text-sky-600 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6" onBlur={(e)=>{
        setList(parts.reduce((arr,part,i)=>{

          var _arr = part.filter((item,m)=>{
            if(e.target.value.length==0)return true
            return item.en.toLowerCase().indexOf(e.target.value.toLowerCase())>-1
          })

          if(_arr.length>0){

            var _x = [...arr,..._arr]

            return _x
          }
          else return[...arr]
        },[]))
        setWord(e.target.value)
      }}/>
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
