import React, {useEffect,useState} from 'react'

export default function Myfetch () {
  var [data,setData] = useState(null)
  useEffect(()=>{
    async function fetchdata() {

        var res = await fetch('/api/hello')
        var files = await res.json()
        setData(files.data)
    }
    if(data)return;
    fetchdata()
  },[data])
  if(!data)return 'nothing'
  return (

    <div><ul>{data.map((f,i)=>{
      return(<li key={i}>{f}</li>)
    })}</ul></div>

  )
}
