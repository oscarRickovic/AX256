import React from 'react'
import "./ComponentsCss/WorkAreaCss.css"
function WorkArea(props) {
  return (
    <div className='WorkArea'>
      {<props.component/>}
    </div>
  )
}

export default WorkArea