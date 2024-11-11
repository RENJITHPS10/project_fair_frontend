import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'
import { getuserprojectsApi } from '../services/allApi'



function Dashboard() {


 
  return (
   
    <>
    <Header/>
    <div className='container  mt-5'>
      <h5>Welcome<span className='text-warning'> User</span></h5>
      <div className="row w-100 m-md-3 p-1">
        <div className="col-md-8  shadow ">
          <Myprojects/>
        
        </div>
        <div className="col-md-4">
          <Profile/>
        </div>
      </div>

    </div>
      
    </>
  )
}

export default Dashboard
