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


export default function ActivityName({ data }) {

  const [open, setOpen] = useState(false)
  
  const [activityDetails, setActivityDetails] = useState({})

  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  if (data == undefined) return <Skeleton active style={{ marginTop: '3%' }} />
  return (
    <main>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={data.metaDescription}></meta>
        <meta property='og:image' content={data.thumbnail}></meta>
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
          <div style={{height:isMobile?"auto":450, width: '100%', position:'relative'}}>

          <Image src={data.headerImage} alt={data.name}
            style={{ objectFit: 'cover' }}
            fill
            loading='lazy'
          />
          </div>
          
        </div>

        <div 
        className='backCurve5'
        style={{ display: 'flex', justifyContent: 'center', }} id='packageContainer'>
          <div style={{ width: '90%', display: isMobile?"block":"flex", gap: '4%', marginTop: '3%' }}>
            <div
             style={{ width: isMobile?"100%":"70%", background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15 }}>
              <h1>About {data.name}</h1>
              <Divider style={{ margin: "0", backgroundColor: style.lightGrey, height: 1 }} />
              <String2Html id={'aboutIsland'} string={data.about} />

            </div>

            <div style={{ width: isMobile?"100%":'30%', background: 'white', padding: '3% 0 0 0', height: 'fit-content', flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
              <h2 style={{ textAlign: "center" }}>Activities in {data.name}</h2>
              <Divider style={{ backgroundColor: style.lightGrey, height: 1 }} />
              {data.data.map((item, i) => (
                <div
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-duration="2000"
                  key={i} id='cardImage' 
                  style={{ borderRadius: 10, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: boxShadow, width: "100%", marginBottom: i!=(data.data.length-1)?30:0 }}>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    // preview={false}
                    width={"100%"}
                    style={{ objectFit: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                  <h2 style={{ padding: '5% 5% 0 5%', textAlign: 'center' }}>{item.name}</h2>

                  <Divider>
                    <p style={{ padding: '2px 10px', borderRadius: 20, border: `solid 1px ${style.lightGrey}` }}>{item.duration}</p>
                  </Divider>

                  <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: style.secondaryColor }}>
                      <h1 style={{ textAlign: 'center', color: 'white' }}>₹{item.price}</h1>
                    </div>
                    <div
                      onClick={() => {
                        setOpen(true);
                        setActivityDetails({
                          name:item.name,
                          duration:item.duration,
                          price:item.price
                        })
                      }}
                      style={{ height: 50, width: '50%', background: style.primaryColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                      <p style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Book Now</p>
                    </div>
                  </div>

                </div>

              ))}
            </div>
          </div>
        </div>

      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={[]}
      >
        <h2>Booking:</h2>
        <Divider style={{ margin: '1%' }} />
        <h1 style={{ margin: '1% 0' }}>₹{activityDetails.price}</h1>
        <ContactForm 
        to={'activity'} 
        packageName={data.name}
        packageDetail={`
          <p>Activity Name: ${activityDetails.name}</p>
          <p>Price: ₹${activityDetails.price}</p>
          <p>Duration: ${activityDetails.duration}</p>
        `}
        />
      </Modal>

    </main>
  )
}

export const getStaticPaths = async () => {
  const entries = await db.collection("activity").get()
  const paths = entries.docs.map(entry => ({
    params: {
      ActivityName: entry.data().slug
    }
  }));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { ActivityName } = context.params;
  // console.log(packageGroupName)
  const res = await db.collection("activity").where("slug", "==", `/activity/${ActivityName}`).get()
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
