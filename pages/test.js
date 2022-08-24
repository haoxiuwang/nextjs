import {useState} from 'react'

export default function Text() {

  var arr = ["Fantasic_Mr._fox","Martian","Mom","VOA_Making_Of_Nation","White_Collar"]
  const [index,setIndex] = useState(-1)
  console.log(index);
  if(index<0)
  return (
    <div className="test_flex">
      {arr.map((item,i)=>(
        <div style={{margin:"15px"}} key={i} onClick={()=>setIndex(i)}>
          <img width="100" src={`/series/${item}/cover.jpg`} />
        </div>))}
    </div>
  )
  if(index>-1)
  return(<div onClick={()=>setIndex(-1)} className="test_flex"><img width="100" src={`/series/${arr[index]}/cover.jpg`}/></div>)
}
