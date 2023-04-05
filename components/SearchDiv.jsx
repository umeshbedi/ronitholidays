import React, { useState, useEffect } from 'react';
import { mobile, cityName, category } from './variables';
import { Select, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function SearchDiv() {

    const [cityDropDown, setCityDropDown] = useState([])
    const [categories, setCategories] = useState([])
    const [isMobile, setIsMobile] = useState(false)
    const [location, setLocation] = useState('')
    const [star, setStar] = useState('')
    const [messageApi, contextHolder] = message.useMessage();

    const router = useRouter()

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    useEffect(() => {
        var cityTemp = []
        var categoryTemp = []
        cityName.map((city) => {
            cityTemp.push({
                value: city.split(" ").join(""),
                label: city
            })
        })
        category.map((hotel) => {
            categoryTemp.push({
                value: hotel.split(" ").join(""),
                label: hotel
            })
        })
        setCategories(categoryTemp)
        setCityDropDown(cityTemp)

    }, [])

    function search(){
        if (location==''||star=='') {
            messageApi.error("Please Select Location and Star Hotels")
        }else{
            router.push('/search?location='+location+'&category='+star)
        }
    }

    return (
        <>
        {contextHolder}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {cityDropDown.length != 0 && categories.length != 0 &&
                    <div style={{
                        width: isMobile ? '80%' : '70%',
                        backgroundColor: 'white',
                        marginTop: -40,
                        borderRadius: 3,
                        boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 20px',
                        gap: 15,
                        flexDirection: isMobile ? 'column' : 'row'
                    }}
                    >


                        <Select
                            size='large'
                            options={cityDropDown}
                            style={{ width: '100%' }}
                            // defaultValue={cityDropDown[0].label}
                            placeholder={cityDropDown[0].label}
                            onSelect={(e) => {
                                const re = cityDropDown.find((f) => f.value == e)
                                setLocation(re.label)
                            }}
                        />
                        <Select
                            size='large'
                            options={categories}
                            style={{ width: '100%' }}
                            placeholder={categories[0].label}
                            onSelect={(e) => {
                                const re = categories.find((f) => f.value == e)
                                setStar(re.label)
                            }}
                        />
                        <Button
                            type='primary'
                            onClick={search}
                            size='large'
                            icon={<SearchOutlined />}
                            block={isMobile ? true : false}
                        >
                            Search
                        </Button>

                    </div>
                }
            </div>
        </>
    )
}
