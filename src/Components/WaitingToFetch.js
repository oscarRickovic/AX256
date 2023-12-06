import React from 'react'
import './ComponentsCss/WaitingToFetchCss.css'
function WaitingToFetch() {
    const [dots, setDots] = React.useState('.');
    React.useEffect(()=>{
        setTimeout(()=>{
            if(dots.length == 3) {
                setDots('.');
                return;
            }
            setDots(dots + '.');
        }, 1000)
    })
  return (
    <div className='WaitingToFetch'>{dots}</div>
  )
}

export default WaitingToFetch