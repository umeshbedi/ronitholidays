import Head from 'next/head'
import React from 'react'
import WaveSvg from '@/components/WaveSvg'
import style from '@/styles/component.module.scss'
import { db } from '@/firebase'
import { Button, Skeleton, Image } from 'antd'
import String2Html from '@/components/String2Html'
import ContactForm from '@/components/ContactForm'
import ContactUsPage from '@/components/ContactUsPage'

export default function Pages({ data, path }) {
    // console.log(path)

    if (data == undefined) return <Skeleton active style={{ marginTop: '3%' }} />

    return (
        <main>
            <Head>
                <title>{data.title}</title>
                <meta name="description" content={data.metaDescription} />
                <meta property='og:image' content={data.headerImage}></meta>
            </Head>
            <div>
                {data.headerImage != "" &&
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <div style={{ width: '100%', height: '68px', position: 'absolute', zIndex: 1 }}>
                            <WaveSvg fill={style.lightGrey} />
                        </div>
                        <Image
                            preview={false}
                            src={data.headerImage} alt={data.title}
                            width={"100%"}
                            style={{ height: 400, objectFit: 'cover' }}
                            placeholder={<Skeleton.Button active block style={{ width: '100%', height: 400 }} />}
                        />
                    </div>
                }
                
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
                
                    <div style={{ width: '80%' }}>
                        <String2Html id={"extraPages"} string={data.about} />
                        
                        {path == "contact-us" &&
                            <ContactUsPage/>
                        }
                    </div>
                </div>


            </div>
        </main>
    )
}

export const getStaticPaths = async () => {
    const entries = await db.collection("pages").get()
    const paths = entries.docs.map(entry => ({
        params: {
            pages: entry.id
        }
    }));
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const { pages } = context.params;
    // console.log(pages)
    const res = await db.doc(`pages/${pages}`).get()

    if (res.data() == undefined) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data: res.data(),
            path: res.id
        },
        revalidate: 60,

    }

}
