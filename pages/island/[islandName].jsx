import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import WaveSvg from '@/components/WaveSvg'
import style from '@/styles/component.module.scss'
import { db } from '@/firebase'
import { Card, Image, Skeleton } from 'antd'
import { boxShadow, mobile } from '@/components/variables'
import Link from 'next/link'

export default function IslandName({ data }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    if (data == undefined) return <Skeleton active style={{ marginTop: '3%' }} />
    // console.log(data)
    return (
        <main>
            <Head>
                <title>{data.name}</title>
                <meta name="description" content={data.metaDescription}></meta>
                <meta property='og:image' content={data.headerImage}></meta>
            </Head>
            <div>
                <div
                    data-aos="fade-down"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-duration="2000"
                    style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ width: '100%', height: isMobile ? "30px" : '68px', position: 'absolute' }}>
                        <WaveSvg fill={style.lightGrey} />
                    </div>
                    <img src={data.headerImage} alt={data.name}
                        style={{ height: isMobile ? "auto" : 450, width: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div
                    className='backCurve3'
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3%', gap: 30 }}>
                    <h1 style={{textAlign:'center', padding:"0 10px"}}>Places to Visit in {data.name}</h1>
                    <div style={{ display: isMobile ? "block" : 'grid', gridTemplateColumns: "repeat(4, auto)", gridGap: '3%', width: isMobile ? "auto" : '90%', justifyContent: 'center', }}>
                        {data.data.map((item, i) => {
                            var newUrl = "";
                            const splitedUrl = item.thumbnail.split(".");

                            if (splitedUrl == "imgur") {
                                splitedUrl[2] = splitedUrl[2] + "m";
                                newUrl = splitedUrl.join('.')
                            } else {
                                newUrl = item.thumbnail
                            }

                            return (
                                <Link
                                    data-aos="fade-up"
                                    data-aos-anchor-placement="top-bottom"
                                    data-aos-duration="2000"
                                    target='blank' key={i} href={item.slug}>
                                    <div id='cardImage' style={{ borderRadius: 20, background: 'white', display: 'flex', flexDirection: 'column', textAlign: 'center', boxShadow: boxShadow, width: 250, height: 340, overflow: 'hidden', marginBottom: isMobile ? 30 : "auto" }}>
                                        <Image
                                            src={newUrl}
                                            alt={item.name}
                                            preview={false}
                                            width={250} height={250}
                                            placeholder={
                                                <Image
                                                    preview={false}
                                                    src="/images/Loading_icon.gif"
                                                    width={250}
                                                    height={250}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            }
                                            style={{ objectFit: 'cover', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <h2 style={{ padding: '5%' }}>{item.name}</h2>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}


export const getStaticPaths = async () => {
    const entries = await db.collection("island").get()
    const paths = entries.docs.map(entry => ({
        params: {
            islandName: entry.data().slug
        }
    }));
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const { islandName } = context.params;
    // console.log(packageGroupName)
    const res = await db.collection("island").where("slug", "==", `/island/${islandName}`).get()
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