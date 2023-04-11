// import PageHeader from '@/components/PageHeader'
import { boxShadow } from '@/components/variables'
import { db } from '@/firebase'
import { Image, Skeleton, message } from 'antd'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const PageHeader = dynamic(() => import("@/components/PageHeader"), {
    ssr: false,
    loading: () => <Skeleton />
})

export default function TermsAndCondition() {
    const [messageApi, contextHolder] = message.useMessage()
    const [fireData, setFireData] = useState('')
    const { query, push } = useRouter()


    // useEffect(() => {
    //     if (query.packageGroupName !== undefined) {
    //         db.doc("menu/KkeYzxQdPQ2WrGWrm6rs").get()
    //         .then(snap=>{
    //             document.getElementById("content").innerHTML=snap.data().content
    //         })
    //         console.log(query)
    //     }
    // }, [query])

    const packageImage = [
        "https://cdn.experienceandamans.com/images/andaman-honeymoon-4-days.jpg",
        "https://cdn.experienceandamans.com/images/andaman-honeymoon-5-days.jpg",
        "https://cdn.experienceandamans.com/images/andaman-yatra-honeymoon.jpg",
        "https://cdn.experienceandamans.com/images/exotic-andaman-honeymoon-6night-7days.jpg",
        "https://cdn.experienceandamans.com/images/andaman-bliss-honeymoon.jpg",
        "https://cdn.experienceandamans.com/images/honeymoon-extravaganza.jpg"
    ]

    return (
        <main>
            <Head>
                <title>{fireData != null ? fireData.title : ""}</title>
            </Head>
            <div>
                {contextHolder}

                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '3%', }}>
                    <div>
                        <h1 style={{ fontSize: '200%', marginBottom: '3%', textAlign: 'center' }}>Andaman Best {query.packageGroupName} Packages</h1>

                        <div style={{ display: 'grid', gridGap: 30, gridTemplateColumns: "repeat(4, auto)" }}>
                            {packageImage.map((image, i) => (
                                <Link key={i} href={"#"}>
                                    <Image style={{ borderRadius: 20, boxShadow:boxShadow }} src={image} alt="something"
                                        preview={false}
                                        placeholder={<Image
                                            preview={false}
                                            src='/images/Loading_icon.gif'
                                            width={250}
                                            height={250}
                                            />}
                                    />
                                </Link>
                            ))

                            }
                        </div>
                    </div>

                    {/* <div style={{ width: '80%', margin: '2% 0%' }} id='content' /> */}
                </div>
            </div>
        </main>
    )
}
