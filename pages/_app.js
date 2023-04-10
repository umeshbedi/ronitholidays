import '@/styles/globals.scss'
import "react-image-gallery/styles/scss/image-gallery.scss";
import Head from 'next/head'
import { ConfigProvider, Layout } from 'antd'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import SHeader from '@/components/skeleton/SHeader'

const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
  loading: () => <SHeader />
});
const Footer = dynamic(() => import('../components/Footer'), {ssr:false, loading:()=><></>});



export default function App({ Component, pageProps }) {
  const [path, setPath] = useState('/')
  useEffect(() => {
    setPath(window.location.pathname)
  }, [])
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff0000',
            borderRadius: 20,

          }
        }}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/ronitholidays Logo icon.ico" />
        </Head>
        <Layout>
          <div style={{position:'sticky', top:0, zIndex:5}}>
          <Header />
          </div>

          <Component {...pageProps} />

          {path !== '/admin' &&
            <Footer />
          }
        </Layout>
      </ConfigProvider>
    </>
  )
}
