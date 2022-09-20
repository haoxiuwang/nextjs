import {useState} from "react"

export default function Test() {
  const [detail,setDetail] = useState(false)
  if(detail)
  return(<div onClick={()=>setDetail(!detail)} className="relative h-[200vh] bg-sky-400">
    <div className="border-skey-100 border-1 border-solid h-[50px] w-[100%] text-white absolute inset-x-1 bottom-[30px] text-center">I Will Love You Soon!</div>
  </div>)
  return(
  <div>
  <div  onClick={()=>setDetail(!detail)} className="fixed inset-0 flex place-content-center place-items-center">
    Hello
  </div>
  </div>
  )
}
