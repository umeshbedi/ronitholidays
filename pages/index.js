import React, { useState, useEffect } from 'react'
import { Button, Carousel, Col, Icon, Row, Space } from 'antd'
import { db } from '../firebase'
import Head from 'next/head'
import style from '@/styles/component.module.scss'
import { mobile, homepageImage, Wave } from '@/components/variables'
import dynamic from 'next/dynamic'
import SHome from '@/components/skeleton/SHome'

// import Packages from '@/components/homepage/Packages'
// import Island from '@/components/homepage/Island'
// import FerryCarousel from '@/components/homepage/Ferries'
// import ActivityCarousel from '@/components/homepage/Activities'
// import Authorities from '@/components/homepage/Authorities'
// import Testimonials from '@/components/homepage/Testimonials'
// import Offer from '@/components/homepage/Offer'

const Slider = dynamic(() => import('../components/Slider'), { ssr: false, loading: () => <SHome /> })
const Packages = dynamic(() => import('@/components/homepage/Packages'), { ssr: false, loading: () => <SHome /> })
const Island = dynamic(() => import('@/components/homepage/Island'), { ssr: false, loading: () => <SHome /> })
const FerryCarousel = dynamic(() => import('@/components/homepage/Ferries'), { ssr: false, loading: () => <SHome /> })
const ActivityCarousel = dynamic(() => import('@/components/homepage/Activities'), { ssr: false, loading: () => <SHome /> })
const Offer = dynamic(() => import('@/components/homepage/Offer'), { ssr: false, loading: () => <SHome /> })
const Authorities = dynamic(() => import('@/components/homepage/Authorities'), { ssr: false, loading: () => <SHome /> })
const Testimonials = dynamic(() => import('@/components/homepage/Testimonials'), { ssr: false, loading: () => <SHome /> })
const Trending = dynamic(() => import('@/components/homepage/Trending'), { ssr: false, loading: () => <SHome /> })



export default function Home({
  data,
  packageList,
  activityData,
  ferryData,
  islandData,
  testimonials,
  offerItems
}) {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  if (data == undefined || packageList == undefined || activityData == undefined || ferryData == undefined || islandData == undefined || testimonials == undefined) return <SHome />

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

        {/* <Trending offerItems={offerItems}/> */}

        {/* <Packages Package={packageList} /> */}

        <Island data={islandData} />

        <FerryCarousel ferryData={ferryData} />

        <ActivityCarousel activityData={activityData} />

        <Offer />

        <Testimonials testimonialsData={testimonials} />

        <Authorities />


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
  let offerItems = []

  for (let i = 0; i < pkgId.length; i++) {
    const pkgd = await db.doc(`package/${pkgId[i].id}`).collection("singlePackage").limit(4).get();
    const pkgdata = pkgd.docs.map((d) => {
      const data = d.data()
      return { title: data.title, thumbnail: data.thumbnail, slug: data.slug }
    })
    packageList.push(pkgdata)

    const offer = await db.doc(`package/${pkgId[i].id}`).collection("singlePackage").where("isOffer","==", true).get();
    const offerData = offer.docs.map((d) => {
      const data = d.data()
      return { title: data.title, thumbnail: data.thumbnail, slug: data.slug }
    })
    offerItems.push(offerData)
  }

  //Getting Island Data
  const island = await db.collection("island").get();
  const islandData = island.docs.map((isl) => {
    const data = isl.data()
    return { name: data.name, slug: data.slug, thumbnail: data.thumbnail }
  })

  //Getting Activity
  const actvty = await db.collection("activity").get();
  const activityData = actvty.docs.map((act) => {
    const data = act.data()
    return { name: data.name, thumbnail: data.thumbnail, slug: data.slug }
  })

  //Getting Ferry
  const ferry = await db.collection("ferry").get();
  const ferryData = ferry.docs.map((fer) => {
    const data = fer.data()
    return { name: data.name, thumbnail: data.image, slug: data.slug }
  })

  //Getting Testimonials
  const testimonials = await db.doc(`pages/testimonials`).get()


  // console.log(offerItems)

  return {
    props: {
      data: res.data(),
      packageList,
      islandData,
      activityData,
      ferryData,
      offerItems,
      testimonials: testimonials.data().testimonials
    },
    revalidate: 60,

  }

}
