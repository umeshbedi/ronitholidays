import React, { useState } from 'react'
import { Space, Button, Divider, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import JoditEditor from 'jodit-react';
import { db } from '@/firebase';
import firebase from 'firebase/compat/app';


export default function AddIslandDetails({ IslandId, IslandSlug }) {
    const [thumbnail, setThumbnail] = useState("")
    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [metaDescription, setMetaDescription] = useState("")

    const [msg, showMsg] = message.useMessage()

    function addIslandItem() {
        if (thumbnail != "" && name != "" && about != ""&& about!="<p><br></p>"&&metaDescription!="") {
            db.doc(`island/${IslandId}`).update({
                data: firebase.firestore.FieldValue.arrayUnion({
                    thumbnail, name, about,metaDescription,
                    slug: `${IslandSlug}/${name.split(" ").join("-")}`
                })
            }).then(() => {
                msg.success("Place Added");
                setThumbnail("")
                setName("")
                setAbout("")
            })
        } else {
            msg.error("All fields are required")
        }
    }
    return (
        <div>
            {showMsg}
            <Divider />
            <div style={{ flexDirection: 'column', display: 'flex', gap: 10 }}>
                <div>
                    <Space>
                        <h3 >Name of Place:</h3>
                        <input required placeholder='Enter Name of Place' onChange={(e) => setName(e.target.value)} />
                    </Space>
                </div>
                <div>
                    <Space>
                        <h3 >Thumbnail Url:</h3>
                        <input required placeholder='Enter Thumbnail Url' onChange={(e) => setThumbnail(e.target.value)} />
                    </Space>
                </div>
                <div>
                    <h3 style={{ marginBottom: 10 }}>About Place:</h3>
                    <JoditEditor onChange={e => { setAbout(e) }} />
                </div>
                <div>
                    <Space>
                        <h3 >Meta Description:</h3>
                        <input required placeholder='Enter short Meta Description' onChange={(e) => setMetaDescription(e.target.value)} />
                    </Space>
                </div>
                <div>
                    <Button onClick={addIslandItem} type='primary'><PlusOutlined /> Add Place</Button>
                </div>
            </div>
        </div>
    )
}
