import Layout from '../components/layout'

function Page({ data }) {
  console.log('server-side');
  return (
    <Layout>
    <div> {data.content}</div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
  var data = { content: 'hello' }
  console.log({data});
  // Pass data to the page via props
  return { props: {data} }
}

export default Page
