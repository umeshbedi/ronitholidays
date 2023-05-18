import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { boxShadow, mobile } from '../variables';
import Title from './Title';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


export default function ActivityCarousel({ activityData }) {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  return (

    <div 
    className='backCurve3'
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // background: "url('/images/istockphoto-1168080557-612x612.jpg')",
      padding: '4% 0',


    }}
    >
      <Title red={"Trending"} blue={"Activities"} />
      <div style={{ width: isMobile ? "90%" : "80%", marginTop: 20 }}>
        <Carousel
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          customTransition="all 1.5s"
          containerClass="Activity-carousel"
          removeArrowOnDeviceType={["tablet", "mobile"]}

        >
          {activityData.map((item, i) => (
            <Link
              data-aos-anchor-placement="top-bottom"
              data-aos="fade-up"
              data-aos-duration="2000"
              key={i} target='blank' href={item.slug}>
              <div style={{
                width: 250,
                height: 250,
                background: `url(${item.thumbnail})`,
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                boxShadow: boxShadow
              }}>

              </div>
            </Link>
          ))
          }

        </Carousel>
      </div>
    </div>
  )
}
