import { db } from '@/firebase'
import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Select, Space, Tabs, message } from 'antd'
import React, { useEffect, useState } from 'react'


const packagedb = db.collection("package")
export default function AddPackage() {

    const [packageItem, setPackageItem] = useState([])
    const [singlePackage, setSinglePackage] = useState([])

    const [messageApi, contextHolder] = message.useMessage()

    const [selectedGroup, setSelectedGroup] = useState(null)
    const [selectedSinglePackage, setSelectedSinglePackage] = useState(null)


    useEffect(() => {
        packagedb.onSnapshot((snap) => {
            const packageTemp = []
            snap.forEach((snapdata) => {
                const singlePackageTemp = []
                packagedb.doc(`${snapdata.id}`).collection("singlePackage").onSnapshot((sn) => {
                    sn.forEach((single) => {
                        singlePackageTemp.push(single.data())
                    })
                })
                packageTemp.push({ id: snapdata.id, ...snapdata.data(), singlePackage: singlePackageTemp })
            })
            setPackageItem(packageTemp)
        })

    }, [])
    console.log(packageItem)
    useEffect(() => {
        if (selectedSinglePackage != null) {
            packagedb.doc(`${selectedSinglePackage}`)
                .collection("singlePackage").onSnapshot((snap) => {
                    const singlePackageTemp = []
                    snap.forEach((sndata) => {
                        singlePackageTemp.push({ id: sndata.id, ...sndata.data() })
                    })
                    setSinglePackage(singlePackageTemp)
                })
        }
    }, [selectedSinglePackage])


    function AddPacakgeGroup(value) {
        const slug = value.package_name.split(" ").join("-")
        packagedb.add({
            name: value.package_name,
            slug: `/package/${slug}`,
            meteDescription:value.meteDescription
        })
            .then(() => {
                messageApi.success("Added new Package Group Successfully!")
            })
            .catch((err) => {
                messageApi.error(err.message)
            })

    }

    function deleteGroup() {
        packagedb.doc(`${selectedSinglePackage}`).delete()
            .then(() => messageApi.success("Deleted Successfully!"))
            .catch((e) => messageApi.error(e.message))
    }

    function deleteSinglePackage(val) {
        if (selectedSinglePackage != null) {
            packagedb.doc(`${selectedSinglePackage}`)
                .collection("singlePackage").doc(`${val}`).delete()
                .then(() => messageApi.success("Deleted Successfully!"))
                .catch((e) => messageApi.error(e.message))
        }

    }




    function SelectedGrp() {
        const result = packageItem.find(f => f.name == selectedGroup)
        // console.log(result)
        if (result != undefined) {
            setSelectedSinglePackage(result.id)
        }
        const pos = packageItem.findIndex(i => i.name == selectedGroup)
        // console.log(pos)

        function addPackage(val) {
            const slug = val.package_name.split(" ").join("-")
            const value = val.package_name
            packagedb.doc(`${result.id}`)
                .collection("singlePackage")
                .add({
                    name: value,
                    slug: `/package/${selectedGroup.split(" ").join("-")}/${slug}`,
                    images: [],
                    thumbnail: "",
                    travelJourney: [],
                    title: "",
                    subtitle: "",
                    highlights: "",
                    inclusion: "",
                    overview: "",
                    exclusion: "",
                    metaDescription: "",
                    metaTag: "",
                    status: 'draft',
                    includeIcon:[]

                })
                .then(() => {
                    messageApi.success("Added new Package Successfully")
                })
                .catch((err) => {
                    messageApi.error(err.message)
                })

        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20, padding: '1%', border: "solid .3px rgba(0,0,0,.2)", width: 'fit-content' }}>
                {result !== undefined &&
                    singlePackage.map((res, i) => (
                        <Form key={i}>
                            <Space>
                                <Form.Item name='package_id' initialValue={res.name} label={`Package #${i + 1}`} style={{ margin: 0, fontWeight: 'bold' }}>
                                    <Input required placeholder='Enter Package Name' />
                                </Form.Item>

                                {/* <Button type='dashed' style={{ color: 'grey' }} htmlType='submit' >< SaveOutlined />Save</Button> */}
                                <Button type='dashed' style={{ color: 'grey' }} onClick={() => deleteSinglePackage(res.id)} >< DeleteOutlined />Delete</Button>
                            </Space>
                        </Form>
                    ))

                }
                <Form onFinish={addPackage}>
                    <Space>
                        <Form.Item name='package_name' label={"Package Name"} style={{ margin: 0 }}>
                            <Input required placeholder='Enter Package Name' />
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
            {packageItem.length !== 0 &&
                <>
                    <Space>
                        <p>Select Package Group Name: </p>
                        <Select
                            placeholder={"select Package Name"}
                            onSelect={setSelectedGroup}
                            value={selectedGroup}
                            options={packageItem.map((item, i) => {
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


                </>
            }
            <Divider />
            {/* Add new package group name div */}
            <div style={{ width: 'fit-content' }}>
                <Form style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20, padding: '1%', border: "solid .3px rgba(0,0,0,.2)" }}
                    onFinish={(e) => AddPacakgeGroup(e)}
                >
                    <Space>
                        <Form.Item name='package_name' label="Group Name" style={{ margin: 0 }}>
                            <Input required placeholder='Enter Package Group Name' />
                        </Form.Item>
                        <Form.Item name='meteDescription' label="Short Description" style={{ margin: 0 }}>
                            <Input required placeholder='Enter Short Meta Description' />
                        </Form.Item>
                        <Button type='dashed' style={{ color: 'grey' }} htmlType='submit'>< PlusOutlined />Add New Package Group</Button>
                    </Space>

                </Form>
            </div>
        </div>
    )
}
