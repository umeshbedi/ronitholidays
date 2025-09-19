
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactCardCarousel from "react-card-carousel";
import { FaLongArrowAltRight } from "react-icons/fa";
import { mobile } from "../variables";
import Title from "./Title";
import Image from 'next/image';

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

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    return (
        <div
            className="backCurve2"
            style={{
                padding: '5% 0',

            }}>
            <Title red={"Popular"} blue={"Cruise"} />
            <div style={CONTAINER_STYLE()}>
                <ReactCardCarousel autoplay={true} autoplay_speed={3000}>
                    {ferryData.map((item, i) => (

                        <div key={i} style={{
                            width: isMobile ? 300 : 500,
                            height: 300,
                            boxSizing: "border-box",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            backgroundSize: 'cover',
                            backgroundPositionX: 'center',
                            position: 'relative'
                        }}>
                            <Image
                                src={item.thumbnail}
                                height={300}
                                width={isMobile ? 300 : 500}
                                style={{ objectFit: 'cover', borderRadius: "10px", }}
                                loading='lazy'
                                placeholder='blur'
                                blurDataURL="/images/Loading_icon.gif"
                                alt={item.name}
                            />
                            <Link href={item.slug} target="blank"
                                style={{
                                    width: '100%',
                                    position: 'absolute',
                                    padding: '3%',
                                    color: 'white',
                                    background: "rgba(0,0,0,.4)",
                                    borderRadius: "0 0 10px 10px",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <h2>
                                    {item.name}
                                </h2>
                                <FaLongArrowAltRight style={{ marginLeft: 10 }} />
                            </Link>
                        </div>

                    ))}
                </ReactCardCarousel>
            </div>
        </div>
    );
}


