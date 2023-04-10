import { db } from '@/firebase';
import { Input,Button, Select, Space, message } from 'antd'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddHotel() {
    
    const [messageApi, contextHolder] = message.useMessage()
    const [details, setDetails] = useState('')
    const [about, setAbout] = useState("")

    function AddDetails(){
        db.doc("menu/KkeYzxQdPQ2WrGWrm6rs").update({
            content:details
        })
        .then(()=>messageApi.success("Added Successfully!"))
    }

    return (
        <div>
            {contextHolder}
            <div style={{ gap: 20,  display: 'flex', flexDirection: 'column' }}>

                <div>
                    <p style={{ marginBottom: 5 }}>Add Details</p>
                    <ReactQuill
                     theme='snow' value={details} onChange={setDetails} style={{ height: 400, backgroundColor: 'white', marginBottom: 50 }} />
                </div>
                <div>
                <Button type='primary' onClick={AddDetails}>Save</Button>
                </div>
            </div>
        </div>
    )
}
