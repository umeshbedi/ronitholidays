import React from 'react'
import ContactForm from './ContactForm'
import style from '@/styles/component.module.scss'
import { Table } from 'antd';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export default function ContactUsPage() {

    const dataSource = [
        {
            key: 'Email',
            value: '10 Downing Street',
        },
        {
            key: 'John',
            value: '10 Downing Street',
        },
    ];

    return (
        <>
            <h1>Connect With Us</h1><br />
            <p>We would love to respond to your queries and help you succeed.</p>
            <p>Feel free to get in touch with us.</p>
            <br />
            <br />
            <div style={{ display: 'grid', gridTemplateColumns: "60% 40%" }}>
                <div style={{ background: 'white', padding: '5%', height: 'fit-content' }}>
                    <ContactForm
                        packageName={"Contact Us"}
                        packageDetail={"Message from Contact Us Page"}
                    />
                </div>
                <div style={{ background: style.secondaryColor, padding: '5%', flexDirection:'column', display:'flex', justifyContent:'space-between' }}>
                    <div style={{display:'flex',color:'white', flexDirection:'column', alignItems:'center', gap:10}}>
                        <FiMapPin style={{fontSize:35}}/>
                        <h2 style={{color:style.primaryColor}}>Address</h2>
                        <p style={{textAlign:'center', lineHeight:'140%'}}>Shop No. 01, Pulikeezu Bhavan Bargat Line, near juvenile home, DRDO TRANSIST, Nayagaon, Port Blair, Andaman and Nicobar Islands 744106</p>
                        <hr style={{width:'80%'}}/>
                    </div>
                    <div style={{display:'flex',color:'white', flexDirection:'column', alignItems:'center', gap:10}}>
                        <FiMail style={{fontSize:35}}/>
                        <h2 style={{color:style.primaryColor}}>Email</h2>
                        <p style={{textAlign:'center', lineHeight:'140%'}}>contact@ronitholidays.com</p>
                        <hr style={{width:'80%'}}/>
                    </div>
                    <div style={{display:'flex',color:'white', flexDirection:'column', alignItems:'center', gap:10}}>
                        <FiPhone style={{fontSize:35}}/>
                        <h2 style={{color:style.primaryColor}}>Contact No.</h2>
                        <p style={{textAlign:'center', lineHeight:'140%'}}>9933263867, 9531955441</p>
                        
                    </div>
                </div>

            </div>
        </>
    )
}
