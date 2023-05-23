import { Button, Image, Skeleton } from 'antd'
import React from 'react'

import style from '@/styles/component.module.scss'
import Link from 'next/link'

export default function Offer() {

    const visit = ["#", "#", "#"]

    return (
        <div style={{ margin: "3% 0", position: 'relative' }}>
            <div style={{ position: 'absolute', zIndex: 1, width: '100%', display: 'flex', height: '100%' }}>
                <div style={{ width: '38%', }}>
                </div>

                <div style={{ width: '36%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: "white" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <h2>Special <span style={{ color: style.primaryColor }}>RonitHolidays</span> Offer</h2>
                        <h1>Discount 10-30%</h1>
                        <p>Get best offers on Hotel, Ferry, Sightseeing, Packages, Water sports activity at Andaman,</p>
                        <h1 style={{ color: style.primaryColor }}>Hurry Up!!</h1>
                        <div style={{ display: "flex", gap: 20 }}>
                            {visit.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item}
                                    style={{ 
                                        padding: "5px 20px", 
                                        background: style.primaryColor,
                                        borderRadius:50,
                                        fontWeight:'bold'
                                    }}

                                    >
                                        Visit
                                </Link>
                            ))}

                        </div>
                    </div>
                </div>

            </div>

            <Image
                preview={false}
                src='/images/offer_29713-offer.webp'
                alt='Andman Offer'
                placeholder={<>
                    <div><Skeleton.Button active block style={{ height: 600 }} /></div>
                </>}
            />
        </div>
    )
}
