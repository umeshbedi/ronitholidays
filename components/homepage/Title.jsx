import React from 'react'
import style from '@/styles/component.module.scss'

export default function Title({ red, blue, isdark = false }) {
    return (
        <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2000"
            style={{ marginBottom: 30 }}>
            <h1 style={{ textAlign: 'center', padding: '0 5%', marginBottom: 10 }}>
                <span style={{ color: style.primaryColor }}>{red}</span>
                {" "}
                <span style={{ color: isdark ? "white" : style.secondaryColor }}>{blue}</span>
            </h1>
            <div style={{ width: '100%', display: 'flex', justifyContent: "center" }}>
                <img
                    src={isdark
                        ?
                        "/images/noun-decorative-line-4253409 - white.svg"
                        : "/images/noun-decorative-line-4253409.svg"}
                    alt="decorative line"
                    style={{ width: 300, margin: '1% 0 3% 0' }}
                />
            </div>
        </div>
    )
}
