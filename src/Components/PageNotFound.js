import React from 'react'
import './ComponentsCss/PageNotFoundCss.css';
function PageNotFound() {
  return (
    <div className = "PageNotFount-Parent">
      <div className = "PageNotFound">
        404
      </div>
      <div className='PageNotFound-msg'>
        this page does't exist, please check the URL.
      </div>
    </div>
  )
}

export default PageNotFound;