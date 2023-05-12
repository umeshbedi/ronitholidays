import { Image } from "antd";
import Link from "next/link";
import React from "react";
import ReactCardCarousel from "react-card-carousel";
import { FaLongArrowAltRight } from "react-icons/fa";

function CONTAINER_STYLE() {
    return {
        position: "relative",
        height: '55vh',
        width: "100%",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "middle",
        // background: 'red'
    };
}

export default function FerryCarousel({ ferryData }) {
    console.log(ferryData)
    return (
        <div style={{
            gap: 30,
            padding: '5% 0',
        }}>
            <h1 style={{ textAlign: 'center' }}>Popular Cruise</h1>
            <div style={{ width: '100%', display: 'flex', justifyContent: "center" }}>
                <img src="/images/noun-decorative-line-4253409.svg" alt="decorative line" style={{ width: 300, margin: '1% 0 1% 0' }} />
            </div>
            <div style={CONTAINER_STYLE()}>
                <ReactCardCarousel autoplay={true} autoplay_speed={3000}>
                    {ferryData.map((item, i) => (

                        <div key={i} style={{
                            width: "500px",
                            height: '300px',
                            borderRadius: "10px",
                            boxSizing: "border-box",
                            background: `url(${item.thumbnail})`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            backgroundSize: 'cover'
                        }}>
                            <Link href={item.slug} target="blank"
                            style={{
                                padding: '3%',
                                color: 'white',
                                background: "rgba(0,0,0,.4)",
                                borderRadius: "0 0 10px 10px",
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                            >
                                <h2>
                                    {item.name}
                                </h2>
                                <FaLongArrowAltRight style={{marginLeft:10}}/>
                            </Link>
                        </div>

                    ))}
                </ReactCardCarousel>
            </div>
        </div>
    );
}


