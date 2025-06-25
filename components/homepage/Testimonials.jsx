import React, { useEffect, useState } from 'react'
import "react-multi-carousel/lib/styles.css";
import { mobile } from '../variables';
import Title from './Title';

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials({ testimonialsData }) {

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    


    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#252d35', padding: '4% 0' }}>
            <img src="/images/Google-Reviews.png" alt="Google Reviews" style={{height:70}}/>
            <Title 
            red={"Google Reviews for"} 
            blue={"Ronit Holidays awesome services"} isdark 
            extra={
                <div>
                    <p style={{textAlign:'center', color:'white', padding:"0 10px"}}>You can review us for our services ➡ <span>
                        <a href='https://www.google.com/search?q=RONIT+TRAVELS+%26+HOLIDAYS&stick=H4sIAAAAAAAA_-NgU1I1qDA2sLCwNDVLNjRNSzZJMTO0MqhIMUi1TDUzNkk0SEpOMTW3XMQqEeTv5xmiEBLkGObqE6ygpuDh7-Pp4hgZDAA0X8lvRAAAAA&hl=en&mat=Ce2Mtunz_4eRElcBpsFAC74yMHlFTBKoEQSCaBeuk8ja5vKDP30qubt1d9pvedQv8Jpg4FZUM-KsjJ8RBZINcCl6CPiLuqBeiogn2wt6YBERqZXLbCV2hJJqWA4HPfj4dAY&authuser=1' 
                        target='blank'
                        style={{color:'#4285F4'}}>Click Here
                        </a>
                        </span></p>
                </div>
            }/>
            <div style={{ width: isMobile ? "90%" : "80%", marginTop: 20 }}>
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        // slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"

                >
                    {testimonialsData.map((item, i) => (
                        <SwiperSlide
                            key={i}>
                            <div
                                style={{
                                    background: 'white',
                                    borderRadius: "30px 30px 30px 0",
                                    padding: "40px 30px 40px 35px"
                                }}
                            >
                                <FaQuoteLeft style={{ fontSize: 35, color: 'lightgrey' }} />
                                <div>
                                    <p>{item.content}</p>
                                </div>

                            </div>
                            <div>
                                <img src="/images/curve.svg" style={{ marginTop: -3, height: 40, position: 'absolute' }} />
                                <div style={{ marginLeft: 40, paddingTop: 10 }}>
                                    <p style={{ color: 'white' }}><b>{item.name}</b></p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    )
}
