
import {useState,useEffect,useRef} from "react"
export default function Local() {

  const download = useRef(null)
  return(
    <div className="fixed inset-0 flex space-y-5 flex-col place-content-center place-items-center">
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
          window.showOpenFilePicker()
          .then(([fileHandle])=>fileHandle.getFile(),()=>console.log("err"))
          .then((file)=>new Promise((resolve)=>{
            var reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = function (event) {
              resolve(event.target.result)
            }
          })
          .then((buf)=>{
            var local = new TextDecoder("utf-8").decode(buf)
            local = JSON.parse(local)
            console.log(local);
            // var keys = Object.keys(local)
            // console.log(keys);
            // keys.forEach((key, i) => {
            //   console.log(key,local[key]);
            //   return
            //   setItem(key,local[key])
            // });

          }))

        }}>加载</div>

      </div>
      <a className="hidden" ref={download}>download</a>
    </div>
  )
}
