
import {useState,useEffect,useRef} from "react"
export default function Local() {
  const [local,setLocal] = useState(null);
  const download = useRef(null)
  const [fresh,setFresh] = useState(false)
  const input = useRef(null)
  useEffect(()=>{
    setLocal({...localStorage})
  },[fresh])
  console.log(local);
  return(
    <div className="fixed inset-0 flex space-y-5 flex-col place-content-center place-items-center">
      <div className="h-[50%] m-5 bg-slate-100 p-5">
        {
          local&&Object.keys(local).map((k,i)=>(
            <div key={k} className="mb-5 text-left">
              <div className="font-bold">{k}</div>
              <div>{local[k]}</div>
            </div>
          ))
        }
        </div>

      <div className="text-center">把网页数据保存到本地文件“local.md”,或把"local.md"文件上传到网页。</div>
      <div className="space-x-3 flex place-content-center place-items-center">
        <div className="rounded bg-slate-100 py-2 px-5" onClick={()=>{
          var data = JSON.stringify(localStorage)
          var _download = download.current
          _download.download = "local.json"

          let blob = new Blob([data])
          _download.href = URL.createObjectURL(blob)
          _download.click()
        }}>保存</div>
        <div className="rounded bg-slate-100 py-2 px-5" onClick={()=>{
          input.current.click()
        }}>加载</div>
        <div className="rounded border-solid border-2 border-bg-slate-100 py-2 px-5" onClick={()=>{
          Object.keys(local).forEach((item, i) => {
            localStorage.removeItem(item)
          });
          setFresh(!fresh)
        }}>清除</div>
      </div>
      <input className="hidden" type="file" ref={input} onChange={()=>{
        var file = input.current.files[0]
        new Promise((resolve)=>{
          var reader = new FileReader()
          reader.readAsText(file)
          reader.onload = function (event) {
            resolve(event.target.result)
          }})
        .then((buf)=>{
          if(!buf)return
          var _local = JSON.parse(buf)

          var keys = Object.keys(_local)

          keys.forEach((key, i) => {
            if(typeof(_local[key])!="string"){
              alert("alert!")
              return
            }
            localStorage.setItem(key,_local[key])
          });
          setFresh(!fresh)
        })

      }}/>
      <a className="hidden" ref={download}>download</a>
    </div>
  )
}
