
import React, { useEffect, useState } from 'react'
import { boxShadow, mobile } from '../variables'
import Link from 'next/link'
import { Image } from 'antd'
import SHome from '../skeleton/SHome'

export default function Trending({ offerItems }) {

    const [offer, setOffer] = useState([])
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const tempData = []
        offerItems.forEach(d => {
            d.forEach(e => {
                tempData.push(e)
            })
        })
        setOffer(tempData)
    }, [offerItems])

    console.log(offer)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])
    

    return (
        <div style={{width:'100%',display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem' }}>
            <Image src={`/images/Offer ${isMobile?"Small":"Big"} GIF.gif`} alt="Offer Image" style={{ width: '100%' }}
            placeholder={<div style={{width:'100%'}}><SHome /></div>}
            preview={false}
            />
            <div
                style={{
                    display: isMobile ? "flex" : 'grid',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 30,
                    gridTemplateColumns: "repeat(4, auto)",
                    padding: '0 0 2.5rem 0',
                    marginTop: "-4rem",
                    
                    }}
            >
                
                {offer.map((image, i) => {
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
                                width={250}
                                height={250}
                                loading='lazy'
                                preview={false}
                                placeholder={<Image src='/images/Loading_icon.gif' height={250} width={250} style={{objectFit:'cover'}}/>}
                                
                            />
                        </Link>
                    )
                })

                }
            </div>
        </div>
    )
}
