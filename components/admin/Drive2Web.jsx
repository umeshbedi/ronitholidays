import { CopyFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import style from '@/styles/component.module.scss'
import { message } from 'antd'

export default function Drive2Web() {
    const [url, setUrl] = useState(undefined)
    const [msg, showMsg] = message.useMessage()
    
    function changeUrl(e){
        const splitted = e.split("/")
        if (splitted[2]=='drive.google.com') {
            const finalUrl = `https://drive.google.com/uc?export=view&id=${splitted[5]}`
            setUrl(finalUrl)
        }else{
            setUrl(undefined)
        }
    }

    return (
        <div style={{flexDirection:'column', display:'flex', gap:15}}>
            {showMsg}
            <h2>Convert Drive Image to Website Image</h2>
            <input type="text" placeholder='Enter drive Image Url' onChange={(e)=>changeUrl(e.target.value)}/>
            {url!=undefined &&
            <p>{url} <CopyFilled style={{color:style.primaryColor, cursor:'pointer'}} onClick={()=>{
                navigator.clipboard.writeText(url).then(()=>{
                    msg.success("Copied")
                })
            }}/></p>
            }
        </div>
    )
}
