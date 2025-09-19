import React, { useEffect, useState } from 'react'
import JoditEditor from 'jodit-react';
import { db } from '@/firebase';
import { Button, Divider, Select, Space, message } from 'antd';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid'
import firebase from 'firebase/compat/app';


const blogsdb = db.collection('blogs')

export default function AddBlogsDetails({ details, BlogsId }) {

    const [msg, showMsg] = message.useMessage()

    const [headerImage, setHeaderImage] = useState(details.headerImage)
    const [image, setImage] = useState(details.image)
    const [about, setAbout] = useState(details.about)
    const [metaTitle, setMetaTitle] = useState(details.metaTitle)
    const [metaDescription, setMetaDescription] = useState(details.metaDescription)
    const [metaKeywords, setMetaKeywords] = useState(details.metaKeywords)


    function submit() {
        blogsdb.doc(`${BlogsId}`).update({
            headerImage,
            image,
            about,
            metaTitle,
            metaDescription,
            metaKeywords
        })
            .then(() => msg.success("updated successfully!"))
            .catch(err => msg.error(err.message))
    }


    return (
        <div style={{ marginTop: '2%', flexDirection: 'column', display: 'flex', gap: 20 }}>
            {showMsg}
            <div>
                <Space>
                    <h3 >Header Image Url:</h3>
                    <input required defaultValue={details.headerImage} placeholder='Enter url of Header Image' onChange={(e) => setHeaderImage(e.target.value)} />
                </Space>
            </div>
            <div>
                <Space>
                    <h3 >Image Url:</h3>
                    <input required defaultValue={details.image} placeholder='Enter url of Image' onChange={(e) => setImage(e.target.value)} />
                </Space>
            </div>
            <div>
                <h3 style={{ marginBottom: 10 }}>About {details.name}:</h3>
                <JoditEditor onBlur={e => { setAbout(e) }} value={details.about} />
            </div>
           
            <Divider />
           
            <Divider>SEO Section</Divider>
            <div>
                <Space>
                    <p>Meta Title:</p>
                    <input required defaultValue={details.metaTitle} placeholder='Enter Meta Title' onChange={(e) => setMetaTitle(e.target.value)} />
                </Space>
                <Space style={{ marginRight: 10 }}>
                    <p>Meta Description:</p>
                    <input required defaultValue={details.metaDescription} placeholder='Enter Meta Description' onChange={(e) => setMetaDescription(e.target.value)} />
                </Space>
                <Space style={{ marginRight: 10 }}>
                    <p>Meta Keywords:</p>
                    <input required defaultValue={details.metaKeywords} placeholder='Enter Meta Keywords' onChange={(e) => setMetaKeywords(e.target.value)} />
                </Space>
            </div>
            <div>
                <Button onClick={submit} type='primary'>Publish</Button>
            </div>

        </div>
    )
}
