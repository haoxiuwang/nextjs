
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
        <div className="mt-[1px] bg-rose-100">
          <div style={{width:index*100/length+"%"}} className={`mr-auto bg-rose-400  h-[3px]`}></div>
        </div>
      </div>
  )
}
