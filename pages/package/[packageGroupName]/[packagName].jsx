// import PageHeader from '@/components/PageHeader'
import { db } from '@/firebase'
import { Skeleton, message } from 'antd'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const PageHeader = dynamic(() => import("@/components/PageHeader"), {
    ssr: false,
    loading: () => <Skeleton />
})

export default function TermsAndCondition() {
    const [messageApi, contextHolder] = message.useMessage()
    const [fireData, setFireData] = useState(null)
    const { query, push } = useRouter()
    console.log(query)

    useEffect(() => {
        if (query.page !== undefined) {
            console.log(query.page)
            db.collection('pages').doc(`${query.page}`).get()
                .then((snap) => {
                    const data = snap.data()
                    document.getElementById('content').innerHTML = data.data
                    setFireData({
                        title: data.title,
                        image: data.image
                    })
                })
                .catch((err) => {
                    push("/"+query.page)
                    messageApi.error(err.message)
                })
        }
    }, [query])

    return (
        <main>
            <Head>
                <title>{fireData != null ? fireData.title : ""}</title>
            </Head>
            <div>
                {contextHolder}
                <PageHeader
                    pageTitle={fireData != null ? fireData.title : ""}
                    image={fireData != null ? fireData.image : ""}
                />
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <div style={{ width: '80%', margin: '2% 0%' }} id='content' />
                </div>
            </div>
        </main>
    )
}
