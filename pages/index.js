import { useState, useEffect } from "react"
import Link from "next/link"
import Image from 'next/image'

export default function Home() {
  const [list,setList] = useState([])
  useEffect(()=>{
    fetch('/meta.json').then(function (res) {

      return res.json()
    })
    .then(function (data) {
      setList(data)
    })
  },list)
  return (
    <div className="container">
      <div style={{marginTop:"50px"}}>
        <h3>Listening List</h3>
        <div>
          TV Series or Readings Studied for Listening.
        </div>
      </div>
      <div>
        {list.length>0&&list.map(({name,dir_name,children},i)=>{

          return (
          <div key={i}>

            {children.map(({season,episodes},i)=>(
              <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",margin:"25px"}}  key={i}>
                <div style={{
                  flex: "100px 0 0",
                  marginRight:"5px",
                  width:"100px",
                  height:"100px"
                }}>
                <Image
                  src={`/series/${dir_name}/cover.jpg`}
                  alt={`${name} cover image`}
                  width={100}
                  height={100}
                />
                </div>
                <div>
                <div style={{marginRight:"20px",fontWeight:"600"}}> {name}</div>
                <span>Season {season}</span>

                  <div className="flex_row_center" style={{justifyContent:"flex-start"}}>
                  {episodes.length>0&&episodes.map((e,m)=>(
                    <span className="item" key={m}>
                      <Link href={`/episode?serie=${name}&season=${season}&episode=${e.episode}&count=${e.count}&path=/series/${dir_name}/${e.path}`}>
                        <a>{e.episode}</a>
                      </Link>
                    </span>
                  ))}
                  </div>
                  </div>
              </div>
            ))}
          </div>
        )}
      )}
      </div>
    </div>
  )
}
