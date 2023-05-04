import React from 'react'
import { db } from '@/firebase'
import style from '@/styles/component.module.scss'
import WaveSvg from '@/components/WaveSvg'
import Head from 'next/head'
import { Divider, Image, Skeleton } from 'antd'
import String2Html from '@/components/String2Html'
import Link from 'next/link'
import { boxShadow } from '@/components/variables'

export default function AboutIsland({ data, headerImage, islandItem, headerImgAlt }) {
    // console.log(islandItem)
    if (data == undefined) return <Skeleton active style={{marginTop:'3%'}}/>
    const remainingData = data.filter((f)=>{
        return f.slug!=islandItem.slug;
    })
    // console.log(remainingData)
    return (
        <main>
            <Head>
                <title>{islandItem.name}</title>
                <meta name="description" content={islandItem.metaDescription}></meta>
            </Head>
            <div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ width: '100%', height: '68px', position: 'absolute' }}>
                        <WaveSvg fill={style.lightGrey} />
                    </div>
                    <img src={headerImage} alt={headerImgAlt}
                        style={{ height: 450, width: '100%', objectFit: 'cover' }}
                    />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', }} id='packageContainer'>
                    <div style={{ width: '90%', display: "flex", gap: '4%', marginTop: '3%' }}>
                        <div style={{ width: "70%", background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15 }}>
                            <h1>About {islandItem.name}</h1>
                            <Divider style={{ margin: "0", backgroundColor: style.lightGrey, height: 1 }} />
                            <String2Html id={'aboutIsland'} string={islandItem.about}/>

                        </div>
                        
                        <div style={{ width: '30%', background: 'white', padding: '3%', height: 'fit-content', flexDirection:'column', display:'flex', alignItems:'center' }}>
                            <h2>Visit Other Places of {headerImgAlt}</h2>
                            <Divider style={{ backgroundColor: style.lightGrey, height: 1 }} />
                            {remainingData.map((item, i) => (
                            <Link key={i} href={item.slug}>
                                <div id='cardImage' style={{ borderRadius: 10, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: boxShadow, width:260, marginBottom:'4%' }}>
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.name}
                                        preview={false}
                                        width={260}
                                        height={280}
                                        style={{ objectFit: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                                    <h2 style={{ padding: '5%' }}>{item.name}</h2>
                                </div>
                            </Link>
                        )).slice(0,5)}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}


export async function getStaticPaths() {
    const allpaths = []
    db.collection("island").get().then((snap) => {
        snap.forEach((sndata) => {
            sndata.data().data.map(dta => {
                allpaths.push(dta.slug)
            })
        })
    })

    return {
        paths: allpaths.map((path) => (
            { params: { AboutIsland: path } }
        )),
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { islandName, aboutIsland } = context.params
    const res = await db.collection("island").where("slug", "==", `/island/${islandName}`).get()
    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    if (entry.length == 0) {
        return {
            notFound: true
        };
    }

    const getData = await db.doc(`island/${entry[0].id}`).get()
    const data = getData.data()
    const headerImage = data.headerImage
    const islandItem = data.data.find((f) => f.slug == `/island/${islandName}/${aboutIsland}`)

    if (data.length == 0) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data: data.data,
            headerImage, islandItem,
            headerImgAlt:data.name
        },
        revalidate: 10,
    }
}