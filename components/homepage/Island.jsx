// import { Image } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { boxShadow, mobile } from '../variables';
import style from '@/styles/component.module.scss'
import Title from './Title';

import Image from "next/image"

export default function Island({ data }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    return (
        <div 
        className='backCurve4'
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '3%', gap: 30,
            background: style.secondaryColor,
            padding: '5% 0 10% 0'
        }}
        >
            <Title red={"Best Travel Agency"} blue={"in Andaman"} isdark />
            <p style={{ color: 'white', textAlign: 'center', padding: '0 5%' }}>
            Planning a trip to the Andaman Islands? Let the best travel agency in Andaman turn your tropical getaway into a memorable experience. We offer customized Andaman tour packages that include everything from historical explorations at the Cellular Jail to romantic candlelight dinners by the beach, and even luxury cruises that sail through the stunning archipelago. Whether you're a honeymooner, family, or solo traveler, our expert team ensures every detail is taken care of. With unmatched local knowledge and personalized service, we make your journey smooth and unforgettable. Trust the most reliable travel agency in Andaman for a seamless island adventure. Andaman Islands has some of the most exotic and offbeat islands that one can experience.
            </p>
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
                        <Link
                            data-aos="flip-left"
                            data-aos-duration="2000"
                            target='blank' key={i} href={item.slug}>
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
                                    width={250} height={250}
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
