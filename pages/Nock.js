import {useState} from "react"

export default function Test() {
  const [detail,setDetail] = useState(false)
  var rnd = Math.floor(Math.random()*3)

  return(
  <div className="">
    <div>如果您已经有自己最喜爱的电视剧，请直接搜索</div>
    <div>如果您不知道从何开始，求从我们所推荐的资源开始</div>
  </div>
  )
}
