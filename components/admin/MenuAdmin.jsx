import React, { useState, useEffect } from 'react'
import { HomeOutlined, PlusOutlined, MenuOutlined, MedicineBoxOutlined, BookOutlined } from '@ant-design/icons';
import { FaList, FaNewspaper, FaShip } from 'react-icons/fa'
import { Menu } from 'antd';

import { mobile } from '../variables';

export default function MenuAdmin({ menuClick }) {

  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  return (
    <div>
      <Menu
        mode={'inline'}
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          height: '100%',
          borderRight: 0,
          // backgroundColor:'green'
        }}
        disabledOverflow
        onClick={(e) => menuClick(e.key)}
        activeKey={active}
        theme={'dark'}
      >

        <Menu.Item key={'dashboard'} >
          <p> <HomeOutlined /> Dashboard</p>
        </Menu.Item>
        <Menu.Item key={'homepage'}>
          <p> <HomeOutlined /> Homepage</p>
        </Menu.Item>
        <Menu.SubMenu title={<p> <BookOutlined /> Packages</p>}>
          <Menu.Item key={'Packages'}>
            <p> <MedicineBoxOutlined /> Add Package Name</p>
          </Menu.Item>
          <Menu.Item key={'PackagDetail'}>
            <p> <MedicineBoxOutlined /> Add/Update Details</p>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key={'addcruises'}>
          <p><FaShip /> Ferry</p>
        </Menu.Item>
        <Menu.SubMenu title={<p><FaNewspaper /> Pages</p>}>
          <Menu.Item key={'about-us'} >
            <p>About Us</p>
          </Menu.Item>
          <Menu.Item key={'terms-and-condition'} >
            <p>Terms & Condition</p>
          </Menu.Item>
          <Menu.Item key={'privacy-policy'} >
            <p>Privacy Policy</p>
          </Menu.Item>
          <Menu.Item key={'disclaimer'}>
            <p>Disclaimer</p>
          </Menu.Item>
        </Menu.SubMenu>


      </Menu>
    </div>
  )
}
