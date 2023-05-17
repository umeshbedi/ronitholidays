import React, { useEffect, useState } from 'react'
import { Carousel, Row, Col, Space, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { mobile } from './variables'
import Link from 'next/link'

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
                            className='homeBanner'
                            style={{
                                height: isMobile ? 300 : 550,
                                backgroundImage: `linear-gradient(
                                                90deg,rgba(0,0,0, 0.9),
                                                rgba(0,0,0, .3),${isMobile ? null : "rgba(0,0,0, .2)"}
                                                ), 
                                                url('${item.image}')`,
                                backgroundPositionX: 'center'
                            }}>

                            <Row style={{ width: '95%' }}>
                                <Col span={isMobile ? 16 : 10} style={{}}>

                                    <h1 style={{ color: 'white' }}>{item.heading}</h1>
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
