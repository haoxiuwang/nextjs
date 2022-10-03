import {useState} from "react"
import Progress from "../components/progress"
export default function Mock() {
  return (
    <div onClick={(e)=>{
      var {clientX,target} = e
      var {offsetWidth,offsetLeft} = target
      var x = clientX-offsetLeft
      console.log(e);
    }} className="fixed inset-20 bg-sky-100">

    </div>
  )
}
