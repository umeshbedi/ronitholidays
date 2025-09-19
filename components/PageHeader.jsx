import React from 'react'

export default function PageHeader({pageTitle, image}) {
  return (
    <div>
        <div 
        className='pageHeader'
        style={{
            backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.5),rgba(0,0,0,.5)), 
            url('${image}')`,
        }}
        >
            <h1 style={{fontSize:35, color:'white'}}>{pageTitle}</h1>
        </div>
    </div>
  )
}
