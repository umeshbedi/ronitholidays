import React, { useEffect, useState } from 'react'
import { Carousel, Row, Col, Space, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { mobile } from './variables'
import Link from 'next/link'
import Image from 'next/image'

export default function Slider({ banner }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    return (
        <Carousel
            autoplay arrows dots={false} draggable speed={3000}
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
        >
            {
                banner.map((item, index) => (
                    <div key={index}>
                        <div
                            style={{
                                width:'100%',
                                display:'flex',
                                alignItems:'center',
                                height: isMobile ? 300 : 550,
                                position: 'relative'
                            }}>

                            <Image
                                src={item.image}
                                fill
                                loading='lazy'
                                style={{objectFit:'cover'}}
                            />
                            <div style={{
                                height: isMobile ? 300 : 550,
                                backgroundImage: `linear-gradient(
                                                90deg,rgba(0,0,0, 0.9),
                                                rgba(0,0,0, .3),${isMobile ? null : "rgba(0,0,0, .2)"}
                                                ), 
                                                url('')`,
                                position: 'absolute',
                                width:'100%'
                            }}
                            />
                            <Row style={{ width: '95%', position: 'absolute', padding:"10%" }}>
                                <Col span={isMobile ? 16 : 10} style={{}}>

                                    <span style={{ color: 'white', fontSize: '30px' }}>{item.heading}</span><br/>
                                    <Space direction='vertical' style={{ gap: 20 }}>
                                        <p style={{ color: 'white' }}>{item.subHeading}</p>
                                        <Link target='blank' href={"/contact-us"}><Button type='primary'>Contact Us</Button></Link>
                                    </Space>
                                </Col>
                            </Row>

                        </div>
                    </div>
                ))
            }

        </Carousel>
    )
}
