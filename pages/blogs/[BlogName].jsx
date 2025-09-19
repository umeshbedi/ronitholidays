import React, { useEffect, useState } from 'react'
import { db } from '@/firebase'
import style from '@/styles/component.module.scss'
import WaveSvg from '@/components/WaveSvg'
import Head from 'next/head'
import { Button, Divider, Modal, Skeleton } from 'antd'
import String2Html from '@/components/String2Html'
import Link from 'next/link'
import { boxShadow, mobile } from '@/components/variables'
import ContactForm from '@/components/ContactForm'
import Image from 'next/image'
import { useRouter } from 'next/router';

export default function BlogName({ data }) {

  const [open, setOpen] = useState(false)

  const [blogDetails, setBlogDetails] = useState({})

  const [isMobile, setIsMobile] = useState(false)

  const router = useRouter();
  const siteUrl = 'https://ronitholidays.com';
  const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : router.asPath.split('?')[0].split('#')[0]}`;

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  if (data == undefined) return <Skeleton active style={{ marginTop: '3%' }} />

  return (
    <main>
      <Head>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <meta name="keywords" content={data.metaKeywords} />
        <meta property='og:image' content={data.image} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <div>
        <div
          data-aos="fade-down"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="2000"
          style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ width: '100%', height: '68px', position: 'absolute' }}>
            <WaveSvg fill={style.lightGrey} />
          </div>
          <div style={{ height: isMobile ? "auto" : 450, width: '100%', position: 'relative' }}>

            <Image src={data.headerImage} alt={data.headerImage}
              style={{ objectFit: 'cover' }}
              fill
              loading='lazy'
            />
          </div>

        </div>

        <div
          className='backCurve5'
          style={{ display: 'flex', justifyContent: 'center', }} id='packageContainer'>
          <div style={{ width: '100%', display: isMobile ? "block" : "flex", gap: '4%', marginTop: '3%' }}>
            <div
              style={{ width: isMobile ? "100%" : "100%", background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', alignItems:'center', gap: 15 }}>
              <h1>About {data.name}</h1>
              <Divider style={{ margin: "0", backgroundColor: style.lightGrey, height: 1 }} />
              <Image src={data.image} alt={data.headerImage}
              style={{ objectFit: 'cover' }}
              width={500}
              height={400}
              loading='lazy'
            />
                 <p>{data.name}</p>
              <String2Html id={'aboutIsland'} string={data.about} />

            </div>

          </div>
        </div>

      </div>

    </main>
  )
}

export const getStaticPaths = async () => {
  const entries = await db.collection("blogs").get()
  const paths = entries.docs.map(entry => ({
    params: {
      BlogName: entry.data().slug
    }
  }));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { BlogName } = context.params;
  const res = await db.collection("blogs").where("slug", "==", `/blogs/${BlogName}`).get()
  const entry = res.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  if (entry.length == 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: entry[0]
    },
    revalidate: 60,

  }

}
