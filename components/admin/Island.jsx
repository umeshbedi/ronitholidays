import { db } from '@/firebase';
import { DeleteFilled, DeleteOutlined, EditFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Modal, Select, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'
import AddIslandDetails from './AddIslandDetails';


const Islanddb = db.collection("island")

export default function Island() {
    const [open, setOpen] = useState(false);

    const [islandName, setislandName] = useState("")
    const [islandThumb, setIslandThumb] = useState("")
    const [headerImage, setHeaderImage] = useState("")
    const [metaDescription, setMetaDescription] = useState("")

    const [selectedIsland, setselectedIsland] = useState(null)
    const [islandItem, setislandItem] = useState([])
    const [SID, setSID] = useState(null)
    const [SIPD, setSIPD] = useState(null)
    const [SIPI, setSIPI] = useState(null)

    const [action, setAction] = useState("new")

    const [msg, showMsg] = message.useMessage()

    useEffect(() => {
        Islanddb.onSnapshot((snap) => {
            const tempIsland = []
            snap.forEach((sndata => {
                tempIsland.push({ id: sndata.id, ...sndata.data() })
            }))
            setislandItem(tempIsland)
        })
    }, [])

    function addNewIsland() {
        if (islandName != "" && islandThumb != "" && headerImage != "" && metaDescription != "") {
            Islanddb.add({
                name: islandName,
                slug: `/island/${islandName.split(" ").join("-")}`,
                thumbnail: islandThumb,
                headerImage, metaDescription,
                data: []

            }).then(() => { msg.success("Added new Island Succussfully!"); setOpen(false) })
            // console.log(islandName)
        } else { msg.error("All Fields are required") }
    }

    function deleteIsland() {
        if (confirm("are you sure want to delete??")) {
            Islanddb.doc(`${selectedIsland}`).delete().then(() =>
                msg.success("deleted"))
            setselectedIsland(null)
            setSIPD(null)
            setSIPI(null)
            setAction("new")
        } else { console.log("denied") }
    }

    useEffect(() => {
        if (selectedIsland != null) {
            const result = islandItem.find(f => f.id == selectedIsland)
            setSID(result)
        }
    }, [selectedIsland, islandItem])

    // console.log(SID)

    function updatePlace(name, about, metaDescription, thumbnail) {
        const tempSIPD = SID.data
        const editedPlace = {about, metaDescription, name, thumbnail,
            slug: tempSIPD[SIPI].slug,
            
        }
        tempSIPD[SIPI] = editedPlace
        Islanddb.doc(`${selectedIsland}`).update({
            data:tempSIPD
        }).then(()=>{
            msg.success("updated")
        })
    }

    function deletePlace(i) {
        const tempPlace = SID.data
        tempPlace.splice(i, 1)
        Islanddb.doc(`${selectedIsland}`).update({
            data: tempPlace
        }).then(() => {msg.success("deleted");setSIPD(null);setAction("new"); setSIPI(null)})
    }

    return (
        <div>
            {showMsg}
            <Button type='dashed' onClick={() => setOpen(true)} ><PlusOutlined /> Add new Island</Button>
            <div style={{ margin: '3% 0' }}>
                <Space>
                    <p>Select Island: </p>
                    <Select
                        placeholder={"select Island Name"}
                        onSelect={setselectedIsland}
                        value={selectedIsland}
                        options={islandItem.map((item, i) => {
                            return ({
                                value: item.id,
                                label: item.name
                            })
                        })}
                    />
                    {selectedIsland != null &&
                        <Button type='dashed' style={{ color: 'red', background: 'none' }}
                            onClick={deleteIsland}><DeleteOutlined /> Delete Island</Button>
                    }

                </Space>

                {SID != null && selectedIsland != null &&
                    <>
                        {SID.data.length != 0 &&
                            <div>
                                <Divider />
                                <h3 style={{ marginBottom: '2%' }}>Places of {SID.name}</h3>
                                {SID.data.map((d, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 10, color: '#25527b' }}>
                                        <p> <b> #{i + 1}:</b></p>
                                        <div style={{ marginBottom: 10 }}>
                                            <p>{d.name}  {" | "}
                                                <span style={{ cursor: 'pointer' }}><EditFilled onClick={() => {
                                                    setAction("edit"); setSIPD(d); setSIPI(i)
                                                }} /> {" | "} <DeleteFilled
                                                        onClick={() => deletePlace(i)} style={{ color: 'red' }} /></span>
                                            </p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        }
                        <AddIslandDetails
                            action={action}
                            SIPD={SIPD}
                            IslandSlug={SID.slug}
                            IslandId={selectedIsland}
                            update={updatePlace}
                            addnewPlace={()=>{setSIPD(null);setAction("new"); setSIPI(null)}}
                        />
                        
                    </>
                }
            </div>


            {/* ///PopUp Modal SEction//// */}
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={[
                    <Button type='primary' key={'btn'} onClick={addNewIsland}>Add</Button>,
                ]}
            >
                <div style={{ flexDirection: 'column', display: 'flex', gap: 10, padding: '1%' }}>
                    <p>Island Name, Header Image and Thumbnail:</p>
                    <Input placeholder='Enter Island Name' onChange={(e) => setislandName(e.target.value)} />
                    <Input placeholder='Enter Header Image Url' onChange={(e) => setHeaderImage(e.target.value)} />
                    <Input placeholder='Enter Thumbnail Url' onChange={(e) => setIslandThumb(e.target.value)} />
                    <Input placeholder='Enter Short Meta Description' onChange={(e) => setMetaDescription(e.target.value)} />

                </div>
            </Modal>
        </div>
    )
}
