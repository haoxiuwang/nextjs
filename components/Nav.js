import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Nav() {
  var Router = useRouter()

  var arr = [];
  var i = 0;
  var l = Router.pathname.length;
  while(true){
    var m = Router.pathname.indexOf('/',i+1)

    if(m===-1)m = l;
    var s = Router.pathname.substring(i+1,m)
    var t = Router.pathname.substring(0,m)
    arr.push({s,t});
    if(m === l)break;
    i = m;
  }

  return (<ul>
  {  arr.map((x,i)=>{
      return (<li key={i}><span>/</span><Link href={x.t}><a>{x.s}</a></Link></li>)
    })}

    </ul>)
}
