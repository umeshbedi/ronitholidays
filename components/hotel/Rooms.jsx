import React,{useState} from 'react'
import ImageGallery from 'react-image-gallery'
import { MinusPlus, images } from '../variables'
import { Button, Divider, Select } from 'antd'
import style from '@/styles/component.module.scss'
import {CheckOutlined, RightOutlined} from '@ant-design/icons'
export default function Rooms({category}) {
    
    const [roomNumber, setRoomNumber] = useState(0)
    const [adult, setAdult] = useState(0)
    const [child, setChild] = useState(0)

    return (
        <div>
            <div style={{ display: 'flex', gap: '5%' }}>
                <div style={{ width: '40%' }}>
                    <h1 style={{marginBottom:'3%'}}>{category}</h1>
                    <ImageGallery items={images}
                        lazyLoad={true}
                        showPlayButton={false}
                        useTranslate3D={true}
                        showThumbnails={false}
                        showFullscreenButton={false}
                        onScreenChange={(e) => {
                            if (!e) {
                                console.log("ended")
                            }
                        }}

                    />

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6%' }}>
                    <p><b> Guest and Room Option</b></p>

                    <Select
                        size='large'
                        options={[
                            { value: 'withouBreakfast', label: 'Without BreakFast' },
                            { value: 'withouBreakfast', label: 'Without BreakFast' },
                            { value: 'withouBreakfast', label: 'Without BreakFast' },
                        ]}
                        placeholder={'Select Food Option'}
                        onSelect={(e) => {
                            // const re = starHotel.find((f) => f.value == e)
                            // setStar(re.label)
                        }}
                    />
                    
                    <MinusPlus
                        text={'Room'}
                        number={roomNumber}
                        minusOnPress={() => {
                            if (roomNumber > 0) {
                                setRoomNumber(roomNumber - 1)
                            }
                        }}
                        pluOnPress={() => setRoomNumber(roomNumber + 1)}
                    />

                    <MinusPlus
                        text={'Adults'}
                        number={adult}
                        minusOnPress={() => {
                            if (adult > 0) {
                                setAdult(adult - 1)
                            }
                        }}
                        pluOnPress={() => setAdult(adult + 1)}
                    />

                    <MinusPlus
                        text={'Childs'}
                        subText={"(0-5 Y)"}
                        number={child}
                        minusOnPress={() => {
                            if (child > 0) {
                                setChild(child - 1)
                            }
                        }}
                        pluOnPress={() => setChild(child + 1)}
                    />
                    <MinusPlus
                        text={'Childs'}
                        subText={"(6-12 Y)"}
                        number={child}
                        minusOnPress={() => {
                            if (child > 0) {
                                setChild(child - 1)
                            }
                        }}
                        pluOnPress={() => setChild(child + 1)}
                    />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                    <div style={{display:'flex', flexDirection:'column', gap:6}}>
                        <p> <b> Available</b></p>
                        <p> <CheckOutlined/> Rooms Available!</p>
                        <p> <CheckOutlined/> 0 Room Selected!</p>
                        <p><CheckOutlined/> Cancel 7 Day Before For Full Refund</p>
                    </div>
                        <Divider/>
                    <div>
                        <p style={{ textDecoration: 'line-through' }}>₹11,299</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '200%' }}>₹9,085</h1>
                            <p style={{ marginLeft: 3 }}>/Night</p>
                        </div>
                        <p style={{color:style.primaryColor}}><b>You Saved ₹2000</b></p>
                        <br />
                        <Button type='primary' size='large'>
                            Select Room
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
