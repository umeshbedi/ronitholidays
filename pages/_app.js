import '@/styles/globals.scss'
import "react-image-gallery/styles/scss/image-gallery.scss";
import Head from 'next/head'
import { ConfigProvider, Layout } from 'antd'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import SHeader from '@/components/skeleton/SHeader'
import { db } from '@/firebase';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import Image from 'next/image';


const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
  loading: () => <SHeader />
});
const Footer = dynamic(() => import('../components/Footer'), { ssr: false, loading: () => <></> });



export default function App({ Component, pageProps }) {
  const [path, setPath] = useState('/')


  useEffect(() => {
    setPath(window.location.pathname)
    AOS.init();
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
          <link rel="icon" href="/images/ronitholidays Logo icon.png" />
          <meta name="google-site-verification" content="12QRPWYDypd8mAbJt5hfmxIkB_0DN78MF1E7HKCingE" />
        </Head>
        <Layout>

          <div style={{ position: 'sticky', top: 0, zIndex: 5 }}>
            <Header />
          </div>
          <TawkMessengerReact
            propertyId="647705c374285f0ec46eaaf3"
            widgetId="1h1oqikt2"
          />

          <Component {...pageProps} />

          {path !== '/admin' &&
            <Footer />
          }
        </Layout>
      </ConfigProvider>

      <div style={{ position: 'fixed', bottom: 50, zIndex: 2 }}>
        <Link href={"https://api.whatsapp.com/send?phone=919933267038"}>
          <Image src='/images/WhatsApp Right side icon.png' width={70} height={70} loading='lazy'/>
        </Link>
      </div>
    </>
  )

}

