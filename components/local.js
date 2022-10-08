
import {useState} from "react"
export default function LocalL({local,texts,setIsLocal}) {
  const [index,setIndex] = useState(-1)


  return (
    <div className="relative m-9">
      {index>-1&&(<div onClick={()=>setIndex(-1)} className="fixed inset-0 flex place-content-center place-items-center bg-slate-100/80">
        <div className="w-[70%] rounded p-9 bg-sky-200">
          <span>{texts[index].en}</span>
        </div>
      </div>)}
      <div className="fixed left-3 top-3 right-3 flex place-content-between">
        <svg onClick={(e)=>{
          e.preventDefault()
          setIsLocal(false)
        }} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-arrow-left text-sky-400 font-bold" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
      </div>
      <div className="mt-20 p-9 text-slate-700 bg-sky-200 rounded select-none">
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
