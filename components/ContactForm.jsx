import { Button, DatePicker, Form, Input, Modal, Space } from 'antd'
import React, { useState } from 'react'

export default function ContactForm({packageName, packageDetail}) {
    const [date, setDate] = useState(null)
    const [loading, setLoading] = useState(false)
    const [msg, showMsg] = Modal.useModal()
    
    
    async function sendEmail(e) {
        const emailBody = {
          "sender": { "name": "Ronit Holidays", "email": "no-reply@ronitholidays.com" },
          "to": [{ "email": "umeshkumarbedi@gmail.com", "name": "Ronitholidays" }],
          "htmlContent": `<!DOCTYPE html> 
          <html> 
          <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
          <div>
          <p><i>Query for:</i></p>
          <h2>${packageName}</h2>
          <h3>${packageDetail}</h3>
          <hr/>
          <p>Name: <span style="font-weight: bold;"> ${e.name}</span></p>
          <p>Mobile: <span style="font-weight: bold;">${e.mobile}</span></p>
          <p>Email: <span style="font-weight: bold;">${e.email}</span></p>
          <p>Total Adults: <span style="font-weight: bold;">${e.adults}</span></p>
          <p>Total Infants: <span style="font-weight: bold;">${e.infants}</span></p>
          <p>Total Childs: <span style="font-weight: bold;">${e.kids}</span></p>
          <p>Date of Travel: <span style="font-weight: bold;">${date}</span></p>
          <p>Message: <span style="font-weight: bold;">${e.message}</span></p>
          </div>
          </body> </html>`,
    
          "subject": "New Query from ronhitholidays.com",
          "replyTo": { "email": "no-reply@ronitholidays.com", "name": "Ronitholidays" },
          "tags": ["hotel", "room"]
        }
        setLoading(true)
    
        fetch("https://api.sendinblue.com/v3/smtp/email", {
          method: 'POST',
          headers: {
            "api-key": process.env.NEXT_PUBLIC_SEND_EMAIL,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(emailBody)
        })
          .then(res => res.json())
          .then(res => {
            msg.success({
              title: "Query sent successfully!",
              content: "Congratulations! Your query has been received. Our representative will contact you soon with email or phone. Happy Journey!"
            });
            setLoading(false)
          })
          .catch(err => { console.log(err); setLoading(false) })
    
      }
    return (
        <div>
            {showMsg}
            <Form style={{}}
                onFinish={(e) => {
                    if (date != null) {
                        // console.log({date:date, ...e})
                        sendEmail(e)
                    } else { msg.error({ title: "Attention!", content: "All fields are required." }) }
                }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Form.Item name={"name"} style={{ margin: 0 }} required >
                        <Input size='large' placeholder='Enter Your Name' required />
                    </Form.Item>
                    <Form.Item name={"mobile"} style={{ margin: 0 }} required >
                        <Input size='large' type='number' placeholder='Enter Mobile Number' required />
                    </Form.Item>
                    <Form.Item name={"email"} style={{ margin: 0 }} required >
                        <Input size='large' type='email' placeholder='Enter Email ID' required />
                    </Form.Item>
                    <Space>
                        <Form.Item name={"adults"} style={{ margin: 0 }} required >
                            <Input size='large' type='number' placeholder='Adults' required />
                        </Form.Item>
                        <Form.Item name={"infants"} style={{ margin: 0 }} required >
                            <Input size='large' type='number' placeholder='Infants' required />
                        </Form.Item>
                        <Form.Item name={"kids"} style={{ margin: 0 }} required >
                            <Input size='large' type='number' placeholder='Kids(>2Y)' required />
                        </Form.Item>

                    </Space>
                    <DatePicker size='large'
                        onChange={(e, d) => setDate(d)}
                        format={"DD-MM-YYYY"}
                    />

                    <Form.Item name={"message"} style={{ margin: 0 }} required >
                        <Input.TextArea rows={4} placeholder='Write Message' required/>
                    </Form.Item>


                    <Button type='primary' htmlType='submit' size='large' loading={loading}>Send Query</Button>
                </div>
            </Form>
        </div>
    )
}
