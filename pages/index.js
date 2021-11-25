import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
export default function Home() {
  var R = useRouter()
  useEffect(()=>{
    R.push('/docs')
  },[])
  return (<></>)
}
