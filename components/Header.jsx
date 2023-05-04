import React, { useEffect, useState } from 'react'
import { Menu, Col, Row, Button, Drawer, Space, Divider } from 'antd'
import { } from 'react-icons/fi'
import Link from 'next/link';
import { mobile, ferry, cityName, activity } from './variables';
import { FaAngleDown, FaYenSign } from 'react-icons/fa'
import { IoIosMenu } from 'react-icons/io'
import style from '@/styles/component.module.scss'
import { db } from '@/firebase';
import Image from 'next/image'
export default function Header() {

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('home')
  const [packages, setPackages] = useState([])

  const [ferryList, setFerryList] = useState([])
  const [islandList, setIslandList] = useState([])

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  useEffect(() => {
    db.collection("package").get().then((snap) => {
      const packageTemp = []
      snap.forEach((sndata => {
        const singlePackageTemp = []
        db.doc(`package/${sndata.id}`)
          .collection('singlePackage').where("status",'==', 'published').get()
          .then((newpkg => {
            newpkg.forEach((pkg) => {
              singlePackageTemp.push(pkg.data())
            })
          }))

        packageTemp.push({ id: sndata.id, ...sndata.data(), singlePackage: singlePackageTemp })

      }))

      setPackages(packageTemp)

    })
  }, [])

  useEffect(()=>{
    db.collection('ferry').get().then((snap)=>{
      const tempFerry = []
      snap.forEach((sndata)=>{
        tempFerry.push(sndata.data())
      })
      setFerryList(tempFerry)
    })

    db.collection("island").get().then((snap)=>{
      const tempIsland = []
      snap.forEach((sndata)=>{
        tempIsland.push(sndata.data())
      })
      setIslandList(tempIsland)
    })
  },[])

  
  function MegaMenu() {
    return (
      <Space style={{ alignItems: 'flex-start' }}>
        {packages.map((item, index) => {
          return (
            <>
              <Menu
                style={{ boxShadow: 'none', border: index == packages.length - 1 ? "none" : 'auto' }}
                key={index}
              >
                <Menu.Item style={{ backgroundColor: 'white' }}>
                  <Link target='blank' href={item.slug}> <p ><b>{item.name}</b></p></Link>
                </Menu.Item>
                {item.singlePackage.map((e, key) => (
                  <Menu.Item key={key}>
                    <Link target='blank' href={e.slug}>{e.name}</Link>
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
        <Menu.SubMenu title={<p >Know{isMobile ? null : <FaAngleDown />}</p>}>
          <Menu.Item key={'about-us'}>
            <Link target='blank' href={'/about-us'}>About Us</Link>
          </Menu.Item>
          <Menu.Item key={'about-andman'}>
            <Link target='blank' href={'/about-andman'}>About Andman</Link>
          </Menu.Item>
          <Menu.Item key={'how-to-reach-andman'}>
            <Link target='blank' href={'/how-to-reach-andman'}>How to reach Andman</Link>
          </Menu.Item>
          <Menu.Item key={'visit-andman'}>
            <Link target='blank' href={'/how-to-visit-andman'}>How to Visit Andman</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu title={<p >Island{isMobile ? null : <FaAngleDown />}</p>}>
          {
            islandList.map((name, key) => (
              <Menu.Item key={key}>
                <Link target='blank' href={name.slug}>{name.name}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>

        <Menu.SubMenu
          title={<p >Package{isMobile ? null : <FaAngleDown />}</p>}
        >
          <Menu.Item key={'package'} style={{ height: 'fit-content', backgroundColor: 'white' }}>
            {packages.length != 0 &&
              <MegaMenu />
            }
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          title={<p >Activity{isMobile ? null : <FaAngleDown />}</p>}
        >
          <div style={{display:'grid', gridTemplateColumns:"repeat(4, auto)"}}>
          {activity.map((act, key) => (
            <Menu.Item key={key}>
              <Link target='blank' href={'/activity' + act}>{act}</Link>
            </Menu.Item>
          ))

          }
          </div>
        </Menu.SubMenu>

        <Menu.SubMenu title={<p >Ferry{isMobile ? null : <FaAngleDown />}</p>}>
          {
            ferryList.map((ferry, key) => (
              <Menu.Item key={key}>
                <Link target='blank' href={ferry.slug}>{ferry.name}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>
        <Menu.Item key={'blog'}>
          <Link target='blank' href={'/blog'}>Blog</Link>
        </Menu.Item>
        <Menu.Item key={'contact'}>
          <Link target='blank' href={'/contact-us'}>Contact Us</Link>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div style={{ padding: '2% 5% 1% 5%', backgroundColor: 'white', }} id='menuDiv'>

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
            <Image src='/images/ronitholidays Logo Final_h80.png' height={45} width={200} alt='ronitholidays Logo Final'/>
          </Link>
        </Col>
      </Row>



    </div>
  )
}
