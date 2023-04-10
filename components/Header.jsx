import React, { useEffect, useState } from 'react'
import { Menu, Col, Row, Button, Drawer, Space, Divider } from 'antd'
import { } from 'react-icons/fi'
import Link from 'next/link';
import { mobile, ferry, cityName } from './variables';
import { FaAngleDown, FaYenSign } from 'react-icons/fa'
import { IoIosMenu } from 'react-icons/io'
import style from '@/styles/component.module.scss'
import { db } from '@/firebase';

export default function Header() {

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('home')
  const [packages, setPackages] = useState([])

  const menu = db.collection('menu')

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])


  useEffect(() => {
    menu.where("name", "==", "packages").onSnapshot(snap => {
      const menuTemp = []
      snap.forEach(i => {
        // console.log(i.data())
        menuTemp.push({ ID: i.id, ...i.data() })
      })
      setPackages(menuTemp)
    })

  }, [])
  // console.log(packages.packages)
  function MegaMenu() {
    return (
      <Space style={{ alignItems: 'flex-start' }}>
        {packages[0].menuItems.map((item, index) => {
          return (
            <>
              <Menu
                style={{ boxShadow: 'none', border: index == packages[0].menuItems.length - 1 ? "none" : 'auto' }}
                key={index}
              >
                <Menu.Item style={{ backgroundColor: 'white' }}>
                  <Link href={item.slug}> <p style={{ fontSize: 15 }}><b>{item.name}</b></p></Link>
                </Menu.Item>
                {item.menuItems.map((e, key) => (
                  <Menu.Item key={key}>
                    <Link href={e.slug}>{e.name}</Link>
                  </Menu.Item>
                ))

                }
              </Menu>

            </>
          )
        })

        }
      </Space>
    )
  }


  function RespMenu() {
    return (
      <Menu
        mode={isMobile ? 'inline' : 'horizontal'}
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          float: 'right',
          width: isMobile ? '100%' : 'auto',
          borderBottom: 0,

        }}
        disabledOverflow
        onClick={(e) => setActive(e.key)}
        activeKey={active}

      >

        <Menu.Item key={'home'}>
          <Link href={'/'}>Home</Link>
        </Menu.Item>
        <Menu.SubMenu title={<p style={{ fontSize: 14 }}>Know{isMobile ? null : <FaAngleDown />}</p>}>
          <Menu.Item key={'about'}>
            <Link href={'/page/about-us'}>About Us</Link>
          </Menu.Item>
          <Menu.Item key={'visit_andman'}>
            <Link href={'#'}>How to Visit Andman</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu title={<p style={{ fontSize: 14 }}>Island{isMobile ? null : <FaAngleDown />}</p>}>
          {
            cityName.map((name, key) => (
              <Menu.Item key={key}>
                <Link href={'#'}>{name}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>

        <Menu.SubMenu
          title={<p style={{ fontSize: 14 }}>Activity{isMobile ? null : <FaAngleDown />}</p>}
        >
          <Menu.Item key={'activity'} style={{ height: 'fit-content', backgroundColor: 'white' }}>
            <MegaMenu />
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu title={<p style={{ fontSize: 14 }}>Ferry{isMobile ? null : <FaAngleDown />}</p>}>
          {
            ferry.map((ferry, key) => (
              <Menu.Item key={key}>
                <Link href={'/cruises/'+ferry}>{ferry}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>
        <Menu.Item key={'blog'}>
          <Link href={'/blog'}>Blog</Link>
        </Menu.Item>
        <Menu.Item key={'contact'}>
          <Link href={'/contact-us'}>Contact Us</Link>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div style={{ padding: '2% 5% 1% 5%', backgroundColor: 'white', }}>

      <Drawer
        placement='right'
        width={'70%'}
        open={open}
        onClose={() => setOpen(false)}

      >
        <RespMenu />
      </Drawer>

      <Row>
        <Col span={18} push={6}>
          {isMobile ?
            (
              <p
                style={{ float: 'right', fontSize: 35, color: style.primaryColor }}
                onClick={() => setOpen(true)}
              >
                <IoIosMenu />
              </p>
            ) :
            <RespMenu />
          }
        </Col>
        <Col span={6} pull={18} style={{}}>
          <Link href={'/'}>
            <img src='/images/ronitholidays Logo Final_h80.png' height={45} />
          </Link>
        </Col>
      </Row>



    </div>
  )
}
