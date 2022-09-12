import { useState, useEffect } from "react"
import Episode from "../components/episode.js"
import Link from "next/link"
import Image from 'next/image'

export default function Home() {
  const [list,setList] = useState([])
  const [selected,setSelected] = useState(null)
  useEffect(()=>{
    fetch('/meta.json').then(function (res) {

      return res.json()
    })
    .then(function (data) {
      setList(data)
    })
  },list)
  if(selected)
  return (<Episode {...{...selected,setSelected}} />)
  return (
    <div className="select-none">
      <div className="mt-[50px] mx-[25px] font-bold">
        <h3>Listening List</h3>
        <div className="font-light">
          TV Series or Readings Studied for Listening.
        </div>
      </div>
      <div>
        {list.length>0&&list.map(({name,dir_name,children},i)=>{

          return (
          <div key={i}>

            {children.map(({season,episodes},i)=>(
              <div className="flex content-start m-[25px]" key={i}>
                <div className="mr-3 w-[100px] h-[100px]">
                <Image
                  src={`/series/${dir_name}/cover.jpg`}
                  alt={`${name} cover image`}
                  width={100}
                  height={100}
                />
                </div>
                <div>
                <div className="mr-[20px] font-semibold"> {name}</div>
                <span>Season {season}</span>

                  <div className="flex flex-wrap flex-row items-center content-start">
                  {episodes.length>0&&episodes.map(({episode,count,path},m)=>(
                    <span onClick={()=>setSelected({serie:name,season,episode,count,path:`/series/${dir_name}/${path}`,dir_name})} className="mr-3" key={m}>
                      {episode}
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
