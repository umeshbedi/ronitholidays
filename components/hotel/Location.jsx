import React from 'react'
import { Skeleton } from 'antd'
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'

export default function Location() {
    
    const {isLoaded} = useLoadScript({
        googleMapsApiKey:process.env.NEXT_PUBLIC_MAP_API_KEY
    })

    if (!isLoaded) return <Skeleton/>

  return (
    <GoogleMap
    zoom={10}
    center={{lat:13.29617214455583, lng:92.86099864333278}}
    mapContainerStyle={{width:'100%', height:300}}
    >

    </GoogleMap>
  )
}
