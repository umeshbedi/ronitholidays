import React, { useEffect, useState } from 'react'
import { mobile, images } from './variables'
import { Button, Checkbox, Divider } from 'antd'
import ImageGallery from 'react-image-gallery'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import style from '@/styles/component.module.scss'

export default function SearchPage() {

    const [priceRange, setPriceRange] = useState([])

    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    

    function Hotel() {
        return (
            <div >
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: 15,
                        borderRadius: 3,
                        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.07)',
                        display: isMobile?'block':'flex'
                    }}
                >

                    {/* Image container */}
                    <div style={{ width: isMobile?'100%':'40%' }}>
                        <div
                            style={{
                                position: 'absolute',
                                backgroundColor: style.primaryColor,
                                zIndex: 10,
                                padding: 5,
                                color: 'white',
                            }}
                        >
                            <p>6% Off</p>
                        </div>
                        <ImageGallery items={images}
                            lazyLoad={true}
                            showPlayButton={false}
                            useTranslate3D={true}
                            showFullscreenButton={false}

                        />
                    </div>

                    {/* Hotels Details container */}
                    <div style={{ marginLeft: isMobile?0: 20,marginTop:isMobile?15:0, display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <h1>Sea Hills Hotels and Resort</h1>
                        <p>1 Night - 1 Adult</p>
                        <div style={{ display: 'flex', gap: 5, color: '#fc3' }}>
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                            <StarOutlined />
                        </div>
                        <p>Peerless Resort Port Blair The Only Place To Start Discovering The Andaman And Nicobar Islands Is Nestled In The Heart Of Port Blair</p>
                        <h1><span style={{ fontSize: 16 }}>₹5,399.00 </span>₹4,267.00/<span style={{ fontSize: 16 }}>per night</span></h1>
                        <Button type='primary' size='large' style={{ }}>Book Hotel</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ width: '90%', display: 'flex' }}>

            {/* Left side container */}
            <div style={{ width: isMobile?'0%':'25%', padding: isMobile?0:15, visibility:isMobile?'hidden':'visible', }}>
                <div style={{ backgroundColor: 'white', padding: 15, borderRadius: 3, boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.07)' }}>
                    <h2>FILTERS</h2>
                    <Divider style={{}} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <h3>Price Range</h3>
                        <Checkbox.Group
                            options={["Upto ₹4999", "₹5000 - ₹4999", "₹10000 - ₹14999", "₹15000 +"]}
                            style={{ flexDirection: 'column', gap: 10 }}
                            onChange={(e) => setPriceRange(e)}
                        />

                    </div>
                </div>
            </div>

            {/* Right side container */}
            <div style={{ width: isMobile? '100%':'75%', padding: 15, display:'flex', flexDirection:'column', gap:30 }}>
                <Hotel />
                <Hotel />
                <Hotel />
            </div>
        </div>
    )
}
