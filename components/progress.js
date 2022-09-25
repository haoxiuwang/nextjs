
export default function Progress({setIndex,index,length}) {

  return(
      <div className="h-[25px] fixed inset-x-0" onClick={(e)=>{
        console.log(e.screenX,window.innerWidth);
        var ratio = e.screenX/window.innerWidth
        console.log({ratio});
        var value = Math.floor(length*ratio)
        if(value>length-1)value=length-1
        console.log({index});
        setIndex(value)
      }}>
        <div className="mt-[1px] relative">
          <div style={{width:index*100/length+"%"}} className={`absolute top-0 left-0 bg-sky-400/10 h-[24px] rounded-r-full`}></div>
        </div>
      </div>
  )
}
