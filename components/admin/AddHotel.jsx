import { Input, Select, Space, message } from 'antd'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddHotel() {
    const [messageApi, contextHolder] = message.useMessage()

    const [policies, setPolicies] = useState('')
    const [about, setAbout] = useState("")

    return (
        <div>
            {contextHolder}
            <div style={{ gap: 20, width: '70%', display: 'flex', flexDirection: 'column' }}>

                <div>
                    <p style={{ marginBottom: 5 }}>Hotel Name:</p>
                    <Input placeholder='Enter Hotel Name' size='large' />
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Hotel Type | Category | Location - longitude and latitude (<a style={{color:'orange'}} href="https://www.google.com/maps">from google map</a>)</p>
                    <Space>
                        <Select
                            placeholder={"Select Type"}
                            size='large'
                            options={[{ value: 'hotel', label: 'Hotel' }, { value: 'resorts', label: 'Resorts' }]}
                        />
                        <Select
                            placeholder={"Select Category"}
                            size='large'
                            options={[
                                { value: 'Budget', label: 'Budget' },
                                { value: 'Standard', label: 'Standard' },
                                { value: 'Premium', label: 'Premium' },
                                { value: 'Luxury', label: 'Luxury' }
                            ]}
                        />
                        <Input placeholder='Location longitude and latitude from google map' size='large' />
                    </Space>
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Address:</p>
                    <Input placeholder='Enter Hotel Address' size='large' />
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>About:</p>
                    <ReactQuill theme='snow' value={about} onChange={setAbout} style={{ height: 200, backgroundColor: 'white', marginBottom: 50 }} />
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Policies:</p>
                    <ReactQuill theme='snow' value={policies} onChange={setPolicies} style={{ height: 200, backgroundColor: 'white', marginBottom: 50 }} />
                </div>
            </div>
        </div>
    )
}
