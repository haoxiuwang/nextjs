
import {useState} from "react"
export default function LocalL({local,texts}) {
  const [index,setIndex] = useState(-1)


  return (
    <div className="relative m-3 mt-9">
      {index>-1&&(<div onClick={()=>setIndex(-1)} className="fixed inset-0 flex place-content-center place-items-center bg-slate-100/80">
        <div className="w-[70%] rounded p-9 bg-sky-200">
          <span>{texts[index].en}</span>
        </div>
      </div>)}
      <div className="mt-1 text-slate-700 select-none">
        <ul className="block">
        {
          local.map((item,i)=>{
            return(
            <li onClick={()=>{
              if(item.index!==undefined)
              setIndex(item.index)
            }} key={i} className="block space-y-4">
              <span className="semibold">{item.en+": "}</span><span>{item.zh}</span>
            </li>
            )
          })
        }
        </ul>
      </div>
    </div>
  )
}
