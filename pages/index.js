import React, { useState, useEffect } from 'react'
import { Button, Carousel, Col, Icon, Row, Space } from 'antd'
import { db } from '../firebase'
import Head from 'next/head'
import style from '@/styles/component.module.scss'
import { mobile, homepageImage, Wave } from '@/components/variables'
import dynamic from 'next/dynamic'
import SHome from '@/components/skeleton/SHome'
import Packages from '@/components/homepage/Packages'
import Island from '@/components/homepage/Island'
import FerryCarousel from '@/components/homepage/Ferries'
import ActivityCarousel from '@/components/homepage/Activities'
import Authorities from '@/components/homepage/Authorities'
import Testimonials from '@/components/homepage/Testimonials'

const Slider = dynamic(() => import('../components/Slider'), { ssr: false, loading: () => <SHome /> })

export default function Home({ data, packageList, activityData, ferryData, islandData }) {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  if (data == undefined) return <SHome />

  return (
    <main>
      <Head>
        <title>{data.title}</title>
        <meta name='description' content={data.metaDescription} />
        <meta name="keywords" content={data.metaTag} />

      </Head>
      <div style={{ overflowX: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ transform: "rotate(180deg)", position: 'absolute', zIndex: 2, width: '100%', }}>
            <Wave />
          </div>
          <Slider banner={data.banner} />
        </div>
        
        <Packages Package={packageList} />
        
        <Island data={islandData}/>
        
        <FerryCarousel ferryData={ferryData}/>
        
        <ActivityCarousel activityData={activityData}/>
        
        <Testimonials/>

        <Authorities/>

        
      </div>
    </main>
  )
}

export const getStaticProps = async () => {
  const res = await db.doc(`pages/homepage`).get();

  //Getting Package Data
  const pkg = await db.collection("package").get();
  const pkgId = pkg.docs.map((pkg, i) => {
    return { id: pkg.id }
  })

  let packageList = []

  for (let i = 0; i < pkgId.length; i++) {
    const pkgd = await db.doc(`package/${pkgId[i].id}`).collection("singlePackage").limit(4).get();
    const pkgdata = pkgd.docs.map((d) => {
      const data = d.data()
      return { title: data.title, thumbnail: data.thumbnail, slug: data.slug }
    })
    packageList.push(pkgdata)
  }

  //Getting Island Data
  const island = await db.collection("island").get();
  const islandData = island.docs.map((isl)=>{
    const data = isl.data()
    return {name:data.name, slug:data.slug, thumbnail:data.thumbnail}
  })

  //Getting Activity
  const actvty = await db.collection("activity").get();
  const activityData = actvty.docs.map((act)=>{
    const data = act.data()
    return {name:data.name, thumbnail:data.thumbnail, slug:data.slug}
  })
  
  //Getting Ferry
  const ferry = await db.collection("ferry").get();
  const ferryData = ferry.docs.map((fer)=>{
    const data = fer.data()
    return {name:data.name, thumbnail:data.image, slug:data.slug}
  })

  

  return {
    props: {
      data: res.data(),
      packageList,
      islandData,
      activityData,
      ferryData
    },
    revalidate: 60,

  }

}
