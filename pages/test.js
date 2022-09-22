import {useState} from "react"

export default function Test() {
  const [detail,setDetail] = useState(false)
  var rnd = Math.floor(Math.random()*3)

  return(
  <div className="fixed inset-0 flex place-content-center place-items-center">
    <div style={{transform:`rotate(-${rnd}deg)`}} className={`text-center w-full bg-sky-100`} onClick={()=>setDetail(!detail)}>
      Hello
    </div>
  </div>
  )
}
