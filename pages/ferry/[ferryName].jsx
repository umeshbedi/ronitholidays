import String2Html from '@/components/String2Html'
import { db } from '@/firebase'
import { Button, Collapse, Divider, Skeleton, Tabs, message, Image, Modal } from 'antd'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import style from '@/styles/component.module.scss'
import TicketQuery from '@/components/TicketQuery'


export default function Slug({ data }) {

  
  const [msg, showMsg] = message.useMessage()
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})

  if (data == undefined) return <Skeleton />
  
  const tabItem = [
    {
      label: `About ${data.name}`,
      key: 1,
      children: <String2Html id={'about'} string={data.about} />,
    },
    {
      label: `Terms and Conditions`,
      key: 2,
      children: <String2Html id={'termAndCondtion'} string={data.termAndCondtion} />,
    }
  ]

  const bookStyle = { flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }




  return (
    <main>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={"om raom ommm"} />
      </Head>

      <div>
        {showMsg}
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          <div style={{
            width: '90%',
            height: 400,
            backgroundSize: 'cover',
            backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-small-fresh-table-sea-blue-background-image_785331.jpg")`,
            borderRadius: 20,
            marginTop: '3%'
          }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', }}>

          <div style={{ width: '90%', display: "flex", gap: '3%', marginTop: '3%' }}>
            <div style={{ width: "65%", background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15 }}>
              <Tabs
                size='large'
                type='card'
                items={tabItem}

              />

            </div>

            <div style={{ width: '35%', height: 'fit-content' }} id='ticketCollapse'>
              <h2 style={{ marginBottom: '5%' }}>Get Instant Ticket</h2>
              {data.ticket.map((tk, i) => {
                const classes = data.classes.filter(f => {
                  return f.ticketId == tk.ticketId
                })
                return (
                  <Collapse key={i} accordion style={{ border: "none", marginBottom: '4%', background: 'white' }}>
                    <Collapse.Panel
                      showArrow={false}
                      header={
                        <div style={{ display: 'flex', gap: '3%' }}>
                          <div style={{ width: '70%' }}>
                            <p>From</p>
                            <p style={{ color: style.secondaryColor }}><b>{tk.from} {">>"} {tk.to}</b></p>
                            <p>Dep: {tk.departure} | Arr: {tk.arrival}</p>
                            <Divider>
                              <p style={{ color: 'white', background: style.secondaryColor, padding: '2px 10px', borderRadius: 20 }}>Distance {tk.distance}</p>
                            </Divider>
                          </div>

                          <div style={{ flexDirection: 'column', display: 'flex', width: '30%' }}>
                            <div style={{ ...bookStyle, height: '63%', }}>
                              <p><b>Duration:</b></p>
                              <p><b>{tk.duration}</b></p>
                            </div>
                            <div style={{ ...bookStyle, background: style.primaryColor, height: '30%' }}>
                              <p style={{ color: 'white' }}><b>Book Here</b></p>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div>
                        {classes.map((cl, j) => (
                          <div key={j} >
                            <div style={{ display: 'flex', gap: '3%' }}>

                              <div style={{ width: '60%' }}>
                                <p style={{ marginBottom: 15 }}>Class: <span style={{ fontWeight: 'bold', fontSize: '130%' }}>{cl.className}</span></p>
                                <p>For Kids (0-2 yrs): </p> <p>No Charges</p>
                              </div>

                              <div style={{ flexDirection: 'column', display: 'flex', width: '40%' }}>
                                <div style={{ ...bookStyle, height: '50%', }}>
                                  <p><b>Price:</b></p>
                                  <p><span style={{ fontWeight: 'bold', fontSize: '130%' }}>₹ {cl.price}</span> /adult</p>
                                </div>
                                <div style={{ height: '50%', marginTop: 15 }}>
                                  <Button
                                    onClick={() => { setOpenModal(true); setModalData({...tk, ...cl, ferryName:data.name}) }}
                                    style={{ background: style.secondaryColor, color: 'white' }}>Book Now</Button>
                                </div>

                              </div>
                            </div>

                            {j != classes.length - 1 &&
                              <Divider />
                            }
                          </div>
                        ))}
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                )
              })

              }
            </div>
          </div>

        </div>

        <TicketQuery
          open={openModal}
          cancel={() => setOpenModal(false)}
          data={modalData}
        />

      </div>

    </main>
  )
}


export const getStaticPaths = async () => {
  const entries = await db.collection("ferry").get()
  const paths = entries.docs.map(entry => ({
    params: {
      ferryName: entry.data().slug
    }
  }));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { ferryName } = context.params;
  const res = await db.collection("ferry").where("slug", "==", `/ferry/${ferryName}`).get()
  // console.log(res)

  const entry = res.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  if (entry.length == 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: entry[0],
    },
    revalidate: 60,

  }

}