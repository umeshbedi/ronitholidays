import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Typography, Select, Space, Image } from 'antd'
const { Text, Title, Link } = Typography
import { db } from '../firebase'
import Head from 'next/head'
import style from '@/styles/component.module.scss'
import { cityName, category, mobile } from '@/components/variables'
import { SearchOutlined, StepBackwardOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'

import SearchDiv from './SearchDiv'

export default function Home() {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])


  // console.log(starHotel)


  return (
    <main>
      <Head>
        <title>Ronit Holidays homepage</title>
        <meta name='description' content='This is testing for home' />
        <meta name="keywords" content="Hotels, hotel booking, hotels near me" />
        <meta name="developer" content="Umesh Bedi (Bedi It Solution)" />
      </Head>
      <div>

        <div
          className='homeBanner'
          style={{
            backgroundImage: `linear-gradient(
            90deg,rgba(0,0,0, 0.75),
            rgba(0,0,0, 0),rgba(0,0,0, 0)
            ), 
            url('https://andamantourtravel.com/assets/img/banner-or3.jpg')`,

          }}
        >
          <Row style={{ width: '95%' }}>
            <Col span={isMobile ? 18 : 10} style={{}}>
              <p style={{ color: style.primaryColor, fontSize: 20, fontFamily: 'Dancing Script' }}>Relax and Enjoy ! </p>
              <br />
              <h1 style={{ fontSize: isMobile ? 35 : 45, color: 'white' }}>Make Your Holiday Memorable</h1>
              <br />
              <p style={{ color: 'white' }}>Find Hotel and Ticket with Best Experience</p>
            </Col>
          </Row>

        </div>

        <SearchDiv />

        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Homepage content</p>
        </div>

      </div>
    </main>
  )
}
