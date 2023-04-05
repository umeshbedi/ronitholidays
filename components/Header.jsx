import React, { useEffect, useState } from 'react'
import { Menu, Col, Row, Button, Drawer } from 'antd'
import { } from 'react-icons/fi'
import Link from 'next/link';
import { cityName, category } from './variables';
import { mobile } from './variables';
import { FaAngleDown } from 'react-icons/fa'
import { IoIosMenu } from 'react-icons/io'
import style from '@/styles/component.module.scss'

export default function Header() {

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])



  function RespMenu() {
    return (
      <Menu
        mode={isMobile ? 'inline' : 'horizontal'}
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          float: 'right',
          width: isMobile ? '100%' : 'auto',
          border: 'none',
          
        }}
        disabledOverflow
        onClick={(e) => setActive(e.key)}
        activeKey={active}

      >

        <Menu.Item key={'home'}>
          <Link href={'/'}>Home</Link>
        </Menu.Item>
        <Menu.Item key={'about'}>
          <Link href={'/page/about-us'}>About Us</Link>
        </Menu.Item>

        <Menu.SubMenu title={<p style={{ fontSize: 14 }}>Hotels/Resorts{isMobile ? null : <FaAngleDown />}</p>}>
        
        <Menu.Item key={'Budget'}>
          <Link href={'/search?location=Andaman and Nicobar Islands&category='+category[0]}>Budget</Link>
        </Menu.Item>
        <Menu.Item key={'Standard'}>
          <Link href={'/search?location=Andaman and Nicobar Islands&category='+category[1]}>Standard</Link>
        </Menu.Item>
        <Menu.Item key={'Premium'}>
          <Link href={'/search?location=Andaman and Nicobar Islands&category='+category[2]}>Premium</Link>
        </Menu.Item>
        <Menu.Item key={'Luxury'}>
          <Link href={'/search?location=Andaman and Nicobar Islands&category='+category[3]}>Luxury</Link>
        </Menu.Item>

          {/* <Menu.SubMenu title={category[0]}>
            {cityName.map((item) => {
              const key = "2star-" + item.split(" ").join("-")
              return (
                <Menu.Item key={key}>
                  <Link href={'/search?location=' + item + '&star=' + category[0]}>{item}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
          <Menu.SubMenu title={category[1]}>
            {cityName.map((item) => {
              const key = "3star-" + item.split(" ").join("-")
              return (
                <Menu.Item key={key}>
                  <Link href={'/search?location=' + item + '&star=' + category[1]}>{item}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
          <Menu.SubMenu title={category[2]}>
            {cityName.map((item) => {
              const key = "4star-" + item.split(" ").join("-")
              return (
                <Menu.Item key={key}>
                  <Link href={'/search?location=' + item + '&star=' + category[2]}>{item}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
          <Menu.SubMenu title={category[3]}>
            {cityName.map((item) => {
              const key = "5star-" + item.split(" ").join("-")
              return (
                <Menu.Item key={key}>
                  <Link href={'/search?location=' + item + '&star=' + category[3]}>{item}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>*/}
        </Menu.SubMenu> 

        <Menu.Item key={'activity'}>
          <Link href={'/activity'}>Activity</Link>
        </Menu.Item>
        <Menu.SubMenu title={<p style={{ fontSize: 14 }}>Cruises {isMobile ? null : <FaAngleDown />}</p>}>
          <Menu.Item key={'nautika'}>
            <Link href={'/cruises?name=nautika'}>Nautika</Link>
          </Menu.Item>
          <Menu.Item key={'Makruzz'}>
            <Link href={'/cruises?name=makruzz'}>Makruzz</Link>
          </Menu.Item>
          <Menu.Item key={'GreenOcean'}>
            <Link href={'/cruises?name=green ocean'}>Green Ocean</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key={'contact'}>
          <Link href={'/contact-us'}>Contact Us</Link>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div style={{ padding: '1% 5% 0 5%', backgroundColor: 'white', }}>

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
            <img src='/images/WEB3 Logo Final_h80.png' height={40} />
          </Link>
        </Col>
      </Row>



    </div>
  )
}
