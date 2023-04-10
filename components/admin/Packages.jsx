import { db } from '@/firebase'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Select, Space, Tabs, message } from 'antd'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app';

export default function Menu() {
    const [menuItem, setMenuItem] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const [selectedGroup, setSelectedGroup] = useState(null)
    const menu = db.collection('menu')
    const packages = menuItem.length !== 0 ? menu.doc(`${menuItem[0].ID}`) : null
    useEffect(() => {
        menu.where("name", "==", "packages").onSnapshot(snap => {
            const menuTemp = []
            snap.forEach(i => {
                // console.log(i.id)
                menuTemp.push({ ID: i.id, ...i.data() })
            })
            setMenuItem(menuTemp)
        })
    }, [])

    function AddPacakgeGroup(value) {
        packages.update({
            menuItems: firebase.firestore.FieldValue.arrayUnion({
                name: value.package_name,
                slug: value.url_slug,
                menuItems: []
            })
        })
            .then(() => {
                messageApi.success("Added new Package Successfully")
            })
            .catch((err) => {
                messageApi.error(err.message)
            })
    }
    function deleteGroup() {
        const pos = menuItem[0].menuItems.findIndex(i => i.name == selectedGroup)
        menuItem[0].menuItems.splice(pos, 1)
        // console.log(menuItem[0].menuItems)

        menu.doc(`${menuItem[0].ID}`).update({
            menuItems: menuItem[0].menuItems
        })
            .then(() => {
                messageApi.success("Deleted Successfully")
                setSelectedGroup(null)
            })
            .catch((err) => {
                messageApi.error(err.message)
            })
    }
    // console.log(menuItem[0].ID)
    // console.log(selectedGroup)
    function updatePackage(){
        packages.update({
            menuItems:menuItem[0].menuItems
        })
        .then(() => {
            messageApi.success("Added new Package Successfully")
        })
        .catch((err) => {
            messageApi.error(err.message)
        })
    }


    function SelectedGrp() {
        const result = menuItem[0].menuItems.find(f => f.name == selectedGroup)
        // console.log(result)
        const pos = menuItem[0].menuItems.findIndex(i => i.name == selectedGroup)
        // console.log(pos)
        
        function addPackage(val) {
            menuItem[0].menuItems[pos].menuItems.push({
                name: val.package_name,
                slug: val.url_slug
            })
            console.log(menuItem[0].menuItems[pos])
            updatePackage()
        }

        function deleteSinglePackage(val){
            // console.log(val)
            const deleteElement = result.menuItems.find((f)=>f.name==val.package_name)
            const delpos = result.menuItems.findIndex(i=>i.name==val.package_name)
            console.log(deleteElement)
            console.log(delpos)
            menuItem[0].menuItems[pos].menuItems.splice(delpos, 1)
            // console.log(menuItem[0].menuItems[pos].menuItems[delpos])
            console.log(menuItem[0].menuItems[pos])
            updatePackage()
        }   

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20, padding: '1%', border: "solid .3px rgba(0,0,0,.2)", width: 'fit-content' }}>
                {result!==undefined &&
                    result.menuItems.map((res, i) => (
                        <Form onFinish={deleteSinglePackage} key={i}>
                            <Space>
                                <Form.Item name='package_name' initialValue={res.name} label={"Package Name"} style={{ margin: 0 }}>
                                    <Input required placeholder='Enter Package Name' defaultValue={res.name} />
                                </Form.Item>
                                <Form.Item name='url_slug' label="Url Slug" initialValue={res.slug} style={{ margin: 0 }}>
                                    <Input required placeholder='Enter Package Url Slug' defaultValue={res.slug} />
                                </Form.Item>
                                <Button type='dashed' style={{ color: 'grey' }} htmlType='submit' >< DeleteOutlined />Delete Package</Button>
                            </Space>
                        </Form>
                    ))

                }
                <Form onFinish={addPackage}>
                    <Space>
                        <Form.Item name='package_name' label={"Package Name"} style={{ margin: 0 }}>
                            <Input required placeholder='Enter Package Name' />
                        </Form.Item>
                        <Form.Item name='url_slug' label="Url Slug" style={{ margin: 0 }}>
                            <Input required placeholder='Enter Package Url Slug' />
                        </Form.Item>
                        <Button type='dashed' style={{ color: 'grey' }} htmlType='submit'>< PlusOutlined />Add New Package</Button>
                    </Space>
                </Form>

            </div>
        )
    }

    return (
        <div>
            {contextHolder}
            <h1 style={{ fontSize: '150%', marginBottom: 10 }}>Packages</h1>
            {menuItem.length !== 0 &&
                <>
                    <Space>
                        <p>Package Group Name: </p>
                        <Select
                            placeholder={"select Package Name"}
                            onSelect={setSelectedGroup}
                            value={selectedGroup}
                            options={menuItem[0].menuItems.map((item, i) => {
                                return ({
                                    value: item.name,
                                    label: item.name
                                })
                            })}
                        />
                        {selectedGroup != null &&
                            <Button type='dashed' style={{ color: 'red', background: 'none' }} onClick={deleteGroup}><DeleteOutlined /> Delete Selected Package Group</Button>
                        }
                    </Space>

                    {selectedGroup != null
                        ?
                        <SelectedGrp />
                        :
                        null
                    }

                    <Divider/>
                    {/* Add new package group name div */}
                    <div style={{ width: 'fit-content' }}>
                        <Form style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20, padding: '1%', border: "solid .3px rgba(0,0,0,.2)" }}
                            onFinish={(e) => AddPacakgeGroup(e)}
                        >
                            <Space>
                                <Form.Item name='package_name' label="Group Name" style={{ margin: 0 }}>
                                    <Input required placeholder='Enter Package Group Name' />
                                </Form.Item>
                                <Form.Item name='url_slug' label="Url Slug" style={{ margin: 0 }}>
                                    <Input required placeholder='Enter Package Url Slug' />
                                </Form.Item>
                                <Button type='dashed' style={{ color: 'grey' }} htmlType='submit'>< PlusOutlined />Add New Package Group</Button>
                            </Space>

                        </Form>
                    </div>
                </>
            }
        </div>
    )
}
