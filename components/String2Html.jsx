import React, { useEffect } from 'react'

export default function String2Html({string, id}) {
  useEffect(()=>{
    document.getElementById(`${id}`).innerHTML = string
  },[])
  return (
    <div id={id}/>
  )
}
