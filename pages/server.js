import Layout from '../components/layout'

function Page({ data }) {
console.log(data,'-----');
  return (

    <div><ul>{data.map((f,i)=>{
      return(<li key={i}>{f}</li>)
    })}</ul></div>

  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
  const fs = require('fs');
  const path = require('path');
  var data = fs.readdirSync(path.join(process.cwd(),'pages/docs'))

  // Pass data to the page via props
  return { props: {data} }
}

export default Page
