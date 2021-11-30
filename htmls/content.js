import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Content({ch}) {
  var Router = useRouter()
  
  return (ch.map((c,i)=>{
    return (<p key={i}><Link href={Router.pathname+"/"+c.f}><a>{c.t}</a></Link></p>)
  }))
}
