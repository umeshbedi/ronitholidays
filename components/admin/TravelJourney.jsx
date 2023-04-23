import { db } from '@/firebase'
import { DeleteFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'

export default function TravelJourney({ groupId, packageId, data }) {
    const packagedb = db.collection("package").doc(`${groupId}`).collection("singlePackage").doc(`${packageId}`)

    const [msg, showMsg] = message.useMessage()

    const [tjHeading, setTjHeading] = useState(null)
    const [tjContent, setTjContent] = useState(null)

    const [tj, setTj] = useState([])

    function submit() {
        if (tjHeading != null && tjContent != null) {
            const tempTravel = []
            tj.forEach(d => {
                tempTravel.push(d)
            })
            tempTravel.push({ heading: tjHeading, content: tjContent })
            packagedb.update({
                travelJourney: tempTravel
            })
        } else {
            msg.error("Please Enter value")
        }
    }

    function deleteTj(e) {
        
        const tempTravel = []
        tj.forEach(d => {
            tempTravel.push(d)
        })
        tempTravel.splice(e,1)
        packagedb.update({
            travelJourney: tempTravel
        })
    }

    useEffect(() => {
        packagedb.onSnapshot((snap) => setTj(snap.data().travelJourney))
    }, [])

    return (
        <div>
            {showMsg}
            <Form >
                <Form.Item name='travelJourney' label={"Travel Journey"}>
                    <div style={{ padding: '1%', border: "solid .3px rgba(0,0,0,.2)" }}>
                        {tj.map((step, i) => (
                            <Space key={i} style={{border:"solid 1px rgba(0,0,0,.2)", width:'100%', padding:'1%', marginBottom:10}}>
                                <p>#{i+1}</p>
                                <div style={{paddingRight:'3%'}}>
                                    <h3>{step.heading}</h3>
                                    <p>{step.content}</p>
                                </div>
                                <DeleteFilled onClick={()=>deleteTj(i)} style={{position:'absolute', right:'3%', cursor:'pointer', color:'red'}}/>
                            </Space>
                        ))}
                        <Form.Item name={'heading'} style={{ margin: 0 }}>
                            <Input required placeholder='Enter Heading' style={{ marginBottom: 10 }} onChange={e => setTjHeading(e.target.value)} />
                        </Form.Item>
                        <Form.Item name={'content'} style={{ margin: 0 }}>
                            <Input.TextArea required placeholder='Inner Content' style={{ marginBottom: 10 }} onChange={e => setTjContent(e.target.value)} />
                        </Form.Item>
                        <Button type='dashed' onClick={submit}><PlusOutlined /> Add Steps</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}
