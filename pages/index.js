import React, { useState, useEffect } from 'react'
import { Button, Carousel, Col, Icon, Row, Space } from 'antd'
import { db } from '../firebase'
import Head from 'next/head'
import style from '@/styles/component.module.scss'
import { mobile, homepageImage, Wave } from '@/components/variables'
import dynamic from 'next/dynamic'
import SHome from '@/components/skeleton/SHome'

const Slider = dynamic(()=>import('../components/Slider'), {ssr:false, loading:()=><SHome/>})

export default function Home({data}) {
  
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  if (data == undefined) return <SHome/>

  return (
    <main>
      <Head>
        <title>{data.title}</title>
        <meta name='description' content={data.metaDescription} />
        <meta name="keywords" content={data.metaTag} />
        
      </Head>
      <div style={{overflowX:'hidden'}}>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

          <div style={{ transform: "rotate(180deg)", position: 'absolute', zIndex: 2, width: '100%', }}>
            <Wave />
          </div>
          <Slider banner={data.banner}/>
        </div>

        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Homepage content</p>
        </div>

      </div>
    </main>
  )
}

export const getStaticProps = async () => {
  const res = await db.doc(`pages/homepage`).get()
  if (res.data() == undefined) {
      return {
          notFound: true
      };
  }

  return {
      props: {
          data: res.data(),
        },
      revalidate: 60,

  }

}
