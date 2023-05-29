import { Button, Image, Skeleton } from 'antd'
import React, { useState, useEffect } from 'react'

import style from '@/styles/component.module.scss'
import Link from 'next/link'
import Title from './Title'
import { mobile } from '../variables'

export default function Offer() {

    const visit = ["#", "#", "#"]

    const [isMobile, setIsMobile] = useState(false)

    function Cruize({left, top, right, bottom, image, name, link}){
        return(
            <div style={{ position: 'absolute', left: left, top: top, right:right, bottom:bottom }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', flexDirection:'column', display:'flex', alignItems:'center', width:'100%', bottom:20, zIndex:2 }}>
                        <h3 style={{color:'white', marginBottom:5, background:"rgba(0,0,0,.3)", padding:"0 5px"}}>{name}</h3>
                        <div>
                        <Button type='primary' onClick={()=>window.location.href=link}>Visit</Button>
                        </div>
                    </div>
                    <img src={image} alt="" style={{ width: isMobile ? 200 : 300 }} />
                </div>
            </div>
        )
    }

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    return (
        <div style={{
            margin: "3% 0",
            position: 'relative',
            width: "100%",
            height: 600,
            background: "url('/images/Ship Wallpapers.jpg')",
            backgroundSize: 'cover',
            backgroundPositionY: 'center',
            backgroundPositionX: 'center'
        }}
        >

            <div style={{ paddingTop: 20, height: '100%' }}>

                <Title red={"Awesome"} blue={"Cruise Servies"} />
            </div>

            <Cruize 
            left={isMobile?5:20} 
            top={isMobile ? "35%" : '20%'} 
            image={"/images/2.webp"} 
            name={"Nautika"}
            link={"/ferry/Nautika"}
            />

            <Cruize 
            right={isMobile?5:20} 
            top={isMobile ? "35%" : '20%'} 
            image={"/images/3.webp"} 
            name={"Makruzz"}
            link={"/ferry/Makruzz"}
            />

            
            <div style={{ position: 'absolute', bottom: 10, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Cruize 
            bottom={0}
            image={"/images/4.webp"} 
            name={"Green Ocean 1"}
            link={"/ferry/Green-Ocean-1"}
            />  
            </div>



        </div>
    )
}
