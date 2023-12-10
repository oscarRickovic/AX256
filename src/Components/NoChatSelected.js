import React from 'react'
import "./ComponentsCss/NoChatSelectedCss.css"
function NoChatSelected(props) {
  return (
    <div className='NoChatSelected'>
        <div className='div-A'>
            {/* if rotation props is false the A logo will not rotate, if its true it will rotate. */}
            <div className={props.rotation ? "rotation" : "noRotation"}>
              <p className='NoChatSelected-A'>A</p>
            </div>
            <p className='NoChatSelected-WelcomingText'>welcome on A, please enjoy making friends.</p>
        </div>
    </div>
  )
}

export default NoChatSelected