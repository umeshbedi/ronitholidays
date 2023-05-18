import { Image } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { boxShadow, mobile } from '../variables';
import Title from './Title';

export default function Packages({ Package }) {

    const [data, setData] = useState([])

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    useEffect(() => {
        const tempData = []
        Package.forEach(d => {
            d.forEach(e => {
                tempData.push(e)
            })
        })
        setData(tempData)
    }, [])


    return (

        <div
        className='backCurve1' 
        style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            margin: '5% 0',
            }}
            >
            <Title red={"Andaman"} blue={"Best Packages"}/>
            <div 
            style={{
                display: isMobile ? "flex" : 'grid',
                flexDirection: 'column',
                alignItems: 'center',
                gridGap: 30,
                gridTemplateColumns: "repeat(4, auto)",
                padding: '0 0 2% 0',
                marginTop: isMobile ? '5%' : null
            }}
            >
                {data.map((image, i) => {
                    var newUrl = "";
                    const splitedUrl = image.thumbnail.split(".");

                    if (splitedUrl == "imgur") {
                        splitedUrl[2] = splitedUrl[2] + "m";
                        newUrl = splitedUrl.join('.')
                    } else {
                        newUrl = image.thumbnail
                    }
                    return (
                        <Link
                            data-aos="fade-up"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration="2000"
                            id='cardImage' target='blank' key={i} href={image.slug}>
                            <Image
                                style={{ borderRadius: 20, boxShadow: boxShadow }}
                                src={newUrl} alt={image.name}
                                preview={false}
                                placeholder={<Image
                                    preview={false}
                                    src='/images/Loading_icon.gif'
                                    width={250}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />}
                            />
                        </Link>
                    )
                })

                }
            </div>


            {/* <div style={{ width: '80%', margin: '2% 0%' }} id='content' /> */}
        </div>

    )
}
