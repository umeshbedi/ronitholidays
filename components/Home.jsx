import React, { useState, useEffect } from 'react'
import { Button, Carousel, Col, Icon, Row, Space } from 'antd'
import { db } from '../firebase'
import Head from 'next/head'
import style from '@/styles/component.module.scss'
import { mobile, homepageImage, Wave } from '@/components/variables'
import dynamic from 'next/dynamic'
import { HeartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'


export default function Home() {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  useEffect(() => {
    // document.getElementById("waves").innerHTML = Wave
  }, [])


  // console.log(starHotel)

  return (
    <main>
      <Head>
        <title>Ronit Holidays homepage</title>
        <meta name='description' content='This is testing for home' />
        <meta name="keywords" content="Hotels, hotel booking, hotels near me" />
        <meta name="developer" content="Umesh Bedi (Bedi It Solution)" />
      </Head>
      <div style={{overflowX:'hidden'}}>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

          <div style={{ transform: "rotate(180deg)", position: 'absolute', zIndex: 2, width: '100%', }}>
            <Wave />
          </div>

          <Carousel autoplay arrows dots={false} draggable speed={3000}
          prevArrow={<LeftOutlined/>}
          nextArrow={<RightOutlined/>}
          >
            {
              homepageImage.map((item, index) => (
                <div key={index}>
                  <div
                    className='homeBanner'
                    style={{
                      backgroundImage: `linear-gradient(
                        90deg,rgba(0,0,0, 0.75),
                        rgba(0,0,0, 0),rgba(0,0,0, 0)
                        ), 
                        url('${item}')`
                    }}>

                    <Row style={{ width: '95%' }}>
                      <Col span={isMobile ? 18 : 10} style={{}}>

                        <h1 style={{ fontSize: isMobile ? 35 : 45, color: 'white' }}>Explore the Andman</h1>
                        <Space direction='vertical' style={{ gap: 20 }}>
                          <p style={{ color: 'white' }}>Enjoy your Journey in Luxury Cruise</p>
                          <Button type='primary'>Contact Us</Button>
                        </Space>
                      </Col>
                    </Row>

                  </div>
                </div>
              ))
            }

          </Carousel>
        </div>

        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Homepage content</p>
        </div>

      </div>
    </main>
  )
}
