import { Divider } from 'antd'
import Link from 'next/link'
import React from 'react'
import style from '@/styles/component.module.scss'

export default function Footer() {
  return (
    <div>
      <div className='footerdiv' style={{ flexDirection: 'row' }}>
        <div style={{ width: '25%' }}>
          <Link href={'/'}>
            <img src="/images/WEB3 Logo Final_h80.png" alt="web3hotel logo" height={60} />
          </Link>
          <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500.
          </p>
        </div>
        <div>
          <h2>Support</h2>
          <Divider style={{ margin: "15% 0%", backgroundColor: style.primaryColor, height: 2 }} />
          <div style={{ marginBottom: 5 }}><Link href={"/page/terms-and-condition"}> Terms & Condition</Link></div>
          <div style={{ marginBottom: 5 }}><Link href={"/page/disclaimer"}> Disclaimer</Link></div>
          <div style={{ marginBottom: 5 }}><Link href={"/page/privacy-policy"}> Privacy Policy</Link></div>

        </div>
        <div>
          <h2>Useful Links</h2>
          <Divider style={{ margin: "15% 0%", backgroundColor: style.primaryColor, height: 2 }} />
          <div style={{ marginBottom: 5 }}><Link href={"/page/about-us"}> About Us</Link></div>
          <div style={{ marginBottom: 5 }}><Link href={"/activity"}> Activity</Link></div>
          <div style={{ marginBottom: 5 }}><Link href={"/contact-us"}> Contact Us</Link></div>
        </div>
        <div>
          <h2>Follow Us</h2>
          <Divider style={{ margin: "15% 0%", backgroundColor: style.primaryColor, height: 2 }} />
        </div>
      </div>
      <div>
        <p style={{ textAlign: 'center', padding: '2% 0%', backgroundColor: '#e1e1e1', color: 'grey' }}>© 2023 <Link href={'/'}> Web3hotels.com </Link> - All rights reserved</p>
      </div>
    </div>
  )
}
