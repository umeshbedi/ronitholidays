import { Image } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { boxShadow, mobile } from '../variables';
import style from '@/styles/component.module.scss'

export default function Island({ data }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '3%', gap: 30,
            background: style.secondaryColor,
            padding:'5% 0 10% 0'
        }}
        >
            <h1 style={{color:'white'}}>{"Andaman's Best Islands"}</h1>
            <img src="/images/noun-decorative-line-4253409 - white.svg" alt="decorative line" style={{width:300, }}/>
            <p style={{color:'white'}}>Andaman Islands tourism has some of the most exotic and offbeat islands that one can experience.</p>
            <div style={{
                display: isMobile ? "block" : 'grid',
                gridTemplateColumns: "repeat(4, auto)",
                gridGap: '4%',
                width: isMobile ? "auto" : '90%',
                justifyContent: 'center',
            }}
            >
                {data.map((item, i) => {
                    var newUrl = "";
                    const splitedUrl = item.thumbnail.split(".");

                    if (splitedUrl == "imgur") {
                        splitedUrl[2] = splitedUrl[2] + "m";
                        newUrl = splitedUrl.join('.')
                    } else {
                        newUrl = item.thumbnail
                    }

                    return (
                        <Link target='blank' key={i} href={item.slug}>
                            <div id='cardImage' style={{ 
                                background: 'white', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                textAlign: 'center', 
                                boxShadow: boxShadow, 
                                width: 250, height: 340, 
                                overflow: 'hidden', 
                                marginBottom: isMobile ? 30 : "auto" 
                                }}
                                >
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
                                    style={{ objectFit: 'cover' }} />
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <h2 style={{ padding: '5%' }}>{item.name}</h2>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}