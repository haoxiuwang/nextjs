export default function Local() {


  return(
    <div className=" bg-sky-100 my-6 p-3 pb-0 select-none rounded outline-3 outline-slate-300 outline-offset-2">
      {local&&local.length>0&&(
      <ul className="block">
      {
        local.map((item,i)=>{
          if(i>count)return
          return(
          <li onClick={()=>setWord(item)} onContextMenu={()=>{
            var arr = [...local]
            arr.splice(i,1)
            setLocal(arr)
          }} _key={i} className="block">
            <span>{item.en}</span><span>{item.zh}</span>
          </li>
          )
        })
      }
      </ul>)}
      {local.length-count>0&&(<div onClick={()=>{
        var diff = local.length-count
        setCount(diff>6?count+6:count+diff)
      }} className="w-full flex place-content-center mx-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
        </svg>
      </div>)}
    </div>
  )
}
