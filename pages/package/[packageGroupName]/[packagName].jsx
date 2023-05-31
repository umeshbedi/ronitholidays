// import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'
import String2Html from '@/components/String2Html'
import { boxShadow, homepageImage, mobile } from '@/components/variables'
import { db } from '@/firebase'
import { ClockCircleFilled, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Carousel, Collapse, Divider, Row, Skeleton, message } from 'antd'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import WaveSvg from '@/components/WaveSvg'
import style from '@/styles/component.module.scss'
import Link from 'next/link'


export default function TermsAndCondition({ data }) {

    const [visible, setVisible] = useState(false);

    const [packageName, setPackageName] = useState(null)
    const [packageDetail, setPackageDetail] = useState(null)

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    const cruize = [
        {name:"Nautika", link:"/ferry/Nautika",thumbnail:"/images/Nautika.jpg"},
        {name:"GreenOcean", link:"/ferry/Green-Ocean-2",thumbnail:"/images/GreenOcean.jpg"},
        {name:"Makruzz.jpg", link:"/ferry/Makruzz",thumbnail:"/images/Makruzz.jpg"},
        
    ]

    function Include({ icon, name }) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image src={icon} alt={name} width={40} height={40} />
                <p >{name}</p>
            </div>
        )
    }

    if (data == undefined) return (<div style={{ height: '30vh', padding: '2%' }}><Skeleton active /></div>)

    return (
        <main>
            <Head>
                <title>{data.title}</title>
                <meta name="description" content={data.metaDescription}></meta>
                <meta name="keywords" content={data.metaTag}></meta>
                <meta property="og:image" content={data.thumbnail}/>
            </Head>
            <div id='packageDiv'>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
                    <div style={{ width: '100%', height: '68px', position: 'absolute', zIndex: 1 }}>
                        <WaveSvg fill={style.lightGrey} />
                    </div>
                    <Carousel autoplay arrows dots={false} draggable speed={3000}
                        prevArrow={<LeftOutlined />}
                        nextArrow={<RightOutlined />}
                    >
                        {
                            data.images.map((item, index) => (
                                <div key={index}>
                                    <div
                                        style={{ height: 400, background: `url(${item})`, backgroundSize: 'cover', cursor: 'pointer' }}
                                        onClick={() => setVisible(true)}
                                    >

                                    </div>
                                </div>
                            ))
                        }

                    </Carousel>

                </div>


                <div 
                className='backCurve5'
                style={{ display: 'flex', justifyContent: 'center', }} id='packageContainer'>
                    <div style={{ width: '90%', display: "flex", gap: '4%', marginTop: '3%', flexDirection:isMobile?"column":"row" }}>
                        <div style={{ width: isMobile?"100%":"65%", background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15 }}>
                            <h1 id='packageTitle'>{data.title}</h1>
                            <h3 id='packageDetail' ><ClockCircleFilled /> {data.subtitle}</h3>
                            <Divider style={{ margin: '2%' }} />

                            <div>
                                <h2>Includes</h2>
                                <div style={{ display: 'grid', gridGap: 20, gridTemplateColumns: `repeat(${isMobile?"2":"4"}, auto)`, marginTop: '3%' }}>
                                    {data.includeIcon.map((item, i)=>(
                                     <Include key={i} icon={item.icon} name={item.name} />
                                    ))}
                                    
                                </div>
                            </div>

                            <Divider style={{ margin: '2%' }} />

                            <h2>Overview</h2>
                            <String2Html id={'overview'} string={data.overview} />

                            <Divider style={{ margin: '2%' }} />

                            <h2>Highlights</h2>
                            <String2Html id={'highlights'} string={data.highlights} />

                            <Divider style={{ margin: '2%' }} />

                            <h2>Travel Journey</h2>
                            <Collapse size='large' defaultActiveKey={0} accordion={true} style={{ background: 'none' }}>
                                {data.travelJourney.map((tj, i) => (
                                    <Collapse.Panel header={<h4>{tj.heading}</h4>} key={i}>
                                        <div>
                                            <p>{tj.content}</p>
                                        </div>
                                    </Collapse.Panel>
                                ))

                                }
                            </Collapse>

                            <Divider style={{ margin: '2%' }} />

                            <h2>Inclusion</h2>
                            <String2Html id={'inclusion'} string={data.inclusion} />

                            <Divider style={{ margin: '2%' }} />

                            <h2>Exclusions</h2>
                            <String2Html id={'exclusion'} string={data.exclusion} />


                        </div>


                        <div style={{ width: isMobile?'100%':'35%', background: 'white', padding: '3%', height: 'fit-content', flexDirection:'column', display:'flex', alignItems:'center' }}>
                            <ContactForm
                                packageName={packageName}
                                packageDetail={packageDetail}
                            />
                            <Divider style={{ backgroundColor: style.lightGrey, height: 1 }} />
                            <h2 style={{ textAlign: 'center', padding:"0 10px 20px 10px" }}>Exciting Offers on Ferry Bookings</h2>
                            {cruize.map((item, i) => (
                                
                                <Link
                                    data-aos="fade-up"
                                    data-aos-anchor-placement="top-bottom"
                                    data-aos-duration="2000"
                                    key={i} target='blank' href={item.link}>
                                    <div id='cardImage' style={{ borderRadius: 10, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: boxShadow, width: 260, marginBottom: 30 }}>
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.name}
                                            preview={false}
                                            width={250}
                                            height={250}
                                            style={{ objectFit: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                                        <h2 style={{ padding: '5%', textAlign: 'center' }}>{item.name}</h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}


export async function getStaticPaths() {
    const allpaths = []
    db.collection("package").get().then((snap) => {
        snap.forEach((sndata) => {
            db.doc(`package/${sndata.id}`).collection("singlePackage").get().then(data => {
                data.forEach((path) => {
                    allpaths.push(path.data().slug)
                })
            })
        })
    })

    return {
        paths: allpaths.map((path) => (
            { params: { packageName: path } }
        )),
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { packageGroupName, packagName } = context.params
    const res = await db.collection("package").where("slug", "==", `/package/${packageGroupName}`).get()
    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    if (entry.length == 0) {
        return {
            notFound: true
        };
    }

    const getData = await db.doc(`package/${entry[0].id}`).collection("singlePackage").where("slug", "==", `/package/${packageGroupName}/${packagName}`).get()
    const data = getData.docs.map((d) => (d.data()))

    if (data.length == 0) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data: data[0]
        },
        revalidate: 10,
    }
}