import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8 d-flex justify-content-center align-items-center flex-column'>
                <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" className='w-50' alt="" />
                <h1>Look like you're lost</h1>
                <h6>The page you are looking for not available</h6>
              <Link to={'/'}>  <button className='btn btn-success'>Back to Home</button></Link>

            </div>
           
        </div>

    </div>
      
    </>
  )
}

export default Pagenotfound
