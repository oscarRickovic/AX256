import React, { useEffect, useState } from 'react'
import './ComponentsCss/WaitingCreateGroupCss.css'
function WaitingCreateGroup() {
    const [dots, setDots] = useState('.');
    const generateDots = ()=>{
        if(dots.length == 3) {
            setDots('.');
            return;
        }
        setDots(dots + '.')
    }
    useEffect(()=>{
        setTimeout(()=>{
            generateDots();
        },1000);      
    })
  return (
    <div className='WaitingCreateGroup'>{dots}</div>
  )
}

export default WaitingCreateGroup