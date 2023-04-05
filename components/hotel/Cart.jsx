import React from 'react'

export default function Cart() {
  return (
    <div style={{ backgroundColor: 'white', padding: '2%' }} className='stickyCart'>
      <h2>Cart</h2>
      <div style={{ display: 'flex', flexDirection: 'column', }}>
        <h3>Empty Cart</h3>
      </div>
    </div>
  )
}
