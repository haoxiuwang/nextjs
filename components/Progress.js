
export default function Progress({setIndex,index,length}) {

  return(
      <div className="h-[25px]" onClick={(e)=>{
        var ratio = e.screenX/window.innerWidth
        var value = Math.floor(length*ratio)
        if(value>length-1)value=length-1
        console.log({value,length});
        setIndex(value)
      }}>
        <div className="fixed inset-x-0 top-0 mt-[1px] bg-rose-100">
          <div style={{width:index*100/length+"%"}} className={`mr-auto bg-rose-400  h-[3px]`}></div>
        </div>
      </div>
  )
}
