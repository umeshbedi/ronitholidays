// import PageHeader from '@/components/PageHeader'
import { boxShadow } from '@/components/variables'
import { db } from '@/firebase'
import { Image, Skeleton, message } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


export default function TermsAndCondition({ entry, data }) {
    const [messageApi, contextHolder] = message.useMessage()
    

    if (entry==undefined) return(<div style={{height:'30vh', padding:'2%'}}><Skeleton active/></div>)

    return (
        <main>
            <Head>
                <title>Andaman Best {entry.name} Packages</title>
                <meta name="description" content={entry.metaDescription}/>
                
            </Head>
            <div>
                {contextHolder}

                <div 
                className='backCurve1'
                style={{ display: 'flex', justifyContent: 'center', paddingTop: '3%', }}>
                    <div>
                        <h1 style={{ fontSize: '200%', marginBottom: '3%', textAlign: 'center' }}>Andaman Best {entry.name} Packages</h1>

                        <div style={{ display: 'grid', gridGap: 30, gridTemplateColumns: "repeat(4, auto)" }}>
                            {data.map((image, i) => {
                                var newUrl = "";
                                const splitedUrl = image.thumbnail.split(".");
                                
                                if (splitedUrl=="imgur") {
                                    splitedUrl[2] = splitedUrl[2] + "m";
                                    newUrl = splitedUrl.join('.')
                                }else{
                                    newUrl=image.thumbnail
                                }
                                return(
                                <Link target='blank' key={i} href={image.slug}>
                                    <Image 
                                        style={{ borderRadius: 20, boxShadow: boxShadow }} 
                                        src={newUrl} alt={image.name}
                                        preview={false}
                                        placeholder={<Image
                                            preview={false}
                                            src='/images/Loading_icon.gif'
                                            width={250}
                                            height={250}
                                            style={{objectFit:'cover'}}
                                        />}
                                    />
                                </Link>
                            )})

                            }
                        </div>
                    </div>

                    {/* <div style={{ width: '80%', margin: '2% 0%' }} id='content' /> */}
                </div>
            </div>
        </main>
    )
}



export const getStaticPaths = async () => {
    const entries = await db.collection("package").get()
    const paths = entries.docs.map(entry => ({
        params: {
            packageGroupName: entry.data().slug
        }
    }));
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const { packageGroupName } = context.params;
    // console.log(packageGroupName)
    const res = await db.collection("package").where("slug", "==", `/package/${packageGroupName}`).get()
    const entry = res.docs.map((entry) =>{
        return ({id:entry.id, ...entry.data()})
    } );

    if (entry.length==0) {
        return {
            notFound: true
        };
    }
    const getData = await db.doc(`package/${entry[0].id}`).collection("singlePackage").where("status", "==", "published").get()
    const data = getData.docs.map((d)=>(d.data()))
    
    return {
        props: {
            entry: entry[0],
            data
        },
        revalidate:60,
        
    }

}