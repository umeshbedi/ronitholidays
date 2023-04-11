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
            <Skeleton.Button active style={{ height: 500, width: '100%' }} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                

            </div>
        </>
    )
}
