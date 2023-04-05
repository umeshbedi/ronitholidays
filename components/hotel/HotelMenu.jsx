import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'

export default function HotelMenu() {
    return (
        <Menu
            mode='horizontal'
            style={{position:'sticky', top:'9%', zIndex:5, fontSize:17}}

        >
            <Menu.Item key={'rooms'}>
                <Link href={'/'}>Rooms</Link>
            </Menu.Item>
            <Menu.Item key={'amenties'}>
                <Link href={'/about-us'}>Amenties</Link>
            </Menu.Item>
            <Menu.Item key={'abouthotel'}>
                <Link href={'/about-us'}>About</Link>
            </Menu.Item>
            <Menu.Item key={'location'}>
                <Link href={'/about-us'}>Location</Link>
            </Menu.Item>
            <Menu.Item key={'facilities'}>
                <Link href={'/about-us'}>Facilities</Link>
            </Menu.Item>

            <Menu.Item key={'policies'}>
                <Link href={'/about-us'}>Policies</Link>
            </Menu.Item>

        </Menu>
    )
}
