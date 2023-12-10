import React from 'react'
import './ComponentsCss/PageNotFoundCss.css';
function PageNotFound(props) {
  return (
    <div className = "PageNotFount-Parent">
      <div className = "PageNotFound">
        {props.error}
      </div>
      <div className='PageNotFound-msg'>
        {props.comment}
      </div>
    </div>
  )
}

export default PageNotFound;