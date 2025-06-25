import React, { useEffect, useState } from 'react'
import { mobile } from '../variables'
import { Skeleton } from 'antd'

export default function SHome() {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])
    return (
        <>
            <div style={{ width:"100%" }}>
            <Skeleton.Button block active style={{ height: 500}} />
                
            </div>
        </>
    )
}
