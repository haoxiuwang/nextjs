import {useState,useRef} from "react"
export default function Storage() {

  const [sure,setSure] = useState(false)
  const inputEl = useRef(null)
  const [upload,setUpload] = useState(false)
  const [id,setId] = useState(false)
  return(
    <div className="text-center mx-3 fixed bg-white z-10 inset-0 space-y-2 flex place-content-center place-items-center">
      {
        !sure?(
          <div className="space-y-2 flex flex-col place-content-center place-items-center">
            <div className="my-12">本页面帮您在设备之间转移个人数据。</div>
            <input ref={inputEl} className="appearence-none border-slate-800 border-b-2 border-solid" placeholder="您的Ids"/>
            <div className="w-[60%] rounded-full bg-sky-100 px-1.5 py-0.5 "
            onClick={()=>{
              setId(inputEl.current.value)
              setSure(true)
              setUpload(true)
            }}>上传</div>
            <div onClick={()=>{
              setId(inputEl.current.value)
              setSure(true)
              setUpload(false)
            }} className="w-[60%] rounded-full border-sky-100 border-2 border-solid px-1.5 py-0.5 ">下载</div>
          </div>
        )
        :(<div className="space-y-2 flex flex-col place-content-center place-items-center">
            <div className="my-12">您确定要{upload?"上传":"下载"}吗？</div>
            <div className="w-[60%] rounded-full bg-sky-100 px-1.5 py-0.5 "
            onClick={()=>{
              setSure(false)
            }}>确定</div>
            <div className="w-[60%] rounded-full border-sky-100 border-2 border-solid px-1.5 py-0.5 "
            onClick={()=>{
              setSure(false)
            }}>取消</div>
          </div>
        )
      }

    </div>
  )
}
