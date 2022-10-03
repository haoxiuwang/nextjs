
export default function Progress({setIndex,index,length}) {

  return(
      <div className="h-[25px] bg-sky-100/50 fixed top-3 inset-x-6 rounded-full" >
          <div className="absolute inset-0 z-50" onClick={(e)=>{
            var {clientX,target} = e
            var {offsetWidth,offsetLeft} = target.parentNode
            var x = clientX-offsetLeft
            var ratio = x/offsetWidth
            console.log({offsetLeft,offsetWidth});
            // var ratio = e.screenX/window.innerWidth

            var value = Math.floor(length*ratio)
            if(value>length-1)value=length-1

            setIndex(value)
          }}></div>
          <div style={{width:index*100/length+"%"}} className={`absolute top-0 z-1 left-0 bg-sky-600/10 h-[24px] rounded-full`}></div>
        </div>

  )
}
