import WaveSvg from '@/components/WaveSvg'
import Head from 'next/head'
import React from 'react'
import style from '@/styles/component.module.scss'
import { db } from '@/firebase'
import { Card, Image, Skeleton } from 'antd'
import { boxShadow } from '@/components/variables'
import Link from 'next/link'

export default function IslandName({ data }) {

    if (data == undefined) return <Skeleton active style={{marginTop:'3%'}}/>
    console.log(data)
    return (
        <main>
            <Head>
                <title>{data.name}</title>
            </Head>
            <div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ width: '100%', height: '68px', position: 'absolute' }}>
                        <WaveSvg fill={style.lightGrey} />
                    </div>
                    <img src={data.headerImage} alt={data.name}
                        style={{ height: 450, width: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3%', gap: 30 }}>
                    <h1>Places to Visit in {data.name}</h1>
                    <div style={{ display: 'grid', gridTemplateColumns: "repeat(4, auto)", gridGap: '7%' }}>
                        {data.data.map((item, i) => (
                            <Link key={i} href={item.slug}>
                                <div id='cardImage' style={{ borderRadius: 20, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: boxShadow, width:260 }}>
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.name}
                                        preview={false}
                                        width={260} height={280}
                                        style={{ objectFit: 'cover', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                                    <h2 style={{ padding: '5%' }}>{item.name}</h2>
                                </div>
                            </Link>
                        ))}
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