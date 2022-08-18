import { useState, useEffect } from "react"


export default function Part() {
  const [mode,setMode] = useState(0)
  const [showMode,setShowMode] = useState(false)
  const [timeline,setTimeline] = useState(null)
  const router = useRouter()
  const { eid,pid } = router.query
  const {source,setSource} = useState([])
  useEffect(()=>{
    fetch(`/api/voca?_id=${vid}`)
    .then((res)=>res.json())
    .then((source)=>
      setSource(source)
    )
  },[vid])
  useEffect(()=>{
    fetch(`/voca/${vid}/${pid}.json`)
    .then((res)=>res.json())
    .then((data)=>setTimeline(data))
  },[pid])
  const [blob,setBlob] = useState(null)
  useEffect(()=>{
    fetch(`/voca/${vid}/${pid}.mp3`)
    .then((res)=>res.blob())
    .then((data)=>{
      setBlob(data)
    })
  },[pid])
  useEffect(()=>setPlayer(new Audio()),[blob])
  function list() {
    var i = 0
    var arr = [
      "英文",
      "中英对照"
    ],
    arr1 = [];
    while (i<arr.length) {
      arr1.push(<div key={i} onClick={()=>setMode(i)}>arr[i]</div>)
      i++
    }
    return arr1;
  }
  return (
    <div>
      <div onClick={(item,i)=>}>选择模式</div>
      <div>
        {showMode?(
          <div>
            {list()}
          </div>
        )
        :(
          <div>
            {
              mode==0&&(<Single />)
            }
          </div>
        )
        }
      </div>
    </div>
  )

}

function Single({timeline,items}) {
  useEffect(()=>{
    Player.currentTime = timeline[index].timeSeconds
  },[index,repeat])
  useEffect(()=>{
    Player.ontimeupdate = function () {
      if(player.currentTime > timeline[index+1].timeSeconds-0.8)player.pause()
    }
  },[items])
  return (
    <>
      <div className="single_progress">
        <div style={{margin:auto,width:i*100/items.length+"/100"}}></div>
      </div>
      <div onClick={(e)=>{
        console.log(e)
      }}>
        {items[index]}
      <div>
    <>
  )
}
