import React from 'react'
import Head from 'next/head'
import PageHeader from '@/components/PageHeader'

export default function ContactUs() {
  return (
    <main>
      <Head>
        <title>Contact Us</title>
      </Head>
      
      <div>
       
        <div 
        style={{
          height:200,
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
        >
            <p>Some Content Here</p>
        </div>
      </div>
    </main>
  )
}
