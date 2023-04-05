import { db } from '@/firebase';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PageUpdate({pageName}) {
    const [value, setValue] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    
    function Submit(){
        setLoading(true)
        db.collection('pages').doc(`${pageName}`).update({
            data:value
        }).then((e)=>{
            messageApi.success("Page Updated Successfully!")
            setLoading(false)
        }).catch((err)=>{
            messageApi.error(err.message)
        })
    }

    useEffect(()=>{
        db.collection('pages').doc(`${pageName}`).get()
        .then((snap)=>{
            setValue(snap.data().data)
        })
    },[pageName])

    return (
    <div>
        {contextHolder}

        <h1 style={{fontSize:'200%', marginBottom:20}}>{pageName}</h1>
        <ReactQuill theme="snow" value={value} onChange={setValue} style={{height:400}}/>        
        <Button loading={loading} onClick={Submit} type='primary' size='large' style={{marginTop:'8%'}}>Save</Button>
    </div>
  )
}
