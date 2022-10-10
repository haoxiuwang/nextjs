import {useState} from "react"

export default function Search({setSearch,parts}) {
  const [word,setWord] = useState("")
  const [list,setList] = useState([])
  console.log({list});
  return (
    <div onContextMenu={()=>setSearch(false)} className="fixed inset-0 bg-sky-100">
      <div className="m-3">
      <input className="appearance-none w-full border-2 border-solid border-slate-300 text-base text-sky-600 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6" onBlur={(e)=>{
        setList(parts.reduce((arr,part,i)=>{

          var _arr = part.filter((item,m)=>{
            return item.en.indexOf(e.target.value)>-1
          })

          if(_arr.length>0){
            console.log({arr,_arr});
            var _x = [...arr,..._arr]
            // console.log({_x});
            return _x
          }
          else return[...arr]
        },[]))
        setWord(e.target.value)
      }}/>
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
