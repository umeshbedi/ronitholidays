import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Link from 'next/link'
import style from '@/styles/component.module.scss'
import { Button, Divider, Menu, Select, Skeleton, TreeSelect } from 'antd'
// import MainImage from '@/components/hotel/MainImage'
// import HotelMenu from '@/components/hotel/HotelMenu'
// import Rooms from '@/components/hotel/Rooms'
// import Location from '@/components/hotel/Location'
import dynamic from 'next/dynamic'
import Cart from '@/components/hotel/Cart'

const MainImage = dynamic(() => import('@/components/hotel/MainImage'), {
  ssr: false,
  loading: () => <Skeleton />
});
const HotelMenu = dynamic(() => import('@/components/hotel/HotelMenu'), {
  ssr: false,
  loading: () => <Skeleton.Input />
});
const Rooms = dynamic(() => import('@/components/hotel/Rooms'), {
  ssr: false,
  loading: () => <Skeleton />
});
const Location = dynamic(() => import('@/components/hotel/Location'), {
  ssr: false,
  loading: () => <Skeleton />
});

export default function Hotel() {

  return (
    <main>
      <Head>

      </Head>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '90%', paddingTop:'3%'}}>
          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ width: '75%' }}>
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '1%',
                  borderRadius: 3,
                  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}
              >
                <h1 style={{ fontSize: '150%' }}>Sea Hills Hotels & Resorts</h1>
                <p>{<FaMapMarkerAlt color={style.primaryColor} />} 88 Moo 3, T. Ao Nang, Muang, Krabi 81000, Thailand <Link style={{ color: style.primaryColor, fontWeight: 'bold' }} href={"#"}>(View Map)</Link> </p>

                <MainImage />
                <Divider style={{ marginBottom: 0 }} />
                <HotelMenu />
                <Rooms category={'Budget'} />
                <Divider />
                <Rooms category={'Standard'} />
                <Divider />
                <Rooms category={'Premium'} />
                <Divider />
                <Rooms category={'Luxury'} />

                <div >
                  <Location />
                </div>

              </div>
            </div>

            {/* Right side container */}
            <div style={{ width: '25%', paddingLeft: '1%' }}>
              {/* <div style={{position:'fixed', backgroundColor:'red', width:'calc(21.6%)', marginTop: fixed?'-5%':'0%'}}>
                <Cart />
              </div> */}
              <div style={{position:'sticky', top:'13%'}}>
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
