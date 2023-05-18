import { Divider } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import style from '@/styles/component.module.scss'
import { db } from '@/firebase'
import { mobile } from './variables'
import { FaPhoneAlt } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export default function Footer() {
  const [ferryList, setFerryList] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [activityList, setActivityList] = useState([])

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  useEffect(() => {

    document.getElementById("footerwave").innerHTML = footerWave

    db.collection('ferry').get().then((snap) => {
      const tempFerry = []
      snap.forEach((sndata) => {
        const data = sndata.data()
        tempFerry.push({ name: data.name, slug: data.slug })
      })
      setFerryList(tempFerry)
    })

    //Getting Activity
    db.collection("activity")
    .orderBy("order", "asc")
    .limit(6)
    .get().then((snap) => {
      const tempActivity = []
      snap.forEach((sndata) => {
        const data = sndata.data()
        tempActivity.push({ name: data.name, slug: data.slug })
      })
      setActivityList(tempActivity)
    });

  }, [])

  function Element({ heading, items }) {
    return (
      <div>
        <h2 style={{ paddingBottom: 15, borderBottom: `2px solid ${style.primaryColor}`, display: 'inline' }}>{heading}</h2>
        <div style={{ marginTop: 30 }}>
          {items.map((item, i) => (
            <div key={i} style={{ marginBottom: 5 }}><Link target='blank' href={item.link}>{item.name}</Link></div>
          ))}
        </div>
      </div>
    )
  }


  return (
    <div>

      <div id='footerwave' style={{ marginBottom: -4 }} />

      <div className='footerdiv' style={{
        display: isMobile ? "flex" : 'grid',
        flexDirection: 'column',
        gridTemplateColumns: `repeat(4, auto)`,
        gap: 30

      }}
      >
        <Element
          heading={"Cruises"}
          items={ferryList.map((ferry, i) => {
            return {
              name: ferry.name,
              link: ferry.slug
            }
          })}
        />

        <Element
          heading={"Activity"}
          items={activityList.map((ferry, i) => {
            return {
              name: ferry.name,
              link: ferry.slug
            }
          })}
        />
        <Element
          heading={"Useful Links"}
          items={[
            { name: "Terms & Condition", link: '/terms-and-condition' },
            { name: "Disclaimer", link: '/disclaimer' },
            { name: "Privacy Policy", link: '/privacy-policy' },
          ]}
        />

        <Element
          heading={"Contact with Us"}
          items={[
            { name: <><FaPhoneAlt /> +91 9434261139</>, link: "#" },
            { name: <><FaPhoneAlt /> +91 9933267038</>, link: "#" },
            { name: <><FiMail /> ronittravels1@gmail.com</>, link: 'mailto:ronittravels1@gmail.com' },
            
          ]}
        />



      </div>
      <div>
        <p style={{ textAlign: 'center', padding: '20px 0', backgroundColor: '#10263b', color: 'grey' }}>© 2023 <Link href={'/'}> ronitholidays.com </Link> - All rights reserved</p>
      </div>

    </div>
  )
}


const footerWave = `
<svg width="100%" height="100%" id="svg" viewBox="0 0 1440 255" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><style>
          .path-0{
            animation:pathAnim-0 10s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes pathAnim-0{
            0%{
              d: path("M 0,400 C 0,400 0,200 0,200 C 151.33333333333331,162.66666666666669 302.66666666666663,125.33333333333334 450,134 C 597.3333333333334,142.66666666666666 740.6666666666667,197.33333333333331 905,216 C 1069.3333333333333,234.66666666666669 1254.6666666666665,217.33333333333334 1440,200 C 1440,200 1440,400 1440,400 Z");
            }
            25%{
              d: path("M 0,400 C 0,400 0,200 0,200 C 195.06666666666666,224.53333333333333 390.1333333333333,249.06666666666666 524,252 C 657.8666666666667,254.93333333333334 730.5333333333334,236.26666666666665 873,224 C 1015.4666666666666,211.73333333333335 1227.7333333333333,205.86666666666667 1440,200 C 1440,200 1440,400 1440,400 Z");
            }
            50%{
              d: path("M 0,400 C 0,400 0,200 0,200 C 170.2666666666667,197.06666666666666 340.5333333333334,194.13333333333335 492,202 C 643.4666666666666,209.86666666666665 776.1333333333334,228.53333333333333 931,230 C 1085.8666666666666,231.46666666666667 1262.9333333333334,215.73333333333335 1440,200 C 1440,200 1440,400 1440,400 Z");
            }
            75%{
              d: path("M 0,400 C 0,400 0,200 0,200 C 139.06666666666666,185.46666666666667 278.1333333333333,170.93333333333334 459,173 C 639.8666666666667,175.06666666666666 862.5333333333333,193.73333333333335 1033,201 C 1203.4666666666667,208.26666666666665 1321.7333333333333,204.13333333333333 1440,200 C 1440,200 1440,400 1440,400 Z");
            }
            100%{
              d: path("M 0,400 C 0,400 0,200 0,200 C 151.33333333333331,162.66666666666669 302.66666666666663,125.33333333333334 450,134 C 597.3333333333334,142.66666666666666 740.6666666666667,197.33333333333331 905,216 C 1069.3333333333333,234.66666666666669 1254.6666666666665,217.33333333333334 1440,200 C 1440,200 1440,400 1440,400 Z");
            }
          }</style><path d="M 0,400 C 0,400 0,200 0,200 C 151.33333333333331,162.66666666666669 302.66666666666663,125.33333333333334 450,134 C 597.3333333333334,142.66666666666666 740.6666666666667,197.33333333333331 905,216 C 1069.3333333333333,234.66666666666669 1254.6666666666665,217.33333333333334 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" 
          fill="#17334e" fill-opacity="1" 
          class="transition-all duration-300 ease-in-out delay-150 path-0"
          >
          </path>
          </svg>
`