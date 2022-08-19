import { useState, useEffect } from "react"
import Link from "next/link"

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
          <div className="" key={i}>

            {children.map(({season,episodes},i)=>(
              <div className="serie" key={i}>

                {season!=0?(<span style={{marginRight:"20px"}}> TV Serie: {name}, Season {season} episodes: </span>)
                :(<span style={{marginRight:"20px"}}>Book: {name}</span>)}

                  [
                  {episodes.length>0&&episodes.map((e,m)=>(
                    <span className="item" key={m}>
                      <Link href={`/episode?serie=${name}&season=${season}&episode=${e.episode}&count=${e.count}&path=/series/${dir_name}/${e.path}`}>
                        <a>{e.episode}</a>
                      </Link>
                    </span>
                  ))}
                  ]
              </div>
            ))}
          </div>
        )}
      )}
      </div>
    </div>
  )
}
