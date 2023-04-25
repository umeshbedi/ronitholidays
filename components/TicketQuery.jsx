import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'antd'
import ContactForm from './ContactForm'

export default function TicketQuery({open, data, cancel}) {

    useEffect(()=>{
        console.log(data)
    },[data])


    return (
    <Modal
        open={open}
        onCancel={() => cancel()}
        footer={[]}
      >
        <div style={{ flexDirection: 'column', display: 'flex', gap: 10, padding: '2%' }}>
          <h2>Fill the form given below:</h2>
          <ContactForm/>
        </div>
      </Modal>
  )
}
