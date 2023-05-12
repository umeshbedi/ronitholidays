import Link from 'next/link';
import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'lightgrey', padding: '4% 0' }}>
      <div style={{ width: "80%" }}>
        <Carousel
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          customTransition="all 1.5s"
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {activityData.map((item, i) => (
            <Link key={i} target='blank' href={item.slug}>
              <div style={{
                width: 250,
                height: 250,
                background: `url(${item.thumbnail})`,
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                <div
                  style={{
                    padding: '3%',
                    color: 'white',
                    background: "rgba(0,0,0,.4)",
                    borderRadius: "0 0 10px 10px",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <p>{item.name}</p>
                  <FaLongArrowAltRight style={{ marginLeft: 10 }} />
                </div>
              </div>
            </Link>
          ))
          }
          
        </Carousel>
      </div>
    </div>
  )
}
